#!/usr/bin/env node
/**
 * Innovatiff static site builder (zero dependencies, bilingual).
 *
 *   node build.mjs
 *
 * Every page is rendered twice: Spanish at the root (index.html, products/…, demos/…) and
 * English under /en/ (en/index.html, en/products/…, en/demos/…).
 *
 * - src/pages/**.mjs       → page templates: `export default (ctx) => ({ title, description, …, body })`
 * - src/pages/**.html      → legacy single-language pages (front matter + template), still supported
 * - src/data/products.mjs  → products/<slug>.html via src/templates/product.mjs
 * - src/partials/*.mjs     → reusable fragments, used with {{> name}} (functions receiving the page context)
 *
 * Page context (ctx):
 *   lang      'es' | 'en'
 *   x(es, en) pick the text for the current language
 *   site      site data for the language (src/data/site.mjs)
 *   products  product catalogue for the language (src/data/products.mjs)
 *   root      relative path to the repository root (assets)      e.g. '../../'
 *   base      relative path to the language root (page links)    e.g. '../'
 *   path      language-relative path of the page                  e.g. 'products/pos-system.html'
 *   alt       relative link to the same page in the other language
 *   altAbs    absolute URLs of both language versions { es, en }
 *   icon(n)   inline SVG icon reference
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const SRC = path.join(ROOT, 'src');
const LANGS = [
  { code: 'es', prefix: '' },
  { code: 'en', prefix: 'en/' },
];

const load = async (rel) => import(pathToFileURL(path.join(SRC, rel)).href);
const { getSite } = await load('data/site.mjs');
const { getProducts } = await load('data/products.mjs');
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
    else if (/\.(html|mjs)$/.test(entry.name)) out.push(full);
  }
  return out;
}

function write(relPath, html) {
  const target = path.join(ROOT, relPath);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, html);
  console.log('  wrote', relPath, `(${(html.length / 1024).toFixed(1)} kB)`);
}

const icon = (n) => `<svg><use href="#i-${n}"/></svg>`;
const cleanUrl = (u) => u.replace(/\/$/, '');

const makeCtx = (lang, relPath, extra = {}) => {
  const site = getSite(lang.code);
  const products = getProducts(lang.code);
  const outPath = lang.prefix + relPath;
  const depth = outPath.split('/').length - 1;
  const root = '../'.repeat(depth);
  const base = root + lang.prefix;
  const alt = lang.code === 'es' ? `${root}en/${relPath}` : `${root}${relPath}`;
  const url = cleanUrl(site.url);
  const altAbs = { es: `${url}/${relPath === 'index.html' ? '' : relPath}`, en: `${url}/en/${relPath === 'index.html' ? '' : relPath}` };
  return {
    lang: lang.code,
    x: (es, en) => (lang.code === 'en' ? en : es),
    site, products, root, base, path: relPath, outPath, alt, altAbs, icon,
    year: new Date().getFullYear(),
    ...extra,
  };
};

const pageFiles = walk(path.join(SRC, 'pages'));
const pageRel = (file) => path.relative(path.join(SRC, 'pages'), file).split(path.sep).join('/').replace(/\.mjs$/, '.html');

for (const lang of LANGS) {
  console.log(`Building ${lang.code.toUpperCase()} pages…`);
  for (const file of pageFiles) {
    const relPath = pageRel(file);
    if (file.endsWith('.mjs')) {
      const mod = await load(path.relative(SRC, file).split(path.sep).join('/'));
      const ctx0 = makeCtx(lang, relPath);
      const { body, ...meta } = mod.default(ctx0);
      const ctx = { ...ctx0, ...meta };
      write(ctx.outPath, render(body, ctx));
    } else {
      const [fm, body] = parseFrontMatter(fs.readFileSync(file, 'utf8'));
      const ctx = makeCtx(lang, relPath, fm);
      write(ctx.outPath, render(body, ctx));
    }
  }

  console.log(`Building ${lang.code.toUpperCase()} product pages…`);
  for (const product of getProducts(lang.code)) {
    const relPath = `products/${product.slug}.html`;
    const ctx = makeCtx(lang, relPath, { title: product.name, description: product.metaDescription || product.lead, product });
    write(ctx.outPath, render(renderProductPage(product, ctx), ctx));
  }
}

// ---- sitemap & robots ------------------------------------------------------
const site = getSite('es');
const url = cleanUrl(site.url);
const publicPages = [...pageFiles.map(pageRel), ...getProducts('es').map((p) => `products/${p.slug}.html`)].filter((u) => !u.startsWith('demos/'));
const loc = (prefix, u) => `${url}/${prefix}${u === 'index.html' ? '' : u}`;
const entry = (prefix, u) =>
  `  <url>\n    <loc>${loc(prefix, u)}</loc>\n    <xhtml:link rel="alternate" hreflang="es" href="${loc('', u)}"/>\n    <xhtml:link rel="alternate" hreflang="en" href="${loc('en/', u)}"/>\n    <xhtml:link rel="alternate" hreflang="x-default" href="${loc('', u)}"/>\n  </url>`;
const urls = publicPages.flatMap((u) => [entry('', u), entry('en/', u)]).join('\n');
write('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls}\n</urlset>\n`);
write('robots.txt', `User-agent: *\nAllow: /\nSitemap: ${url}/sitemap.xml\n`);
console.log('Done.');
