import { CheckCircle2, ChevronRight, Briefcase, BookOpen, GraduationCap, Lightbulb, MapPin, Loader2 } from "lucide-react";
import InstitutionCard from "../institutions/InstitutionCard";
import StatusText from "../ui/StatusText";

export default function ResultsPage({ institutions, result, saveError, saveLoading, saveSuccess }) {
  if (!result) {
    return (
      <div className="max-w-3xl mx-auto glass-panel p-12 rounded-3xl text-center space-y-4">
        <h2 className="text-3xl font-extrabold text-brand-deep">No results yet</h2>
        <p className="text-gray-500">Take the quiz first to see your personalized recommendation.</p>
      </div>
    );
  }

  const matchingInstitutions = institutions.slice(0, 3);

  return (
    <div className="max-w-5xl mx-auto space-y-12 animate-fade-in">
      
      <div className="text-center space-y-6">
        <div className="inline-flex items-center gap-2 text-xs tracking-widest text-green-600 uppercase bg-green-50 border border-green-200 px-4 py-1.5 rounded-full font-bold shadow-sm">
          <CheckCircle2 className="w-4 h-4" />
          Analysis Complete
        </div>
        <h2 className="text-4xl md:text-6xl font-extrabold text-brand-deep leading-[1.1]">
          Your Personalized <br className="hidden sm:block"/>
          <span className="glow-text-brand">Discovery Pathway</span>
        </h2>
        
        {saveLoading && (
          <div className="flex items-center justify-center gap-2 text-sm font-medium text-brand-indigo bg-brand-indigo/5 px-4 py-2 rounded-lg max-w-xs mx-auto">
            <Loader2 className="w-4 h-4 animate-spin" /> Saving pathway...
          </div>
        )}
        {saveSuccess && (
          <div className="text-sm font-medium text-green-600 bg-green-50 px-4 py-2 rounded-lg max-w-xs mx-auto">
            {saveSuccess}
          </div>
        )}
        {saveError && (
          <div className="text-sm font-medium text-red-600 bg-red-50 px-4 py-2 rounded-lg max-w-xs mx-auto">
            {saveError}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Main Result Card */}
        <div className="lg:col-span-8 space-y-8">
          <div className="glass-panel p-8 md:p-10 rounded-3xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-indigo/5 rounded-full blur-[80px] pointer-events-none"></div>
            
            <h3 className="text-3xl font-bold text-brand-deep mb-4 relative z-10">{result.title}</h3>
            <p className="text-gray-600 text-lg leading-relaxed mb-8 relative z-10">{result.description}</p>
            
            <div className="grid sm:grid-cols-2 gap-6 relative z-10">
              {/* Careers */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-brand-indigo font-bold text-sm tracking-widest uppercase">
                  <Briefcase className="w-4 h-4" /> Careers
                </div>
                <ul className="space-y-2">
                  {result.careers.map((career) => (
                    <li key={career} className="flex items-center gap-2 text-gray-700 font-medium">
                      <div className="w-1.5 h-1.5 rounded-full bg-brand-indigo"></div> {career}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Subjects */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-purple-600 font-bold text-sm tracking-widest uppercase">
                  <BookOpen className="w-4 h-4" /> Subjects
                </div>
                <ul className="space-y-2">
                  {result.subjects.map((subject) => (
                    <li key={subject} className="flex items-center gap-2 text-gray-700 font-medium">
                      <div className="w-1.5 h-1.5 rounded-full bg-purple-600"></div> {subject}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <hr className="my-8 border-gray-200/60 relative z-10" />

            <div className="grid sm:grid-cols-2 gap-6 relative z-10">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-orange-500 font-bold text-sm tracking-widest uppercase">
                  <Lightbulb className="w-4 h-4" /> Learning Style
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">{result.learningStyle}</p>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-emerald-600 font-bold text-sm tracking-widest uppercase">
                  <ChevronRight className="w-4 h-4" /> Next Steps
                </div>
                <ul className="space-y-2">
                  {result.nextSteps.map((step, idx) => (
                    <li key={idx} className="text-sm text-gray-600 leading-relaxed flex items-start gap-2">
                      <span className="text-emerald-500 font-bold mt-0.5">•</span> {step}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Recommended Institutions Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          <div className="flex items-center gap-2 text-brand-deep font-bold text-lg">
            <GraduationCap className="w-6 h-6 text-brand-indigo" />
            Top Institutions
          </div>
          
          <div className="space-y-4">
            {matchingInstitutions.length > 0 ? (
              matchingInstitutions.map((institution, i) => (
                <div key={institution.id} className="glass-panel p-5 rounded-2xl hover:border-brand-indigo/30 transition-colors group cursor-pointer">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-bold text-brand-deep group-hover:text-brand-indigo transition-colors">{institution.name}</h4>
                      <div className="flex items-center gap-1 text-xs text-gray-500 mt-1 font-medium">
                        <MapPin className="w-3 h-3" /> {institution.province}
                      </div>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-xs font-bold text-gray-400 group-hover:bg-brand-indigo/10 group-hover:text-brand-indigo transition-colors">
                      #{i + 1}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 text-sm text-gray-500 text-center">
                Institutions will appear here once connected.
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
