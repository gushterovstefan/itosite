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
        'h-5 w-5 text-brand-200/90 drop-shadow-[0_0_18px_rgba(116,173,60,0.10)] ' +
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

  // infra sections
  assessment: Database,
  virtualization: Layers,
  backup: HardDriveDownload,

  // support page
  sla: LifeBuoy,

  // solutions
  platform: Boxes
}
