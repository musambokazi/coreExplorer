import { ChevronRight } from "lucide-react";
import StatusText from "../ui/StatusText";

export default function QuizPage({ answers, error, modules, onAnswerChange, onSubmit }) {
  return (
    <div className="max-w-4xl mx-auto space-y-12 animate-fade-in">
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 text-xs tracking-widest text-brand-indigo uppercase bg-brand-indigo/5 border border-brand-indigo/10 px-3 py-1 rounded-full font-bold">
          Step 01 / Assessment
        </div>
        <h2 className="text-4xl md:text-5xl font-extrabold text-brand-deep">Build your discovery profile</h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
          CoreExplore combines your values, learning style, and curiosity into one guided profile that
          points you toward subjects, careers, and institutions.
        </p>
      </div>

      <form onSubmit={onSubmit} className="space-y-10">
        {modules.map((module, mIndex) => (
          <div key={module.id} className="glass-panel p-8 md:p-12 rounded-3xl relative overflow-hidden group">
            <div className="absolute -right-4 -bottom-4 text-9xl font-black text-gray-100 opacity-50 select-none z-0 pointer-events-none">
              0{mIndex + 1}
            </div>
            <div className="relative z-10">
              <h3 className="text-2xl font-bold text-brand-deep mb-2">{module.title}</h3>
              <p className="text-sm text-gray-500 mb-8">{module.intro}</p>

              <div className="space-y-8">
                {module.questions.map((question, qIndex) => (
                  <fieldset key={question.id} className="space-y-4">
                    <legend className="text-lg font-semibold text-gray-800">
                      <span className="text-brand-indigo mr-2">{qIndex + 1}.</span>
                      {question.prompt}
                    </legend>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {question.options.map((option) => {
                        const isSelected = answers[question.id] === option.value;
                        return (
                          <label
                            key={option.label}
                            className={`flex items-center gap-4 p-4 rounded-xl border-2 transition-all cursor-pointer select-none group/option ${
                              isSelected
                                ? "border-brand-indigo bg-brand-indigo/5 shadow-[0_0_15px_rgba(79,70,229,0.1)]"
                                : "border-gray-200 bg-white hover:border-brand-indigo/30 hover:bg-gray-50"
                            }`}
                          >
                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors flex-shrink-0 ${
                              isSelected ? "border-brand-indigo" : "border-gray-300 group-hover/option:border-brand-indigo/50"
                            }`}>
                              {isSelected && <div className="w-2.5 h-2.5 bg-brand-indigo rounded-full" />}
                            </div>
                            <input
                              type="radio"
                              name={question.id}
                              value={option.value}
                              className="hidden"
                              checked={isSelected}
                              onChange={() => onAnswerChange(question.id, option.value)}
                            />
                            <span className={`font-medium text-sm leading-snug ${isSelected ? "text-brand-deep" : "text-gray-600"}`}>
                              {option.label}
                            </span>
                          </label>
                        );
                      })}
                    </div>
                  </fieldset>
                ))}
              </div>
            </div>
          </div>
        ))}
        
        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm font-semibold flex items-center gap-2">
            <StatusText tone="error">{error}</StatusText>
          </div>
        )}

        <div className="flex justify-end pt-4">
          <button type="submit" className="btn-primary px-8 py-4 text-base flex items-center gap-2">
            See my results
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  );
}
