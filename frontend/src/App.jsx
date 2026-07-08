import { useEffect, useState } from "react";
import { coreExploreApi } from "./api/coreExploreApi";
import DashboardPage from "./components/dashboard/DashboardPage";
import HomePage from "./components/home/HomePage";
import AppLayout from "./components/layout/AppLayout";
import QuizPage from "./components/quiz/QuizPage";
import ResultsPage from "./components/results/ResultsPage";
import { quizModules, resultsMap } from "./data/coreExploreContent";
import LoginModal from "./components/ui/LoginModal";
import { AuthProvider, useAuth } from "./auth/AuthContext";


const DEMO_STUDENT_ID = 1;

function AppContent() {
  const { user, login, subscribe } = useAuth();
  const [institutions, setInstitutions] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [quizError, setQuizError] = useState("");
  const [pathwayLoading, setPathwayLoading] = useState(false);
  const [pathwayError, setPathwayError] = useState("");
  const [pathwaySuccess, setPathwaySuccess] = useState("");
  const [savedPathways, setSavedPathways] = useState([]);
  const [dashboardLoading, setDashboardLoading] = useState(false);
  const [dashboardError, setDashboardError] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [resources, setResources] = useState([]);
  const [subjectPath, setSubjectPath] = useState("people");
  const [institutionSearch, setInstitutionSearch] = useState("");
  const [institutionType, setInstitutionType] = useState("all");
  const [institutionProvince, setInstitutionProvince] = useState("");

  const handleLogin = async (email, password) => {
    try {
      await login(email, password);
      setShowLogin(false);
    } catch (err) {
      console.error('Login error', err);
    }
  };

  const [showLogin, setShowLogin] = useState(false);


  useEffect(() => {
    setLoading(true);
    setInstitutions([]);
    setError("Institution discovery will connect once the FastAPI institutions endpoint is available.");
    setLoading(false);
  }, [institutionSearch, institutionType, institutionProvince]);

  useEffect(() => {
    setSubjects([]);
    setResources([]);
  }, [subjectPath]);

  useEffect(() => {
    if (user) {
      loadSavedPathways();
    }
  }, [user]);

  const navigateTo = (section) => {
    setActiveSection(section);
    setMobileMenuOpen(false);
  };

  const handleAnswerChange = (questionId, value) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const loadSavedPathways = async () => {
    if (!user) return;
    setDashboardLoading(true);
    setDashboardError("");

    try {
      const data = await coreExploreApi.listPathways(user.id);
      setSavedPathways(data);
    } catch (err) {
      setDashboardError(err.message);
    } finally {
      setDashboardLoading(false);
    }
  };

  const saveResultToBackend = async (recommendation) => {
    if (!user) {
      setPathwayError("Please log in to save your pathway results.");
      return;
    }
    setPathwayLoading(true);
    setPathwayError("");
    setPathwaySuccess("");

    try {
      await coreExploreApi.createPathway({
        student_id: user.id,
        title: recommendation.title,
        description: recommendation.description,
        pathway_type: "career",
        status: "active",
        recommendation_summary: recommendation.nextSteps.join(" "),
      });

      setPathwaySuccess("Your pathway was saved to FastAPI successfully.");
      await loadSavedPathways();
    } catch (err) {
      setPathwayError(`Your result is visible, but it could not be saved yet. ${err.message}`);
    } finally {
      setPathwayLoading(false);
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

  return (
    <>
      <LoginModal isOpen={showLogin} onClose={() => setShowLogin(false)} onLogin={handleLogin} />
      <div style={{ position: "absolute", top: 20, right: 20, display: "flex", gap: "10px", alignItems: "center" }}>
        {user ? (
          <span style={{ color: "white" }}>Hello, {user.name}</span>
        ) : (
          <button className="primary-btn" onClick={() => setShowLogin(true)}>Login</button>
        )}
      </div>
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
        {activeSection === "results" && (
          <ResultsPage
            institutions={institutions}
            result={result}
            saveError={pathwayError}
            saveLoading={pathwayLoading}
            saveSuccess={pathwaySuccess}
          />
        )}
        {activeSection === "dashboard" && (
          <DashboardPage
            error={dashboardError}
            loading={dashboardLoading}
            pathways={savedPathways}
            studentId={user ? user.id : 0}
            onRefresh={loadSavedPathways}
          />
        )}
      </AppLayout>
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
