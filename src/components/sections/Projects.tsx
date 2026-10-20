import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, Github, X, Calendar, User, Info } from 'lucide-react'
import SectionHeading from '../SectionHeading'
import Reveal, { StaggerGroup, StaggerItem } from '../Reveal'
import { projects, type Project } from '../../data/portfolio'

// LeadPilot leads; the other featured projects sit in a two-up row below it.
const [lead, ...secondary] = projects.filter((p) => p.featured)
const others = projects.filter((p) => !p.featured)

function DemoLink({ project, className = '' }: { project: Project; className?: string }) {
  return (
    <a
      href={project.demo}
      target="_blank"
      rel="noreferrer"
      data-cursor="hover"
      data-cursor-label="Live ↗"
      className={`inline-flex items-center gap-1.5 rounded-full bg-white/[0.06] px-4 py-2 text-sm transition-colors hover:bg-white/[0.12] ${className}`}
    >
      Live demo <ArrowUpRight size={15} />
    </a>
  )
}

function CodeLink({ project }: { project: Project }) {
  if (!project.github) return null
  return (
    <a
      href={project.github}
      target="_blank"
      rel="noreferrer"
      data-cursor="hover"
      data-cursor-label="Code"
      aria-label={`${project.title} source code on GitHub`}
      className="grid h-9 w-9 place-items-center rounded-full glass transition-colors hover:bg-white/[0.12]"
    >
      <Github size={16} />
    </a>
  )
}

function CaseStudyButton({ onOpen }: { onOpen: () => void }) {
  return (
    <button
      onClick={onOpen}
      data-cursor="hover"
      data-cursor-label="Case study"
      className="rounded-full bg-accent px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
    >
      <span className="sm:hidden">Case study</span>
      <span className="hidden sm:inline">Read case study</span>
    </button>
  )
}

/** Clickable screenshot that opens the case study. */
function Screenshot({ project, onOpen, className = '' }: { project: Project; onOpen: () => void; className?: string }) {
  return (
    <button
      onClick={onOpen}
      data-cursor="hover"
      data-cursor-label="Case study"
      aria-label={`Open ${project.title} case study`}
      className={`group relative block w-full overflow-hidden bg-black/30 ${className}`}
    >
      {project.image && (
        <img
          src={project.image}
          alt={`${project.title} interface`}
          loading="lazy"
          className="aspect-video h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        />
      )}
    </button>
  )
}

function Highlights({ project, inline = false }: { project: Project; inline?: boolean }) {
  return (
    <ul className={inline ? 'mt-4 flex flex-wrap gap-x-4 gap-y-1.5 text-sm' : 'mt-5 space-y-2 text-sm'}>
      {project.highlights.map((h) => (
        <li key={h} className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: project.accent }} />
          {h}
        </li>
      ))}
    </ul>
  )
}

/** The one wide card at the top: screenshot beside the pitch. */
function LeadProject({ project, onOpen }: { project: Project; onOpen: () => void }) {
  return (
    <article className="grid grid-cols-1 overflow-hidden rounded-3xl glass lg:grid-cols-[1.15fr_1fr]">
      <Screenshot project={project} onOpen={onOpen} />
      <div className="flex flex-col justify-center p-7 sm:p-9">
        <p className="font-mono text-xs text-[var(--muted)]">{project.tags.join(' · ')}</p>
        <h3 className="mt-3 font-display text-3xl font-semibold tracking-tight">{project.title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">{project.description}</p>
        <Highlights project={project} />
        <div className="mt-7 flex flex-wrap items-center gap-3">
          <CaseStudyButton onOpen={onOpen} />
          <DemoLink project={project} />
          <CodeLink project={project} />
        </div>
      </div>
    </article>
  )
}

/** Screenshot-on-top card. `md` for the featured pair, `sm` for the rest. */
function ProjectCard({ project, size, onOpen }: { project: Project; size: 'md' | 'sm'; onOpen: () => void }) {
  const md = size === 'md'
  return (
    <article className={`flex h-full flex-col overflow-hidden glass ${md ? 'rounded-3xl' : 'rounded-2xl'}`}>
      <Screenshot project={project} onOpen={onOpen} />
      <div className={`flex flex-1 flex-col ${md ? 'p-6 sm:p-7' : 'p-5'}`}>
        {md && <p className="font-mono text-xs text-[var(--muted)]">{project.tags.join(' · ')}</p>}
        {md ? (
          <h3 className="mt-2.5 font-display text-2xl font-semibold tracking-tight">{project.title}</h3>
        ) : (
          <h4 className="font-display text-lg font-semibold tracking-tight">{project.title}</h4>
        )}
        <p className={`mt-2 text-sm leading-relaxed text-[var(--muted)] ${md ? '' : 'line-clamp-2'}`}>
          {project.description}
        </p>
        {md ? (
          <Highlights project={project} inline />
        ) : (
          <p className="mt-3 font-mono text-xs text-[var(--muted)]/80">{project.tags.join(' · ')}</p>
        )}
        <div className={`mt-auto flex flex-wrap items-center gap-2 sm:gap-3 ${md ? 'pt-6' : 'pt-5'}`}>
          {md ? <CaseStudyButton onOpen={onOpen} /> : null}
          <DemoLink project={project} className={md ? '' : 'px-3.5 py-1.5'} />
          <CodeLink project={project} />
        </div>
      </div>
    </article>
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
            className="mb-6 aspect-video w-full rounded-2xl object-cover object-top ring-1 ring-white/10"
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

          {project.note && (
            <p className="mt-6 flex gap-2.5 rounded-2xl bg-white/[0.04] p-4 text-sm leading-relaxed text-[var(--muted)]">
              <Info size={16} className="mt-0.5 shrink-0" />
              {project.note}
            </p>
          )}

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
            {project.github && (
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
            )}
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
        subtitle="Three projects I'd walk you through first, then the rest of what I've shipped. Every one has a live demo."
      />

      <Reveal>
        <LeadProject project={lead} onOpen={() => setActiveProject(lead)} />
      </Reveal>

      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
        {secondary.map((project) => (
          <Reveal key={project.title} className="h-full">
            <ProjectCard project={project} size="md" onOpen={() => setActiveProject(project)} />
          </Reveal>
        ))}
      </div>

      <h3 className="mb-6 mt-20 font-display text-2xl font-semibold tracking-tight">More projects</h3>
      <StaggerGroup className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {others.map((project) => (
          <StaggerItem key={project.title} className="h-full">
            <ProjectCard project={project} size="sm" onOpen={() => setActiveProject(project)} />
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
