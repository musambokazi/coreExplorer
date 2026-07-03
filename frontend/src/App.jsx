import { useEffect, useState } from "react";
import DashboardPage from "./components/dashboard/DashboardPage";
import HomePage from "./components/home/HomePage";
import AppLayout from "./components/layout/AppLayout";
import QuizPage from "./components/quiz/QuizPage";
import ResultsPage from "./components/results/ResultsPage";
import { quizModules, resultsMap } from "./data/coreExploreContent";

const getApiBaseUrl = () => {
  const configured = import.meta.env.VITE_API_URL;
  if (configured) {
    return configured;
  }

  const hostname = window.location.hostname;
  if (hostname === "localhost" || hostname === "127.0.0.1" || hostname === "::1") {
    return "http://localhost:5000";
  }

  return `http://${hostname}:5000`;
};

const API_BASE_URL = getApiBaseUrl();

export default function App() {
  const [institutions, setInstitutions] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [quizError, setQuizError] = useState("");
  const [student, setStudent] = useState(null);
  const [authMode, setAuthMode] = useState("login");
  const [authForm, setAuthForm] = useState({ name: "", email: "", password: "" });
  const [authMessage, setAuthMessage] = useState("");
  const [dashboardResults, setDashboardResults] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [resources, setResources] = useState([]);
  const [subjectPath, setSubjectPath] = useState("people");
  const [institutionSearch, setInstitutionSearch] = useState("");
  const [institutionType, setInstitutionType] = useState("all");
  const [institutionProvince, setInstitutionProvince] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    const query = new URLSearchParams();

    if (institutionType !== "all") query.set("type", institutionType);
    if (institutionProvince) query.set("province", institutionProvince);
    if (institutionSearch) query.set("search", institutionSearch);

    setLoading(true);
    fetch(`${API_BASE_URL}/api/institutions?${query.toString()}`, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Request failed with status ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setInstitutions(data);
        setError("");
      })
      .catch((err) => {
        if (err.name === "AbortError") {
          return;
        }
        console.error("Error fetching institutions:", err);
        setError("Unable to load institutions right now. Please make sure the backend is running.");
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, [institutionSearch, institutionType, institutionProvince]);

  useEffect(() => {
    const controller = new AbortController();

    fetch(`${API_BASE_URL}/api/subjects?path=${subjectPath}`, { signal: controller.signal })
      .then((res) => res.json())
      .then((data) => setSubjects(data))
      .catch(() => setSubjects([]));

    fetch(`${API_BASE_URL}/api/resources?path=${subjectPath}`, { signal: controller.signal })
      .then((res) => res.json())
      .then((data) => setResources(data))
      .catch(() => setResources([]));

    return () => controller.abort();
  }, [subjectPath]);

  const navigateTo = (section) => {
    setActiveSection(section);
    setMobileMenuOpen(false);
  };

  const handleAnswerChange = (questionId, value) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const refreshDashboardResults = async (studentId) => {
    const response = await fetch(`${API_BASE_URL}/api/results/${studentId}`);
    const data = await response.json();
    setDashboardResults(data);
  };

  const saveResultToBackend = async (recommendation) => {
    if (!student) {
      return;
    }

    try {
      await fetch(`${API_BASE_URL}/api/results`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          student_id: student.id,
          path: recommendation.title,
          description: recommendation.description,
          careers: recommendation.careers,
        }),
      });

      await refreshDashboardResults(student.id);
    } catch (err) {
      console.error("Failed to save result:", err);
    }
  };

  const handleQuizSubmit = async (event) => {
    event.preventDefault();

    const allQuestions = quizModules.flatMap((module) => module.questions);
    const unanswered = allQuestions.some((question) => !answers[question.id]);
    if (unanswered) {
      setQuizError("Please answer every question before seeing your results.");
      return;
    }

    const scores = { stem: 0, creative: 0, people: 0, business: 0 };
    allQuestions.forEach((question) => {
      const selectedValue = answers[question.id];
      scores[selectedValue] += 1;
    });

    const strongestPath = Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0];
    const finalResult = { ...resultsMap[strongestPath], path: strongestPath };

    setSubjectPath(strongestPath);
    setResult(finalResult);
    setQuizError("");
    navigateTo("results");
    await saveResultToBackend(finalResult);
  };

  const handleAuthChange = (event) => {
    const { name, value } = event.target;
    setAuthForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAuthSubmit = async (event) => {
    event.preventDefault();
    setAuthMessage("");

    const endpoint = authMode === "register" ? "/api/auth/register" : "/api/auth/login";
    const body =
      authMode === "register"
        ? { name: authForm.name, email: authForm.email, password: authForm.password }
        : { email: authForm.email, password: authForm.password };

    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Authentication failed.");
      }

      setStudent(data.student);
      setAuthMessage(data.message);
      setAuthForm({ name: "", email: "", password: "" });
      navigateTo("dashboard");

      if (data.student) {
        await refreshDashboardResults(data.student.id);
      }
    } catch (err) {
      setAuthMessage(err.message);
    }
  };

  return (
    <AppLayout
      activeSection={activeSection}
      mobileMenuOpen={mobileMenuOpen}
      onNavigate={navigateTo}
      onToggleMobileMenu={() => setMobileMenuOpen((prev) => !prev)}
    >
      {activeSection === "home" && (
        <HomePage
          error={error}
          institutionProvince={institutionProvince}
          institutionSearch={institutionSearch}
          institutionType={institutionType}
          institutions={institutions}
          loading={loading}
          resources={resources}
          subjectPath={subjectPath}
          subjects={subjects}
          onInstitutionProvinceChange={setInstitutionProvince}
          onInstitutionSearchChange={setInstitutionSearch}
          onInstitutionTypeChange={setInstitutionType}
          onNavigate={navigateTo}
          onSubjectPathChange={setSubjectPath}
        />
      )}
      {activeSection === "quiz" && (
        <QuizPage
          answers={answers}
          error={quizError}
          modules={quizModules}
          onAnswerChange={handleAnswerChange}
          onSubmit={handleQuizSubmit}
        />
      )}
      {activeSection === "results" && <ResultsPage institutions={institutions} result={result} />}
      {activeSection === "dashboard" && (
        <DashboardPage
          authForm={authForm}
          authMessage={authMessage}
          authMode={authMode}
          dashboardResults={dashboardResults}
          student={student}
          onAuthChange={handleAuthChange}
          onAuthSubmit={handleAuthSubmit}
          onToggleAuthMode={() => setAuthMode(authMode === "login" ? "register" : "login")}
        />
      )}
    </AppLayout>
  );
}
