import {
  Headset,
  LayoutGrid,
  Server,
  Shield,
  Cloud,
  Network,
  Search,
  Wrench,
  Phone,
  Mail,
  MessageSquare,
  Target,
  Eye,
  Quote,
  Database,
  Layers,
  HardDriveDownload,
  LifeBuoy,
  Boxes
} from 'lucide-react'

/**
 * Minimal, consistent icon wrapper.
 */
export function Icon({ as: As, className = '' }) {
  return (
    <As
      aria-hidden="true"
      className={
        'h-5 w-5 text-[#38BDF8] transition-transform duration-300 ease-out group-hover:rotate-[-4deg] group-hover:scale-[1.04] ' +
        className
      }
      strokeWidth={1.8}
    />
  )
}

export const icons = {
  // homepage highlights
  support: Headset,
  web: LayoutGrid,
  server: Server,

  // service areas
  infrastructure: Network,
  security: Shield,
  cloud: Cloud,
  consulting: Search,
  tools: Wrench,

  // contact
  phone: Phone,
  mail: Mail,
  message: MessageSquare,

  // about
  mission: Target,
  vision: Eye,
  testimonial: Quote,

  // misc
  target: Target,

  // infra sections
  assessment: Database,
  virtualization: Layers,
  backup: HardDriveDownload,

  // support page
  sla: LifeBuoy,
  governance: Shield,

  // solutions
  platform: Boxes
}
