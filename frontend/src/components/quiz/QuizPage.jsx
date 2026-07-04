import { ArrowRight } from "lucide-react";
import StatusText from "../ui/StatusText";

export default function QuizPage({ answers, error, modules, onAnswerChange, onSubmit }) {
  return (
    <div className="max-w-3xl mx-auto space-y-16 animate-fade-in">
      <div className="space-y-4 text-center pb-8 border-b border-min-structure-light">
        <h2 className="text-3xl md:text-4xl font-semibold text-min-text-main">Discovery Assessment</h2>
        <p className="text-min-text-muted max-w-xl mx-auto">
          We combine your values, learning style, and curiosity into a profile that
          points you toward subjects, careers, and institutions.
        </p>
      </div>

      <form onSubmit={onSubmit} className="space-y-16">
        {modules.map((module, mIndex) => (
          <div key={module.id} className="space-y-8">
            <div className="space-y-2">
              <div className="text-xs font-semibold text-min-accent uppercase tracking-wider">Part 0{mIndex + 1}</div>
              <h3 className="text-2xl font-semibold text-min-text-main">{module.title}</h3>
              <p className="text-min-text-muted">{module.intro}</p>
            </div>

            <div className="space-y-12">
              {module.questions.map((question, qIndex) => (
                <fieldset key={question.id} className="space-y-4">
                  <legend className="text-lg font-medium text-min-text-main">
                    {qIndex + 1}. {question.prompt}
                  </legend>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {question.options.map((option) => {
                      const isSelected = answers[question.id] === option.value;
                      return (
                        <label
                          key={option.label}
                          className={`flex items-center gap-3 p-4 rounded-xl border transition-all cursor-pointer ${
                            isSelected
                              ? "border-min-accent bg-blue-50/30 ring-1 ring-min-accent"
                              : "border-min-structure-light bg-min-surface hover:border-gray-300"
                          }`}
                        >
                          <div className={`w-4 h-4 rounded-full border flex items-center justify-center flex-shrink-0 transition-colors ${
                            isSelected ? "border-min-accent" : "border-gray-300"
                          }`}>
                            {isSelected && <div className="w-2 h-2 bg-min-accent rounded-full" />}
                          </div>
                          <input
                            type="radio"
                            name={question.id}
                            value={option.value}
                            className="hidden"
                            checked={isSelected}
                            onChange={() => onAnswerChange(question.id, option.value)}
                          />
                          <span className={`text-sm font-medium ${isSelected ? "text-min-accent" : "text-min-text-main"}`}>
                            {option.label}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                </fieldset>
              ))}
            </div>
            
            {mIndex < modules.length - 1 && <hr className="border-min-structure-light" />}
          </div>
        ))}
        
        {error && (
          <div className="p-4 bg-red-50 border border-red-100 rounded-lg text-sm flex items-center">
            <StatusText tone="error">{error}</StatusText>
          </div>
        )}

        <div className="pt-8 flex justify-end">
          <button type="submit" className="min-btn-primary">
            See my results
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
  );
}
