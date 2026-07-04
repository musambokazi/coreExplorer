import { CheckCircle2, ChevronRight, Briefcase, BookOpen, GraduationCap, Lightbulb, MapPin, Loader2 } from "lucide-react";
import InstitutionCard from "../institutions/InstitutionCard";
import StatusText from "../ui/StatusText";

export default function ResultsPage({ institutions, result, saveError, saveLoading, saveSuccess }) {
  if (!result) {
    return (
      <div className="max-w-3xl mx-auto neo-card bg-neo-yellow p-12 text-center space-y-6">
        <h2 className="text-5xl font-black uppercase tracking-tighter">No results yet</h2>
        <p className="text-xl font-bold bg-white p-4 border-4 border-neo-black shadow-[4px_4px_0px_rgba(17,17,17,1)] inline-block -rotate-1">
          Take the quiz first to see your recommendation.
        </p>
      </div>
    );
  }

  const matchingInstitutions = institutions.slice(0, 3);

  return (
    <div className="max-w-6xl mx-auto space-y-12">
      
      <div className="text-center space-y-8">
        <div className="inline-flex items-center gap-3 bg-neo-green border-4 border-neo-black shadow-[4px_4px_0px_rgba(17,17,17,1)] px-5 py-2 mx-auto text-white transform rotate-1">
          <CheckCircle2 className="w-6 h-6 stroke-[3]" />
          <span className="font-black text-xl uppercase tracking-widest">Analysis Complete</span>
        </div>
        <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter text-neo-black leading-[0.95]" style={{textShadow: "6px 6px 0 #ff66c4"}}>
          Your Discovery Pathway
        </h2>
        
        {saveLoading && (
          <div className="flex items-center justify-center gap-3 font-black uppercase bg-white border-4 border-neo-black shadow-[4px_4px_0px_rgba(17,17,17,1)] px-6 py-3 max-w-sm mx-auto text-xl">
            <Loader2 className="w-6 h-6 animate-spin stroke-[3]" /> Saving pathway...
          </div>
        )}
        {saveSuccess && (
          <div className="font-black uppercase text-xl text-white bg-neo-green border-4 border-neo-black shadow-[4px_4px_0px_rgba(17,17,17,1)] px-6 py-3 max-w-sm mx-auto -rotate-1">
            {saveSuccess}
          </div>
        )}
        {saveError && (
          <div className="font-black uppercase text-xl text-neo-black bg-red-400 border-4 border-neo-black shadow-[4px_4px_0px_rgba(17,17,17,1)] px-6 py-3 max-w-sm mx-auto rotate-1">
            {saveError}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Main Result Card */}
        <div className="lg:col-span-8">
          <div className="neo-card bg-white p-8 md:p-12 h-full flex flex-col">
            <div className="bg-neo-yellow border-4 border-neo-black p-4 inline-block mb-6 shadow-[6px_6px_0px_rgba(17,17,17,1)] -ml-12 mt-4 transform -rotate-2 w-max max-w-full">
              <h3 className="text-4xl font-black uppercase tracking-tighter whitespace-normal break-words">{result.title}</h3>
            </div>
            <p className="text-2xl font-bold leading-relaxed mb-10 border-l-8 border-neo-pink pl-6">{result.description}</p>
            
            <div className="grid sm:grid-cols-2 gap-8 mb-10">
              {/* Careers */}
              <div className="neo-card bg-neo-blue p-6">
                <div className="flex items-center gap-3 text-neo-black font-black text-2xl uppercase mb-6 bg-white border-4 border-neo-black p-2 shadow-[4px_4px_0px_rgba(17,17,17,1)] -mt-10 transform rotate-1">
                  <Briefcase className="w-6 h-6 stroke-[3]" /> Careers
                </div>
                <ul className="space-y-4">
                  {result.careers.map((career) => (
                    <li key={career} className="flex items-center gap-3 text-neo-black font-bold text-lg bg-white p-3 border-4 border-neo-black shadow-[4px_4px_0px_rgba(17,17,17,1)]">
                      <div className="w-3 h-3 bg-neo-pink border-2 border-neo-black flex-shrink-0"></div> {career}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Subjects */}
              <div className="neo-card bg-neo-pink p-6">
                <div className="flex items-center gap-3 text-neo-black font-black text-2xl uppercase mb-6 bg-white border-4 border-neo-black p-2 shadow-[4px_4px_0px_rgba(17,17,17,1)] -mt-10 transform -rotate-1">
                  <BookOpen className="w-6 h-6 stroke-[3]" /> Subjects
                </div>
                <ul className="space-y-4">
                  {result.subjects.map((subject) => (
                    <li key={subject} className="flex items-center gap-3 text-neo-black font-bold text-lg bg-white p-3 border-4 border-neo-black shadow-[4px_4px_0px_rgba(17,17,17,1)]">
                      <div className="w-3 h-3 bg-neo-yellow border-2 border-neo-black flex-shrink-0"></div> {subject}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-8">
              <div className="neo-card bg-neo-bg p-6">
                <div className="flex items-center gap-3 text-neo-black font-black text-2xl uppercase mb-4">
                  <Lightbulb className="w-6 h-6 stroke-[3]" /> Learning Style
                </div>
                <p className="font-bold text-lg leading-relaxed bg-white p-4 border-4 border-neo-black shadow-[4px_4px_0px_rgba(17,17,17,1)]">{result.learningStyle}</p>
              </div>
              
              <div className="neo-card bg-neo-bg p-6">
                <div className="flex items-center gap-3 text-neo-black font-black text-2xl uppercase mb-4">
                  <ChevronRight className="w-6 h-6 stroke-[4]" /> Next Steps
                </div>
                <ul className="space-y-3">
                  {result.nextSteps.map((step, idx) => (
                    <li key={idx} className="font-bold text-lg leading-relaxed flex items-start gap-3 bg-white p-3 border-4 border-neo-black shadow-[4px_4px_0px_rgba(17,17,17,1)]">
                      <span className="text-neo-green font-black text-xl leading-none">✓</span> {step}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Recommended Institutions Sidebar */}
        <div className="lg:col-span-4 space-y-8">
          <div className="flex items-center gap-4 bg-neo-black text-neo-yellow p-4 border-4 border-neo-black shadow-[6px_6px_0px_rgba(255,222,89,1)] transform rotate-1">
            <GraduationCap className="w-8 h-8 stroke-[3]" />
            <h3 className="font-black text-2xl uppercase tracking-tighter">Top Institutions</h3>
          </div>
          
          <div className="space-y-6">
            {matchingInstitutions.length > 0 ? (
              matchingInstitutions.map((institution, i) => (
                <div key={institution.id} className="neo-card bg-white p-6 neo-card-hover group cursor-pointer relative">
                  <div className="absolute -top-4 -right-4 w-12 h-12 bg-neo-yellow border-4 border-neo-black flex items-center justify-center font-black text-2xl shadow-[4px_4px_0px_rgba(17,17,17,1)] transform group-hover:rotate-12 transition-transform">
                    #{i + 1}
                  </div>
                  <h4 className="font-black text-2xl uppercase mb-4 pr-6">{institution.name}</h4>
                  <div className="flex items-center gap-2 text-lg font-bold bg-neo-bg p-2 border-4 border-neo-black inline-flex">
                    <MapPin className="w-5 h-5 stroke-[3]" /> {institution.province}
                  </div>
                </div>
              ))
            ) : (
              <div className="neo-card bg-white p-6 text-xl font-bold text-center border-dashed border-4 border-neo-black text-gray-500">
                Institutions will appear here once connected.
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
