import { motion } from 'framer-motion'
import { ArrowDown, Github, Linkedin, Mail, Sparkles } from 'lucide-react'
import MagneticButton from '../MagneticButton'
import IdCard from '../IdCard'
import { profile } from '../../data/portfolio'

const line = {
  hidden: { opacity: 0, y: '120%' },
  show: (i: number) => ({
    opacity: 1,
    y: '0%',
    transition: { duration: 0.9, delay: 0.2 + i * 0.12, ease: [0.22, 1, 0.36, 1] },
  }),
}

export default function Hero() {
  const titleWords = ['AI', '&', 'Web', 'Developer']

  return (
    <section id="home" className="relative flex min-h-screen items-center overflow-hidden pt-24">
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 px-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          {/* availability pill */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-7 inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-sm text-[var(--muted)]"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            Open to internships & collaborations
          </motion.div>

          {/* animated title */}
          <h1 className="font-display text-5xl font-semibold leading-[1.05] tracking-tight sm:text-7xl">
            {titleWords.map((word, i) => (
              <span key={i} className="mr-3 inline-block overflow-hidden align-bottom">
                <motion.span custom={i} variants={line} initial="hidden" animate="show" className="inline-block">
                  <span className={i === 1 || i === 3 ? 'gradient-text' : ''}>{word}</span>
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.9 }}
            className="mt-6 max-w-xl text-lg leading-relaxed text-[var(--muted)]"
          >
            Hi, I'm <span className="text-[var(--fg)] font-medium">{profile.name}</span> — {profile.tagline} A CS
            student turning ideas into real, working AI and web products.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.05 }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <MagneticButton href="#projects" cursorLabel="View work">
              <Sparkles size={16} /> View My Work
            </MagneticButton>
            <MagneticButton href="#contact" variant="ghost" cursorLabel="Say hi">
              Let's Talk
            </MagneticButton>
          </motion.div>

          {/* socials */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 1.2 }}
            className="mt-10 flex items-center gap-5 text-[var(--muted)]"
          >
            {[
              { icon: Github, href: profile.socials.github, label: 'GitHub' },
              { icon: Linkedin, href: profile.socials.linkedin, label: 'LinkedIn' },
              { icon: Mail, href: `mailto:${profile.email}`, label: 'Email' },
            ].map(({ icon: Icon, href, label }, i) => (
              <a
                key={i}
                href={href}
                target="_blank"
                rel="noreferrer"
                data-cursor-label={label}
                className="transition-colors hover:text-[var(--fg)]"
                aria-label={label}
              >
                <Icon size={20} />
              </a>
            ))}
          </motion.div>
        </div>

        {/* ID card visual (replaces the old 3D scene) */}
        <IdCard />
      </div>

      {/* scroll cue */}
      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-xs uppercase tracking-[0.2em] text-[var(--muted)]"
      >
        Scroll
        <motion.span animate={{ y: [0, 8, 0] }} transition={{ duration: 1.6, repeat: Infinity }}>
          <ArrowDown size={16} />
        </motion.span>
      </motion.a>
    </section>
  )
}
