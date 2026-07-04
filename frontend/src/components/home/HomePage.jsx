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
    <div className="space-y-24 md:space-y-32">
      <HeroSection onStartQuiz={() => onNavigate("quiz")} onViewInstitutions={() => document.getElementById("institutions")?.scrollIntoView({ behavior: "smooth" })} />

      {/* Journey Steps */}
      <section id="journey" className="space-y-12">
        <div className="max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-semibold text-min-text-main">How it works</h2>
          <p className="text-min-text-muted mt-2 text-lg">A simple three-step process to discovery.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {journeySteps.map((step, index) => (
            <div key={step.title} className="group border-t border-min-structure-light pt-6">
              <div className="text-sm font-semibold text-min-accent mb-4">
                0{index + 1}
              </div>
              <h3 className="text-lg font-semibold text-min-text-main mb-2">
                {step.title}
              </h3>
              <p className="text-min-text-muted leading-relaxed">
                {step.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Principles */}
      <section className="bg-min-surface border border-min-structure-light rounded-2xl p-8 md:p-12">
        <div className="max-w-3xl space-y-8">
          <h2 className="text-2xl font-semibold text-min-text-main">Why this approach matters</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {principles.map((item, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="w-1.5 h-1.5 rounded-full bg-min-accent mt-2 flex-shrink-0"></div>
                <p className="text-min-text-muted">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Explorers Grid */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Subjects Explorer */}
        <div className="lg:col-span-7 space-y-6">
          <div className="border-b border-min-structure-light pb-4">
             <h2 className="text-xl font-semibold text-min-text-main">Subject Explorer</h2>
          </div>
          <SubjectExplorer
            resources={resources}
            subjectPath={subjectPath}
            subjects={subjects}
            onSubjectPathChange={onSubjectPathChange}
          />
        </div>

        {/* Institutions Explorer */}
        <div id="institutions" className="lg:col-span-5 space-y-6">
          <div className="border-b border-min-structure-light pb-4">
             <h2 className="text-xl font-semibold text-min-text-main">Institutions</h2>
          </div>
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
