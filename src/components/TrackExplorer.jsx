import React, { useEffect, useRef, useState } from 'react';
import { Cpu, Globe, Cloud, Smartphone, Flame, Terminal, ArrowUpRight, Layers, Code } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { tracksData } from '../data/tracksData';

gsap.registerPlugin(ScrollTrigger);

const iconMap = {
  Cpu: Cpu,
  Globe: Globe,
  Cloud: Cloud,
  Smartphone: Smartphone,
  Flame: Flame,
  Terminal: Terminal
};

export default function TrackExplorer() {
  const sectionRef = useRef(null);
  const cardsGridRef = useRef(null);
  const [activeCard, setActiveCard] = useState(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = cardsGridRef.current?.children || [];
      
      // Ensure visible default state
      gsap.set(cards, { opacity: 1, y: 0, scale: 1 });

      gsap.from(cards, {
        opacity: 0,
        y: 40,
        scale: 0.96,
        duration: 0.7,
        stagger: 0.1,
        ease: 'power3.out',
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

  // 3D Tilt & Glow cursor tracker
  const handleMouseMove = (e, cardId) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 22; // Subtile professional tilt
    const rotateY = (centerX - x) / 22;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(6px)`;
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  };

  const handleMouseLeave = (e) => {
    const card = e.currentTarget;
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
  };

  return (
    <section id="tracks" ref={sectionRef} className="df-section py-24 relative">
      <div className="df-shell max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-purple-500/30 text-purple-400 text-xs font-mono mb-3">
            <Layers className="w-3.5 h-3.5" />
            <span>Targeted Technology Learning</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-heading text-white tracking-tight">
            Choose Your <span className="text-gradient-google">Track</span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto mt-3 font-sans">
            Dive deep into technologies shaping the next generation of software products.
          </p>
        </div>

        {/* Tracks Grid */}
        <div ref={cardsGridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tracksData.map((track) => {
            const IconComponent = iconMap[track.iconName] || Code;
            const isHovered = activeCard === track.id;

            return (
              <div
                key={track.id}
                tabIndex={0}
                role="region"
                aria-label={`${track.title} track details`}
                onMouseEnter={() => setActiveCard(track.id)}
                onMouseLeave={(e) => {
                  setActiveCard(null);
                  handleMouseLeave(e);
                }}
                onMouseMove={(e) => handleMouseMove(e, track.id)}
                onFocus={() => setActiveCard(track.id)}
                onBlur={() => setActiveCard(null)}
                className="group relative rounded-2xl p-6 bg-slate-900/60 border border-white/10 backdrop-blur-xl transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
                style={{
                  boxShadow: isHovered ? `0 16px 36px -10px ${track.accentColor}30` : 'none',
                  borderColor: isHovered ? track.accentColor : 'rgba(255, 255, 255, 0.1)'
                }}
              >
                {/* Mouse-follow spot light overlay */}
                <div
                  className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: `radial-gradient(400px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${track.accentColor}15, transparent 80%)`
                  }}
                />

                {/* Top Row: Icon + Level Badge */}
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center border transition-transform duration-300 group-hover:scale-110"
                      style={{
                        backgroundColor: `${track.accentColor}15`,
                        borderColor: `${track.accentColor}40`,
                        color: track.accentColor
                      }}
                    >
                      <IconComponent className="w-6 h-6" />
                    </div>

                    <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-slate-300">
                      {track.level}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-xl font-bold font-heading text-white group-hover:text-blue-300 transition-colors flex items-center justify-between">
                    <span>{track.title}</span>
                    <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-slate-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </h3>
                  <p className="text-slate-400 text-sm mt-2.5 leading-relaxed font-sans">
                    {track.description}
                  </p>
                </div>

                {/* Bottom Tags */}
                <div className="mt-6 pt-4 border-t border-white/5">
                  <div className="flex flex-wrap gap-1.5">
                    {track.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-950/80 border border-white/10 text-slate-300 group-hover:border-white/20 transition-colors"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
