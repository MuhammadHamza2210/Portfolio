import { ArrowUpRight, Github } from 'lucide-react'
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

function ProjectCard({ project }: { project: Project }) {
  return (
    <TiltCard className="relative flex h-full min-h-[220px] flex-col justify-between p-7" glow={project.accent} intensity={6}>
      {/* decorative gradient blob */}
      <div
        className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full opacity-30 blur-3xl"
        style={{ background: project.accent }}
      />
      <div className="relative">
        <div className="mb-4 flex items-center gap-2">
          {project.tags.map((t) => (
            <span key={t} className="rounded-full glass px-3 py-1 text-xs text-[var(--muted)]">
              {t}
            </span>
          ))}
        </div>
        <h3 className="font-display text-2xl font-semibold tracking-tight">{project.title}</h3>
        <p className="mt-2 max-w-md text-sm leading-relaxed text-[var(--muted)]">{project.description}</p>
      </div>

      <div className="relative mt-6 flex items-center gap-3">
        <a
          href={project.demo}
          target="_blank"
          rel="noreferrer"
          data-cursor="hover"
          className="inline-flex items-center gap-1.5 rounded-full bg-white/[0.06] px-4 py-2 text-sm transition-colors hover:bg-white/[0.12]"
        >
          Live Demo <ArrowUpRight size={15} />
        </a>
        <a
          href={project.github}
          target="_blank"
          rel="noreferrer"
          data-cursor="hover"
          aria-label="GitHub repository"
          className="grid h-9 w-9 place-items-center rounded-full glass transition-colors hover:bg-white/[0.12]"
        >
          <Github size={16} />
        </a>
      </div>
    </TiltCard>
  )
}

export default function Projects() {
  return (
    <section id="projects" className="relative mx-auto max-w-7xl px-6 py-28">
      <SectionHeading
        eyebrow="Projects"
        title="Selected work"
        subtitle="A curated set of experiments and products I've shipped."
      />

      <StaggerGroup className="grid auto-rows-[minmax(220px,auto)] grid-cols-1 gap-5 md:grid-cols-3">
        {projects.map((project) => (
          <StaggerItem key={project.title} className={spanClass[project.span]}>
            <ProjectCard project={project} />
          </StaggerItem>
        ))}
      </StaggerGroup>
    </section>
  )
}
