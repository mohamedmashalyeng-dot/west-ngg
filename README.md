# WEST NGG website

Arabic (RTL) company site for WEST NGG / Nabil Ghobrial Group. Pages are generated into plain static HTML by a small Node script. The site has no runtime framework and no npm dependencies.

## Commands

| Command | What it does |
| --- | --- |
| `npm run build` | Writes the site to `dist/` (pages, assets, `sitemap.xml`, `robots.txt`). |
| `npm run check` | Checks `dist/` for broken internal links and anchors, missing `alt`, duplicate ids, broken ARIA references, one `<h1>` per page, and titles/descriptions. |
| `npm run dev` | Builds, then serves `dist/` at http://localhost:4173. |
| `node scripts/serve.mjs --mock-form=success` | Same server, with a **fake** contact endpoint for testing the form's states locally (`success`, `error` or `slow`). Never used in production. |

Requires Node 18 or newer.

## Where things live

```
src/content/      All text and facts (edit these to change copy)
  site.mjs        Contact details, navigation, routes, form settings and messages
  company.mjs     Stats, founder, story, companies, principles, vision/mission/values
  projects.mjs    Meeting Point Mall, WESTEN, previous works, areas, projects menu
  investment.mjs  FAQ topics (one page each) and project examples
src/pages/        One builder per page type (home, about, projects, project, investment, contact, 404)
src/components/   Shared pieces: layout (head/header/footer), UI blocks, page sections, icons
src/assets/       main.css, main.js, images (WebP photos + brand PNGs + manifest.json)
scripts/          build, serve, check, optimize_image.py
```

### Editing content

- **Text:** change the strings in `src/content/*.mjs`, then run `npm run build`.
- **A project field you don't have yet** (status, delivery date, payment plan, and so on): leave it out. Templates only render fields that exist.
- **A previous project:** add an object to `previous` in `projects.mjs`; it appears on the previous-works page and projects page.
- **New FAQ:** add `{ q, a }` to a topic in `investment.mjs` (`a` can be a string or a list of paragraphs).

### Adding a photo

```
python -m pip install pillow
python scripts/optimize_image.py path/to/photo.jpg karma-7 1200 640
```

This writes WebP copies to `src/assets/img/photos/` and registers `karma-7` in `manifest.json`. Use it in content by name (for example `image: 'karma-7'`). All photos are served from this site; nothing is hotlinked.

## Routes

| Path | Page |
| --- | --- |
| `/` | Home |
| `/من-نحن/` | قصتنا (our story) |
| `/مشاريعنا/` | All projects |
| `/projects/` | Meeting Point Mall landing page |
| `/غرب-الجامعة/` | WESTEN – غرب الجامعة / أكتوبر بارك |
| `/أعمالنا-السابقة/` | Previous works: Grand Heights, Al Karma, Jazel |
| `/الأسئلة-والاستثمار/` | FAQ & investment: six topics |
| `/الأسئلة-والاستثمار/<topic>/` | One page per FAQ topic (accordion) |
| `/تواصل-معنا/` | Contact |

The old project pages `/الكرمة/`, `/grand-hights/` and `/جازل/` redirect to their card on `/أعمالنا-السابقة/` (the card opens automatically). `/about/`, `/investment-faq/` and `/projects/meeting-point-mall/` also redirect.

Map embeds use Google Maps search queries set in `projects.mjs` (`mapQuery`, `mapCenter`, and per-place `q`). Replace them with exact pins when available.

## Contact form

The form reuses the existing WordPress plugin endpoint: `POST /wp-admin/admin-ajax.php` with `action=wngg_contact_init` (returns `nonce` and `token`), then `action=wngg_contact_send` with `full_name`, `phone`, `email`, `interest`, `message`, `consent`, the `website` honeypot, `nonce` and `token`. The field names and rules match the live form.

- The script only posts to the **same origin**. On westngg.com it works while WordPress (and that plugin) still answers `/wp-admin/admin-ajax.php`.
- A success message appears **only** after the server returns `success: true`. In local preview there is no backend, so the form correctly shows an error.
- Project pages link to `/تواصل-معنا/?project=<slug>`, which pre-selects the topic and pre-fills the message with that project's name.

## Deploying

### Preview on GitHub Pages

`.github/workflows/pages.yml` builds the site on every push to `main` and publishes it to `https://mohamedmashalyeng-dot.github.io/west-ngg/`. One-time setup: **Settings → Pages → Build and deployment → Source: GitHub Actions**.

The preview build runs with `BASE=/west-ngg`, which prefixes every internal link, marks all pages `noindex` and blocks crawlers in `robots.txt`. The contact form cannot send from the preview (its endpoint lives on westngg.com), so it shows the phone/WhatsApp fallback instead. To test a preview build locally: `BASE=/west-ngg node scripts/build.mjs`.

### Production (westngg.com)

`dist/` (built without `BASE`) is a self-contained static site. Options:

1. Serve `dist/` as the public site on westngg.com and keep WordPress running for `/wp-admin/` (the contact endpoint). The web server must serve the static files first and pass only `/wp-admin/` and `/wp-json/` to WordPress.
2. Or rebuild these templates as a WordPress theme, using `dist/` as the reference markup and `main.css`/`main.js` as-is.

The Arabic folder names in `dist/` must be uploaded as UTF-8 (standard on Linux hosting such as Hostinger).
