import { motion, useAnimation, useReducedMotion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import Reveal from './Reveal.jsx'
import CardSpotlight from './CardSpotlight.jsx'

const variants = {
  default: {
    card: 'border-white/10 bg-white/5',
    top: 'from-white/10 via-white/5 to-transparent'
  },
  brand: {
    card: 'border-brand-300/15 bg-brand-500/10',
    top: 'from-brand-400/25 via-white/5 to-transparent'
  },
  violet: {
    card: 'border-fuchsia-300/15 bg-fuchsia-500/10',
    top: 'from-fuchsia-400/20 via-white/5 to-transparent'
  },
  steel: {
    card: 'border-sky-200/12 bg-sky-500/7',
    top: 'from-sky-300/18 via-white/5 to-transparent'
  },
  amber: {
    card: 'border-amber-200/12 bg-amber-500/8',
    top: 'from-amber-300/18 via-white/5 to-transparent'
  }
}

function CardShell({ children, className = '', underlay = null, variant = 'default', badge = null }) {
  const v = variants[variant] ?? variants.default

  return (
    <>
      {/* top tint */}
      <div
        aria-hidden="true"
        className={
          'pointer-events-none absolute inset-0 bg-gradient-to-b opacity-70 ' +
          v.top
        }
      />

      <CardSpotlight className="z-0" />
      {underlay ? <div className="absolute inset-0 z-[1]">{underlay}</div> : null}

      {badge ? (
        <div className="absolute left-4 top-4 z-20">
          <span className="inline-flex max-w-[15rem] items-center truncate rounded-full border border-white/10 bg-ink-950/80 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/70 backdrop-blur">
            {badge}
          </span>
        </div>
      ) : null}

      <div className={'relative z-10 ' + (badge ? 'pt-8 ' : '') + className}>{children}</div>
    </>
  )
}

export function Card({
  children,
  className = '',
  revealDelay = 0,
  underlay = null,
  variant = 'default',
  badge = null
}) {
  const v = variants[variant] ?? variants.default

  return (
    <Reveal delay={revealDelay}>
      <motion.div
        whileHover={{ y: -6, scale: 1.01 }}
        transition={{ type: 'spring', stiffness: 260, damping: 22 }}
        className={
          'group relative overflow-hidden rounded-2xl border p-5 md:p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.02)] hover:shadow-[0_0_0_1px_rgba(116,173,60,0.18),0_18px_60px_-28px_rgba(0,0,0,0.8)] ' +
          v.card +
          ' ' +
          className
        }
      >
        <CardShell underlay={underlay} variant={variant} badge={badge}>
          {children}
        </CardShell>
      </motion.div>
    </Reveal>
  )
}

export function ClickCard({
  to,
  children,
  className = '',
  revealDelay = 0,
  underlay = null,
  variant = 'default',
  badge = null
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

  const v = variants[variant] ?? variants.default

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
          'group relative w-full overflow-hidden rounded-2xl border p-5 text-left md:p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.02)] hover:shadow-[0_0_0_1px_rgba(116,173,60,0.18),0_18px_60px_-28px_rgba(0,0,0,0.8)] focus:outline-none focus:ring-2 focus:ring-brand-400/50 ' +
          v.card +
          ' ' +
          className
        }
      >
        <CardShell underlay={underlay} variant={variant} badge={badge}>
          {children}
        </CardShell>
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
