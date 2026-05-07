import { motion, useMotionValue, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { Link } from 'react-router-dom'
import Section from '../components/Section.jsx'
import { Card, ClickCard, BulletList } from '../components/Cards.jsx'
import { Icon, icons } from '../components/Icons.jsx'
import Particles from '../components/Particles.jsx'
import Spotlight from '../components/Spotlight.jsx'
import SheenButton from '../components/SheenButton.jsx'
import LogoCoin from '../components/LogoCoin.jsx'
import { lazy, Suspense, useEffect, useState } from 'react'

const HeroWebGL = lazy(() => import('../components/HeroWebGL.jsx'))
import { useContent } from '../content/index.jsx'
import logo from '../assets/logo.png'

const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0 }
}

export default function Home() {
  const { content } = useContent()
  const c = content.home
  const ui = content.shared.ui

  const reduce = useReducedMotion()
  const heroX = useMotionValue(0)
  const heroY = useMotionValue(0)

  const [showIntro, setShowIntro] = useState(false)

  useEffect(() => {
    if (reduce) return
    const t1 = setTimeout(() => setShowIntro(true), 900)
    const t2 = setTimeout(() => setShowIntro(false), 2600)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [reduce])

  const { scrollY } = useScroll()
  const watermarkY = useTransform(scrollY, [0, 600], [0, 40])
  const watermarkRotate = useTransform(scrollY, [0, 600], [0, -6])

  return (
    <div id="top" className="relative bg-[#07111F] text-[#FFFFFF]">
      {/* Intro logo pop (desktop only) */}
      {showIntro ? (
        <motion.div
          className="pointer-events-none fixed inset-0 z-[80] hidden place-items-center md:grid"
          initial={{ opacity: 0, scale: 0.9, filter: 'blur(6px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.img
            src={logo}
            alt=""
            aria-hidden="true"
            className="h-[16rem] w-[16rem] opacity-80"
            initial={{ y: 10 }}
            animate={{ y: 0 }}
            transition={{ type: 'spring', stiffness: 220, damping: 16 }}
          />
        </motion.div>
      ) : null}

      {/* Hero */}
      <section
        className="group/hero relative overflow-hidden"
        onPointerMove={(e) => {
          if (reduce) return
          const r = e.currentTarget.getBoundingClientRect()
          heroX.set(e.clientX - r.left)
          heroY.set(e.clientY - r.top)
        }}
      >
        <div className="pointer-events-none absolute inset-0">
          {/* animated gradient glow */}
          <div className="hero-float absolute -left-40 -top-40 h-96 w-96 rounded-full bg-[#2563EB]/14 blur-3xl" />
          <div className="hero-float absolute -bottom-56 right-0 h-[32rem] w-[32rem] rounded-full bg-[#38BDF8]/10 blur-3xl" />
          <div className="hero-float absolute inset-0 bg-[linear-gradient(180deg,#07111F_0%,#0B1726_100%)]" />
          <div className="absolute inset-0 z-[1] hidden opacity-80 md:block [mask-image:linear-gradient(to_bottom,black_0%,black_70%,transparent_100%)]">
            <Suspense fallback={null}>
              <HeroWebGL logoSrc={logo} showCoin={false} />
            </Suspense>
          </div>

          {/* subtle grid + noise */}
          <div className="absolute inset-0 hero-grid" />
          <div className="absolute inset-0 hero-noise" />

          {/* cursor spotlight */}
          <Spotlight />

          {/* floating particles */}
          <Particles />

          {/* big logo watermark */}
          <motion.img
            src={logo}
            alt=""
            aria-hidden="true"
            style={{ y: watermarkY, rotate: watermarkRotate }}
            className="absolute right-[-6rem] top-1/2 h-[28rem] w-[28rem] -translate-y-1/2 opacity-[0.10] blur-[0.2px] md:right-[-4rem] md:h-[40rem] md:w-[40rem]"
          />

          {/* hover brand mark in empty hero area */}
          {!reduce ? (
            <motion.div
              aria-hidden="true"
              className="absolute left-0 top-0 pointer-events-none"
              style={{ x: heroX, y: heroY }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
            >
              <div className="-translate-x-1/2 -translate-y-10 whitespace-nowrap opacity-0 transition-opacity duration-200 group-hover/hero:opacity-100">
                <span className="text-[15px] font-extrabold tracking-[0.28em] text-[#38BDF8] opacity-[0.22]">
                  IT
                </span>
                <span className="mx-3 text-[15px] font-extrabold tracking-[0.28em] text-white/20">
                  OUTSOURCE
                </span>
                <span className="text-[15px] font-extrabold tracking-[0.28em] text-[#38BDF8] opacity-[0.18]">
                  LTD
                </span>
              </div>
            </motion.div>
          ) : null}
        </div>

        <div className="relative z-10 mx-auto max-w-6xl px-4 pt-20 pb-6 md:pt-28 md:pb-8">
          {/* (moved) WebGL now runs as full-page background */}
          <motion.div
            initial="hidden"
            animate="show"
            transition={{ staggerChildren: 0.06 }}
            className="max-w-3xl"
          >
            <motion.div variants={fadeUp} className="inline-flex">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/[0.12] bg-[#101E31] px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-[#CBD5E1]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#38BDF8]" aria-hidden="true" />
                {ui.itServicesBadge}
              </span>
            </motion.div>

            <motion.h1 variants={fadeUp} className="mt-4 h1">
              {c.heroTitle}
            </motion.h1>
            <motion.p variants={fadeUp} className="mt-5 text-base font-medium text-white/85 md:text-lg">
              {c.heroSubline}
            </motion.p>
            <motion.p variants={fadeUp} className="mt-3 prose-lead">
              IT Outsource helps organizations reduce downtime, strengthen Microsoft 365 security, modernize legacy infrastructure,
              and improve backup and recovery readiness.
            </motion.p>

            <motion.div variants={fadeUp} className="mt-8 flex flex-wrap gap-3">
              <SheenButton to="/contacts">{ui.contactUs}</SheenButton>
              <Link
                to="/solutions"
                className="rounded-full border border-white/15 bg-[#101E31] px-6 py-3 text-sm font-semibold text-[#FFFFFF] hover:bg-[#0B1726]"
              >
                <span>{ui.exploreSolutions}</span>
              </Link>
            </motion.div>
          </motion.div>

          {/* top highlights */}
          <div className="mt-6 grid gap-4 md:mt-8 md:grid-cols-3">
            {c.highlights.map((x, i) => (
              <ClickCard
                key={x.title}
                to={i === 0 ? '/it-support-services' : i === 1 ? '/solutions' : '/it-infrastructure-services'}
                variant={i === 0 ? 'brand' : i === 1 ? 'steel' : 'steel'}
                badge={i === 0 ? 'Managed support' : i === 1 ? 'Solutions' : 'Infrastructure'}
                className="p-5 overflow-visible"
                revealDelay={0.06 + i * 0.06}
                underlay={
                  <div className="pointer-events-none absolute -inset-8 -z-10 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap">
                      <span className="text-[15px] font-extrabold tracking-[0.28em] text-[#38BDF8] opacity-[0.22]">
                        IT
                      </span>
                      <span className="mx-3 text-[15px] font-extrabold tracking-[0.28em] text-white/20">
                        OUTSOURCE
                      </span>
                      <span className="text-[15px] font-extrabold tracking-[0.28em] text-[#38BDF8] opacity-[0.18]">
                        LTD
                      </span>
                    </div>
                  </div>
                }
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="text-sm font-semibold">{x.title}</div>
                  <Icon as={icons[x.icon] ?? icons.tools} />
                </div>
                <div className="mt-2 text-sm text-white/75">{x.description}</div>
              </ClickCard>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <Section eyebrow={ui.servicesEyebrow} title={ui.servicesTitle} lead={ui.servicesLead} tight>
        <div className="grid gap-4 md:grid-cols-3">
          <ClickCard to="/it-support-services" revealDelay={0.04} variant="brand" badge="24/7">
            <div className="flex items-start justify-between gap-4">
              <div className="text-sm font-semibold">{c.services.support.title}</div>
              <Icon as={icons.support} />
            </div>
            <div className="mt-4">
              <BulletList items={c.services.support.items} />
            </div>
            <div className="mt-5">
              <span className="text-sm text-[#38BDF8] group-hover:text-[#CBD5E1]">
                {ui.support} →
              </span>
            </div>
          </ClickCard>

          <ClickCard to="/it-infrastructure-services" revealDelay={0.10} variant="steel" badge="Platforms">
            <div className="flex items-start justify-between gap-4">
              <div className="text-sm font-semibold">{c.services.infrastructure.title}</div>
              <Icon as={icons.infrastructure} />
            </div>
            <div className="mt-4">
              <BulletList items={c.services.infrastructure.items} />
            </div>
            <div className="mt-5">
              <span className="text-sm text-[#38BDF8] group-hover:text-[#CBD5E1]">
                {ui.infrastructure} →
              </span>
            </div>
          </ClickCard>

          <ClickCard to="/it-consulting-services" revealDelay={0.16} variant="steel" badge="Strategy">
            <div className="flex items-start justify-between gap-4">
              <div className="text-sm font-semibold">{c.services.consulting.title}</div>
              <Icon as={icons.consulting} />
            </div>
            <div className="mt-4">
              <BulletList items={c.services.consulting.items} />
            </div>
            <div className="mt-5">
              <span className="text-sm text-[#38BDF8] group-hover:text-[#CBD5E1]">
                {ui.consulting} →
              </span>
            </div>
          </ClickCard>

          <Card revealDelay={0.22} className="md:col-span-3" variant="amber" badge="Trust & compliance">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-sm font-semibold">{c.services.trust.title}</div>
                <div className="mt-2 text-sm text-white/78">{c.services.trust.description}</div>
              </div>
              <span className="grid h-10 w-10 place-items-center rounded-2xl border border-white/[0.12] bg-[#101E31]">
                <Icon as={icons.security} className="h-6 w-6 text-[#CBD5E1]" />
              </span>
            </div>
          </Card>
        </div>
      </Section>

      {/* Why */}
      <Section eyebrow={ui.whyEyebrow} title={c.why.title} lead="" tight>
        <div className="grid gap-4 md:grid-cols-2">
          {c.why.blocks.map((b, i) => (
            <Card key={b.h} revealDelay={0.04 + i * 0.04}>
              <div className="flex items-start justify-between gap-4">
                <div className="text-sm font-semibold">{b.h}</div>
                <Icon as={icons[b.icon] ?? icons.tools} />
              </div>
              <div className="mt-2 text-sm text-white/78">{b.p}</div>
            </Card>
          ))}
        </div>
      </Section>

      {/* Benefits */}
      <Section eyebrow={ui.benefitsEyebrow} title={c.benefits.title} lead={null} tight>
        <div className="grid gap-4 md:grid-cols-2">
          <Card revealDelay={0.04}>
            <div className="flex items-start justify-between gap-4">
              <div className="text-sm font-semibold">{c.benefits.title}</div>
              <Icon as={icons[c.benefits.icon] ?? icons.target} />
            </div>
            <div className="mt-4">
              <BulletList items={c.benefits.items} />
            </div>
          </Card>
          <Card revealDelay={0.10}>
            <div className="flex items-start justify-between gap-4">
              <div className="text-sm font-semibold">{c.clientBenefits.title}</div>
              <Icon as={icons[c.clientBenefits.icon] ?? icons.security} />
            </div>
            <div className="mt-4">
              <BulletList items={c.clientBenefits.items} />
            </div>
          </Card>
        </div>
      </Section>

      {/* CTA */}
      <section className="border-t border-white/[0.12] py-14">
        <div className="mx-auto max-w-6xl px-4">
          <div className="rounded-3xl border border-white/[0.12] bg-[#101E31] p-8 md:p-12">
            <div className="text-xl font-semibold md:text-2xl">Ready to reduce IT risk?</div>
            <div className="mt-2 max-w-2xl text-sm text-white/78 md:text-base">
              We can assess your Microsoft 365, endpoint, infrastructure, and backup environment, then define the practical next step.
            </div>
            <div className="mt-6">
              <SheenButton to="/contacts" className="px-5 py-2.5 text-sm font-medium">
                {ui.talkToUs}
              </SheenButton>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
