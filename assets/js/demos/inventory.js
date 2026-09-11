(() => {
  const { $, $$, money, toast, modal, views, icon, time, esc, tour, x, lang } = window.Demo;

  const SUPPLIERS = [
    { id: 1, name: x('Lácteos del Norte', 'Northern Dairy'), contact: 'pedidos@lacteos.example', lead: x('1 día', '1 day'), items: x('Leche, leche de avena, crema, mantequilla', 'Milk, oat milk, cream, butter') },
    { id: 2, name: x('Tostadores Unidos', 'United Roasters'), contact: 'hola@tostadores.example', lead: x('3 días', '3 days'), items: x('Café en grano, café de filtro', 'Coffee beans, filter coffee') },
    { id: 3, name: x('Panificadora Central', 'Central Bakery Supply'), contact: 'ventas@panificadora.example', lead: x('2 días', '2 days'), items: x('Pan congelado, harina, azúcar', 'Frozen bread, flour, sugar') },
    { id: 4, name: x('Empaques Rápidos', 'Quick Packaging'), contact: 'pedidos@empaques.example', lead: x('4 días', '4 days'), items: x('Vasos, tapas, bolsas, servilletas', 'Cups, lids, bags, napkins') },
  ];
  const UNIT = { bag: x('bolsa', 'bag'), bottle: x('botella', 'bottle'), carton: x('cartón', 'carton'), box: x('caja', 'case'), dozen: x('docena', 'dozen'), pack: x('paquete', 'pack') };
  const CAT = { coffee: x('Café', 'Coffee'), dairy: x('Lácteos', 'Dairy'), bakery: x('Panadería', 'Bakery'), packaging: x('Empaque', 'Packaging'), grocery: x('Abarrotes', 'Grocery'), drinks: x('Bebidas', 'Drinks') };
  const P = [
    { id: 1, sku: 'CAFE-1KG', name: x('Café en grano 1 kg', 'Coffee beans 1 kg'), cat: 'coffee', stock: 39, min: 20, unit: 'bag', cost: 24, sup: 2, vel: 4 },
    { id: 2, sku: 'FILT-500', name: x('Café de filtro 500 g', 'Filter coffee 500 g'), cat: 'coffee', stock: 14, min: 10, unit: 'bag', cost: 11, sup: 2, vel: 1 },
    { id: 3, sku: 'LECHE-2L', name: x('Leche entera 2 L', 'Whole milk 2 L'), cat: 'dairy', stock: 26, min: 24, unit: 'bottle', cost: 2.1, sup: 1, vel: 9 },
    { id: 4, sku: 'AVENA-1L', name: x('Leche de avena 1 L', 'Oat milk 1 L'), cat: 'dairy', stock: 5, min: 12, unit: 'carton', cost: 1.9, sup: 1, vel: 6 },
    { id: 5, sku: 'CREMA-1L', name: x('Crema 1 L', 'Cream 1 L'), cat: 'dairy', stock: 8, min: 6, unit: 'carton', cost: 3.4, sup: 1, vel: 2 },
    { id: 6, sku: 'CROIS-CG', name: x('Croissants (congelados, caja de 40)', 'Croissants (frozen, case of 40)'), cat: 'bakery', stock: 3, min: 2, unit: 'box', cost: 28, sup: 3, vel: 1 },
    { id: 7, sku: 'MUFF-CG', name: x('Muffins (congelados, caja de 24)', 'Muffins (frozen, case of 24)'), cat: 'bakery', stock: 2, min: 3, unit: 'box', cost: 22, sup: 3, vel: 1 },
    { id: 8, sku: 'BAGEL-DZ', name: x('Bagels (docena)', 'Bagels (dozen)'), cat: 'bakery', stock: 6, min: 4, unit: 'dozen', cost: 9, sup: 3, vel: 2 },
    { id: 9, sku: 'VASO-12', name: x('Vasos 12 oz (paquete de 50)', 'Cups 12 oz (pack of 50)'), cat: 'packaging', stock: 18, min: 10, unit: 'pack', cost: 6.5, sup: 4, vel: 3 },
    { id: 10, sku: 'VASO-8', name: x('Vasos 8 oz (paquete de 50)', 'Cups 8 oz (pack of 50)'), cat: 'packaging', stock: 4, min: 8, unit: 'pack', cost: 5.8, sup: 4, vel: 2 },
    { id: 11, sku: 'TAPA-12', name: x('Tapas 12 oz (paquete de 100)', 'Lids 12 oz (pack of 100)'), cat: 'packaging', stock: 15, min: 8, unit: 'pack', cost: 4.2, sup: 4, vel: 2 },
    { id: 12, sku: 'BOLSA-PAP', name: x('Bolsas de papel (paquete de 250)', 'Paper bags (pack of 250)'), cat: 'packaging', stock: 9, min: 4, unit: 'pack', cost: 12, sup: 4, vel: 1 },
    { id: 13, sku: 'AZUC-5', name: x('Azúcar 5 kg', 'Sugar 5 kg'), cat: 'grocery', stock: 7, min: 3, unit: 'bag', cost: 8, sup: 3, vel: 1 },
    { id: 14, sku: 'JUGO-1L', name: x('Jugo de naranja 1 L', 'Orange juice 1 L'), cat: 'drinks', stock: 11, min: 12, unit: 'bottle', cost: 2.6, sup: 1, vel: 3 },
  ];
  const sup = (id) => SUPPLIERS.find((s) => s.id === id);
  const isLow = (p) => p.stock < p.min;
  const status = (p) => (p.stock <= 0 ? ['red', x('Agotado', 'Out of stock')] : isLow(p) ? ['red', x('Bajo', 'Low')] : p.stock < p.min * 1.5 ? ['amber', x('Por acabarse', 'Running low')] : ['green', 'OK']);
  const unitLabel = (n, u) => { const w = UNIT[u]; if (n === 1) return w; if (lang === 'en') return u === 'dozen' ? w : u === 'box' ? 'cases' : `${w}s`; return w.endsWith('n') ? `${w}es` : `${w}s`; };
  const plural = (n, u) => `${n} ${unitLabel(n, u)}`;
  const PO = { draft: x('Borrador', 'Draft'), sent: x('Enviada', 'Sent'), received: x('Recibida', 'Received') };
  let filter = 'all', query = '';
  const received = [];
  let poNo = 217;
  const pos = [
    { no: 216, sup: 2, items: [{ id: 1, qty: 20 }], status: 'sent', at: x('Ayer 16:40', 'Yesterday 16:40') },
    { no: 215, sup: 4, items: [{ id: 9, qty: 30 }, { id: 11, qty: 20 }], status: 'received', at: x('Lun 09:10', 'Mon 09:10') },
  ];
  const movement = [[42, 30], [38, 0], [51, 24], [47, 0], [60, 40], [72, 0], [35, 12]];

  /* ---------- stock ---------- */
  const renderStock = (flashId) => {
    const low = P.filter(isLow);
    $('#low-count').textContent = low.length || '';
    $('#low-panel').innerHTML = low.length ? `<div class="low-panel"><div class="grow"><b>${icon('alert')}${x(`${low.length} producto${low.length === 1 ? '' : 's'} por debajo del mínimo`, `${low.length} item${low.length === 1 ? '' : 's'} below minimum`)}</b><small>${low.map((p) => esc(p.name)).join(', ')}</small></div><button class="btn btn-primary btn-sm" type="button" id="low-po">${icon('file')}${x(`Crear orden${low.length > 1 ? 'es' : ''} de compra`, `Create purchase order${low.length > 1 ? 's' : ''}`)}</button></div>` : `<div class="low-panel ok"><b>${icon('check')}${x('Todo está por encima del mínimo', 'Everything is above minimum')}</b></div>`;
    const lp = $('#low-po'); if (lp) lp.addEventListener('click', createPOsFromLow);
    const list = P.filter((p) => (filter === 'all' || isLow(p)) && (!query || p.name.toLowerCase().includes(query) || p.sku.toLowerCase().includes(query)));
    $('#stock-table').innerHTML = `<thead><tr><th>${x('Producto', 'Product')}</th><th>${x('Categoría', 'Category')}</th><th>${x('Nivel', 'Level')}</th><th class="num">${x('Existencia', 'On hand')}</th><th class="num">${x('Mínimo', 'Minimum')}</th><th>${x('Estado', 'Status')}</th><th>${x('Proveedor', 'Supplier')}</th><th></th></tr></thead><tbody>${list.map((p) => { const [c, s] = status(p); const pct = Math.min(100, p.stock / (p.min * 2.5) * 100); return `<tr class="${p.id === flashId ? 'flash' : ''}"><td><b>${esc(p.name)}</b><small class="muted" style="display:block">${p.sku}</small></td><td>${CAT[p.cat]}</td><td><div class="level ${c === 'red' ? 'low' : c === 'amber' ? 'warn' : ''}"><i style="width:${pct.toFixed(0)}%"></i></div></td><td class="num"><b>${p.stock}</b> <span class="muted small">${unitLabel(p.stock, p.unit)}</span></td><td class="num">${p.min}</td><td><span class="mk-badge ${c}">${s}</span></td><td>${sup(p.sup).name}</td><td><div class="row" style="gap:.3rem;flex-wrap:nowrap"><button class="btn btn-ghost btn-xs" type="button" data-sell="${p.id}" title="${x('Simular una venta en el POS', 'Simulate a sale on the POS')}">${x('Vender 1', 'Sell 1')}</button><button class="btn btn-ghost btn-xs" type="button" data-adjust="${p.id}">${x('Ajustar', 'Adjust')}</button></div></td></tr>`; }).join('')}</tbody>`;
    $$('#stock-table [data-sell]').forEach((b) => b.addEventListener('click', () => sell(+b.dataset.sell)));
    $$('#stock-table [data-adjust]').forEach((b) => b.addEventListener('click', () => adjustModal(P.find((p) => p.id === +b.dataset.adjust))));
    $('#po-count').textContent = pos.filter((o) => o.status !== 'received').length || '';
  };
  const sell = (id) => { const p = P.find((y) => y.id === id); if (p.stock <= 0) { toast(x('Agotado', 'Out of stock'), x('El POS mostraría este producto como no disponible.', 'The POS would show this item as unavailable.'), 'warn', 'alert'); return; } p.stock -= 1; movement[6][0] += 1; const wasLow = isLow(p); renderStock(id); renderReports(); if (wasLow && p.stock === p.min - 1) toast(x(`${p.name} quedó por debajo del mínimo`, `${p.name} dropped below minimum`), x('Se agregó a la lista de reorden.', 'Added to the reorder list.'), 'warn', 'bell'); };
  $('#simulate-sales').addEventListener('click', () => { let n = 0; P.forEach((p) => { const q = Math.min(p.stock, Math.round(p.vel * (0.5 + Math.random()))); p.stock -= q; n += q; movement[6][0] += q; }); renderStock(); renderReports(); const low = P.filter(isLow).length; toast(x(`Hora pico: ${n} unidades vendidas en el POS`, `Rush hour: ${n} units sold on the POS`), x(`Existencias actualizadas solas. ${low} producto${low === 1 ? '' : 's'} por debajo del mínimo.`, `Stock updated on its own. ${low} item${low === 1 ? '' : 's'} below minimum.`), low ? 'warn' : 'ok', 'pos'); });
  const adjustModal = (p) => {
    const card = modal.open(`<h2>${x('Ajustar', 'Adjust')} · ${esc(p.name)}</h2><p class="muted small" style="margin-bottom:1rem">${x('Ahora hay', 'Currently')} ${plural(p.stock, p.unit)} · ${x('mínimo', 'minimum')} ${p.min}</p>
      <div class="form-grid"><div class="field"><label>${x('Conteo nuevo', 'New count')}</label><input class="input" type="number" name="count" value="${p.stock}" min="0"></div><div class="field"><label>${x('Motivo', 'Reason')}</label><select class="input" name="reason"><option>${x('Conteo de inventario', 'Stock count')}</option><option>${x('Merma / caducado', 'Waste / expired')}</option><option>${x('Rotura', 'Breakage')}</option><option>${x('Consumo del personal', 'Staff use')}</option><option>${x('Corrección', 'Correction')}</option></select></div><div class="field full"><label>${x('Nivel mínimo (punto de reorden)', 'Minimum level (reorder point)')}</label><input class="input" type="number" name="min" value="${p.min}" min="0"></div></div>
      <div class="modal-actions"><button class="btn btn-ghost" type="button" data-close>${x('Cancelar', 'Cancel')}</button><button class="btn btn-primary" type="button" data-save>${icon('check')}${x('Guardar', 'Save')}</button></div>`);
    $('[data-close]', card).addEventListener('click', modal.close);
    $('[data-save]', card).addEventListener('click', () => { const c = parseInt($('[name=count]', card).value, 10); const reason = $('[name=reason]', card).value; const diff = c - p.stock; p.stock = Math.max(0, c); p.min = Math.max(0, parseInt($('[name=min]', card).value, 10) || 0); modal.close(); renderStock(p.id); renderReports(); toast(x('Existencias ajustadas', 'Stock adjusted'), x(`${esc(p.name)}: ${diff >= 0 ? '+' : ''}${diff} (${reason}), registrado con tu nombre y la hora.`, `${esc(p.name)}: ${diff >= 0 ? '+' : ''}${diff} (${reason}), logged with your name and the time.`)); });
  };
  $('#inv-search').addEventListener('input', (e) => { query = e.target.value.trim().toLowerCase(); renderStock(); });
  $$('#inv-filter button').forEach((b) => b.addEventListener('click', () => { filter = b.dataset.f; $$('#inv-filter button').forEach((y) => y.classList.toggle('on', y === b)); renderStock(); }));

  /* ---------- receive ---------- */
  const receive = (p, qty, how) => { p.stock += qty; movement[6][1] += qty; received.unshift({ p, qty, how, at: time() }); renderReceive(); renderStock(p.id); renderReports(); toast(`+${qty} ${esc(p.name)}`, `${how} · ${x('ahora hay', 'now')} ${p.stock}${isLow(p) ? x(' (todavía por debajo del mínimo)', ' (still below minimum)') : ''}.`, 'ok', 'plus'); };
  const renderReceive = () => {
    $('#rcv-product').innerHTML = P.map((p) => `<option value="${p.id}">${esc(p.name)}</option>`).join('');
    $('#rcv-log').innerHTML = received.map((r, i) => `<div class="list-row ${i === 0 ? 'new' : ''}"><span class="avatar sm c2">${icon('package')}</span><div class="grow"><b>${esc(r.p.name)}</b><small>${r.how} · ${r.at}</small></div><span class="mk-badge green">+${r.qty}</span></div>`).join('') || `<div class="empty">${x('Hoy no se ha recibido nada. Escanea un producto o súmalo a mano.', 'Nothing received today. Scan an item or add it manually.')}</div>`;
  };
  $('#scan-btn').addEventListener('click', () => {
    const btn = $('#scan-btn'); btn.disabled = true; btn.innerHTML = `<i class="spin"></i> ${x('Escaneando…', 'Scanning…')}`;
    const visual = $('#scan-visual'); visual.classList.add('scanning');
    setTimeout(() => { const low = P.filter(isLow); const p = (low.length ? low : P)[Math.floor(Math.random() * (low.length ? low.length : P.length))]; const qty = p.unit === 'box' || p.unit === 'dozen' ? 2 : 12; receive(p, qty, x('Escaneado', 'Scanned')); btn.disabled = false; btn.innerHTML = `${icon('scan')}${x('Escanear el siguiente producto', 'Scan the next item')}`; visual.classList.remove('scanning'); }, 900);
  });
  $('#rcv-btn').addEventListener('click', () => { const p = P.find((y) => y.id === +$('#rcv-product').value); const qty = Math.max(1, parseInt($('#rcv-qty').value, 10) || 1); receive(p, qty, x('Captura manual', 'Manual entry')); });

  /* ---------- purchase orders ---------- */
  const createPOsFromLow = () => {
    const low = P.filter(isLow); if (!low.length) { toast(x('Nada está bajo por ahora', 'Nothing is low right now'), '', 'info', 'check'); return; }
    const bySup = {}; low.forEach((p) => { (bySup[p.sup] = bySup[p.sup] || []).push({ id: p.id, qty: Math.max(p.min * 2 - p.stock, p.min) }); });
    Object.entries(bySup).forEach(([s, items]) => pos.unshift({ no: ++poNo, sup: +s, items, status: 'draft', at: time(), isNew: true }));
    const n = Object.keys(bySup).length;
    renderPOs(); renderStock(); toast(x(`${n} orden${n > 1 ? 'es' : ''} de compra creada${n > 1 ? 's' : ''}`, `${n} purchase order${n > 1 ? 's' : ''} created`), x('Una por proveedor, con cantidades sugeridas según tus mínimos. Revisa y envía.', 'One per supplier, with quantities suggested from your minimums. Review and send.'), 'ok', 'file');
    document.querySelector('[data-nav="orders"]').click();
  };
  $('#po-from-low').addEventListener('click', createPOsFromLow);
  const renderPOs = () => {
    $('#po-list').innerHTML = pos.map((o) => { const s = sup(o.sup); const total = o.items.reduce((a, it) => a + P.find((p) => p.id === it.id).cost * it.qty, 0); return `<div class="panel po ${o.isNew ? 'new' : ''}"><div class="panel-head"><div><h3 style="margin:0">${x('OC', 'PO')}-${o.no} · ${esc(s.name)}</h3><small class="muted">${o.at} · ${x('entrega en', 'delivery in')} ${s.lead}</small></div><span class="mk-badge ${o.status === 'received' ? 'green' : o.status === 'sent' ? 'blue' : 'amber'}">${PO[o.status]}</span></div>
      <table class="table" style="margin-bottom:.8rem"><tbody>${o.items.map((it) => { const p = P.find((y) => y.id === it.id); return `<tr><td>${esc(p.name)}</td><td class="num">${plural(it.qty, p.unit)}</td><td class="num">${money(p.cost * it.qty)}</td></tr>`; }).join('')}<tr><td><b>Total</b></td><td></td><td class="num"><b>${money(total)}</b></td></tr></tbody></table>
      <div class="row" style="justify-content:flex-end">${o.status === 'draft' ? `<button class="btn btn-ghost btn-xs" type="button" data-del="${o.no}">${x('Eliminar', 'Delete')}</button><button class="btn btn-primary btn-xs" type="button" data-send="${o.no}">${icon('mail')}${x('Enviar por correo al proveedor', 'Email to supplier')}</button>` : o.status === 'sent' ? `<button class="btn btn-success btn-xs" type="button" data-recv="${o.no}">${icon('check')}${x('Llegó la entrega · recibir todo', 'Delivery arrived · receive all')}</button>` : `<span class="muted small">${x('Recibida en existencias', 'Received into stock')}</span>`}</div></div>`; }).join('') || `<div class="empty">${x('No hay órdenes de compra. Crea una desde la lista de stock bajo.', 'No purchase orders. Create one from the low-stock list.')}</div>`;
    pos.forEach((o) => { o.isNew = false; });
    $$('#po-list [data-send]').forEach((b) => b.addEventListener('click', () => { const o = pos.find((y) => y.no === +b.dataset.send); o.status = 'sent'; renderPOs(); renderStock(); toast(x(`OC-${o.no} enviada a ${sup(o.sup).name}`, `PO-${o.no} sent to ${sup(o.sup).name}`), x(`Llega en ${sup(o.sup).lead}. La recibirás escaneando.`, `Arrives in ${sup(o.sup).lead}. You will receive it by scanning.`), 'ok', 'mail'); }));
    $$('#po-list [data-recv]').forEach((b) => b.addEventListener('click', () => { const o = pos.find((y) => y.no === +b.dataset.recv); o.status = 'received'; o.items.forEach((it) => { const p = P.find((y) => y.id === it.id); p.stock += it.qty; movement[6][1] += it.qty; received.unshift({ p, qty: it.qty, how: `${x('OC', 'PO')}-${o.no}`, at: time() }); }); renderPOs(); renderStock(); renderReceive(); renderReports(); toast(x(`OC-${o.no} recibida`, `PO-${o.no} received`), x('Existencias actualizadas. Las diferencias se señalarían aquí.', 'Stock updated. Any differences would be flagged here.'), 'ok', 'package'); }));
    $$('#po-list [data-del]').forEach((b) => b.addEventListener('click', () => { const i = pos.findIndex((y) => y.no === +b.dataset.del); pos.splice(i, 1); renderPOs(); renderStock(); }));
  };

  /* ---------- suppliers & reports ---------- */
  const renderSuppliers = () => { $('#sup-grid').innerHTML = SUPPLIERS.map((s) => `<div class="card static"><div class="icon-ring">${icon('truck')}</div><h3 style="margin-top:.9rem">${esc(s.name)}</h3><p class="small">${esc(s.items)}</p><ul class="contact-list" style="list-style:none;padding:0;margin:.8rem 0 0;display:grid;gap:.4rem;font-size:.84rem"><li>${icon('mail')}<span>${esc(s.contact)}</span></li><li>${icon('clock')}<span>${x('Entrega en', 'Delivery in')} ${s.lead}</span></li><li>${icon('package')}<span>${P.filter((p) => p.sup === s.id).length} ${x('productos', 'products')}</span></li></ul></div>`).join(''); };
  const renderReports = () => {
    const value = P.reduce((a, p) => a + p.stock * p.cost, 0);
    const low = P.filter(isLow).length;
    const out = movement.reduce((a, m) => a + m[0], 0), inn = movement.reduce((a, m) => a + m[1], 0);
    $('#rep-kpis').innerHTML = `<div class="kpi-tile"><small>${x('Valor del inventario', 'Inventory value')}</small><b>${money(value)}</b><em>${x('a precio de costo', 'at cost')}</em><span class="ic grad-blue">${icon('dollar')}</span></div><div class="kpi-tile"><small>${x('Por debajo del mínimo', 'Below minimum')}</small><b>${low}</b><em class="${low ? 'bad' : ''}">${low ? x('hay que pedir', 'needs ordering') : x('todo bien', 'all good')}</em><span class="ic grad-violet">${icon('bell')}</span></div><div class="kpi-tile"><small>${x('Unidades vendidas · 7 días', 'Units sold · 7 days')}</small><b>${out}</b><em>${x('desde el POS', 'from the POS')}</em><span class="ic grad-indigo">${icon('trending-up')}</span></div><div class="kpi-tile"><small>${x('Unidades recibidas · 7 días', 'Units received · 7 days')}</small><b>${inn}</b><em>${x('de entregas', 'from deliveries')}</em><span class="ic grad-cyan">${icon('package')}</span></div>`;
    const max = Math.max(...movement.flat(), 1);
    const days = x(['Jue', 'Vie', 'Sáb', 'Dom', 'Lun', 'Mar', 'Hoy'], ['Thu', 'Fri', 'Sat', 'Sun', 'Mon', 'Tue', 'Today']);
    $('#rep-chart').innerHTML = `<div class="chart-bars">${movement.map(([o, i]) => `<div><i style="height:${(o / max * 100).toFixed(0)}%" title="${o} ${x('vendidas', 'sold')}"></i><i class="alt" style="height:${(i / max * 100).toFixed(0)}%" title="${i} ${x('recibidas', 'received')}"></i></div>`).join('')}</div><div class="chart-labels">${days.map((d) => `<span>${d}</span>`).join('')}</div><div class="row" style="gap:1rem;margin-top:.6rem;font-size:.74rem;color:var(--muted)"><span><i class="status-dot" style="background:#60a5fa"></i> ${x('Vendidas', 'Sold')}</span><span><i class="status-dot" style="background:#a78bfa"></i> ${x('Recibidas', 'Received')}</span></div>`;
    const top = [...P].sort((a, b) => b.vel - a.vel).slice(0, 5);
    $('#rep-top').innerHTML = top.map((p) => `<div class="list-row"><span class="grow">${esc(p.name)}</span><div class="level" style="width:110px"><i style="width:${(p.vel / top[0].vel * 100).toFixed(0)}%"></i></div><b style="min-width:70px;text-align:right">${p.vel}/${x('día', 'day')}</b></div>`).join('');
  };

  renderStock(); renderReceive(); renderPOs(); renderSuppliers(); renderReports(); views();

  /* ---------- guide ---------- */
  tour.auto([
    { title: x('Así se controla el inventario de tu negocio', 'This is how your business keeps track of stock'), text: x('Todo corre en el mismo servidor que tu POS: cada venta descuenta existencias sola. Te mostramos en 5 pasos cómo nunca te vuelves a quedar sin producto.', 'Everything runs on the same server as your POS: every sale deducts stock by itself. We show you in 5 steps how you never run out again.') },
    { target: '#stock-panel', title: x('Paso 1 · Existencias en vivo', 'Step 1 · Live stock'), text: x('Cada producto con su nivel, su mínimo y su proveedor. Los que están en rojo ya están por debajo del mínimo.', 'Every product with its level, minimum and supplier. The ones in red are already below minimum.') },
    { target: '#simulate-sales', title: x('Paso 2 · Las ventas descuentan solas', 'Step 2 · Sales deduct stock by themselves'), text: x('Toca <b>Simular una hora pico</b>: es como si tu POS vendiera durante una hora. Mira cómo bajan las existencias y aparecen las alertas.', 'Tap <b>Simulate a rush hour</b>: it is as if your POS sold for an hour. Watch stock go down and alerts appear.'), action: x('Toca "Simular una hora pico"', 'Tap "Simulate a rush hour"'), advanceOn: '#simulate-sales', delay: 800 },
    { target: '#low-panel', title: x('Paso 3 · La alerta te dice qué pedir', 'Step 3 · The alert tells you what to order'), text: x('Arriba aparece qué productos quedaron bajos. Con un toque se crean las órdenes de compra, una por proveedor, con cantidades sugeridas.', 'At the top you see which products are low. One tap creates the purchase orders, one per supplier, with suggested quantities.'), action: x('Toca "Crear orden de compra"', 'Tap "Create purchase order"'), advanceOn: '#low-po', delay: 700 },
    { target: '#po-list', title: x('Paso 4 · Envía la orden al proveedor', 'Step 4 · Send the order to the supplier'), text: x('Revisa las cantidades y envíala por correo desde aquí mismo. Cuando llegue la mercancía, la marcas como recibida.', 'Review the quantities and email it right from here. When the goods arrive, mark them as received.'), action: x('Envía una orden y luego márcala como recibida', 'Send an order, then mark it as received') },
    { target: '[data-nav="receive"]', title: x('Paso 5 · Recibir escaneando', 'Step 5 · Receive by scanning'), text: x('En <b>Recibir</b> usas el lector de códigos que instalamos: cada escaneo suma a las existencias en el momento.', 'In <b>Receive</b> you use the barcode scanner we install: every scan adds to stock instantly.'), action: x('Abre "Recibir" y toca "Escanear"', 'Open "Receive" and tap "Scan"'), advanceOn: '[data-nav="receive"]', delay: 300 },
    { title: x('Eso es todo', 'That is it'), text: x('Sin hojas de cálculo ni conteos a ciegas. Explora los reportes o repite la guía con "Guía paso a paso".', 'No spreadsheets and no blind counts. Explore the reports or replay the guide with "Step-by-step guide".') },
  ], { key: 'inventory' });
})();
