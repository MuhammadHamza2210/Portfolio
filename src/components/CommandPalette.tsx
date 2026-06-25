import { useEffect, useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search, User, Code2, FolderGit2, Briefcase, Mail, Github, Linkedin,
  Sun, Moon, type LucideIcon,
} from 'lucide-react'
import { profile } from '../data/portfolio'

type Action = {
  label: string
  icon: LucideIcon
  hint?: string
  run: () => void
}

type Props = {
  open: boolean
  onClose: () => void
  onToggleTheme: () => void
  theme: 'dark' | 'light'
}

export default function CommandPalette({ open, onClose, onToggleTheme, theme }: Props) {
  const [query, setQuery] = useState('')
  const [cursor, setCursor] = useState(0)

  const go = (href: string) => () => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
    onClose()
  }
  const ext = (url: string) => () => {
    window.open(url, '_blank')
    onClose()
  }

  const actions: Action[] = useMemo(
    () => [
      { label: 'Go to About', icon: User, hint: 'Section', run: go('#about') },
      { label: 'Go to Skills', icon: Code2, hint: 'Section', run: go('#skills') },
      { label: 'Go to Projects', icon: FolderGit2, hint: 'Section', run: go('#projects') },
      { label: 'Go to Education', icon: Briefcase, hint: 'Section', run: go('#experience') },
      { label: 'Go to Contact', icon: Mail, hint: 'Section', run: go('#contact') },
      { label: `Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`, icon: theme === 'dark' ? Sun : Moon, hint: 'Theme', run: () => { onToggleTheme(); onClose() } },
      { label: 'Email me', icon: Mail, hint: 'Contact', run: ext(`mailto:${profile.email}`) },
      { label: 'Open GitHub', icon: Github, hint: 'Social', run: ext(profile.socials.github) },
      { label: 'Open LinkedIn', icon: Linkedin, hint: 'Social', run: ext(profile.socials.linkedin) },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [theme],
  )

  const filtered = useMemo(
    () => actions.filter((a) => a.label.toLowerCase().includes(query.toLowerCase())),
    [actions, query],
  )

  useEffect(() => setCursor(0), [query, open])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowDown') { e.preventDefault(); setCursor((c) => Math.min(c + 1, filtered.length - 1)) }
      if (e.key === 'ArrowUp') { e.preventDefault(); setCursor((c) => Math.max(c - 1, 0)) }
      if (e.key === 'Enter') { e.preventDefault(); filtered[cursor]?.run() }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, filtered, cursor, onClose])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[100] flex items-start justify-center bg-black/60 px-4 pt-[14vh] backdrop-blur-md"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-xl overflow-hidden rounded-2xl glass-strong shadow-2xl"
          >
            <div className="flex items-center gap-3 border-b border-white/10 px-5 py-4">
              <Search size={18} className="text-[var(--muted)]" />
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Type a command or search..."
                className="w-full bg-transparent text-sm outline-none placeholder:text-[var(--muted)]"
              />
              <kbd className="rounded-md border border-white/10 px-2 py-0.5 font-mono text-xs text-[var(--muted)]">esc</kbd>
            </div>

            <ul className="max-h-80 overflow-y-auto p-2">
              {filtered.length === 0 && (
                <li className="px-4 py-6 text-center text-sm text-[var(--muted)]">No results found</li>
              )}
              {filtered.map((a, i) => {
                const Icon = a.icon
                return (
                  <li key={a.label}>
                    <button
                      onMouseEnter={() => setCursor(i)}
                      onClick={a.run}
                      className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm transition-colors ${
                        i === cursor ? 'bg-gradient-to-r from-accent/30 to-accent-cyan/20 text-white' : 'text-[var(--muted)]'
                      }`}
                    >
                      <Icon size={16} />
                      <span className="flex-1">{a.label}</span>
                      {a.hint && <span className="text-xs opacity-60">{a.hint}</span>}
                    </button>
                  </li>
                )
              })}
            </ul>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
