import { motion, useAnimation, useReducedMotion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import Reveal from './Reveal.jsx'
import CardSpotlight from './CardSpotlight.jsx'

export function Card({ children, className = '', revealDelay = 0, underlay = null }) {
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
        <CardSpotlight className="z-0" />
        {underlay ? <div className="absolute inset-0 z-[1]">{underlay}</div> : null}
        <div className="relative z-10">{children}</div>
      </motion.div>
    </Reveal>
  )
}

export function ClickCard({
  to,
  children,
  className = '',
  revealDelay = 0,
  underlay = null
}) {
  const nav = useNavigate()
  const reduce = useReducedMotion()
  const controls = useAnimation()

  const go = async () => {
    if (reduce) {
      nav(to)
      return
    }

    await controls.start({
      scale: 0.98,
      rotateZ: -0.6,
      y: -8,
      transition: { duration: 0.11, ease: 'easeOut' }
    })
    await controls.start({
      scale: 1.02,
      rotateZ: 0.4,
      y: -10,
      transition: { duration: 0.1, ease: 'easeOut' }
    })

    nav(to)
  }

  return (
    <Reveal delay={revealDelay}>
      <motion.button
        type="button"
        onClick={go}
        animate={controls}
        whileHover={reduce ? undefined : { y: -6, scale: 1.01 }}
        whileTap={reduce ? undefined : { scale: 0.985 }}
        transition={{ type: 'spring', stiffness: 260, damping: 22 }}
        className={
          'group relative w-full overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-5 text-left md:p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.02)] hover:shadow-[0_0_0_1px_rgba(116,173,60,0.18),0_18px_60px_-28px_rgba(0,0,0,0.8)] focus:outline-none focus:ring-2 focus:ring-brand-400/50 ' +
          className
        }
      >
        <CardSpotlight className="z-0" />
        {underlay ? <div className="absolute inset-0 z-[1]">{underlay}</div> : null}
        <div className="relative z-10">{children}</div>
      </motion.button>
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
