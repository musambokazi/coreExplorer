import { Menu, X, Rocket } from "lucide-react";

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
    <div className="flex flex-col min-h-screen relative overflow-hidden bg-neo-bg">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 w-full bg-neo-blue border-b-4 border-neo-black">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="p-2 bg-neo-yellow border-4 border-neo-black shadow-[4px_4px_0px_rgba(17,17,17,1)]">
                <Rocket className="w-6 h-6 text-neo-black" strokeWidth={3} />
              </div>
              <span className="font-black text-2xl tracking-tighter uppercase text-neo-black">
                Core<span className="text-white" style={{textShadow: "2px 2px 0 #111"}}>Explore</span>
              </span>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`px-5 py-2 text-lg font-bold uppercase transition-all border-4 border-neo-black ${
                    activeSection === item.id
                      ? "bg-neo-yellow shadow-[4px_4px_0px_rgba(17,17,17,1)] translate-x-[-2px] translate-y-[-2px]"
                      : "bg-white hover:bg-neo-pink hover:shadow-[4px_4px_0px_rgba(17,17,17,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] shadow-[0px_0px_0px_rgba(17,17,17,1)]"
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
                className="p-2 bg-white border-4 border-neo-black shadow-[4px_4px_0px_rgba(17,17,17,1)] hover:bg-neo-yellow active:translate-x-1 active:translate-y-1 active:shadow-none transition-all"
                aria-label="Toggle navigation"
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X className="w-8 h-8 stroke-[3]" /> : <Menu className="w-8 h-8 stroke-[3]" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t-4 border-neo-black bg-neo-pink">
            <div className="flex flex-col p-4 gap-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`block w-full text-left px-4 py-3 text-xl font-black uppercase border-4 border-neo-black ${
                    activeSection === item.id
                      ? "bg-neo-yellow shadow-[4px_4px_0px_rgba(17,17,17,1)]"
                      : "bg-white hover:bg-neo-yellow"
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
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 relative z-10">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t-4 border-neo-black bg-neo-yellow relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-lg text-neo-black font-black uppercase tracking-tight">
            CoreExplore © 2026
          </p>
          <div className="flex items-center gap-4 text-sm font-bold uppercase text-neo-black bg-white px-4 py-2 border-4 border-neo-black shadow-[4px_4px_0px_rgba(17,17,17,1)]">
            <span>React</span>
            <span className="w-2 h-2 bg-neo-black rounded-none"></span>
            <span>FastAPI</span>
            <span className="w-2 h-2 bg-neo-black rounded-none"></span>
            <span>SQLite</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
