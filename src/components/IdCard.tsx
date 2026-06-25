import { useRef, type ReactNode, type MouseEvent } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { MapPin, GraduationCap, Sparkles, BadgeCheck } from 'lucide-react'
import { profile } from '../data/portfolio'

function Row({ icon, children }: { icon: ReactNode; children: ReactNode }) {
  return (
    <div className="flex items-center gap-2.5">
      <span className="grid h-6 w-6 shrink-0 place-items-center rounded-md glass text-accent-glow">{icon}</span>
      <span className="leading-tight">{children}</span>
    </div>
  )
}

/**
 * A unique "developer ID badge" hero visual — a glassmorphic card with an
 * animated gradient border, a circular photo, and a 3D tilt toward the cursor.
 */
export default function IdCard() {
  const ref = useRef<HTMLDivElement>(null)

  // Cursor-driven 3D tilt
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [10, -10]), { stiffness: 150, damping: 18 })
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-10, 10]), { stiffness: 150, damping: 18 })

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

        {/* animated gradient border */}
        <motion.div
          className="rounded-[30px] p-[1.5px]"
          style={{ background: 'linear-gradient(135deg, #7c5cff, #22d3ee, #f472b6, #7c5cff)', backgroundSize: '300% 300%' }}
          animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
        >
          {/* card body — deep indigo→teal tint matching the site accents */}
          <div className="rounded-[29px] bg-gradient-to-br from-[#1d1748]/95 via-[#141232]/95 to-[#0b1f2e]/95 p-6 backdrop-blur-xl">
            {/* header */}
            <div className="mb-5 flex items-center justify-between">
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent-glow">Developer ID</span>
              {/* smart-card chip */}
              <div className="grid h-6 w-9 grid-cols-3 gap-px overflow-hidden rounded-md bg-gradient-to-br from-amber-300/80 to-amber-500/60 ring-1 ring-amber-200/40">
                {Array.from({ length: 6 }).map((_, i) => (
                  <span key={i} className="bg-amber-900/20" />
                ))}
              </div>
            </div>

            {/* circular photo — object-top keeps the whole head in frame */}
            <div className="mb-5 flex justify-center">
              <div className="relative">
                <div className="absolute -inset-1.5 rounded-full bg-gradient-to-br from-accent to-accent-cyan opacity-80 blur-md" />
                <img
                  src="/hamza.jpeg"
                  alt={profile.name}
                  className="relative h-40 w-40 rounded-full object-cover object-top ring-2 ring-white/25"
                />
              </div>
            </div>

            {/* name + role */}
            <div className="text-center">
              <h3 className="font-display text-xl font-bold tracking-tight">{profile.name}</h3>
              <p className="mt-0.5 text-sm font-medium gradient-text">{profile.role}</p>
            </div>

            {/* details */}
            <div className="mt-5 space-y-2.5 text-xs text-slate-200">
              <Row icon={<GraduationCap size={13} />}>BS Computer Science · Bahria University</Row>
              <Row icon={<MapPin size={13} />}>{profile.location}</Row>
              <Row icon={<Sparkles size={13} />}>AI · RAG · Full-Stack Web</Row>
            </div>

            {/* footer: id + verified */}
            <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-3">
              <span className="font-mono text-[10px] text-slate-300">ID · CS-2023-MH</span>
              <span className="inline-flex items-center gap-1 text-[10px] font-medium text-emerald-400">
                <BadgeCheck size={12} /> Verified
              </span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
