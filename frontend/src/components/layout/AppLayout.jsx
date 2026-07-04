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
      <footer className="border-t border-min-structure-light bg-gray-50 pt-16 pb-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 mb-16">
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center gap-2">
                <Box className="w-6 h-6 text-min-accent" strokeWidth={2.5} />
                <span className="font-semibold text-xl tracking-tight text-min-text-main">
                  CoreExplore
                </span>
              </div>
              <p className="text-sm text-min-text-muted leading-relaxed max-w-sm">
                Empowering South African learners with next-gen career discovery to bypass confusion and find clarity faster.
              </p>
              <div className="flex items-center gap-4">
                <a href="#" className="text-min-text-muted hover:text-min-accent transition-colors" aria-label="GitHub">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" /></svg>
                </a>
                <a href="#" className="text-min-text-muted hover:text-min-accent transition-colors" aria-label="LinkedIn">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" /></svg>
                </a>
                <a href="#" className="text-min-text-muted hover:text-min-accent transition-colors" aria-label="Twitter">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
                </a>
              </div>
            </div>
            
            <div className="space-y-6">
              <h4 className="text-xs font-semibold text-min-text-main tracking-wider uppercase">Product</h4>
              <ul className="space-y-4">
                <li><a href="#" onClick={(e) => { e.preventDefault(); onNavigate("home"); }} className="text-sm text-min-text-muted hover:text-min-accent transition-colors">Features</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); onNavigate("quiz"); }} className="text-sm text-min-text-muted hover:text-min-accent transition-colors">Assessment</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); onNavigate("dashboard"); }} className="text-sm text-min-text-muted hover:text-min-accent transition-colors">Dashboard</a></li>
              </ul>
            </div>
            
            <div className="space-y-6">
              <h4 className="text-xs font-semibold text-min-text-main tracking-wider uppercase">Resources</h4>
              <ul className="space-y-4">
                <li><a href="#" className="text-sm text-min-text-muted hover:text-min-accent transition-colors">FAQ</a></li>
                <li><a href="#" className="text-sm text-min-text-muted hover:text-min-accent transition-colors">About Us</a></li>
                <li><a href="#" className="text-sm text-min-text-muted hover:text-min-accent transition-colors">Contact</a></li>
              </ul>
            </div>
            
            <div className="space-y-6">
              <h4 className="text-xs font-semibold text-min-text-main tracking-wider uppercase">Legal</h4>
              <ul className="space-y-4">
                <li><a href="#" className="text-sm text-min-text-muted hover:text-min-accent transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="text-sm text-min-text-muted hover:text-min-accent transition-colors">Terms of Service</a></li>
                <li><a href="#" className="text-sm text-min-text-muted hover:text-min-accent transition-colors">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-min-structure-light flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-min-text-muted uppercase tracking-wider">
              © 2026 CoreExplore. All rights reserved.
            </p>
            <p className="text-xs text-min-text-muted">
              Designed for the modern student.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
