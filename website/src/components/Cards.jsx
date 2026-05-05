import { motion, useAnimation, useReducedMotion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import Reveal from './Reveal.jsx'
import { useContent } from '../content/index.jsx'

const variants = {
  default: {
    card: 'border-slate-200 bg-white',
    top: 'from-slate-50 via-white to-transparent'
  },
  brand: {
    card: 'border-cyan-200/70 bg-cyan-50/80',
    top: 'from-cyan-100/65 via-white/50 to-transparent'
  },
  violet: {
    card: 'border-blue-200/70 bg-blue-50/80',
    top: 'from-blue-100/60 via-white/50 to-transparent'
  },
  steel: {
    card: 'border-slate-200 bg-slate-50/90',
    top: 'from-white via-slate-50/80 to-transparent'
  },
  amber: {
    card: 'border-amber-200/80 bg-amber-50/80',
    top: 'from-amber-100/55 via-white/50 to-transparent'
  }
}

function CardShell({ children, className = '', underlay = null, variant = 'default', badge = null }) {
  const v = variants[variant] ?? variants.default

  return (
    <>
      <div aria-hidden="true" className={'pointer-events-none absolute inset-0 bg-gradient-to-b opacity-70 ' + v.top} />
      {underlay ? <div className="absolute inset-0 z-[1]">{underlay}</div> : null}

      {badge ? (
        <div className="absolute left-4 top-4 z-20">
          <span className="inline-flex max-w-[15rem] items-center truncate rounded-full border border-slate-200 bg-white px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-700">
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
        whileHover={{ y: -2 }}
        transition={{ type: 'spring', stiffness: 260, damping: 24 }}
        className={
          'group relative overflow-hidden rounded-2xl border p-5 shadow-[0_14px_45px_-38px_rgba(15,23,42,0.6)] transition-shadow hover:shadow-[0_18px_55px_-40px_rgba(15,23,42,0.65)] md:p-6 ' +
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
  const { localizedPath } = useContent()
  const reduce = useReducedMotion()
  const controls = useAnimation()

  const go = async () => {
    if (!reduce) {
      await controls.start({ y: -2, transition: { duration: 0.08, ease: 'easeOut' } })
    }
    nav(localizedPath(to))
  }

  const v = variants[variant] ?? variants.default

  return (
    <Reveal delay={revealDelay}>
      <motion.button
        type="button"
        onClick={go}
        animate={controls}
        whileHover={reduce ? undefined : { y: -2 }}
        whileTap={reduce ? undefined : { scale: 0.99 }}
        transition={{ type: 'spring', stiffness: 260, damping: 24 }}
        className={
          'group relative w-full overflow-hidden rounded-2xl border p-5 text-left shadow-[0_14px_45px_-38px_rgba(15,23,42,0.6)] transition-shadow hover:shadow-[0_18px_55px_-40px_rgba(15,23,42,0.65)] focus:outline-none focus:ring-2 focus:ring-brand-500/60 md:p-6 ' +
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
    <ul className="space-y-2 text-sm leading-relaxed text-slate-700">
      {items.map((b, i) => (
        <motion.li
          key={b}
          className="flex gap-2.5"
          initial={false}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.25, ease: 'easeOut', delay: i * 0.03 }}
        >
          <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-brand-500" />
          <span>{b}</span>
        </motion.li>
      ))}
    </ul>
  )
}
