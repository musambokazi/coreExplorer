import { pathwayOptions } from "../../data/coreExploreContent";

export default function SubjectExplorer({ resources, subjectPath, subjects, onSubjectPathChange }) {
  return (
    <>
      <h2>Subject explorer</h2>
      <p className="quiz-intro">Your values guide the subjects and resources that appear below.</p>
      <div className="chip-row" role="group" aria-label="Choose a pathway">
        {pathwayOptions.map((pathway) => (
          <button
            key={pathway.value}
            className="secondary-link"
            onClick={() => onSubjectPathChange(pathway.value)}
            aria-pressed={subjectPath === pathway.value}
          >
            {pathway.label}
          </button>
        ))}
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
    </>
  );
}
