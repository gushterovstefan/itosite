import Reveal from './Reveal.jsx'

export default function Section({ eyebrow, title, lead, children }) {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4">
        {eyebrow ? (
          <Reveal>
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-200/80">
              {eyebrow}
            </div>
          </Reveal>
        ) : null}
        {title ? (
          <Reveal delay={0.04}>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight md:text-4xl">
              {title}
            </h2>
          </Reveal>
        ) : null}
        {lead ? (
          <Reveal delay={0.08}>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-white/70 md:text-lg">
              {lead}
            </p>
          </Reveal>
        ) : null}
        {children ? <div className="mt-10">{children}</div> : null}
      </div>
    </section>
  )
}
