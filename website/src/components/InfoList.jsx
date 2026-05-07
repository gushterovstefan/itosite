export default function InfoList({ items }) {
  return (
    <div className="mt-4 space-y-3">
      {items.map((it) => (
        <div key={it.title} className="rounded-xl border border-white/[0.12] bg-[#101E2F] p-4">
          <div className="text-sm font-semibold">{it.title}</div>
          <div className="mt-1 text-sm text-[#CBD5E1]">{it.description}</div>
        </div>
      ))}
    </div>
  )
}
