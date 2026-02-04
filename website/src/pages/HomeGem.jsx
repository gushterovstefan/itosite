import { lazy, Suspense } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import GemSection from '../components/GemSection.jsx'
import { ClickCard } from '../components/Cards.jsx'
import { Icon, icons } from '../components/Icons.jsx'
import SheenButton from '../components/SheenButton.jsx'
import { useContent } from '../content/index.jsx'
import logo from '../assets/logo.png'

const HeroWebGL = lazy(() => import('../components/HeroWebGL.jsx'))

export default function HomeGem() {
  const { content } = useContent()
  const c = content.home
  const ui = content.shared.ui

  return (
    <div id="top" className="relative">
      {/* full-page WebGL background (desktop only) */}
      <div className="pointer-events-none absolute inset-0 -z-10 hidden md:block">
        <Suspense fallback={null}>
          <HeroWebGL logoSrc={logo} showCoin={false} />
        </Suspense>
      </div>

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-6xl px-4 pt-16 md:pt-20">
          <div className="grid items-center gap-10 md:grid-cols-2">
            <div>
              <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-white/75">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-400" aria-hidden="true" />
                {ui.itServicesBadge}
              </div>

              <h1 className="mt-5 text-4xl font-semibold tracking-tight md:text-6xl">{c.heroTitle}</h1>
              <p className="mt-5 text-base font-medium text-white/85 md:text-lg">{c.heroSubline}</p>
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/65 md:text-base">
                IT Outsource is a fast growing IT company with more than 10 years of experience designing,
                implementing, integrating and supporting different IT solutions.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <SheenButton to="/contacts">{ui.contactUs}</SheenButton>
                <Link
                  to="/solutions"
                  className="rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white/90 hover:bg-white/10"
                >
                  <span>{ui.exploreSolutions}</span>
                </Link>
              </div>
            </div>

            {/* hero side: logo + metric-like cards (inspired, not a clone) */}
            <div className="relative">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="rounded-3xl border border-white/10 bg-white/5 p-8"
              >
                <div className="flex items-center justify-between gap-6">
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-[0.28em] text-white/55">Enterprise delivery</div>
                    <div className="mt-3 text-4xl font-semibold tracking-tight text-white">10+ years</div>
                    <div className="mt-2 text-sm text-white/65">Design · Build · Secure · Run</div>
                  </div>
                  <img src={logo} alt="" aria-hidden="true" className="h-20 w-20 opacity-80" />
                </div>

                <div className="mt-7 grid gap-3 sm:grid-cols-3">
                  <div className="rounded-2xl border border-white/10 bg-ink-950/50 px-4 py-3">
                    <div className="text-xs text-white/55">Availability</div>
                    <div className="mt-1 text-sm font-semibold">24/7 Ops</div>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-ink-950/50 px-4 py-3">
                    <div className="text-xs text-white/55">Security</div>
                    <div className="mt-1 text-sm font-semibold">MFA + Hardening</div>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-ink-950/50 px-4 py-3">
                    <div className="text-xs text-white/55">Delivery</div>
                    <div className="mt-1 text-sm font-semibold">SLA-driven</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* SERVICE ENTRY CARDS */}
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {c.highlights.map((x, i) => (
              <ClickCard
                key={x.title}
                to={i === 0 ? '/it-support-services' : i === 1 ? '/solutions' : '/it-infrastructure-services'}
                variant={i === 0 ? 'brand' : i === 1 ? 'violet' : 'steel'}
                badge={i === 0 ? 'Support' : i === 1 ? 'Solutions' : 'Infrastructure'}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="text-sm font-semibold">{x.title}</div>
                  <Icon as={icons[x.icon] ?? icons.tools} />
                </div>
                <div className="mt-3 text-sm text-white/70">{x.description}</div>
              </ClickCard>
            ))}
          </div>
        </div>
      </section>

      {/* Sections reusing only our text */}
      <GemSection eyebrow={ui.servicesEyebrow} title={ui.servicesTitle} lead={ui.servicesLead}>
        <div className="grid gap-4 md:grid-cols-3">
          <ClickCard to="/it-support-services" variant="brand" badge="Managed support">
            <div className="flex items-start justify-between gap-4">
              <div className="text-sm font-semibold">{c.services.support.title}</div>
              <Icon as={icons.support} />
            </div>
            <div className="mt-3 text-sm text-white/70">{c.services.support.items[0]}</div>
          </ClickCard>

          <ClickCard to="/it-infrastructure-services" variant="steel" badge="Platforms">
            <div className="flex items-start justify-between gap-4">
              <div className="text-sm font-semibold">{c.services.infrastructure.title}</div>
              <Icon as={icons.infrastructure} />
            </div>
            <div className="mt-3 text-sm text-white/70">{c.services.infrastructure.items[0]}</div>
          </ClickCard>

          <ClickCard to="/it-consulting-services" variant="violet" badge="Strategy">
            <div className="flex items-start justify-between gap-4">
              <div className="text-sm font-semibold">{c.services.consulting.title}</div>
              <Icon as={icons.consulting} />
            </div>
            <div className="mt-3 text-sm text-white/70">{c.services.consulting.items[0]}</div>
          </ClickCard>
        </div>
      </GemSection>
    </div>
  )
}
