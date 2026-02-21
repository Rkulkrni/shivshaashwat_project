# Shivshaashwat Foundation – Production Folder Structure

This document describes the recommended production-ready folder structure for the static NGO website.

## Final Production Folder Structure

```
shivshaashwat_project/
├── index.html              # Homepage
├── about.html
├── contact.html
├── work.html
├── donate.html
├── 404.html                # Custom not-found page
├── favicon.svg             # Favicon (optional: add favicon.ico for legacy)
├── robots.txt
├── sitemap.xml
├── _redirects              # Netlify: clean URLs
├── _headers                # Netlify: security & cache headers
├── package.json            # Build scripts (minify)
│
├── components/             # Reusable HTML partials (loaded by JS)
│   ├── head-reference.html # Reference only – copy into each page for SEO
│   ├── head.html           # Legacy shared head (optional)
│   ├── navbar.html
│   └── footer.html
│
├── assets/
│   ├── css/
│   │   ├── style.css
│   │   ├── component.css
│   │   ├── style.min.css      # Generated: npm run minify:css
│   │   └── component.min.css
│   ├── js/
│   │   ├── main.js
│   │   ├── donate.js
│   │   ├── work_page.js
│   │   ├── partners-slider.js
│   │   ├── data_combined.js
│   │   └── *.min.js           # Generated: npm run minify:js
│   ├── images/
│   │   ├── logo/
│   │   ├── banners/
│   │   ├── certificates/
│   │   ├── gallery/
│   │   ├── icons/
│   │   └── media/
│   ├── fonts/               # Optional: self-hosted fonts
│   └── icons/               # Optional: SVG/PNG icons
│
├── data/                   # JSON / static data
│   ├── en_lang.json
│   ├── mr_lang.json
│   ├── partners.js
│   ├── bloodBanks.js
│   ├── volunteers.js
│   └── work.js
│
├── work/
│   └── index.html          # Optional duplicate route
├── donate/
│   └── index.html          # Optional duplicate route
│
└── docs/
    ├── PRODUCTION_STRUCTURE.md  # This file
    ├── DEPLOYMENT.md
    └── PRODUCTION_CHECKLIST.md
```

## Asset Conventions

| Type    | Location           | Notes |
|---------|--------------------|--------|
| CSS     | `assets/css/`      | Use root-relative links in HTML: `/assets/css/style.css` |
| JS      | `assets/js/`       | Use `defer` in `<script>`. Minify for production. |
| Images  | `assets/images/`   | Use `loading="lazy"` for below-the-fold images. |
| Fonts   | `assets/fonts/`    | Optional; else use Google Fonts with `preconnect`. |
| Icons   | `assets/icons/`    | Favicon at root: `favicon.svg` / `favicon.ico`. |
| Data    | `data/`            | JSON / JS data files. |

## URL Structure (Clean URLs)

| User sees   | Served as    |
|------------|--------------|
| `/`        | `index.html` |
| `/about`   | `about.html` |
| `/work`    | `work.html`  |
| `/contact` | `contact.html` |
| `/donate`  | `donate.html` |

Configured via `_redirects` (Netlify). Internal links use paths without `.html` (e.g. `href="/about"`).

## Component Usage

- **Navbar & Footer**: Loaded by `main.js` from `/components/navbar.html` and `/components/footer.html` (root-relative).
- **Head**: For SEO and performance, each page should have its own inline `<head>` (see `components/head-reference.html`). Do not rely on async `fetch` for critical meta tags.
