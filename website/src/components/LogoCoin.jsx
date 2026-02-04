import { useRef } from 'react'
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion'

export default function LogoCoin({ src, className = '' }) {
  const reduce = useReducedMotion()
  const ref = useRef(null)

  const rx = useMotionValue(0)
  const ry = useMotionValue(0)
  const srx = useSpring(rx, { stiffness: 180, damping: 22 })
  const sry = useSpring(ry, { stiffness: 180, damping: 22 })

  if (reduce) {
    return (
      <div className={'coin-wrap ' + className}>
        <img src={src} alt="" aria-hidden="true" className="coin-img" />
      </div>
    )
  }

  return (
    <motion.div
      ref={ref}
      className={'coin-wrap ' + className}
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={(e) => {
        const el = ref.current
        if (!el) return
        const r = el.getBoundingClientRect()
        const px = (e.clientX - r.left) / r.width
        const py = (e.clientY - r.top) / r.height
        const max = 12
        rx.set((0.5 - py) * max)
        ry.set((px - 0.5) * max)
      }}
      onMouseLeave={() => {
        rx.set(0)
        ry.set(0)
      }}
    >
      <motion.div
        className="coin-tilt"
        style={{ rotateX: srx, rotateY: sry }}
        animate={{
          rotateZ: [0.6, -0.6, 0.6]
        }}
        transition={{ rotateZ: { duration: 5.8, repeat: Infinity, ease: 'easeInOut' } }}
      >
        {/* thickness illusion */}
        <div className="coin-edge" aria-hidden="true" />
        <div className="coin-rim" aria-hidden="true" />
        <div className="coin-sheen" aria-hidden="true" />

        <motion.img
          src={src}
          alt=""
          aria-hidden="true"
          className="coin-img"
          draggable={false}
        />
      </motion.div>

      <motion.div
        className="coin-shadow"
        aria-hidden="true"
        animate={{ scale: [0.9, 1.05, 0.9], opacity: [0.28, 0.42, 0.28] }}
        transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}
      />
    </motion.div>
  )
}
