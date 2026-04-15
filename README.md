# CluWell: Frontend MVP & Neural Interface

## Abstract
If we break down mental wellness to its first principles, it is about state management—both human and digital. CluWell is a premium, AI-powered emotional intelligence companion. This repository contains the production-ready frontend MVP. It is not just a UI; it is a meticulously crafted sensory environment designed to lower cognitive load and establish immediate trust.

## The Physics of the Interface
We treat the UI as a physical simulation running at 120fps.
- **Liquid Glassmorphism 2.0:** A mathematically precise 10% glassmorphism shell with wide-spread ambient glows. It simulates light refraction, not just a Gaussian blur.
- **Organic Motion:** Driven by `framer-motion`. We use physics-based spring mechanics (stiffness, damping) rather than linear easing curves.
- **Pacing:** The cinematic transition from Launch to Onboarding is hardcoded to exactly 1.54s. This is the optimal window for context switching.
- **Haptics:** Every state change has a physical weight. We map UI interactions to specific vibration frequencies (Light, Medium, Heavy, Success).

## Quickstart
```bash
npm install
npm run dev
```

## Compilation & Deployment
The system compiles down to highly optimized static assets via Vite, ready to be wrapped in a native WebView (Capacitor/WKWebView) for the App Store.
```bash
npm run build
```

## Copyright
© 2026 Aditya Anand. All Rights Reserved.
