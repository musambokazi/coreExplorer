import { ArrowRight, Compass, Sparkles } from "lucide-react";

export default function HeroSection({ onStartQuiz, onViewInstitutions }) {
  return (
    <header className="relative text-center space-y-10 py-16 md:py-24">
      {/* Top Badge */}
      <div className="inline-flex items-center gap-3 bg-white border-4 border-neo-black shadow-[4px_4px_0px_rgba(17,17,17,1)] px-5 py-2 mx-auto">
        <span className="w-3 h-3 bg-neo-pink border-2 border-neo-black animate-bounce"></span>
        <span className="font-black text-sm tracking-widest uppercase">For South African learners</span>
      </div>

      {/* Main Heading */}
      <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.95] max-w-5xl mx-auto uppercase text-neo-black" style={{textShadow: "6px 6px 0 #00d2ff"}}>
        Find your future path with clarity
      </h1>

      {/* Subtitle */}
      <p className="text-xl md:text-2xl text-neo-black max-w-3xl mx-auto leading-relaxed font-bold bg-white p-6 border-4 border-neo-black shadow-[8px_8px_0px_rgba(17,17,17,1)] rotate-1">
        CoreExplore helps students connect their values, subjects, and interests to careers,
        institutions, and learning resources in one guided experience.
      </p>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row justify-center gap-6 pt-8">
        <button className="neo-btn neo-btn-primary flex items-center justify-center gap-3 text-xl hover:rotate-2" onClick={onStartQuiz}>
          <Sparkles className="w-6 h-6 stroke-[3]" />
          TAKE THE QUIZ
          <ArrowRight className="w-6 h-6 stroke-[3]" />
        </button>
        <button className="neo-btn neo-btn-tertiary flex items-center justify-center gap-3 text-xl hover:-rotate-2" onClick={onViewInstitutions}>
          <Compass className="w-6 h-6 stroke-[3]" />
          VIEW INSTITUTIONS
        </button>
      </div>

      {/* Features */}
      <div className="flex flex-wrap justify-center gap-4 pt-12" aria-label="CoreExplore features">
        {["Values quiz", "Career matching", "Institution discovery"].map((feature, i) => {
          const colors = ['bg-neo-yellow', 'bg-neo-blue', 'bg-neo-green'];
          return (
            <span key={feature} className={`px-6 py-2 ${colors[i]} border-4 border-neo-black shadow-[4px_4px_0px_rgba(17,17,17,1)] text-lg font-black uppercase transform ${i%2===0?'rotate-2':'-rotate-1'}`}>
              {feature}
            </span>
          )
        })}
      </div>
    </header>
  );
}
