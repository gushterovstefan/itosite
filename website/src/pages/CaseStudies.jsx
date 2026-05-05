import PageHero from '../components/PageHero.jsx'
import GemSection from '../components/GemSection.jsx'
import { Card } from '../components/Cards.jsx'
import ConversionCta from '../components/ConversionCta.jsx'
import TrustBlock from '../components/TrustBlock.jsx'
import { useContent } from '../content/index.jsx'

const copy = {
  en: {
    eyebrow: 'Case studies',
    title: 'Anonymized business IT outcomes',
    lead: 'Concise reference patterns showing how Microsoft cloud, security, migration, backup and support work translates into business value.',
    subline: 'Client names are intentionally anonymized. The examples focus on credible delivery patterns without disclosing confidential environments.',
    labelClient: 'Client type',
    labelChallenge: 'Challenge',
    labelSolution: 'Solution',
    labelOutcome: 'Outcome',
    cards: [
      {
        title: 'Microsoft 365 Security Modernization',
        client: 'Regulated business / pharma / CRO',
        challenge: 'Secure collaboration, identity, devices and compliance needed stronger governance.',
        solution: 'Entra ID, Conditional Access, Intune, Defender and SharePoint governance.',
        outcome: 'Controlled access, better visibility and stronger data protection.'
      },
      {
        title: 'Google Workspace to Microsoft 365 Migration',
        client: 'Growing business with large collaboration footprint',
        challenge: 'Email, Drive, Shared Drives, permissions and large data volume needed controlled migration.',
        solution: 'Assessment, cleanup, migration batches and SharePoint structure design.',
        outcome: 'Controlled migration with reduced risk and clearer Microsoft 365 ownership.'
      },
      {
        title: 'Azure Disaster Recovery Planning',
        client: 'Business-critical operations environment',
        challenge: 'Critical systems carried downtime risk without predictable recovery evidence.',
        solution: 'Azure Site Recovery, backup, VPN, DR runbooks and restore testing.',
        outcome: 'Improved resilience and more predictable recovery during incidents.'
      },
      {
        title: 'Retail Infrastructure Support',
        client: 'Retail and distribution business',
        challenge: 'ERP, POS, warehouses, reporting and servers required clearer operational support.',
        solution: 'Infrastructure review, monitoring, backup and support model design.',
        outcome: 'Stable operations and clearer escalation across business-critical systems.'
      }
    ]
  },
  bg: {
    eyebrow: 'Казуси',
    title: 'Анонимизирани business IT outcomes',
    lead: 'Кратки reference patterns, които показват как Microsoft cloud, security, migration, backup и support work създават бизнес стойност.',
    subline: 'Имената на клиенти са умишлено анонимизирани. Примерите показват credible delivery patterns без confidential details.',
    labelClient: 'Тип клиент',
    labelChallenge: 'Предизвикателство',
    labelSolution: 'Решение',
    labelOutcome: 'Резултат',
    cards: [
      {
        title: 'Microsoft 365 Security Modernization',
        client: 'Regulated business / pharma / CRO',
        challenge: 'Secure collaboration, identity, devices и compliance имаха нужда от по-силен governance.',
        solution: 'Entra ID, Conditional Access, Intune, Defender и SharePoint governance.',
        outcome: 'Controlled access, better visibility и stronger data protection.'
      },
      {
        title: 'Google Workspace to Microsoft 365 Migration',
        client: 'Growing business с голяма collaboration среда',
        challenge: 'Email, Drive, Shared Drives, permissions и large data volume изискваха controlled migration.',
        solution: 'Assessment, cleanup, migration batches и SharePoint structure design.',
        outcome: 'Controlled migration с reduced risk и по-ясен Microsoft 365 ownership.'
      },
      {
        title: 'Azure Disaster Recovery Planning',
        client: 'Business-critical operations environment',
        challenge: 'Critical systems имаха downtime risk без predictable recovery evidence.',
        solution: 'Azure Site Recovery, backup, VPN, DR runbooks и restore testing.',
        outcome: 'Improved resilience и по-предвидимо recovery при incidents.'
      },
      {
        title: 'Retail Infrastructure Support',
        client: 'Retail and distribution business',
        challenge: 'ERP, POS, warehouses, reporting и servers изискваха по-ясен operational support.',
        solution: 'Infrastructure review, monitoring, backup и support model design.',
        outcome: 'Stable operations и clearer escalation за business-critical systems.'
      }
    ]
  }
}

function CaseCard({ item, labels, index }) {
  return (
    <Card revealDelay={0.04 + index * 0.04} variant={index % 2 ? 'steel' : 'brand'}>
      <h2 className="text-xl font-semibold tracking-tight text-ink-950">{item.title}</h2>
      <div className="mt-5 grid gap-4 text-sm leading-relaxed text-ink-900/72">
        {[
          [labels.labelClient, item.client],
          [labels.labelChallenge, item.challenge],
          [labels.labelSolution, item.solution],
          [labels.labelOutcome, item.outcome]
        ].map(([label, value]) => (
          <div key={label} className="rounded-2xl border border-black/10 bg-white/60 p-4">
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-700">{label}</div>
            <p className="mt-2">{value}</p>
          </div>
        ))}
      </div>
    </Card>
  )
}

export default function CaseStudies() {
  const { lang } = useContent()
  const c = copy[lang] || copy.en

  return (
    <div>
      <PageHero
        eyebrow={c.eyebrow}
        title={c.title}
        lead={c.lead}
        subline={c.subline}
        primaryCta={{ to: '/contacts', label: lang === 'bg' ? 'Заявете ИТ оценка' : 'Request IT Assessment' }}
        secondaryCta={{ to: '/industries', label: lang === 'bg' ? 'Вижте индустриите' : 'Explore industries' }}
        aside={{
          eyebrow: 'Anonymized',
          title: lang === 'bg' ? 'Credible patterns, без confidential claims' : 'Credible patterns, no confidential claims',
          lead: lang === 'bg' ? 'Фокус върху challenge, solution и outcome.' : 'Focused on challenge, solution and outcome.',
          icon: 'governance',
          items: [
            { k: 'Cloud', v: 'Microsoft' },
            { k: 'Security', v: 'Zero Trust' },
            { k: 'DR', v: 'Tested' }
          ]
        }}
      />

      <GemSection eyebrow={c.eyebrow} title={lang === 'bg' ? 'Анонимизирани казуси' : 'Anonymized case study cards'}>
        <div className="grid gap-5 lg:grid-cols-2">
          {c.cards.map((item, index) => <CaseCard key={item.title} item={item} labels={c} index={index} />)}
        </div>
      </GemSection>

      <TrustBlock />
      <ConversionCta />
    </div>
  )
}
