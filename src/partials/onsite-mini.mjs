/* Visual compacto de "instalado en tu local" para las páginas de producto */
const I = (n) => `<svg><use href="#i-${n}"/></svg>`;
export default () => `<div class="onsite-mini" aria-hidden="true">
  <div class="om-building">
    <div class="om-roof"></div>
    <div class="om-server">${I('server')}<span>Servidor local</span><i></i></div>
    <div class="om-devices"><span>${I('pos')}</span><span>${I('tablet')}</span><span>${I('printer')}</span><span>${I('smartphone')}</span></div>
    <svg class="om-lines" viewBox="0 0 300 120" fill="none"><path d="M150 20 C 150 60, 45 50, 45 95"/><path d="M150 20 C 150 60, 115 50, 115 95"/><path d="M150 20 C 150 60, 185 50, 185 95"/><path d="M150 20 C 150 60, 255 50, 255 95"/></svg>
  </div>
  <div class="om-badges"><span>${I('wifi-off')}Funciona sin internet</span><span>${I('lock')}Tus datos se quedan contigo</span><span>${I('wrench')}Instalado por nosotros</span></div>
</div>`;
