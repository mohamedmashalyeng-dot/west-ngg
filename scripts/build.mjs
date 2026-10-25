// Renders every page into dist/ and copies static assets.
// Usage: node scripts/build.mjs
import { mkdir, rm, writeFile, cp, readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { page } from '../src/components/layout.mjs';
import { home } from '../src/pages/home.mjs';
import { about } from '../src/pages/about.mjs';
import { projectsIndex, projectPage } from '../src/pages/projects.mjs';
import { investment } from '../src/pages/investment.mjs';
import { contactPage } from '../src/pages/contact.mjs';
import { notFound, redirectPage } from '../src/pages/not-found.mjs';
import { projects } from '../src/content/projects.mjs';
import { redirects } from '../src/content/site.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');
const assets = join(root, 'src', 'assets');

// Turn a URL path into its output file (Arabic slugs stay as UTF-8 folder names).
const outFile = (path) => (path.endsWith('.html') ? join(dist, path) : join(dist, path, 'index.html'));

async function write(path, content) {
  const file = outFile(path);
  await mkdir(dirname(file), { recursive: true });
  await writeFile(file, content, 'utf8');
}

async function main() {
  await rm(dist, { recursive: true, force: true });
  await mkdir(dist, { recursive: true });

  await cp(join(assets, 'css'), join(dist, 'assets', 'css'), { recursive: true });
  await cp(join(assets, 'js'), join(dist, 'assets', 'js'), { recursive: true });
  await cp(join(assets, 'img'), join(dist, 'assets', 'img'), {
    recursive: true,
    filter: (src) => !src.endsWith('manifest.json'),
  });

  const hash = createHash('sha1');
  hash.update(await readFile(join(assets, 'css', 'main.css')));
  hash.update(await readFile(join(assets, 'js', 'main.js')));
  const assetVersion = hash.digest('hex').slice(0, 10);

  const pages = [home(), about(), projectsIndex(), ...projects.map(projectPage), investment(), contactPage(), notFound()];
  for (const p of pages) {
    await write(p.path, page({ ...p, body: String(p.body), assetVersion }));
  }
  for (const [from, to] of Object.entries(redirects)) {
    await write(from, redirectPage(to));
  }
  await writeFile(
    join(dist, 'robots.txt'),
    'User-agent: *\nAllow: /\nSitemap: https://westngg.com/sitemap.xml\n',
    'utf8',
  );
  const urls = pages.filter((p) => !p.noindex).map((p) => `  <url><loc>https://westngg.com${encodeURI(p.path)}</loc></url>`);
  await writeFile(
    join(dist, 'sitemap.xml'),
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`,
    'utf8',
  );

  console.log(`Built ${pages.length} pages and ${Object.keys(redirects).length} redirects into dist/`);
  for (const p of pages) console.log(`  ${p.path}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
