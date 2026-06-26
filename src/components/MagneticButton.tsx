import { useRef, type ReactNode, type MouseEvent } from 'react'
import { motion } from 'framer-motion'

type Props = {
  children: ReactNode
  href?: string
  onClick?: () => void
  variant?: 'primary' | 'ghost'
  className?: string
  cursorLabel?: string
}

/**
 * A button/link that is magnetically attracted to the cursor while hovered.
 */
export default function MagneticButton({
  children,
  href,
  onClick,
  variant = 'primary',
  className = '',
  cursorLabel,
}: Props) {
  const ref = useRef<HTMLDivElement>(null)

  const handleMove = (e: MouseEvent) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = e.clientX - (rect.left + rect.width / 2)
    const y = e.clientY - (rect.top + rect.height / 2)
    el.style.transform = `translate(${x * 0.35}px, ${y * 0.35}px)`
  }

  const reset = () => {
    if (ref.current) ref.current.style.transform = 'translate(0, 0)'
  }

  const base =
    'relative inline-flex items-center gap-2 rounded-full px-7 py-3 text-sm font-medium tracking-wide transition-colors duration-300 will-change-transform'
  const styles =
    variant === 'primary'
      ? 'text-white ring-accent bg-gradient-to-r from-accent to-accent-cyan hover:shadow-[0_0_50px_-8px_rgba(124,92,255,0.7)]'
      : 'text-white/90 glass hover:bg-white/[0.08]'

  const inner = (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      data-cursor-label={cursorLabel}
      className={`${base} ${styles} ${className}`}
      style={{ transition: 'transform 0.25s cubic-bezier(0.22,1,0.36,1)' }}
    >
      {children}
    </motion.div>
  )

  if (href) {
    return (
      <a href={href} onClick={onClick} className="inline-block">
        {inner}
      </a>
    )
  }
  return (
    <button onClick={onClick} className="inline-block bg-transparent border-0 p-0">
      {inner}
    </button>
  )
}
