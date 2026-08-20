import React, { useState, useRef } from 'react';
import { BadgeCheck, Download, Sparkles, RefreshCw, QrCode, Shield, Terminal } from 'lucide-react';
import confetti from 'canvas-confetti';
import html2canvas from 'html2canvas';

export default function BadgeGenerator() {
  const [name, setName] = useState('Alex Rivers');
  const [role, setRole] = useState('Developer');
  const [badgeId, setBadgeId] = useState('DFN26-4821');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const badgeRef = useRef(null);

  const roles = [
    'Developer',
    'Student',
    'Designer',
    'Founder',
    'Community Builder',
    'AI Engineer',
    'Cloud Architect'
  ];

  const handleGenerate = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    setIsGenerating(true);

    setTimeout(() => {
      // Generate unique hash
      const randomCode = Math.floor(1000 + Math.random() * 9000);
      setBadgeId(`DFN26-${randomCode}`);
      setIsGenerating(false);

      // Trigger confetti celebration
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    }, 400);
  };

  const handleDownload = async () => {
    if (!badgeRef.current) return;
    setIsDownloading(true);

    try {
      const canvas = await html2canvas(badgeRef.current, {
        scale: 3, // High resolution output
        backgroundColor: '#07090E',
        useCORS: true,
        logging: false
      });

      const image = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = image;
      link.download = `DevFest-Noida-Badge-${name.replace(/\s+/g, '_')}.png`;
      link.click();
    } catch (err) {
      console.error('Failed to export badge image:', err);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <section id="badge" className="df-section py-24 relative">
      <div className="df-shell max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-blue-500/30 text-blue-400 text-xs font-mono mb-3">
            <BadgeCheck className="w-3.5 h-3.5" />
            <span>Interactive Dev Passport</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold font-heading text-white tracking-tight">
            Generate Your <span className="text-gradient-blue">DevFest Badge</span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg max-w-xl mx-auto mt-3 font-sans">
            Create your personalized developer identity for DevFest Noida 2026 and download your digital pass.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Controls Form Side */}
          <div className="lg:col-span-5 bg-slate-900/80 border border-white/10 p-6 sm:p-8 rounded-2xl backdrop-blur-xl shadow-2xl">
            <form onSubmit={handleGenerate} className="space-y-6">
              <div>
                <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-2">
                  Your Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name..."
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-white/10 text-white font-sans outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                  maxLength={30}
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-2">
                  Select Role
                </label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-white/10 text-white font-sans outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors cursor-pointer"
                >
                  {roles.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <button
                  type="submit"
                  disabled={isGenerating}
                  className="flex-1 py-3.5 px-5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-mono text-xs font-semibold tracking-wider uppercase transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20 active:scale-95 disabled:opacity-50"
                >
                  <Sparkles className="w-4 h-4 text-yellow-300" />
                  <span>{isGenerating ? 'Rendering...' : 'Generate Badge'}</span>
                </button>

                <button
                  type="button"
                  onClick={handleDownload}
                  disabled={isDownloading}
                  className="py-3.5 px-5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-white/15 text-slate-200 font-mono text-xs font-semibold tracking-wider uppercase transition-all duration-200 flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50"
                >
                  <Download className="w-4 h-4 text-blue-400" />
                  <span>{isDownloading ? 'Exporting...' : 'Download PNG'}</span>
                </button>
              </div>
            </form>
          </div>

          {/* Badge Display Card Preview Side */}
          <div className="lg:col-span-7 flex justify-center">
            <div
              ref={badgeRef}
              className="relative w-full max-w-sm rounded-3xl p-6 bg-gradient-to-br from-slate-900 via-[#0E1526] to-[#0A0D17] border-2 border-white/15 shadow-2xl shadow-blue-500/10 overflow-hidden font-sans group transition-transform duration-300 hover:scale-[1.02]"
            >
              {/* Top Decorative Google Colors Bar */}
              <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-blue-500 via-red-500 via-yellow-500 to-green-500" />
              
              {/* Background Glass Orb Effect */}
              <div className="absolute -right-20 -bottom-20 w-56 h-56 rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />

              {/* Badge Header Branding */}
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-blue-600/20 border border-blue-500/40 flex items-center justify-center">
                    <Terminal className="w-4 h-4 text-blue-400" />
                  </div>
                  <div>
                    <div className="font-extrabold text-sm text-white tracking-wide font-heading">
                      GDG NOIDA
                    </div>
                    <div className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">
                      DevFest 2026
                    </div>
                  </div>
                </div>

                <div className="px-2.5 py-1 rounded-md bg-blue-500/10 border border-blue-500/30 text-blue-400 font-mono text-[10px] font-bold">
                  ATTENDEE PASS
                </div>
              </div>

              {/* User Identity Details */}
              <div className="space-y-4 my-6">
                <div>
                  <span className="text-[10px] uppercase font-mono text-slate-400 tracking-wider">
                    Attendee Name
                  </span>
                  <h3 className="text-2xl font-extrabold font-heading text-white tracking-tight leading-tight truncate">
                    {name || 'Alex Rivers'}
                  </h3>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-mono text-slate-400 tracking-wider">
                      Designation / Role
                    </span>
                    <div className="text-sm font-semibold text-blue-300 font-mono flex items-center gap-1.5 mt-0.5">
                      <Shield className="w-3.5 h-3.5 text-blue-400" />
                      <span>{role}</span>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] uppercase font-mono text-slate-400 tracking-wider">
                      Pass Hash
                    </span>
                    <div className="text-xs font-mono font-bold text-slate-200 mt-0.5">
                      {badgeId}
                    </div>
                  </div>
                </div>
              </div>

              {/* QR Code Graphic & Footer Security Pattern */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-slate-950 border border-white/10 p-1.5 flex items-center justify-center">
                    <QrCode className="w-full h-full text-slate-300" />
                  </div>
                  <div className="text-[10px] font-mono text-slate-400 leading-tight">
                    <div>SCAN AT ENTRY</div>
                    <div className="text-slate-400 font-semibold">NOIDA • 2026</div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-[9px]">
                    ● VERIFIED PASS
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
