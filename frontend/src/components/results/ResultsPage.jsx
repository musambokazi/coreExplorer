// src/components/results/ResultsPage.jsx
import InstitutionCard from "../institutions/InstitutionCard";
import Panel from "../ui/Panel";
import StatusText from "../ui/StatusText";
import MentorCard from "../ui/MentorCard";
import AnalyticsPanel from "../ui/AnalyticsPanel";
import { useAuth } from "../../auth/AuthContext";

export default function ResultsPage({ institutions, result, saveError, saveLoading, saveSuccess }) {
  const { user } = useAuth();

  if (!result) {
    return (
      <Panel className="panel-wide">
        <h2>Results</h2>
        <StatusText>Take the quiz first to see your recommendation.</StatusText>
      </Panel>
    );
  }

  const matchingInstitutions = institutions.slice(0, 3);

  return (
    <Panel className="panel-wide results-panel">
      <h2>Your recommendation</h2>
      {saveLoading && <StatusText>Saving your pathway to FastAPI...</StatusText>}
      {saveSuccess && <StatusText>{saveSuccess}</StatusText>}
      {saveError && <StatusText tone="error">{saveError}</StatusText>}
      <div className="results-card">
        <h3>{result.title}</h3>
        <p>{result.description}</p>
        <h4>Suggested careers</h4>
        <ul>
          {result.careers.map((career) => (
            <li key={career}>{career}</li>
          ))}
        </ul>
        <h4>Suggested subjects</h4>
        <ul>
          {result.subjects.map((subject) => (
            <li key={subject}>{subject}</li>
          ))}
        </ul>
        <h4>How you learn best</h4>
        <p>{result.learningStyle}</p>
        <h4>Next steps</h4>
        <ul>
          {result.nextSteps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ul>
      </div>

      <div className="results-card">
        <h4>Suggested institutions</h4>
        {matchingInstitutions.length > 0 ? (
          <div className="institution-list">
            {matchingInstitutions.map((institution) => (
              <InstitutionCard key={institution.id} institution={institution} showDetails={false} />
            ))}
          </div>
        ) : (
          <StatusText>Institutions will appear here once the backend data is available.</StatusText>
        )}
      </div>

      {/* Premium sections */}
      {user?.is_premium && (
        <>
          <MentorCard />
          <AnalyticsPanel />
        </>
      )}
    </Panel>
  );
}
