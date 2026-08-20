import React, { useEffect, useRef } from 'react';
import { ArrowRight, Terminal, Calendar, MapPin, Code2, Sparkles, Layers } from 'lucide-react';
import gsap from 'gsap';

export default function Hero({ onOpenRegister }) {
  const heroRef = useRef(null);
  const badgeRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const descRef = useRef(null);
  const ctaRef = useRef(null);
  const tickerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Create entrance timeline
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        badgeRef.current,
        { opacity: 0, y: -20, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8 }
      )
        .fromTo(
          titleRef.current,
          { opacity: 0, y: 30, clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)' },
          { opacity: 1, y: 0, clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)', duration: 1.0 },
          '-=0.4'
        )
        .fromTo(
          subtitleRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.7 },
          '-=0.5'
        )
        .fromTo(
          descRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.7 },
          '-=0.5'
        )
        .fromTo(
          ctaRef.current?.children || [],
          { opacity: 0, y: 20, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.15 },
          '-=0.4'
        )
        .fromTo(
          tickerRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.8 },
          '-=0.3'
        );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const handleScrollTo = (e, targetId) => {
    e.preventDefault();
    const elem = document.querySelector(targetId);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section
      id="home"
      ref={heroRef}
      className="df-section df-hero relative min-h-screen flex flex-col justify-between pt-28 pb-12 overflow-hidden"
    >
      {/* Dynamic Background Glowing Orbs */}
      <div className="glow-orb-blue top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2" />
      <div className="glow-orb-purple bottom-1/3 right-1/4 translate-x-1/2" />

      {/* Floating Low-Opacity Code Fragments Visual Layer */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-15 select-none font-mono text-xs text-blue-300/40">
        <div className="absolute top-24 left-[10%] animate-pulse">import &#123; Gemini, VectorDB &#125; from '@google/ai';</div>
        <div className="absolute top-48 right-[12%]">const event = await DevFest2026.init(&#123; location: 'Noida' &#125;);</div>
        <div className="absolute bottom-40 left-[15%]">function buildFuture() &#123; return community.ship(); &#125;</div>
      </div>

      <div className="df-shell df-hero-shell max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex-1 flex flex-col justify-center items-center text-center relative z-10 my-auto">
        {/* Small Event Badge */}
        <div
          ref={badgeRef}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/80 border border-blue-500/30 text-xs font-mono text-blue-400 mb-8 backdrop-blur-md shadow-lg shadow-blue-500/10"
        >
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
          </span>
          <span className="text-slate-300">GDG Noida Presents</span>
          <span className="text-white font-semibold">DevFest 2026</span>
          <span className="bg-blue-500/20 text-blue-300 text-[10px] px-2 py-0.5 rounded font-bold uppercase border border-blue-400/30">
            2026 Edition
          </span>
        </div>

        {/* Main Heading with Gradient & Text Reveal */}
        <h1
          ref={titleRef}
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight font-heading leading-tight mb-6"
        >
          DevFest <span className="text-gradient-blue">Noida 2026</span>
        </h1>

        {/* Supporting Tagline */}
        <h2
          ref={subtitleRef}
          className="text-xl sm:text-2xl md:text-3xl font-semibold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-teal-300 to-green-400 mb-6"
        >
          Build. Connect. Ship the Future.
        </h2>

        {/* Description */}
        <p
          ref={descRef}
          className="max-w-2xl text-slate-400 text-base sm:text-lg leading-relaxed mb-10 font-sans"
        >
          Where developers, builders, and technology communities come together to explore what’s next in generative AI, cloud engineering, web architecture, and mobile innovation.
        </p>

        {/* CTAs */}
        <div ref={ctaRef} className="flex flex-wrap items-center justify-center gap-4 mb-16">
          <a
            href="#tracks"
            onClick={(e) => handleScrollTo(e, '#tracks')}
            className="group relative inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 text-white font-mono text-sm font-semibold shadow-xl shadow-blue-500/20 transition-all duration-300 hover:scale-105 hover:shadow-blue-500/40 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <span>Explore DevFest</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </a>

          <a
            href="#terminal"
            onClick={(e) => handleScrollTo(e, '#terminal')}
            className="group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl bg-slate-900/90 text-slate-200 border border-white/15 font-mono text-sm font-semibold transition-all duration-300 hover:bg-slate-800 hover:text-white hover:border-blue-400/50 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <Terminal className="w-4 h-4 text-blue-400 group-hover:text-blue-300 transition-colors" />
            <span>Open Terminal</span>
          </a>
        </div>

        {/* Micro Info Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl w-full text-xs font-mono">
          <div className="p-3 rounded-xl bg-slate-900/40 border border-white/5 flex items-center justify-center gap-2 text-slate-300 backdrop-blur-sm">
            <MapPin className="w-4 h-4 text-red-400" />
            <span>Noida, UP, India</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-900/40 border border-white/5 flex items-center justify-center gap-2 text-slate-300 backdrop-blur-sm">
            <Calendar className="w-4 h-4 text-blue-400" />
            <span>Coming 2026</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-900/40 border border-white/5 flex items-center justify-center gap-2 text-slate-300 backdrop-blur-sm">
            <Code2 className="w-4 h-4 text-green-400" />
            <span>6 Key Tech Tracks</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-900/40 border border-white/5 flex items-center justify-center gap-2 text-slate-300 backdrop-blur-sm">
            <Layers className="w-4 h-4 text-yellow-400" />
            <span>GDG Community</span>
          </div>
        </div>
      </div>

      {/* Event Information Ticker Strip */}
      <div ref={tickerRef} className="w-full mt-12 py-3 bg-slate-950/80 border-y border-white/10 overflow-hidden select-none">
        <div className="animate-ticker text-xs font-mono tracking-widest uppercase text-slate-400">
          <span className="mx-6 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500" /> Noida • 2026 • Developers • Community • Innovation
          </span>
          <span className="mx-6 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500" /> Generative AI • Cloud • Web • Android • Firebase
          </span>
          <span className="mx-6 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-yellow-500" /> GDG Noida • Open Source • Tech Keynotes
          </span>
          <span className="mx-6 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500" /> Noida • 2026 • Developers • Community • Innovation
          </span>
          <span className="mx-6 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-500" /> Generative AI • Cloud • Web • Android • Firebase
          </span>
        </div>
      </div>
    </section>
  );
}
