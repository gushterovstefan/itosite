import Reveal from './Reveal.jsx'

export default function GemSection({ eyebrow, title, lead, children }) {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4">
        {eyebrow ? (
          <Reveal>
            <div className="text-xs font-semibold uppercase tracking-[0.28em] text-brand-200/80">
              {eyebrow}
            </div>
          </Reveal>
        ) : null}
        {title ? (
          <Reveal delay={0.05}>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-5xl">{title}</h2>
          </Reveal>
        ) : null}
        {lead ? (
          <Reveal delay={0.1}>
            <p className="mt-4 max-w-3xl text-base text-white/70 md:text-lg">{lead}</p>
          </Reveal>
        ) : null}
        {children ? <div className="mt-12">{children}</div> : null}
      </div>
    </section>
  )
}
