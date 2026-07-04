import { Menu, X, Sparkles } from "lucide-react";

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
    <div className="flex flex-col min-h-screen relative overflow-hidden bg-gray-50">
      {/* Background blobs for modern aesthetic */}
      <div className="absolute top-0 -left-32 w-96 h-96 bg-brand-indigo/10 rounded-full blur-[100px] pointer-events-none animate-blob"></div>
      <div className="absolute top-1/4 -right-32 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px] pointer-events-none animate-blob" style={{ animationDelay: '2s' }}></div>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none animate-blob" style={{ animationDelay: '4s' }}></div>

      {/* Navigation */}
      <nav className="sticky top-0 z-50 w-full border-b border-gray-200/50 bg-white/70 backdrop-blur-xl supports-[backdrop-filter]:bg-white/60">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-brand-indigo/10 rounded-lg border border-brand-indigo/20">
                <Sparkles className="w-5 h-5 text-brand-indigo" />
              </div>
              <span className="font-extrabold text-xl tracking-tight text-brand-deep">
                Core<span className="text-brand-indigo">Explore</span>
              </span>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1 bg-gray-100/50 p-1 rounded-full border border-gray-200/50">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`px-4 py-1.5 text-sm font-semibold rounded-full transition-all ${
                    activeSection === item.id
                      ? "bg-white text-brand-indigo shadow-sm border border-gray-200/50"
                      : "text-gray-600 hover:text-brand-deep hover:bg-gray-100"
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
                className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                aria-label="Toggle navigation"
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200/50 bg-white/95 backdrop-blur-xl">
            <div className="space-y-1 px-4 pb-3 pt-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors ${
                    activeSection === item.id
                      ? "bg-brand-indigo/10 text-brand-indigo"
                      : "text-gray-700 hover:bg-gray-100"
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
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 relative z-10 animate-fade-in">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200/50 bg-white/50 backdrop-blur-sm relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500 font-medium">
            CoreExplore - Career guidance for curious learners
          </p>
          <div className="flex items-center gap-4 text-xs text-gray-400">
            <span>Built with React & FastAPI</span>
            <span className="w-1.5 h-1.5 rounded-full bg-brand-indigo"></span>
            <span>SQLite Storage</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
