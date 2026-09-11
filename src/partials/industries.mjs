import { industries } from '../data/products.mjs';
const I = (n) => `<svg><use href="#i-${n}"/></svg>`;
export default () => `<div class="ind-grid" data-stagger="70">
  ${industries.map((it, i) => `<div class="ind-tile card" data-reveal="${i % 4 < 2 ? 'left' : 'right'}"><span class="icon-ring">${I(it.icon)}</span><b>${it.name}</b></div>`).join('')}
</div>`;
export const industryChips = () => industries.map((it) => `<span class="chip">${I(it.icon)}${it.name}</span>`).join('');
