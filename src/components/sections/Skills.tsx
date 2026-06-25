import { useMemo, useState } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { useRef } from 'react'
import SectionHeading from '../SectionHeading'
import { skills, type Skill } from '../../data/portfolio'

const categories = ['All', 'Frontend', 'AI', 'Backend', 'Tools'] as const

function Ring({ level }: { level: number }) {
  const ref = useRef<SVGSVGElement>(null)
  const inView = useInView(ref, { once: true })
  const r = 34
  const c = 2 * Math.PI * r
  const offset = c - (level / 100) * c

  return (
    <svg ref={ref} viewBox="0 0 80 80" className="h-20 w-20 -rotate-90">
      <circle cx="40" cy="40" r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="6" />
      <motion.circle
        cx="40"
        cy="40"
        r={r}
        fill="none"
        stroke="url(#ringGrad)"
        strokeWidth="6"
        strokeLinecap="round"
        strokeDasharray={c}
        initial={{ strokeDashoffset: c }}
        animate={inView ? { strokeDashoffset: offset } : {}}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
      />
      <defs>
        <linearGradient id="ringGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#7c5cff" />
          <stop offset="100%" stopColor="#22d3ee" />
        </linearGradient>
      </defs>
    </svg>
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
      className="group relative flex items-center gap-4 rounded-2xl glass p-5 transition-all duration-300 hover:-translate-y-1 hover:bg-white/[0.07]"
    >
      <div className="relative grid place-items-center">
        <Ring level={skill.level} />
        <span className="absolute font-mono text-sm font-medium">{skill.level}%</span>
      </div>
      <div>
        <h4 className="font-medium">{skill.name}</h4>
        <span className="text-xs uppercase tracking-wider text-[var(--muted)]">{skill.category}</span>
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
      <div className="mb-10 flex flex-wrap justify-center gap-3">
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
