import { useNavigate } from 'react-router-dom'
import Reveal from './Reveal.jsx'

const variants = {
  default: {
    card: 'border-white/10 bg-[#101E33]',
    top: 'from-white/5 via-transparent to-transparent'
  },
  brand: {
    card: 'border-white/10 bg-[#101E33]',
    top: 'from-[#2563EB]/16 via-transparent to-transparent'
  },
  violet: {
    card: 'border-white/10 bg-[#101E33]',
    top: 'from-[#38BDF8]/12 via-transparent to-transparent'
  },
  steel: {
    card: 'border-white/10 bg-[#101E33]',
    top: 'from-[#0B1728] via-transparent to-transparent'
  },
  amber: {
    card: 'border-white/10 bg-[#101E33]',
    top: 'from-[#22C55E]/10 via-transparent to-transparent'
  }
}

function CardShell({ children, className = '', underlay = null, variant = 'default', badge = null }) {
  const v = variants[variant] ?? variants.default

  return (
    <>
      <div aria-hidden="true" className={'pointer-events-none absolute inset-0 bg-gradient-to-b opacity-100 ' + v.top} />
      {underlay ? <div className="absolute inset-0 z-[1]">{underlay}</div> : null}

      {badge ? (
        <div className="absolute left-4 top-4 z-20">
          <span className="inline-flex max-w-[15rem] items-center truncate rounded-full border border-white/10 bg-[#0B1728] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#CBD5E1]">
            {badge}
          </span>
        </div>
      ) : null}

      <div className={'relative z-10 ' + (badge ? 'pt-8 ' : '') + className}>{children}</div>
    </>
  )
}

export function Card({ children, className = '', revealDelay = 0, underlay = null, variant = 'default', badge = null }) {
  const v = variants[variant] ?? variants.default

  return (
    <Reveal delay={revealDelay}>
      <div
        className={'group relative overflow-hidden rounded-2xl border p-5 shadow-[0_18px_55px_-42px_rgba(0,0,0,0.9)] transition-transform duration-150 ease-out hover:-translate-y-0.5 motion-reduce:transform-none motion-reduce:transition-none md:p-6 ' + v.card + ' ' + className}
      >
        <CardShell underlay={underlay} variant={variant} badge={badge}>{children}</CardShell>
      </div>
    </Reveal>
  )
}

export function ClickCard({ to, children, className = '', revealDelay = 0, underlay = null, variant = 'default', badge = null }) {
  const nav = useNavigate()
  const v = variants[variant] ?? variants.default

  return (
    <Reveal delay={revealDelay}>
      <button
        type="button"
        onClick={() => nav(to)}
        className={'group relative w-full overflow-hidden rounded-2xl border p-5 text-left shadow-[0_18px_55px_-42px_rgba(0,0,0,0.9)] transition-transform duration-150 ease-out hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus:ring-2 focus:ring-[#38BDF8]/60 motion-reduce:transform-none motion-reduce:transition-none md:p-6 ' + v.card + ' ' + className}
      >
        <CardShell underlay={underlay} variant={variant} badge={badge}>{children}</CardShell>
      </button>
    </Reveal>
  )
}

export function BulletList({ items }) {
  return (
    <ul className="space-y-2 text-sm leading-relaxed text-[#CBD5E1]">
      {items.map((b) => (
        <li key={b} className="flex gap-2.5">
          <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-[#22C55E]" />
          <span>{b}</span>
        </li>
      ))}
    </ul>
  )
}
