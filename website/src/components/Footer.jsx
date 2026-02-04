import { Link } from 'react-router-dom'
import { useContent } from '../content/index.jsx'

export default function Footer() {
  const { content } = useContent()
  const ui = content.shared.ui

  return (
    <footer className="border-t border-black/10">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="text-sm font-semibold">IT Outsource Ltd.</div>
            <div className="mt-1 max-w-xl text-sm text-ink-900/60">{content.shared.tagline}</div>
          </div>

          <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm">
            <Link className="text-ink-900/60 hover:text-ink-950" to="/it-support-services">
              {ui.support}
            </Link>
            <Link className="text-ink-900/60 hover:text-ink-950" to="/it-infrastructure-services">
              {ui.infrastructure}
            </Link>
            <Link className="text-ink-900/60 hover:text-ink-950" to="/solutions">
              {ui.solutions}
            </Link>
            <Link className="text-ink-900/60 hover:text-ink-950" to="/contacts">
              {ui.contact}
            </Link>
          </div>
        </div>

        <div className="mt-8 text-xs text-ink-900/40">
          © {new Date().getFullYear()} IT Outsource Ltd.
        </div>
      </div>
    </footer>
  )
}
