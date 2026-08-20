export const INITIAL_TERMINAL_OUTPUT = [
  { type: 'system', text: 'Welcome to DevFest Noida 2026 🚀' },
  { type: 'system', text: 'Type "help" to explore available CLI tools & event data.' },
  { type: 'system', text: '---' }
];

export const HELP_TEXT = `Available commands:
  about      Learn about DevFest Noida 2026
  tracks     Explore conference tech tracks
  speakers   Meet demo speakers & session topics
  schedule   View event schedule summary
  register   Jump directly to interest registration
  surprise   Unlock secret developer easter egg ⚡
  whoami     Identify current terminal user
  version    Check CLI environment version
  clear      Clear terminal screen`;

export const ABOUT_TEXT = `DevFest Noida 2026
------------------
DevFest is a global community-led tech conference hosted by Google Developer Groups.
Where developers, open-source contributors, and technology enthusiasts gather to share knowledge, explore next-gen AI, Web, Cloud, and Mobile technologies.

Location: Noida, UP, India
Format: In-Person Keynotes, Technical Deep-Dives & Hands-On Workshops
Organized by: GDG Noida Community`;

export const TRACKS_TEXT = `Conference Tracks (6 Tracks):
  [1] AI & Machine Learning     (Gemini, TensorFlow, Vector DBs, LLMs)
  [2] Web Architecture         (React, WASM, Performance, Edge Functions)
  [3] Cloud & Infrastructure   (GCP, Kubernetes, Docker, Serverless)
  [4] Android & Mobile         (Jetpack Compose, Kotlin, KMP)
  [5] Firebase & App Backend   (Genkit, Firestore, Cloud Functions)
  [6] Developer Experience     (CI/CD, GitOps, DevTools, Design Systems)`;

export const SPEAKERS_TEXT = `Featured Speakers (Sample Lineup):
  - Dr. Aanya Sharma    | Lead AI Engineer       | Gemini AI Agents
  - Rohan Verma         | Staff Web Architect    | WebAssembly & Micro-frontends
  - Priya Sundaram      | Principal Cloud Lead   | Zero-Trust K8s on GCP
  - Kabir Mehta         | Android Tech Lead      | Jetpack Compose Graphics
  - Neha Kapoor         | Developer Advocate     | Firebase Genkit Workflows
  - Vikram Joshi        | DX Architect           | CLI & Codebase Automation`;

export const SCHEDULE_TEXT = `DevFest 2026 Schedule Overview:
  09:00 AM - Check-in & Developer Networking
  10:00 AM - DevFest 2026 Opening Keynote
  11:00 AM - Parallel Technical Sessions (AI, Web, Cloud)
  01:00 PM - Community Lunch & Networking Lounge
  02:00 PM - Breakout Workshops & Hands-on Labs
  04:30 PM - Community Project Showcase & Demos
  06:00 PM - Closing Ceremony & Swag Raffles`;
