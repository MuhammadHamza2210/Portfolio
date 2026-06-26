import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, Github, X, Calendar, User } from 'lucide-react'
import SectionHeading from '../SectionHeading'
import TiltCard from '../TiltCard'
import { StaggerGroup, StaggerItem } from '../Reveal'
import { projects, type Project } from '../../data/portfolio'

const spanClass: Record<Project['span'], string> = {
  big: 'md:col-span-2 md:row-span-2',
  wide: 'md:col-span-2',
  tall: 'md:row-span-2',
  normal: '',
}

function ProjectCard({ project, onOpen }: { project: Project; onOpen: () => void }) {
  return (
    <TiltCard className="relative flex h-full min-h-[220px] flex-col justify-between p-7" glow={project.accent} intensity={6}>
      {/* decorative gradient blob */}
      <div
        className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full opacity-30 blur-3xl"
        style={{ background: project.accent }}
      />

      {/* clicking the card body opens the case study */}
      <button
        onClick={onOpen}
        data-cursor="hover"
        data-cursor-label="Case study"
        aria-label={`Open ${project.title} case study`}
        className="relative flex flex-col text-left"
      >
        {project.image && (
          <div className="mb-5 h-40 w-full overflow-hidden rounded-xl ring-1 ring-white/10">
            <img
              src={project.image}
              alt={`${project.title} screenshot`}
              loading="lazy"
              className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.04]"
            />
          </div>
        )}
        <div className="mb-4 flex flex-wrap items-center gap-2">
          {project.tags.map((t) => (
            <span key={t} className="rounded-full glass px-3 py-1 text-xs text-[var(--muted)]">
              {t}
            </span>
          ))}
        </div>
        <h3 className="font-display text-2xl font-semibold tracking-tight">{project.title}</h3>
        <p className="mt-2 max-w-md text-sm leading-relaxed text-[var(--muted)]">{project.description}</p>
      </button>

      <div className="relative mt-6 flex items-center gap-3">
        <button
          onClick={onOpen}
          data-cursor="hover"
          data-cursor-label="Case study"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--fg)] transition-opacity hover:opacity-70"
        >
          Case study →
        </button>
        <span className="text-[var(--muted)]">·</span>
        <a
          href={project.demo}
          target="_blank"
          rel="noreferrer"
          data-cursor="hover"
          data-cursor-label="Live ↗"
          className="inline-flex items-center gap-1.5 rounded-full bg-white/[0.06] px-4 py-2 text-sm transition-colors hover:bg-white/[0.12]"
        >
          Live Demo <ArrowUpRight size={15} />
        </a>
        <a
          href={project.github}
          target="_blank"
          rel="noreferrer"
          data-cursor="hover"
          data-cursor-label="Code"
          aria-label="GitHub repository"
          className="grid h-9 w-9 place-items-center rounded-full glass transition-colors hover:bg-white/[0.12]"
        >
          <Github size={16} />
        </a>
      </div>
    </TiltCard>
  )
}

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  // close on Escape and lock body scroll while open
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [onClose])

  return (
    <motion.div
      className="fixed inset-0 z-[100] grid place-items-center p-4 sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
        data-cursor="hover"
        aria-hidden
      />

      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label={`${project.title} case study`}
        initial={{ opacity: 0, y: 24, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 24, scale: 0.96 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="glass-strong relative z-10 max-h-[88vh] w-full max-w-2xl overflow-y-auto rounded-3xl p-7 sm:p-9"
      >
        {/* accent glow */}
        <div
          className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full opacity-30 blur-3xl"
          style={{ background: project.accent }}
        />

        <button
          onClick={onClose}
          data-cursor="hover"
          aria-label="Close"
          className="absolute right-5 top-5 grid h-9 w-9 place-items-center rounded-full glass transition-colors hover:bg-white/[0.12]"
        >
          <X size={16} />
        </button>

        {/* optional screenshot */}
        {project.image && (
          <img
            src={project.image}
            alt={`${project.title} screenshot`}
            className="mb-6 aspect-video w-full rounded-2xl object-cover ring-1 ring-white/10"
            loading="lazy"
          />
        )}

        <div className="relative">
          <div className="mb-3 flex flex-wrap items-center gap-2">
            {project.tags.map((t) => (
              <span key={t} className="rounded-full glass px-3 py-1 text-xs text-[var(--muted)]">
                {t}
              </span>
            ))}
          </div>

          <h3 className="font-display text-3xl font-semibold tracking-tight">{project.title}</h3>

          <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1 text-sm text-[var(--muted)]">
            <span className="inline-flex items-center gap-1.5">
              <Calendar size={14} /> {project.year}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <User size={14} /> {project.role}
            </span>
          </div>

          {/* highlight badges */}
          <div className="mt-5 flex flex-wrap gap-2">
            {project.highlights.map((h) => (
              <span
                key={h}
                className="rounded-full px-3 py-1.5 text-xs font-medium"
                style={{ background: `${project.accent}22`, color: project.accent }}
              >
                {h}
              </span>
            ))}
          </div>

          <div className="mt-7 space-y-5 text-sm leading-relaxed">
            <div>
              <h4 className="mb-1.5 text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">
                The problem
              </h4>
              <p>{project.problem}</p>
            </div>
            <div>
              <h4 className="mb-1.5 text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">
                What I built
              </h4>
              <p>{project.solution}</p>
            </div>
          </div>

          <div className="mt-8 flex items-center gap-3">
            <a
              href={project.demo}
              target="_blank"
              rel="noreferrer"
              data-cursor="hover"
              data-cursor-label="Live ↗"
              className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-accent to-accent-cyan px-5 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
            >
              Live Demo <ArrowUpRight size={15} />
            </a>
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              data-cursor="hover"
              data-cursor-label="Code"
              className="inline-flex items-center gap-2 rounded-full glass px-5 py-2.5 text-sm transition-colors hover:bg-white/[0.12]"
            >
              <Github size={16} /> Source
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function Projects() {
  const [activeProject, setActiveProject] = useState<Project | null>(null)

  return (
    <section id="projects" className="relative mx-auto max-w-7xl px-6 py-28">
      <SectionHeading
        eyebrow="Projects"
        title="Selected work"
        subtitle="A curated set of experiments and products I've shipped — click any card for the full case study."
      />

      <StaggerGroup className="grid auto-rows-[minmax(220px,auto)] grid-cols-1 gap-5 md:grid-cols-3">
        {projects.map((project) => (
          <StaggerItem key={project.title} className={spanClass[project.span]}>
            <ProjectCard project={project} onOpen={() => setActiveProject(project)} />
          </StaggerItem>
        ))}
      </StaggerGroup>

      <AnimatePresence>
        {activeProject && (
          <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
        )}
      </AnimatePresence>
    </section>
  )
}
