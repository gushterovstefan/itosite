import { motion } from 'framer-motion'
import Reveal from './Reveal.jsx'

export default function Section({ eyebrow, title, lead, children, tight = false }) {
  return (
    <section className={tight ? 'py-8 md:py-10' : 'py-16 md:py-24'}>
      <div className="mx-auto max-w-6xl px-4">
        {eyebrow ? (
          <Reveal>
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-200/80"
            >
              {eyebrow}
            </motion.div>
          </Reveal>
        ) : null}
        {title ? (
          <Reveal delay={0.04}>
            <h2 className="mt-3 h2">{title}</h2>
          </Reveal>
        ) : null}

        {/* animated divider */}
        {(eyebrow || title) ? <div className="mt-5 section-divider" aria-hidden="true" /> : null}

        {lead ? (
          <Reveal delay={0.08}>
            <p className="mt-4 max-w-3xl prose-lead">{lead}</p>
          </Reveal>
        ) : null}
        {children ? <div className="mt-10">{children}</div> : null}
      </div>
    </section>
  )
}
