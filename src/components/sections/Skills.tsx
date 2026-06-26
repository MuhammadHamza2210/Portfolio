import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Layout, Sparkles, Server, Wrench, type LucideIcon } from 'lucide-react'
import SectionHeading from '../SectionHeading'
import { skills, skillLevels, type Skill, type SkillLevel } from '../../data/portfolio'

const categories = ['All', 'Frontend', 'AI', 'Backend', 'Tools'] as const

// Per-category identity: an accent color + icon used across the cards.
const catMeta: Record<Skill['category'], { color: string; icon: LucideIcon }> = {
  Frontend: { color: '#7c5cff', icon: Layout },
  AI: { color: '#22d3ee', icon: Sparkles },
  Backend: { color: '#f472b6', icon: Server },
  Tools: { color: '#34d399', icon: Wrench },
}

// How many dots light up per tier (out of 3).
const tierDots: Record<SkillLevel, number> = {
  Advanced: 3,
  Proficient: 2,
  Familiar: 1,
}

function LevelDots({ level, color = '#7c5cff' }: { level: SkillLevel; color?: string }) {
  const filled = tierDots[level]
  return (
    <div className="flex items-center gap-1" aria-hidden>
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="h-1.5 w-4 rounded-full transition-colors"
          style={{ background: i < filled ? color : 'rgba(255,255,255,0.14)' }}
        />
      ))}
    </div>
  )
}

function SkillCard({ skill }: { skill: Skill }) {
  const { color, icon: Icon } = catMeta[skill.category]
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 14, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.94 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      data-cursor="hover"
      className="group relative overflow-hidden rounded-2xl glass p-5 transition-all duration-300 hover:-translate-y-1"
      style={{ ['--c' as string]: color }}
    >
      {/* category-colored hover glow */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: `radial-gradient(420px circle at 30% 0%, ${color}24, transparent 70%)` }}
      />
      {/* hairline accent that grows on hover */}
      <span
        className="absolute left-0 top-5 h-0 w-[3px] rounded-r-full transition-all duration-300 group-hover:h-10"
        style={{ background: color }}
      />

      <div className="relative flex items-center gap-4">
        <div
          className="grid h-12 w-12 shrink-0 place-items-center rounded-xl ring-1 transition-transform duration-300 group-hover:scale-110"
          style={{ background: `${color}1f`, color, borderColor: `${color}55`, boxShadow: `inset 0 0 0 1px ${color}22` }}
        >
          <Icon size={20} />
        </div>

        <div className="min-w-0 flex-1">
          <h4 className="truncate font-medium leading-tight">{skill.name}</h4>
          <div className="mt-2 flex items-center gap-2.5">
            <LevelDots level={skill.level} color={color} />
            <span className="font-mono text-[11px] uppercase tracking-wider text-[var(--muted)]">
              {skill.level}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function Skills() {
  const [active, setActive] = useState<(typeof categories)[number]>('All')
  const filtered = useMemo(
    () => (active === 'All' ? skills : skills.filter((s) => s.category === active)),
    [active],
  )

  return (
    <section id="skills" className="relative mx-auto max-w-7xl px-6 py-28">
      <SectionHeading eyebrow="Skills" title="Tools I work with" subtitle="The stack I use to build AI and full-stack apps." />

      {/* filters */}
      <div className="mb-6 flex flex-wrap justify-center gap-3">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            data-cursor="hover"
            className={`relative rounded-full px-5 py-2 text-sm transition-colors ${
              active === cat ? 'text-white' : 'text-[var(--muted)] hover:text-white'
            }`}
          >
            {active === cat && (
              <motion.span
                layoutId="skill-pill"
                className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-accent to-accent-cyan"
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              />
            )}
            {cat}
          </button>
        ))}
      </div>

      {/* legend */}
      <div className="mb-12 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-[var(--muted)]">
        {skillLevels.map((lvl) => (
          <span key={lvl} className="flex items-center gap-2">
            <LevelDots level={lvl} color="#a78bfa" />
            {lvl}
          </span>
        ))}
      </div>

      <motion.div layout className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((skill) => (
            <SkillCard key={skill.name} skill={skill} />
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  )
}
