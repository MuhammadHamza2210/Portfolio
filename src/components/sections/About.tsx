import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'
import { MapPin, Coffee, Code2, Heart } from 'lucide-react'
import SectionHeading from '../SectionHeading'
import TiltCard from '../TiltCard'
import Reveal from '../Reveal'
import { profile, stats } from '../../data/portfolio'

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })
  const [n, setN] = useState(0)

  useEffect(() => {
    if (!inView) return
    let raf = 0
    const start = performance.now()
    const dur = 1600
    const tick = (now: number) => {
      const p = Math.min((now - start) / dur, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setN(Math.round(eased * value))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, value])

  return (
    <span ref={ref} className="font-display text-4xl font-semibold gradient-text">
      {n}
      {suffix}
    </span>
  )
}

export default function About() {
  return (
    <section id="about" className="relative mx-auto max-w-7xl px-6 py-28">
      <SectionHeading
        eyebrow="About Me"
        title="The person behind the code"
        subtitle="A computer science student passionate about AI and building useful, real-world apps."
      />

      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {/* Bio — wide */}
        <Reveal className="md:col-span-2">
          <TiltCard className="h-full p-8" intensity={5}>
            <Code2 className="mb-5 text-accent-glow" size={28} />
            <p className="whitespace-pre-line text-lg leading-relaxed text-[var(--fg)]/90">{profile.bio}</p>
            <div className="mt-6 flex flex-wrap gap-3 text-sm text-[var(--muted)]">
              <span className="inline-flex items-center gap-2 rounded-full glass px-3 py-1.5">
                <MapPin size={14} /> {profile.location}
              </span>
              <span className="inline-flex items-center gap-2 rounded-full glass px-3 py-1.5">
                <Coffee size={14} /> Fueled by coffee
              </span>
              <span className="inline-flex items-center gap-2 rounded-full glass px-3 py-1.5">
                <Heart size={14} /> Always learning
              </span>
            </div>
          </TiltCard>
        </Reveal>

        {/* Portrait / accent card — tall */}
        <Reveal delay={0.1}>
          <TiltCard className="flex h-full flex-col items-center justify-center p-8 text-center" glow="#22d3ee">
            <div className="relative mb-5 grid h-28 w-28 place-items-center rounded-full bg-gradient-to-br from-accent to-accent-cyan text-4xl font-display font-bold text-white">
              {profile.firstName.charAt(0)}
              <div className="absolute -inset-2 -z-10 rounded-full bg-gradient-to-br from-accent to-accent-cyan opacity-40 blur-xl" />
            </div>
            <h3 className="font-display text-xl font-semibold">{profile.name}</h3>
            <p className="mt-1 text-sm text-[var(--muted)]">{profile.role}</p>
            <a
              href="#projects"
              className="mt-5 rounded-full glass px-5 py-2 text-sm transition-colors hover:bg-white/10"
            >
              View Projects
            </a>
          </TiltCard>
        </Reveal>

        {/* Stats row */}
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={0.05 * i}>
            <TiltCard className="flex h-full flex-col items-center justify-center p-6 text-center" intensity={6}>
              <Counter value={s.value} suffix={s.suffix} />
              <p className="mt-2 text-sm text-[var(--muted)]">{s.label}</p>
            </TiltCard>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
