import { useEffect, useRef } from 'react'
import { motion, useMotionTemplate, useMotionValue, useReducedMotion } from 'framer-motion'

/**
 * Elementra-ish cursor spotlight.
 * Renders a subtle radial gradient that follows pointer/touch.
 */
export default function Spotlight({ className = '' }) {
  const reduce = useReducedMotion()
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  useEffect(() => {
    if (reduce) return
    const el = ref.current
    if (!el) return

    const move = (clientX, clientY) => {
      const r = el.getBoundingClientRect()
      x.set(clientX - r.left)
      y.set(clientY - r.top)
    }

    const onPointerMove = (e) => move(e.clientX, e.clientY)
    const onTouchMove = (e) => {
      const t = e.touches?.[0]
      if (t) move(t.clientX, t.clientY)
    }

    window.addEventListener('pointermove', onPointerMove, { passive: true })
    window.addEventListener('touchmove', onTouchMove, { passive: true })

    // initialize near top-left so it doesn't flash from (0,0)
    const r = el.getBoundingClientRect()
    x.set(r.width * 0.25)
    y.set(r.height * 0.25)

    return () => {
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('touchmove', onTouchMove)
    }
  }, [reduce, x, y])

  const background = useMotionTemplate`radial-gradient(520px circle at ${x}px ${y}px, rgba(116,173,60,0.18), rgba(217,70,239,0.10), transparent 60%)`

  if (reduce) return null

  return (
    <motion.div
      ref={ref}
      aria-hidden="true"
      className={
        'pointer-events-none absolute inset-0 opacity-80 mix-blend-screen ' +
        className
      }
      style={{ background }}
    />
  )
}
