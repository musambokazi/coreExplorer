import { ArrowRight } from "lucide-react";
import StatusText from "../ui/StatusText";

export default function QuizPage({ answers, error, modules, onAnswerChange, onSubmit }) {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <div className="text-center space-y-6">
        <div className="inline-block bg-neo-yellow border-4 border-neo-black shadow-[4px_4px_0px_rgba(17,17,17,1)] px-4 py-2 font-black uppercase text-xl transform -rotate-2">
          Assessment Quiz
        </div>
        <h2 className="text-5xl md:text-7xl font-black text-neo-black uppercase tracking-tighter">Build your profile</h2>
        <p className="text-xl font-bold bg-white neo-card p-6 max-w-2xl mx-auto">
          CoreExplore combines your values, learning style, and curiosity into one guided profile that
          points you toward subjects, careers, and institutions.
        </p>
      </div>

      <form onSubmit={onSubmit} className="space-y-12">
        {modules.map((module, mIndex) => {
          const modColors = ['bg-neo-blue', 'bg-neo-pink', 'bg-neo-yellow', 'bg-neo-green'];
          const bgColor = modColors[mIndex % modColors.length];
          return (
            <div key={module.id} className={`neo-card ${bgColor} p-8 md:p-12 relative overflow-hidden`}>
              <div className="absolute top-0 right-0 w-32 h-32 bg-white border-b-4 border-l-4 border-neo-black flex items-center justify-center -mt-8 -mr-8 rotate-12 shadow-[-4px_4px_0px_rgba(17,17,17,1)] pointer-events-none">
                <span className="text-6xl font-black transform -rotate-12">{mIndex + 1}</span>
              </div>
              
              <div className="relative z-10">
                <h3 className="text-4xl font-black uppercase mb-4 border-b-4 border-neo-black pb-4 inline-block bg-white px-4 py-2 shadow-[4px_4px_0px_rgba(17,17,17,1)] -rotate-1">{module.title}</h3>
                <p className="text-xl font-bold mb-10 bg-white/80 p-4 border-4 border-neo-black shadow-[4px_4px_0px_rgba(17,17,17,1)]">{module.intro}</p>

                <div className="space-y-10">
                  {module.questions.map((question, qIndex) => (
                    <fieldset key={question.id} className="space-y-4 bg-white p-6 border-4 border-neo-black shadow-[6px_6px_0px_rgba(17,17,17,1)]">
                      <legend className="text-2xl font-black uppercase mb-4 px-2 bg-neo-black text-white transform -translate-y-10 -ml-2 rotate-1 shadow-[4px_4px_0px_rgba(255,222,89,1)]">
                        {qIndex + 1}. {question.prompt}
                      </legend>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                        {question.options.map((option) => {
                          const isSelected = answers[question.id] === option.value;
                          return (
                            <label
                              key={option.label}
                              className={`flex items-center gap-4 p-4 border-4 border-neo-black cursor-pointer transition-all ${
                                isSelected
                                  ? "bg-neo-yellow shadow-[4px_4px_0px_rgba(17,17,17,1)] translate-x-[-2px] translate-y-[-2px]"
                                  : "bg-white hover:bg-gray-100 hover:shadow-[4px_4px_0px_rgba(17,17,17,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] shadow-[0px_0px_0px_rgba(17,17,17,1)]"
                              }`}
                            >
                              <div className={`w-8 h-8 border-4 flex items-center justify-center flex-shrink-0 bg-white ${
                                isSelected ? "border-neo-black" : "border-gray-300"
                              }`}>
                                {isSelected && <div className="w-4 h-4 bg-neo-black" />}
                              </div>
                              <input
                                type="radio"
                                name={question.id}
                                value={option.value}
                                className="hidden"
                                checked={isSelected}
                                onChange={() => onAnswerChange(question.id, option.value)}
                              />
                              <span className="font-bold text-lg">
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
          );
        })}
        
        {error && (
          <div className="p-4 bg-red-400 border-4 border-neo-black shadow-[4px_4px_0px_rgba(17,17,17,1)] text-neo-black font-black uppercase text-xl text-center">
            <StatusText tone="error">{error}</StatusText>
          </div>
        )}

        <div className="flex justify-end pt-8">
          <button type="submit" className="neo-btn neo-btn-primary flex items-center gap-4 text-2xl uppercase">
            See my results
            <ArrowRight className="w-8 h-8 stroke-[4]" />
          </button>
        </div>
      </form>
    </div>
  );
}
