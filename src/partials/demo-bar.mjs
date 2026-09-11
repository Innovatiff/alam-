import { logoFull } from './logo.mjs';
import langSwitch from './lang-switch.mjs';
const I = (n) => `<svg><use href="#i-${n}"/></svg>`;
export default (ctx) => {
  const { site, root, base, products, x } = ctx;
  const product = products.find((p) => p.slug === ctx.productSlug) || products[0];
  return `<header class="demo-bar">
  <a class="brand" href="${base}index.html" aria-label="${site.name}, ${x('inicio', 'home')}">${logoFull(root, 28)}</a>
  <div class="demo-bar-title"><span class="tag green"><i class="dot"></i>${x('Muestra en vivo', 'Live sample')}</span><b>${ctx.demoName}</b><small>${x('Nada de lo que hagas aquí se guarda', 'Nothing you do here is saved')}</small></div>
  <div class="demo-bar-actions">
    ${langSwitch(ctx)}
    <button class="btn btn-ghost btn-sm" type="button" data-tour-start>${I('info')}${x('Guía paso a paso', 'Step-by-step guide')}</button>
    <a class="btn btn-ghost btn-sm demo-back" href="${base}products/${product.slug}.html">${I('arrow-left')}${x('Volver al producto', 'Back to product')}</a>
    <a class="btn btn-primary btn-sm" href="${base}contact.html?interest=${product.slug}">${x('Lo quiero para mi negocio', 'I want this for my business')}</a>
  </div>
</header>`;
};
