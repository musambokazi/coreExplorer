import { Menu, X, Box } from "lucide-react";

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
    <div className="flex flex-col min-h-screen bg-min-canvas">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-min-structure-light">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <Box className="w-5 h-5 text-min-accent" strokeWidth={2.5} />
              <span className="font-semibold text-lg tracking-tight text-min-text-main">
                CoreExplore
              </span>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-6">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`text-sm font-medium transition-colors ${
                    activeSection === item.id
                      ? "text-min-accent"
                      : "text-min-text-muted hover:text-min-text-main"
                  }`}
                  aria-current={activeSection === item.id ? "page" : undefined}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Mobile menu button */}
            <div className="flex md:hidden">
              <button
                onClick={onToggleMobileMenu}
                className="p-2 text-min-text-muted hover:text-min-text-main transition-colors"
                aria-label="Toggle navigation"
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-min-structure-light bg-white">
            <div className="flex flex-col py-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`block w-full text-left px-6 py-3 text-sm font-medium ${
                    activeSection === item.id
                      ? "text-min-accent bg-blue-50/50"
                      : "text-min-text-muted hover:bg-gray-50 hover:text-min-text-main"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-min-structure-light bg-min-surface">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-min-text-muted">
            © 2026 CoreExplore. Career discovery tools.
          </p>
          <div className="flex items-center gap-3 text-xs text-min-text-muted">
            <span>React</span>
            <span className="w-1 h-1 bg-min-structure-light rounded-full"></span>
            <span>FastAPI</span>
            <span className="w-1 h-1 bg-min-structure-light rounded-full"></span>
            <span>SQLite</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
