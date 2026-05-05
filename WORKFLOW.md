# IT Outsource site workflow

Production preview/domain:
- https://itosite.pages.dev

GitHub repo:
- https://github.com/gushterovstefan/itosite

Local repo:
- `~/.openclaw/workspace/projects/itosite-repo`

App directory:
- `~/.openclaw/workspace/projects/itosite-repo/website`

Local LAN preview:
- `http://10.10.10.200:4188`

## Edit flow

```bash
cd ~/.openclaw/workspace/projects/itosite-repo/website
npm run dev -- --host 0.0.0.0 --port 4188
```

Make changes in `website/src`.

Before push:

```bash
npm run build
cd ..
git status
git add website/src ...
git commit -m "Describe change"
git push origin main
```

Cloudflare Pages project:
- `itosite`

Cloudflare is connected to GitHub, so pushing to `main` auto-deploys to:
- `https://itosite.pages.dev`

Fallback direct deploy if needed:

```bash
cd ~/.openclaw/workspace/projects/itosite-repo/website
npm run build
npx wrangler pages deploy dist --project-name itosite
```
