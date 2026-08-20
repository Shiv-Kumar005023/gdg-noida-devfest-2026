import React, { useState } from 'react';
import CustomCursor from './components/CustomCursor';
import ScrollProgress from './components/ScrollProgress';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import DeveloperTerminal from './components/DeveloperTerminal';
import TrackExplorer from './components/TrackExplorer';
import Speakers from './components/Speakers';
import Schedule from './components/Schedule';
import BadgeGenerator from './components/BadgeGenerator';
import Stats from './components/Stats';
import CommunityCTA from './components/CommunityCTA';
import Footer from './components/Footer';
import RegisterModal from './components/RegisterModal';

export default function App() {
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-[#07090E] text-slate-100 selection:bg-blue-500 selection:text-white">
      {/* Interactive Micro-Utilities */}
      <CustomCursor />
      <ScrollProgress />

      {/* Main Layout Navigation */}
      <Navbar onOpenRegister={() => setIsRegisterOpen(true)} />

      {/* Page Sections */}
      <main>
        <Hero onOpenRegister={() => setIsRegisterOpen(true)} />
        <DeveloperTerminal onOpenRegister={() => setIsRegisterOpen(true)} />
        <TrackExplorer />
        <Speakers />
        <Schedule />
        <BadgeGenerator />
        <Stats />
        <CommunityCTA onOpenRegister={() => setIsRegisterOpen(true)} />
      </main>

      {/* Footer & Modal */}
      <Footer />
      <RegisterModal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
      />
    </div>
  );
}
