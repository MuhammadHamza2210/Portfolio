import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

/**
 * Premium custom cursor:
 *  - a small dot that tracks the pointer 1:1
 *  - a trailing ring that eases behind it and grows over interactive elements
 *  - a contextual label pill that appears over elements carrying a
 *    `data-cursor-label` attribute (e.g. "Case study", "Live ↗")
 * Desktop / fine-pointer only.
 */
export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const [enabled, setEnabled] = useState(false)
  const [hovering, setHovering] = useState(false)
  const [pressed, setPressed] = useState(false)
  const [label, setLabel] = useState<string | null>(null)

  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    if (!fine) return
    setEnabled(true)
    document.body.classList.add('custom-cursor')

    let ringX = 0
    let ringY = 0
    let mouseX = 0
    let mouseY = 0
    let raf = 0

    const move = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
      if (dotRef.current) dotRef.current.style.transform = `translate(${mouseX}px, ${mouseY}px)`
      const target = e.target as HTMLElement
      setHovering(!!target.closest('a, button, [data-cursor="hover"]'))
      const labelled = target.closest('[data-cursor-label]') as HTMLElement | null
      setLabel(labelled ? labelled.getAttribute('data-cursor-label') : null)
    }
    const down = () => setPressed(true)
    const up = () => setPressed(false)

    const loop = () => {
      ringX += (mouseX - ringX) * 0.2
      ringY += (mouseY - ringY) * 0.2
      if (ringRef.current) ringRef.current.style.transform = `translate(${ringX}px, ${ringY}px)`
      raf = requestAnimationFrame(loop)
    }

    window.addEventListener('mousemove', move)
    window.addEventListener('mousedown', down)
    window.addEventListener('mouseup', up)
    raf = requestAnimationFrame(loop)
    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mousedown', down)
      window.removeEventListener('mouseup', up)
      cancelAnimationFrame(raf)
      document.body.classList.remove('custom-cursor')
    }
  }, [])

  if (!enabled) return null

  const showLabel = !!label
  const ringSize = pressed ? 30 : hovering ? 54 : 38

  return (
    <>
      {/* center dot */}
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] -ml-[3px] -mt-[3px] h-1.5 w-1.5 rounded-full bg-white mix-blend-difference transition-opacity duration-200"
        style={{ opacity: showLabel ? 0 : 1 }}
      />

      {/* trailing ring + contextual label, positioned together */}
      <div ref={ringRef} className="pointer-events-none fixed left-0 top-0 z-[9998]">
        {/* plain ring — fades out when a label takes over */}
        <div
          className="absolute rounded-full border border-white/60 mix-blend-difference transition-[width,height,opacity,margin] duration-200 ease-out"
          style={{
            width: ringSize,
            height: ringSize,
            marginLeft: -ringSize / 2,
            marginTop: -ringSize / 2,
            opacity: showLabel ? 0 : hovering ? 1 : 0.55,
          }}
        />

        {/* premium label pill */}
        <AnimatePresence>
          {showLabel && (
            <motion.div
              key="label"
              initial={{ opacity: 0, scale: 0.5, x: '-50%', y: '-50%' }}
              animate={{ opacity: 1, scale: 1, x: '-50%', y: '-50%' }}
              exit={{ opacity: 0, scale: 0.5, x: '-50%', y: '-50%' }}
              transition={{ type: 'spring', stiffness: 480, damping: 30, mass: 0.6 }}
              className="absolute left-0 top-0 flex items-center gap-1.5 whitespace-nowrap rounded-full bg-gradient-to-r from-accent to-accent-cyan px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-white shadow-[0_12px_44px_-8px_rgba(124,92,255,0.75)] ring-1 ring-white/25 backdrop-blur-sm"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-white/90" />
              {label}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  )
}
