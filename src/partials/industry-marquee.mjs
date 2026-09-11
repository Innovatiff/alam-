import { getIndustries } from '../data/products.mjs';
const I = (n) => `<svg><use href="#i-${n}"/></svg>`;
export default ({ lang }) => {
  const chips = getIndustries(lang).map((it) => `<span class="chip">${I(it.icon)}${it.name}</span>`).join('');
  return `<div class="marquee" aria-hidden="true"><div class="marquee-track">${chips}${chips}</div></div>`;
};
