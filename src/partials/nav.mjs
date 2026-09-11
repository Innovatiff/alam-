import { logoFull } from './logo.mjs';
import langSwitch from './lang-switch.mjs';

export default (ctx) => {
  const { site, products, root, base, path, x } = ctx;
  const active = (href) =>
    path === href || (href === 'products.html' && path.startsWith('products/')) || (href === 'samples.html' && path.startsWith('demos/'));
  const link = (item) => `<a href="${base}${item.href}" class="nav-link${active(item.href) ? ' is-active' : ''}">${item.label}</a>`;
  const productLinks = products
    .map(
      (p) => `<a class="menu-item" href="${base}products/${p.slug}.html">
          <span class="menu-icon grad-${p.color}"><svg><use href="#i-${p.icon}"/></svg></span>
          <span class="menu-text"><strong>${p.name}</strong><small>${p.short}</small></span>
        </a>`
    )
    .join('');

  const items = site.nav
    .map((item) =>
      item.children
        ? `<div class="nav-item has-menu">
            <button class="nav-link${active(item.href) ? ' is-active' : ''}" type="button" aria-expanded="false" aria-haspopup="true">${item.label}<svg class="chev"><use href="#i-chevron-down"/></svg></button>
            <div class="menu" role="menu">
              <div class="menu-grid">${productLinks}</div>
              <a class="menu-all" href="${base}products.html">${x('Ver todos los productos', 'See all products')} <svg><use href="#i-arrow-right"/></svg></a>
            </div>
          </div>`
        : link(item)
    )
    .join('');

  return `<header class="site-header">
  <div class="nav-wrap">
    <nav class="nav" aria-label="${x('Navegación principal', 'Main navigation')}">
      <a class="brand" href="${base}index.html" aria-label="${site.name}, ${x('inicio', 'home')}">${logoFull(root, 34)}</a>
      <div class="nav-links" id="nav-links">${items}
        <a class="btn btn-primary nav-mobile-cta" href="${base}${site.cta.href}">${site.cta.label}</a>
      </div>
      <div class="nav-actions">
        ${langSwitch(ctx)}
        <a class="btn btn-primary btn-sm" href="${base}${site.cta.href}">${site.cta.label}</a>
        <button class="nav-toggle" type="button" aria-label="${x('Abrir menú', 'Open menu')}" data-label-open="${x('Abrir menú', 'Open menu')}" data-label-close="${x('Cerrar menú', 'Close menu')}" aria-expanded="false" aria-controls="nav-links">
          <svg class="ic-open"><use href="#i-menu"/></svg><svg class="ic-close"><use href="#i-x"/></svg>
        </button>
      </div>
    </nav>
  </div>
</header>
<main id="main">`;
};
