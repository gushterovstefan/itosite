import Reveal from './Reveal.jsx'

export default function GemSection({ eyebrow, title, lead, children }) {
  return (
    <section className="bg-[#07111F] pb-8 pt-6 text-[#FFFFFF] md:pb-10 md:pt-6">
      <div className="mx-auto max-w-6xl px-4">
        {eyebrow ? (
          <Reveal>
            <div className="text-xs font-semibold uppercase tracking-[0.24em] text-[#38BDF8]">
              {eyebrow}
            </div>
          </Reveal>
        ) : null}
        {title ? (
          <Reveal delay={0.05}>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-[#FFFFFF] md:text-5xl">{title}</h2>
          </Reveal>
        ) : null}
        {lead ? (
          <Reveal delay={0.1}>
            <p className="mt-2 max-w-3xl text-base leading-relaxed text-[#CBD5E1] md:text-lg">{lead}</p>
          </Reveal>
        ) : null}
        {children ? <div className="mt-5">{children}</div> : null}
      </div>
    </section>
  )
}
