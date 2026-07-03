import { journeySteps, principles } from "../../data/coreExploreContent";
import InstitutionExplorer from "../institutions/InstitutionExplorer";
import Panel from "../ui/Panel";
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
    <>
      <HeroSection onStartQuiz={() => onNavigate("quiz")} onViewInstitutions={() => onNavigate("home")} />

      <div className="content-grid">
        <Panel id="journey">
          <h2>How CoreExplore works</h2>
          <div className="steps-list">
            {journeySteps.map((step) => (
              <article key={step.title} className="step-card">
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </article>
            ))}
          </div>
        </Panel>

        <Panel id="institutions">
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
        </Panel>
      </div>

      <Panel className="panel-wide">
        <h2>Why this experience matters</h2>
        <ul className="principles-list">
          {principles.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </Panel>

      <Panel className="panel-wide">
        <SubjectExplorer
          resources={resources}
          subjectPath={subjectPath}
          subjects={subjects}
          onSubjectPathChange={onSubjectPathChange}
        />
      </Panel>
    </>
  );
}
