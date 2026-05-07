import { Link, Navigate, useParams } from 'react-router-dom'
import PageHero from '../components/PageHero.jsx'
import GemSection from '../components/GemSection.jsx'
import { Card, ClickCard, BulletList } from '../components/Cards.jsx'
import { Icon, icons } from '../components/Icons.jsx'
import ConversionCta from '../components/ConversionCta.jsx'
import { useContent } from '../content/index.jsx'
import { insights, insightSlugs } from '../content/insights.js'

const labels = {
  en: { open: 'Read playbook', checklist: 'Checklist', related: 'Relevant solutions', all: 'All insights' },
  bg: { open: 'Прочетете playbook', checklist: 'Checklist', related: 'Релевантни решения', all: 'Всички материали' }
}

export function InsightsHub() {
  const { lang, content } = useContent()
  const data = insights[lang] || insights.en
  const l = labels[lang] || labels.en

  return (
    <div>
      <PageHero
        eyebrow={data.hub.eyebrow}
        title={data.hub.title}
        lead={data.hub.lead}
        subline={data.hub.subline}
        primaryCta={{ to: '/contacts', label: content.shared.ui.getQuote ?? content.shared.ui.contact }}
        secondaryCta={{ to: '/solutions', label: content.shared.ui.solutions }}
        aside={{
          eyebrow: 'Playbooks',
          title: '3 published guides',
          lead: data.hub.subline,
          icon: 'platform',
          items: [
            { k: 'Migration', v: 'M365' },
            { k: 'Security', v: 'Zero Trust' },
            { k: 'Continuity', v: 'DR' }
          ]
        }}
      />

      <GemSection eyebrow={data.hub.eyebrow} title={data.hub.title} lead={data.hub.lead}>
        <div className="grid gap-4 lg:grid-cols-3">
          {insightSlugs.map((slug, i) => {
            const article = data.articles[slug]
            return (
              <ClickCard key={slug} to={`/insights/${slug}`} revealDelay={0.04 + i * 0.04} variant={i % 2 ? 'steel' : 'brand'} badge={article.eyebrow}>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-lg font-semibold tracking-tight text-[#F8FAFC]">{article.title}</h2>
                    <p className="mt-3 text-sm leading-relaxed text-[#CBD5E1]">{article.description}</p>
                    <div className="mt-4 text-xs font-semibold uppercase tracking-[0.22em] text-[#94A3B8]">{article.readTime}</div>
                  </div>
                  <Icon as={icons[article.icon] ?? icons.platform} />
                </div>
                <div className="mt-5 text-xs font-semibold uppercase tracking-[0.22em] text-[#38BDF8]">{l.open}</div>
              </ClickCard>
            )
          })}
        </div>
      </GemSection>

      <ConversionCta />
    </div>
  )
}

export function InsightDetail() {
  const { slug } = useParams()
  const { lang, content } = useContent()
  const data = insights[lang] || insights.en
  const article = data.articles[slug] || insights.en.articles[slug]
  const l = labels[lang] || labels.en

  if (!article) return <Navigate to="/insights" replace />

  return (
    <div>
      <PageHero
        eyebrow={article.eyebrow}
        title={article.title}
        lead={article.description}
        subline={article.readTime}
        primaryCta={{ to: '/contacts', label: content.shared.ui.getQuote ?? content.shared.ui.contact }}
        secondaryCta={{ to: '/insights', label: l.all }}
        aside={{
          eyebrow: 'Insight',
          title: article.eyebrow,
          lead: article.description,
          icon: article.icon,
          items: [
            { k: 'Format', v: 'Playbook' },
            { k: 'Use', v: 'Planning' },
            { k: 'Read', v: article.readTime }
          ]
        }}
      />

      <GemSection eyebrow={article.eyebrow} title={article.title} lead={article.description}>
        <div className="grid gap-4 lg:grid-cols-[1fr_0.38fr] lg:items-start">
          <div className="grid gap-4">
            {article.sections.map(([title, body], i) => (
              <Card key={title} revealDelay={0.04 + i * 0.03} variant={i % 2 ? 'steel' : 'brand'}>
                <h2 className="text-lg font-semibold tracking-tight text-[#F8FAFC]">{title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-[#CBD5E1]">{body}</p>
              </Card>
            ))}
          </div>

          <div className="sticky top-24 grid gap-4">
            <Card variant="steel" revealDelay={0.08} badge={l.checklist}>
              <div className="text-sm font-semibold">{l.checklist}</div>
              <div className="mt-4"><BulletList items={article.checklist} /></div>
            </Card>
            <Card variant="amber" revealDelay={0.12}>
              <div className="text-sm font-semibold">{l.related}</div>
              <div className="mt-4 grid gap-2 text-sm">
                <Link className="rounded-xl border border-white/[0.12] bg-[#101E2F] px-3 py-2 font-semibold text-[#F8FAFC] hover:bg-[#0B1B2B]" to="/solutions/cloud-migration">Cloud Migration</Link>
                <Link className="rounded-xl border border-white/[0.12] bg-[#101E2F] px-3 py-2 font-semibold text-[#F8FAFC] hover:bg-[#0B1B2B]" to="/solutions/zero-trust-security">Zero Trust Security</Link>
                <Link className="rounded-xl border border-white/[0.12] bg-[#101E2F] px-3 py-2 font-semibold text-[#F8FAFC] hover:bg-[#0B1B2B]" to="/solutions/backup-dr-veeam">Backup & DR</Link>
              </div>
            </Card>
          </div>
        </div>
      </GemSection>

      <ConversionCta />
    </div>
  )
}
