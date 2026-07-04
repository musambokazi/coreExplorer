import { pathwayOptions } from "../../data/coreExploreContent";
import { BookOpen, Link, ArrowRight } from "lucide-react";

export default function SubjectExplorer({ resources, subjectPath, subjects, onSubjectPathChange }) {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="space-y-6">
        <p className="text-min-text-muted">Your values guide the subjects and resources that appear below.</p>
        
        <div className="flex flex-wrap gap-2" role="group" aria-label="Choose a pathway">
          {pathwayOptions.map((pathway) => {
            const isSelected = subjectPath === pathway.value;
            return (
              <button
                key={pathway.value}
                onClick={() => onSubjectPathChange(pathway.value)}
                aria-pressed={isSelected}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors border ${
                  isSelected 
                    ? "bg-blue-50 text-min-accent border-blue-200" 
                    : "bg-white text-min-text-main border-min-structure-light hover:bg-gray-50"
                }`}
              >
                {pathway.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Suggested Subjects */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-min-text-main flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-min-accent" />
            Suggested subjects
          </h3>
          <div className="space-y-3">
            {subjects.length === 0 ? (
              <p className="text-sm text-min-text-muted p-4 border border-dashed border-min-structure-light rounded-xl text-center">
                No subjects available for this path yet.
              </p>
            ) : (
              subjects.map((subject) => (
                <div key={subject.id} className="min-card p-5">
                  <h4 className="font-medium text-min-text-main mb-1">{subject.name}</h4>
                  <p className="text-sm text-min-text-muted">{subject.description}</p>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Curiosity Library */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-min-text-main flex items-center gap-2">
            <Link className="w-4 h-4 text-min-accent" />
            Curiosity library
          </h3>
          <div className="space-y-3">
            {resources.length === 0 ? (
              <p className="text-sm text-min-text-muted p-4 border border-dashed border-min-structure-light rounded-xl text-center">
                No resources available for this path yet.
              </p>
            ) : (
              resources.map((resource) => (
                <div key={resource.id} className="min-card p-5 flex flex-col items-start">
                  <h4 className="font-medium text-min-text-main mb-1">{resource.title}</h4>
                  <p className="text-sm text-min-text-muted mb-4 flex-1">{resource.description}</p>
                  <a 
                    href={resource.url} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="text-xs font-medium text-min-accent hover:text-min-accent-hover transition-colors inline-flex items-center gap-1"
                  >
                    Open resource <ArrowRight className="w-3 h-3" />
                  </a>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
