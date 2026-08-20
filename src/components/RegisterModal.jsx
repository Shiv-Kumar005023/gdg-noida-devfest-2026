import React, { useState, useEffect, useRef } from 'react';
import { X, Sparkles, CheckCircle2, Terminal } from 'lucide-react';
import confetti from 'canvas-confetti';
import gsap from 'gsap';

export default function RegisterModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'Developer',
    track: 'AI & Machine Learning'
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const modalRef = useRef(null);
  const backdropRef = useRef(null);

  // GSAP Entrance Animation ensuring final state: scale: 1, opacity: 1, y: 0
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      if (modalRef.current && backdropRef.current) {
        gsap.fromTo(
          backdropRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.25, ease: 'power2.out' }
        );
        gsap.fromTo(
          modalRef.current,
          { opacity: 0, scale: 0.94, y: 15 },
          { opacity: 1, scale: 1, y: 0, duration: 0.35, ease: 'back.out(1.2)' }
        );
      }
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);

      // Trigger celebration confetti
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.5 }
      });
    }, 500);
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData({
      name: '',
      email: '',
      role: 'Developer',
      track: 'AI & Machine Learning'
    });
    onClose();
  };

  return (
    <div
      ref={backdropRef}
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md transition-opacity"
    >
      {/* 1. Modal Container */}
      <div
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
        className="relative rounded-3xl bg-[#090D18] border border-white/15 shadow-2xl shadow-blue-500/10 font-sans text-slate-100 backdrop-blur-2xl box-border"
        style={{
          width: 'min(92vw, 620px)',
          maxWidth: '620px',
          height: 'auto',
          minHeight: 'unset',
          maxHeight: '90vh',
          overflowY: 'auto',
          overflowX: 'hidden'
        }}
      >
        {/* Top Google Colors Accent Bar */}
        <div className="h-1.5 w-full bg-gradient-to-r from-blue-500 via-red-500 via-yellow-500 to-green-500" />

        {/* 2. Modal Inner Content */}
        <div
          className="relative p-6 sm:p-8"
          style={{
            position: 'relative',
            height: 'auto',
            overflow: 'visible',
            padding: '32px'
          }}
        >
          {/* Top Registration Label + Close Button Row in Normal Flow */}
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2 text-blue-400 font-mono text-xs font-semibold">
              <Terminal className="w-4 h-4 text-blue-400 shrink-0" />
              <span>DevFest Noida 2026 Registration</span>
            </div>

            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white rounded-xl bg-white/5 hover:bg-white/10 transition-colors focus:outline-none focus:ring-1 focus:ring-blue-400 shrink-0"
              aria-label="Close portal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {!submitted ? (
            <div>
              {/* 4. Heading with Required Structural Rules */}
              <h3
                className="text-2xl sm:text-3xl font-extrabold font-heading text-white tracking-tight"
                style={{
                  display: 'block',
                  overflow: 'visible',
                  whiteSpace: 'normal',
                  lineHeight: 1.15,
                  marginTop: '8px',
                  marginBottom: '10px'
                }}
              >
                Register Your Interest
              </h3>

              {/* Description */}
              <p className="text-slate-400 text-xs sm:text-sm mb-5 leading-relaxed font-sans">
                Join the priority list for ticket drops, keynote announcements, and developer workshop passes.
              </p>

              {/* Form Flow */}
              <form onSubmit={handleSubmit} className="space-y-4.5">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 font-semibold mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Alex Rivers"
                    className="w-full h-12 min-h-[44px] px-4 rounded-xl bg-[#04060C] border border-white/15 text-white font-sans text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-slate-600"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 font-semibold mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="alex@domain.dev"
                    className="w-full h-12 min-h-[44px] px-4 rounded-xl bg-[#04060C] border border-white/15 text-white font-sans text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-slate-600"
                    required
                  />
                </div>

                {/* 2 Columns on Desktop, Stacked on Mobile */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4.5">
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 font-semibold mb-2">
                      Primary Role
                    </label>
                    <select
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                      className="w-full h-12 min-h-[44px] px-3.5 rounded-xl bg-[#04060C] border border-white/15 text-white font-sans text-xs sm:text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 cursor-pointer"
                    >
                      <option value="Developer">Developer</option>
                      <option value="Student">Student</option>
                      <option value="Designer">Designer</option>
                      <option value="Founder">Founder</option>
                      <option value="Community Leader">Community Leader</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 font-semibold mb-2">
                      Preferred Track
                    </label>
                    <select
                      value={formData.track}
                      onChange={(e) => setFormData({ ...formData, track: e.target.value })}
                      className="w-full h-12 min-h-[44px] px-3.5 rounded-xl bg-[#04060C] border border-white/15 text-white font-sans text-xs sm:text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 cursor-pointer"
                    >
                      <option value="AI & Machine Learning">AI & ML</option>
                      <option value="Web Architecture">Web Architecture</option>
                      <option value="Cloud & Infrastructure">Cloud</option>
                      <option value="Android & Mobile">Android</option>
                      <option value="Firebase & App Backend">Firebase</option>
                      <option value="Developer Experience">DX</option>
                    </select>
                  </div>
                </div>

                {/* Normal Document Flow CTA Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-12 min-h-[44px] mt-5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 hover:from-blue-500 hover:to-indigo-500 text-white font-mono text-xs sm:text-sm font-bold tracking-wider uppercase transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-blue-500/25 active:scale-95 disabled:opacity-50"
                >
                  <Sparkles className="w-4 h-4 text-yellow-300" />
                  <span>{isSubmitting ? 'Registering...' : 'Confirm Registration'}</span>
                </button>
              </form>
            </div>
          ) : (
            <div className="text-center py-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto mb-4 animate-bounce">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <h3 className="text-2xl font-bold font-heading text-white">
                Registration Confirmed!
              </h3>
              <p className="text-slate-300 text-sm mt-2 max-w-sm mx-auto font-sans leading-relaxed">
                Thank you, <span className="text-blue-400 font-semibold">{formData.name}</span>! We’ve reserved your priority spot for <span className="text-white font-medium">{formData.track}</span>.
              </p>

              <div className="mt-6 p-4 rounded-2xl bg-[#04060C] border border-white/10 text-xs font-mono text-left space-y-2">
                <div className="flex justify-between text-slate-400">
                  <span>STATUS:</span>
                  <span className="text-emerald-400 font-semibold">● REGISTERED</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>PASS ID:</span>
                  <span className="text-slate-200">DFN26-REG-{Math.floor(1000 + Math.random() * 9000)}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>ROLE:</span>
                  <span className="text-blue-300">{formData.role}</span>
                </div>
              </div>

              <button
                onClick={handleReset}
                className="mt-6 h-11 px-8 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-mono text-xs font-semibold"
              >
                Done
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
