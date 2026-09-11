/* Compact "installed on site" visual for product pages */
const I = (n) => `<svg><use href="#i-${n}"/></svg>`;
export default ({ x }) => `<div class="onsite-mini" aria-hidden="true">
  <div class="om-building">
    <div class="om-roof"></div>
    <div class="om-server">${I('server')}<span>${x('Servidor local', 'Local server')}</span><i></i></div>
    <div class="om-devices"><span>${I('pos')}</span><span>${I('tablet')}</span><span>${I('printer')}</span><span>${I('smartphone')}</span></div>
    <svg class="om-lines" viewBox="0 0 300 120" fill="none"><path d="M150 20 C 150 60, 45 50, 45 95"/><path d="M150 20 C 150 60, 115 50, 115 95"/><path d="M150 20 C 150 60, 185 50, 185 95"/><path d="M150 20 C 150 60, 255 50, 255 95"/></svg>
  </div>
  <div class="om-badges"><span>${I('wifi-off')}${x('Funciona sin internet', 'Works offline')}</span><span>${I('lock')}${x('Tus datos se quedan contigo', 'Your data stays with you')}</span><span>${I('wrench')}${x('Instalado por nosotros', 'Installed by us')}</span></div>
</div>`;
