import Reveal from './Reveal'

type Props = {
  eyebrow: string
  title: string
  subtitle?: string
  align?: 'left' | 'center'
}

export default function SectionHeading({ eyebrow, title, subtitle, align = 'center' }: Props) {
  return (
    <div className={`mb-14 ${align === 'center' ? 'text-center mx-auto max-w-2xl' : 'text-left'}`}>
      <Reveal>
        <span className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-accent-glow">
          <span className="h-1.5 w-1.5 rounded-full bg-accent-cyan animate-pulse-glow" />
          {eyebrow}
        </span>
      </Reveal>
      <Reveal delay={0.08}>
        <h2 className="mt-5 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
          <span className="gradient-text">{title}</span>
        </h2>
      </Reveal>
      {subtitle && (
        <Reveal delay={0.16}>
          <p className="mt-4 text-base leading-relaxed text-[var(--muted)]">{subtitle}</p>
        </Reveal>
      )}
    </div>
  )
}
