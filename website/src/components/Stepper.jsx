import { Icon, icons } from './Icons.jsx'

export default function Stepper({ steps }) {
  return (
    <ol className="grid gap-4 md:grid-cols-4">
      {steps.map((s, idx) => (
        <li key={s.title} className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="grid h-9 w-9 place-items-center rounded-2xl border border-white/10 bg-ink-950/50 text-sm font-semibold text-white/80">
                {String(idx + 1).padStart(2, '0')}
              </div>
              <div className="text-sm font-semibold">{s.title}</div>
            </div>
            <Icon as={icons[s.icon] ?? icons.tools} />
          </div>
          {s.body ? <p className="mt-3 text-sm text-white/65">{s.body}</p> : null}
        </li>
      ))}
    </ol>
  )
}
