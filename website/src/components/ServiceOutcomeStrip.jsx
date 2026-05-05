import { Card } from './Cards.jsx'

export default function ServiceOutcomeStrip({ items }) {
  return (
    <section className="py-8 md:py-10">
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid gap-4 md:grid-cols-4">
          {items.map((item, index) => (
            <Card key={item.label} revealDelay={0.04 + index * 0.04} variant={index === 0 ? 'brand' : index === 1 ? 'steel' : 'default'}>
              <div className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-700">{item.label}</div>
              <h2 className="mt-3 text-lg font-semibold tracking-tight text-ink-950">{item.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-ink-900/70">{item.body}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
