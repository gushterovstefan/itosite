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
    <div id="top" className="relative">
      {/* Home background WebGL (desktop only) */}
      <div className="pointer-events-none absolute inset-0 -z-10 hidden md:block">
        <Suspense fallback={null}>
          <HeroWebGL logoSrc={logo} />
        </Suspense>
      </div>

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
          <div className="hero-float absolute -left-40 -top-40 h-96 w-96 rounded-full bg-brand-500/22 blur-3xl" />
          <div className="hero-float absolute -bottom-56 right-0 h-[32rem] w-[32rem] rounded-full bg-fuchsia-500/18 blur-3xl" />
          <div className="hero-float absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(116,173,60,0.16),transparent_45%),radial-gradient(circle_at_80%_60%,rgba(217,70,239,0.10),transparent_52%)]" />

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
                <span className="bg-gradient-to-r from-fuchsia-400 via-violet-400 to-fuchsia-300 bg-clip-text text-[15px] font-extrabold tracking-[0.28em] text-transparent opacity-[0.22]">
                  IT
                </span>
                <span className="mx-3 text-[15px] font-extrabold tracking-[0.28em] text-white/20">
                  OUTSOURCE
                </span>
                <span className="bg-gradient-to-r from-fuchsia-400 via-violet-400 to-fuchsia-300 bg-clip-text text-[15px] font-extrabold tracking-[0.28em] text-transparent opacity-[0.18]">
                  LTD
                </span>
              </div>
            </motion.div>
          ) : null}
        </div>

        <div className="mx-auto max-w-6xl px-4 pt-20 pb-6 md:pt-28 md:pb-8">
          {/* (moved) WebGL now runs as full-page background */}
          <motion.div
            initial="hidden"
            animate="show"
            transition={{ staggerChildren: 0.06 }}
            className="max-w-3xl"
          >
            <motion.div variants={fadeUp} className="inline-flex">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-brand-200/90">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-400" aria-hidden="true" />
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
              IT Outsource is a fast growing IT company with more than 10 years of experience designing,
              implementing, integrating and supporting different IT solutions.
            </motion.p>

            <motion.div variants={fadeUp} className="mt-8 flex flex-wrap gap-3">
              <SheenButton to="/contacts">{ui.contactUs}</SheenButton>
              <Link
                to="/solutions"
                className="rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white/90 hover:bg-white/10"
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
                className="p-5 overflow-visible"
                revealDelay={0.06 + i * 0.06}
                underlay={
                  <div className="pointer-events-none absolute -inset-8 -z-10 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap">
                      <span className="bg-gradient-to-r from-fuchsia-400 via-violet-400 to-fuchsia-300 bg-clip-text text-[15px] font-extrabold tracking-[0.28em] text-transparent opacity-[0.22]">
                        IT
                      </span>
                      <span className="mx-3 text-[15px] font-extrabold tracking-[0.28em] text-white/20">
                        OUTSOURCE
                      </span>
                      <span className="bg-gradient-to-r from-fuchsia-400 via-violet-400 to-fuchsia-300 bg-clip-text text-[15px] font-extrabold tracking-[0.28em] text-transparent opacity-[0.18]">
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
                <div className="mt-2 text-sm text-white/65">{x.description}</div>
              </ClickCard>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <Section eyebrow={ui.servicesEyebrow} title={ui.servicesTitle} lead={ui.servicesLead} tight>
        <div className="grid gap-4 md:grid-cols-3">
          <ClickCard to="/it-support-services" revealDelay={0.04}>
            <div className="flex items-start justify-between gap-4">
              <div className="text-sm font-semibold">{c.services.support.title}</div>
              <Icon as={icons.support} />
            </div>
            <div className="mt-4">
              <BulletList items={c.services.support.items} />
            </div>
            <div className="mt-5">
              <span className="text-sm text-brand-200 group-hover:text-brand-100">
                {ui.support} →
              </span>
            </div>
          </ClickCard>

          <ClickCard to="/it-infrastructure-services" revealDelay={0.10}>
            <div className="flex items-start justify-between gap-4">
              <div className="text-sm font-semibold">{c.services.infrastructure.title}</div>
              <Icon as={icons.infrastructure} />
            </div>
            <div className="mt-4">
              <BulletList items={c.services.infrastructure.items} />
            </div>
            <div className="mt-5">
              <span className="text-sm text-brand-200 group-hover:text-brand-100">
                {ui.infrastructure} →
              </span>
            </div>
          </ClickCard>

          <ClickCard to="/it-consulting-services" revealDelay={0.16}>
            <div className="flex items-start justify-between gap-4">
              <div className="text-sm font-semibold">{c.services.consulting.title}</div>
              <Icon as={icons.consulting} />
            </div>
            <div className="mt-4">
              <BulletList items={c.services.consulting.items} />
            </div>
            <div className="mt-5">
              <span className="text-sm text-brand-200 group-hover:text-brand-100">
                {ui.consulting} →
              </span>
            </div>
          </ClickCard>

          <Card revealDelay={0.22} className="md:col-span-3">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-sm font-semibold">{c.services.trust.title}</div>
                <div className="mt-2 text-sm text-white/70">{c.services.trust.description}</div>
              </div>
              <span className="grid h-10 w-10 place-items-center rounded-2xl border border-white/10 bg-white/5">
                <Icon as={icons.security} className="h-6 w-6 text-brand-100" />
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
              <div className="mt-2 text-sm text-white/70">{b.p}</div>
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
      <section className="border-t border-white/10 py-14">
        <div className="mx-auto max-w-6xl px-4">
          <div className="rounded-3xl border border-white/10 bg-gradient-to-r from-brand-500/14 via-white/5 to-fuchsia-500/10 p-8 md:p-12">
            <div className="text-xl font-semibold md:text-2xl">Ready to modernize your IT?</div>
            <div className="mt-2 max-w-2xl text-sm text-white/70 md:text-base">
              Your IT needs are placed in the hands of multifunctional and certified experts that use
              their skills and experience to develop specific solutions that match your requirements.
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
