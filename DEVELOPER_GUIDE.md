# Developer Guide: The CluWell Engine

## 1. First Principles of the Stack
We need a deterministic state machine that renders at 120fps. 
- **React 18:** Our core state machine.
- **Vite:** Our build pipeline. It uses `esbuild` for near-instantaneous compilation.
- **Tailwind CSS:** A utility-first compiler that guarantees zero runtime CSS overhead.
- **Framer Motion:** Our physics engine for the DOM.

## 2. The Render Loop & Styling
Do not write custom CSS unless absolutely necessary. The entire visual language is tokenized in Tailwind.
- **The Glass Shader:** `.liquid-glass` applies a 16px backdrop blur, a 4% white background, and a multi-layered box shadow. It uses `::before` and `::after` pseudo-elements to simulate edge lighting.
- **Color Space:** Deep Charcoal (`#0D1114`) is the absolute background. Accents are `#FF2D78` (Magenta), `#38BDF8` (Teal), and `#818CF8` (Indigo).

## 3. Component Topology
The UI is a tree of highly specialized, responsive nodes:
1. `LaunchScreen`: The entry node (1.54s lifecycle).
2. `OnboardingScreen`: The authentication gate.
3. `FingerprintScreen`: The data-gathering pipeline (Emotional Onboarding).
4. `MainTabView`: The persistent shell.
5. `ChatScreen`: The primary neural interface (AI interaction).

## 4. Responsiveness (The Fluid Grid)
The application does not use hardcoded pixel boxes. It maps to the device's viewport:
- **iPhone:** `w-full h-[100dvh]`
- **iPad:** `md:max-w-[1024px] mx-auto` (Centers the interface with elegant borders).
- **Safe Areas:** Padding is mathematically calculated to avoid the iOS Home Indicator (e.g., `pb-12` on the sign-in screen ensures the copyright is always visible).

## 5. The Golden Rule
Do not touch the core aesthetic. Do not introduce generic UI components. If it doesn't feel like a native Apple application, it does not ship.
