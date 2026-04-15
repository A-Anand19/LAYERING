# CluWell - iOS Application (Frontend MVP)

## Overview
CluWell is a premium, AI-powered emotional intelligence and wellness companion. This repository contains the production-ready frontend MVP, meticulously crafted with an "Apple-level" design philosophy. 

The application features a hyper-realistic **Liquid Glassmorphism 2.0** aesthetic, buttery-smooth 120fps-optimized animations, and a deeply immersive user experience.

## Design Philosophy & Aesthetics
- **Liquid Glassmorphism 2.0:** A restrained, elegant 10% glassmorphism shell with wide-spread illuminating ambient glows.
- **Organic Motion:** Physics-based spring animations (`framer-motion`) tuned for snappy, responsive interactions.
- **Cinematic Transitions:** Precisely timed 1.54s cinematic crossfades between the launch and onboarding states.
- **Color Palette:** Deep charcoal (`#0D1114`) OLED-optimized backgrounds with calming teal and vibrant magenta/indigo accents.
- **Haptic Feedback:** Integrated vibration patterns (Light, Medium, Heavy, Success) for tactile physical responses.

## Tech Stack
- **Framework:** React 18 + TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Icons:** Lucide React

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm or yarn

### Installation
1. Clone the repository or extract the ZIP file.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open `http://localhost:3000` in your browser.

## Deployment Preparation
This codebase is optimized for deployment. To create a production build:
```bash
npm run build
```
The output will be generated in the `dist/` directory, ready to be wrapped in a WebView (e.g., React Native WebView, Capacitor, or Swift WKWebView) for App Store submission.

## Copyright
© 2026 Aditya Anand. All Rights Reserved.
