import { motion, useReducedMotion } from 'framer-motion'

const dots = [
  { x: '8%', y: '18%', s: 6, d: 0.0 },
  { x: '20%', y: '55%', s: 10, d: 0.2 },
  { x: '36%', y: '28%', s: 8, d: 0.35 },
  { x: '58%', y: '20%', s: 7, d: 0.15 },
  { x: '74%', y: '44%', s: 12, d: 0.25 },
  { x: '86%', y: '70%', s: 9, d: 0.4 }
]

export default function Particles() {
  const reduce = useReducedMotion()
  if (reduce) return null

  return (
    <div className="pointer-events-none absolute inset-0">
      {dots.map((p, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-white"
          style={{ left: p.x, top: p.y, width: p.s, height: p.s, opacity: 0.06 }}
          animate={{ y: [0, -10, 0], opacity: [0.06, 0.12, 0.06] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: p.d }}
        />
      ))}
    </div>
  )
}
