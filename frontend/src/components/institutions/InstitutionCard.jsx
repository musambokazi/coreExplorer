export default function InstitutionCard({ institution, showDetails = true }) {
  return (
    <article className="institution-card">
      <h3>{institution.name}</h3>
      <p>{institution.province}</p>
      <span>{institution.type}</span>
      {showDetails && institution.city && <p>{institution.city}</p>}
      {showDetails && institution.description && <p>{institution.description}</p>}
      {showDetails && institution.subjects?.length > 0 && (
        <div className="subject-tags" aria-label={`${institution.name} subjects`}>
          {institution.subjects.map((subject) => (
            <span key={subject.name} className="chip">
              {subject.name}
            </span>
          ))}
        </div>
      )}
    </article>
  );
}
