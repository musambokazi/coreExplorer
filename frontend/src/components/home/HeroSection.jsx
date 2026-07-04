import { ArrowRight, Compass, Sparkles } from "lucide-react";

export default function HeroSection({ onStartQuiz, onViewInstitutions }) {
  return (
    <header className="relative text-center space-y-8 py-16 md:py-24 animate-fade-in">
      {/* Top Badge */}
      <div className="inline-flex items-center gap-2 text-xs tracking-widest text-brand-indigo uppercase bg-brand-indigo/5 border border-brand-indigo/10 px-4 py-1.5 rounded-full font-bold mx-auto shadow-sm">
        <span className="w-2 h-2 bg-brand-indigo rounded-full animate-pulse"></span>
        Career discovery for South African learners
      </div>

      {/* Main Heading */}
      <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.1] max-w-4xl mx-auto text-brand-deep">
        Find your future path with{" "}
        <span className="glow-text-brand">clarity.</span>
      </h1>

      {/* Subtitle */}
      <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed font-medium">
        CoreExplore helps students connect their values, subjects, and interests to careers,
        institutions, and learning resources in one guided experience.
      </p>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
        <button className="btn-primary px-8 py-4 text-base flex items-center justify-center gap-2 group" onClick={onStartQuiz}>
          <Sparkles className="w-5 h-5 text-yellow-300" />
          Take the quiz
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
        <button className="btn-secondary px-8 py-4 text-base flex items-center justify-center gap-2 group" onClick={onViewInstitutions}>
          <Compass className="w-5 h-5 text-brand-indigo" />
          View institutions
        </button>
      </div>

      {/* Features */}
      <div className="flex flex-wrap justify-center gap-4 pt-8" aria-label="CoreExplore features">
        {["Values quiz", "Career matching", "Institution discovery"].map((feature) => (
          <span key={feature} className="px-4 py-2 bg-white/60 backdrop-blur-sm border border-gray-200/60 rounded-full text-sm font-semibold text-gray-600 shadow-sm">
            {feature}
          </span>
        ))}
      </div>
    </header>
  );
}
