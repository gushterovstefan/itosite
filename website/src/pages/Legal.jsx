import PageHero from '../components/PageHero.jsx'
import GemSection from '../components/GemSection.jsx'
import { Card } from '../components/Cards.jsx'
import { useContent } from '../content/index.jsx'

const copy = {
  en: {
    privacy: {
      eyebrow: 'Legal',
      title: 'Privacy Policy',
      lead: 'How IT Outsource Ltd. handles website and business contact information.',
      sections: [
        ['Data we collect', 'We may process business contact details provided through email, phone, meetings, or website forms: name, company, email, phone, project context and message content.'],
        ['Purpose', 'We use this information to respond to enquiries, prepare proposals, deliver services, maintain business records and meet legal obligations.'],
        ['Retention', 'Business communication is retained only as long as needed for legitimate business, contractual or legal purposes.'],
        ['Your rights', 'You may request access, correction or deletion of personal data by contacting info@itoutsource.bg.']
      ]
    },
    terms: {
      eyebrow: 'Legal',
      title: 'Terms of Use',
      lead: 'Basic terms for using the IT Outsource Ltd. website.',
      sections: [
        ['Website content', 'The information on this website is provided for general business and service-description purposes. It is not a binding offer unless confirmed in a written proposal or contract.'],
        ['Intellectual property', 'Text, structure, visuals and brand assets on this website belong to IT Outsource Ltd. or their respective owners.'],
        ['External services', 'Some links or embedded tools may be operated by third parties. Their own terms and privacy policies apply.'],
        ['Contact', 'For legal or business enquiries, contact info@itoutsource.bg.']
      ]
    }
  },
  bg: {
    privacy: {
      eyebrow: 'Правна информация',
      title: 'Политика за поверителност',
      lead: 'Как Ай Ти Аутсорс ООД обработва информация от сайта и бизнес контакти.',
      sections: [
        ['Данни, които обработваме', 'Можем да обработваме бизнес контактни данни, предоставени по имейл, телефон, срещи или форми на сайта: име, компания, имейл, телефон, контекст на проекта и съдържание на съобщението.'],
        ['Цел', 'Използваме информацията за отговор на запитвания, подготовка на оферти, доставка на услуги, бизнес архив и законови задължения.'],
        ['Съхранение', 'Бизнес комуникацията се съхранява само доколкото е необходимо за легитимни бизнес, договорни или законови цели.'],
        ['Вашите права', 'Можете да поискате достъп, корекция или изтриване на лични данни на info@itoutsource.bg.']
      ]
    },
    terms: {
      eyebrow: 'Правна информация',
      title: 'Условия за ползване',
      lead: 'Основни условия за използване на сайта на Ай Ти Аутсорс ООД.',
      sections: [
        ['Съдържание на сайта', 'Информацията на сайта е с обща бизнес и описателна цел. Тя не представлява обвързваща оферта, освен ако не е потвърдена в писмена оферта или договор.'],
        ['Интелектуална собственост', 'Текстовете, структурата, визуалните елементи и бранд активите са собственост на Ай Ти Аутсорс ООД или съответните им притежатели.'],
        ['Външни услуги', 'Някои линкове или вградени инструменти може да се управляват от трети страни. За тях важат техните условия и политики.'],
        ['Контакт', 'За правни или бизнес въпроси: info@itoutsource.bg.']
      ]
    }
  }
}

export default function Legal({ type }) {
  const { lang, content } = useContent()
  const page = copy[lang]?.[type] || copy.en[type]

  return (
    <div>
      <PageHero
        eyebrow={page.eyebrow}
        title={page.title}
        lead={page.lead}
        subline="IT Outsource Ltd. / Ай Ти Аутсорс ООД"
        primaryCta={{ to: '/contacts', label: content.shared.ui.contactUs ?? content.shared.ui.contact }}
        secondaryCta={{ to: '/', label: content.shared.ui.home }}
        aside={{
          eyebrow: 'IT Outsource Ltd.',
          title: 'BG200776949',
          lead: 'Sofia, Bulgaria · EIK 200776949',
          icon: 'governance',
          items: [
            { k: 'Status', v: lang === 'bg' ? 'Активен' : 'Active' },
            { k: 'VAT', v: 'BG200776949' },
            { k: 'EU', v: 'Bulgaria' }
          ]
        }}
      />

      <GemSection eyebrow={page.eyebrow} title={page.title} lead={page.lead}>
        <div className="grid gap-4 md:grid-cols-2">
          {page.sections.map(([title, body], i) => (
            <Card key={title} revealDelay={0.04 + i * 0.04} variant={i % 2 ? 'steel' : 'brand'}>
              <div className="text-sm font-semibold">{title}</div>
              <p className="mt-3 text-sm leading-relaxed text-ink-900/70">{body}</p>
            </Card>
          ))}
        </div>
      </GemSection>
    </div>
  )
}
