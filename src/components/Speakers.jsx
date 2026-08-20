import React, { useEffect, useRef } from 'react';
import { Users, Sparkles, Code2, ExternalLink } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { speakersData } from '../data/speakersData';

gsap.registerPlugin(ScrollTrigger);

export default function Speakers() {
  const sectionRef = useRef(null);
  const gridRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gridRef.current?.children || [];

      // Safe default visibility
      gsap.set(cards, { opacity: 1, y: 0 });

      gsap.from(cards, {
        opacity: 0,
        y: 40,
        duration: 0.7,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
          once: true
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="speakers" ref={sectionRef} className="df-section py-24 relative">
      <div className="df-shell max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-green-500/30 text-green-400 text-xs font-mono mb-3">
            <Users className="w-3.5 h-3.5" />
            <span>Community Speakers & Thought Leaders</span>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-3">
            <h2 className="text-3xl sm:text-5xl font-extrabold font-heading text-white tracking-tight">
              Meet the <span className="text-gradient-blue">Builders</span>
            </h2>
            {/* Explicit safe sample lineup disclaimer tag */}
            <span className="bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 text-[11px] font-mono font-semibold px-3 py-1 rounded-full">
              Sample Lineup — Speakers To Be Announced
            </span>
          </div>

          <p className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto font-sans">
            People sharing ideas, lessons, and technologies shaping tomorrow.
          </p>
        </div>

        {/* Speakers Grid with Equal Heights */}
        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {speakersData.map((speaker) => (
            <div
              key={speaker.id}
              className="group relative rounded-2xl bg-slate-900/80 border border-white/10 overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:border-white/25 shadow-xl flex flex-col justify-between h-full"
            >
              {/* Top Accent Gradient Line */}
              <div
                className="h-1 w-full shrink-0"
                style={{ backgroundColor: speaker.accentColor }}
              />

              {/* Card Image Area */}
              <div className="relative h-60 w-full overflow-hidden bg-slate-950 shrink-0">
                <img
                  src={speaker.avatar}
                  alt={speaker.name}
                  loading="lazy"
                  className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105 filter brightness-90 group-hover:brightness-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F1D] via-transparent to-transparent" />

                {/* Track Tag Overlay */}
                <div className="absolute top-3 left-3">
                  <span
                    className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full backdrop-blur-md border text-white"
                    style={{
                      backgroundColor: `${speaker.accentColor}40`,
                      borderColor: `${speaker.accentColor}60`
                    }}
                  >
                    {speaker.track}
                  </span>
                </div>
              </div>

              {/* Card Content Area */}
              <div className="p-6 relative flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold font-heading text-white group-hover:text-blue-300 transition-colors">
                    {speaker.name}
                  </h3>
                  <p className="text-xs font-mono text-slate-400 mt-1">
                    {speaker.role} <span className="text-slate-600">•</span> {speaker.company}
                  </p>

                  {/* Session Topic Box */}
                  <div className="mt-4 p-3 rounded-xl bg-slate-950/60 border border-white/5 group-hover:border-white/10 transition-colors">
                    <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-400 mb-1">
                      <Code2 className="w-3.5 h-3.5 text-blue-400" />
                      <span>Session Topic</span>
                    </div>
                    <p className="text-xs font-sans text-slate-200 font-medium leading-snug">
                      {speaker.topic}
                    </p>
                  </div>
                </div>

                {/* Social Icons Placeholder Links */}
                <div className="mt-5 pt-3 border-t border-white/5 flex items-center justify-between">
                  <span className="text-[11px] font-mono text-slate-500">Connect:</span>
                  <div className="flex items-center gap-2">
                    <a
                      href={speaker.twitter}
                      aria-label={`${speaker.name} Twitter profile placeholder`}
                      onClick={(e) => e.preventDefault()}
                      className="p-1.5 text-slate-400 hover:text-blue-400 rounded hover:bg-white/5 transition-colors focus:outline-none focus:ring-1 focus:ring-blue-400"
                    >
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                      </svg>
                    </a>
                    <a
                      href={speaker.github}
                      aria-label={`${speaker.name} GitHub profile placeholder`}
                      onClick={(e) => e.preventDefault()}
                      className="p-1.5 text-slate-400 hover:text-white rounded hover:bg-white/5 transition-colors focus:outline-none focus:ring-1 focus:ring-blue-400"
                    >
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                      </svg>
                    </a>
                    <a
                      href={speaker.linkedin}
                      aria-label={`${speaker.name} LinkedIn profile placeholder`}
                      onClick={(e) => e.preventDefault()}
                      className="p-1.5 text-slate-400 hover:text-blue-500 rounded hover:bg-white/5 transition-colors focus:outline-none focus:ring-1 focus:ring-blue-400"
                    >
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.74a1.64 1.64 0 1 0 0 3.28 1.64 1.64 0 0 0 0-3.28z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
