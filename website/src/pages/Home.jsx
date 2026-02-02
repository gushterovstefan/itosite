import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Section from '../components/Section.jsx'
import { Card, BulletList } from '../components/Cards.jsx'
import { contentEN } from '../content/en.js'
import logo from '../assets/logo.png'

const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0 }
}

export default function Home() {
  const c = contentEN.home

  return (
    <div id="top">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-brand-500/18 blur-3xl" />
          <div className="absolute -bottom-56 right-0 h-[32rem] w-[32rem] rounded-full bg-fuchsia-500/15 blur-3xl" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(116,173,60,0.14),transparent_45%),radial-gradient(circle_at_80%_60%,rgba(217,70,239,0.08),transparent_50%)]" />

          {/* big logo watermark */}
          <img
            src={logo}
            alt=""
            aria-hidden="true"
            className="absolute right-[-6rem] top-1/2 h-[28rem] w-[28rem] -translate-y-1/2 opacity-[0.09] blur-[0.2px] md:right-[-4rem] md:h-[40rem] md:w-[40rem]"
          />
        </div>

        <div className="mx-auto max-w-6xl px-4 py-20 md:py-28">
          <motion.div
            initial="hidden"
            animate="show"
            transition={{ staggerChildren: 0.06 }}
            className="max-w-3xl"
          >
            <motion.div variants={fadeUp} className="text-sm text-brand-200/80">
              IT services & solutions
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="mt-4 text-4xl font-semibold tracking-tight md:text-6xl"
            >
              {c.heroTitle}
            </motion.h1>
            <motion.p
              variants={fadeUp}
              className="mt-6 text-base leading-relaxed text-white/70 md:text-lg"
            >
              IT Outsource is a fast growing IT company with more than 10 years of experience designing,
              implementing, integrating and supporting different IT solutions.
            </motion.p>

            <motion.div variants={fadeUp} className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/contacts"
                className="rounded-full bg-brand-500 px-5 py-2.5 text-sm font-medium text-white shadow-lg shadow-brand-500/20 hover:bg-brand-400"
              >
                Contact us
              </Link>
              <Link
                to="/solutions"
                className="rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-medium text-white/90 hover:bg-white/10"
              >
                Explore solutions
              </Link>
            </motion.div>
          </motion.div>

          {/* top highlights */}
          <div className="mt-12 grid gap-4 md:mt-16 md:grid-cols-3">
            {[
              { t: 'IT Professional support', d: 'Timely response to any issue.' },
              { t: 'Web development', d: 'Web based B2B & B2C solutions and custom modules.' },
              { t: 'Server platforms', d: 'Design, deployment, and support for reliable infrastructure.' }
            ].map((x) => (
              <Card key={x.t} className="p-5">
                <div className="text-sm font-semibold">{x.t}</div>
                <div className="mt-2 text-sm text-white/65">{x.d}</div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <Section eyebrow={c.services.title} title="What we do" lead="Support, infrastructure and consulting tailored to your needs.">
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <div className="text-sm font-semibold">{c.services.support.title}</div>
            <div className="mt-4">
              <BulletList items={c.services.support.items} />
            </div>
            <div className="mt-5">
              <Link className="text-sm text-brand-200 hover:text-brand-100" to="/it-support-services">
                View support services →
              </Link>
            </div>
          </Card>
          <Card>
            <div className="text-sm font-semibold">{c.services.infrastructure.title}</div>
            <div className="mt-4">
              <BulletList items={c.services.infrastructure.items} />
            </div>
            <div className="mt-5">
              <Link className="text-sm text-brand-200 hover:text-brand-100" to="/it-infrastructure-services">
                View infrastructure →
              </Link>
            </div>
          </Card>
          <Card>
            <div className="text-sm font-semibold">{c.services.consulting.title}</div>
            <div className="mt-4">
              <BulletList items={c.services.consulting.items} />
            </div>
            <div className="mt-5">
              <Link className="text-sm text-brand-200 hover:text-brand-100" to="/it-consulting-services">
                View consulting →
              </Link>
            </div>
          </Card>
        </div>
      </Section>

      {/* Why */}
      <Section eyebrow="Why" title={c.why.title} lead="">
        <div className="grid gap-4 md:grid-cols-2">
          {c.why.blocks.map((b) => (
            <Card key={b.h}>
              <div className="text-sm font-semibold">{b.h}</div>
              <div className="mt-2 text-sm text-white/70">{b.p}</div>
            </Card>
          ))}
        </div>
      </Section>

      {/* Benefits */}
      <Section eyebrow="Benefits" title={c.benefits.title} lead={null}>
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <BulletList items={c.benefits.items} />
          </Card>
          <Card>
            <div className="text-sm font-semibold">{c.clientBenefits.title}</div>
            <div className="mt-4">
              <BulletList items={c.clientBenefits.items} />
            </div>
          </Card>
        </div>
      </Section>

      {/* CTA */}
      <section className="border-t border-white/10 py-14">
        <div className="mx-auto max-w-6xl px-4">
          <div className="rounded-3xl border border-white/10 bg-gradient-to-r from-indigo-500/15 via-white/5 to-fuchsia-500/10 p-8 md:p-12">
            <div className="text-xl font-semibold md:text-2xl">Ready to modernize your IT?</div>
            <div className="mt-2 max-w-2xl text-sm text-white/70 md:text-base">
              Your IT needs are placed in the hands of multifunctional and certified experts that use
              their skills and experience to develop specific solutions that match your requirements.
            </div>
            <div className="mt-6">
              <Link
                to="/contacts"
                className="inline-flex rounded-full bg-brand-500 px-5 py-2.5 text-sm font-medium text-white hover:bg-brand-400"
              >
                Talk to us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
