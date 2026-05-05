export const insights = {
  en: {
    hub: {
      eyebrow: 'Insights',
      title: 'Practical IT playbooks for enterprise change.',
      lead: 'Evergreen guidance that turns common IT decisions into structured, lower-risk delivery plans.',
      subline: 'Migration, security, continuity and governance — written for decision makers and delivery owners.'
    },
    articles: {
      'google-workspace-to-microsoft-365-migration': {
        title: 'Migrating from Google Workspace to Microsoft 365: a 7-phase playbook',
        eyebrow: 'Cloud migration',
        description: 'A practical migration sequence for mail, files, identity and user communication with minimal downtime.',
        readTime: '7 min read',
        icon: 'cloud',
        sections: [
          ['1. Discovery and scope', 'Start with mailboxes, aliases, shared drives, ownership, groups, devices and compliance requirements. The goal is not just moving data — it is understanding dependencies before cutover.'],
          ['2. Identity design', 'Decide how users will authenticate, how MFA will be enforced, and what happens to joiner/mover/leaver processes after migration.'],
          ['3. Pilot migration', 'Move a small representative group first. Validate mail flow, permissions, file sharing, mobile devices and support scripts before touching the whole company.'],
          ['4. Communication plan', 'Users need dates, expected impact, login instructions and a support path. A migration without communication becomes a support incident.'],
          ['5. Production cutover', 'Execute in waves with rollback thinking, DNS readiness, mailbox validation and ownership for every issue.'],
          ['6. Stabilization', 'Monitor sign-ins, mail flow, file access and user tickets. Capture recurring issues and fix the root cause, not only the symptom.'],
          ['7. Governance after migration', 'Finish with Conditional Access, retention, DLP, device compliance and operational reporting so the new platform is better governed than the old one.']
        ],
        checklist: ['Inventory users, groups and shared data', 'Define identity and MFA rules', 'Run pilot before production', 'Prepare user communications', 'Stabilize and govern after cutover']
      },
      'zero-trust-regulated-mid-market': {
        title: 'Designing Zero Trust for a regulated mid-market business',
        eyebrow: 'Security',
        description: 'A practical Zero Trust model using identity, endpoints, Defender XDR, Sentinel and governance without enterprise bloat.',
        readTime: '6 min read',
        icon: 'security',
        sections: [
          ['Start with identity', 'Zero Trust starts with knowing who is accessing what, from where, and under which conditions. Entra ID, MFA and Conditional Access are the foundation.'],
          ['Classify devices', 'Separate trusted, managed and unknown endpoints. Access rules should reflect device posture, user risk and business impact.'],
          ['Centralize signals', 'Defender XDR and Sentinel turn endpoint, identity and cloud events into one response model instead of disconnected alerts.'],
          ['Define incident ownership', 'Tools do not respond to incidents by themselves. Define who triages, who escalates, who communicates and who approves containment.'],
          ['Measure improvement', 'Report on coverage, risky sign-ins, endpoint health, incidents and unresolved controls. Security needs a backlog, not only dashboards.']
        ],
        checklist: ['Enforce MFA and Conditional Access', 'Define device compliance baselines', 'Enable XDR/SIEM signal flow', 'Write incident escalation paths', 'Review risk monthly']
      },
      'backup-immutability-tested-dr': {
        title: 'Backup, immutability, and what “tested DR” actually means',
        eyebrow: 'Business continuity',
        description: 'How to make backup useful in real incidents: 3-2-1 strategy, immutable repositories, restore tests and clear RPO/RTO expectations.',
        readTime: '6 min read',
        icon: 'backup',
        sections: [
          ['Backup is not recovery', 'A backup job can be green while recovery is still unproven. DR planning starts with which systems must come back first and how quickly.'],
          ['Use 3-2-1 thinking', 'Keep multiple copies, on different media or platforms, with at least one protected or off-site copy. Immutability reduces ransomware impact.'],
          ['Define RPO and RTO honestly', 'Recovery point and recovery time objectives must match business reality. If the business needs one hour, the architecture must support one hour.'],
          ['Test restores regularly', 'Restore tests should include files, applications, permissions and full workload scenarios. Document results and fix gaps.'],
          ['Assign ownership', 'During an incident, confusion costs time. Runbooks should show who declares DR, who restores, who validates and who communicates.']
        ],
        checklist: ['Map critical workloads', 'Set RPO/RTO by business priority', 'Use immutable repositories', 'Run scheduled restore tests', 'Keep DR runbooks current']
      }
    }
  },
  bg: {
    hub: {
      eyebrow: 'Материали',
      title: 'Практични ИТ playbooks за enterprise промяна.',
      lead: 'Evergreen насоки, които превръщат чести ИТ решения в структурирани delivery планове с по-нисък риск.',
      subline: 'Migration, security, continuity и governance — написани за decision makers и delivery owners.'
    },
    articles: {
      'google-workspace-to-microsoft-365-migration': {
        title: 'Миграция от Google Workspace към Microsoft 365: 7-фазов playbook',
        eyebrow: 'Cloud migration',
        description: 'Практична последователност за миграция на поща, файлове, идентичност и user communication с минимален downtime.',
        readTime: '7 мин четене',
        icon: 'cloud',
        sections: [
          ['1. Discovery и scope', 'Започнете с mailboxes, aliases, shared drives, ownership, groups, devices и compliance requirements. Целта не е само преместване на данни — а dependency mapping преди cutover.'],
          ['2. Identity design', 'Решете как потребителите ще се автентикират, как се прилага MFA и какво се случва с joiner/mover/leaver процесите след миграция.'],
          ['3. Pilot migration', 'Преместете малка представителна група. Валидирайте mail flow, permissions, file sharing, mobile devices и support scripts.'],
          ['4. Communication plan', 'Потребителите имат нужда от дати, очакван impact, login инструкции и support path. Миграция без комуникация става support incident.'],
          ['5. Production cutover', 'Изпълнявайте на waves с rollback thinking, DNS readiness, mailbox validation и ownership за всеки issue.'],
          ['6. Stabilization', 'Следете sign-ins, mail flow, file access и tickets. Хващайте recurring issues и оправяйте root cause.'],
          ['7. Governance след миграция', 'Завършете с Conditional Access, retention, DLP, device compliance и operational reporting.']
        ],
        checklist: ['Inventory на users, groups и shared data', 'Identity и MFA правила', 'Pilot преди production', 'User communications', 'Governance след cutover']
      },
      'zero-trust-regulated-mid-market': {
        title: 'Zero Trust за regulated mid-market бизнес',
        eyebrow: 'Сигурност',
        description: 'Практичен Zero Trust модел с identity, endpoints, Defender XDR, Sentinel и governance без enterprise bloat.',
        readTime: '6 мин четене',
        icon: 'security',
        sections: [
          ['Започнете с identity', 'Zero Trust започва с яснота кой достъпва какво, откъде и при какви условия. Entra ID, MFA и Conditional Access са основата.'],
          ['Класифицирайте devices', 'Разделете trusted, managed и unknown endpoints. Access rules трябва да отразяват device posture, user risk и business impact.'],
          ['Централизирайте signals', 'Defender XDR и Sentinel превръщат endpoint, identity и cloud events в един response model.'],
          ['Дефинирайте incident ownership', 'Инструментите не реагират сами. Нужно е ясно кой triage-ва, кой escalation-ва, кой комуникира и кой approve-ва containment.'],
          ['Мерете improvement', 'Докладвайте coverage, risky sign-ins, endpoint health, incidents и unresolved controls. Security има нужда от backlog, не само dashboards.']
        ],
        checklist: ['MFA и Conditional Access', 'Device compliance baselines', 'XDR/SIEM signal flow', 'Incident escalation paths', 'Monthly risk review']
      },
      'backup-immutability-tested-dr': {
        title: 'Backup, immutability и какво означава “tested DR”',
        eyebrow: 'Business continuity',
        description: 'Как backup става полезен при реален incident: 3-2-1 стратегия, immutable repositories, restore tests и ясни RPO/RTO.',
        readTime: '6 мин четене',
        icon: 'backup',
        sections: [
          ['Backup не е recovery', 'Backup job може да е green, докато recovery остава непроверено. DR planning започва с кои системи се връщат първи и колко бързо.'],
          ['Използвайте 3-2-1 thinking', 'Дръжте multiple copies, на различни media/platforms, с поне едно protected/off-site копие. Immutability намалява ransomware impact.'],
          ['Дефинирайте RPO и RTO честно', 'Recovery point и recovery time objectives трябва да отговарят на бизнес реалността. Ако бизнесът иска 1 час, архитектурата трябва да го поддържа.'],
          ['Тествайте restores регулярно', 'Restore tests трябва да включват files, applications, permissions и full workload scenarios. Документирайте резултати и gaps.'],
          ['Назначете ownership', 'При incident объркването струва време. Runbooks трябва да показват кой declares DR, кой restores, кой validates и кой communicates.']
        ],
        checklist: ['Critical workloads map', 'RPO/RTO по business priority', 'Immutable repositories', 'Scheduled restore tests', 'Current DR runbooks']
      }
    }
  }
}

export const insightSlugs = ['google-workspace-to-microsoft-365-migration', 'zero-trust-regulated-mid-market', 'backup-immutability-tested-dr']
