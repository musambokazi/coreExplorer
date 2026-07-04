import { ArrowRight, Compass } from "lucide-react";

export default function HeroSection({ onStartQuiz, onViewInstitutions }) {
  return (
    <header className="relative text-center space-y-8 py-12 md:py-20 animate-fade-in">
      {/* Top Badge */}
      <div className="inline-flex items-center gap-2 text-xs font-medium text-min-text-muted bg-white border border-min-structure-light px-3 py-1 rounded-full">
        <span className="w-1.5 h-1.5 rounded-full bg-min-accent"></span>
        Career discovery for South African learners
      </div>

      {/* Main Heading */}
      <h1 className="text-4xl md:text-6xl font-semibold tracking-tight text-min-text-main max-w-4xl mx-auto leading-[1.1]">
        Find your future path with absolute clarity.
      </h1>

      {/* Subtitle */}
      <p className="text-lg md:text-xl text-min-text-muted max-w-2xl mx-auto leading-relaxed font-normal">
        Connect your values, subjects, and interests to careers, institutions, and learning resources in one seamless experience.
      </p>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row justify-center gap-4 pt-6">
        <button className="min-btn-primary" onClick={onStartQuiz}>
          Take the assessment
          <ArrowRight className="w-4 h-4" />
        </button>
        <button className="min-btn-secondary" onClick={onViewInstitutions}>
          <Compass className="w-4 h-4 text-min-text-muted" />
          Explore institutions
        </button>
      </div>

      {/* Features */}
      <div className="flex flex-wrap justify-center gap-6 pt-16 border-t border-min-structure-light mt-16 max-w-2xl mx-auto">
        {["Values assessment", "Career mapping", "Institution discovery"].map((feature) => (
          <span key={feature} className="text-sm font-medium text-min-text-muted flex items-center gap-2">
            <span className="w-1 h-1 bg-min-structure-light rounded-full"></span>
            {feature}
          </span>
        ))}
      </div>
    </header>
  );
}
