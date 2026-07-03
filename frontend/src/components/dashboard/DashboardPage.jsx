import Panel from "../ui/Panel";
import StatusText from "../ui/StatusText";

export default function DashboardPage({ error, loading, pathways, studentId, onRefresh }) {
  return (
    <Panel className="panel-wide dashboard-panel">
      <div className="dashboard-header">
        <div>
          <h2>Student dashboard</h2>
          <p className="quiz-intro">Showing saved pathways for demo learner #{studentId}.</p>
        </div>
        <button className="secondary-link compact-action" type="button" onClick={onRefresh}>
          Refresh
        </button>
      </div>

      {loading && <StatusText>Loading saved pathways from FastAPI...</StatusText>}
      {error && <StatusText tone="error">Unable to load saved pathways. {error}</StatusText>}

      {!loading && !error && (
        <div className="results-card">
          <h3>Your saved pathways</h3>
          {pathways.length === 0 ? (
            <p>No saved pathways yet. Complete the quiz to create your first pathway.</p>
          ) : (
            <div className="institution-list">
              {pathways.map((pathway) => (
                <article key={pathway.id} className="institution-card">
                  <h3>{pathway.title}</h3>
                  <p>{pathway.description}</p>
                  <span>{pathway.status}</span>
                  {pathway.recommendation_summary && <p>{pathway.recommendation_summary}</p>}
                </article>
              ))}
            </div>
          )}
        </div>
      )}
    </Panel>
  );
}
