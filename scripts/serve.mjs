// Local static server for dist/.
// Usage: node scripts/serve.mjs [--port=4173] [--mock-form=success|error|slow]
//
// --mock-form fakes the WordPress contact endpoint so the form's loading,
// success and error states can be tested locally. It is for local testing
// only and is never part of the built site. Without it, the form correctly
// reports that sending failed, because no backend exists locally.
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { dirname, extname, join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';

const args = Object.fromEntries(
  process.argv.slice(2).map((a) => a.replace(/^--/, '').split('=')).map(([k, v]) => [k, v ?? true]),
);
const port = Number(args.port || 4173);
const mock = args['mock-form'];
const dist = join(dirname(fileURLToPath(import.meta.url)), '..', 'dist');

const types = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json',
  '.webp': 'image/webp',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.xml': 'application/xml',
  '.txt': 'text/plain; charset=utf-8',
};

async function resolveFile(urlPath) {
  const safe = normalize(decodeURIComponent(urlPath)).replace(/^([/\\])+/, '');
  if (safe.startsWith('..')) return null;
  let file = join(dist, safe);
  try {
    const s = await stat(file);
    if (s.isDirectory()) file = join(file, 'index.html');
    await stat(file);
    return file;
  } catch {
    return null;
  }
}

function mockForm(req, res) {
  let body = '';
  req.on('data', (c) => (body += c));
  req.on('end', () => {
    const params = new URLSearchParams(body);
    const action = params.get('action');
    const send = (status, payload, delay = 400) =>
      setTimeout(() => {
        res.writeHead(status, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(payload));
      }, delay);
    if (action === 'wngg_contact_init') return send(200, { success: true, data: { nonce: 'mock', token: 'mock' } }, 100);
    if (mock === 'error') return send(400, { success: false, data: { message: 'رسالة خطأ تجريبية من الخادم المحلي.', code: 'mock' } });
    if (mock === 'slow') return send(200, { success: true, data: { message: 'ok' } }, 6000);
    return send(200, { success: true, data: { message: 'ok' } });
  });
}

createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  if (url.pathname === '/wp-admin/admin-ajax.php') {
    if (mock && req.method === 'POST') return mockForm(req, res);
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    return res.end('No contact backend in local preview.');
  }
  const file = await resolveFile(url.pathname);
  if (!file) {
    res.writeHead(404, { 'Content-Type': types['.html'] });
    return res.end(await readFile(join(dist, '404.html')));
  }
  res.writeHead(200, { 'Content-Type': types[extname(file)] || 'application/octet-stream' });
  res.end(await readFile(file));
}).listen(port, () => {
  console.log(`Serving dist/ at http://localhost:${port}/`);
  if (mock) console.warn(`!! Contact form is MOCKED (${mock}). Local testing only; nothing is sent.`);
});
