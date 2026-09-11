import { getHardware } from '../data/products.mjs';
const I = (n) => `<svg><use href="#i-${n}"/></svg>`;
export default ({ lang }) => `<div class="fan" data-reveal="scale">
  ${getHardware(lang).map((h) => `<button class="fan-tile" type="button" data-name="${h.name}" data-desc="${h.desc}" aria-label="${h.name}">${I(h.icon)}</button>`).join('')}
  <div class="fan-label"></div>
</div>`;
