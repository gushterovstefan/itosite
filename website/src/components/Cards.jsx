import { motion } from 'framer-motion'
import Reveal from './Reveal.jsx'
import CardSpotlight from './CardSpotlight.jsx'

export function Card({ children, className = '', revealDelay = 0 }) {
  return (
    <Reveal delay={revealDelay}>
      <motion.div
        whileHover={{ y: -6, scale: 1.01 }}
        transition={{ type: 'spring', stiffness: 260, damping: 22 }}
        className={
          'group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-5 md:p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.02)] hover:shadow-[0_0_0_1px_rgba(116,173,60,0.18),0_18px_60px_-28px_rgba(0,0,0,0.8)] ' +
          className
        }
      >
        <CardSpotlight />
        <div className="relative z-10">{children}</div>
      </motion.div>
    </Reveal>
  )
}

export function BulletList({ items }) {
  return (
    <ul className="space-y-2 text-sm text-white/70">
      {items.map((b, i) => (
        <motion.li
          key={b}
          className="flex gap-2"
          initial={{ opacity: 0, x: -6 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.25, ease: 'easeOut', delay: i * 0.03 }}
        >
          <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-brand-400" />
          <span>{b}</span>
        </motion.li>
      ))}
    </ul>
  )
}
