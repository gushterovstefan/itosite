import Reveal from './Reveal.jsx'

export default function Section({ eyebrow, title, lead, children, tight = false }) {
  return (
    <section className={tight ? 'py-10 md:py-14' : 'py-16 md:py-24'}>
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
            <h2 className="mt-3 h2">
              {title}
            </h2>
          </Reveal>
        ) : null}
        {lead ? (
          <Reveal delay={0.08}>
            <p className="mt-4 max-w-3xl prose-lead">
              {lead}
            </p>
          </Reveal>
        ) : null}
        {children ? <div className="mt-10">{children}</div> : null}
      </div>
    </section>
  )
}
