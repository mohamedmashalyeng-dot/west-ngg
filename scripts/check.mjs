// Static checks on dist/: internal links and anchors, image alts, duplicate ids,
// ARIA references, one <h1> per page, and title/description presence.
// Usage: node scripts/check.mjs   (run after the build)
import { readdir, readFile, stat } from 'node:fs/promises';
import { dirname, join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const dist = join(dirname(fileURLToPath(import.meta.url)), '..', 'dist');

async function walk(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await walk(full)));
    else out.push(full);
  }
  return out;
}

const exists = async (p) => stat(p).then(() => true, () => false);
const urlPathOf = (file) => '/' + relative(dist, file).split(sep).join('/').replace(/index\.html$/, '');

async function resolveTarget(path) {
  const clean = decodeURIComponent(path);
  let file = join(dist, clean);
  if (clean.endsWith('/')) file = join(file, 'index.html');
  return (await exists(file)) ? file : null;
}

const files = (await walk(dist)).filter((f) => f.endsWith('.html'));
const pages = new Map();
for (const file of files) {
  const htmlText = await readFile(file, 'utf8');
  const ids = [...htmlText.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]);
  pages.set(file, { html: htmlText, ids });
}

const problems = [];
let linkCount = 0;
for (const [file, { html, ids }] of pages) {
  const where = urlPathOf(file);
  const isRedirect = html.includes('http-equiv="refresh"');
  const fail = (msg) => problems.push(`${where}: ${msg}`);

  const dupes = ids.filter((id, i) => ids.indexOf(id) !== i);
  if (dupes.length) fail(`duplicate ids: ${[...new Set(dupes)].join(', ')}`);

  if (!isRedirect) {
    const h1 = (html.match(/<h1[\s>]/g) || []).length;
    if (h1 !== 1) fail(`expected one <h1>, found ${h1}`);
    if (!/<title>[^<]{5,}<\/title>/.test(html)) fail('missing <title>');
    if (!/<meta name="description" content="[^"]{20,}">/.test(html)) fail('missing meta description');
    if (!/<html lang="ar" dir="rtl">/.test(html)) fail('missing lang/dir on <html>');
  }

  for (const m of html.matchAll(/<img\b[^>]*>/g)) {
    if (!/\salt="/.test(m[0])) fail(`<img> without alt: ${m[0].slice(0, 80)}`);
  }

  for (const attr of ['aria-controls', 'aria-labelledby', 'aria-describedby', 'for']) {
    for (const m of html.matchAll(new RegExp(`\\s${attr}="([^"]+)"`, 'g'))) {
      for (const ref of m[1].split(/\s+/)) if (!ids.includes(ref)) fail(`${attr} points to missing #${ref}`);
    }
  }

  const refs = [
    ...[...html.matchAll(/\shref="([^"]*)"/g)].map((m) => m[1]),
    ...[...html.matchAll(/\ssrc="([^"]*)"/g)].map((m) => m[1]),
    ...[...html.matchAll(/\ssrcset="([^"]*)"/g)].flatMap((m) => m[1].split(',').map((s) => s.trim().split(/\s+/)[0])),
  ];
  for (const ref of refs) {
    if (!ref) { fail('empty href/src'); continue; }
    if (/^(https?:|mailto:|tel:|data:)/.test(ref)) continue;
    linkCount++;
    const [pathAndQuery, hash] = ref.split('#');
    const path = pathAndQuery.split('?')[0];
    let targetFile = file;
    if (path) {
      targetFile = await resolveTarget(path);
      if (!targetFile) { fail(`broken link ${ref}`); continue; }
    }
    if (hash && targetFile.endsWith('.html')) {
      const target = pages.get(targetFile);
      if (target && !target.ids.includes(decodeURIComponent(hash))) fail(`missing anchor ${ref}`);
    }
  }
}

console.log(`Checked ${pages.size} HTML files, ${linkCount} internal references.`);
if (problems.length) {
  console.error(`\n${problems.length} problem(s):`);
  for (const p of problems) console.error(`  - ${p}`);
  process.exit(1);
}
console.log('No problems found.');
