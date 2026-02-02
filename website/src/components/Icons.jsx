import {
  Headset,
  Globe,
  Server,
  Shield,
  Cloud,
  LayoutGrid,
  Network,
  Search,
  Wrench
} from 'lucide-react'

/**
 * Minimal, consistent icon wrapper.
 */
export function Icon({ as: As, className = '' }) {
  return (
    <As
      aria-hidden="true"
      className={
        'h-5 w-5 text-brand-200/90 drop-shadow-[0_0_18px_rgba(116,173,60,0.10)] ' +
        className
      }
      strokeWidth={1.8}
    />
  )
}

export const icons = {
  support: Headset,
  web: LayoutGrid,
  server: Server,
  infrastructure: Network,
  security: Shield,
  cloud: Cloud,
  consulting: Search,
  tools: Wrench,
  globe: Globe
}
