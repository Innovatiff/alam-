import { mockups } from '../data/mockups.mjs';
const I = (n) => `<svg><use href="#i-${n}"/></svg>`;
export default (ctx) => {
  const { products, base, x, lang } = ctx;
  const { heroArt } = mockups(lang);
  return `<div class="product-rows">${products
    .map(
      (p, i) => `<div class="split product-row ${i % 2 ? 'rev' : ''}" id="${p.slug}">
      <div data-reveal="${i % 2 ? 'right' : 'left'}">
        <div class="row" style="gap:.6rem;margin-bottom:1rem"><span class="icon-tile sm grad-${p.color}">${I(p.icon)}</span><span class="tag">${String(i + 1).padStart(2, '0')} · ${p.name}</span></div>
        <h2>${p.headline}</h2>
        <p class="lead" style="margin:1rem 0 1.3rem">${p.lead}</p>
        <div class="pills" style="margin-bottom:1.6rem">${p.features.slice(0, 3).map((f) => `<span class="pill">${I(f.icon)}${f.title}</span>`).join('')}</div>
        <div class="row">
          <a class="btn btn-primary" href="${base}products/${p.slug}.html">${x('Ver el producto', 'See the product')} ${I('arrow-right')}</a>
          <a class="btn btn-ghost" href="${base}${p.demo.href}">${I('play')}${x('Probar la muestra', 'Try the sample')}</a>
        </div>
      </div>
      <a class="demo-preview" href="${base}products/${p.slug}.html" data-reveal="${i % 2 ? 'left' : 'right'}" aria-label="${p.name}">
        <div class="demo-frame"><div class="device-bar"><i></i><i></i><i></i><span class="url">${p.name.toLowerCase()}</span></div><div class="demo-shot">${heroArt(p.slug, true)}</div></div>
      </a>
    </div>`
    )
    .join('')}</div>`;
};
