import StatusText from "../ui/StatusText";

export default function AuthForm({ authForm, authMessage, authMode, onChange, onSubmit, onToggleMode }) {
  return (
    <div className="auth-card">
      <h3>Sign in to save your results</h3>
      <p className="quiz-intro">Create an account or log in to keep your quiz history and recommendations.</p>
      <form onSubmit={onSubmit} className="auth-form">
        {authMode === "register" && (
          <label>
            <span>Your name</span>
            <input name="name" value={authForm.name} onChange={onChange} placeholder="Your name" required />
          </label>
        )}
        <label>
          <span>Email</span>
          <input
            name="email"
            type="email"
            value={authForm.email}
            onChange={onChange}
            placeholder="Email"
            required
          />
        </label>
        <label>
          <span>Password</span>
          <input
            name="password"
            type="password"
            value={authForm.password}
            onChange={onChange}
            placeholder="Password"
            required
          />
        </label>
        {authMessage && <StatusText>{authMessage}</StatusText>}
        <div className="action-row">
          <button className="primary-link" type="submit">
            {authMode === "register" ? "Create account" : "Log in"}
          </button>
          <button className="secondary-link" type="button" onClick={onToggleMode}>
            {authMode === "login" ? "Need an account?" : "Already have an account?"}
          </button>
        </div>
      </form>
    </div>
  );
}
