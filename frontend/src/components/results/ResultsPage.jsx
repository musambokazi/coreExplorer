import { CheckCircle2, ChevronRight, Briefcase, BookOpen, GraduationCap, Lightbulb, MapPin, Loader2 } from "lucide-react";
import StatusText from "../ui/StatusText";

export default function ResultsPage({ institutions, result, saveError, saveLoading, saveSuccess }) {
  if (!result) {
    return (
      <div className="max-w-2xl mx-auto min-card p-12 text-center space-y-4 animate-fade-in">
        <h2 className="text-2xl font-semibold text-min-text-main">No results yet</h2>
        <p className="text-min-text-muted">
          Complete the assessment quiz to generate your customized career pathway.
        </p>
      </div>
    );
  }

  const matchingInstitutions = institutions.slice(0, 3);

  return (
    <div className="max-w-5xl mx-auto space-y-12 animate-fade-in">
      
      {/* Header Area */}
      <div className="text-center space-y-6 pb-8 border-b border-min-structure-light">
        <div className="inline-flex items-center gap-2 text-sm font-medium text-min-accent bg-blue-50 px-3 py-1 rounded-full">
          <CheckCircle2 className="w-4 h-4" />
          Analysis Complete
        </div>
        <h2 className="text-3xl md:text-5xl font-semibold text-min-text-main tracking-tight">
          Your Discovery Pathway
        </h2>
        
        {saveLoading && (
          <div className="flex items-center justify-center gap-2 text-sm text-min-text-muted">
            <Loader2 className="w-4 h-4 animate-spin" /> Saving pathway...
          </div>
        )}
        {saveSuccess && (
          <div className="text-sm font-medium text-emerald-600">
            {saveSuccess}
          </div>
        )}
        {saveError && (
          <div className="text-sm font-medium text-red-600">
            {saveError}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Main Result Card */}
        <div className="lg:col-span-8 space-y-8">
          <div>
            <h3 className="text-2xl font-semibold text-min-text-main mb-3">{result.title}</h3>
            <p className="text-lg text-min-text-muted leading-relaxed">{result.description}</p>
          </div>
            
          <div className="grid sm:grid-cols-2 gap-6 pt-4">
            {/* Careers */}
            <div className="min-card p-6">
              <div className="flex items-center gap-2 text-min-text-main font-semibold mb-4">
                <Briefcase className="w-4 h-4 text-min-accent" /> Careers
              </div>
              <ul className="space-y-3">
                {result.careers.map((career) => (
                  <li key={career} className="text-sm text-min-text-muted flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-min-structure-light mt-1.5 flex-shrink-0"></span> 
                    {career}
                  </li>
                ))}
              </ul>
            </div>

            {/* Subjects */}
            <div className="min-card p-6">
              <div className="flex items-center gap-2 text-min-text-main font-semibold mb-4">
                <BookOpen className="w-4 h-4 text-min-accent" /> Subjects
              </div>
              <ul className="space-y-3">
                {result.subjects.map((subject) => (
                  <li key={subject} className="text-sm text-min-text-muted flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-min-structure-light mt-1.5 flex-shrink-0"></span> 
                    {subject}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            <div className="bg-gray-50 rounded-xl p-6 border border-min-structure-light">
              <div className="flex items-center gap-2 text-min-text-main font-semibold mb-3">
                <Lightbulb className="w-4 h-4 text-min-accent" /> Learning Style
              </div>
              <p className="text-sm text-min-text-muted leading-relaxed">{result.learningStyle}</p>
            </div>
            
            <div className="bg-blue-50/50 rounded-xl p-6 border border-min-structure-light">
              <div className="flex items-center gap-2 text-min-text-main font-semibold mb-3">
                <ChevronRight className="w-4 h-4 text-min-accent" /> Next Steps
              </div>
              <ul className="space-y-2">
                {result.nextSteps.map((step, idx) => (
                  <li key={idx} className="text-sm text-min-text-muted flex items-start gap-2">
                    <span className="text-min-accent font-medium mt-0.5">•</span> {step}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Recommended Institutions Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          <div className="flex items-center gap-2 text-min-text-main font-semibold">
            <GraduationCap className="w-5 h-5 text-min-accent" />
            Top Institutions
          </div>
          
          <div className="space-y-4">
            {matchingInstitutions.length > 0 ? (
              matchingInstitutions.map((institution) => (
                <div key={institution.id} className="min-card p-5 hover:border-min-accent transition-colors cursor-pointer group">
                  <h4 className="font-medium text-min-text-main mb-2 group-hover:text-min-accent transition-colors">{institution.name}</h4>
                  <div className="flex items-center gap-1.5 text-xs text-min-text-muted">
                    <MapPin className="w-3.5 h-3.5" /> {institution.province}
                  </div>
                </div>
              ))
            ) : (
              <div className="min-card p-6 text-sm text-center text-min-text-muted border-dashed">
                Institutions will appear here once connected.
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
