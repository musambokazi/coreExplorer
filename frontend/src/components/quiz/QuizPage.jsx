import Panel from "../ui/Panel";
import StatusText from "../ui/StatusText";

export default function QuizPage({ answers, error, modules, onAnswerChange, onSubmit }) {
  return (
    <Panel className="panel-wide quiz-panel">
      <h2>Build your discovery profile</h2>
      <p className="quiz-intro">
        CoreExplore combines your values, learning style, and curiosity into one guided profile that
        points you toward subjects, careers, and institutions.
      </p>
      <form onSubmit={onSubmit}>
        {modules.map((module) => (
          <div key={module.id} className="quiz-question">
            <h3>{module.title}</h3>
            <p className="quiz-intro">{module.intro}</p>
            {module.questions.map((question) => (
              <fieldset key={question.id} className="quiz-question nested-question">
                <legend>{question.prompt}</legend>
                <div className="options-grid">
                  {question.options.map((option) => (
                    <label key={option.label} className="option-card">
                      <input
                        type="radio"
                        name={question.id}
                        value={option.value}
                        checked={answers[question.id] === option.value}
                        onChange={() => onAnswerChange(question.id, option.value)}
                      />
                      <span>{option.label}</span>
                    </label>
                  ))}
                </div>
              </fieldset>
            ))}
          </div>
        ))}
        {error && <StatusText tone="error">{error}</StatusText>}
        <button className="primary-link quiz-submit" type="submit">
          See my results
        </button>
      </form>
    </Panel>
  );
}
