/**
 * Illustration & mockup library.  Everything is HTML/CSS (styles live in assets/css/site.css,
 * section "mockups"), so it stays crisp at any size and animates without images.
 */
const I = (n) => `<svg><use href="#i-${n}"/></svg>`;
const phone = (inner, cls = '') => `<div class="phone ${cls}"><div class="phone-screen"><div class="phone-notch"></div>${inner}</div></div>`;
const device = (inner, cls = '', url = '') =>
  `<div class="device ${cls}"><div class="device-bar"><i></i><i></i><i></i>${url ? `<span class="url">${url}</span>` : ''}</div>${inner}</div>`;
const lvl = (w, cls = '') => `<div class="lvl ${cls}"><i style="--w:${w}"></i></div>`;
const wave = (n = 7, cls = '') => `<div class="wave ${cls}">${Array.from({ length: n }, (_, i) => `<i style="--i:${i}"></i>`).join('')}</div>`;
const barcode = () => `<div class="barcode">${Array.from({ length: 14 }, (_, i) => `<i style="--w:${[1, 2, 1, 3, 1, 1, 2, 1, 1, 3, 1, 2, 1, 1][i]}"></i>`).join('')}</div>`;

/* ---------------------------------------------------------------- hero art */
const HERO = {
  'website-ordering': () => `<div class="hero-art ha-order" aria-hidden="true">
    <div class="float p1">${phone(`
      <div class="os-head"><span class="os-logo"></span><b>La Fogata</b><span class="os-cart">${I('bag')}<i class="os-cnt">1</i></span></div>
      <div class="os-banner"><b>Pide en línea</b><small>Para recoger en 15 min · A domicilio en 30 min</small></div>
      <div class="os-chips"><span class="on">Tacos</span><span>Burritos</span><span>Bebidas</span><span>Postres</span></div>
      <div class="os-item"><div class="os-img g1"></div><div><b>Tacos al pastor</b><small>Orden de 3, piña y cilantro</small></div><span class="os-price">$12.50</span><span class="os-add a1">${I('plus')}</span></div>
      <div class="os-item"><div class="os-img g2"></div><div><b>Burrito de asada</b><small>Frijol, arroz, queso</small></div><span class="os-price">$14.00</span><span class="os-add">${I('plus')}</span></div>
      <div class="os-item"><div class="os-img g3"></div><div><b>Churros</b><small>Con cajeta</small></div><span class="os-price">$6.00</span><span class="os-add">${I('plus')}</span></div>
      <div class="os-cartbar"><span>1 platillo · $12.50</span><b>Ver carrito</b></div>`)}</div>
    <div class="ha-card ha-neworder"><div class="title">${I('bell')}Pedido nuevo <b>#1043</b><span class="mk-badge blue">Recoger 12:30</span></div><div class="ha-line"><span>1 × Tacos al pastor</span><span>$12.50</span></div><div class="ha-line muted"><span>Nota: sin cebolla, por favor</span></div><div class="ha-accept"><span class="mk-btn a">Aceptar pedido</span><span class="mk-btn b green">${I('check')}Aceptado</span></div></div>
    <div class="ha-card ha-status"><div class="title">${I('clock')}Pedido #1043</div><div class="ha-steps"><div class="s s1"><i></i><span>Recibido</span></div><div class="s s2"><i></i><span>Preparando</span></div><div class="s s3"><i></i><span>Listo</span></div></div></div>
    <div class="ha-card ha-notify"><div class="title">${I('message')}SMS al cliente</div><p>Hola Sara, tu pedido #1043 ya está listo para recoger. ¡Te esperamos!</p></div>
  </div>`,

  'employee-management': () => `<div class="hero-art ha-staff" aria-hidden="true">
    <div class="float d1">${device(`
      <div class="sc"><div class="sc-head"><b>Semana 37 · 8 al 14 de sep</b><span class="mk-btn">Publicar</span></div>
      <div class="sc-grid">
        ${['Lun', 'Mar', 'Mié', 'Jue', 'Vie'].map((d, c) => `<div class="sc-col"><span>${d}</span>${[0, 1, 2].map((r) => (c === 2 && r === 2) ? '<i class="sh open" style="--i:' + (c * 3 + r) + '">Turno libre</i>' : `<i class="sh c${(c + r) % 4}" style="--i:${c * 3 + r}">${['Sam K.', 'María L.', 'Juan P.', 'Ana R.'][(c + r) % 4]}</i>`).join('')}</div>`).join('')}
      </div></div>`, 'sc-device', 'personal.local / horarios')}</div>
    <div class="ha-card ha-clockin"><div class="title"><span class="mk-avatar">SK</span>Sam K. <small class="muted">· Barista</small></div><div class="ha-clockwrap"><span class="mk-btn a">Marcar entrada</span><span class="ha-onshift b"><i></i>En turno desde las 08:58</span></div></div>
    <div class="ha-card ha-leave"><div class="title">${I('calendar')}Solicitud de permiso</div><p><b>María L.</b> · Vie 12 de sep · Día completo</p><div class="ha-leavebtns"><span class="a"><span class="mk-btn">Aprobar</span><span class="mk-btn ghost">Rechazar</span></span><span class="mk-badge green b">${I('check')}Aprobado · horario actualizado</span></div></div>
  </div>`,

  'pos-system': () => `<div class="hero-art ha-pos" aria-hidden="true">
    <div class="float d1">${device(`
      <div class="pos"><div class="pos-grid">${[['Latte', '4.50', 'i1'], ['Capuchino', '4.00', ''], ['Croissant', '3.20', 'i2'], ['Bagel', '3.80', ''], ['Jugo', '4.20', 'i3'], ['Muffin', '3.50', '']].map(([n, p, c]) => `<div class="pos-tile ${c}"><b>${n}</b><span>$${p}</span></div>`).join('')}</div>
      <div class="pos-cart"><div class="pc-head">Venta #482 <span>Caja 1</span></div><div class="pc-item i1"><span>Latte</span><span>$4.50</span></div><div class="pc-item i2"><span>Croissant</span><span>$3.20</span></div><div class="pc-item i3"><span>Jugo</span><span>$4.20</span></div><div class="pc-total"><span>Total</span><span class="pc-amt"><i class="t0">$0.00</i><i class="t1">$4.50</i><i class="t2">$7.70</i><i class="t3">$11.90</i></span></div><span class="mk-btn pc-charge">Cobrar $11.90</span></div></div>`, 'pos-device')}</div>
    <div class="ha-card ha-reader"><div class="reader"><div class="reader-screen"><span class="r0">Acerca o inserta la tarjeta</span><span class="r1"><i class="spin"></i>Procesando…</span><span class="r2">${I('check')}Aprobado</span></div><div class="reader-slot"></div></div><div class="ha-line muted"><span>Terminal de tarjeta</span><span>$11.90</span></div></div>
    <div class="ha-printer"><div class="printer-head">${I('printer')}<span>Impresora de recibos</span></div><div class="paper"><b>Café Amanecer</b><span>Latte ............ $4.50</span><span>Croissant ....... $3.20</span><span>Jugo ............. $4.20</span><b>Total ........... $11.90</b><small>Pago con tarjeta · ¡Gracias!</small></div></div>
  </div>`,

  'ai-receptionist': () => `<div class="hero-art ha-ai" aria-hidden="true">
    <div class="float p1">${phone(`
      <div class="call">
        <div class="call-in"><div class="call-avatar"><i></i><i></i>${I('user')}</div><b>Llamada entrante</b><small>Emma · +1 555 0134</small><div class="call-btns"><span class="red">${I('phone-off')}</span><span class="green">${I('phone')}</span></div></div>
        <div class="call-on"><div class="call-ai">${I('headset')}</div><b>Recepcionista IA</b><small>Contestando por Salón Flor</small>${wave(9)}<small class="call-timer">Escuchando…</small></div>
      </div>`)}</div>
    <div class="ha-card ha-transcript"><div class="title">${I('message')}Transcripción en vivo</div>
      <div class="bub ai b1">Gracias por llamar a Salón Flor, ¿en qué puedo ayudarte?</div>
      <div class="bub me b2">Quisiera un corte el martes por la tarde.</div>
      <div class="bub ai b3">El martes a las 2:30 pm está libre. ¿Te lo agendo?</div>
      <div class="bub me b4">Sí, por favor.</div>
    </div>
    <div class="ha-card ha-cal"><div class="title">${I('calendar')}Martes 16 de sep</div><div class="cal-rows"><div class="cal-row"><span>13:30</span><i></i></div><div class="cal-row"><span>14:30</span><b class="cal-appt">Corte · Emma</b></div><div class="cal-row"><span>15:30</span><i></i></div></div></div>
    <div class="ha-card ha-summary"><div class="title">${I('check')}Resumen enviado a tu celular</div><p>Emma agendó un corte el martes a las 2:30 pm. SMS de confirmación enviado a la clienta.</p></div>
  </div>`,

  'inventory-software': () => `<div class="hero-art ha-inv" aria-hidden="true">
    <div class="float d1">${device(`
      <div class="inv"><div class="inv-head"><b>Existencias</b><span class="mk-badge red inv-alert">${I('alert')}1 producto bajo</span></div>
      <div class="inv-row"><span>Café en grano 1 kg</span>${lvl('78%')}<b>39</b></div>
      <div class="inv-row"><span>Leche de avena 1 L</span><div class="lvl drain"><i></i></div><b class="inv-cnt"><i class="c0">24</i><i class="c1">3</i><i class="c2">27</i></b></div>
      <div class="inv-row"><span>Croissants (congelados)</span>${lvl('62%')}<b>124</b></div>
      <div class="inv-row"><span>Vasos 12 oz</span>${lvl('90%')}<b>900</b></div>
      <div class="inv-row"><span>Bolsas de papel</span>${lvl('45%')}<b>450</b></div></div>`, 'inv-device', 'inventario.local / existencias')}</div>
    <div class="ha-card ha-scan"><div class="scanbox">${barcode()}<div class="beam"></div></div><div class="ha-line"><span>Recibiendo entrega</span><b class="mk-badge green">+24 Leche de avena</b></div></div>
    <div class="ha-card ha-po"><div class="title">${I('file')}Orden de compra OC-218</div><div class="ha-line"><span>Leche de avena 1 L × 48</span><span>$62.40</span></div><div class="ha-line muted"><span>Proveedor: Lácteos del Norte</span></div><span class="mk-badge blue" style="margin-top:6px">${I('check')}Enviada por correo</span></div>
  </div>`,

  'custom-software': () => `<div class="hero-art ha-custom" aria-hidden="true">
    <div class="blueprint"></div>
    <div class="float d1">${device(`
      <div class="app"><div class="app-side"><i></i><i></i><i></i><i></i><i></i></div><div class="app-main"><div class="slot s1"></div><div class="slot s2"></div><div class="slot s3"></div><div class="slot s4"></div></div></div>`, 'custom-device', 'tunegocio.local')}</div>
    <div class="mod m1">${I('calendar')}<span>Citas</span></div>
    <div class="mod m2">${I('file')}<span>Facturas</span></div>
    <div class="mod m3">${I('users')}<span>Clientes</span></div>
    <div class="mod m4">${I('bar-chart')}<span>Reportes</span></div>
    <svg class="mod-lines" viewBox="0 0 560 460"><path d="M215 165 H335 M215 275 H335 M275 165 V275" /></svg>
    <div class="ha-card ha-tailored"><div class="title">${I('sparkles')}Tu sistema</div><p>4 módulos · construido alrededor de tu proceso · instalado en tu local</p></div>
  </div>`,
};

export const heroArt = (slug, thumb = false) => {
  const fn = HERO[slug];
  if (!fn) return '';
  return thumb ? `<div class="thumb">${fn()}</div>` : fn();
};

/* ---------------------------------------------------------------- flow art */
const bars = (vals) => `<div class="bars">${vals.map((h, i) => `<i style="--h:${h}%;--i:${i}"></i>`).join('')}</div>`;
const FLOW = {
  'phone-order': () => `<div class="fa fa-phone" aria-hidden="true"><div class="mini-phone"><div class="mp-bar"></div><div class="mp-item"><i class="g1"></i><span></span><b>+</b></div><div class="mp-item"><i class="g2"></i><span></span><b class="press">+</b></div><div class="mp-item"><i class="g3"></i><span></span><b>+</b></div><div class="mp-cta">Pagar · $18.50</div></div><div class="fa-bubble">${I('check')}Pedido realizado</div></div>`,
  ticket: () => `<div class="fa fa-ticket" aria-hidden="true"><div class="tk-printer">${I('printer')}<span>Impresora del mostrador</span></div><div class="tk-paper"><b>PEDIDO #1043</b><span>Recoger · 12:30</span><span>1 × Tacos al pastor</span><span>1 × Churros</span><b>Total $18.50</b></div></div>`,
  status: () => `<div class="fa fa-status" aria-hidden="true"><div class="st-line"><div class="st s1"><i></i><span>Recibido</span></div><div class="st s2"><i></i><span>Preparando</span></div><div class="st s3"><i></i><span>Listo</span></div></div><div class="fa-bubble late">${I('message')}"Tu pedido está listo"</div></div>`,
  report: () => `<div class="fa fa-report" aria-hidden="true"><div class="rp"><small>Ventas de la semana</small>${bars([40, 55, 48, 70, 62, 90, 78])}</div><div class="rp-list"><div><span>Tacos al pastor</span><b>128</b></div><div><span>Burrito de asada</span><b>96</b></div><div><span>Churros</span><b>74</b></div></div></div>`,
  team: () => `<div class="fa fa-team" aria-hidden="true">${[['SK', 'Sam K.', 'Barista', '$16.50/h'], ['ML', 'María L.', 'Encargada', '$22.00/h'], ['JP', 'Juan P.', 'Cocinero', '$18.00/h'], ['AR', 'Ana R.', 'Mesera', '$15.00/h']].map(([i, n, r, p], k) => `<div class="tm-row" style="--i:${k}"><span class="mk-avatar">${i}</span><div><b>${n}</b><small>${r}</small></div><em>${p}</em></div>`).join('')}</div>`,
  schedule: () => `<div class="fa fa-sched" aria-hidden="true"><div class="sg">${['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'].map((d, c) => `<div class="sg-col"><span>${d}</span>${[0, 1].map((r) => `<i class="sh c${(c + r) % 4}" style="--i:${c * 2 + r}"></i>`).join('')}</div>`).join('')}</div></div>`,
  clock: () => `<div class="fa fa-clock" aria-hidden="true"><div class="kp"><div class="kp-dots"><i></i><i></i><i></i><i></i></div><div class="kp-keys">${[1, 2, 3, 4, 5, 6, 7, 8, 9].map((k) => `<span class="${k === 4 || k === 8 || k === 2 || k === 9 ? 'hit' : ''}">${k}</span>`).join('')}</div></div><div class="fa-bubble">${I('check')}Sam marcó entrada a las 08:58</div></div>`,
  export: () => `<div class="fa fa-export" aria-hidden="true"><div class="ts"><div class="ts-row h"><span>Empleado</span><span>Horas</span><span>Pago</span></div><div class="ts-row"><span>Sam K.</span><span>38.5</span><span>$635</span></div><div class="ts-row"><span>María L.</span><span>40.0</span><span>$880</span></div><div class="ts-row"><span>Juan P.</span><span>32.0</span><span>$576</span></div></div><div class="fa-bubble">${I('download')}horas_semana37.xlsx</div></div>`,
  install: () => `<div class="fa fa-install" aria-hidden="true"><div class="ck"><b>${I('wrench')}Día de instalación</b>${['Montar terminal e impresora', 'Conectar cajón y lector', 'Configurar red y respaldos', 'Importar productos y precios', 'Imprimir recibos de prueba y capacitar'].map((t, i) => `<div class="ck-row" style="--i:${i}"><i>${I('check')}</i><span>${t}</span></div>`).join('')}</div></div>`,
  products: () => `<div class="fa fa-products" aria-hidden="true"><div class="sheet">${[0, 1, 2, 3, 4].map((i) => `<div class="sheet-row" style="--i:${i}"><i></i><i></i><i></i></div>`).join('')}</div><div class="fa-arrow">${I('arrow-right')}</div><div class="ptiles">${[['Latte', '4.50'], ['Bagel', '3.80'], ['Jugo', '4.20'], ['Muffin', '3.50']].map(([n, p], i) => `<div class="ptile" style="--i:${i}"><b>${n}</b><span>$${p}</span></div>`).join('')}</div></div>`,
  sale: () => `<div class="fa fa-sale" aria-hidden="true"><div class="sl-grid">${['Latte', 'Bagel', 'Jugo', 'Muffin', 'Té', 'Galleta'].map((n, i) => `<span class="${i < 3 ? 'hit' : ''}" style="--i:${i}">${n}</span>`).join('')}</div><div class="sl-cart"><span>3 productos</span><b>$11.90</b><i class="mk-btn">Cobrar</i></div></div>`,
  eod: () => `<div class="fa fa-eod" aria-hidden="true"><div class="eod"><b>Cierre del día · Mié 10 de sep</b><div class="eod-row"><span>Efectivo</span>${lvl('28%')}<b>$412</b></div><div class="eod-row"><span>Tarjeta</span>${lvl('82%')}<b>$1,238</b></div><div class="eod-row"><span>En línea</span>${lvl('40%')}<b>$596</b></div><div class="eod-total"><span>Total</span><b>$2,246</b></div></div></div>`,
  call: () => `<div class="fa fa-call" aria-hidden="true"><div class="ring"><i></i><i></i><i></i>${I('phone')}</div><div class="fa-bubble late">${I('arrow-right')}Desviada a la recepcionista IA</div></div>`,
  answer: () => `<div class="fa fa-answer" aria-hidden="true">${wave(11, 'big')}<div class="bub ai">Gracias por llamar. ¿En qué puedo ayudarte hoy?</div></div>`,
  calendar: () => `<div class="fa fa-cal" aria-hidden="true"><div class="cal7">${['Lun', 'Mar', 'Mié', 'Jue', 'Vie'].map((d, c) => `<div class="cal-col"><span>${d}</span><i></i><i class="${c === 1 ? 'appt' : ''}">${c === 1 ? 'Emma 14:30' : ''}</i><i></i></div>`).join('')}</div></div>`,
  summary: () => `<div class="fa fa-summary" aria-hidden="true"><div class="sms"><div class="sms-h">${I('message')}SMS · ahora</div><p>Nueva cita: Emma, corte, martes 2:30 pm. Transcripción en tu panel.</p></div><div class="log"><div><i class="ok"></i><span>Emma · Cita</span><b>2:14</b></div><div><i class="ok"></i><span>Desconocido · Horarios</span><b>0:41</b></div><div><i class="msg"></i><span>Marco · Recado</span><b>1:05</b></div></div></div>`,
  stock: () => `<div class="fa fa-stock" aria-hidden="true"><div class="stk-row"><span>Café en grano</span>${lvl('78%')}<b>39</b></div><div class="stk-row"><span>Leche de avena</span><div class="lvl drain"><i></i></div><b class="red">3</b></div><div class="stk-row"><span>Croissants</span>${lvl('62%')}<b>124</b></div><div class="stk-row"><span>Vasos 12 oz</span>${lvl('90%')}<b>900</b></div></div>`,
  alert: () => `<div class="fa fa-alert" aria-hidden="true"><div class="ro"><b>${I('bell')}Lista de reorden</b><div class="ro-row"><span>Leche de avena 1 L</span><em>3 / mín 12</em></div><div class="ro-row"><span>Vasos 8 oz</span><em>40 / mín 100</em></div><span class="mk-btn press2">Crear orden de compra</span><span class="mk-badge green sent">${I('check')}OC-218 enviada al proveedor</span></div></div>`,
  scan: () => `<div class="fa fa-scan" aria-hidden="true"><div class="scanbox big">${barcode()}<div class="beam"></div></div><div class="fa-bubble">${I('plus')}24 unidades recibidas</div></div>`,
  workshop: () => `<div class="fa fa-workshop" aria-hidden="true"><div class="wk"><div class="wk-node n1">Llama el cliente</div><div class="wk-node n2">Cotización</div><div class="wk-node n3">Trabajo agendado</div><div class="wk-node n4">Factura pagada</div><svg class="wk-lines" viewBox="0 0 320 150"><path d="M90 40 H118" /><path d="M160 58 V76 H50 V94" /><path d="M102 110 H232" /></svg></div></div>`,
  prototype: () => `<div class="fa fa-proto" aria-hidden="true"><div class="wf"><div class="wf-bar"><i></i><i></i><i></i></div><div class="wf-body"><div class="wf-side"><i></i><i></i><i></i></div><div class="wf-main"><i></i><i></i><i></i><i class="wide"></i></div></div></div><div class="fa-bubble">${I('eye')}Prototipo navegable</div></div>`,
  build: () => `<div class="fa fa-build" aria-hidden="true"><div class="stg"><div class="stg-row"><span>Etapa 1 · Citas</span>${lvl('100%')}<b class="green">En uso</b></div><div class="stg-row"><span>Etapa 2 · Facturación</span>${lvl('70%')}<b>70 %</b></div><div class="stg-row"><span>Etapa 3 · Reportes</span>${lvl('15%')}<b>Sigue</b></div></div></div>`,
};
export const flowArt = (key) => (FLOW[key] ? FLOW[key]() : '');
export const miniArt = (slug) =>
  ({ 'website-ordering': 'phone-order', 'employee-management': 'schedule', 'pos-system': 'sale', 'ai-receptionist': 'answer', 'inventory-software': 'stock', 'custom-software': 'workshop' }[slug]
    ? flowArt({ 'website-ordering': 'phone-order', 'employee-management': 'schedule', 'pos-system': 'sale', 'ai-receptionist': 'answer', 'inventory-software': 'stock', 'custom-software': 'workshop' }[slug])
    : '');

/* ---------------------------------------------------------------- home dashboard */
export const dashboard = (site) => `<div class="dash device" data-tilt="3" aria-hidden="true">
  <aside class="dash-side">
    <div class="dash-brand"><i></i><span>${site.name} Panel</span></div>
    <nav class="dash-nav">
      <a class="on">${I('home')}Panel</a><a>${I('pos')}Ventas</a><a>${I('bag')}Pedidos en línea</a><a>${I('users')}Personal</a><a>${I('boxes')}Inventario</a><a>${I('headset')}Llamadas</a>
    </nav>
    <div class="dash-nav-title">Cuenta</div>
    <nav class="dash-nav"><a>${I('user')}Perfil</a><a>${I('settings')}Ajustes</a></nav>
    <div class="dash-onsite">${I('server')}<span>Corriendo en tu local<br><small>Servidor de la oficina · en línea</small></span></div>
  </aside>
  <div class="dash-main">
    <div class="dash-top"><div><small>Inicio / Panel</small><b>Panel</b></div><div class="dash-search">${I('search')}<span>Buscar…</span></div><div class="dash-icons">${I('bell')}${I('user')}</div></div>
    <div class="dash-stats">
      <div class="mk-tile"><small>Ventas de hoy</small><b><span data-count="2840" data-prefix="$">0</span></b><span class="mk-up">+12 %</span><i class="grad-blue">${I('pos')}</i></div>
      <div class="mk-tile"><small>Pedidos en línea</small><b><span data-count="38">0</span></b><span class="mk-up">+8 %</span><i class="grad-indigo">${I('globe')}</i></div>
      <div class="mk-tile"><small>Personal en turno</small><b><span data-count="6">0</span></b><span class="mk-up">de 9</span><i class="grad-violet">${I('users')}</i></div>
      <div class="mk-tile"><small>Productos con stock bajo</small><b><span data-count="3">0</span></b><span class="mk-down">atender</span><i class="grad-cyan">${I('boxes')}</i></div>
    </div>
    <div class="dash-row">
      <div class="dash-welcome"><small>Bienvenido de nuevo</small><b>Tu negocio de un vistazo</b><p>Ventas, pedidos, personal e inventario en un solo lugar, corriendo en tu propio equipo.</p><span>Todo está al día</span></div>
      <div class="dash-card"><small>Llamadas contestadas por la IA</small><div class="gauge"><svg viewBox="0 0 120 120"><defs><linearGradient id="gauge-grad" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#60a5fa"/><stop offset="1" stop-color="#a78bfa"/></linearGradient></defs><circle class="track" cx="60" cy="60" r="50"/><circle class="val" cx="60" cy="60" r="50" style="--v:.96"/></svg><b>96 %<small>esta semana</small></b></div><em>0 llamadas perdidas</em></div>
      <div class="dash-card"><small>Salud del inventario</small><div class="gauge"><svg viewBox="0 0 120 120"><circle class="track" cx="60" cy="60" r="50"/><circle class="val" cx="60" cy="60" r="50" style="--v:.93"/></svg><b>9.3<small>puntaje</small></b></div><em>3 productos por pedir</em></div>
    </div>
    <div class="dash-row two">
      <div class="dash-card left"><small>Ventas · últimos 7 días</small>${bars([45, 62, 55, 78, 70, 95, 84])}<div class="dash-days"><span>Jue</span><span>Vie</span><span>Sáb</span><span>Dom</span><span>Lun</span><span>Mar</span><span>Mié</span></div></div>
      <div class="dash-card left"><small>Pedidos recientes</small><div class="dash-list"><div><span class="mk-avatar">SB</span><span>Sara B. · Recoger</span><b>$21.50</b><em class="mk-badge green">Listo</em></div><div><span class="mk-avatar">TK</span><span>Tomás K. · A domicilio</span><b>$38.00</b><em class="mk-badge amber">Preparando</em></div><div><span class="mk-avatar">LM</span><span>Lena M. · Recoger</span><b>$14.50</b><em class="mk-badge blue">Nuevo</em></div></div></div>
    </div>
  </div>
</div>`;

/* ---------------------------------------------------------------- hero waves */
export const waves = () => {
  const svg = (id) => `<svg viewBox="0 0 760 800" preserveAspectRatio="xMinYMax meet" aria-hidden="true"><defs>
    <linearGradient id="${id}a" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#4f46e5"/><stop offset="1" stop-color="#0a1140"/></linearGradient>
    <linearGradient id="${id}b" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#3b82f6"/><stop offset=".55" stop-color="#1d4ed8"/><stop offset="1" stop-color="#0c1550"/></linearGradient>
    <linearGradient id="${id}c" x1="0" y1="0" x2="0.6" y2="1"><stop offset="0" stop-color="#93c5fd"/><stop offset=".35" stop-color="#3b82f6"/><stop offset="1" stop-color="#101a5e"/></linearGradient>
    <linearGradient id="${id}d" x1="0" y1="0" x2="0.6" y2="1"><stop offset="0" stop-color="#bfdbfe"/><stop offset=".4" stop-color="#60a5fa"/><stop offset="1" stop-color="#1e3a8a"/></linearGradient>
    <filter id="${id}s" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="14"/></filter>
  </defs>
    <path d="M-40 820 C 90 560, 300 420, 640 380 C 380 470, 250 620, 240 820 Z" fill="url(#${id}a)" opacity=".85"/>
    <path d="M-60 820 C 60 600, 240 470, 560 440 C 320 520, 190 660, 180 820 Z" fill="url(#${id}b)"/>
    <path d="M-80 820 C 10 640, 150 540, 420 510 C 230 590, 110 700, 100 820 Z" fill="url(#${id}c)"/>
    <path d="M-100 820 C -30 700, 70 620, 260 600 C 130 660, 50 740, 30 820 Z" fill="url(#${id}d)"/>
    <path d="M640 380 C 380 470, 250 620, 240 820" fill="none" stroke="#a5b4fc" stroke-opacity=".35" stroke-width="2"/>
    <path d="M560 440 C 320 520, 190 660, 180 820" fill="none" stroke="#bfdbfe" stroke-opacity=".45" stroke-width="2"/>
    <path d="M420 510 C 230 590, 110 700, 100 820" fill="none" stroke="#dbeafe" stroke-opacity=".6" stroke-width="2"/>
    <ellipse cx="200" cy="700" rx="200" ry="60" fill="#3b82f6" opacity=".25" filter="url(#${id}s)"/>
  </svg>`;
  return `<div class="hero-waves wave-l">${svg('wl')}</div><div class="hero-waves wave-r">${svg('wr')}</div>`;
};

/* ---------------------------------------------------------------- hero network */
export const network = (site) => {
  const nodes = [
    { x: 70, y: 40, icon: 'globe', label: 'Sitio web y pedidos', c: 'grad-blue', fx: '-120px', fy: '-60px', d: 100 },
    { x: 150, y: 172, icon: 'pos', label: 'POS', c: 'grad-violet', fx: '-140px', fy: '80px', d: 250 },
    { x: 245, y: 70, icon: 'users', label: 'Personal', c: 'grad-indigo', fx: '-60px', fy: '-90px', d: 400 },
    { x: 690, y: 40, icon: 'headset', label: 'Recepcionista IA', c: 'grad-cyan', fx: '120px', fy: '-60px', d: 180 },
    { x: 610, y: 172, icon: 'boxes', label: 'Inventario', c: 'grad-sky', fx: '140px', fy: '80px', d: 330 },
    { x: 515, y: 70, icon: 'sparkles', label: 'Software a la medida', c: 'grad-fuchsia', fx: '60px', fy: '-90px', d: 480 },
  ];
  const paths = [
    'M70 40 C 200 40, 260 115, 338 115', 'M150 172 C 230 172, 280 115, 338 115', 'M245 70 C 290 70, 300 115, 338 115',
    'M690 40 C 560 40, 500 115, 422 115', 'M610 172 C 530 172, 480 115, 422 115', 'M515 70 C 470 70, 460 115, 422 115',
  ];
  return `<div class="net-wrap" data-reveal="none"><div class="net" data-w="760" data-h="230">
    <svg class="lines" viewBox="0 0 760 230" fill="none"><defs><linearGradient id="net-grad" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="760" y2="0"><stop offset="0" stop-color="#60a5fa"/><stop offset=".5" stop-color="#c4b5fd"/><stop offset="1" stop-color="#60a5fa"/></linearGradient></defs>
      ${paths.map((d, i) => `<path id="np${i}" class="line" d="${d}"/>`).join('')}
      ${paths.map((d, i) => `<circle class="pulse" r="3.2"><animateMotion dur="${2.6 + (i % 3) * 0.5}s" begin="${(i * 0.45).toFixed(2)}s" repeatCount="indefinite" keyPoints="${i < 3 ? '0;1' : '0;1'}" keyTimes="0;1"><mpath href="#np${i}"/></animateMotion></circle>`).join('')}
    </svg>
    ${nodes.map((n) => `<div class="node ${n.c}" style="left:${n.x - 29}px;top:${n.y - 29}px;--fx:${n.fx};--fy:${n.fy};--d:${n.d}ms">${I(n.icon)}<small>${n.label}</small></div>`).join('')}
    <div class="node center" style="left:338px;top:73px;--d:0ms;--fx:0;--fy:20px"><svg viewBox="0 0 32 32" fill="none" aria-hidden="true"><path d="M16 12.5v11" stroke="#fff" stroke-width="4.2" stroke-linecap="round"/><circle cx="16" cy="7.4" r="2.5" fill="#fff"/><path d="M23.2 5.2l.7 1.9 1.9.7-1.9.7-.7 1.9-.7-1.9-1.9-.7 1.9-.7.7-1.9z" fill="#c7d2fe"/></svg></div>
  </div></div>`;
};

/* ---------------------------------------------------------------- on-site diagram */
export const onsiteArt = () => `<div class="net-wrap onsite-wrap" data-reveal="none"><div class="net onsite-net" data-w="560" data-h="380">
  <svg class="lines" viewBox="0 0 560 380" fill="none">
    <defs><linearGradient id="on-grad" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="560" y2="0"><stop offset="0" stop-color="#60a5fa"/><stop offset=".5" stop-color="#c4b5fd"/><stop offset="1" stop-color="#60a5fa"/></linearGradient>
    <linearGradient id="bld" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="rgba(96,165,250,.16)"/><stop offset="1" stop-color="rgba(96,165,250,.02)"/></linearGradient></defs>
    <path class="bld" d="M120 360 V170 L280 90 L440 170 V360 Z" fill="url(#bld)" stroke="rgba(147,197,253,.4)" stroke-width="1.5"/>
    <path d="M100 178 L280 88 L460 178" fill="none" stroke="#93c5fd" stroke-opacity=".8" stroke-width="2.5" stroke-linecap="round"/>
    <rect x="255" y="290" width="50" height="70" rx="6" fill="rgba(255,255,255,.04)" stroke="rgba(255,255,255,.14)"/>
    <path d="M120 360 H440" stroke="rgba(255,255,255,.18)"/>
    <path id="op0" class="line" d="M280 205 C 240 205, 210 215, 170 240"/>
    <path id="op1" class="line" d="M280 205 C 320 205, 350 215, 390 240"/>
    <path id="op2" class="line" d="M280 205 C 260 240, 220 270, 175 315"/>
    <path id="op3" class="line" d="M280 205 C 300 240, 340 270, 385 315"/>
    <path id="op4" class="line dashed" d="M280 205 C 330 150, 400 110, 470 60"/>
    ${[0, 1, 2, 3].map((i) => `<circle class="pulse" r="3"><animateMotion dur="${2.4 + i * 0.3}s" begin="${i * 0.4}s" repeatCount="indefinite"><mpath href="#op${i}"/></animateMotion></circle>`).join('')}
    <circle class="pulse" r="2.5"><animateMotion dur="3.4s" repeatCount="indefinite"><mpath href="#op4"/></animateMotion></circle>
  </svg>
  <div class="node center" style="left:238px;top:163px;width:84px;height:84px;--d:0ms;--fx:0;--fy:20px">${I('server')}<small>Servidor local</small></div>
  <div class="node grad-violet" style="left:141px;top:211px;--fx:-80px;--fy:0;--d:200ms">${I('pos')}<small>POS</small></div>
  <div class="node grad-indigo" style="left:361px;top:211px;--fx:80px;--fy:0;--d:300ms">${I('tablet')}<small>Tableta de entrada</small></div>
  <div class="node grad-blue" style="left:146px;top:286px;--fx:-80px;--fy:40px;--d:400ms">${I('printer')}<small>Impresoras</small></div>
  <div class="node grad-cyan" style="left:356px;top:286px;--fx:80px;--fy:40px;--d:500ms">${I('headset')}<small>Panel de llamadas</small></div>
  <div class="node glass" style="left:441px;top:31px;--fx:40px;--fy:-40px;--d:650ms">${I('globe')}<small>Internet · sincronización opcional</small></div>
  <div class="onsite-badge b1">${I('wifi-off')}Sigue funcionando sin internet</div>
  <div class="onsite-badge b2">${I('lock')}Tus datos se quedan aquí</div>
</div></div>`;

/* extra process illustrations used on secondary pages */
FLOW.quote = () => `<div class="fa fa-quote" aria-hidden="true"><div class="qt"><div class="qt-h"><b>Cotización · Café Amanecer</b><span class="mk-badge green">Precio fijo</span></div><div class="qt-row"><span>Terminal POS, impresora, cajón</span><i></i></div><div class="qt-row"><span>Software POS + inventario</span><i></i></div><div class="qt-row"><span>Instalación y capacitación</span><i></i></div><div class="qt-row"><span>Plan de soporte · 12 meses</span><i></i></div><div class="qt-total"><span>Todo incluido</span><b>1 precio</b></div></div></div>`;
FLOW.training = () => `<div class="fa fa-training" aria-hidden="true"><div class="tr"><div class="tr-people"><span class="mk-avatar">SK</span><span class="mk-avatar">ML</span><span class="mk-avatar">JP</span><span class="mk-avatar">AR</span></div><div class="tr-list"><div class="ck-row" style="--i:0"><i>${I('check')}</i><span>Cobrar una venta y recibir el pago</span></div><div class="ck-row" style="--i:1"><i>${I('check')}</i><span>Aceptar un pedido en línea</span></div><div class="ck-row" style="--i:2"><i>${I('check')}</i><span>Cerrar el día y leer el reporte</span></div><div class="ck-row" style="--i:3"><i>${I('check')}</i><span>Qué hacer si algo se ve mal</span></div></div></div><div class="fa-bubble late">${I('graduation')}Equipo capacitado · guía entregada</div></div>`;
FLOW.support = () => `<div class="fa fa-support" aria-hidden="true"><div class="sp"><div class="bub me b1">La impresora de la cocina dejó de imprimir comandas.</div><div class="bub ai b2">Lo veo desde aquí. El sensor de papel estaba trabado; ya imprime de nuevo. ¿Me confirmas?</div><div class="bub me b3">Sí, ya funciona. ¡Gracias!</div><span class="mk-badge green sp-done">${I('check')}Resuelto en 6 minutos</span></div></div>`;
