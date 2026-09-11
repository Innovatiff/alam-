(() => {
  const { $, $$, money, toast, modal, views, icon, time, esc, tour, x } = window.Demo;

  const C = { coffee: x('Café', 'Coffee'), food: x('Comida', 'Food'), drinks: x('Bebidas', 'Drinks'), shop: x('Tienda', 'Shop') };
  const PRODUCTS = [
    { id: 1, cat: 'coffee', name: 'Espresso', price: 3.2, bc: '5001' }, { id: 2, cat: 'coffee', name: 'Latte', price: 4.5, bc: '5002' }, { id: 3, cat: 'coffee', name: x('Capuchino', 'Cappuccino'), price: 4.2, bc: '5003' }, { id: 4, cat: 'coffee', name: 'Flat white', price: 4.4, bc: '5004' }, { id: 5, cat: 'coffee', name: x('Latte frío', 'Iced latte'), price: 5, bc: '5005' },
    { id: 6, cat: 'food', name: 'Croissant', price: 3.2, bc: '5011' }, { id: 7, cat: 'food', name: x('Bagel con queso crema', 'Bagel with cream cheese'), price: 5.5, bc: '5012' }, { id: 8, cat: 'food', name: x('Tostada de aguacate', 'Avocado toast'), price: 9.5, bc: '5013' }, { id: 9, cat: 'food', name: x('Muffin de arándano', 'Blueberry muffin'), price: 3.5, bc: '5014' }, { id: 10, cat: 'food', name: x('Bowl de granola', 'Granola bowl'), price: 8, bc: '5015' },
    { id: 11, cat: 'drinks', name: x('Jugo de naranja natural', 'Fresh orange juice'), price: 4.8, bc: '5021' }, { id: 12, cat: 'drinks', name: x('Agua mineral', 'Sparkling water'), price: 2.5, bc: '5022' }, { id: 13, cat: 'drinks', name: x('Té helado', 'Iced tea'), price: 3.8, bc: '5023' },
    { id: 14, cat: 'shop', name: x('Café en grano 250 g', 'Coffee beans 250 g'), price: 14, bc: '5031' }, { id: 15, cat: 'shop', name: x('Vaso reutilizable', 'Reusable cup'), price: 18, bc: '5032' }, { id: 16, cat: 'shop', name: x('Tarjeta de regalo $25', '$25 gift card'), price: 25, bc: '5033' },
  ];
  const CATS = [['all', x('Todo', 'All')], ['coffee', C.coffee], ['food', C.food], ['drinks', C.drinks], ['shop', C.shop]];
  const PAY = { card: x('Tarjeta', 'Card'), cash: x('Efectivo', 'Cash'), split: x('Dividido (efectivo + tarjeta)', 'Split (cash + card)') };
  const TAX = 0.13;
  let cat = 'all', query = '';
  const cart = [];
  let discount = { type: 'pct', value: 0 };
  let saleNo = 483;
  const sales = [];
  const rnd = (n) => Math.floor(Math.random() * n);
  for (let i = 0; i < 26; i++) {
    const items = Array.from({ length: 1 + rnd(3) }, () => { const p = PRODUCTS[rnd(PRODUCTS.length)]; return { id: p.id, qty: 1 + rnd(2) }; });
    const sub = items.reduce((s, it) => s + PRODUCTS.find((p) => p.id === it.id).price * it.qty, 0);
    const h = 7 + Math.floor(i / 3), m = rnd(60);
    sales.push({ no: 456 + i, at: `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`, items, subtotal: sub, discount: 0, tax: sub * TAX, total: sub * (1 + TAX), pay: ['card', 'card', 'cash', 'card', 'cash'][rnd(5)], synced: true });
  }

  const totals = () => {
    const subtotal = cart.reduce((s, it) => s + PRODUCTS.find((p) => p.id === it.id).price * it.qty, 0);
    const disc = discount.type === 'pct' ? subtotal * discount.value / 100 : Math.min(subtotal, discount.value);
    const taxable = subtotal - disc; const tax = taxable * TAX;
    return { subtotal, disc, tax, total: taxable + tax, count: cart.reduce((s, it) => s + it.qty, 0) };
  };

  /* ---------- products ---------- */
  const renderCats = () => {
    $('#pos-cats').innerHTML = CATS.map(([k, l]) => `<button type="button" class="${k === cat ? 'on' : ''}" data-cat="${k}">${l}</button>`).join('');
    $$('#pos-cats button').forEach((b) => b.addEventListener('click', () => { cat = b.dataset.cat; renderCats(); renderProducts(); }));
  };
  const renderProducts = () => {
    const list = PRODUCTS.filter((p) => (cat === 'all' || p.cat === cat) && (!query || p.name.toLowerCase().includes(query) || p.bc.includes(query)));
    $('#pos-products').innerHTML = list.map((p, i) => `<button type="button" class="pos-product c${p.id % 6}" data-id="${p.id}" style="--i:${i}"><span class="pp-cat">${C[p.cat]}</span><b>${p.name}</b><span class="pp-price">${money(p.price)}</span></button>`).join('') || `<div class="empty">${x('Ningún producto coincide.', 'No product matches.')}</div>`;
    $$('#pos-products .pos-product').forEach((b) => b.addEventListener('click', () => add(+b.dataset.id)));
  };
  const add = (id) => { const line = cart.find((c) => c.id === id); if (line) line.qty += 1; else cart.push({ id, qty: 1 }); renderCart(id); };
  $('#pos-search').addEventListener('input', (e) => { query = e.target.value.trim().toLowerCase(); renderProducts(); });
  $('#pos-search').addEventListener('keydown', (e) => {
    if (e.key !== 'Enter') return;
    const p = PRODUCTS.find((y) => y.bc === query);
    if (p) { add(p.id); toast(`${x('Escaneado', 'Scanned')}: ${p.name}`, `${x('Código', 'Code')} ${p.bc} · ${money(p.price)}`, 'info', 'scan'); e.target.value = ''; query = ''; renderProducts(); }
    else toast(x('No hay producto con ese código', 'No product with that code'), x('Prueba 5012 para un bagel.', 'Try 5012 for a bagel.'), 'warn', 'alert');
  });

  /* ---------- sale ---------- */
  const renderCart = (flashId) => {
    const t = totals();
    $('#pos-cart').innerHTML = `<div class="panel-head"><h3>${icon('receipt')}${x('Venta', 'Sale')} #${saleNo}</h3><div class="row" style="gap:.4rem"><button class="btn btn-ghost btn-xs" type="button" id="disc-btn">${icon('percent')}${x('Descuento', 'Discount')}</button><button class="btn btn-ghost btn-xs" type="button" id="clear-btn" ${cart.length ? '' : 'disabled'}>${x('Vaciar', 'Clear')}</button></div></div>
      <div class="pos-lines">${cart.length ? cart.map((it, i) => { const p = PRODUCTS.find((y) => y.id === it.id); return `<div class="cart-line ${it.id === flashId ? 'flash' : ''}"><div class="grow"><b>${p.name}</b><small>${money(p.price)} ${x('c/u', 'each')}</small></div><div class="qty"><button class="icon-btn" type="button" data-dec="${i}" aria-label="${x('Quitar uno', 'Remove one')}">${icon('minus')}</button><span>${it.qty}</span><button class="icon-btn" type="button" data-inc="${i}" aria-label="${x('Agregar uno', 'Add one')}">${icon('plus')}</button></div><b class="line-total">${money(p.price * it.qty)}</b></div>`; }).join('') : `<div class="empty">${x('Toca productos o escanea un código para empezar una venta.', 'Tap products or scan a code to start a sale.')}</div>`}</div>
      <div class="totals"><div><span>Subtotal</span><span>${money(t.subtotal)}</span></div>${t.disc ? `<div><span>${x('Descuento', 'Discount')} (${discount.type === 'pct' ? discount.value + ' %' : money(discount.value)})</span><span>−${money(t.disc)}</span></div>` : ''}<div><span>${x('Impuestos', 'Tax')} (13 %)</span><span>${money(t.tax)}</span></div><div class="grand"><span>Total</span><span>${money(t.total)}</span></div></div>
      <button class="btn btn-primary btn-lg charge-btn" type="button" id="charge" ${cart.length ? '' : 'disabled'}>${x('Cobrar', 'Charge')} ${money(t.total)} ${icon('arrow-right')}</button>`;
    $$('#pos-cart [data-inc]').forEach((b) => b.addEventListener('click', () => { cart[+b.dataset.inc].qty += 1; renderCart(); }));
    $$('#pos-cart [data-dec]').forEach((b) => b.addEventListener('click', () => { const i = +b.dataset.dec; cart[i].qty -= 1; if (cart[i].qty <= 0) cart.splice(i, 1); renderCart(); }));
    $('#clear-btn').addEventListener('click', () => { cart.length = 0; discount = { type: 'pct', value: 0 }; renderCart(); });
    $('#disc-btn').addEventListener('click', discountModal);
    $('#charge').addEventListener('click', payModal);
  };
  const discountModal = () => {
    const card = modal.open(`<h2>${x('Descuento', 'Discount')}</h2><div class="quick-grid">${[5, 10, 15, 20].map((v) => `<button type="button" class="btn btn-ghost" data-pct="${v}">${v} % ${x('menos', 'off')}</button>`).join('')}</div>
      <div class="form-grid" style="margin-top:1rem"><div class="field"><label>${x('Monto fijo', 'Fixed amount')}</label><input class="input" type="number" min="0" step="0.5" name="amt" placeholder="0.00"></div><div class="field"><label>${x('Motivo (se imprime en el recibo)', 'Reason (printed on the receipt)')}</label><select class="input" name="reason"><option>${x('Descuento de empleado', 'Staff discount')}</option><option>${x('Premio de lealtad', 'Loyalty reward')}</option><option>${x('Autorización del gerente', 'Manager approval')}</option></select></div></div>
      <div class="modal-actions"><button class="btn btn-ghost" type="button" data-none>${x('Quitar descuento', 'Remove discount')}</button><button class="btn btn-primary" type="button" data-apply>${x('Aplicar monto', 'Apply amount')}</button></div>`);
    $$('[data-pct]', card).forEach((b) => b.addEventListener('click', () => { discount = { type: 'pct', value: +b.dataset.pct }; modal.close(); renderCart(); toast(x(`Descuento del ${b.dataset.pct} % aplicado`, `${b.dataset.pct}% discount applied`)); }));
    $('[data-none]', card).addEventListener('click', () => { discount = { type: 'pct', value: 0 }; modal.close(); renderCart(); });
    $('[data-apply]', card).addEventListener('click', () => { const v = parseFloat($('[name=amt]', card).value) || 0; discount = { type: 'amt', value: v }; modal.close(); renderCart(); if (v) toast(x(`Descuento de ${money(v)} aplicado`, `${money(v)} discount applied`)); });
  };

  /* ---------- payment ---------- */
  const payModal = () => {
    const t = totals();
    let method = 'card';
    const card = modal.open(`<h2>${x('Cobrar', 'Charge')} · ${money(t.total)}</h2>
      <div class="seg" style="margin-bottom:1rem" id="pay-seg"><button type="button" data-m="card" class="on">${icon('credit-card')} ${PAY.card}</button><button type="button" data-m="cash">${icon('dollar')} ${PAY.cash}</button><button type="button" data-m="split">${x('Dividido', 'Split')}</button></div>
      <div id="pay-body"></div>`);
    const body = $('#pay-body', card);
    const render = () => {
      $$('#pay-seg button', card).forEach((b) => b.classList.toggle('on', b.dataset.m === method));
      if (method === 'card') {
        body.innerHTML = `<div class="reader-big"><div class="reader-screen"><span class="r0">${icon('credit-card')}${x('Acerca, inserta o desliza la tarjeta en la terminal', 'Tap, insert or swipe the card on the reader')}</span></div><div class="reader-slot"></div></div><p class="muted small center" style="margin:.8rem 0 1rem">${x('El monto se envía a la terminal de tarjeta automáticamente. No hay que volver a teclearlo.', 'The amount is sent to the card reader automatically. No need to retype it.')}</p><div class="modal-actions"><button class="btn btn-ghost" type="button" data-cancel>${x('Cancelar', 'Cancel')}</button><button class="btn btn-primary btn-lg" type="button" data-card>${x('Simular pago con tarjeta', 'Simulate card payment')}</button></div>`;
        $('[data-card]', body).addEventListener('click', () => {
          const scr = $('.reader-screen span', body); scr.innerHTML = `<i class="spin"></i> ${x('Procesando…', 'Processing…')}`; $('[data-card]', body).disabled = true;
          setTimeout(() => { scr.innerHTML = `${icon('check')} ${x('Aprobado', 'Approved')}`; scr.style.color = '#6ee7b7'; setTimeout(() => complete('card', t.total, 0), 700); }, 1500);
        });
      } else if (method === 'cash') {
        const quick = [Math.ceil(t.total), Math.ceil(t.total / 5) * 5, Math.ceil(t.total / 10) * 10, Math.ceil(t.total / 20) * 20].filter((v, i, a) => a.indexOf(v) === i);
        body.innerHTML = `<div class="quick-grid">${quick.map((v) => `<button type="button" class="btn btn-ghost" data-cash="${v}">${money(v)}</button>`).join('')}</div>
          <div class="field" style="margin-top:1rem"><label>${x('Monto recibido', 'Amount received')}</label><input class="input" type="number" step="0.01" name="cash" value="${t.total.toFixed(2)}"></div>
          <div class="totals" style="margin-top:.6rem"><div class="grand"><span>${x('Cambio', 'Change')}</span><span id="change">${money(0)}</span></div></div>
          <div class="modal-actions"><button class="btn btn-ghost" type="button" data-cancel>${x('Cancelar', 'Cancel')}</button><button class="btn btn-success btn-lg" type="button" data-cash-done>${icon('check')}${x('Completar · abrir cajón', 'Complete · open drawer')}</button></div>`;
        const input = $('[name=cash]', body);
        const upd = () => { $('#change', body).textContent = money(Math.max(0, (parseFloat(input.value) || 0) - t.total)); };
        input.addEventListener('input', upd);
        $$('[data-cash]', body).forEach((b) => b.addEventListener('click', () => { input.value = (+b.dataset.cash).toFixed(2); upd(); }));
        $('[data-cash-done]', body).addEventListener('click', () => { const got = parseFloat(input.value) || 0; if (got < t.total - 0.001) { toast(x('El efectivo recibido no alcanza', 'Cash received is not enough'), '', 'warn', 'alert'); return; } complete('cash', t.total, got - t.total); });
      } else {
        body.innerHTML = `<div class="field"><label>${x('Parte en efectivo', 'Cash portion')}</label><input class="input" type="number" step="0.01" name="cashpart" value="${(t.total / 2).toFixed(2)}"></div><div class="totals" style="margin-top:.6rem"><div class="grand"><span>${x('Resto con tarjeta', 'Rest by card')}</span><span id="rest">${money(t.total / 2)}</span></div></div>
          <div class="modal-actions"><button class="btn btn-ghost" type="button" data-cancel>${x('Cancelar', 'Cancel')}</button><button class="btn btn-primary btn-lg" type="button" data-split>${x('Cobrar efectivo y luego tarjeta', 'Take cash, then card')}</button></div>`;
        const input = $('[name=cashpart]', body);
        input.addEventListener('input', () => { $('#rest', body).textContent = money(Math.max(0, t.total - (parseFloat(input.value) || 0))); });
        $('[data-split]', body).addEventListener('click', () => { $('[data-split]', body).disabled = true; $('[data-split]', body).innerHTML = `<i class="spin"></i> ${x('Procesando tarjeta…', 'Processing card…')}`; setTimeout(() => complete('split', t.total, 0), 1500); });
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
    if (pay === 'cash') toast(x('Cajón de dinero abierto', 'Cash drawer opened'), change > 0 ? `${x('Cambio', 'Change')}: ${money(change)}` : x('Monto exacto recibido.', 'Exact amount received.'), 'info', 'drawer');
    if (!sale.synced) toast(x('Guardada en el servidor local', 'Saved on the local server'), x('Esta venta se sincronizará cuando regrese el internet.', 'This sale will sync when the internet is back.'), 'warn', 'wifi-off');
    receipt(sale, change);
  };
  const receipt = (sale, change) => {
    const card = modal.open(`<h2>${x('Recibo impreso', 'Printed receipt')}</h2>
      <div class="receipt-wrap"><div class="receipt"><b class="rc-title">Café Amanecer</b><span>${x('Calle Erie 12', '12 Erie Street')} · Tel 555 0100</span><span>${x('Venta', 'Sale')} #${sale.no} · ${sale.at} · ${x('Caja 1', 'Register 1')} · Sam K.</span><hr>
        ${sale.items.map((it) => { const p = PRODUCTS.find((y) => y.id === it.id); return `<div class="rc-line"><span>${it.qty} × ${esc(p.name)}</span><span>${money(p.price * it.qty)}</span></div>`; }).join('')}
        <hr><div class="rc-line"><span>Subtotal</span><span>${money(sale.subtotal)}</span></div>${sale.discount ? `<div class="rc-line"><span>${x('Descuento', 'Discount')}</span><span>−${money(sale.discount)}</span></div>` : ''}<div class="rc-line"><span>${x('Impuestos', 'Tax')} 13 %</span><span>${money(sale.tax)}</span></div><div class="rc-line rc-total"><span>TOTAL</span><span>${money(sale.total)}</span></div><div class="rc-line"><span>${x('Pago', 'Payment')}: ${PAY[sale.pay]}</span><span>${change > 0 ? `${x('Cambio', 'Change')} ${money(change)}` : ''}</span></div><hr><span class="center">${x('¡Gracias! Hasta mañana.', 'Thank you! See you tomorrow.')}</span><div class="rc-barcode">${Array.from({ length: 28 }, (_, i) => `<i style="--w:${[1, 2, 1, 3][i % 4]}"></i>`).join('')}</div></div></div>
      <div class="modal-actions"><button class="btn btn-ghost" type="button" data-email>${icon('mail')}${x('Enviar recibo por correo', 'Email receipt')}</button><button class="btn btn-primary" type="button" data-new>${x('Nueva venta', 'New sale')} ${icon('arrow-right')}</button></div>`);
    $('[data-email]', card).addEventListener('click', () => toast(x('Recibo enviado por correo', 'Receipt emailed'), x('Al correo del cliente registrado.', 'To the customer\'s email on file.'), 'ok', 'mail'));
    $('[data-new]', card).addEventListener('click', modal.close);
  };

  /* ---------- sales & end of day ---------- */
  const renderSales = () => {
    const list = [...sales].reverse();
    $('#sales-sub').textContent = `${sales.length} ${x('ventas', 'sales')} · ${money(sales.reduce((s, y) => s + y.total, 0))} ${x('hasta ahora', 'so far')}`;
    $('#sales-table').innerHTML = `<thead><tr><th>#</th><th>${x('Hora', 'Time')}</th><th>${x('Productos', 'Items')}</th><th>${x('Pago', 'Payment')}</th><th class="num">Total</th><th>${x('Sincronización', 'Sync')}</th></tr></thead><tbody>${list.map((s, i) => `<tr class="${i === 0 ? 'new' : ''}"><td>${s.no}</td><td>${s.at}</td><td>${s.items.map((it) => `${it.qty} × ${PRODUCTS.find((p) => p.id === it.id).name}`).join(', ')}</td><td>${PAY[s.pay]}</td><td class="num"><b>${money(s.total)}</b></td><td>${s.synced ? `<span class="mk-badge green">${x('Sincronizada', 'Synced')}</span>` : `<span class="mk-badge amber">${x('Guardada localmente', 'Saved locally')}</span>`}</td></tr>`).join('')}</tbody>`;
  };
  const renderEod = () => {
    const total = sales.reduce((s, y) => s + y.total, 0);
    const byPay = {}; sales.forEach((s) => { byPay[s.pay] = (byPay[s.pay] || 0) + s.total; });
    const byProd = {}; sales.forEach((s) => s.items.forEach((it) => { byProd[it.id] = (byProd[it.id] || 0) + it.qty; }));
    const top = Object.entries(byProd).sort((a, b) => b[1] - a[1]).slice(0, 5);
    const maxQ = top.length ? top[0][1] : 1;
    $('#eod-kpis').innerHTML = `<div class="kpi-tile"><small>${x('Ventas', 'Sales')}</small><b>${money(total)}</b><em>${sales.length} ${x('transacciones', 'transactions')}</em><span class="ic grad-blue">${icon('dollar')}</span></div><div class="kpi-tile"><small>${x('Venta promedio', 'Average sale')}</small><b>${money(sales.length ? total / sales.length : 0)}</b><em>${x('por transacción', 'per transaction')}</em><span class="ic grad-indigo">${icon('receipt')}</span></div><div class="kpi-tile"><small>${x('Impuestos cobrados', 'Tax collected')}</small><b>${money(sales.reduce((s, y) => s + y.tax, 0))}</b><em>${x('13 % de impuesto', '13% tax')}</em><span class="ic grad-violet">${icon('percent')}</span></div><div class="kpi-tile"><small>${x('Efectivo en cajón', 'Cash in drawer')}</small><b>${money(150 + (byPay.cash || 0))}</b><em>${x('incluye $150 de fondo', 'includes $150 float')}</em><span class="ic grad-cyan">${icon('drawer')}</span></div>`;
    $('#eod-pay').innerHTML = Object.entries(byPay).map(([k, v]) => `<div class="list-row"><span class="grow">${PAY[k]}</span><div class="level" style="width:120px"><i style="width:${(v / total * 100).toFixed(0)}%"></i></div><b style="min-width:80px;text-align:right">${money(v)}</b></div>`).join('');
    $('#eod-top').innerHTML = top.map(([id, q]) => `<div class="list-row"><span class="grow">${PRODUCTS.find((p) => p.id === +id).name}</span><div class="level" style="width:120px"><i style="width:${(q / maxQ * 100).toFixed(0)}%"></i></div><b style="min-width:70px;text-align:right">${q} ${x('vendidos', 'sold')}</b></div>`).join('');
  };
  $('#close-day').addEventListener('click', () => toast(x('Caja cerrada', 'Register closed'), x('Reporte Z impreso y enviado por correo. Inventario actualizado.', 'Z report printed and emailed. Inventory updated.'), 'ok', 'printer'));

  /* ---------- offline ---------- */
  const sw = $('#offline');
  const toggleOffline = () => { const on = sw.classList.toggle('on'); sw.setAttribute('aria-checked', String(on)); document.body.classList.toggle('is-offline', on); if (on) toast(x('Se perdió la conexión a internet', 'Internet connection lost'), x('Sigue vendiendo. Las ventas se guardan en el servidor local.', 'Keep selling. Sales are saved on the local server.'), 'warn', 'wifi-off'); else { sales.forEach((s) => { s.synced = true; }); renderSales(); toast(x('Internet de vuelta', 'Internet is back'), x('Las ventas locales se sincronizaron con el sitio web y los reportes.', 'Local sales synced with the website and the reports.'), 'ok', 'refresh'); } };
  sw.addEventListener('click', toggleOffline);
  sw.addEventListener('keydown', (e) => { if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); toggleOffline(); } });

  renderCats(); renderProducts(); renderCart(); renderSales(); renderEod(); views();

  /* ---------- guide ---------- */
  tour.auto([
    { title: x('Esta es la caja que instalaríamos en tu mostrador', 'This is the register we would install at your counter'), text: x('Una pantalla táctil conectada a la impresora de recibos, el cajón de dinero, el lector de códigos y la terminal de tarjeta. Te guiamos por una venta completa en 5 pasos.', 'A touch screen connected to the receipt printer, cash drawer, barcode scanner and card reader. We walk you through a full sale in 5 steps.') },
    { target: '#pos-products', title: x('Paso 1 · Toca los productos', 'Step 1 · Tap the products'), text: x('Botones grandes, ordenados por categoría. Toca un producto para agregarlo a la venta. También puedes buscar por nombre o escanear su código de barras.', 'Big buttons, sorted by category. Tap a product to add it to the sale. You can also search by name or scan its barcode.'), action: x('Toca un producto para continuar', 'Tap a product to continue'), advanceOn: '.pos-product', delay: 400 },
    { target: '#pos-cart', title: x('Paso 2 · Revisa la venta', 'Step 2 · Review the sale'), text: x('Aquí ves los productos, cambias cantidades, aplicas un descuento y el total con impuestos se calcula solo.', 'Here you see the items, change quantities, apply a discount, and the total with tax is calculated for you.'), action: x('Toca "Cobrar" cuando estés listo', 'Tap "Charge" when you are ready'), advanceOn: '#charge', delay: 400 },
    { title: x('Paso 3 · Cobra', 'Step 3 · Take payment'), text: x('Elige tarjeta, efectivo o pago dividido. Con tarjeta, el monto viaja solo a la terminal. Con efectivo, el sistema calcula el cambio y abre el cajón.', 'Choose card, cash or split. With card, the amount goes straight to the reader. With cash, the system calculates the change and opens the drawer.'), action: x('Completa el pago en la ventana', 'Complete the payment in the window'), advanceOn: '[data-card], [data-cash-done], [data-split]', delay: 2600 },
    { title: x('Paso 4 · El recibo se imprime solo', 'Step 4 · The receipt prints itself'), text: x('En cuanto se aprueba el pago, el recibo sale de la impresora o se envía por correo. Cierra la ventana para seguir.', 'As soon as the payment is approved, the receipt prints or is emailed. Close the window to continue.'), action: x('Toca "Nueva venta" para continuar', 'Tap "New sale" to continue'), advanceOn: '[data-new]', delay: 300 },
    { target: '#offline-wrap', title: x('Y si se cae el internet…', 'And if the internet goes down…'), text: x('Activa el interruptor para simularlo: la caja sigue vendiendo y guarda todo en el servidor de tu local. Cuando vuelve la conexión, se sincroniza solo.', 'Flip the switch to simulate it: the register keeps selling and saves everything on your local server. When the connection returns, it syncs by itself.'), action: x('Pruébalo (opcional)', 'Try it (optional)') },
    { target: '#pos-seg', title: x('Paso 5 · Cierre del día', 'Step 5 · End of day'), text: x('En <b>Cierre del día</b> ves las ventas por forma de pago, los productos más vendidos y el efectivo que debe haber en el cajón. Cerrar toma un toque.', 'In <b>End of day</b> you see sales by payment method, best sellers and the cash that should be in the drawer. Closing takes one tap.'), action: x('Abre "Cierre del día"', 'Open "End of day"'), advanceOn: '[data-nav="eod"]', delay: 300 },
    { title: x('Eso es todo', 'That is it'), text: x('Así de rápido cobra tu equipo cada día. Explora libremente o repite la guía con el botón "Guía paso a paso".', 'That is how fast your team rings up sales every day. Explore freely or replay the guide with the "Step-by-step guide" button.') },
  ], { key: 'pos' });
})();
