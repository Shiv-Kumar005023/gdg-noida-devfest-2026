import React, { useEffect, useRef } from 'react';
import { Users, Code2, Sparkles, Globe } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Stats() {
  const sectionRef = useRef(null);
  const gridRef = useRef(null);

  const stats = [
    {
      value: 'Growing',
      label: 'Developer Community',
      sub: 'Engineers, builders & students in Noida',
      icon: Users,
      color: '#4285F4'
    },
    {
      value: '6 Tracks',
      label: 'Technology Tracks',
      sub: 'AI, Web, Cloud, Android, Firebase & DX',
      icon: Code2,
      color: '#EA4335'
    },
    {
      value: 'Full-Day',
      label: 'Experience',
      sub: 'Keynotes, breakout labs & demos',
      icon: Sparkles,
      color: '#FBBC05'
    },
    {
      value: 'One',
      label: 'Developer Community',
      sub: 'Powered by GDG Noida & community',
      icon: Globe,
      color: '#34A853'
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gridRef.current?.children || [];
      gsap.set(cards, { opacity: 1, y: 0 });

      gsap.from(cards, {
        opacity: 0,
        y: 30,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
          once: true
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="df-section py-20 relative">
      <div className="df-shell max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className="group p-6 rounded-2xl bg-slate-900/60 border border-white/10 backdrop-blur-xl transition-all duration-300 hover:border-white/25 hover:-translate-y-1 shadow-lg flex flex-col justify-between"
              >
                <div>
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center border mb-4 transition-transform group-hover:scale-110"
                    style={{
                      backgroundColor: `${stat.color}15`,
                      borderColor: `${stat.color}40`,
                      color: stat.color
                    }}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="text-2xl sm:text-3xl font-extrabold font-heading text-white tracking-tight">
                    {stat.value}
                  </div>
                  <div className="text-sm font-semibold text-slate-300 mt-1">
                    {stat.label}
                  </div>
                </div>
                <div className="text-xs font-mono text-slate-400 mt-3 pt-3 border-t border-white/5">
                  {stat.sub}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
