import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SectionHeading from '../SectionHeading'
import { skills, skillLevels, type Skill, type SkillLevel } from '../../data/portfolio'

const categories = ['All', 'Frontend', 'AI', 'Backend', 'Tools'] as const

// How many dots light up per tier (out of 3).
const tierDots: Record<SkillLevel, number> = {
  Advanced: 3,
  Proficient: 2,
  Familiar: 1,
}

function LevelDots({ level }: { level: SkillLevel }) {
  const filled = tierDots[level]
  return (
    <div className="flex items-center gap-1" aria-hidden>
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className={`h-1.5 w-1.5 rounded-full transition-colors ${
            i < filled ? 'bg-gradient-to-r from-accent to-accent-cyan' : 'bg-white/15'
          }`}
        />
      ))}
    </div>
  )
}

function SkillCard({ skill }: { skill: Skill }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.92 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      data-cursor="hover"
      className="group relative flex items-center justify-between gap-4 rounded-2xl glass p-5 transition-all duration-300 hover:-translate-y-1 hover:bg-white/[0.07]"
    >
      <div className="min-w-0">
        <h4 className="truncate font-medium">{skill.name}</h4>
        <span className="text-xs uppercase tracking-wider text-[var(--muted)]">{skill.category}</span>
      </div>
      <div className="flex shrink-0 flex-col items-end gap-1.5">
        <span className="font-mono text-xs text-[var(--muted)]">{skill.level}</span>
        <LevelDots level={skill.level} />
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
      <div className="mb-10 flex flex-wrap items-center justify-center gap-5 text-xs text-[var(--muted)]">
        {skillLevels.map((lvl) => (
          <span key={lvl} className="flex items-center gap-2">
            <LevelDots level={lvl} />
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
