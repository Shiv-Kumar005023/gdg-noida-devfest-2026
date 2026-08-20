import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, Sparkles, CornerDownLeft, RefreshCw, Copy, Check } from 'lucide-react';
import confetti from 'canvas-confetti';
import {
  INITIAL_TERMINAL_OUTPUT,
  HELP_TEXT,
  ABOUT_TEXT,
  TRACKS_TEXT,
  SPEAKERS_TEXT,
  SCHEDULE_TEXT
} from '../data/terminalCommands';

export default function DeveloperTerminal({ onOpenRegister }) {
  const [history, setHistory] = useState(INITIAL_TERMINAL_OUTPUT);
  const [inputVal, setInputVal] = useState('');
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [copied, setCopied] = useState(false);
  const [easterEggActive, setEasterEggActive] = useState(false);

  const inputRef = useRef(null);
  const terminalEndRef = useRef(null);

  // Auto scroll terminal to bottom
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (cmdStr) => {
    const trimmed = cmdStr.trim().toLowerCase();
    if (!trimmed) return;

    // Add to executed history list for up/down arrow retrieval
    setCommandHistory(prev => [...prev, cmdStr]);
    setHistoryIndex(-1);

    // Record user command entry in terminal view
    const newEntry = { type: 'input', text: `devfest-noida:~$ ${cmdStr}` };

    if (trimmed === 'clear') {
      setHistory([]);
      setInputVal('');
      return;
    }

    let responseText = '';
    let responseType = 'output';

    switch (trimmed) {
      case 'help':
        responseText = HELP_TEXT;
        break;
      case 'about':
        responseText = ABOUT_TEXT;
        break;
      case 'tracks':
        responseText = TRACKS_TEXT;
        break;
      case 'speakers':
        responseText = SPEAKERS_TEXT;
        break;
      case 'schedule':
        responseText = SCHEDULE_TEXT;
        break;
      case 'whoami':
        responseText = `User: Developer Explorer\nSession: Active\nIP: 127.0.0.1 (DevFest Local Hub)`;
        break;
      case 'version':
        responseText = `DevFest CLI v2026.1.0-noida (React + Vite + GSAP)`;
        break;
      case 'register':
        responseText = `[CLI System]: Navigating to Registration Portal...`;
        setTimeout(() => {
          onOpenRegister();
        }, 500);
        break;
      case 'surprise':
        responseText = `⚡ ACHIEVEMENT UNLOCKED: DEVFEST EXPLORER ⚡\n\nYou discovered the DevFest Noida 2026 Easter Egg!\nBuilding the future of technology, one line of code at a time.`;
        responseType = 'surprise';
        triggerConfettiEffect();
        break;
      default:
        responseText = `Command not found: ${cmdStr}\nType "help" to see available commands.`;
        responseType = 'error';
        break;
    }

    setHistory(prev => [...prev, newEntry, { type: responseType, text: responseText }]);
    setInputVal('');
  };

  const triggerConfettiEffect = () => {
    setEasterEggActive(true);
    setTimeout(() => setEasterEggActive(false), 3000);

    const count = 200;
    const defaults = { origin: { y: 0.7 } };

    function fire(particleRatio, opts) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio)
      });
    }

    fire(0.25, { spread: 26, startVelocity: 55, colors: ['#4285F4', '#EA4335'] });
    fire(0.2, { spread: 60, colors: ['#FBBC05', '#34A853'] });
    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
    fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, colors: ['#A142F4', '#FFFFFF'] });
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleCommand(inputVal);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length === 0) return;
      const nextIndex = historyIndex + 1;
      if (nextIndex < commandHistory.length) {
        setHistoryIndex(nextIndex);
        setInputVal(commandHistory[commandHistory.length - 1 - nextIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const nextIndex = historyIndex - 1;
        setHistoryIndex(nextIndex);
        setInputVal(commandHistory[commandHistory.length - 1 - nextIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInputVal('');
      }
    }
  };

  const copyTerminalOutput = () => {
    const textToCopy = history.map(item => item.text).join('\n');
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="terminal" className="df-section py-20 relative">
      {/* Background glow when surprise active */}
      {easterEggActive && (
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-red-500/10 to-green-500/10 animate-pulse pointer-events-none" />
      )}

      <div className="df-shell max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Title */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-blue-500/30 text-blue-400 text-xs font-mono mb-3">
            <TerminalIcon className="w-3.5 h-3.5" />
            <span>Interactive Live Console</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-white tracking-tight">
            Developer <span className="text-gradient-blue">Terminal</span>
          </h2>
          <p className="text-slate-400 text-sm max-w-xl mx-auto mt-2 font-sans">
            Execute commands to query event schedule, speaker lineups, tracks, and unlock secrets.
          </p>
        </div>

        {/* Terminal Container */}
        <div
          onClick={() => inputRef.current?.focus()}
          className={`relative rounded-2xl overflow-hidden bg-[#0A0E18] border transition-all duration-300 shadow-2xl ${
            easterEggActive
              ? 'border-yellow-400/80 shadow-yellow-500/20'
              : 'border-white/15 hover:border-blue-500/40 shadow-black/80'
          }`}
        >
          {/* Terminal Window Header Bar */}
          <div className="flex items-center justify-between px-4 py-3 bg-[#111625] border-b border-white/10 select-none">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-500 transition-colors" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80 hover:bg-yellow-500 transition-colors" />
              <div className="w-3 h-3 rounded-full bg-green-500/80 hover:bg-green-500 transition-colors" />
              <span className="ml-2 font-mono text-xs text-slate-400 font-semibold tracking-wider">
                devfest-noida-terminal
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="hidden sm:inline-block text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                ● Live Bash v2026
              </span>
              <button
                onClick={copyTerminalOutput}
                className="p-1.5 text-slate-400 hover:text-white rounded hover:bg-white/5 transition-colors focus:outline-none"
                title="Copy Terminal Logs"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          {/* Terminal Body Screen */}
          <div className="p-4 sm:p-6 font-mono text-xs sm:text-sm min-h-[340px] max-h-[460px] overflow-y-auto space-y-2 select-text">
            {history.map((item, idx) => (
              <div key={idx} className="leading-relaxed">
                {item.type === 'input' && (
                  <div className="text-blue-400 font-semibold flex items-start gap-2">
                    <span>{item.text}</span>
                  </div>
                )}
                {item.type === 'system' && (
                  <div className="text-slate-400">{item.text}</div>
                )}
                {item.type === 'output' && (
                  <pre className="text-slate-200 whitespace-pre-wrap font-mono font-normal">
                    {item.text}
                  </pre>
                )}
                {item.type === 'surprise' && (
                  <pre className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/40 text-yellow-300 whitespace-pre-wrap font-bold shadow-lg shadow-yellow-500/10">
                    {item.text}
                  </pre>
                )}
                {item.type === 'error' && (
                  <div className="text-red-400">{item.text}</div>
                )}
              </div>
            ))}

            {/* Input Line */}
            <div className="flex items-center gap-2 pt-2">
              <span className="text-emerald-400 font-bold">devfest-noida:~$</span>
              <input
                ref={inputRef}
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="type command (e.g. help)..."
                className="flex-1 bg-transparent text-white font-mono outline-none border-none p-0 focus:ring-0 placeholder:text-slate-600"
                autoComplete="off"
                spellCheck="false"
              />
              <span className="w-2 h-4 bg-blue-400 cursor-blink" />
            </div>
            <div ref={terminalEndRef} />
          </div>

          {/* Quick Action Suggestion Bar */}
          <div className="px-4 py-3 bg-[#0F1422] border-t border-white/5 flex flex-wrap items-center gap-2 text-xs font-mono">
            <span className="text-slate-500 font-semibold mr-1">Quick Run:</span>
            {['help', 'tracks', 'speakers', 'schedule', 'surprise', 'clear'].map((cmd) => (
              <button
                key={cmd}
                onClick={() => handleCommand(cmd)}
                className="px-2.5 py-1 rounded bg-slate-900 hover:bg-blue-600/30 text-slate-300 hover:text-blue-300 border border-white/10 hover:border-blue-500/50 transition-all active:scale-95"
              >
                {cmd === 'surprise' ? '⚡ surprise' : cmd}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
