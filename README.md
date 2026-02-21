# Shivshaashwat Foundation – NGO Website

Static NGO website built with **HTML5**, **CSS3**, **Bootstrap 5**, and **Vanilla JavaScript**.

## Quick start

- **Local:** Open `index.html` in a browser, or run `npm run serve` (serves at `http://localhost:3000`).
- **Production:** Deploy the repo root to Netlify, Vercel, or GitHub Pages. See [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md).

## Project structure

- **Root:** `index.html`, `about.html`, `contact.html`, `work.html`, `donate.html`, `404.html`, `favicon.svg`, `robots.txt`, `sitemap.xml`
- **components/** – Reusable navbar and footer (loaded by JS); `head-reference.html` is a reference for inline head
- **assets/css/** – `style.css`, `component.css` (optional: use `.min.css` after `npm run build`)
- **assets/js/** – `main.js`, `donate.js`, `work_page.js`, `partners-slider.js`, etc.
- **assets/images/** – logo, banners, certificates, gallery, icons, media
- **data/** – Language JSON and data (partners, blood banks, volunteers, work)
- **docs/** – [PRODUCTION_STRUCTURE.md](docs/PRODUCTION_STRUCTURE.md), [DEPLOYMENT.md](docs/DEPLOYMENT.md), [PRODUCTION_CHECKLIST.md](docs/PRODUCTION_CHECKLIST.md)

## Build (optional)

```bash
npm install
npm run build   # minifies CSS and JS to *.min.css and *.min.js
```

Then point your HTML to the minified files if desired.

## Clean URLs

- `/` → Home, `/about`, `/work`, `/contact`, `/donate` (configured via `_redirects` on Netlify or `vercel.json` on Vercel).

## Before going live

1. Replace `https://www.shivshaashwatfoundation.org` in `sitemap.xml`, `robots.txt`, and in each page’s canonical/OG URLs with your real domain.
2. Run through [docs/PRODUCTION_CHECKLIST.md](docs/PRODUCTION_CHECKLIST.md).

## Hosting

**Recommended: Netlify** – supports `_redirects` and `_headers` out of the box. Alternatives: Vercel, GitHub Pages. Details in [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md).
