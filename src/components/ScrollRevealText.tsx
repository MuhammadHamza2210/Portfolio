import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion, type MotionValue } from 'framer-motion'

/**
 * Scroll-linked text reveal: each word brightens from dim to full as the
 * paragraph scrolls through the viewport. Key words light up in the accent
 * color. Falls back to plain, fully-visible text when reduced motion is on.
 */

// Words worth emphasizing — matched after stripping punctuation, lowercased.
const KEYWORDS = new Set([
  'ai', 'ai-powered', 'full-stack', 'rag-based', 'rag', 'intersection',
  'engineer', 'developer', 'products', 'real',
])

const clean = (w: string) => w.toLowerCase().replace(/[^a-z0-9-]/g, '')
const isKeyword = (w: string) => KEYWORDS.has(clean(w))

function Word({
  children,
  progress,
  range,
  highlight,
}: {
  children: string
  progress: MotionValue<number>
  range: [number, number]
  highlight: boolean
}) {
  const color = useTransform(
    progress,
    range,
    highlight
      ? ['rgba(167,139,250,0.25)', '#a78bfa']
      : ['rgba(232,234,242,0.16)', 'rgba(232,234,242,0.96)'],
  )
  return (
    <motion.span style={{ color }} className="transition-none">
      {children}{' '}
    </motion.span>
  )
}

export default function ScrollRevealText({
  text,
  className = '',
}: {
  text: string
  className?: string
}) {
  const ref = useRef<HTMLParagraphElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.9', 'end 0.55'],
  })

  const lines = text.split('\n').filter((l) => l.trim().length > 0)
  const total = lines.reduce((a, l) => a + l.trim().split(/\s+/).filter(Boolean).length, 0)

  // Accessible fallback: show the text fully, no scroll binding.
  if (reduce) {
    return <p className={`whitespace-pre-line text-[var(--fg)]/90 ${className}`}>{text}</p>
  }

  let idx = 0
  return (
    <p ref={ref} className={className}>
      {lines.map((line, li) => {
        const words = line.trim().split(/\s+/).filter(Boolean)
        return (
          <span key={li} className={li < lines.length - 1 ? 'block mb-3' : 'block'}>
            {words.map((w, wi) => {
              const start = idx / total
              const end = Math.min((idx + 1.5) / total, 1)
              idx++
              return (
                <Word
                  key={`${li}-${wi}`}
                  progress={scrollYProgress}
                  range={[start, end]}
                  highlight={isKeyword(w)}
                >
                  {w}
                </Word>
              )
            })}
          </span>
        )
      })}
    </p>
  )
}
