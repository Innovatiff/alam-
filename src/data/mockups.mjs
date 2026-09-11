/**
 * Illustration & mockup library.  Everything is HTML/CSS (styles live in assets/css/site.css,
 * section "mockups"), so it stays crisp at any size and animates without images.
 * Call `mockups(lang)` to get the illustration functions for one language.
 */
const I = (n) => `<svg><use href="#i-${n}"/></svg>`;
const phone = (inner, cls = '') => `<div class="phone ${cls}"><div class="phone-screen"><div class="phone-notch"></div>${inner}</div></div>`;
const device = (inner, cls = '', url = '') =>
  `<div class="device ${cls}"><div class="device-bar"><i></i><i></i><i></i>${url ? `<span class="url">${url}</span>` : ''}</div>${inner}</div>`;
const lvl = (w, cls = '') => `<div class="lvl ${cls}"><i style="--w:${w}"></i></div>`;
const wave = (n = 7, cls = '') => `<div class="wave ${cls}">${Array.from({ length: n }, (_, i) => `<i style="--i:${i}"></i>`).join('')}</div>`;
const barcode = () => `<div class="barcode">${Array.from({ length: 14 }, (_, i) => `<i style="--w:${[1, 2, 1, 3, 1, 1, 2, 1, 1, 3, 1, 2, 1, 1][i]}"></i>`).join('')}</div>`;
const bars = (vals) => `<div class="bars">${vals.map((h, i) => `<i style="--h:${h}%;--i:${i}"></i>`).join('')}</div>`;

export const mockups = (lang = 'es') => {
  const x = (es, en) => (lang === 'en' ? en : es);
  const DAYS = x(['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'], ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']);

  /* ---------------------------------------------------------------- hero art */
  const HERO = {
    'website-ordering': () => `<div class="hero-art ha-order" aria-hidden="true">
    <div class="float p1">${phone(`
      <div class="os-head"><span class="os-logo"></span><b>La Fogata</b><span class="os-cart">${I('bag')}<i class="os-cnt">1</i></span></div>
      <div class="os-banner"><b>${x('Pide en línea', 'Order online')}</b><small>${x('Recoger en 15 min · A domicilio en 30 min', 'Pickup in 15 min · Delivery in 30 min')}</small></div>
      <div class="os-chips"><span class="on">Tacos</span><span>Burritos</span><span>${x('Bebidas', 'Drinks')}</span><span>${x('Postres', 'Desserts')}</span></div>
      <div class="os-item"><div class="os-img g1"></div><div><b>Tacos al pastor</b><small>${x('Orden de 3, piña y cilantro', 'Order of 3, pineapple and cilantro')}</small></div><span class="os-price">$12.50</span><span class="os-add a1">${I('plus')}</span></div>
      <div class="os-item"><div class="os-img g2"></div><div><b>Burrito de asada</b><small>${x('Frijol, arroz, queso', 'Beans, rice, cheese')}</small></div><span class="os-price">$14.00</span><span class="os-add">${I('plus')}</span></div>
      <div class="os-item"><div class="os-img g3"></div><div><b>Churros</b><small>${x('Con cajeta', 'With cajeta')}</small></div><span class="os-price">$6.00</span><span class="os-add">${I('plus')}</span></div>
      <div class="os-cartbar"><span>${x('1 platillo · $12.50', '1 item · $12.50')}</span><b>${x('Ver carrito', 'View cart')}</b></div>`)}</div>
    <div class="ha-card ha-neworder"><div class="title">${I('bell')}${x('Pedido nuevo', 'New order')} <b>#1043</b><span class="mk-badge blue">${x('Recoger 12:30', 'Pickup 12:30')}</span></div><div class="ha-line"><span>1 × Tacos al pastor</span><span>$12.50</span></div><div class="ha-line muted"><span>${x('Nota: sin cebolla, por favor', 'Note: no onions, please')}</span></div><div class="ha-accept"><span class="mk-btn a">${x('Aceptar pedido', 'Accept order')}</span><span class="mk-btn b green">${I('check')}${x('Aceptado', 'Accepted')}</span></div></div>
    <div class="ha-card ha-status"><div class="title">${I('clock')}${x('Pedido', 'Order')} #1043</div><div class="ha-steps"><div class="s s1"><i></i><span>${x('Recibido', 'Received')}</span></div><div class="s s2"><i></i><span>${x('Preparando', 'Preparing')}</span></div><div class="s s3"><i></i><span>${x('Listo', 'Ready')}</span></div></div></div>
    <div class="ha-card ha-notify"><div class="title">${I('message')}${x('SMS al cliente', 'Text to customer')}</div><p>${x('Hola Sara, tu pedido #1043 ya está listo para recoger. ¡Te esperamos!', 'Hi Sara, your order #1043 is ready for pickup. See you soon!')}</p></div>
  </div>`,

    'employee-management': () => `<div class="hero-art ha-staff" aria-hidden="true">
    <div class="float d1">${device(`
      <div class="sc"><div class="sc-head"><b>${x('Semana 37 · 8 al 14 de sep', 'Week 37 · Sep 8 to 14')}</b><span class="mk-btn">${x('Publicar', 'Publish')}</span></div>
      <div class="sc-grid">
        ${DAYS.slice(0, 5).map((d, c) => `<div class="sc-col"><span>${d}</span>${[0, 1, 2].map((r) => (c === 2 && r === 2) ? '<i class="sh open" style="--i:' + (c * 3 + r) + '">' + x('Turno libre', 'Open shift') + '</i>' : `<i class="sh c${(c + r) % 4}" style="--i:${c * 3 + r}">${['Sam K.', 'María L.', 'Juan P.', 'Ana R.'][(c + r) % 4]}</i>`).join('')}</div>`).join('')}
      </div></div>`, 'sc-device', x('personal.local / horarios', 'staff.local / schedule'))}</div>
    <div class="ha-card ha-clockin"><div class="title"><span class="mk-avatar">SK</span>Sam K. <small class="muted">· Barista</small></div><div class="ha-clockwrap"><span class="mk-btn a">${x('Marcar entrada', 'Clock in')}</span><span class="ha-onshift b"><i></i>${x('En turno desde las 08:58', 'On shift since 08:58')}</span></div></div>
    <div class="ha-card ha-leave"><div class="title">${I('calendar')}${x('Solicitud de permiso', 'Time-off request')}</div><p><b>María L.</b> · ${x('Vie 12 de sep · Día completo', 'Fri Sep 12 · Full day')}</p><div class="ha-leavebtns"><span class="a"><span class="mk-btn">${x('Aprobar', 'Approve')}</span><span class="mk-btn ghost">${x('Rechazar', 'Decline')}</span></span><span class="mk-badge green b">${I('check')}${x('Aprobado · horario actualizado', 'Approved · schedule updated')}</span></div></div>
  </div>`,

    'pos-system': () => `<div class="hero-art ha-pos" aria-hidden="true">
    <div class="float d1">${device(`
      <div class="pos"><div class="pos-grid">${[['Latte', '4.50', 'i1'], [x('Capuchino', 'Cappuccino'), '4.00', ''], ['Croissant', '3.20', 'i2'], ['Bagel', '3.80', ''], [x('Jugo', 'Juice'), '4.20', 'i3'], ['Muffin', '3.50', '']].map(([n, p, c]) => `<div class="pos-tile ${c}"><b>${n}</b><span>$${p}</span></div>`).join('')}</div>
      <div class="pos-cart"><div class="pc-head">${x('Venta', 'Sale')} #482 <span>${x('Caja 1', 'Register 1')}</span></div><div class="pc-item i1"><span>Latte</span><span>$4.50</span></div><div class="pc-item i2"><span>Croissant</span><span>$3.20</span></div><div class="pc-item i3"><span>${x('Jugo', 'Juice')}</span><span>$4.20</span></div><div class="pc-total"><span>Total</span><span class="pc-amt"><i class="t0">$0.00</i><i class="t1">$4.50</i><i class="t2">$7.70</i><i class="t3">$11.90</i></span></div><span class="mk-btn pc-charge">${x('Cobrar', 'Charge')} $11.90</span></div></div>`, 'pos-device')}</div>
    <div class="ha-card ha-reader"><div class="reader"><div class="reader-screen"><span class="r0">${x('Acerca o inserta la tarjeta', 'Tap or insert card')}</span><span class="r1"><i class="spin"></i>${x('Procesando…', 'Processing…')}</span><span class="r2">${I('check')}${x('Aprobado', 'Approved')}</span></div><div class="reader-slot"></div></div><div class="ha-line muted"><span>${x('Terminal de tarjeta', 'Card reader')}</span><span>$11.90</span></div></div>
    <div class="ha-printer"><div class="printer-head">${I('printer')}<span>${x('Impresora de recibos', 'Receipt printer')}</span></div><div class="paper"><b>Café Amanecer</b><span>Latte ............ $4.50</span><span>Croissant ....... $3.20</span><span>${x('Jugo', 'Juice')} ............. $4.20</span><b>Total ........... $11.90</b><small>${x('Pago con tarjeta · ¡Gracias!', 'Paid by card · Thank you!')}</small></div></div>
  </div>`,

    'ai-receptionist': () => `<div class="hero-art ha-ai" aria-hidden="true">
    <div class="float p1">${phone(`
      <div class="call">
        <div class="call-in"><div class="call-avatar"><i></i><i></i>${I('user')}</div><b>${x('Llamada entrante', 'Incoming call')}</b><small>Emma · +1 555 0134</small><div class="call-btns"><span class="red">${I('phone-off')}</span><span class="green">${I('phone')}</span></div></div>
        <div class="call-on"><div class="call-ai">${I('headset')}</div><b>${x('Recepcionista IA', 'AI receptionist')}</b><small>${x('Contestando por Salón Flor', 'Answering for Salón Flor')}</small>${wave(9)}<small class="call-timer">${x('Escuchando…', 'Listening…')}</small></div>
      </div>`)}</div>
    <div class="ha-card ha-transcript"><div class="title">${I('message')}${x('Transcripción en vivo', 'Live transcript')}</div>
      <div class="bub ai b1">${x('Gracias por llamar a Salón Flor, ¿en qué puedo ayudarte?', 'Thanks for calling Salón Flor, how can I help?')}</div>
      <div class="bub me b2">${x('Quisiera un corte el martes por la tarde.', 'I would like a haircut Tuesday afternoon.')}</div>
      <div class="bub ai b3">${x('El martes a las 2:30 pm está libre. ¿Te lo agendo?', 'Tuesday at 2:30 pm is open. Shall I book it?')}</div>
      <div class="bub me b4">${x('Sí, por favor.', 'Yes, please.')}</div>
    </div>
    <div class="ha-card ha-cal"><div class="title">${I('calendar')}${x('Martes 16 de sep', 'Tuesday Sep 16')}</div><div class="cal-rows"><div class="cal-row"><span>13:30</span><i></i></div><div class="cal-row"><span>14:30</span><b class="cal-appt">${x('Corte · Emma', 'Haircut · Emma')}</b></div><div class="cal-row"><span>15:30</span><i></i></div></div></div>
    <div class="ha-card ha-summary"><div class="title">${I('check')}${x('Resumen enviado a tu celular', 'Summary sent to your phone')}</div><p>${x('Emma agendó un corte el martes a las 2:30 pm. SMS de confirmación enviado.', 'Emma booked a haircut Tuesday at 2:30 pm. Confirmation text sent.')}</p></div>
  </div>`,

    'inventory-software': () => `<div class="hero-art ha-inv" aria-hidden="true">
    <div class="float d1">${device(`
      <div class="inv"><div class="inv-head"><b>${x('Existencias', 'Stock')}</b><span class="mk-badge red inv-alert">${I('alert')}${x('1 producto bajo', '1 item low')}</span></div>
      <div class="inv-row"><span>${x('Café en grano 1 kg', 'Coffee beans 1 kg')}</span>${lvl('78%')}<b>39</b></div>
      <div class="inv-row"><span>${x('Leche de avena 1 L', 'Oat milk 1 L')}</span><div class="lvl drain"><i></i></div><b class="inv-cnt"><i class="c0">24</i><i class="c1">3</i><i class="c2">27</i></b></div>
      <div class="inv-row"><span>${x('Croissants (congelados)', 'Croissants (frozen)')}</span>${lvl('62%')}<b>124</b></div>
      <div class="inv-row"><span>${x('Vasos 12 oz', 'Cups 12 oz')}</span>${lvl('90%')}<b>900</b></div>
      <div class="inv-row"><span>${x('Bolsas de papel', 'Paper bags')}</span>${lvl('45%')}<b>450</b></div></div>`, 'inv-device', x('inventario.local / existencias', 'inventory.local / stock'))}</div>
    <div class="ha-card ha-scan"><div class="scanbox">${barcode()}<div class="beam"></div></div><div class="ha-line"><span>${x('Recibiendo entrega', 'Receiving delivery')}</span><b class="mk-badge green">+24 ${x('Leche de avena', 'Oat milk')}</b></div></div>
    <div class="ha-card ha-po"><div class="title">${I('file')}${x('Orden de compra OC-218', 'Purchase order PO-218')}</div><div class="ha-line"><span>${x('Leche de avena 1 L × 48', 'Oat milk 1 L × 48')}</span><span>$62.40</span></div><div class="ha-line muted"><span>${x('Proveedor: Lácteos del Norte', 'Supplier: Northern Dairy')}</span></div><span class="mk-badge blue" style="margin-top:6px">${I('check')}${x('Enviada por correo', 'Sent by email')}</span></div>
  </div>`,

    'custom-software': () => `<div class="hero-art ha-custom" aria-hidden="true">
    <div class="blueprint"></div>
    <div class="float d1">${device(`
      <div class="app"><div class="app-side"><i></i><i></i><i></i><i></i><i></i></div><div class="app-main"><div class="slot s1"></div><div class="slot s2"></div><div class="slot s3"></div><div class="slot s4"></div></div></div>`, 'custom-device', x('tunegocio.local', 'yourbusiness.local'))}</div>
    <div class="mod m1">${I('calendar')}<span>${x('Citas', 'Bookings')}</span></div>
    <div class="mod m2">${I('file')}<span>${x('Facturas', 'Invoices')}</span></div>
    <div class="mod m3">${I('users')}<span>${x('Clientes', 'Customers')}</span></div>
    <div class="mod m4">${I('bar-chart')}<span>${x('Reportes', 'Reports')}</span></div>
    <svg class="mod-lines" viewBox="0 0 560 460"><path d="M215 165 H335 M215 275 H335 M275 165 V275" /></svg>
    <div class="ha-card ha-tailored"><div class="title">${I('sparkles')}${x('Tu sistema', 'Your system')}</div><p>${x('4 módulos · construido alrededor de tu proceso · instalado en tu local', '4 modules · built around your process · installed on site')}</p></div>
  </div>`,
  };

  const heroArt = (slug, thumb = false) => {
    const fn = HERO[slug];
    if (!fn) return '';
    return thumb ? `<div class="thumb">${fn()}</div>` : fn();
  };

  /* ---------------------------------------------------------------- flow art */
  const FLOW = {
    'phone-order': () => `<div class="fa fa-phone" aria-hidden="true"><div class="mini-phone"><div class="mp-bar"></div><div class="mp-item"><i class="g1"></i><span></span><b>+</b></div><div class="mp-item"><i class="g2"></i><span></span><b class="press">+</b></div><div class="mp-item"><i class="g3"></i><span></span><b>+</b></div><div class="mp-cta">${x('Pagar', 'Pay')} · $18.50</div></div><div class="fa-bubble">${I('check')}${x('Pedido realizado', 'Order placed')}</div></div>`,
    ticket: () => `<div class="fa fa-ticket" aria-hidden="true"><div class="tk-printer">${I('printer')}<span>${x('Impresora del mostrador', 'Counter printer')}</span></div><div class="tk-paper"><b>${x('PEDIDO', 'ORDER')} #1043</b><span>${x('Recoger', 'Pickup')} · 12:30</span><span>1 × Tacos al pastor</span><span>1 × Churros</span><b>Total $18.50</b></div></div>`,
    status: () => `<div class="fa fa-status" aria-hidden="true"><div class="st-line"><div class="st s1"><i></i><span>${x('Recibido', 'Received')}</span></div><div class="st s2"><i></i><span>${x('Preparando', 'Preparing')}</span></div><div class="st s3"><i></i><span>${x('Listo', 'Ready')}</span></div></div><div class="fa-bubble late">${I('message')}"${x('Tu pedido está listo', 'Your order is ready')}"</div></div>`,
    report: () => `<div class="fa fa-report" aria-hidden="true"><div class="rp"><small>${x('Ventas de la semana', 'Sales this week')}</small>${bars([40, 55, 48, 70, 62, 90, 78])}</div><div class="rp-list"><div><span>Tacos al pastor</span><b>128</b></div><div><span>Burrito de asada</span><b>96</b></div><div><span>Churros</span><b>74</b></div></div></div>`,
    team: () => `<div class="fa fa-team" aria-hidden="true">${[['SK', 'Sam K.', 'Barista', '$16.50/h'], ['ML', 'María L.', x('Encargada', 'Manager'), '$22.00/h'], ['JP', 'Juan P.', x('Cocinero', 'Cook'), '$18.00/h'], ['AR', 'Ana R.', x('Mesera', 'Server'), '$15.00/h']].map(([i, n, r, p], k) => `<div class="tm-row" style="--i:${k}"><span class="mk-avatar">${i}</span><div><b>${n}</b><small>${r}</small></div><em>${p}</em></div>`).join('')}</div>`,
    schedule: () => `<div class="fa fa-sched" aria-hidden="true"><div class="sg">${DAYS.slice(0, 6).map((d, c) => `<div class="sg-col"><span>${d}</span>${[0, 1].map((r) => `<i class="sh c${(c + r) % 4}" style="--i:${c * 2 + r}"></i>`).join('')}</div>`).join('')}</div></div>`,
    clock: () => `<div class="fa fa-clock" aria-hidden="true"><div class="kp"><div class="kp-dots"><i></i><i></i><i></i><i></i></div><div class="kp-keys">${[1, 2, 3, 4, 5, 6, 7, 8, 9].map((k) => `<span class="${k === 4 || k === 8 || k === 2 || k === 9 ? 'hit' : ''}">${k}</span>`).join('')}</div></div><div class="fa-bubble">${I('check')}${x('Sam marcó entrada a las 08:58', 'Sam clocked in at 08:58')}</div></div>`,
    export: () => `<div class="fa fa-export" aria-hidden="true"><div class="ts"><div class="ts-row h"><span>${x('Empleado', 'Employee')}</span><span>${x('Horas', 'Hours')}</span><span>${x('Pago', 'Pay')}</span></div><div class="ts-row"><span>Sam K.</span><span>38.5</span><span>$635</span></div><div class="ts-row"><span>María L.</span><span>40.0</span><span>$880</span></div><div class="ts-row"><span>Juan P.</span><span>32.0</span><span>$576</span></div></div><div class="fa-bubble">${I('download')}${x('horas_semana37.xlsx', 'hours_week37.xlsx')}</div></div>`,
    install: () => `<div class="fa fa-install" aria-hidden="true"><div class="ck"><b>${I('wrench')}${x('Día de instalación', 'Install day')}</b>${[x('Montar terminal e impresora', 'Mount terminal and printer'), x('Conectar cajón y lector', 'Connect drawer and scanner'), x('Configurar red y respaldos', 'Set up network and backups'), x('Importar productos y precios', 'Import products and prices'), x('Imprimir recibos de prueba y capacitar', 'Print test receipts and train')].map((t, i) => `<div class="ck-row" style="--i:${i}"><i>${I('check')}</i><span>${t}</span></div>`).join('')}</div></div>`,
    products: () => `<div class="fa fa-products" aria-hidden="true"><div class="sheet">${[0, 1, 2, 3, 4].map((i) => `<div class="sheet-row" style="--i:${i}"><i></i><i></i><i></i></div>`).join('')}</div><div class="fa-arrow">${I('arrow-right')}</div><div class="ptiles">${[['Latte', '4.50'], ['Bagel', '3.80'], [x('Jugo', 'Juice'), '4.20'], ['Muffin', '3.50']].map(([n, p], i) => `<div class="ptile" style="--i:${i}"><b>${n}</b><span>$${p}</span></div>`).join('')}</div></div>`,
    sale: () => `<div class="fa fa-sale" aria-hidden="true"><div class="sl-grid">${['Latte', 'Bagel', x('Jugo', 'Juice'), 'Muffin', x('Té', 'Tea'), x('Galleta', 'Cookie')].map((n, i) => `<span class="${i < 3 ? 'hit' : ''}" style="--i:${i}">${n}</span>`).join('')}</div><div class="sl-cart"><span>${x('3 productos', '3 items')}</span><b>$11.90</b><i class="mk-btn">${x('Cobrar', 'Charge')}</i></div></div>`,
    eod: () => `<div class="fa fa-eod" aria-hidden="true"><div class="eod"><b>${x('Cierre del día · Mié 10 de sep', 'End of day · Wed Sep 10')}</b><div class="eod-row"><span>${x('Efectivo', 'Cash')}</span>${lvl('28%')}<b>$412</b></div><div class="eod-row"><span>${x('Tarjeta', 'Card')}</span>${lvl('82%')}<b>$1,238</b></div><div class="eod-row"><span>${x('En línea', 'Online')}</span>${lvl('40%')}<b>$596</b></div><div class="eod-total"><span>Total</span><b>$2,246</b></div></div></div>`,
    call: () => `<div class="fa fa-call" aria-hidden="true"><div class="ring"><i></i><i></i><i></i>${I('phone')}</div><div class="fa-bubble late">${I('arrow-right')}${x('Desviada a la recepcionista IA', 'Forwarded to the AI receptionist')}</div></div>`,
    answer: () => `<div class="fa fa-answer" aria-hidden="true">${wave(11, 'big')}<div class="bub ai">${x('Gracias por llamar. ¿En qué puedo ayudarte hoy?', 'Thanks for calling. How can I help you today?')}</div></div>`,
    calendar: () => `<div class="fa fa-cal" aria-hidden="true"><div class="cal7">${DAYS.slice(0, 5).map((d, c) => `<div class="cal-col"><span>${d}</span><i></i><i class="${c === 1 ? 'appt' : ''}">${c === 1 ? 'Emma 14:30' : ''}</i><i></i></div>`).join('')}</div></div>`,
    summary: () => `<div class="fa fa-summary" aria-hidden="true"><div class="sms"><div class="sms-h">${I('message')}SMS · ${x('ahora', 'now')}</div><p>${x('Nueva cita: Emma, corte, martes 2:30 pm. Transcripción en tu panel.', 'New booking: Emma, haircut, Tuesday 2:30 pm. Transcript in your dashboard.')}</p></div><div class="log"><div><i class="ok"></i><span>Emma · ${x('Cita', 'Booking')}</span><b>2:14</b></div><div><i class="ok"></i><span>${x('Desconocido · Horarios', 'Unknown · Hours')}</span><b>0:41</b></div><div><i class="msg"></i><span>Marco · ${x('Recado', 'Message')}</span><b>1:05</b></div></div></div>`,
    stock: () => `<div class="fa fa-stock" aria-hidden="true"><div class="stk-row"><span>${x('Café en grano', 'Coffee beans')}</span>${lvl('78%')}<b>39</b></div><div class="stk-row"><span>${x('Leche de avena', 'Oat milk')}</span><div class="lvl drain"><i></i></div><b class="red">3</b></div><div class="stk-row"><span>Croissants</span>${lvl('62%')}<b>124</b></div><div class="stk-row"><span>${x('Vasos 12 oz', 'Cups 12 oz')}</span>${lvl('90%')}<b>900</b></div></div>`,
    alert: () => `<div class="fa fa-alert" aria-hidden="true"><div class="ro"><b>${I('bell')}${x('Lista de reorden', 'Reorder list')}</b><div class="ro-row"><span>${x('Leche de avena 1 L', 'Oat milk 1 L')}</span><em>3 / ${x('mín', 'min')} 12</em></div><div class="ro-row"><span>${x('Vasos 8 oz', 'Cups 8 oz')}</span><em>40 / ${x('mín', 'min')} 100</em></div><span class="mk-btn press2">${x('Crear orden de compra', 'Create purchase order')}</span><span class="mk-badge green sent">${I('check')}${x('OC-218 enviada al proveedor', 'PO-218 sent to supplier')}</span></div></div>`,
    scan: () => `<div class="fa fa-scan" aria-hidden="true"><div class="scanbox big">${barcode()}<div class="beam"></div></div><div class="fa-bubble">${I('plus')}${x('24 unidades recibidas', '24 units received')}</div></div>`,
    workshop: () => `<div class="fa fa-workshop" aria-hidden="true"><div class="wk"><div class="wk-node n1">${x('Llama el cliente', 'Customer calls')}</div><div class="wk-node n2">${x('Cotización', 'Quote')}</div><div class="wk-node n3">${x('Trabajo agendado', 'Job scheduled')}</div><div class="wk-node n4">${x('Factura pagada', 'Invoice paid')}</div><svg class="wk-lines" viewBox="0 0 320 150"><path d="M90 40 H118" /><path d="M160 58 V76 H50 V94" /><path d="M102 110 H232" /></svg></div></div>`,
    prototype: () => `<div class="fa fa-proto" aria-hidden="true"><div class="wf"><div class="wf-bar"><i></i><i></i><i></i></div><div class="wf-body"><div class="wf-side"><i></i><i></i><i></i></div><div class="wf-main"><i></i><i></i><i></i><i class="wide"></i></div></div></div><div class="fa-bubble">${I('eye')}${x('Prototipo navegable', 'Clickable prototype')}</div></div>`,
    build: () => `<div class="fa fa-build" aria-hidden="true"><div class="stg"><div class="stg-row"><span>${x('Etapa 1 · Citas', 'Stage 1 · Bookings')}</span>${lvl('100%')}<b class="green">${x('En uso', 'In use')}</b></div><div class="stg-row"><span>${x('Etapa 2 · Facturación', 'Stage 2 · Invoicing')}</span>${lvl('70%')}<b>70 %</b></div><div class="stg-row"><span>${x('Etapa 3 · Reportes', 'Stage 3 · Reports')}</span>${lvl('15%')}<b>${x('Sigue', 'Next')}</b></div></div></div>`,
    quote: () => `<div class="fa fa-quote" aria-hidden="true"><div class="qt"><div class="qt-h"><b>${x('Cotización · Café Amanecer', 'Quote · Café Amanecer')}</b><span class="mk-badge green">${x('Precio fijo', 'Fixed price')}</span></div><div class="qt-row"><span>${x('Terminal POS, impresora, cajón', 'POS terminal, printer, drawer')}</span><i></i></div><div class="qt-row"><span>${x('Software POS + inventario', 'POS + inventory software')}</span><i></i></div><div class="qt-row"><span>${x('Instalación y capacitación', 'Installation and training')}</span><i></i></div><div class="qt-row"><span>${x('Plan de soporte · 12 meses', 'Support plan · 12 months')}</span><i></i></div><div class="qt-total"><span>${x('Todo incluido', 'All included')}</span><b>${x('1 precio', '1 price')}</b></div></div></div>`,
    training: () => `<div class="fa fa-training" aria-hidden="true"><div class="tr"><div class="tr-people"><span class="mk-avatar">SK</span><span class="mk-avatar">ML</span><span class="mk-avatar">JP</span><span class="mk-avatar">AR</span></div><div class="tr-list"><div class="ck-row" style="--i:0"><i>${I('check')}</i><span>${x('Cobrar una venta', 'Ring up a sale')}</span></div><div class="ck-row" style="--i:1"><i>${I('check')}</i><span>${x('Aceptar un pedido en línea', 'Accept an online order')}</span></div><div class="ck-row" style="--i:2"><i>${I('check')}</i><span>${x('Cerrar el día', 'Close the day')}</span></div><div class="ck-row" style="--i:3"><i>${I('check')}</i><span>${x('Qué hacer si algo falla', 'What to do if something breaks')}</span></div></div></div><div class="fa-bubble late">${I('graduation')}${x('Equipo capacitado', 'Team trained')}</div></div>`,
    support: () => `<div class="fa fa-support" aria-hidden="true"><div class="sp"><div class="bub me b1">${x('La impresora de la cocina dejó de imprimir.', 'The kitchen printer stopped printing.')}</div><div class="bub ai b2">${x('Lo veo desde aquí. El sensor de papel estaba trabado; ya imprime de nuevo.', 'I can see it from here. The paper sensor was stuck; it is printing again.')}</div><div class="bub me b3">${x('Sí, ya funciona. ¡Gracias!', 'Yes, it works. Thanks!')}</div><span class="mk-badge green sp-done">${I('check')}${x('Resuelto en 6 minutos', 'Solved in 6 minutes')}</span></div></div>`,
  };
  const flowArt = (key) => (FLOW[key] ? FLOW[key]() : '');
  const MINI = { 'website-ordering': 'phone-order', 'employee-management': 'schedule', 'pos-system': 'sale', 'ai-receptionist': 'answer', 'inventory-software': 'stock', 'custom-software': 'workshop' };
  const miniArt = (slug) => (MINI[slug] ? flowArt(MINI[slug]) : '');

  /* ---------------------------------------------------------------- home dashboard */
  const dashboard = (site) => `<div class="dash device" data-tilt="3" aria-hidden="true">
  <aside class="dash-side">
    <div class="dash-brand"><i></i><span>${site.name} ${x('Panel', 'Dashboard')}</span></div>
    <nav class="dash-nav">
      <a class="on">${I('home')}${x('Panel', 'Dashboard')}</a><a>${I('pos')}${x('Ventas', 'Sales')}</a><a>${I('bag')}${x('Pedidos en línea', 'Online orders')}</a><a>${I('users')}${x('Personal', 'Staff')}</a><a>${I('boxes')}${x('Inventario', 'Inventory')}</a><a>${I('headset')}${x('Llamadas', 'Calls')}</a>
    </nav>
    <div class="dash-nav-title">${x('Cuenta', 'Account')}</div>
    <nav class="dash-nav"><a>${I('user')}${x('Perfil', 'Profile')}</a><a>${I('settings')}${x('Ajustes', 'Settings')}</a></nav>
    <div class="dash-onsite">${I('server')}<span>${x('Corriendo en tu local', 'Running on site')}<br><small>${x('Servidor de la oficina · en línea', 'Office server · online')}</small></span></div>
  </aside>
  <div class="dash-main">
    <div class="dash-top"><div><small>${x('Inicio / Panel', 'Home / Dashboard')}</small><b>${x('Panel', 'Dashboard')}</b></div><div class="dash-search">${I('search')}<span>${x('Buscar…', 'Search…')}</span></div><div class="dash-icons">${I('bell')}${I('user')}</div></div>
    <div class="dash-stats">
      <div class="mk-tile"><small>${x('Ventas de hoy', 'Sales today')}</small><b><span data-count="2840" data-prefix="$">0</span></b><span class="mk-up">+12 %</span><i class="grad-blue">${I('pos')}</i></div>
      <div class="mk-tile"><small>${x('Pedidos en línea', 'Online orders')}</small><b><span data-count="38">0</span></b><span class="mk-up">+8 %</span><i class="grad-indigo">${I('globe')}</i></div>
      <div class="mk-tile"><small>${x('Personal en turno', 'Staff on shift')}</small><b><span data-count="6">0</span></b><span class="mk-up">${x('de 9', 'of 9')}</span><i class="grad-violet">${I('users')}</i></div>
      <div class="mk-tile"><small>${x('Stock bajo', 'Low stock')}</small><b><span data-count="3">0</span></b><span class="mk-down">${x('atender', 'to reorder')}</span><i class="grad-cyan">${I('boxes')}</i></div>
    </div>
    <div class="dash-row">
      <div class="dash-welcome"><small>${x('Bienvenido de nuevo', 'Welcome back')}</small><b>${x('Tu negocio de un vistazo', 'Your business at a glance')}</b><p>${x('Ventas, pedidos, personal e inventario en un solo lugar.', 'Sales, orders, staff and inventory in one place.')}</p><span>${x('Todo está al día', 'Everything is up to date')}</span></div>
      <div class="dash-card"><small>${x('Llamadas contestadas por la IA', 'Calls answered by the AI')}</small><div class="gauge"><svg viewBox="0 0 120 120"><defs><linearGradient id="gauge-grad" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#60a5fa"/><stop offset="1" stop-color="#a78bfa"/></linearGradient></defs><circle class="track" cx="60" cy="60" r="50"/><circle class="val" cx="60" cy="60" r="50" style="--v:.96"/></svg><b>96 %<small>${x('esta semana', 'this week')}</small></b></div><em>${x('0 llamadas perdidas', '0 missed calls')}</em></div>
      <div class="dash-card"><small>${x('Salud del inventario', 'Inventory health')}</small><div class="gauge"><svg viewBox="0 0 120 120"><circle class="track" cx="60" cy="60" r="50"/><circle class="val" cx="60" cy="60" r="50" style="--v:.93"/></svg><b>9.3<small>${x('puntaje', 'score')}</small></b></div><em>${x('3 productos por pedir', '3 items to reorder')}</em></div>
    </div>
    <div class="dash-row two">
      <div class="dash-card left"><small>${x('Ventas · últimos 7 días', 'Sales · last 7 days')}</small>${bars([45, 62, 55, 78, 70, 95, 84])}<div class="dash-days">${[3, 4, 5, 6, 0, 1, 2].map((d) => `<span>${DAYS[d]}</span>`).join('')}</div></div>
      <div class="dash-card left"><small>${x('Pedidos recientes', 'Recent orders')}</small><div class="dash-list"><div><span class="mk-avatar">SB</span><span>Sara B. · ${x('Recoger', 'Pickup')}</span><b>$21.50</b><em class="mk-badge green">${x('Listo', 'Ready')}</em></div><div><span class="mk-avatar">TK</span><span>Tomás K. · ${x('A domicilio', 'Delivery')}</span><b>$38.00</b><em class="mk-badge amber">${x('Preparando', 'Preparing')}</em></div><div><span class="mk-avatar">LM</span><span>Lena M. · ${x('Recoger', 'Pickup')}</span><b>$14.50</b><em class="mk-badge blue">${x('Nuevo', 'New')}</em></div></div></div>
    </div>
  </div>
</div>`;

  /* ---------------------------------------------------------------- hero hub network */
  const network = () => {
    const W = 800, H = 330, cx = 400, cy = 160;
    const nodes = [
      { x: 118, y: 58, icon: 'globe', label: x('Sitio web y pedidos', 'Website & ordering'), c: 'grad-blue', fx: '-120px', fy: '-60px', d: 150 },
      { x: 62, y: 160, icon: 'pos', label: x('Punto de venta', 'Point of sale'), c: 'grad-violet', fx: '-140px', fy: '0', d: 300 },
      { x: 118, y: 262, icon: 'users', label: x('Personal', 'Staff'), c: 'grad-indigo', fx: '-120px', fy: '60px', d: 450 },
      { x: 682, y: 58, icon: 'headset', label: x('Recepcionista IA', 'AI receptionist'), c: 'grad-cyan', fx: '120px', fy: '-60px', d: 225 },
      { x: 738, y: 160, icon: 'boxes', label: x('Inventario', 'Inventory'), c: 'grad-sky', fx: '140px', fy: '0', d: 375 },
      { x: 682, y: 262, icon: 'sparkles', label: x('A la medida', 'Custom'), c: 'grad-fuchsia', fx: '120px', fy: '60px', d: 525 },
    ];
    const paths = [
      `M118 58 C 230 58, 262 ${cy}, 350 ${cy}`, `M62 160 C 170 160, 250 ${cy}, 350 ${cy}`, `M118 262 C 230 262, 262 ${cy}, 350 ${cy}`,
      `M682 58 C 570 58, 538 ${cy}, 450 ${cy}`, `M738 160 C 630 160, 550 ${cy}, 450 ${cy}`, `M682 262 C 570 262, 538 ${cy}, 450 ${cy}`,
    ];
    return `<div class="net-wrap hub-wrap" data-reveal="none"><div class="net hub-net" data-w="${W}" data-h="${H}">
    <svg class="lines" viewBox="0 0 ${W} ${H}" fill="none">
      <defs>
        <linearGradient id="net-grad" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="${W}" y2="0"><stop offset="0" stop-color="#60a5fa"/><stop offset=".5" stop-color="#c4b5fd"/><stop offset="1" stop-color="#60a5fa"/></linearGradient>
        <radialGradient id="hub-glow" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="#4f46e5" stop-opacity=".55"/><stop offset=".55" stop-color="#3b82f6" stop-opacity=".12"/><stop offset="1" stop-color="#000" stop-opacity="0"/></radialGradient>
      </defs>
      <ellipse class="hub-halo" cx="${cx}" cy="${cy}" rx="300" ry="170" fill="url(#hub-glow)"/>
      <circle class="orbit o1" cx="${cx}" cy="${cy}" r="112"/><circle class="orbit o2" cx="${cx}" cy="${cy}" r="196"/><circle class="orbit o3" cx="${cx}" cy="${cy}" r="290"/>
      <circle class="orbit dash" cx="${cx}" cy="${cy}" r="74"/>
      ${paths.map((d, i) => `<path id="np${i}" class="line" d="${d}"/>`).join('')}
      ${paths.map((d, i) => `<circle class="pulse" r="3.4"><animateMotion dur="${2.4 + (i % 3) * 0.45}s" begin="${(i * 0.4).toFixed(2)}s" repeatCount="indefinite"><mpath href="#np${i}"/></animateMotion></circle><circle class="pulse tail" r="6"><animateMotion dur="${2.4 + (i % 3) * 0.45}s" begin="${(i * 0.4 + 0.05).toFixed(2)}s" repeatCount="indefinite"><mpath href="#np${i}"/></animateMotion></circle>`).join('')}
    </svg>
    ${nodes.map((n) => `<div class="node ${n.c}" style="left:${n.x - 32}px;top:${n.y - 32}px;--fx:${n.fx};--fy:${n.fy};--d:${n.d}ms">${I(n.icon)}<small>${n.label}</small></div>`).join('')}
    <div class="node hub" style="left:${cx - 50}px;top:${cy - 50}px;--d:0ms;--fx:0;--fy:24px"><i class="hub-ring r1"></i><i class="hub-ring r2"></i><svg viewBox="0 0 32 32" fill="none" aria-hidden="true"><path d="M16 12.5v11" stroke="#fff" stroke-width="4.2" stroke-linecap="round"/><circle cx="16" cy="7.4" r="2.5" fill="#fff"/><path d="M23.2 5.2l.7 1.9 1.9.7-1.9.7-.7 1.9-.7-1.9-1.9-.7 1.9-.7.7-1.9z" fill="#c7d2fe"/></svg><small>${x('Un solo sistema · en tu local', 'One system · on site')}</small></div>
  </div></div>`;
  };

  /* ---------------------------------------------------------------- on-site diagram */
  const onsiteArt = () => `<div class="net-wrap onsite-wrap" data-reveal="none"><div class="net onsite-net" data-w="560" data-h="380">
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
  <div class="node center" style="left:238px;top:163px;width:84px;height:84px;--d:0ms;--fx:0;--fy:20px">${I('server')}<small>${x('Servidor local', 'Local server')}</small></div>
  <div class="node grad-violet" style="left:141px;top:211px;--fx:-80px;--fy:0;--d:200ms">${I('pos')}<small>POS</small></div>
  <div class="node grad-indigo" style="left:361px;top:211px;--fx:80px;--fy:0;--d:300ms">${I('tablet')}<small>${x('Tableta de entrada', 'Clock-in tablet')}</small></div>
  <div class="node grad-blue" style="left:146px;top:286px;--fx:-80px;--fy:40px;--d:400ms">${I('printer')}<small>${x('Impresoras', 'Printers')}</small></div>
  <div class="node grad-cyan" style="left:356px;top:286px;--fx:80px;--fy:40px;--d:500ms">${I('headset')}<small>${x('Panel de llamadas', 'Call dashboard')}</small></div>
  <div class="node glass" style="left:441px;top:31px;--fx:40px;--fy:-40px;--d:650ms">${I('globe')}<small>${x('Internet · sincronización opcional', 'Internet · optional sync')}</small></div>
  <div class="onsite-badge b1">${I('wifi-off')}${x('Sigue funcionando sin internet', 'Keeps working without internet')}</div>
  <div class="onsite-badge b2">${I('lock')}${x('Tus datos se quedan aquí', 'Your data stays here')}</div>
</div></div>`;

  return { heroArt, flowArt, miniArt, dashboard, network, onsiteArt };
};

/* Spanish defaults, kept for any legacy import */
const es = mockups('es');
export const heroArt = es.heroArt;
export const flowArt = es.flowArt;
export const miniArt = es.miniArt;
export const dashboard = es.dashboard;
export const network = es.network;
export const onsiteArt = es.onsiteArt;
export const waves = () => '';
