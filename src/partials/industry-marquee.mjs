import { industries } from '../data/products.mjs';
const I = (n) => `<svg><use href="#i-${n}"/></svg>`;
const chips = () => industries.map((it) => `<span class="chip">${I(it.icon)}${it.name}</span>`).join('');
export default () => `<div class="marquee" aria-hidden="true"><div class="marquee-track">${chips()}${chips()}</div></div>`;
