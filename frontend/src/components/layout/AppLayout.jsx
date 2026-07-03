const navItems = [
  { id: "home", label: "Home" },
  { id: "quiz", label: "Quiz" },
  { id: "results", label: "Results" },
  { id: "dashboard", label: "Dashboard" },
];

export default function AppLayout({
  activeSection,
  children,
  mobileMenuOpen,
  onNavigate,
  onToggleMobileMenu,
}) {
  return (
    <div className="app-shell">
      <nav className="top-nav" aria-label="Main navigation">
        <div className="brand">CoreExplore</div>
        <button
          className="menu-toggle"
          onClick={onToggleMobileMenu}
          aria-label="Toggle navigation"
          aria-expanded={mobileMenuOpen}
          aria-controls="main-navigation"
        >
          ☰
        </button>
        <div id="main-navigation" className={`nav-links ${mobileMenuOpen ? "open" : ""}`}>
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              aria-current={activeSection === item.id ? "page" : undefined}
            >
              {item.label}
            </button>
          ))}
        </div>
      </nav>

      <main className="page-shell">{children}</main>

      <footer className="site-footer">
        <p>CoreExplore - Career guidance for curious learners</p>
        <p>Built with React, FastAPI, and PostgreSQL</p>
      </footer>
    </div>
  );
}
