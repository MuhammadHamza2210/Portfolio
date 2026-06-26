/**
 * Single source of truth for all portfolio content.
 * Edit this file to personalize the site — no component changes needed.
 */

export const profile = {
  name: 'Muhammad Hamza',
  firstName: 'Hamza',
  role: 'AI & Web Developer',
  tagline: 'I build AI-powered apps and full-stack web experiences.',
  bio: `I'm Muhammad Hamza, a BS Computer Science student at Bahria University, Karachi.
I love working at the intersection of AI and web development — building things like RAG-based study tools, AI assistants, and full-stack web apps. My goal is to grow as both an AI engineer and a software developer, turning ideas into real, working products.`,
  location: 'Karachi, Pakistan',
  email: 'ihamza.muhammad2003@gmail.com',
  available: true,
  resumeUrl: '/resume.pdf',
  socials: {
    github: 'https://github.com/muhammadhamza2210',
    linkedin: 'https://www.linkedin.com/in/muhammad-hamza-962ba1363/',
  },
}

export const stats = [
  { label: 'Projects Built', value: 7, suffix: '+' },
  { label: 'Technologies', value: 14, suffix: '+' },
  { label: 'AI Projects', value: 3, suffix: '' },
  { label: 'Languages', value: 5, suffix: '+' },
]

// Honest proficiency tiers instead of arbitrary percentages.
//   Advanced   — I build with this regularly and reach for it first.
//   Proficient — comfortable and productive in real projects.
//   Familiar   — working knowledge, still deepening.
export type SkillLevel = 'Advanced' | 'Proficient' | 'Familiar'

export type Skill = {
  name: string
  level: SkillLevel
  category: 'Frontend' | 'AI' | 'Backend' | 'Tools'
}

export const skillLevels: SkillLevel[] = ['Advanced', 'Proficient', 'Familiar']

export const skills: Skill[] = [
  { name: 'React / Vite', level: 'Advanced', category: 'Frontend' },
  { name: 'Tailwind CSS', level: 'Advanced', category: 'Frontend' },
  { name: 'TypeScript', level: 'Proficient', category: 'Frontend' },
  { name: 'Three.js / R3F', level: 'Familiar', category: 'Frontend' },
  { name: 'Python', level: 'Advanced', category: 'AI' },
  { name: 'RAG / LLM Apps', level: 'Proficient', category: 'AI' },
  { name: 'Prompt Engineering', level: 'Proficient', category: 'AI' },
  { name: 'LLM APIs (Gemini / Claude / Ollama)', level: 'Proficient', category: 'AI' },
  { name: 'Node.js / Express', level: 'Proficient', category: 'Backend' },
  { name: 'Flask', level: 'Proficient', category: 'Backend' },
  { name: 'SQLite / SQL', level: 'Proficient', category: 'Backend' },
  { name: 'FastAPI', level: 'Familiar', category: 'Backend' },
  { name: 'Streamlit', level: 'Advanced', category: 'Tools' },
  { name: 'Git / GitHub', level: 'Proficient', category: 'Tools' },
]

export type Project = {
  title: string
  description: string
  tags: string[]
  demo: string
  github: string
  span: 'wide' | 'tall' | 'normal' | 'big'
  accent: string
  // --- case study fields (shown in the detail modal) ---
  year: string
  role: string
  problem: string
  solution: string
  highlights: string[] // short metric / impact badges
  image?: string // optional screenshot in /public (e.g. '/projects/synapse.png')
}

export const projects: Project[] = [
  {
    title: 'Synapse',
    description:
      'An AI "Study OS" that turns your notes into an interactive 3D Mind Palace. Uses retrieval-augmented generation (RAG) to answer questions from your own documents.',
    tags: ['React', 'FastAPI', 'RAG', 'Three.js'],
    demo: 'https://synapse-eight-ruby.vercel.app/',
    github: 'https://github.com/MuhammadHamza2210/Synapse',
    span: 'big',
    accent: '#7c5cff',
    image: '/projects/synapse.jpg',
    year: '2026',
    role: 'Solo — full-stack & AI',
    problem:
      'Students drown in scattered PDFs and notes, and lose hours hunting for what they already studied.',
    solution:
      'Built an AI "Study OS" that ingests your own documents, embeds them into a vector store, and answers questions with retrieval-augmented generation — grounded in your material, not the open internet. Recalled concepts are visualized as an explorable 3D Mind Palace so memory has a place to live.',
    highlights: ['RAG over your own docs', 'Grounded, cited answers', '3D Mind Palace UI'],
  },
  {
    title: 'Orion — Stock Universe',
    description:
      'A real-time stock dashboard streaming live prices for 50 tickers over WebSockets, with interactive charts and on-demand AI analysis for any stock.',
    tags: ['React', 'FastAPI', 'WebSockets', 'AI'],
    demo: 'https://orion-nine-wine.vercel.app/',
    github: 'https://github.com/MuhammadHamza2210/Orion',
    span: 'tall',
    accent: '#22d3ee',
    image: '/projects/orion.jpg',
    year: '2026',
    role: 'Solo — full-stack & AI',
    problem:
      'Retail traders juggle many tabs and still lack a single live view with instant context on what a move means.',
    solution:
      'A real-time dashboard streaming 50 tickers over WebSockets with interactive charts, and an on-demand LLM that explains any stock’s recent action in plain language. The backend fans live market data out to the client without polling.',
    highlights: ['50 live tickers', 'WebSocket streaming', 'On-demand AI analysis'],
  },
  {
    title: 'WildMind AI',
    description:
      'An AI-powered wildlife encyclopedia. Ask about any animal and get rich, generated answers backed by an LLM — built with React and Vite.',
    tags: ['React', 'Vite', 'Gemini API'],
    demo: 'https://muhammadhamza221003-wildmind-ai.hf.space',
    github: 'https://github.com/MuhammadHamza2210/WildMind-AI',
    span: 'normal',
    accent: '#34d399',
    image: '/projects/wildmind.jpg',
    year: '2026',
    role: 'Solo — frontend & AI',
    problem:
      'Static encyclopedias are rigid — you can only read what was pre-written, never ask your own follow-up.',
    solution:
      'A conversational wildlife encyclopedia: ask about any animal and the Gemini-backed model returns rich, structured answers on diet, habitat and behavior, with a fast React + Vite interface.',
    highlights: ['Gemini-powered', 'Any animal, any question', 'Instant rich answers'],
  },
  {
    title: 'CodeScan AI',
    description:
      'A code plagiarism detector that compares programs using multiple engines (AST, ML, winnowing, CodeBERT) to score real similarity, not just text matches.',
    tags: ['Python', 'Streamlit', 'ML'],
    demo: 'https://codescan-ai-lkuctppx3i2c4izvjpekkc.streamlit.app/',
    github: 'https://github.com/MuhammadHamza2210/CodeScan-AI',
    span: 'normal',
    accent: '#a78bfa',
    image: '/projects/codescan.jpg',
    year: '2026',
    role: 'Solo — ML & Python',
    problem:
      'Naive plagiarism checkers compare text, so renaming variables or reformatting easily fools them.',
    solution:
      'Combines four engines — AST structural diffing, a trained ML model, winnowing fingerprints and CodeBERT embeddings — to score how similar two programs really are, catching structural copies that text matching misses.',
    highlights: ['4 detection engines', 'AST + CodeBERT', 'Structure-aware scoring'],
  },
  {
    title: 'LootLo',
    description:
      'A full-stack e-commerce app with auth, cart, wishlist, coupons, live order tracking and an admin console — all persisted in SQLite.',
    tags: ['Flask', 'SQLite', 'REST API'],
    demo: 'https://muhammadhamza221003-lootlo.hf.space',
    github: 'https://github.com/MuhammadHamza2210/Lootlo',
    span: 'normal',
    accent: '#f472b6',
    image: '/projects/lootlo.jpg',
    year: '2026',
    role: 'Solo — full-stack',
    problem:
      'I wanted to prove I could build a complete commerce flow end to end, not just a pretty storefront.',
    solution:
      'A full e-commerce app with user auth, cart, wishlist, coupon codes, live order tracking and an admin console for managing products and orders — all backed by a Flask REST API and SQLite.',
    highlights: ['Auth + admin console', 'Cart, wishlist, coupons', 'Live order tracking'],
  },
  {
    title: 'Hamza Restaurant',
    description:
      'A smart restaurant ordering system with a Node/Express backend, JWT auth and a SQLite database for menus and orders.',
    tags: ['Node.js', 'Express', 'SQLite'],
    demo: 'https://muhammadhamza221003-hamza-restaurant.hf.space',
    github: 'https://github.com/MuhammadHamza2210/Hamza-Restaurant',
    span: 'normal',
    accent: '#f59e0b',
    image: '/projects/restaurant.jpg',
    year: '2026',
    role: 'Solo — backend & full-stack',
    problem:
      'Small restaurants need a simple digital ordering flow without the cost of heavy POS software.',
    solution:
      'A restaurant ordering system with a Node/Express API, JWT-based auth for staff and customers, and a SQLite database driving menus and orders end to end.',
    highlights: ['JWT auth', 'Menu + order management', 'Node / Express API'],
  },
  {
    title: 'WeatherScope',
    description:
      'A clean weather app that fetches and visualizes live conditions and forecasts in a simple, responsive Python interface.',
    tags: ['Python', 'Streamlit', 'API'],
    demo: 'https://weatherscope-stlgpbewcgqufpmrbossmt.streamlit.app/',
    github: 'https://github.com/MuhammadHamza2210/WeatherScope',
    span: 'normal',
    accent: '#38bdf8',
    image: '/projects/weatherscope.jpg',
    year: '2026',
    role: 'Solo — Python',
    problem:
      'Most weather widgets bury the few numbers you actually care about under clutter and ads.',
    solution:
      'A clean weather app that pulls live conditions and forecasts from a weather API and visualizes them in a simple, responsive Streamlit interface focused on readability.',
    highlights: ['Live conditions + forecast', 'Clean data viz', 'Responsive UI'],
  },
]

export type Experience = {
  role: string
  company: string
  period: string
  description: string
}

// Education & learning journey (honest — student, no jobs yet)
export const experience: Experience[] = [
  {
    role: 'BS Computer Science',
    company: 'Bahria University, Karachi',
    period: '2023 — 2027 (expected)',
    description:
      'Studying core computer science — data structures, algorithms, databases and software engineering — while building AI and full-stack projects on the side.',
  },
  {
    role: 'Self-Taught AI & Web Developer',
    company: 'Personal Projects',
    period: '2024 — Present',
    description:
      'Learning by building real apps: RAG-based AI tools, LLM assistants, and full-stack web apps using React, Node, Python and FastAPI.',
  },
]

export type Service = {
  title: string
  description: string
  icon: string // lucide icon name
}

export const services: Service[] = [
  { title: 'AI App Development', description: 'RAG pipelines, LLM assistants and AI features wired into real apps.', icon: 'Sparkles' },
  { title: 'Full-Stack Web Apps', description: 'End-to-end apps with auth, databases and clean REST APIs.', icon: 'Layers' },
  { title: 'Frontend & UI', description: 'Responsive, modern interfaces built with React, Vite and Tailwind.', icon: 'PenTool' },
  { title: 'Backend & APIs', description: 'FastAPI, Express and Flask services with SQLite/SQL storage.', icon: 'Server' },
  { title: '3D & Interactive', description: 'Three.js scenes and motion for immersive web experiences.', icon: 'Boxes' },
  { title: 'Data & ML', description: 'Practical ML features like similarity scoring and analysis.', icon: 'Gauge' },
]

export const techStack = [
  'React', 'TypeScript', 'Vite', 'Tailwind', 'Three.js', 'Framer Motion',
  'Node.js', 'Express', 'Python', 'FastAPI', 'Flask', 'Streamlit',
  'SQLite', 'RAG', 'Gemini', 'Ollama', 'Git', 'Vercel',
]
