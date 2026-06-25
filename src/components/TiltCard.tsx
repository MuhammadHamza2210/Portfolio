import { useRef, type ReactNode, type MouseEvent } from 'react'

type Props = {
  children: ReactNode
  className?: string
  glow?: string
  intensity?: number
}

/**
 * Glass card with a 3D parallax tilt that follows the cursor, plus a
 * pointer-tracking light glow.
 */
export default function TiltCard({ children, className = '', glow = '#7c5cff', intensity = 8 }: Props) {
  const ref = useRef<HTMLDivElement>(null)

  const handleMove = (e: MouseEvent) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width
    const py = (e.clientY - rect.top) / rect.height
    const rx = (0.5 - py) * intensity
    const ry = (px - 0.5) * intensity
    el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg)`
    el.style.setProperty('--mx', `${px * 100}%`)
    el.style.setProperty('--my', `${py * 100}%`)
  }

  const reset = () => {
    if (ref.current) ref.current.style.transform = 'perspective(900px) rotateX(0) rotateY(0)'
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      data-cursor="hover"
      className={`group relative overflow-hidden rounded-3xl glass transition-transform duration-200 ease-out will-change-transform ${className}`}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {/* pointer glow */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(380px circle at var(--mx,50%) var(--my,50%), ${glow}22, transparent 60%)`,
        }}
      />
      {children}
    </div>
  )
}
