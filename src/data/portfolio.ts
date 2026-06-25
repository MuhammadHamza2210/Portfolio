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
  resumeUrl: '#',
  socials: {
    github: 'https://github.com/muhammadhamza2210',
    linkedin: '#', // TODO: add your LinkedIn profile URL
  },
}

export const stats = [
  { label: 'Projects Built', value: 7, suffix: '+' },
  { label: 'Technologies', value: 14, suffix: '+' },
  { label: 'AI Projects', value: 3, suffix: '' },
  { label: 'Languages', value: 5, suffix: '+' },
]

export type Skill = {
  name: string
  level: number // 0-100
  category: 'Frontend' | 'AI' | 'Backend' | 'Tools'
}

export const skills: Skill[] = [
  { name: 'React / Vite', level: 88, category: 'Frontend' },
  { name: 'TypeScript', level: 82, category: 'Frontend' },
  { name: 'Tailwind CSS', level: 90, category: 'Frontend' },
  { name: 'Three.js / R3F', level: 70, category: 'Frontend' },
  { name: 'Python', level: 88, category: 'AI' },
  { name: 'RAG / LLM Apps', level: 80, category: 'AI' },
  { name: 'Prompt Engineering', level: 82, category: 'AI' },
  { name: 'LLM APIs (Gemini / Claude / Ollama)', level: 80, category: 'AI' },
  { name: 'Node.js / Express', level: 80, category: 'Backend' },
  { name: 'FastAPI', level: 76, category: 'Backend' },
  { name: 'Flask', level: 78, category: 'Backend' },
  { name: 'SQLite / SQL', level: 78, category: 'Backend' },
  { name: 'Git / GitHub', level: 84, category: 'Tools' },
  { name: 'Streamlit', level: 85, category: 'Tools' },
]

export type Project = {
  title: string
  description: string
  tags: string[]
  demo: string
  github: string
  span: 'wide' | 'tall' | 'normal' | 'big'
  accent: string
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
  },
  {
    title: 'CodeScan AI',
    description:
      'A code plagiarism detector that compares programs using multiple engines (AST, ML, winnowing, CodeBERT) to score real similarity, not just text matches.',
    tags: ['Python', 'Streamlit', 'ML'],
    demo: 'https://codescan-ai-lkuctppx3i2c4izvjpekkc.streamlit.app/',
    github: 'https://github.com/MuhammadHamza2210/CodeScan-AI',
    span: 'wide',
    accent: '#a78bfa',
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
