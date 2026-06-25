import { useRef, type ReactNode, type MouseEvent } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { MapPin, GraduationCap, Sparkles, BadgeCheck } from 'lucide-react'
import { profile } from '../data/portfolio'

// Deterministic "barcode" bar widths (no Math.random so the build is stable).
const BARS = [2, 1, 3, 1, 1, 2, 1, 3, 2, 1, 1, 2, 3, 1, 2, 1, 1, 3, 1, 2, 2, 1, 3, 1, 1, 2, 1, 2, 3, 1, 1, 2, 1, 3, 2, 1]

function Row({ icon, children }: { icon: ReactNode; children: ReactNode }) {
  return (
    <div className="flex items-center gap-2.5">
      <span className="grid h-6 w-6 shrink-0 place-items-center rounded-md glass text-accent-glow">{icon}</span>
      <span className="leading-tight">{children}</span>
    </div>
  )
}

/**
 * A unique "developer ID badge" hero visual — a glassmorphic, tilt-on-cursor
 * card with the owner's photo, details, a holographic chip and a barcode.
 */
export default function IdCard() {
  const ref = useRef<HTMLDivElement>(null)

  // Cursor-driven 3D tilt
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [12, -12]), { stiffness: 150, damping: 18 })
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-12, 12]), { stiffness: 150, damping: 18 })

  const onMove = (e: MouseEvent) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    mx.set((e.clientX - r.left) / r.width - 0.5)
    my.set((e.clientY - r.top) / r.height - 0.5)
  }
  const onLeave = () => {
    mx.set(0)
    my.set(0)
  }

  return (
    <div className="flex justify-center [perspective:1200px]">
      <motion.div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        initial={{ opacity: 0, y: 50, rotateZ: -5 }}
        animate={{ opacity: 1, y: 0, rotateZ: 0 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="relative w-[300px] sm:w-[340px]"
      >
        {/* lanyard */}
        <div className="absolute left-1/2 -top-[4.5rem] h-[4.5rem] w-2.5 -translate-x-1/2 rounded-b bg-gradient-to-b from-accent/80 to-accent-cyan/80" />
        <div className="absolute left-1/2 -top-3 h-6 w-14 -translate-x-1/2 rounded-full border border-white/25 bg-white/10 backdrop-blur" />

        {/* card body */}
        <div className="relative overflow-hidden rounded-[28px] glass-strong p-5 shadow-2xl ring-1 ring-white/10">
          {/* ambient glows */}
          <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-accent/30 blur-3xl" />
          <div className="pointer-events-none absolute -left-20 -bottom-20 h-48 w-48 rounded-full bg-accent-cyan/30 blur-3xl" />

          {/* header */}
          <div className="relative mb-4 flex items-center justify-between">
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent-glow">Developer ID</span>
            {/* smart-card chip */}
            <div className="grid h-6 w-9 grid-cols-3 gap-px overflow-hidden rounded-md bg-gradient-to-br from-amber-300/80 to-amber-500/60 ring-1 ring-amber-200/40">
              {Array.from({ length: 6 }).map((_, i) => (
                <span key={i} className="bg-amber-900/20" />
              ))}
            </div>
          </div>

          {/* photo */}
          <div className="relative mb-4 flex justify-center">
            <div className="relative">
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-accent to-accent-cyan opacity-70 blur" />
              <img
                src="/hamza.jpeg"
                alt={profile.name}
                className="relative h-36 w-36 rounded-2xl object-cover ring-2 ring-white/20"
              />
            </div>
          </div>

          {/* name + role */}
          <div className="relative text-center">
            <h3 className="font-display text-xl font-bold tracking-tight">{profile.name}</h3>
            <p className="mt-0.5 text-sm font-medium gradient-text">{profile.role}</p>
          </div>

          {/* details */}
          <div className="relative mt-4 space-y-2 text-xs text-[var(--muted)]">
            <Row icon={<GraduationCap size={13} />}>BS Computer Science · Bahria University</Row>
            <Row icon={<MapPin size={13} />}>{profile.location}</Row>
            <Row icon={<Sparkles size={13} />}>AI · RAG · Full-Stack Web</Row>
          </div>

          {/* id + verified */}
          <div className="relative mt-4 flex items-center justify-between border-t border-white/10 pt-3">
            <span className="font-mono text-[10px] text-[var(--muted)]">ID · CS-2023-MH</span>
            <span className="inline-flex items-center gap-1 text-[10px] font-medium text-emerald-400">
              <BadgeCheck size={12} /> Verified
            </span>
          </div>

          {/* barcode */}
          <div className="relative mt-3 flex h-7 items-stretch gap-[2px]">
            {BARS.map((w, i) => (
              <span key={i} className="block rounded-sm bg-white/70" style={{ width: `${w}px` }} />
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  )
}
