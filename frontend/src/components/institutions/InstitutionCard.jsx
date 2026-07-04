import { Building2, MapPin } from "lucide-react";

export default function InstitutionCard({ institution, showDetails = true }) {
  return (
    <article className="min-card p-5 hover:border-min-accent transition-colors group">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-lg font-semibold text-min-text-main group-hover:text-min-accent transition-colors">
          {institution.name}
        </h3>
        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-min-text-muted border border-gray-200 capitalize whitespace-nowrap">
          {institution.type}
        </span>
      </div>
      
      <div className="flex items-center gap-4 text-xs font-medium text-min-text-muted mb-4">
        <div className="flex items-center gap-1.5">
          <MapPin className="w-3.5 h-3.5" /> 
          {institution.province}
          {showDetails && institution.city && `, ${institution.city}`}
        </div>
      </div>
      
      {showDetails && institution.description && (
        <p className="text-sm text-min-text-muted mb-4 leading-relaxed line-clamp-2">
          {institution.description}
        </p>
      )}
      
      {showDetails && institution.subjects?.length > 0 && (
        <div className="pt-4 border-t border-min-structure-light">
          <p className="text-xs font-semibold text-min-text-main uppercase tracking-wider mb-2">Available Subjects</p>
          <div className="flex flex-wrap gap-1.5" aria-label={`${institution.name} subjects`}>
            {institution.subjects.map((subject) => (
              <span key={subject.name} className="px-2 py-1 bg-gray-50 border border-gray-200 text-min-text-muted text-xs rounded-md">
                {subject.name}
              </span>
            ))}
          </div>
        </div>
      )}
    </article>
  );
}
