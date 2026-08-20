import React, { useState, useEffect } from 'react';
import { Terminal, Menu, X, Sparkles } from 'lucide-react';

export default function Navbar({ onOpenRegister }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '#home', id: 'home' },
    { name: 'Terminal', href: '#terminal', id: 'terminal' },
    { name: 'Tracks', href: '#tracks', id: 'tracks' },
    { name: 'Speakers', href: '#speakers', id: 'speakers' },
    { name: 'Schedule', href: '#schedule', id: 'schedule' },
    { name: 'Badge', href: '#badge', id: 'badge' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      // Toggle scrolled class
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Track active section
      const sections = navLinks.map(link => document.querySelector(link.href)).filter(Boolean);
      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section.offsetTop <= scrollPosition) {
          setActiveSection(navLinks[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetElement = document.querySelector(href);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'py-3 bg-[#07090E]/80 backdrop-blur-md border-b border-white/10 shadow-2xl shadow-black/50'
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="df-nav-shell max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* GDG Noida Logo & Branding */}
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, '#home')}
          className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-blue-500/50 rounded-lg p-1"
        >
          <div className="relative w-9 h-9 rounded-lg bg-slate-900 border border-white/10 flex items-center justify-center overflow-hidden transition-all duration-300 group-hover:border-blue-500/50 group-hover:scale-105">
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 via-red-500/10 to-green-500/20 opacity-0 group-hover:opacity-100 transition-opacity" />
            <Terminal className="w-5 h-5 text-blue-400 group-hover:text-white transition-colors" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5 font-bold text-sm sm:text-base tracking-tight text-white">
              <span>GDG Noida</span>
              <span className="inline-block w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            </div>
            <span className="text-[10px] uppercase tracking-widest text-slate-400 font-mono">
              DevFest 2026
            </span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-900/60 border border-white/10 rounded-full px-4 py-1.5 backdrop-blur-sm">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`relative px-4 py-1.5 text-xs font-mono transition-colors rounded-full focus:outline-none focus:ring-1 focus:ring-blue-400 ${
                  isActive
                    ? 'text-white font-semibold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {isActive && (
                  <span className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-400/40 rounded-full -z-10 animate-fade-in" />
                )}
                {link.name}
              </a>
            );
          })}
        </nav>

        {/* CTA & Mobile Menu Toggle */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenRegister}
            className="relative group overflow-hidden px-4 sm:px-5 py-2 rounded-full bg-gradient-to-r from-blue-600 to-blue-500 text-white font-mono text-xs font-semibold tracking-wide transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <span className="relative z-10 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
              Register Interest
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
          </button>

          {/* Mobile hamburger button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
            className="md:hidden p-2 text-slate-300 hover:text-white rounded-lg bg-slate-900/80 border border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-[60px] p-4 bg-[#07090E]/95 border-b border-white/10 backdrop-blur-xl animate-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col gap-2 py-2">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`px-4 py-3 rounded-xl font-mono text-sm flex items-center justify-between border transition-all ${
                    isActive
                      ? 'bg-blue-500/10 border-blue-500/40 text-blue-400 font-bold'
                      : 'border-white/5 text-slate-300 hover:bg-slate-900 hover:border-white/10'
                  }`}
                >
                  <span>{link.name}</span>
                  <span className="text-xs text-slate-400 font-mono">0{navLinks.indexOf(link) + 1}</span>
                </a>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
