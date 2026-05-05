# ito-site production domain cutover plan

This plan is for moving `ito-site` from the temporary Cloudflare Pages URL to the final production domain.

Canonical production URL: `https://itoutsource.bg`  
Cloudflare Pages project: `itosite`  
Production branch: `rebuild-gemstyle`

## Current DNS / hosting state checked on 2026-05-05

- `itoutsource.bg` currently resolves to `193.41.64.138`.
- `itoutsource.bg` currently redirects to `https://www.itoutsource.bg/`.
- `www.itoutsource.bg` currently serves the old WordPress/Apache site.
- Nameservers currently observed: `ns1.bdm.microsoftonline.com`, `ns2.bdm.microsoftonline.com`, `ns3.bdm.microsoftonline.com`, `ns4.bdm.microsoftonline.com`.
- Site-side canonical URLs, Open Graph URLs, sitemap and robots are already updated to `https://itoutsource.bg`.

Cutover is therefore blocked only on external DNS / Cloudflare Pages custom-domain configuration.

## 1. Decide the canonical domain

Choose one final canonical host, for example:

- `https://itoutsource.bg`
- or `https://www.itoutsource.bg`

Recommendation: use the shorter root domain as canonical if Cloudflare DNS can proxy it cleanly, and redirect `www` to root.

## 2. Add the custom domain in Cloudflare Pages

In Cloudflare:

1. Open **Workers & Pages → itosite → Custom domains**.
2. Add the chosen canonical domain.
3. Add the alternate host too if needed (`www` or root).
4. Let Cloudflare create the required DNS records when the zone is managed there.

Expected DNS patterns:

- Root/apex domain: Cloudflare Pages custom-domain record managed by Cloudflare.
- `www`: CNAME to the Pages target provided by Cloudflare.

If DNS remains outside Cloudflare, configure the registrar/DNS host with the exact records Cloudflare Pages provides after adding the custom domain. If the DNS host does not support apex flattening/ALIAS/ANAME for `itoutsource.bg`, move DNS to Cloudflare or use `www.itoutsource.bg` as the canonical host instead.

## 3. Redirect non-canonical host

After both root and `www` are active, enforce one canonical host.

Options:

- Cloudflare Redirect Rule: `www.itoutsource.bg/*` → `https://itoutsource.bg/$1`
- Or root → www if that is chosen as canonical.

Keep HTTPS enabled and avoid redirect chains.

## 4. Update site constants before launch

In the repo, update all canonical references from:

```js
https://itoutsource.bg
```

to the chosen production domain.

Files to update/check:

- `website/src/components/Seo.jsx`
- `website/public/sitemap.xml`
- `website/public/robots.txt` if sitemap URL is added later
- Any future static prerender route output generated under `website/dist/`

## 5. Redeploy and verify

After updating the canonical URL:

1. Build locally: `npm run build`
2. Verify prerendered HTML contains the final domain in canonical/OG tags.
3. Commit and push to:
   - `main`
   - `rebuild-gemstyle`
   - `gemstyle-green-logo`
   - `local-production`
4. Deploy with Wrangler using branch `rebuild-gemstyle`.
5. Test:
   - canonical domain opens the site
   - alternate domain redirects once
   - `/sitemap.xml` returns final-domain URLs
   - `/robots.txt` is accessible
   - representative routes return prerendered HTML
   - OG image loads from the final domain

## 6. Post-cutover SEO checks

- Submit the final sitemap in Google Search Console.
- Inspect `/`, `/solutions`, and top service pages.
- Check LinkedIn/Telegram/social previews after cache refresh.
- Keep `itosite.pages.dev` available as a fallback, but do not use it as canonical after cutover.

## Launch blocker

Final domain confirmed by Stefan: `itoutsource.bg`. Canonical URLs have been updated to `https://itoutsource.bg`.
