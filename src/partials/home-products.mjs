import { miniArt } from '../data/mockups.mjs';
const I = (n) => `<svg><use href="#i-${n}"/></svg>`;
export default (ctx) => {
  const { products, root } = ctx;
  const card = (p, span, reveal) => `<article class="card ${span}" data-reveal="${reveal}">
      <div class="icon-tile grad-${p.color}">${I(p.icon)}</div>
      <h3>${p.name}</h3>
      <p>${p.short}.</p>
      <div class="card-art" data-play>${miniArt(p.slug)}</div>
      <div class="card-foot">Ver producto ${I('arrow-right')}</div>
      <a class="card-link" href="${root}products/${p.slug}.html" aria-label="${p.name}"></a>
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
        <div class="icon-tile grad-${custom.color}">${I(custom.icon)}</div>
        <h3>${custom.name}: ${custom.short.toLowerCase()}</h3>
        <p>${custom.lead}</p>
        <div class="card-foot">Ver software a la medida ${I('arrow-right')}</div>
      </div>
      <div class="examples compact">${custom.examples.map((e) => `<span class="chip">${I('check')}${e}</span>`).join('')}</div>
      <a class="card-link" href="${root}products/${custom.slug}.html" aria-label="${custom.name}"></a>
    </article>
  </div>`;
};
