import InstitutionCard from "./InstitutionCard";
import StatusText from "../ui/StatusText";
import { Search, MapPin, Building2, Loader2 } from "lucide-react";

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
    <div className="space-y-8 animate-fade-in">
      <div className="bg-gray-50 border border-min-structure-light rounded-2xl p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <label className="space-y-1.5">
            <span className="text-xs font-semibold text-min-text-muted uppercase tracking-wider">Search Name</span>
            <div className="relative">
              <Search className="w-4 h-4 text-min-text-muted absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                value={institutionSearch}
                onChange={(event) => onSearchChange(event.target.value)}
                placeholder="e.g. University of Cape Town"
                className="min-input pl-9"
              />
            </div>
          </label>
          
          <label className="space-y-1.5">
            <span className="text-xs font-semibold text-min-text-muted uppercase tracking-wider">Institution Type</span>
            <div className="relative">
              <Building2 className="w-4 h-4 text-min-text-muted absolute left-3 top-1/2 -translate-y-1/2" />
              <select 
                value={institutionType} 
                onChange={(event) => onTypeChange(event.target.value)}
                className="min-input pl-9 appearance-none bg-white"
              >
                <option value="all">All Types</option>
                <option value="school">School</option>
                <option value="tvet college">TVET College</option>
                <option value="university">University</option>
              </select>
            </div>
          </label>
          
          <label className="space-y-1.5">
            <span className="text-xs font-semibold text-min-text-muted uppercase tracking-wider">Province</span>
            <div className="relative">
              <MapPin className="w-4 h-4 text-min-text-muted absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                value={institutionProvince}
                onChange={(event) => onProvinceChange(event.target.value)}
                placeholder="e.g. Western Cape"
                className="min-input pl-9"
              />
            </div>
          </label>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
           <h3 className="text-sm font-semibold text-min-text-main">Results</h3>
           {institutions.length > 0 && (
             <span className="text-xs font-medium text-min-text-muted bg-gray-100 px-2 py-1 rounded-full">
               {institutions.length} found
             </span>
           )}
        </div>

        {loading && (
          <div className="flex items-center justify-center gap-2 text-sm text-min-text-muted p-12 min-card">
            <Loader2 className="w-4 h-4 animate-spin text-min-accent" /> Loading institutions...
          </div>
        )}
        
        {error && (
          <div className="p-4 bg-red-50 border border-red-100 rounded-xl text-center">
            <StatusText tone="error">{error}</StatusText>
          </div>
        )}
        
        {!loading && !error && institutions.length === 0 && (
          <div className="min-card p-12 text-center border-dashed">
            <p className="text-sm text-min-text-muted">No institutions matched your search filters.</p>
          </div>
        )}

        <div className="grid grid-cols-1 gap-4">
          {!loading &&
            !error &&
            institutions.map((institution) => (
              <InstitutionCard key={institution.id} institution={institution} />
            ))}
        </div>
      </div>
    </div>
  );
}
