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

      {/* Journey Steps */}
      <section id="journey" className="space-y-10">
        <div className="text-center max-w-3xl mx-auto neo-card bg-neo-pink p-6">
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">How CoreExplore works</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {journeySteps.map((step, index) => {
            const colors = ['bg-neo-yellow', 'bg-neo-green', 'bg-neo-blue'];
            return (
              <div key={step.title} className={`neo-card ${colors[index]} p-8 relative flex flex-col neo-card-hover`}>
                <div className="absolute -top-6 -left-6 w-16 h-16 bg-white border-4 border-neo-black flex items-center justify-center font-black text-3xl shadow-[4px_4px_0px_rgba(17,17,17,1)] z-10">
                  {index + 1}
                </div>
                <div className="pt-6 flex-1">
                  <h3 className="text-2xl font-black uppercase mb-4 leading-tight border-b-4 border-neo-black pb-4">
                    {step.title}
                  </h3>
                  <p className="font-bold text-lg leading-relaxed">
                    {step.text}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Principles */}
      <section className="neo-card bg-white p-8 md:p-12 border-b-[12px] border-neo-black">
        <div className="max-w-4xl mx-auto space-y-8">
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-center bg-neo-yellow border-4 border-neo-black p-4 shadow-[6px_6px_0px_rgba(17,17,17,1)] -mt-16 mb-8 transform -rotate-1">
            Why this experience matters
          </h2>
          <div className="grid sm:grid-cols-2 gap-6 pt-4">
            {principles.map((item, index) => (
              <div key={index} className="flex items-start gap-4 p-4 neo-card bg-neo-bg">
                <div className="w-8 h-8 bg-neo-pink border-4 border-neo-black flex-shrink-0 shadow-[2px_2px_0px_rgba(17,17,17,1)]"></div>
                <p className="text-lg font-bold">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Explorers Grid */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Subjects Explorer */}
        <div className="lg:col-span-7 neo-card bg-white p-8">
          <SubjectExplorer
            resources={resources}
            subjectPath={subjectPath}
            subjects={subjects}
            onSubjectPathChange={onSubjectPathChange}
          />
        </div>

        {/* Institutions Explorer */}
        <div id="institutions" className="lg:col-span-5 neo-card bg-neo-green p-8 text-white">
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
