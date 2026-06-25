import { motion } from 'framer-motion'
import { GraduationCap } from 'lucide-react'
import SectionHeading from '../SectionHeading'
import { experience } from '../../data/portfolio'

export default function Experience() {
  return (
    <section id="experience" className="relative mx-auto max-w-5xl px-6 py-28">
      <SectionHeading eyebrow="Education" title="Education & journey" />

      <div className="relative">
        {/* animated vertical line */}
        <motion.div
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: 'easeInOut' }}
          style={{ originY: 0 }}
          className="absolute left-4 top-0 h-full w-px bg-gradient-to-b from-accent via-accent-cyan to-transparent md:left-1/2"
        />

        <div className="space-y-12">
          {experience.map((item, i) => (
            <motion.div
              key={item.company}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className={`relative flex flex-col gap-4 pl-12 md:flex-row md:items-center md:gap-8 md:pl-0 ${
                i % 2 === 0 ? 'md:flex-row-reverse' : ''
              }`}
            >
              {/* node */}
              <span className="absolute left-4 grid h-8 w-8 -translate-x-1/2 place-items-center rounded-full bg-gradient-to-br from-accent to-accent-cyan ring-4 ring-[var(--bg)] md:left-1/2">
                <GraduationCap size={14} className="text-white" />
              </span>

              <div className="md:w-1/2" />
              <div className="md:w-1/2">
                <div className="rounded-2xl glass p-6 transition-transform duration-300 hover:-translate-y-1" data-cursor="hover">
                  <span className="font-mono text-xs text-accent-cyan">{item.period}</span>
                  <h3 className="mt-1 font-display text-xl font-semibold">{item.role}</h3>
                  <p className="text-sm text-accent-glow">{item.company}</p>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">{item.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
