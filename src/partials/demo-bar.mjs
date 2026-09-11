import { logoFull } from './logo.mjs';
const I = (n) => `<svg><use href="#i-${n}"/></svg>`;
export default (ctx) => {
  const { site, root, products } = ctx;
  const product = products.find((p) => p.slug === ctx.productSlug) || products[0];
  return `<header class="demo-bar">
  <a class="brand" href="${root}index.html" aria-label="${site.name}, inicio">${logoFull(root, 28)}</a>
  <div class="demo-bar-title"><span class="tag green"><i class="dot"></i>Muestra en vivo</span><b>${ctx.demoName}</b><small>Muestra interactiva · nada de lo que hagas aquí se guarda</small></div>
  <div class="demo-bar-actions">
    <button class="btn btn-ghost btn-sm" type="button" data-tour-start>${I('info')}Ver guía paso a paso</button>
    <a class="btn btn-ghost btn-sm demo-back" href="${root}products/${product.slug}.html">${I('arrow-left')}Volver al producto</a>
    <a class="btn btn-primary btn-sm" href="${root}contact.html?interest=${product.slug}">Lo quiero para mi negocio</a>
  </div>
</header>`;
};
