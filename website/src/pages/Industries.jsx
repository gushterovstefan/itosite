import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero.jsx'
import GemSection from '../components/GemSection.jsx'
import { ClickCard, Card, BulletList } from '../components/Cards.jsx'
import { Icon, icons } from '../components/Icons.jsx'
import ConversionCta from '../components/ConversionCta.jsx'
import TrustBlock from '../components/TrustBlock.jsx'
import { useContent } from '../content/index.jsx'
import { industries, industrySlugs } from '../content/industries.js'

const labels = {
  en: {
    open: 'Open industry',
    challenges: 'Typical IT challenges',
    services: 'Relevant IT Outsource services',
    outcomes: 'Business outcomes',
    caseStudy: 'Anonymized case pattern',
    all: 'All industries',
    assessment: 'Request assessment'
  },
  bg: {
    open: 'Отвори индустрия',
    challenges: 'Типични ИТ предизвикателства',
    services: 'Релевантни IT Outsource услуги',
    outcomes: 'Бизнес резултати',
    caseStudy: 'Анонимизиран case pattern',
    all: 'Всички индустрии',
    assessment: 'Заявете оценка'
  }
}

const serviceLinks = {
  'Managed IT Support': '/managed-it-support',
  'Azure Cloud': '/azure-cloud',
  'Backup & Disaster Recovery': '/backup-disaster-recovery',
  Cybersecurity: '/cybersecurity',
  'Microsoft 365': '/microsoft-365',
  'Google Workspace to Microsoft 365': '/google-workspace-to-microsoft-365'
}

export function IndustriesHub() {
  const { lang, content } = useContent()
  const data = industries[lang] || industries.en
  const l = labels[lang] || labels.en

  return (
    <div>
      <PageHero
        eyebrow={data.hub.eyebrow}
        title={data.hub.title}
        lead={data.hub.lead}
        subline={data.hub.subline}
        primaryCta={{ to: '/contacts', label: content.shared.ui.getQuote ?? content.shared.ui.contact }}
        secondaryCta={{ to: '/case-studies', label: lang === 'bg' ? 'Казуси' : 'Case studies' }}
        aside={{
          eyebrow: 'Industries',
          title: 'Retail · Pharma · Energy · SMB',
          lead: data.hub.subline,
          icon: 'platform',
          items: [
            { k: 'Cloud', v: 'Microsoft' },
            { k: 'Security', v: 'Zero Trust' },
            { k: 'Continuity', v: 'Backup + DR' }
          ]
        }}
      />

      <GemSection eyebrow={data.hub.eyebrow} title={data.hub.title} lead={data.hub.lead}>
        <div className="grid gap-4 lg:grid-cols-2">
          {industrySlugs.map((slug, i) => {
            const page = data.pages[slug]
            return (
              <ClickCard key={slug} to={`/industries/${slug}`} revealDelay={0.04 + i * 0.04} variant={i % 2 ? 'steel' : 'brand'} badge={page.eyebrow}>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-lg font-semibold tracking-tight text-ink-950">{page.title}</h2>
                    <p className="mt-3 text-sm leading-relaxed text-ink-900/68">{page.lead}</p>
                  </div>
                  <Icon as={icons[page.icon] ?? icons.platform} />
                </div>
                <div className="mt-5"><BulletList items={page.outcomes.slice(0, 2)} /></div>
                <div className="mt-5 text-xs font-semibold uppercase tracking-[0.22em] text-brand-800">{l.open}</div>
              </ClickCard>
            )
          })}
        </div>
      </GemSection>

      <TrustBlock />
      <ConversionCta />
    </div>
  )
}

export function IndustryDetail({ slug }) {
  const { lang, content, localizedPath } = useContent()
  const data = industries[lang] || industries.en
  const page = data.pages[slug] || industries.en.pages[slug]
  const l = labels[lang] || labels.en

  if (!page) return <IndustriesHub />

  return (
    <div>
      <PageHero
        eyebrow={page.eyebrow}
        title={page.title}
        lead={page.lead}
        subline={data.hub.subline}
        primaryCta={{ to: '/contacts', label: content.shared.ui.getQuote ?? content.shared.ui.contact }}
        secondaryCta={{ to: '/case-studies', label: lang === 'bg' ? 'Казуси' : 'Case studies' }}
        aside={{
          eyebrow: 'Industry pattern',
          title: page.caseTitle,
          lead: page.caseBody,
          icon: page.icon,
          items: page.metrics.map((metric) => ({ k: 'Focus', v: metric }))
        }}
      />

      <GemSection eyebrow={page.eyebrow} title={l.challenges} lead={page.lead}>
        <div className="grid gap-4 lg:grid-cols-3">
          {page.challenges.map((item, i) => (
            <Card key={item} revealDelay={0.04 + i * 0.04} variant="brand">
              <p className="text-sm font-semibold leading-relaxed text-ink-950">{item}</p>
            </Card>
          ))}
        </div>
      </GemSection>

      <GemSection eyebrow="Services" title={l.services}>
        <div className="grid gap-4 md:grid-cols-2">
          <Card variant="violet" revealDelay={0.04}>
            <div className="text-sm font-semibold">{l.services}</div>
            <div className="mt-4"><BulletList items={page.services} /></div>
            <div className="mt-5 flex flex-wrap gap-2">
              {page.services.map((service) => (
                <Link key={service} className="rounded-full border border-black/10 bg-white/70 px-3 py-1.5 text-xs font-semibold text-ink-950 hover:bg-white" to={localizedPath(serviceLinks[service] || '/solutions')}>
                  {service}
                </Link>
              ))}
            </div>
          </Card>
          <Card variant="steel" revealDelay={0.10} badge={l.caseStudy}>
            <h2 className="text-lg font-semibold tracking-tight text-ink-950">{page.caseTitle}</h2>
            <p className="mt-3 text-sm leading-relaxed text-ink-900/68">{page.caseBody}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {page.metrics.map((metric) => (
                <span key={metric} className="rounded-full border border-black/10 bg-white/75 px-3 py-1 text-xs font-semibold text-ink-900/65">{metric}</span>
              ))}
            </div>
          </Card>
        </div>
      </GemSection>

      <GemSection eyebrow={l.outcomes} title={l.outcomes}>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {page.outcomes.map((item, i) => (
            <Card key={item} revealDelay={0.04 + i * 0.04} variant="steel">
              <p className="text-sm font-semibold leading-relaxed text-ink-950">{item}</p>
            </Card>
          ))}
        </div>
      </GemSection>

      <TrustBlock compact />

      <section className="px-4 py-10 md:py-14">
        <div className="mx-auto max-w-6xl rounded-3xl border border-white/12 bg-navy-950 p-6 text-white md:p-10">
          <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <h2 className="text-3xl font-semibold tracking-tight md:text-5xl">{lang === 'bg' ? 'Оценете риска и следващите стъпки' : 'Assess risk and next steps'}</h2>
              <p className="mt-4 max-w-3xl text-sm leading-relaxed text-white/70 md:text-base">
                {lang === 'bg' ? 'Ще свържем typical challenges за индустрията с practical roadmap за cloud, security, backup, migration и support.' : 'We will map your industry-specific challenges to a practical roadmap for cloud, security, backup, migration and support.'}
              </p>
            </div>
            <Link to={localizedPath('/contacts')} className="inline-flex rounded-full bg-brand-400 px-5 py-3 text-sm font-semibold text-navy-950 transition hover:bg-brand-300">
              {l.assessment}
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
