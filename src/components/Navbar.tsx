import { useEffect, useState } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { Command, Moon, Sun, Menu, X, FileText } from 'lucide-react'
import { profile } from '../data/portfolio'

const links = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Education', href: '#experience' },
  { label: 'Services', href: '#services' },
  { label: 'Contact', href: '#contact' },
]

type Props = {
  theme: 'dark' | 'light'
  onToggleTheme: () => void
  onOpenPalette: () => void
}

export default function Navbar({ theme, onToggleTheme, onOpenPalette }: Props) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 })

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-x-0 top-0 z-50 px-4 pt-4"
      >
        <nav
          className={`mx-auto flex max-w-6xl items-center justify-between rounded-2xl px-5 py-3 transition-all duration-500 ${
            scrolled ? 'glass-strong shadow-2xl' : 'bg-transparent'
          }`}
        >
          <a href="#home" className="font-display text-xl font-bold tracking-tight">
            <span className="gradient-text">{profile.name}</span>
            <span className="text-accent-cyan">.</span>
          </a>

          <ul className="hidden items-center gap-1 md:flex">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  data-cursor="hover"
                  className="rounded-full px-4 py-2 text-sm text-[var(--muted)] transition-colors hover:bg-white/5 hover:text-[var(--fg)]"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <a
              href={profile.resumeUrl}
              target="_blank"
              rel="noreferrer"
              data-cursor="hover"
              className="hidden items-center gap-2 rounded-full glass px-3 py-2 text-xs text-[var(--muted)] transition-colors hover:text-[var(--fg)] sm:flex"
            >
              <FileText size={14} /> Resume
            </a>
            <button
              onClick={onOpenPalette}
              data-cursor="hover"
              aria-label="Open command palette"
              className="hidden items-center gap-2 rounded-full glass px-3 py-2 text-xs text-[var(--muted)] transition-colors hover:text-[var(--fg)] sm:flex"
            >
              <Command size={14} /> <span className="font-mono">⌘K</span>
            </button>
            <button
              onClick={onToggleTheme}
              data-cursor="hover"
              aria-label="Toggle theme"
              className="grid h-9 w-9 place-items-center rounded-full glass transition-colors hover:bg-white/10"
            >
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <button
              onClick={() => setOpen((v) => !v)}
              aria-label="Toggle menu"
              className="grid h-9 w-9 place-items-center rounded-full glass md:hidden"
            >
              {open ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </nav>

        {/* scroll progress bar */}
        <motion.div
          style={{ scaleX: progress }}
          className="mx-auto mt-1 h-0.5 max-w-6xl origin-left rounded-full bg-gradient-to-r from-accent via-accent-cyan to-accent-pink"
        />
      </motion.header>

      {/* mobile menu */}
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed inset-x-4 top-24 z-40 rounded-2xl glass-strong p-4 md:hidden"
        >
          <ul className="flex flex-col gap-1">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-xl px-4 py-3 text-sm text-[var(--muted)] transition-colors hover:bg-white/5 hover:text-[var(--fg)]"
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href={profile.resumeUrl}
                target="_blank"
                rel="noreferrer"
                onClick={() => setOpen(false)}
                className="flex items-center gap-2 rounded-xl px-4 py-3 text-sm text-[var(--muted)] transition-colors hover:bg-white/5 hover:text-[var(--fg)]"
              >
                <FileText size={15} /> Resume
              </a>
            </li>
          </ul>
        </motion.div>
      )}
    </>
  )
}
