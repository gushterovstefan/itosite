import Reveal from './Reveal.jsx'

export default function GemSection({ eyebrow, title, lead, children, className = '' }) {
  return (
    <section className={'relative py-10 md:py-12 ' + className}>
      <div className="mx-auto max-w-6xl px-4">
        {eyebrow ? (
          <Reveal>
            <div className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-800">
              {eyebrow}
            </div>
          </Reveal>
        ) : null}
        {title ? (
          <Reveal delay={0.05}>
            <h2 className="mt-2 max-w-4xl text-3xl font-semibold tracking-tight text-ink-950 md:text-5xl">{title}</h2>
          </Reveal>
        ) : null}
        {lead ? (
          <Reveal delay={0.1}>
            <p className="mt-2 max-w-3xl text-base text-ink-900/70 md:text-lg">{lead}</p>
          </Reveal>
        ) : null}
        {children ? <div className="mt-5">{children}</div> : null}
      </div>
    </section>
  )
}
