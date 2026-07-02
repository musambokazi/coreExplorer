import { useState, useEffect } from "react";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const journeySteps = [
  {
    title: "Take the quiz",
    text: "Students answer a short set of questions about their values and interests.",
  },
  {
    title: "Match strengths",
    text: "CoreExplore links those answers to school subjects and career themes.",
  },
  {
    title: "Explore opportunities",
    text: "The app recommends careers, institutions, and useful learning resources.",
  },
];

const principles = [
  "Clear guidance for learners who are still discovering their direction.",
  "A simple experience that connects personal values to real opportunities.",
  "A strong foundation for future quiz, recommendation, and institution features.",
];

const quizQuestions = [
  {
    id: "q1",
    prompt: "Which activity sounds most exciting to you?",
    options: [
      { label: "Solving practical problems", value: "stem" },
      { label: "Creating art or design", value: "creative" },
      { label: "Helping people directly", value: "people" },
      { label: "Planning projects or businesses", value: "business" },
    ],
  },
  {
    id: "q2",
    prompt: "What kind of learning environment do you enjoy most?",
    options: [
      { label: "Labs and experiments", value: "stem" },
      { label: "Studio and creative spaces", value: "creative" },
      { label: "Community and teamwork", value: "people" },
      { label: "Leadership and strategy", value: "business" },
    ],
  },
  {
    id: "q3",
    prompt: "What kind of impact do you want to make?",
    options: [
      { label: "Invent or improve technology", value: "stem" },
      { label: "Inspire through creativity", value: "creative" },
      { label: "Support and guide others", value: "people" },
      { label: "Build opportunities and growth", value: "business" },
    ],
  },
];

const resultsMap = {
  stem: {
    title: "STEM Pathway",
    description: "You are likely to enjoy practical problem solving, technical learning, and innovation.",
    careers: ["Software Engineer", "Civil Engineer", "Medical Scientist"],
  },
  creative: {
    title: "Creative Pathway",
    description: "You may thrive in design, storytelling, media, and expressive problem solving.",
    careers: ["Graphic Designer", "Content Creator", "Architect"],
  },
  people: {
    title: "People-Focused Pathway",
    description: "You are likely to enjoy working closely with others and supporting growth and wellbeing.",
    careers: ["Teacher", "Social Worker", "Counsellor"],
  },
  business: {
    title: "Business Pathway",
    description: "You may enjoy planning, leadership, entrepreneurship, and creating value for others.",
    careers: ["Entrepreneur", "Project Manager", "Marketing Specialist"],
  },
};

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
        console.error("Error fetching data:", err);
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

  const handleAnswerChange = (questionId, value) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
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

      const response = await fetch(`${API_BASE_URL}/api/results/${student.id}`);
      const data = await response.json();
      setDashboardResults(data);
    } catch (err) {
      console.error("Failed to save result", err);
    }
  };

  const handleQuizSubmit = async (event) => {
    event.preventDefault();

    const unanswered = quizQuestions.some((question) => !answers[question.id]);
    if (unanswered) {
      setQuizError("Please answer every question before seeing your results.");
      return;
    }

    const scores = { stem: 0, creative: 0, people: 0, business: 0 };
    quizQuestions.forEach((question) => {
      const selectedValue = answers[question.id];
      scores[selectedValue] += 1;
    });

    const strongestPath = Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0];
    const recommendation = resultsMap[strongestPath];
    const finalResult = { ...recommendation, path: strongestPath };
    setSubjectPath(strongestPath);
    setResult(finalResult);
    setQuizError("");
    setActiveSection("results");
    setMobileMenuOpen(false);
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
      setActiveSection("dashboard");
      setMobileMenuOpen(false);

      if (data.student) {
        const resultsResponse = await fetch(`${API_BASE_URL}/api/results/${data.student.id}`);
        const resultsData = await resultsResponse.json();
        setDashboardResults(resultsData);
      }
    } catch (err) {
      setAuthMessage(err.message);
    }
  };

  const renderHome = () => (
    <>
      <header className="hero-card">
        <p className="eyebrow">Career discovery for South African learners</p>
        <h1>Find your future path with clarity.</h1>
        <p className="hero-copy">
          CoreExplore helps students connect their values, subjects, and interests to careers,
          institutions, and learning resources in one guided experience.
        </p>
        <div className="action-row">
          <button className="primary-link" onClick={() => setActiveSection("quiz")}>
            Take the quiz
          </button>
          <button className="secondary-link" onClick={() => setActiveSection("home")}>
            View institutions
          </button>
        </div>
        <div className="chip-row">
          <span className="chip">Values quiz</span>
          <span className="chip">Career matching</span>
          <span className="chip">Institution discovery</span>
        </div>
      </header>

      <div className="content-grid">
        <section className="panel" id="journey">
          <h2>How CoreExplore works</h2>
          <div className="steps-list">
            {journeySteps.map((step) => (
              <article key={step.title} className="step-card">
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="panel" id="institutions">
          <h2>Institutions</h2>
          <div className="filter-grid">
            <input
              value={institutionSearch}
              onChange={(event) => setInstitutionSearch(event.target.value)}
              placeholder="Search institution"
            />
            <select value={institutionType} onChange={(event) => setInstitutionType(event.target.value)}>
              <option value="all">All institution types</option>
              <option value="school">School</option>
              <option value="tvet college">TVET College</option>
              <option value="university">University</option>
            </select>
            <input
              value={institutionProvince}
              onChange={(event) => setInstitutionProvince(event.target.value)}
              placeholder="Province"
            />
          </div>
          {loading && <p className="status-text">Loading institutions...</p>}
          {error && <p className="status-text error">{error}</p>}
          {!loading && !error && institutions.length === 0 && (
            <p className="status-text">No institutions matched your search.</p>
          )}

          <div className="institution-list">
            {!loading &&
              !error &&
              institutions.map((school) => (
                <article key={school.id} className="institution-card">
                  <h3>{school.name}</h3>
                  <p>{school.province}</p>
                  <span>{school.type}</span>
                  {school.city && <p>{school.city}</p>}
                  {school.description && <p>{school.description}</p>}
                  {school.subjects?.length > 0 && (
                    <div className="subject-tags">
                      {school.subjects.map((subject) => (
                        <span key={subject.name} className="chip">{subject.name}</span>
                      ))}
                    </div>
                  )}
                </article>
              ))}
          </div>
        </section>
      </div>

      <section className="panel panel-wide">
        <h2>Why this experience matters</h2>
        <ul className="principles-list">
          {principles.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="panel panel-wide">
        <h2>Subject explorer</h2>
        <p className="quiz-intro">
          Your values guide the subjects and resources that appear below.
        </p>
        <div className="chip-row">
          <button className="secondary-link" onClick={() => setSubjectPath("people")}>People</button>
          <button className="secondary-link" onClick={() => setSubjectPath("stem")}>STEM</button>
          <button className="secondary-link" onClick={() => setSubjectPath("creative")}>Creative</button>
          <button className="secondary-link" onClick={() => setSubjectPath("business")}>Business</button>
        </div>
        <div className="content-grid">
          <div className="results-card">
            <h3>Suggested subjects</h3>
            {subjects.length === 0 ? (
              <p>No subjects available for this path yet.</p>
            ) : (
              subjects.map((subject) => (
                <div key={subject.id} className="step-card">
                  <h4>{subject.name}</h4>
                  <p>{subject.description}</p>
                </div>
              ))
            )}
          </div>
          <div className="results-card">
            <h3>Curiosity library</h3>
            {resources.length === 0 ? (
              <p>No resources available for this path yet.</p>
            ) : (
              resources.map((resource) => (
                <div key={resource.id} className="step-card">
                  <h4>{resource.title}</h4>
                  <p>{resource.description}</p>
                  <a href={resource.url} target="_blank" rel="noreferrer" className="secondary-link resource-link">
                    Open resource
                  </a>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      <section className="panel panel-wide">
        <h2>Why this experience matters</h2>
        <ul className="principles-list">
          {principles.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>
    </>
  );

  const renderQuiz = () => (
    <section className="panel panel-wide quiz-panel">
      <h2>Career values quiz</h2>
      <p className="quiz-intro">
        Answer a few simple questions to discover the career direction that best fits your style.
      </p>
      <form onSubmit={handleQuizSubmit}>
        {quizQuestions.map((question) => (
          <div key={question.id} className="quiz-question">
            <h3>{question.prompt}</h3>
            <div className="options-grid">
              {question.options.map((option) => (
                <label key={option.label} className="option-card">
                  <input
                    type="radio"
                    name={question.id}
                    value={option.value}
                    checked={answers[question.id] === option.value}
                    onChange={() => handleAnswerChange(question.id, option.value)}
                  />
                  <span>{option.label}</span>
                </label>
              ))}
            </div>
          </div>
        ))}
        {quizError && <p className="status-text error">{quizError}</p>}
        <button className="primary-link quiz-submit" type="submit">
          See my results
        </button>
      </form>
    </section>
  );

  const renderResults = () => {
    if (!result) {
      return (
        <section className="panel panel-wide">
          <h2>Results</h2>
          <p className="status-text">Take the quiz first to see your recommendation.</p>
        </section>
      );
    }

    const matchingInstitutions = institutions.slice(0, 3);

    return (
      <section className="panel panel-wide results-panel">
        <h2>Your recommendation</h2>
        <div className="results-card">
          <h3>{result.title}</h3>
          <p>{result.description}</p>
          <h4>Suggested careers</h4>
          <ul>
            {result.careers.map((career) => (
              <li key={career}>{career}</li>
            ))}
          </ul>
        </div>

        <div className="results-card">
          <h4>Suggested institutions</h4>
          {matchingInstitutions.length > 0 ? (
            <div className="institution-list">
              {matchingInstitutions.map((school) => (
                <article key={school.id} className="institution-card">
                  <h3>{school.name}</h3>
                  <p>{school.province}</p>
                  <span>{school.type}</span>
                </article>
              ))}
            </div>
          ) : (
            <p className="status-text">Institutions will appear here once the backend data is available.</p>
          )}
        </div>
      </section>
    );
  };

  const renderDashboard = () => (
    <section className="panel panel-wide dashboard-panel">
      <h2>Student dashboard</h2>
      {student ? (
        <>
          <p className="quiz-intro">Welcome back, {student.name}.</p>
          <div className="results-card">
            <h3>Your saved results</h3>
            {dashboardResults.length === 0 ? (
              <p>No saved results yet. Complete the quiz to build your history.</p>
            ) : (
              <div className="institution-list">
                {dashboardResults.map((entry) => (
                  <article key={entry.id} className="institution-card">
                    <h3>{entry.path}</h3>
                    <p>{entry.description}</p>
                    <span>{entry.careers.join(", ")}</span>
                  </article>
                ))}
              </div>
            )}
          </div>
        </>
      ) : (
        <div className="auth-card">
          <h3>Sign in to save your results</h3>
          <p className="quiz-intro">Create an account or log in to keep your quiz history and recommendations.</p>
          <form onSubmit={handleAuthSubmit} className="auth-form">
            {authMode === "register" && (
              <input
                name="name"
                value={authForm.name}
                onChange={handleAuthChange}
                placeholder="Your name"
                required
              />
            )}
            <input
              name="email"
              type="email"
              value={authForm.email}
              onChange={handleAuthChange}
              placeholder="Email"
              required
            />
            <input
              name="password"
              type="password"
              value={authForm.password}
              onChange={handleAuthChange}
              placeholder="Password"
              required
            />
            {authMessage && <p className="status-text">{authMessage}</p>}
            <div className="action-row">
              <button className="primary-link" type="submit">
                {authMode === "register" ? "Create account" : "Log in"}
              </button>
              <button
                className="secondary-link"
                type="button"
                onClick={() => setAuthMode(authMode === "login" ? "register" : "login")}
              >
                {authMode === "login" ? "Need an account?" : "Already have an account?"}
              </button>
            </div>
          </form>
        </div>
      )}
    </section>
  );

  return (
    <div className="app-shell">
      <nav className="top-nav">
        <div className="brand">CoreExplore</div>
        <button
          className="menu-toggle"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          aria-label="Toggle navigation"
        >
          ☰
        </button>
        <div className={`nav-links ${mobileMenuOpen ? "open" : ""}`}>
          <button onClick={() => { setActiveSection("home"); setMobileMenuOpen(false); }}>Home</button>
          <button onClick={() => { setActiveSection("quiz"); setMobileMenuOpen(false); }}>Quiz</button>
          <button onClick={() => { setActiveSection("results"); setMobileMenuOpen(false); }}>Results</button>
          <button onClick={() => { setActiveSection("dashboard"); setMobileMenuOpen(false); }}>Dashboard</button>
        </div>
      </nav>

      <main className="page-shell">
        {activeSection === "home" && renderHome()}
        {activeSection === "quiz" && renderQuiz()}
        {activeSection === "results" && renderResults()}
        {activeSection === "dashboard" && renderDashboard()}
      </main>

      <footer className="site-footer">
        <p>CoreExplore • Career guidance for curious learners</p>
        <p>Built with React, Flask, and PostgreSQL</p>
      </footer>
    </div>
  );
}