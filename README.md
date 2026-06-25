# Muhammad Hamza — Portfolio

> 🔴 **Live demo:** **https://portfolio-lime-rho-96.vercel.app/**

Personal portfolio of **Muhammad Hamza**, a BS Computer Science student at
Bahria University, Karachi, focused on **AI and web development**.

Built with **React + TypeScript + Vite**, **React Three Fiber**, **Framer
Motion**, **GSAP**, and **Tailwind CSS**.

## Features

- 🔮 Interactive 3D hero (React Three Fiber), lazy-loaded
- 🪟 Glassmorphism cards with cursor glow + 3D tilt, magnetic buttons
- 🎬 Scroll-triggered reveals and animated stat counters / skill rings
- ⌘ Command palette (`⌘K` / `Ctrl+K`)
- 🌗 Dark / light theme toggle (persisted)
- 🧩 Bento-grid project showcase with live-demo / GitHub links
- 📱 Fully responsive, reduced-motion aware, SEO + OpenGraph meta

## Getting started

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build → dist/
npm run preview    # preview the build
```

## Personalize

All copy lives in **`src/data/portfolio.ts`** — name, role, bio, skills,
projects, education, services, tech stack, and social links. Edit that one
file; no component changes needed. Update SEO tags in `index.html`.

## Featured projects

- **Synapse** — AI Study OS with a 3D Mind Palace (RAG)
- **Orion** — real-time stock dashboard with AI analysis
- **WildMind AI** — AI wildlife encyclopedia
- **CodeScan AI** — code plagiarism detector (ML)
- **LootLo** — full-stack e-commerce app
- **Hamza Restaurant** — smart ordering system
- **WeatherScope** — weather app

## Notes

- The contact form is front-end only — wire `handleSubmit` in
  `src/components/sections/Contact.tsx` to Formspree / Resend / your API.

## Deploy

Deployed on [Vercel](https://vercel.com): connect the GitHub repo and it
auto-detects Vite, building with `npm run build` (output: `dist/`).
