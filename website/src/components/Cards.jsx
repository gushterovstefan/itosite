import { motion } from 'framer-motion'
import Reveal from './Reveal.jsx'

export function Card({ children, className = '', revealDelay = 0 }) {
  return (
    <Reveal delay={revealDelay}>
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ type: 'spring', stiffness: 260, damping: 22 }}
        className={
          'rounded-2xl border border-white/10 bg-white/5 p-5 md:p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.02)] ' +
          className
        }
      >
        {children}
      </motion.div>
    </Reveal>
  )
}

export function BulletList({ items }) {
  return (
    <ul className="space-y-2 text-sm text-white/70">
      {items.map((b) => (
        <li key={b} className="flex gap-2">
          <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-brand-400" />
          <span>{b}</span>
        </li>
      ))}
    </ul>
  )
}
