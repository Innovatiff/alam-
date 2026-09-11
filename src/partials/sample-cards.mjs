import { mockups } from '../data/mockups.mjs';
const I = (n) => `<svg><use href="#i-${n}"/></svg>`;
export default (ctx) => {
  const { products, base, x, lang } = ctx;
  const { heroArt } = mockups(lang);
  return `<div class="grid grid-2 sample-grid" data-stagger="110">${products
    .map(
      (p, i) => `<article class="card sample-card" data-reveal="${i % 2 ? 'right' : 'left'}">
      <a class="demo-preview" href="${base}${p.demo.href}" aria-label="${x('Abrir la muestra', 'Open the sample')}: ${p.name}">
        <div class="demo-frame"><div class="device-bar"><i></i><i></i><i></i><span class="url">${p.demo.href.replace('demos/', x('muestras / ', 'samples / ')).replace('.html', '')}</span></div><div class="demo-shot">${heroArt(p.slug, true)}</div><div class="demo-hover">${I('play')}<span>${x('Abrir la muestra', 'Open the sample')}</span></div></div>
      </a>
      <div class="sample-body">
        <div class="row" style="gap:.6rem;margin-bottom:.6rem"><span class="icon-tile sm grad-${p.color}">${I(p.icon)}</span><span class="tag green"><i class="dot" style="width:7px;height:7px;border-radius:50%;background:currentColor"></i> ${x('Muestra en vivo', 'Live sample')}</span></div>
        <h3>${p.demo.title}</h3>
        <p>${p.demo.desc}</p>
        <ul class="checks" style="margin:1rem 0 1.3rem">${p.demo.bullets.map((b) => `<li>${I('check')}<span>${b}</span></li>`).join('')}</ul>
        <div class="row">
          <a class="btn btn-primary" href="${base}${p.demo.href}">${I('play')}${x('Abrir la muestra', 'Open the sample')}</a>
          <a class="btn-link" href="${base}products/${p.slug}.html">${x('Ver el producto', 'See the product')} ${I('arrow-right')}</a>
        </div>
      </div>
    </article>`
    )
    .join('')}</div>`;
};
