export default function HeroSection({ onStartQuiz, onViewInstitutions }) {
  return (
    <header className="hero-card">
      <p className="eyebrow">Career discovery for South African learners</p>
      <h1>Find your future path with clarity.</h1>
      <p className="hero-copy">
        CoreExplore helps students connect their values, subjects, and interests to careers,
        institutions, and learning resources in one guided experience.
      </p>
      <div className="action-row">
        <button className="primary-link" onClick={onStartQuiz}>
          Take the quiz
        </button>
        <button className="secondary-link" onClick={onViewInstitutions}>
          View institutions
        </button>
      </div>
      <div className="chip-row" aria-label="CoreExplore features">
        <span className="chip">Values quiz</span>
        <span className="chip">Career matching</span>
        <span className="chip">Institution discovery</span>
      </div>
    </header>
  );
}
