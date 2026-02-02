import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="border-t border-white/10">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="text-sm font-semibold">IT Outsource Ltd.</div>
            <div className="mt-1 text-sm text-white/60">
              IT services & solutions designed to correspond to your business needs.
            </div>
          </div>

          <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm">
            <Link className="text-white/60 hover:text-white" to="/it-support-services">
              Support
            </Link>
            <Link className="text-white/60 hover:text-white" to="/it-infrastructure-services">
              Infrastructure
            </Link>
            <Link className="text-white/60 hover:text-white" to="/solutions">
              Solutions
            </Link>
            <Link className="text-white/60 hover:text-white" to="/contacts">
              Contact
            </Link>
          </div>
        </div>

        <div className="mt-8 text-xs text-white/40">
          © {new Date().getFullYear()} IT Outsource Ltd. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
