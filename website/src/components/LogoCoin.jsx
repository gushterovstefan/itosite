import { motion, useReducedMotion } from 'framer-motion'

export default function LogoCoin({ src, className = '' }) {
  const reduce = useReducedMotion()

  if (reduce) {
    return (
      <div className={"coin-wrap " + className}>
        <img src={src} alt="" aria-hidden="true" className="coin-img" />
      </div>
    )
  }

  return (
    <motion.div
      className={"coin-wrap " + className}
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        className="coin-tilt"
        animate={{
          rotateY: [0, 360],
          rotateX: [8, -10, 8],
          rotateZ: [0.6, -0.6, 0.6]
        }}
        transition={{
          rotateY: { duration: 10, repeat: Infinity, ease: 'linear' },
          rotateX: { duration: 6.5, repeat: Infinity, ease: 'easeInOut' },
          rotateZ: { duration: 5.8, repeat: Infinity, ease: 'easeInOut' }
        }}
      >
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
        animate={{ scale: [0.9, 1.02, 0.9], opacity: [0.32, 0.46, 0.32] }}
        transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}
      />
    </motion.div>
  )
}
