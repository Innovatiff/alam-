#!/usr/bin/env node
/**
 * Innovatiff static site builder (zero dependencies).
 *
 *   node build.mjs
 *
 * - src/pages/**.html      → same path at the repo root (index.html, contact.html, demos/pos.html …)
 * - src/data/products.mjs  → products/<slug>.html via src/templates/product.mjs
 * - src/partials/*.mjs     → reusable fragments, used with {{> name}}
 *
 * Template syntax (deliberately tiny):
 *   {{> partial}}   include a partial (partials are JS functions receiving the page context)
 *   {{key}}         insert a context value (site.name, root, title, …)
 * Page files may start with an HTML comment holding "key: value" front matter.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const SRC = path.join(ROOT, 'src');

const load = async (rel) => import(pathToFileURL(path.join(SRC, rel)).href);
const { site } = await load('data/site.mjs');
const { products } = await load('data/products.mjs');
const { renderProductPage } = await load('templates/product.mjs');

// ---- partials -------------------------------------------------------------
const partials = {};
for (const file of fs.readdirSync(path.join(SRC, 'partials'))) {
  const name = file.replace(/\.(mjs|html)$/, '');
  if (file.endsWith('.mjs')) partials[name] = (await load(`partials/${file}`)).default;
  else {
    const html = fs.readFileSync(path.join(SRC, 'partials', file), 'utf8');
    partials[name] = () => html;
  }
}

function render(template, ctx) {
  let out = template.replace(/\{\{>\s*([\w-]+)\s*\}\}/g, (_, name) => {
    const partial = partials[name];
    if (!partial) throw new Error(`Unknown partial "${name}"`);
    return render(partial(ctx), ctx);
  });
  out = out.replace(/\{\{\s*([\w.]+)\s*\}\}/g, (_, key) => {
    const value = key.split('.').reduce((o, k) => (o == null ? undefined : o[k]), ctx);
    return value == null ? '' : String(value);
  });
  return out;
}

function parseFrontMatter(source) {
  const m = source.match(/^<!--\s*\n([\s\S]*?)\n-->\s*\n?/);
  if (!m) return [{}, source];
  const fm = {};
  for (const line of m[1].split('\n')) {
    const i = line.indexOf(':');
    if (i > 0) fm[line.slice(0, i).trim()] = line.slice(i + 1).trim();
  }
  return [fm, source.slice(m[0].length)];
}

function walk(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(full));
    else if (entry.name.endsWith('.html')) out.push(full);
  }
  return out;
}

function write(relPath, html) {
  const target = path.join(ROOT, relPath);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, html);
  console.log('  wrote', relPath, `(${(html.length / 1024).toFixed(1)} kB)`);
}

const baseCtx = (relPath, extra = {}) => {
  const depth = relPath.split('/').length - 1;
  return { site, products, root: '../'.repeat(depth), path: relPath, year: new Date().getFullYear(), ...extra };
};

// ---- pages ----------------------------------------------------------------
console.log('Building pages…');
for (const file of walk(path.join(SRC, 'pages'))) {
  const relPath = path.relative(path.join(SRC, 'pages'), file).split(path.sep).join('/');
  const [fm, body] = parseFrontMatter(fs.readFileSync(file, 'utf8'));
  write(relPath, render(body, baseCtx(relPath, fm)));
}

// ---- product pages --------------------------------------------------------
console.log('Building product pages…');
for (const product of products) {
  const relPath = `products/${product.slug}.html`;
  const ctx = baseCtx(relPath, { title: product.name, description: product.metaDescription || product.lead, product });
  write(relPath, render(renderProductPage(product, ctx), ctx));
}

// ---- sitemap & robots ------------------------------------------------------
const urls = [...walk(path.join(SRC, 'pages')).map((f) => path.relative(path.join(SRC, 'pages'), f).split(path.sep).join('/')), ...products.map((p) => `products/${p.slug}.html`)]
  .filter((u) => !u.startsWith('demos/'))
  .map((u) => `  <url><loc>${site.url.replace(/\/$/, '')}/${u === 'index.html' ? '' : u}</loc></url>`)
  .join('\n');
write('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`);
write('robots.txt', `User-agent: *\nAllow: /\nSitemap: ${site.url.replace(/\/$/, '')}/sitemap.xml\n`);
console.log('Done.');
