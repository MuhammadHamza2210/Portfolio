import { Sparkles, PenTool, Boxes, Component, Gauge, Layers, Server, type LucideIcon } from 'lucide-react'
import SectionHeading from '../SectionHeading'
import TiltCard from '../TiltCard'
import { StaggerGroup, StaggerItem } from '../Reveal'
import { services } from '../../data/portfolio'

const icons: Record<string, LucideIcon> = { Sparkles, PenTool, Boxes, Component, Gauge, Layers, Server }

export default function Services() {
  return (
    <section id="services" className="relative mx-auto max-w-7xl px-6 py-28">
      <SectionHeading
        eyebrow="Services"
        title="What I can do for you"
        subtitle="End-to-end product craft, from concept to a polished, performant build."
      />

      <StaggerGroup className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s) => {
          const Icon = icons[s.icon] ?? Sparkles
          return (
            <StaggerItem key={s.title}>
              <TiltCard className="h-full p-7" intensity={6}>
                <div className="mb-5 inline-grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-accent/30 to-accent-cyan/20 text-accent-glow ring-1 ring-white/10">
                  <Icon size={22} />
                </div>
                <h3 className="font-display text-lg font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">{s.description}</p>
              </TiltCard>
            </StaggerItem>
          )
        })}
      </StaggerGroup>
    </section>
  )
}
