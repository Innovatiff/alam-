/* Compact "installed on site" visual used on product pages */
const I = (n) => `<svg><use href="#i-${n}"/></svg>`;
export default () => `<div class="onsite-mini">
  <div class="om-building">
    <div class="om-roof"></div>
    <div class="om-server">${I('server')}<span>On-site server</span><i></i></div>
    <div class="om-devices"><span>${I('pos')}</span><span>${I('tablet')}</span><span>${I('printer')}</span><span>${I('smartphone')}</span></div>
    <svg class="om-lines" viewBox="0 0 300 120" fill="none"><path d="M150 20 C 150 60, 45 50, 45 95"/><path d="M150 20 C 150 60, 115 50, 115 95"/><path d="M150 20 C 150 60, 185 50, 185 95"/><path d="M150 20 C 150 60, 255 50, 255 95"/></svg>
  </div>
  <div class="om-badges"><span>${I('wifi-off')}Works offline</span><span>${I('lock')}Data stays with you</span><span>${I('wrench')}Installed by us</span></div>
</div>`;
