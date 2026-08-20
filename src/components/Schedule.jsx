import React, { useEffect, useRef } from 'react';
import { Clock, Coffee, Sparkles, Code, Utensils, Cpu, Flame, Trophy } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { scheduleData } from '../data/scheduleData';

gsap.registerPlugin(ScrollTrigger);

const iconMap = {
  Coffee: Coffee,
  Sparkles: Sparkles,
  Code: Code,
  Utensils: Utensils,
  Cpu: Cpu,
  Flame: Flame,
  Trophy: Trophy
};

export default function Schedule() {
  const sectionRef = useRef(null);
  const lineRef = useRef(null);
  const itemsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Animate vertical progress line growth as user scrolls
      if (lineRef.current) {
        gsap.fromTo(
          lineRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 70%',
              end: 'bottom 80%',
              scrub: 0.5
            }
          }
        );
      }

      // 2. Animate schedule items into view safely
      itemsRef.current.forEach((item, index) => {
        if (!item) return;

        // Ensure visible fallback state
        gsap.set(item, { opacity: 1, x: 0 });

        gsap.from(item, {
          opacity: 0,
          y: 30,
          x: index % 2 === 0 ? -30 : 30,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 88%',
            toggleActions: 'play none none none', // Never hide once revealed
            once: true
          }
        });
      });

      // 3. Refresh ScrollTrigger after layout calculation
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 200);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="schedule" ref={sectionRef} className="df-section py-24 relative">
      <div className="df-shell max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-yellow-500/30 text-yellow-400 text-xs font-mono mb-3">
            <Clock className="w-3.5 h-3.5" />
            <span>Event Journey & Timeline</span>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-3">
            <h2 className="text-3xl sm:text-5xl font-extrabold font-heading text-white tracking-tight">
              A Day at <span className="text-gradient-google">DevFest</span>
            </h2>
            <span className="bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 text-[11px] font-mono font-semibold px-3 py-1 rounded-full">
              Demo Schedule
            </span>
          </div>

          <p className="text-slate-400 text-base sm:text-lg max-w-xl mx-auto font-sans">
            Immerse yourself in a full day of inspiring keynotes, technical deep-dives, and community labs.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative min-h-[500px]">
          {/* Static Background Track Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-white/10 -translate-x-1/2" />
          
          {/* Dynamic GSAP Animated Scrubbing Gradient Line */}
          <div
            ref={lineRef}
            className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 via-red-500 via-yellow-500 to-green-500 -translate-x-1/2 origin-top rounded-full shadow-[0_0_12px_rgba(66,133,244,0.5)]"
          />

          {/* Schedule Event Cards List */}
          <div className="space-y-12 relative z-10">
            {scheduleData.map((item, idx) => {
              const IconComponent = iconMap[item.iconName] || Clock;
              const isEven = idx % 2 === 0;

              return (
                <div
                  key={idx}
                  ref={(el) => (itemsRef.current[idx] = el)}
                  className={`relative flex flex-col md:flex-row items-start transition-all duration-300 ${
                    isEven ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Timeline Node Center Marker */}
                  <div className="absolute left-4 md:left-1/2 -translate-x-1/2 z-20 w-9 h-9 rounded-full bg-[#0B0F19] border-2 border-white/30 flex items-center justify-center shadow-xl transition-transform duration-300 hover:scale-125"
                       style={{ borderColor: item.accent }}>
                    <div
                      className="w-3.5 h-3.5 rounded-full animate-pulse"
                      style={{ backgroundColor: item.accent }}
                    />
                  </div>

                  {/* Event Card Content Box */}
                  <div className={`ml-12 md:ml-0 md:w-1/2 ${isEven ? 'md:pr-12' : 'md:pl-12'} w-full`}>
                    <div className="p-6 rounded-2xl bg-slate-900/80 border border-white/10 backdrop-blur-xl transition-all duration-300 hover:border-white/25 hover:bg-slate-900/95 shadow-xl group">
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span
                          className="font-mono text-xs font-bold px-3 py-1 rounded-md border"
                          style={{
                            backgroundColor: `${item.accent}20`,
                            borderColor: `${item.accent}50`,
                            color: item.accent
                          }}
                        >
                          {item.time}
                        </span>
                        <span className="text-[11px] font-mono text-slate-400">
                          {item.category}
                        </span>
                      </div>

                      <h3 className="text-xl font-bold font-heading text-white group-hover:text-blue-300 transition-colors">
                        {item.title}
                      </h3>

                      <p className="text-slate-400 text-xs sm:text-sm mt-2 leading-relaxed font-sans">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
