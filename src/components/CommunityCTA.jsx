import React from 'react';
import { ArrowRight, Sparkles, ExternalLink, ShieldCheck } from 'lucide-react';

export default function CommunityCTA({ onOpenRegister }) {
  return (
    <section className="df-section df-cta py-24 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="glow-orb-blue top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-70" />

      <div className="df-shell max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-blue-500/30 text-blue-400 text-xs font-mono mb-4">
          <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
          <span>Join The Developer Community</span>
        </div>

        <h2 className="text-4xl sm:text-6xl font-extrabold font-heading text-white tracking-tight leading-tight">
          Ready to Build <span className="text-gradient-google">What’s Next?</span>
        </h2>

        <p className="max-w-2xl mx-auto text-slate-300 text-base sm:text-xl mt-4 leading-relaxed font-sans">
          Join developers, designers, builders, and community leaders at DevFest Noida 2026. Be part of the conversation shaping the future.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={onOpenRegister}
            className="group relative inline-flex items-center gap-2.5 px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 text-white font-mono text-sm font-semibold shadow-2xl shadow-blue-500/25 transition-all duration-300 hover:scale-105 hover:shadow-blue-500/40 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <Sparkles className="w-4 h-4 text-yellow-300" />
            <span>Register Interest</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>

          <a
            href="https://gdg.community.dev/gdg-noida/"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2.5 px-8 py-4 rounded-xl bg-slate-900/90 text-slate-200 border border-white/15 font-mono text-sm font-semibold transition-all duration-300 hover:bg-slate-800 hover:text-white hover:border-blue-400/50 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <span>Join GDG Noida</span>
            <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-blue-400 transition-colors" />
          </a>
        </div>

        <div className="mt-12 inline-flex items-center gap-2 text-xs font-mono text-slate-400">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Open to all developers, students & tech enthusiasts</span>
        </div>
      </div>
    </section>
  );
}
