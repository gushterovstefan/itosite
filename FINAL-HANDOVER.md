# ito-site — Final Handover

## Created / Updated Pages

- `/` — enterprise homepage positioning and global trust/CTA layers.
- `/solutions` — high-converting B2B landing page for Microsoft cloud, security, backup/DR, migration and managed IT.
- Dedicated service pages:
  - `/microsoft-365`
  - `/azure-cloud`
  - `/cybersecurity`
  - `/backup-disaster-recovery`
  - `/managed-it-support`
  - `/google-workspace-to-microsoft-365`
- Trust content:
  - `/case-studies`
  - `/industries`
  - `/industries/retail`
  - `/industries/pharma-healthcare`
  - `/industries/energy-engineering`
  - `/industries/smb`
- Contact/legal:
  - `/contact` and `/contacts`
  - `/legal/privacy`
  - `/legal/terms`

Bulgarian `/bg/...` routes are generated for the same public pages.

## Backup Locations

Backups are stored in:

`/Users/stefangushterov/.openclaw/workspace/backups/ito-site-phased-redesign/`

Final production-ready backup:

- `backup_phase_06_final_production_ready_2026-05-05.tar.gz`
- `backup_phase_06_final_production_ready_2026-05-05.git.bundle`

Earlier phase backups are in the same folder and were not overwritten.

## Technologies Used

- React 19
- Vite
- Tailwind CSS
- React Router
- i18next
- Framer Motion for component animation
- Lucide React icons
- Cloudflare Pages
- Wrangler deployment CLI
- Static prerender script: `website/scripts/prerender.mjs`

## How to Edit Content

Most page content lives in:

- `website/src/pages/*.jsx` for page-specific landing page content.
- `website/src/content/en.js` and `website/src/content/bg.js` for shared legacy content.
- `website/src/content/industries.js` for industry pages.
- `website/src/components/Footer.jsx`, `Navbar.jsx`, `TrustBlock.jsx`, `ConversionCta.jsx` for global sections.

After edits:

```bash
cd website
npm run build
```

Then deploy with Wrangler from `website/`.

## How to Manage Forms

The contact form is intentionally frontend-secret-free.

Current behavior:

- Validates required fields in the browser.
- Requires GDPR consent.
- Includes basic spam protection:
  - hidden honeypot field
  - minimum completion time
  - browser validation
  - required GDPR checkbox
- Prepares a `mailto:` enquiry to `info@itoutsource.bg`.
- Does not expose API keys, tokens, or backend secrets in frontend code.

Recommended future improvement:

- Connect Cloudflare Turnstile + a Cloudflare Worker, Formspark, Basin, HubSpot, Microsoft Forms, or another approved backend/form provider for server-side submissions and CRM routing.

## How to Restore from Backup

From a `.tar.gz` backup:

```bash
mkdir restore-ito-site
cd restore-ito-site
tar -xzf /path/to/backup_phase_06_final_production_ready_2026-05-05.tar.gz
cd website
npm install
npm run build
```

From a `.git.bundle` backup:

```bash
git clone /path/to/backup_phase_06_final_production_ready_2026-05-05.git.bundle restored-ito-site
cd restored-ito-site
```

## SEO Work Completed

- Route-specific metadata in `website/src/components/Seo.jsx`.
- Canonical URLs targeting `https://itoutsource.bg`.
- EN/BG `hreflang` alternates.
- Open Graph and Twitter metadata.
- Organization, BreadcrumbList and Service JSON-LD.
- XML sitemap with EN/BG alternates: `website/public/sitemap.xml`.
- Robots file: `website/public/robots.txt`.
- Static prerendered route HTML for production pages.

## Analytics Events Configured

No analytics provider is currently active.

Reason: the site has GDPR-aware cookie consent, but no approved analytics destination has been provided yet. The contact and booking CTAs are structured so analytics events can be added later, for example:

- `contact_form_prepare_email`
- `booking_click`
- `request_it_assessment_click`
- `service_page_cta_click`

Recommended future setup:

- Cloudflare Web Analytics or GA4 only after Stefan approves tracking.
- Fire optional analytics only after cookie consent is accepted.

## Known Limitations / Recommended Next Improvements

- The contact form uses `mailto:` instead of a server-side form endpoint. This avoids frontend secrets but depends on the visitor’s email client.
- LinkedIn URL is not published because no verified company LinkedIn link was available.
- Real `itoutsource.bg` DNS cutover is intentionally deferred.
- `npm run lint` has historical/pre-existing warnings/issues not fully cleaned in this phase.
- Build still reports a chunk-size warning; production works, but future optimization could add more granular code splitting.
- Add real client-approved case studies when available.
- Add Cloudflare Turnstile and backend form handling when a provider is chosen.
- Add approved analytics and conversion tracking after GDPR review.
