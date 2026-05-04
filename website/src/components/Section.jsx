export default function Section({ eyebrow, title, lead, children, tight = false, bg = true, className = '' }) {
  return (
    <section
      className={
        (tight ? 'py-8 md:py-10' : 'py-10 md:py-14') +
        (bg ? ' section-bg' : '') +
        (className ? ` ${className}` : '')
      }
    >
      <div className="mx-auto max-w-6xl px-4">
        {eyebrow ? (
          <div className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-200/80">
            {eyebrow}
          </div>
        ) : null}

        {title ? <h2 className="mt-3 h2">{title}</h2> : null}

        {(eyebrow || title) ? <div className="mt-4 section-divider" aria-hidden="true" /> : null}

        {lead ? <p className="mt-4 max-w-3xl prose-lead">{lead}</p> : null}

        {children ? <div className="mt-8">{children}</div> : null}
      </div>
    </section>
  )
}
