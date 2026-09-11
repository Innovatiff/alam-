(() => {
  const { $, $$, money, toast, modal, views, icon, time, esc, tour } = window.Demo;

  const PRODUCTS = [
    { id: 1, cat: 'Café', name: 'Espresso', price: 3.2, bc: '5001' }, { id: 2, cat: 'Café', name: 'Latte', price: 4.5, bc: '5002' }, { id: 3, cat: 'Café', name: 'Capuchino', price: 4.2, bc: '5003' }, { id: 4, cat: 'Café', name: 'Flat white', price: 4.4, bc: '5004' }, { id: 5, cat: 'Café', name: 'Latte frío', price: 5, bc: '5005' },
    { id: 6, cat: 'Comida', name: 'Croissant', price: 3.2, bc: '5011' }, { id: 7, cat: 'Comida', name: 'Bagel con queso crema', price: 5.5, bc: '5012' }, { id: 8, cat: 'Comida', name: 'Tostada de aguacate', price: 9.5, bc: '5013' }, { id: 9, cat: 'Comida', name: 'Muffin de arándano', price: 3.5, bc: '5014' }, { id: 10, cat: 'Comida', name: 'Bowl de granola', price: 8, bc: '5015' },
    { id: 11, cat: 'Bebidas', name: 'Jugo de naranja natural', price: 4.8, bc: '5021' }, { id: 12, cat: 'Bebidas', name: 'Agua mineral', price: 2.5, bc: '5022' }, { id: 13, cat: 'Bebidas', name: 'Té helado', price: 3.8, bc: '5023' },
    { id: 14, cat: 'Tienda', name: 'Café en grano 250 g', price: 14, bc: '5031' }, { id: 15, cat: 'Tienda', name: 'Vaso reutilizable', price: 18, bc: '5032' }, { id: 16, cat: 'Tienda', name: 'Tarjeta de regalo $25', price: 25, bc: '5033' },
  ];
  const CATS = ['Todo', 'Café', 'Comida', 'Bebidas', 'Tienda'];
  const TAX = 0.13;
  let cat = 'Todo', query = '';
  const cart = [];
  let discount = { type: 'pct', value: 0 };
  let saleNo = 483;
  const sales = [];
  const rnd = (n) => Math.floor(Math.random() * n);
  for (let i = 0; i < 26; i++) {
    const items = Array.from({ length: 1 + rnd(3) }, () => { const p = PRODUCTS[rnd(PRODUCTS.length)]; return { id: p.id, qty: 1 + rnd(2) }; });
    const sub = items.reduce((s, it) => s + PRODUCTS.find((p) => p.id === it.id).price * it.qty, 0);
    const h = 7 + Math.floor(i / 3), m = rnd(60);
    sales.push({ no: 456 + i, at: `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`, items, subtotal: sub, discount: 0, tax: sub * TAX, total: sub * (1 + TAX), pay: ['Tarjeta', 'Tarjeta', 'Efectivo', 'Tarjeta', 'Efectivo'][rnd(5)], synced: true });
  }

  const totals = () => {
    const subtotal = cart.reduce((s, it) => s + PRODUCTS.find((p) => p.id === it.id).price * it.qty, 0);
    const disc = discount.type === 'pct' ? subtotal * discount.value / 100 : Math.min(subtotal, discount.value);
    const taxable = subtotal - disc; const tax = taxable * TAX;
    return { subtotal, disc, tax, total: taxable + tax, count: cart.reduce((s, it) => s + it.qty, 0) };
  };

  /* ---------- productos ---------- */
  const renderCats = () => {
    $('#pos-cats').innerHTML = CATS.map((c) => `<button type="button" class="${c === cat ? 'on' : ''}" data-cat="${c}">${c}</button>`).join('');
    $$('#pos-cats button').forEach((b) => b.addEventListener('click', () => { cat = b.dataset.cat; renderCats(); renderProducts(); }));
  };
  const renderProducts = () => {
    const list = PRODUCTS.filter((p) => (cat === 'Todo' || p.cat === cat) && (!query || p.name.toLowerCase().includes(query) || p.bc.includes(query)));
    $('#pos-products').innerHTML = list.map((p, i) => `<button type="button" class="pos-product c${p.id % 6}" data-id="${p.id}" style="--i:${i}"><span class="pp-cat">${p.cat}</span><b>${p.name}</b><span class="pp-price">${money(p.price)}</span></button>`).join('') || '<div class="empty">Ningún producto coincide.</div>';
    $$('#pos-products .pos-product').forEach((b) => b.addEventListener('click', () => add(+b.dataset.id)));
  };
  const add = (id) => { const line = cart.find((c) => c.id === id); if (line) line.qty += 1; else cart.push({ id, qty: 1 }); renderCart(id); };
  $('#pos-search').addEventListener('input', (e) => { query = e.target.value.trim().toLowerCase(); renderProducts(); });
  $('#pos-search').addEventListener('keydown', (e) => {
    if (e.key !== 'Enter') return;
    const p = PRODUCTS.find((x) => x.bc === query);
    if (p) { add(p.id); toast(`Escaneado: ${p.name}`, `Código ${p.bc} · ${money(p.price)}`, 'info', 'scan'); e.target.value = ''; query = ''; renderProducts(); }
    else toast('No hay producto con ese código', 'Prueba 5012 para un bagel.', 'warn', 'alert');
  });

  /* ---------- venta ---------- */
  const renderCart = (flashId) => {
    const t = totals();
    $('#pos-cart').innerHTML = `<div class="panel-head"><h3>${icon('receipt')}Venta #${saleNo}</h3><div class="row" style="gap:.4rem"><button class="btn btn-ghost btn-xs" type="button" id="disc-btn">${icon('percent')}Descuento</button><button class="btn btn-ghost btn-xs" type="button" id="clear-btn" ${cart.length ? '' : 'disabled'}>Vaciar</button></div></div>
      <div class="pos-lines">${cart.length ? cart.map((it, i) => { const p = PRODUCTS.find((x) => x.id === it.id); return `<div class="cart-line ${it.id === flashId ? 'flash' : ''}"><div class="grow"><b>${p.name}</b><small>${money(p.price)} c/u</small></div><div class="qty"><button class="icon-btn" type="button" data-dec="${i}" aria-label="Quitar uno">${icon('minus')}</button><span>${it.qty}</span><button class="icon-btn" type="button" data-inc="${i}" aria-label="Agregar uno">${icon('plus')}</button></div><b class="line-total">${money(p.price * it.qty)}</b></div>`; }).join('') : '<div class="empty">Toca productos o escanea un código para empezar una venta.</div>'}</div>
      <div class="totals"><div><span>Subtotal</span><span>${money(t.subtotal)}</span></div>${t.disc ? `<div><span>Descuento (${discount.type === 'pct' ? discount.value + ' %' : money(discount.value)})</span><span>−${money(t.disc)}</span></div>` : ''}<div><span>Impuestos (13 %)</span><span>${money(t.tax)}</span></div><div class="grand"><span>Total</span><span>${money(t.total)}</span></div></div>
      <button class="btn btn-primary btn-lg charge-btn" type="button" id="charge" ${cart.length ? '' : 'disabled'}>Cobrar ${money(t.total)} ${icon('arrow-right')}</button>`;
    $$('#pos-cart [data-inc]').forEach((b) => b.addEventListener('click', () => { cart[+b.dataset.inc].qty += 1; renderCart(); }));
    $$('#pos-cart [data-dec]').forEach((b) => b.addEventListener('click', () => { const i = +b.dataset.dec; cart[i].qty -= 1; if (cart[i].qty <= 0) cart.splice(i, 1); renderCart(); }));
    $('#clear-btn').addEventListener('click', () => { cart.length = 0; discount = { type: 'pct', value: 0 }; renderCart(); });
    $('#disc-btn').addEventListener('click', discountModal);
    $('#charge').addEventListener('click', payModal);
  };
  const discountModal = () => {
    const card = modal.open(`<h2>Descuento</h2><div class="quick-grid">${[5, 10, 15, 20].map((v) => `<button type="button" class="btn btn-ghost" data-pct="${v}">${v} % menos</button>`).join('')}</div>
      <div class="form-grid" style="margin-top:1rem"><div class="field"><label>Monto fijo</label><input class="input" type="number" min="0" step="0.5" name="amt" placeholder="0.00"></div><div class="field"><label>Motivo (se imprime en el recibo)</label><select class="input" name="reason"><option>Descuento de empleado</option><option>Premio de lealtad</option><option>Autorización del gerente</option></select></div></div>
      <div class="modal-actions"><button class="btn btn-ghost" type="button" data-none>Quitar descuento</button><button class="btn btn-primary" type="button" data-apply>Aplicar monto</button></div>`);
    $$('[data-pct]', card).forEach((b) => b.addEventListener('click', () => { discount = { type: 'pct', value: +b.dataset.pct }; modal.close(); renderCart(); toast(`Descuento del ${b.dataset.pct} % aplicado`); }));
    $('[data-none]', card).addEventListener('click', () => { discount = { type: 'pct', value: 0 }; modal.close(); renderCart(); });
    $('[data-apply]', card).addEventListener('click', () => { const v = parseFloat($('[name=amt]', card).value) || 0; discount = { type: 'amt', value: v }; modal.close(); renderCart(); if (v) toast(`Descuento de ${money(v)} aplicado`); });
  };

  /* ---------- cobro ---------- */
  const payModal = () => {
    const t = totals();
    let method = 'card';
    const card = modal.open(`<h2>Cobrar · ${money(t.total)}</h2>
      <div class="seg" style="margin-bottom:1rem" id="pay-seg"><button type="button" data-m="card" class="on">${icon('credit-card')} Tarjeta</button><button type="button" data-m="cash">${icon('dollar')} Efectivo</button><button type="button" data-m="split">Dividido</button></div>
      <div id="pay-body"></div>`);
    const body = $('#pay-body', card);
    const render = () => {
      $$('#pay-seg button', card).forEach((b) => b.classList.toggle('on', b.dataset.m === method));
      if (method === 'card') {
        body.innerHTML = `<div class="reader-big"><div class="reader-screen"><span class="r0">${icon('credit-card')}Acerca, inserta o desliza la tarjeta en la terminal</span></div><div class="reader-slot"></div></div><p class="muted small center" style="margin:.8rem 0 1rem">El monto se envía a la terminal de tarjeta automáticamente. No hay que volver a teclearlo.</p><div class="modal-actions"><button class="btn btn-ghost" type="button" data-cancel>Cancelar</button><button class="btn btn-primary btn-lg" type="button" data-card>Simular pago con tarjeta</button></div>`;
        $('[data-card]', body).addEventListener('click', () => {
          const scr = $('.reader-screen span', body); scr.innerHTML = '<i class="spin"></i> Procesando…'; $('[data-card]', body).disabled = true;
          setTimeout(() => { scr.innerHTML = `${icon('check')} Aprobado`; scr.style.color = '#6ee7b7'; setTimeout(() => complete('Tarjeta', t.total, 0), 700); }, 1500);
        });
      } else if (method === 'cash') {
        const quick = [Math.ceil(t.total), Math.ceil(t.total / 5) * 5, Math.ceil(t.total / 10) * 10, Math.ceil(t.total / 20) * 20].filter((v, i, a) => a.indexOf(v) === i);
        body.innerHTML = `<div class="quick-grid">${quick.map((v) => `<button type="button" class="btn btn-ghost" data-cash="${v}">${money(v)}</button>`).join('')}</div>
          <div class="field" style="margin-top:1rem"><label>Monto recibido</label><input class="input" type="number" step="0.01" name="cash" value="${t.total.toFixed(2)}"></div>
          <div class="totals" style="margin-top:.6rem"><div class="grand"><span>Cambio</span><span id="change">${money(0)}</span></div></div>
          <div class="modal-actions"><button class="btn btn-ghost" type="button" data-cancel>Cancelar</button><button class="btn btn-success btn-lg" type="button" data-cash-done>${icon('check')}Completar · abrir cajón</button></div>`;
        const input = $('[name=cash]', body);
        const upd = () => { $('#change', body).textContent = money(Math.max(0, (parseFloat(input.value) || 0) - t.total)); };
        input.addEventListener('input', upd);
        $$('[data-cash]', body).forEach((b) => b.addEventListener('click', () => { input.value = (+b.dataset.cash).toFixed(2); upd(); }));
        $('[data-cash-done]', body).addEventListener('click', () => { const got = parseFloat(input.value) || 0; if (got < t.total - 0.001) { toast('El efectivo recibido no alcanza', '', 'warn', 'alert'); return; } complete('Efectivo', t.total, got - t.total); });
      } else {
        body.innerHTML = `<div class="field"><label>Parte en efectivo</label><input class="input" type="number" step="0.01" name="cashpart" value="${(t.total / 2).toFixed(2)}"></div><div class="totals" style="margin-top:.6rem"><div class="grand"><span>Resto con tarjeta</span><span id="rest">${money(t.total / 2)}</span></div></div>
          <div class="modal-actions"><button class="btn btn-ghost" type="button" data-cancel>Cancelar</button><button class="btn btn-primary btn-lg" type="button" data-split>Cobrar efectivo y luego tarjeta</button></div>`;
        const input = $('[name=cashpart]', body);
        input.addEventListener('input', () => { $('#rest', body).textContent = money(Math.max(0, t.total - (parseFloat(input.value) || 0))); });
        $('[data-split]', body).addEventListener('click', () => { $('[data-split]', body).disabled = true; $('[data-split]', body).innerHTML = '<i class="spin"></i> Procesando tarjeta…'; setTimeout(() => complete('Dividido (efectivo + tarjeta)', t.total, 0), 1500); });
      }
      $$('[data-cancel]', body).forEach((b) => b.addEventListener('click', modal.close));
    };
    $$('#pay-seg button', card).forEach((b) => b.addEventListener('click', () => { method = b.dataset.m; render(); }));
    render();
  };
  const complete = (pay, total, change) => {
    const t = totals();
    const sale = { no: saleNo, at: time(), items: cart.map((c) => ({ ...c })), subtotal: t.subtotal, discount: t.disc, tax: t.tax, total, pay, synced: !document.body.classList.contains('is-offline') };
    sales.push(sale); saleNo += 1; cart.length = 0; discount = { type: 'pct', value: 0 };
    renderCart(); renderSales(); renderEod();
    if (pay === 'Efectivo') toast('Cajón de dinero abierto', change > 0 ? `Cambio: ${money(change)}` : 'Monto exacto recibido.', 'info', 'drawer');
    if (!sale.synced) toast('Guardada en el servidor local', 'Esta venta se sincronizará cuando regrese el internet.', 'warn', 'wifi-off');
    receipt(sale, change);
  };
  const receipt = (sale, change) => {
    const card = modal.open(`<h2>Recibo impreso</h2>
      <div class="receipt-wrap"><div class="receipt"><b class="rc-title">Café Amanecer</b><span>Calle Erie 12 · Tel 555 0100</span><span>Venta #${sale.no} · ${sale.at} · Caja 1 · Sam K.</span><hr>
        ${sale.items.map((it) => { const p = PRODUCTS.find((x) => x.id === it.id); return `<div class="rc-line"><span>${it.qty} × ${esc(p.name)}</span><span>${money(p.price * it.qty)}</span></div>`; }).join('')}
        <hr><div class="rc-line"><span>Subtotal</span><span>${money(sale.subtotal)}</span></div>${sale.discount ? `<div class="rc-line"><span>Descuento</span><span>−${money(sale.discount)}</span></div>` : ''}<div class="rc-line"><span>Impuestos 13 %</span><span>${money(sale.tax)}</span></div><div class="rc-line rc-total"><span>TOTAL</span><span>${money(sale.total)}</span></div><div class="rc-line"><span>Pago: ${sale.pay}</span><span>${change > 0 ? 'Cambio ' + money(change) : ''}</span></div><hr><span class="center">¡Gracias! Hasta mañana.</span><div class="rc-barcode">${Array.from({ length: 28 }, (_, i) => `<i style="--w:${[1, 2, 1, 3][i % 4]}"></i>`).join('')}</div></div></div>
      <div class="modal-actions"><button class="btn btn-ghost" type="button" data-email>${icon('mail')}Enviar recibo por correo</button><button class="btn btn-primary" type="button" data-new>Nueva venta ${icon('arrow-right')}</button></div>`);
    $('[data-email]', card).addEventListener('click', () => toast('Recibo enviado por correo', 'Al correo del cliente registrado.', 'ok', 'mail'));
    $('[data-new]', card).addEventListener('click', modal.close);
  };

  /* ---------- ventas y cierre ---------- */
  const renderSales = () => {
    const list = [...sales].reverse();
    $('#sales-sub').textContent = `${sales.length} ventas · ${money(sales.reduce((s, x) => s + x.total, 0))} hasta ahora`;
    $('#sales-table').innerHTML = `<thead><tr><th>#</th><th>Hora</th><th>Productos</th><th>Pago</th><th class="num">Total</th><th>Sincronización</th></tr></thead><tbody>${list.map((s, i) => `<tr class="${i === 0 ? 'new' : ''}"><td>${s.no}</td><td>${s.at}</td><td>${s.items.map((it) => `${it.qty} × ${PRODUCTS.find((p) => p.id === it.id).name}`).join(', ')}</td><td>${s.pay}</td><td class="num"><b>${money(s.total)}</b></td><td>${s.synced ? '<span class="mk-badge green">Sincronizada</span>' : '<span class="mk-badge amber">Guardada localmente</span>'}</td></tr>`).join('')}</tbody>`;
  };
  const renderEod = () => {
    const total = sales.reduce((s, x) => s + x.total, 0);
    const byPay = {}; sales.forEach((s) => { byPay[s.pay] = (byPay[s.pay] || 0) + s.total; });
    const byProd = {}; sales.forEach((s) => s.items.forEach((it) => { byProd[it.id] = (byProd[it.id] || 0) + it.qty; }));
    const top = Object.entries(byProd).sort((a, b) => b[1] - a[1]).slice(0, 5);
    const maxQ = top.length ? top[0][1] : 1;
    $('#eod-kpis').innerHTML = `<div class="kpi-tile"><small>Ventas</small><b>${money(total)}</b><em>${sales.length} transacciones</em><span class="ic grad-blue">${icon('dollar')}</span></div><div class="kpi-tile"><small>Venta promedio</small><b>${money(sales.length ? total / sales.length : 0)}</b><em>por transacción</em><span class="ic grad-indigo">${icon('receipt')}</span></div><div class="kpi-tile"><small>Impuestos cobrados</small><b>${money(sales.reduce((s, x) => s + x.tax, 0))}</b><em>13 % de impuesto</em><span class="ic grad-violet">${icon('percent')}</span></div><div class="kpi-tile"><small>Efectivo en cajón</small><b>${money(150 + (byPay.Efectivo || 0))}</b><em>incluye $150 de fondo</em><span class="ic grad-cyan">${icon('drawer')}</span></div>`;
    $('#eod-pay').innerHTML = Object.entries(byPay).map(([k, v]) => `<div class="list-row"><span class="grow">${k}</span><div class="level" style="width:120px"><i style="width:${(v / total * 100).toFixed(0)}%"></i></div><b style="min-width:80px;text-align:right">${money(v)}</b></div>`).join('');
    $('#eod-top').innerHTML = top.map(([id, q]) => `<div class="list-row"><span class="grow">${PRODUCTS.find((p) => p.id === +id).name}</span><div class="level" style="width:120px"><i style="width:${(q / maxQ * 100).toFixed(0)}%"></i></div><b style="min-width:70px;text-align:right">${q} vendidos</b></div>`).join('');
  };
  $('#close-day').addEventListener('click', () => toast('Caja cerrada', 'Reporte Z impreso y enviado por correo. Inventario actualizado.', 'ok', 'printer'));

  /* ---------- sin internet ---------- */
  const sw = $('#offline');
  const toggleOffline = () => { const on = sw.classList.toggle('on'); sw.setAttribute('aria-checked', String(on)); document.body.classList.toggle('is-offline', on); if (on) toast('Se perdió la conexión a internet', 'Sigue vendiendo. Las ventas se guardan en el servidor local.', 'warn', 'wifi-off'); else { sales.forEach((s) => { s.synced = true; }); renderSales(); toast('Internet de vuelta', 'Las ventas locales se sincronizaron con el sitio web y los reportes.', 'ok', 'refresh'); } };
  sw.addEventListener('click', toggleOffline);
  sw.addEventListener('keydown', (e) => { if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); toggleOffline(); } });

  renderCats(); renderProducts(); renderCart(); renderSales(); renderEod(); views();

  /* ---------- guía ---------- */
  tour.auto([
    { title: 'Esta es la caja que instalaríamos en tu mostrador', text: 'Una pantalla táctil conectada a la impresora de recibos, el cajón de dinero, el lector de códigos y la terminal de tarjeta. Te guiamos por una venta completa en 5 pasos.' },
    { target: '#pos-products', title: 'Paso 1 · Toca los productos', text: 'Botones grandes, ordenados por categoría. Toca un producto para agregarlo a la venta. También puedes buscar por nombre o escanear su código de barras.', action: 'Toca un producto para continuar', advanceOn: '.pos-product', delay: 400 },
    { target: '#pos-cart', title: 'Paso 2 · Revisa la venta', text: 'Aquí ves los productos, cambias cantidades, aplicas un descuento y el total con impuestos se calcula solo.', action: 'Toca "Cobrar" cuando estés listo', advanceOn: '#charge', delay: 400 },
    { title: 'Paso 3 · Cobra', text: 'Elige tarjeta, efectivo o pago dividido. Con tarjeta, el monto viaja solo a la terminal. Con efectivo, el sistema calcula el cambio y abre el cajón.', action: 'Completa el pago en la ventana', advanceOn: '[data-card], [data-cash-done], [data-split]', delay: 2600 },
    { title: 'Paso 4 · El recibo se imprime solo', text: 'En cuanto se aprueba el pago, el recibo sale de la impresora o se envía por correo. Cierra la ventana para seguir.', action: 'Toca "Nueva venta" para continuar', advanceOn: '[data-new]', delay: 300 },
    { target: '#offline-wrap', title: 'Y si se cae el internet…', text: 'Activa el interruptor para simularlo: la caja sigue vendiendo y guarda todo en el servidor de tu local. Cuando vuelve la conexión, se sincroniza solo.', action: 'Pruébalo (opcional)' },
    { target: '#pos-seg', title: 'Paso 5 · Cierre del día', text: 'En <b>Cierre del día</b> ves las ventas por forma de pago, los productos más vendidos y el efectivo que debe haber en el cajón. Cerrar toma un toque.', action: 'Abre "Cierre del día"', advanceOn: '[data-nav="eod"]', delay: 300 },
    { title: 'Eso es todo', text: 'Así de rápido cobra tu equipo cada día. Explora libremente o repite la guía con el botón "Ver guía paso a paso".' },
  ], { key: 'pos' });
})();
