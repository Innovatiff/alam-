import { logoFull } from './logo.mjs';

export default (ctx) => {
  const { site, products, root, path } = ctx;
  const active = (href) =>
    path === href || (href === 'products.html' && path.startsWith('products/')) || (href === 'samples.html' && path.startsWith('demos/'));
  const link = (item) => `<a href="${root}${item.href}" class="nav-link${active(item.href) ? ' is-active' : ''}">${item.label}</a>`;
  const productLinks = products
    .map(
      (p) => `<a class="menu-item" href="${root}products/${p.slug}.html">
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
              <a class="menu-all" href="${root}products.html">Ver todos los productos <svg><use href="#i-arrow-right"/></svg></a>
            </div>
          </div>`
        : link(item)
    )
    .join('');

  return `<header class="site-header">
  <div class="nav-wrap">
    <nav class="nav" aria-label="Navegación principal">
      <a class="brand" href="${root}index.html" aria-label="${site.name}, inicio">${logoFull(root, 34)}</a>
      <div class="nav-links" id="nav-links">${items}
        <a class="btn btn-primary nav-mobile-cta" href="${root}${site.cta.href}">${site.cta.label}</a>
      </div>
      <div class="nav-actions">
        <a class="btn btn-primary btn-sm" href="${root}${site.cta.href}">${site.cta.label}</a>
        <button class="nav-toggle" type="button" aria-label="Abrir menú" aria-expanded="false" aria-controls="nav-links">
          <svg class="ic-open"><use href="#i-menu"/></svg><svg class="ic-close"><use href="#i-x"/></svg>
        </button>
      </div>
    </nav>
  </div>
</header>
<main id="main">`;
};
