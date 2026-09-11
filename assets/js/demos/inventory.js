(() => {
  const { $, $$, money, toast, modal, views, icon, time, esc, tour } = window.Demo;

  const SUPPLIERS = [
    { id: 1, name: 'Lácteos del Norte', contact: 'pedidos@lacteosdelnorte.example', lead: '1 día', items: 'Leche, leche de avena, crema, mantequilla' },
    { id: 2, name: 'Tostadores Unidos', contact: 'hola@tostadores.example', lead: '3 días', items: 'Café en grano, café de filtro' },
    { id: 3, name: 'Panificadora Central', contact: 'ventas@panificadora.example', lead: '2 días', items: 'Pan congelado, harina, azúcar' },
    { id: 4, name: 'Empaques Rápidos', contact: 'pedidos@empaques.example', lead: '4 días', items: 'Vasos, tapas, bolsas, servilletas' },
  ];
  const P = [
    { id: 1, sku: 'CAFE-1KG', name: 'Café en grano 1 kg', cat: 'Café', stock: 39, min: 20, unit: 'bolsa', cost: 24, sup: 2, vel: 4 },
    { id: 2, sku: 'FILT-500', name: 'Café de filtro 500 g', cat: 'Café', stock: 14, min: 10, unit: 'bolsa', cost: 11, sup: 2, vel: 1 },
    { id: 3, sku: 'LECHE-2L', name: 'Leche entera 2 L', cat: 'Lácteos', stock: 26, min: 24, unit: 'botella', cost: 2.1, sup: 1, vel: 9 },
    { id: 4, sku: 'AVENA-1L', name: 'Leche de avena 1 L', cat: 'Lácteos', stock: 5, min: 12, unit: 'cartón', cost: 1.9, sup: 1, vel: 6 },
    { id: 5, sku: 'CREMA-1L', name: 'Crema 1 L', cat: 'Lácteos', stock: 8, min: 6, unit: 'cartón', cost: 3.4, sup: 1, vel: 2 },
    { id: 6, sku: 'CROIS-CG', name: 'Croissants (congelados, caja de 40)', cat: 'Panadería', stock: 3, min: 2, unit: 'caja', cost: 28, sup: 3, vel: 1 },
    { id: 7, sku: 'MUFF-CG', name: 'Muffins (congelados, caja de 24)', cat: 'Panadería', stock: 2, min: 3, unit: 'caja', cost: 22, sup: 3, vel: 1 },
    { id: 8, sku: 'BAGEL-DZ', name: 'Bagels (docena)', cat: 'Panadería', stock: 6, min: 4, unit: 'docena', cost: 9, sup: 3, vel: 2 },
    { id: 9, sku: 'VASO-12', name: 'Vasos 12 oz (paquete de 50)', cat: 'Empaque', stock: 18, min: 10, unit: 'paquete', cost: 6.5, sup: 4, vel: 3 },
    { id: 10, sku: 'VASO-8', name: 'Vasos 8 oz (paquete de 50)', cat: 'Empaque', stock: 4, min: 8, unit: 'paquete', cost: 5.8, sup: 4, vel: 2 },
    { id: 11, sku: 'TAPA-12', name: 'Tapas 12 oz (paquete de 100)', cat: 'Empaque', stock: 15, min: 8, unit: 'paquete', cost: 4.2, sup: 4, vel: 2 },
    { id: 12, sku: 'BOLSA-PAP', name: 'Bolsas de papel (paquete de 250)', cat: 'Empaque', stock: 9, min: 4, unit: 'paquete', cost: 12, sup: 4, vel: 1 },
    { id: 13, sku: 'AZUC-5', name: 'Azúcar 5 kg', cat: 'Abarrotes', stock: 7, min: 3, unit: 'bolsa', cost: 8, sup: 3, vel: 1 },
    { id: 14, sku: 'JUGO-1L', name: 'Jugo de naranja 1 L', cat: 'Bebidas', stock: 11, min: 12, unit: 'botella', cost: 2.6, sup: 1, vel: 3 },
  ];
  const sup = (id) => SUPPLIERS.find((s) => s.id === id);
  const isLow = (p) => p.stock < p.min;
  const status = (p) => (p.stock <= 0 ? ['red', 'Agotado'] : isLow(p) ? ['red', 'Bajo'] : p.stock < p.min * 1.5 ? ['amber', 'Por acabarse'] : ['green', 'OK']);
  const plural = (n, u) => `${n} ${u}${n === 1 ? '' : u.endsWith('n') ? 'es' : 's'}`;
  let filter = 'all', query = '';
  const received = [];
  let poNo = 217;
  const pos = [
    { no: 216, sup: 2, items: [{ id: 1, qty: 20 }], status: 'Enviada', at: 'Ayer 16:40' },
    { no: 215, sup: 4, items: [{ id: 9, qty: 30 }, { id: 11, qty: 20 }], status: 'Recibida', at: 'Lun 09:10' },
  ];
  const movement = [[42, 30], [38, 0], [51, 24], [47, 0], [60, 40], [72, 0], [35, 12]];

  /* ---------- existencias ---------- */
  const renderStock = (flashId) => {
    const low = P.filter(isLow);
    $('#low-count').textContent = low.length || '';
    $('#low-panel').innerHTML = low.length ? `<div class="low-panel"><div class="grow"><b>${icon('alert')}${low.length} producto${low.length === 1 ? '' : 's'} por debajo del mínimo</b><small>${low.map((p) => esc(p.name)).join(', ')}</small></div><button class="btn btn-primary btn-sm" type="button" id="low-po">${icon('file')}Crear orden${low.length > 1 ? 'es' : ''} de compra</button></div>` : `<div class="low-panel ok"><b>${icon('check')}Todo está por encima del mínimo</b></div>`;
    const lp = $('#low-po'); if (lp) lp.addEventListener('click', createPOsFromLow);
    const list = P.filter((p) => (filter === 'all' || isLow(p)) && (!query || p.name.toLowerCase().includes(query) || p.sku.toLowerCase().includes(query)));
    $('#stock-table').innerHTML = `<thead><tr><th>Producto</th><th>Categoría</th><th>Nivel</th><th class="num">Existencia</th><th class="num">Mínimo</th><th>Estado</th><th>Proveedor</th><th></th></tr></thead><tbody>${list.map((p) => { const [c, s] = status(p); const pct = Math.min(100, p.stock / (p.min * 2.5) * 100); return `<tr class="${p.id === flashId ? 'flash' : ''}"><td><b>${esc(p.name)}</b><small class="muted" style="display:block">${p.sku}</small></td><td>${p.cat}</td><td><div class="level ${c === 'red' ? 'low' : c === 'amber' ? 'warn' : ''}"><i style="width:${pct.toFixed(0)}%"></i></div></td><td class="num"><b>${p.stock}</b> <span class="muted small">${p.unit}${p.stock === 1 ? '' : p.unit.endsWith('n') ? 'es' : 's'}</span></td><td class="num">${p.min}</td><td><span class="mk-badge ${c}">${s}</span></td><td>${sup(p.sup).name}</td><td><div class="row" style="gap:.3rem;flex-wrap:nowrap"><button class="btn btn-ghost btn-xs" type="button" data-sell="${p.id}" title="Simular una venta en el POS">Vender 1</button><button class="btn btn-ghost btn-xs" type="button" data-adjust="${p.id}">Ajustar</button></div></td></tr>`; }).join('')}</tbody>`;
    $$('#stock-table [data-sell]').forEach((b) => b.addEventListener('click', () => sell(+b.dataset.sell)));
    $$('#stock-table [data-adjust]').forEach((b) => b.addEventListener('click', () => adjustModal(P.find((p) => p.id === +b.dataset.adjust))));
    $('#po-count').textContent = pos.filter((o) => o.status !== 'Recibida').length || '';
  };
  const sell = (id) => { const p = P.find((x) => x.id === id); if (p.stock <= 0) { toast('Agotado', 'El POS mostraría este producto como no disponible.', 'warn', 'alert'); return; } p.stock -= 1; movement[6][0] += 1; const wasLow = isLow(p); renderStock(id); renderReports(); if (wasLow && p.stock === p.min - 1) toast(`${p.name} quedó por debajo del mínimo`, 'Se agregó a la lista de reorden.', 'warn', 'bell'); };
  $('#simulate-sales').addEventListener('click', () => { let n = 0; P.forEach((p) => { const q = Math.min(p.stock, Math.round(p.vel * (0.5 + Math.random()))); p.stock -= q; n += q; movement[6][0] += q; }); renderStock(); renderReports(); const low = P.filter(isLow).length; toast(`Hora pico: ${n} unidades vendidas en el POS`, `Existencias actualizadas solas. ${low} producto${low === 1 ? '' : 's'} por debajo del mínimo.`, low ? 'warn' : 'ok', 'pos'); });
  const adjustModal = (p) => {
    const card = modal.open(`<h2>Ajustar · ${esc(p.name)}</h2><p class="muted small" style="margin-bottom:1rem">Ahora hay ${plural(p.stock, p.unit)} · mínimo ${p.min}</p>
      <div class="form-grid"><div class="field"><label>Conteo nuevo</label><input class="input" type="number" name="count" value="${p.stock}" min="0"></div><div class="field"><label>Motivo</label><select class="input" name="reason"><option>Conteo de inventario</option><option>Merma / caducado</option><option>Rotura</option><option>Consumo del personal</option><option>Corrección</option></select></div><div class="field full"><label>Nivel mínimo (punto de reorden)</label><input class="input" type="number" name="min" value="${p.min}" min="0"></div></div>
      <div class="modal-actions"><button class="btn btn-ghost" type="button" data-close>Cancelar</button><button class="btn btn-primary" type="button" data-save>${icon('check')}Guardar</button></div>`);
    $('[data-close]', card).addEventListener('click', modal.close);
    $('[data-save]', card).addEventListener('click', () => { const c = parseInt($('[name=count]', card).value, 10); const reason = $('[name=reason]', card).value; const diff = c - p.stock; p.stock = Math.max(0, c); p.min = Math.max(0, parseInt($('[name=min]', card).value, 10) || 0); modal.close(); renderStock(p.id); renderReports(); toast('Existencias ajustadas', `${esc(p.name)}: ${diff >= 0 ? '+' : ''}${diff} (${reason}), registrado con tu nombre y la hora.`); });
  };
  $('#inv-search').addEventListener('input', (e) => { query = e.target.value.trim().toLowerCase(); renderStock(); });
  $$('#inv-filter button').forEach((b) => b.addEventListener('click', () => { filter = b.dataset.f; $$('#inv-filter button').forEach((x) => x.classList.toggle('on', x === b)); renderStock(); }));

  /* ---------- recibir ---------- */
  const receive = (p, qty, how) => { p.stock += qty; movement[6][1] += qty; received.unshift({ p, qty, how, at: time() }); renderReceive(); renderStock(p.id); renderReports(); toast(`+${qty} ${esc(p.name)}`, `${how} · ahora hay ${p.stock}${isLow(p) ? ' (todavía por debajo del mínimo)' : ''}.`, 'ok', 'plus'); };
  const renderReceive = () => {
    $('#rcv-product').innerHTML = P.map((p) => `<option value="${p.id}">${esc(p.name)}</option>`).join('');
    $('#rcv-log').innerHTML = received.map((r, i) => `<div class="list-row ${i === 0 ? 'new' : ''}"><span class="avatar sm c2">${icon('package')}</span><div class="grow"><b>${esc(r.p.name)}</b><small>${r.how} · ${r.at}</small></div><span class="mk-badge green">+${r.qty}</span></div>`).join('') || '<div class="empty">Hoy no se ha recibido nada. Escanea un producto o súmalo a mano.</div>';
  };
  $('#scan-btn').addEventListener('click', () => {
    const btn = $('#scan-btn'); btn.disabled = true; btn.innerHTML = '<i class="spin"></i> Escaneando…';
    const visual = $('#scan-visual'); visual.classList.add('scanning');
    setTimeout(() => { const low = P.filter(isLow); const p = (low.length ? low : P)[Math.floor(Math.random() * (low.length ? low.length : P.length))]; const qty = p.unit === 'caja' || p.unit === 'docena' ? 2 : 12; receive(p, qty, 'Escaneado'); btn.disabled = false; btn.innerHTML = `${icon('scan')}Escanear el siguiente producto`; visual.classList.remove('scanning'); }, 900);
  });
  $('#rcv-btn').addEventListener('click', () => { const p = P.find((x) => x.id === +$('#rcv-product').value); const qty = Math.max(1, parseInt($('#rcv-qty').value, 10) || 1); receive(p, qty, 'Captura manual'); });

  /* ---------- órdenes de compra ---------- */
  const createPOsFromLow = () => {
    const low = P.filter(isLow); if (!low.length) { toast('Nada está bajo por ahora', '', 'info', 'check'); return; }
    const bySup = {}; low.forEach((p) => { (bySup[p.sup] = bySup[p.sup] || []).push({ id: p.id, qty: Math.max(p.min * 2 - p.stock, p.min) }); });
    Object.entries(bySup).forEach(([s, items]) => pos.unshift({ no: ++poNo, sup: +s, items, status: 'Borrador', at: time(), isNew: true }));
    renderPOs(); renderStock(); toast(`${Object.keys(bySup).length} orden${Object.keys(bySup).length > 1 ? 'es' : ''} de compra creada${Object.keys(bySup).length > 1 ? 's' : ''}`, 'Una por proveedor, con cantidades sugeridas según tus mínimos. Revisa y envía.', 'ok', 'file');
    document.querySelector('[data-nav="orders"]').click();
  };
  $('#po-from-low').addEventListener('click', createPOsFromLow);
  const renderPOs = () => {
    $('#po-list').innerHTML = pos.map((o) => { const s = sup(o.sup); const total = o.items.reduce((a, it) => a + P.find((p) => p.id === it.id).cost * it.qty, 0); return `<div class="panel po ${o.isNew ? 'new' : ''}"><div class="panel-head"><div><h3 style="margin:0">OC-${o.no} · ${esc(s.name)}</h3><small class="muted">${o.at} · entrega en ${s.lead}</small></div><span class="mk-badge ${o.status === 'Recibida' ? 'green' : o.status === 'Enviada' ? 'blue' : 'amber'}">${o.status}</span></div>
      <table class="table" style="margin-bottom:.8rem"><tbody>${o.items.map((it) => { const p = P.find((x) => x.id === it.id); return `<tr><td>${esc(p.name)}</td><td class="num">${plural(it.qty, p.unit)}</td><td class="num">${money(p.cost * it.qty)}</td></tr>`; }).join('')}<tr><td><b>Total</b></td><td></td><td class="num"><b>${money(total)}</b></td></tr></tbody></table>
      <div class="row" style="justify-content:flex-end">${o.status === 'Borrador' ? `<button class="btn btn-ghost btn-xs" type="button" data-del="${o.no}">Eliminar</button><button class="btn btn-primary btn-xs" type="button" data-send="${o.no}">${icon('mail')}Enviar por correo al proveedor</button>` : o.status === 'Enviada' ? `<button class="btn btn-success btn-xs" type="button" data-recv="${o.no}">${icon('check')}Llegó la entrega · recibir todo</button>` : `<span class="muted small">Recibida en existencias</span>`}</div></div>`; }).join('') || '<div class="empty">No hay órdenes de compra. Crea una desde la lista de stock bajo.</div>';
    pos.forEach((o) => { o.isNew = false; });
    $$('#po-list [data-send]').forEach((b) => b.addEventListener('click', () => { const o = pos.find((x) => x.no === +b.dataset.send); o.status = 'Enviada'; renderPOs(); renderStock(); toast(`OC-${o.no} enviada a ${sup(o.sup).name}`, `Llega en ${sup(o.sup).lead}. La recibirás escaneando.`, 'ok', 'mail'); }));
    $$('#po-list [data-recv]').forEach((b) => b.addEventListener('click', () => { const o = pos.find((x) => x.no === +b.dataset.recv); o.status = 'Recibida'; o.items.forEach((it) => { const p = P.find((x) => x.id === it.id); p.stock += it.qty; movement[6][1] += it.qty; received.unshift({ p, qty: it.qty, how: `OC-${o.no}`, at: time() }); }); renderPOs(); renderStock(); renderReceive(); renderReports(); toast(`OC-${o.no} recibida`, 'Existencias actualizadas. Las diferencias se señalarían aquí.', 'ok', 'package'); }));
    $$('#po-list [data-del]').forEach((b) => b.addEventListener('click', () => { const i = pos.findIndex((x) => x.no === +b.dataset.del); pos.splice(i, 1); renderPOs(); renderStock(); }));
  };

  /* ---------- proveedores y reportes ---------- */
  const renderSuppliers = () => { $('#sup-grid').innerHTML = SUPPLIERS.map((s) => `<div class="card static"><div class="icon-ring">${icon('truck')}</div><h3 style="margin-top:.9rem">${esc(s.name)}</h3><p class="small">${esc(s.items)}</p><ul class="contact-list" style="list-style:none;padding:0;margin:.8rem 0 0;display:grid;gap:.4rem;font-size:.84rem"><li>${icon('mail')}<span>${esc(s.contact)}</span></li><li>${icon('clock')}<span>Entrega en ${s.lead}</span></li><li>${icon('package')}<span>${P.filter((p) => p.sup === s.id).length} productos</span></li></ul></div>`).join(''); };
  const renderReports = () => {
    const value = P.reduce((a, p) => a + p.stock * p.cost, 0);
    const low = P.filter(isLow).length;
    const out = movement.reduce((a, m) => a + m[0], 0), inn = movement.reduce((a, m) => a + m[1], 0);
    $('#rep-kpis').innerHTML = `<div class="kpi-tile"><small>Valor del inventario</small><b>${money(value)}</b><em>a precio de costo</em><span class="ic grad-blue">${icon('dollar')}</span></div><div class="kpi-tile"><small>Por debajo del mínimo</small><b>${low}</b><em class="${low ? 'bad' : ''}">${low ? 'hay que pedir' : 'todo bien'}</em><span class="ic grad-violet">${icon('bell')}</span></div><div class="kpi-tile"><small>Unidades vendidas · 7 días</small><b>${out}</b><em>desde el POS</em><span class="ic grad-indigo">${icon('trending-up')}</span></div><div class="kpi-tile"><small>Unidades recibidas · 7 días</small><b>${inn}</b><em>de entregas</em><span class="ic grad-cyan">${icon('package')}</span></div>`;
    const max = Math.max(...movement.flat(), 1);
    const days = ['Jue', 'Vie', 'Sáb', 'Dom', 'Lun', 'Mar', 'Hoy'];
    $('#rep-chart').innerHTML = `<div class="chart-bars">${movement.map(([o, i]) => `<div><i style="height:${(o / max * 100).toFixed(0)}%" title="${o} vendidas"></i><i class="alt" style="height:${(i / max * 100).toFixed(0)}%" title="${i} recibidas"></i></div>`).join('')}</div><div class="chart-labels">${days.map((d) => `<span>${d}</span>`).join('')}</div><div class="row" style="gap:1rem;margin-top:.6rem;font-size:.74rem;color:var(--muted)"><span><i class="status-dot" style="background:#60a5fa"></i> Vendidas</span><span><i class="status-dot" style="background:#a78bfa"></i> Recibidas</span></div>`;
    const top = [...P].sort((a, b) => b.vel - a.vel).slice(0, 5);
    $('#rep-top').innerHTML = top.map((p) => `<div class="list-row"><span class="grow">${esc(p.name)}</span><div class="level" style="width:110px"><i style="width:${(p.vel / top[0].vel * 100).toFixed(0)}%"></i></div><b style="min-width:70px;text-align:right">${p.vel}/día</b></div>`).join('');
  };

  renderStock(); renderReceive(); renderPOs(); renderSuppliers(); renderReports(); views();

  /* ---------- guía ---------- */
  tour.auto([
    { title: 'Así se controla el inventario de tu negocio', text: 'Todo corre en el mismo servidor que tu POS: cada venta descuenta existencias sola. Te mostramos en 5 pasos cómo nunca te vuelves a quedar sin producto.' },
    { target: '#stock-panel', title: 'Paso 1 · Existencias en vivo', text: 'Cada producto con su nivel, su mínimo y su proveedor. Los que están en rojo ya están por debajo del mínimo.' },
    { target: '#simulate-sales', title: 'Paso 2 · Las ventas descuentan solas', text: 'Toca <b>Simular una hora pico</b>: es como si tu POS vendiera durante una hora. Mira cómo bajan las existencias y aparecen las alertas.', action: 'Toca "Simular una hora pico"', advanceOn: '#simulate-sales', delay: 800 },
    { target: '#low-panel', title: 'Paso 3 · La alerta te dice qué pedir', text: 'Arriba aparece qué productos quedaron bajos. Con un toque se crean las órdenes de compra, una por proveedor, con cantidades sugeridas.', action: 'Toca "Crear orden de compra"', advanceOn: '#low-po', delay: 700 },
    { target: '#po-list', title: 'Paso 4 · Envía la orden al proveedor', text: 'Revisa las cantidades y envíala por correo desde aquí mismo. Cuando llegue la mercancía, la marcas como recibida.', action: 'Envía una orden y luego márcala como recibida' },
    { target: '[data-nav="receive"]', title: 'Paso 5 · Recibir escaneando', text: 'En <b>Recibir</b> usas el lector de códigos que instalamos: cada escaneo suma a las existencias en el momento.', action: 'Abre "Recibir" y toca "Escanear"', advanceOn: '[data-nav="receive"]', delay: 300 },
    { title: 'Eso es todo', text: 'Sin hojas de cálculo ni conteos a ciegas. Explora los reportes o repite la guía con "Ver guía paso a paso".' },
  ], { key: 'inventory' });
})();
