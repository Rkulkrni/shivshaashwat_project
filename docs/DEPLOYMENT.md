# Deployment – Shivshaashwat Foundation

## Recommended Hosting Options

| Platform       | Best for              | Clean URLs      | Custom 404 | SSL | Cost   |
|----------------|------------------------|-----------------|------------|-----|--------|
| **Netlify**    | Static sites, CI/CD    | ✅ _redirects    | ✅ 404.html| Yes | Free   |
| **Vercel**     | Static + serverless    | ✅ vercel.json  | ✅         | Yes | Free   |
| **GitHub Pages**| Open source / simple   | ⚠️ Jekyll/redirects | ✅ 404  | Yes | Free   |

**Recommendation for this project: Netlify** – zero config for `_redirects` and `_headers`, drag-and-drop or Git deploy, and free SSL.

---

## Option A: Netlify (Recommended)

### 1. Prepare repo

- Ensure these exist at **root**: `index.html`, `404.html`, `_redirects`, `_headers`, `robots.txt`, `sitemap.xml`, `favicon.svg`.
- Update `sitemap.xml` and `robots.txt` with your **production domain** (e.g. `https://www.shivshaashwatfoundation.org`).

### 2. Deploy via Git

1. Push the project to **GitHub** / **GitLab** / **Bitbucket**.
2. Log in to [Netlify](https://www.netlify.com) → **Add new site** → **Import an existing project**.
3. Connect the repo; set **Build command** to empty; **Publish directory** = `/` (root).
4. (Optional) Add build command: `npm install && npm run build` if you use minified assets and switch HTML to `.min.js`/`.min.css`.
5. Deploy. Netlify will use `_redirects` and `_headers` automatically.

### 3. Deploy via drag-and-drop

1. Build the site locally (e.g. `npm run build` if you use minify).
2. Zip the **root** folder (all HTML, assets, `_redirects`, `_headers`, `404.html`, etc.).
3. Netlify → **Sites** → **Deploy manually** → drag the zip.

### 4. Post-deploy

- Set **Site name** (e.g. `shivshaashwat-foundation`).
- **Domain**: add custom domain in **Domain settings** and update `sitemap.xml` + `robots.txt` with that URL.
- **HTTPS**: Netlify provisions SSL automatically.

---

## Option B: Vercel

1. Install Vercel CLI: `npm i -g vercel`.
2. In project root, create `vercel.json`:

```json
{
  "cleanUrls": true,
  "trailingSlash": false,
  "rewrites": [
    { "source": "/about", "destination": "/about.html" },
    { "source": "/work", "destination": "/work.html" },
    { "source": "/contact", "destination": "/contact.html" },
    { "source": "/donate", "destination": "/donate.html" }
  ],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "X-XSS-Protection", "value": "1; mode=block" }
      ]
    }
  ]
}
```

3. Run `vercel` and follow prompts; add custom domain in Vercel dashboard.

---

## Option C: GitHub Pages

1. **Settings** → **Pages** → Source: **Deploy from branch**; branch `main`, folder **/ (root)**.
2. Clean URLs: GitHub Pages does not support redirects like Netlify. Either:
   - Keep `.html` in links (e.g. `href="/about.html"`), or
   - Use a small redirect script or Jekyll with `permalink` in front matter if you switch to Jekyll.
3. Custom 404: add `404.html` at repo root; GitHub serves it automatically.
4. Update **sitemap.xml** and **robots.txt** with the GitHub Pages URL (e.g. `https://username.github.io/repo-name/`). If using a custom domain, use that URL instead.

---

## Deployment Checklist

- [ ] Replace placeholder domain in `sitemap.xml` and `robots.txt` with live URL.
- [ ] All internal links use clean URLs (`/about`, `/donate`, etc.) and root-relative assets (`/assets/...`).
- [ ] Favicon: `favicon.svg` at root; optionally add `favicon.ico` for older browsers.
- [ ] Test: `/`, `/about`, `/work`, `/contact`, `/donate`, and a wrong path (404).
- [ ] (Optional) Switch to minified CSS/JS in HTML and run `npm run build` before deploy.
