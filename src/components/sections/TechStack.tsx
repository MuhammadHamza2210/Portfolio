import SectionHeading from '../SectionHeading'
import { techStack } from '../../data/portfolio'

function Row({ items, reverse = false }: { items: string[]; reverse?: boolean }) {
  return (
    <div className="flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
      <div
        className="flex shrink-0 gap-4 pr-4"
        style={{ animation: `${reverse ? 'marqueeRev' : 'marquee'} 28s linear infinite` }}
      >
        {[...items, ...items].map((tech, i) => (
          <span
            key={i}
            className="whitespace-nowrap rounded-full glass px-6 py-3 text-sm font-medium text-[var(--fg)]/90 transition-colors hover:text-white"
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  )
}

export default function TechStack() {
  const half = Math.ceil(techStack.length / 2)
  return (
    <section id="tech" className="relative mx-auto max-w-7xl px-6 py-28">
      <SectionHeading eyebrow="Tech Stack" title="Built with the best" subtitle="The technologies I reach for every day." />

      <style>{`
        @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @keyframes marqueeRev { from { transform: translateX(-50%); } to { transform: translateX(0); } }
      `}</style>

      <div className="space-y-4">
        <Row items={techStack.slice(0, half)} />
        <Row items={techStack.slice(half)} reverse />
      </div>
    </section>
  )
}
