import { Fragment, useEffect, useRef, useState, type FormEvent } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { ArrowUp, Sparkles, X } from 'lucide-react'
import { profile } from '../data/portfolio'

type Message = { role: 'user' | 'model'; text: string; error?: boolean }

type Props = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const SUGGESTIONS = [
  "What's his strongest project?",
  'Has he built anything with RAG?',
  'Is he open to internships?',
  "What's his backend experience?",
]

const LINK_RE = /(https?:\/\/[^\s)]+|[\w.+-]+@[\w-]+\.[\w.]+)/g

/** Turns URLs and email addresses in a reply into links. */
function Linkified({ text }: { text: string }) {
  const clean = text.replace(/\*\*(.+?)\*\*/g, '$1') // the model occasionally slips in bold
  return (
    <>
      {clean.split(LINK_RE).map((part, i) => {
        if (i % 2 === 0) return <Fragment key={i}>{part}</Fragment>
        // keep sentence punctuation out of the link
        const [, href, trail] = part.match(/^(.*?)([.,;:!?]*)$/) ?? [part, part, '']
        const isEmail = !href.startsWith('http')
        // only Hamza's own address gets a mailto (not e.g. a demo login)
        if (isEmail && href !== profile.email) return <Fragment key={i}>{part}</Fragment>
        return (
          <Fragment key={i}>
            <a
              href={isEmail ? `mailto:${href}` : href}
              target="_blank"
              rel="noreferrer"
              className="break-all text-accent-glow underline decoration-accent-glow/40 underline-offset-2 hover:decoration-accent-glow"
            >
              {href}
            </a>
            {trail}
          </Fragment>
        )
      })}
    </>
  )
}

export default function AskHamza({ open, onOpenChange }: Props) {
  const reduce = useReducedMotion()
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [pending, setPending] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLDivElement>(null)
  const launcherRef = useRef<HTMLButtonElement>(null)

  // focus the input on open; hand focus back to the launcher on close
  const wasOpen = useRef(false)
  useEffect(() => {
    if (open) inputRef.current?.focus()
    else if (wasOpen.current) launcherRef.current?.focus({ preventScroll: true })
    wasOpen.current = open
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onOpenChange(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onOpenChange])

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: reduce ? 'auto' : 'smooth' })
  }, [messages, pending, reduce])

  const ask = async (question: string) => {
    const text = question.trim()
    if (!text || pending) return
    const history: Message[] = [...messages, { role: 'user', text }]
    setMessages(history)
    setInput('')
    setPending(true)

    let reply: Message
    try {
      const res = await fetch('/api/ask', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        // failed replies are UI-only; don't feed them back to the model
        body: JSON.stringify({ messages: history.filter((m) => !m.error).map(({ role, text }) => ({ role, text })) }),
      })
      const data = await res.json().catch(() => ({}))
      reply = res.ok && data.reply
        ? { role: 'model', text: data.reply }
        : { role: 'model', error: true, text: `${data.error ?? 'Something went wrong.'} You can always email Hamza at ${profile.email}.` }
    } catch {
      reply = { role: 'model', error: true, text: `I couldn't connect just now. You can email Hamza at ${profile.email}.` }
    }
    setMessages((m) => [...m, reply])
    setPending(false)
  }

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    ask(input)
  }

  return (
    <>
      <AnimatePresence>
        {!open && (
          <motion.button
            ref={launcherRef}
            key="launcher"
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            onClick={() => onOpenChange(true)}
            data-cursor="hover"
            aria-label="Ask an AI assistant about Hamza"
            className="fixed bottom-5 right-5 z-[90] inline-flex items-center gap-2 rounded-full bg-accent px-4 py-3 text-sm font-medium text-white shadow-[0_10px_40px_-10px_rgba(59,130,246,0.8)] transition-transform hover:-translate-y-0.5"
          >
            <Sparkles size={16} />
            <span className="hidden sm:inline">Ask AI about me</span>
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <motion.div
            key="panel"
            role="dialog"
            aria-label="Ask about Hamza"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformOrigin: 'bottom right', background: 'color-mix(in srgb, var(--bg) 94%, transparent)' }}
            className="fixed inset-x-3 bottom-3 z-[90] flex h-[min(560px,calc(100dvh-1.5rem))] flex-col overflow-hidden rounded-3xl border border-[var(--glass-border)] shadow-2xl backdrop-blur-xl sm:inset-x-auto sm:bottom-5 sm:right-5 sm:w-[400px]"
          >
            <header className="flex items-start justify-between gap-4 border-b border-[var(--glass-border)] px-5 py-4">
              <div>
                <h2 className="font-display text-base font-semibold">Ask about Hamza</h2>
                <p className="mt-0.5 text-xs text-[var(--muted)]">AI assistant · answers from his projects and background</p>
              </div>
              <button
                onClick={() => onOpenChange(false)}
                data-cursor="hover"
                aria-label="Close chat"
                className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-[var(--muted)] transition-colors hover:bg-white/[0.08] hover:text-[var(--fg)]"
              >
                <X size={16} />
              </button>
            </header>

            <div ref={listRef} aria-live="polite" className="flex-1 space-y-3 overflow-y-auto px-5 py-5 text-sm leading-relaxed">
              <p className="max-w-[85%] rounded-2xl rounded-bl-md bg-white/[0.05] px-4 py-3">
                Hi! I know Hamza's projects, skills and background. Ask me what you'd ask in a first interview.
              </p>

              {messages.length === 0 && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      onClick={() => ask(s)}
                      data-cursor="hover"
                      className="rounded-full border border-[var(--glass-border)] px-3 py-1.5 text-left text-xs text-[var(--muted)] transition-colors hover:border-accent/50 hover:text-[var(--fg)]"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}

              {messages.map((m, i) =>
                m.role === 'user' ? (
                  <p key={i} className="ml-auto max-w-[85%] whitespace-pre-line rounded-2xl rounded-br-md bg-accent px-4 py-3 text-white">
                    {m.text}
                  </p>
                ) : (
                  <p
                    key={i}
                    className={`max-w-[85%] whitespace-pre-line rounded-2xl rounded-bl-md px-4 py-3 ${
                      m.error ? 'bg-red-500/10 text-[var(--muted)]' : 'bg-white/[0.05]'
                    }`}
                  >
                    <Linkified text={m.text} />
                  </p>
                ),
              )}

              {pending && (
                <div className="flex w-fit gap-1 rounded-2xl rounded-bl-md bg-white/[0.05] px-4 py-4" aria-label="Assistant is typing">
                  {[0, 1, 2].map((d) => (
                    <span
                      key={d}
                      className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--muted)]"
                      style={{ animationDelay: `${d * 150}ms` }}
                    />
                  ))}
                </div>
              )}
            </div>

            <form onSubmit={onSubmit} className="border-t border-[var(--glass-border)] p-3">
              <div className="flex items-center gap-2 rounded-2xl border border-[var(--glass-border)] bg-white/[0.03] py-1.5 pl-4 pr-1.5 focus-within:border-accent/60">
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  maxLength={600}
                  placeholder="Ask about projects, skills, availability…"
                  aria-label="Your question"
                  className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-[var(--muted)]/70"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || pending}
                  data-cursor="hover"
                  aria-label="Send"
                  className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-accent text-white transition-opacity disabled:opacity-30"
                >
                  <ArrowUp size={16} />
                </button>
              </div>
              <p className="mt-2 px-1 text-[11px] text-[var(--muted)]/80">
                AI can make mistakes. For anything important, email Hamza.
              </p>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
