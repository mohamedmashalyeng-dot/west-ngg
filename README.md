# WEST NGG website

Arabic (RTL) company site for WEST NGG / Nabil Ghabrial Group. Pages are generated into plain static HTML by a small Node script. The site has no runtime framework and no npm dependencies.

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
  company.mjs     Group, companies, story, mission/vision/values, expertise, process, West Cairo
  projects.mjs    One entry per project; templates skip fields that are missing
  investment.mjs  Investor guide, buying steps and all FAQs
src/pages/        One builder per page type (home, about, projects, project, investment, contact, 404)
src/components/   Shared pieces: layout (head/header/footer), UI blocks, page sections, icons
src/assets/       main.css, main.js, images (WebP photos + brand PNGs + manifest.json)
scripts/          build, serve, check, optimize_image.py
```

### Editing content

- **Text:** change the strings in `src/content/*.mjs`, then run `npm run build`.
- **A project field you don't have yet** (status, delivery date, payment plan, and so on): leave it out. Templates only render fields that exist.
- **A new project:** add an object to `projects` in `projects.mjs` with a unique `slug` and `path`. It then appears automatically in the menu, the projects page, the comparison table, the footer and the sitemap.
- **New FAQ:** add `{ q, a }` to a group in `investment.mjs`. Add `home: true` to also show it on the homepage.

### Adding a photo

```
python -m pip install pillow
python scripts/optimize_image.py path/to/photo.jpg karma-7 1200 640
```

This writes WebP copies to `src/assets/img/photos/` and registers `karma-7` in `manifest.json`. Use it in content by name (for example `image: 'karma-7'`). All photos are served from this site; nothing is hotlinked.

## Routes

Live URLs from westngg.com are kept as they are:

| Path | Page |
| --- | --- |
| `/` | Home |
| `/من-نحن/` | About |
| `/مشاريعنا/` | All projects (previously an older draft of the Meeting Point Mall page) |
| `/projects/` | Meeting Point Mall |
| `/غرب-الجامعة/`, `/الكرمة/`, `/grand-hights/`, `/جازل/` | Project pages |
| `/الأسئلة-والاستثمار/` | Investment guide and FAQ |
| `/تواصل-معنا/` | Contact |

The live homepage links to `/about/`, `/investment-faq/` and `/projects/meeting-point-mall/`, which return 404 there. The build writes small redirect pages for those three paths.

## Contact form

The form reuses the existing WordPress plugin endpoint: `POST /wp-admin/admin-ajax.php` with `action=wngg_contact_init` (returns `nonce` and `token`), then `action=wngg_contact_send` with `full_name`, `phone`, `email`, `interest`, `message`, `consent`, the `website` honeypot, `nonce` and `token`. The field names and rules match the live form.

- The script only posts to the **same origin**. On westngg.com it works while WordPress (and that plugin) still answers `/wp-admin/admin-ajax.php`.
- A success message appears **only** after the server returns `success: true`. In local preview there is no backend, so the form correctly shows an error.
- Project pages link to `/تواصل-معنا/?project=<slug>`, which pre-selects the topic and pre-fills the message with that project's name.

## Deploying

Nothing has been deployed. `dist/` is a self-contained static site. Options:

1. Serve `dist/` as the public site on westngg.com and keep WordPress running for `/wp-admin/` (the contact endpoint). The web server must serve the static files first and pass only `/wp-admin/` and `/wp-json/` to WordPress.
2. Or rebuild these templates as a WordPress theme, using `dist/` as the reference markup and `main.css`/`main.js` as-is.

The Arabic folder names in `dist/` must be uploaded as UTF-8 (standard on Linux hosting such as Hostinger).
