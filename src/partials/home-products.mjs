import { mockups } from '../data/mockups.mjs';
const I = (n) => `<svg><use href="#i-${n}"/></svg>`;
export default (ctx) => {
  const { products, base, x, lang } = ctx;
  const { miniArt } = mockups(lang);
  const card = (p, span, reveal) => `<article class="card ${span}" data-reveal="${reveal}">
      <div class="card-head"><div class="icon-tile grad-${p.color}">${I(p.icon)}</div><div><h3>${p.name}</h3><p>${p.short}</p></div></div>
      <div class="card-art" data-play>${miniArt(p.slug)}</div>
      <div class="card-foot">${x('Ver producto', 'See product')} ${I('arrow-right')}</div>
      <a class="card-link" href="${base}products/${p.slug}.html" aria-label="${p.name}"></a>
    </article>`;
  const [web, staff, pos, ai, inv, custom] = products;
  return `<div class="bento" data-stagger="110">
    ${card(web, 'span-3', 'left')}
    ${card(pos, 'span-3', 'right')}
    ${card(staff, '', 'up')}
    ${card(ai, '', 'up')}
    ${card(inv, '', 'up')}
    <article class="card span-6 gradient-border custom-card" data-reveal="up">
      <div class="custom-card-text">
        <div class="card-head"><div class="icon-tile grad-${custom.color}">${I(custom.icon)}</div><div><h3>${custom.name}</h3><p>${custom.short}</p></div></div>
        <div class="card-foot">${x('Ver software a la medida', 'See custom software')} ${I('arrow-right')}</div>
      </div>
      <div class="examples compact">${custom.examples.map((e) => `<span class="chip">${I('check')}${e}</span>`).join('')}</div>
      <a class="card-link" href="${base}products/${custom.slug}.html" aria-label="${custom.name}"></a>
    </article>
  </div>`;
};
