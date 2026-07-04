import { journeySteps, principles } from "../../data/coreExploreContent";
import InstitutionExplorer from "../institutions/InstitutionExplorer";
import HeroSection from "./HeroSection";
import SubjectExplorer from "./SubjectExplorer";

export default function HomePage({
  error,
  institutionProvince,
  institutionSearch,
  institutionType,
  institutions,
  loading,
  resources,
  subjectPath,
  subjects,
  onInstitutionProvinceChange,
  onInstitutionSearchChange,
  onInstitutionTypeChange,
  onNavigate,
  onSubjectPathChange,
}) {
  return (
    <div className="space-y-16 md:space-y-24">
      <HeroSection onStartQuiz={() => onNavigate("quiz")} onViewInstitutions={() => document.getElementById("institutions")?.scrollIntoView({ behavior: "smooth" })} />

      {/* Journey Steps (How it works) */}
      <section id="journey" className="space-y-8">
        <div className="text-center max-w-2xl mx-auto">
          <div className="text-xs font-bold tracking-widest text-brand-indigo uppercase mb-3">Workflow</div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-brand-deep">How CoreExplore works</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          {journeySteps.map((step, index) => (
            <div key={step.title} className="glass-panel p-8 rounded-2xl relative overflow-hidden group cursor-default">
              <div className="absolute -right-4 -bottom-4 text-9xl font-black text-gray-100 opacity-50 select-none z-0 transition-transform duration-500 group-hover:-translate-y-4 group-hover:-translate-x-4">
                0{index + 1}
              </div>
              <div className="relative z-10 h-full flex flex-col justify-center">
                <div className="text-xs font-bold tracking-widest text-brand-indigo uppercase mb-3">
                  Step 0{index + 1}
                </div>
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-brand-indigo transition-colors duration-300">
                  {step.title}
                </h3>
                <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-all duration-500 ease-in-out opacity-80 group-hover:opacity-100">
                  <div className="overflow-hidden">
                    <p className="mt-4 text-sm text-gray-600 leading-relaxed">
                      {step.text}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Principles */}
      <section className="glass-panel p-8 md:p-12 rounded-3xl relative overflow-hidden border-t-4 border-t-brand-indigo">
        <div className="relative z-10 max-w-3xl mx-auto text-center space-y-6">
          <h2 className="text-3xl font-extrabold text-brand-deep">Why this experience matters</h2>
          <div className="grid sm:grid-cols-2 gap-4 text-left pt-4">
            {principles.map((item, index) => (
              <div key={index} className="flex items-start gap-3 p-4 bg-white/50 rounded-xl border border-gray-100">
                <div className="w-6 h-6 rounded-full bg-brand-indigo/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <div className="w-2 h-2 rounded-full bg-brand-indigo"></div>
                </div>
                <p className="text-sm font-medium text-gray-700">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Explorers Grid */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Subjects Explorer */}
        <div className="lg:col-span-7 glass-panel p-8 rounded-3xl">
          <SubjectExplorer
            resources={resources}
            subjectPath={subjectPath}
            subjects={subjects}
            onSubjectPathChange={onSubjectPathChange}
          />
        </div>

        {/* Institutions Explorer */}
        <div id="institutions" className="lg:col-span-5 glass-panel p-8 rounded-3xl">
          <InstitutionExplorer
            error={error}
            institutionProvince={institutionProvince}
            institutionSearch={institutionSearch}
            institutionType={institutionType}
            institutions={institutions}
            loading={loading}
            onProvinceChange={onInstitutionProvinceChange}
            onSearchChange={onInstitutionSearchChange}
            onTypeChange={onInstitutionTypeChange}
          />
        </div>
      </section>
    </div>
  );
}
