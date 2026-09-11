import { logoMark } from './logo.mjs';
const I = (n) => `<svg><use href="#i-${n}"/></svg>`;
export default (ctx) => {
  const { site, root, products } = ctx;
  const product = products.find((p) => p.slug === ctx.productSlug) || products[0];
  return `<header class="demo-bar">
  <a class="brand" href="${root}index.html" aria-label="${site.name} home">${logoMark(28)}<span class="brand-name">${site.name}</span></a>
  <div class="demo-bar-title"><span class="tag green"><i class="dot"></i>Live sample</span><b>${ctx.demoName}</b><small>Interactive sample · nothing you do here is saved</small></div>
  <div class="demo-bar-actions">
    <a class="btn btn-ghost btn-sm" href="${root}products/${product.slug}.html">${I('arrow-left')}Back to product</a>
    <a class="btn btn-primary btn-sm" href="${root}contact.html?interest=${product.slug}">Get this for my business</a>
  </div>
</header>`;
};
