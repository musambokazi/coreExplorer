import InstitutionCard from "./InstitutionCard";
import StatusText from "../ui/StatusText";

export default function InstitutionExplorer({
  error,
  institutionProvince,
  institutionSearch,
  institutionType,
  institutions,
  loading,
  onProvinceChange,
  onSearchChange,
  onTypeChange,
}) {
  return (
    <>
      <h2>Institutions</h2>
      <div className="filter-grid">
        <label>
          <span>Search institution</span>
          <input
            value={institutionSearch}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search institution"
          />
        </label>
        <label>
          <span>Institution type</span>
          <select value={institutionType} onChange={(event) => onTypeChange(event.target.value)}>
            <option value="all">All institution types</option>
            <option value="school">School</option>
            <option value="tvet college">TVET College</option>
            <option value="university">University</option>
          </select>
        </label>
        <label>
          <span>Province</span>
          <input
            value={institutionProvince}
            onChange={(event) => onProvinceChange(event.target.value)}
            placeholder="Province"
          />
        </label>
      </div>

      {loading && <StatusText>Loading institutions...</StatusText>}
      {error && <StatusText tone="error">{error}</StatusText>}
      {!loading && !error && institutions.length === 0 && (
        <StatusText>No institutions matched your search.</StatusText>
      )}

      <div className="institution-list">
        {!loading &&
          !error &&
          institutions.map((institution) => (
            <InstitutionCard key={institution.id} institution={institution} />
          ))}
      </div>
    </>
  );
}
