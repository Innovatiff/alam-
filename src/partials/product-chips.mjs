const I = (n) => `<svg><use href="#i-${n}"/></svg>`;
export default (ctx) => ctx.products.map((p) => `<a class="chip" href="#${p.slug}" style="text-decoration:none">${I(p.icon)}${p.name}</a>`).join('');
