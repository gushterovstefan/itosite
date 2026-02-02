export default function Section({ eyebrow, title, lead, children }) {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4">
        {eyebrow ? (
          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-200/80">
            {eyebrow}
          </div>
        ) : null}
        {title ? (
          <h2 className="mt-3 text-2xl font-semibold tracking-tight md:text-4xl">
            {title}
          </h2>
        ) : null}
        {lead ? (
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-white/70 md:text-lg">
            {lead}
          </p>
        ) : null}
        {children ? <div className="mt-10">{children}</div> : null}
      </div>
    </section>
  )
}
