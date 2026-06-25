import { motion } from 'framer-motion'
import { profile } from '../data/portfolio'

export default function Loader() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, filter: 'blur(12px)' }}
      transition={{ duration: 0.7, ease: 'easeInOut' }}
      className="fixed inset-0 z-[200] grid place-items-center bg-[var(--bg)]"
    >
      <div className="flex flex-col items-center gap-6">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="relative grid h-20 w-20 place-items-center"
        >
          <span className="absolute inset-0 rounded-full border-2 border-white/10" />
          <motion.span
            className="absolute inset-0 rounded-full border-2 border-transparent border-t-accent border-r-accent-cyan"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          />
          <span className="font-display text-2xl font-bold gradient-text">{profile.firstName.charAt(0)}</span>
        </motion.div>

        <div className="overflow-hidden">
          <motion.p
            initial={{ y: '100%' }}
            animate={{ y: '0%' }}
            transition={{ delay: 0.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="font-mono text-xs uppercase tracking-[0.3em] text-[var(--muted)]"
          >
            Loading experience
          </motion.p>
        </div>
      </div>
    </motion.div>
  )
}
