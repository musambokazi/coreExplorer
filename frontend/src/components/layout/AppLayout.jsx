import React, { useState } from 'react';
import UpgradeModal from '../ui/UpgradeModal';

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
  const [showUpgrade, setShowUpgrade] = useState(false);
return (
    <div className="app-shell">
      <nav className="top-nav" aria-label="Main navigation">
        <div className="brand" onClick={() => onNavigate('home')} style={{cursor: 'pointer'}}>CoreExplore</div>
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
        <button onClick={() => setShowUpgrade(true)} className="primary-btn">
  Premium
</button>
</div>
      </nav>{showUpgrade && <UpgradeModal isOpen={showUpgrade} onClose={() => setShowUpgrade(false)} />}

      <main className="page-shell">{children}</main>

      <footer className="site-footer">
        <p>CoreExplore - Career guidance for curious learners</p>
        <p>Built with React, FastAPI, and PostgreSQL</p>
      </footer>
    </div>
  );
}
