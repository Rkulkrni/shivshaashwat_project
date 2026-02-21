# Production Best Practices Checklist – Shivshaashwat Foundation

Use this before going live.

---

## 1. Structure & assets

- [ ] **Folder structure** – CSS in `assets/css/`, JS in `assets/js/`, images in `assets/images/`.
- [ ] **Root-relative paths** – Use `/assets/...`, `/data/...`, `/components/...` in HTML/JS so links work from any URL (e.g. `/about`).
- [ ] **Reusable components** – Navbar and footer in `components/`; loaded by `main.js` with root-relative URLs.

---

## 2. SEO

- [ ] **Meta tags** – Every page has `<title>` and `<meta name="description">`.
- [ ] **Canonical URL** – Each page has `<link rel="canonical" href="...">` with absolute production URL.
- [ ] **Open Graph** – `og:title`, `og:description`, `og:url`, `og:image` (and optionally `og:site_name`, `og:locale`).
- [ ] **Semantic HTML** – Use `<header>`, `<main>`, `<footer>`, `<nav>`, `<section>` with `aria-labelledby` where appropriate.
- [ ] **Heading hierarchy** – One `<h1>` per page; logical order (h1 → h2 → h3).
- [ ] **robots.txt** – Present at root; `Sitemap:` points to production `sitemap.xml` URL.
- [ ] **sitemap.xml** – Lists all public URLs with production domain; update when adding pages.

---

## 3. Performance

- [ ] **Lazy loading** – Images below the fold use `loading="lazy"`.
- [ ] **Defer scripts** – All `<script src="...">` use `defer` (order preserved).
- [ ] **Preconnect** – For CDN and fonts: `preconnect` to `cdn.jsdelivr.net`, `fonts.googleapis.com`, `fonts.gstatic.com`.
- [ ] **Minify** – Production: use minified CSS/JS (`npm run build`) and reference `.min.css` / `.min.js` in HTML, or keep one set and minify as part of deploy.
- [ ] **Bootstrap** – Use CDN (already in use); avoid loading unused Bootstrap JS/CSS (you are using the bundle; for smaller size consider custom build later).
- [ ] **Images** – Compress (e.g. TinyPNG, ImageOptim); prefer WebP with fallback if needed.

---

## 4. Accessibility

- [ ] **Nav** – `<nav aria-label="Main navigation">`; toggle has `aria-expanded`, `aria-controls`, `aria-label`.
- [ ] **Images** – All have meaningful `alt` text.
- [ ] **Footer** – Wrapped in `<footer role="contentinfo">`.
- [ ] **Links** – Donate/contact buttons are focusable and keyboard-usable.
- [ ] **Language** – `<html lang="en">` set; if you add Marathi content, use `lang="mr"` on that section.

---

## 5. URLs & 404

- [ ] **Clean URLs** – Internal links use `/about`, `/work`, `/contact`, `/donate` (no `.html`).
- [ ] **Redirects** – `_redirects` (Netlify) or equivalent rewrites so `/about` serves `about.html` with status 200.
- [ ] **404 page** – Custom `404.html` at root; link back to home.

---

## 6. Security headers (suggested)

- [ ] **X-Frame-Options: DENY** – Avoid clickjacking.
- [ ] **X-Content-Type-Options: nosniff** – Prevent MIME sniffing.
- [ ] **X-XSS-Protection: 1; mode=block** – Legacy XSS filter.
- [ ] **Referrer-Policy** – e.g. `strict-origin-when-cross-origin`.
- [ ] **Permissions-Policy** – Restrict geolocation, camera, microphone if not needed.

Configure via Netlify `_headers` or Vercel `vercel.json` (see DEPLOYMENT.md).

---

## 7. Favicon & meta

- [ ] **Favicon** – `favicon.svg` (and optionally `favicon.ico`) at root; linked in `<head>`.
- [ ] **No duplicate head** – Critical meta and CSS are in the initial HTML (no async `fetch` for meta/description).

---

## 8. Pre-launch

- [ ] Replace any placeholder domain in `sitemap.xml`, `robots.txt`, and canonical/OG URLs.
- [ ] Test all pages and links (including language switcher and donate/contact).
- [ ] Test 404 by visiting a non-existent path.
- [ ] Run [Lighthouse](https://developers.google.com/web/tools/lighthouse) (Performance, Accessibility, SEO, Best Practices).

---

## Example: Optimized head (index)

See `components/head-reference.html` for a full example. Minimal pattern:

- Charset, viewport, title, description, canonical.
- Open Graph tags.
- Favicon, preconnect, then styles.
- Scripts at bottom of `<body>` with `defer`.

This checklist is the single source of what “production-ready” means for this project.
