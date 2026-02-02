import { motion, useReducedMotion } from 'framer-motion'

/**
 * Subtle, corporate-friendly reveal-on-scroll.
 * Usage: <Reveal><div>...</div></Reveal>
 */
export default function Reveal({
  children,
  delay = 0,
  y = 14,
  className = '',
  once = true
}) {
  const reduce = useReducedMotion()

  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={reduce ? undefined : { once, amount: 0.2 }}
      transition={reduce ? undefined : { duration: 0.55, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  )
}
