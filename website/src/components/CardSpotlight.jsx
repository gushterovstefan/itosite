import { motion, useMotionTemplate, useMotionValue, useReducedMotion } from 'framer-motion'

/**
 * Local spotlight that follows the cursor inside a card.
 */
export default function CardSpotlight({ className = '' }) {
  const reduce = useReducedMotion()
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const background = useMotionTemplate`radial-gradient(240px circle at ${x}px ${y}px, rgba(116,173,60,0.16), rgba(217,70,239,0.08), transparent 62%)`

  if (reduce) return null

  return (
    <motion.div
      aria-hidden="true"
      className={
        'pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 ' +
        className
      }
      style={{ background }}
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect()
        x.set(e.clientX - r.left)
        y.set(e.clientY - r.top)
      }}
      onTouchMove={(e) => {
        const t = e.touches?.[0]
        if (!t) return
        const r = e.currentTarget.getBoundingClientRect()
        x.set(t.clientX - r.left)
        y.set(t.clientY - r.top)
      }}
    />
  )
}
