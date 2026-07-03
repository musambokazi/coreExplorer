import Panel from "../ui/Panel";
import AuthForm from "./AuthForm";

export default function DashboardPage({
  authForm,
  authMessage,
  authMode,
  dashboardResults,
  student,
  onAuthChange,
  onAuthSubmit,
  onToggleAuthMode,
}) {
  return (
    <Panel className="panel-wide dashboard-panel">
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
        <AuthForm
          authForm={authForm}
          authMessage={authMessage}
          authMode={authMode}
          onChange={onAuthChange}
          onSubmit={onAuthSubmit}
          onToggleMode={onToggleAuthMode}
        />
      )}
    </Panel>
  );
}
