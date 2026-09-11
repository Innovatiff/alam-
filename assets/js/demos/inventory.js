(() => {
  const { $, $$, money, toast, modal, views, icon, time, esc } = window.Demo;

  const SUPPLIERS = [
    { id: 1, name: 'Northside Dairy', contact: 'orders@northsidedairy.example', lead: '1 day', items: 'Milk, oat milk, cream, butter' },
    { id: 2, name: 'Roastery Co.', contact: 'hello@roastery.example', lead: '3 days', items: 'Espresso beans, filter coffee' },
    { id: 3, name: 'Bakehouse Supplies', contact: 'sales@bakehouse.example', lead: '2 days', items: 'Frozen pastries, flour, sugar' },
    { id: 4, name: 'PackRight', contact: 'orders@packright.example', lead: '4 days', items: 'Cups, lids, bags, napkins' },
  ];
  const P = [
    { id: 1, sku: 'BEAN-1KG', name: 'Espresso beans 1 kg', cat: 'Coffee', stock: 39, min: 20, unit: 'bag', cost: 24, sup: 2, vel: 4 },
    { id: 2, sku: 'FILT-500', name: 'Filter coffee 500 g', cat: 'Coffee', stock: 14, min: 10, unit: 'bag', cost: 11, sup: 2, vel: 1 },
    { id: 3, sku: 'MILK-2L', name: 'Whole milk 2 L', cat: 'Dairy', stock: 26, min: 24, unit: 'bottle', cost: 2.1, sup: 1, vel: 9 },
    { id: 4, sku: 'OAT-1L', name: 'Oat milk 1 L', cat: 'Dairy', stock: 5, min: 12, unit: 'carton', cost: 1.9, sup: 1, vel: 6 },
    { id: 5, sku: 'CREAM-1L', name: 'Cream 1 L', cat: 'Dairy', stock: 8, min: 6, unit: 'carton', cost: 3.4, sup: 1, vel: 2 },
    { id: 6, sku: 'CROIS-FZ', name: 'Croissants (frozen, box of 40)', cat: 'Bakery', stock: 3, min: 2, unit: 'box', cost: 28, sup: 3, vel: 1 },
    { id: 7, sku: 'MUFF-FZ', name: 'Muffins (frozen, box of 24)', cat: 'Bakery', stock: 2, min: 3, unit: 'box', cost: 22, sup: 3, vel: 1 },
    { id: 8, sku: 'BAGEL-DZ', name: 'Bagels (dozen)', cat: 'Bakery', stock: 6, min: 4, unit: 'dozen', cost: 9, sup: 3, vel: 2 },
    { id: 9, sku: 'CUP-12', name: 'Cups 12 oz (sleeve of 50)', cat: 'Packaging', stock: 18, min: 10, unit: 'sleeve', cost: 6.5, sup: 4, vel: 3 },
    { id: 10, sku: 'CUP-8', name: 'Cups 8 oz (sleeve of 50)', cat: 'Packaging', stock: 4, min: 8, unit: 'sleeve', cost: 5.8, sup: 4, vel: 2 },
    { id: 11, sku: 'LID-12', name: 'Lids 12 oz (sleeve of 100)', cat: 'Packaging', stock: 15, min: 8, unit: 'sleeve', cost: 4.2, sup: 4, vel: 2 },
    { id: 12, sku: 'BAG-PAP', name: 'Paper bags (pack of 250)', cat: 'Packaging', stock: 9, min: 4, unit: 'pack', cost: 12, sup: 4, vel: 1 },
    { id: 13, sku: 'SUGAR-5', name: 'Sugar 5 kg', cat: 'Dry goods', stock: 7, min: 3, unit: 'bag', cost: 8, sup: 3, vel: 1 },
    { id: 14, sku: 'OJ-1L', name: 'Orange juice 1 L', cat: 'Drinks', stock: 11, min: 12, unit: 'bottle', cost: 2.6, sup: 1, vel: 3 },
  ];
  const sup = (id) => SUPPLIERS.find((s) => s.id === id);
  const isLow = (p) => p.stock < p.min;
  const status = (p) => (p.stock <= 0 ? ['red', 'Out of stock'] : isLow(p) ? ['red', 'Low'] : p.stock < p.min * 1.5 ? ['amber', 'Getting low'] : ['green', 'OK']);
  let filter = 'all', query = '';
  const received = [];
  let poNo = 217;
  const pos = [
    { no: 216, sup: 2, items: [{ id: 1, qty: 20 }], status: 'Sent', at: 'Yesterday 16:40' },
    { no: 215, sup: 4, items: [{ id: 9, qty: 30 }, { id: 11, qty: 20 }], status: 'Received', at: 'Mon 09:10' },
  ];
  const movement = [[42, 30], [38, 0], [51, 24], [47, 0], [60, 40], [72, 0], [35, 12]]; // [out, in] per day

  /* ---------- stock ---------- */
  const renderStock = (flashId) => {
    const low = P.filter(isLow);
    $('#low-count').textContent = low.length || '';
    $('#low-panel').innerHTML = low.length ? `<div class="low-panel"><div class="grow"><b>${icon('alert')}${low.length} item${low.length === 1 ? '' : 's'} below minimum</b><small>${low.map((p) => esc(p.name)).join(', ')}</small></div><button class="btn btn-primary btn-sm" type="button" id="low-po">${icon('file')}Create purchase order${low.length > 1 ? 's' : ''}</button></div>` : `<div class="low-panel ok"><b>${icon('check')}Everything is above minimum</b></div>`;
    const lp = $('#low-po'); if (lp) lp.addEventListener('click', createPOsFromLow);
    const list = P.filter((p) => (filter === 'all' || isLow(p)) && (!query || p.name.toLowerCase().includes(query) || p.sku.toLowerCase().includes(query)));
    $('#stock-table').innerHTML = `<thead><tr><th>Product</th><th>Category</th><th>Level</th><th class="num">In stock</th><th class="num">Min</th><th>Status</th><th>Supplier</th><th></th></tr></thead><tbody>${list.map((p) => { const [c, s] = status(p); const pct = Math.min(100, p.stock / (p.min * 2.5) * 100); return `<tr class="${p.id === flashId ? 'flash' : ''}"><td><b>${esc(p.name)}</b><small class="muted" style="display:block">${p.sku}</small></td><td>${p.cat}</td><td><div class="level ${c === 'red' ? 'low' : c === 'amber' ? 'warn' : ''}"><i style="width:${pct.toFixed(0)}%"></i></div></td><td class="num"><b>${p.stock}</b> <span class="muted small">${p.unit}${p.stock === 1 ? '' : 's'}</span></td><td class="num">${p.min}</td><td><span class="mk-badge ${c}">${s}</span></td><td>${sup(p.sup).name}</td><td><div class="row" style="gap:.3rem;flex-wrap:nowrap"><button class="btn btn-ghost btn-xs" type="button" data-sell="${p.id}" title="Simulate a sale on the POS">Sell 1</button><button class="btn btn-ghost btn-xs" type="button" data-adjust="${p.id}">Adjust</button></div></td></tr>`; }).join('')}</tbody>`;
    $$('#stock-table [data-sell]').forEach((b) => b.addEventListener('click', () => sell(+b.dataset.sell)));
    $$('#stock-table [data-adjust]').forEach((b) => b.addEventListener('click', () => adjustModal(P.find((p) => p.id === +b.dataset.adjust))));
    $('#po-count').textContent = pos.filter((o) => o.status !== 'Received').length || '';
  };
  const sell = (id) => { const p = P.find((x) => x.id === id); if (p.stock <= 0) { toast('Out of stock', 'The POS would show this item as unavailable.', 'warn', 'alert'); return; } p.stock -= 1; movement[6][0] += 1; const wasLow = isLow(p); renderStock(id); renderReports(); if (wasLow && p.stock === p.min - 1) toast(`${p.name} is now below minimum`, 'Added to the reorder list.', 'warn', 'bell'); };
  $('#simulate-sales').addEventListener('click', () => { let n = 0; P.forEach((p) => { const q = Math.min(p.stock, Math.round(p.vel * (0.5 + Math.random()))); p.stock -= q; n += q; movement[6][0] += q; }); renderStock(); renderReports(); const low = P.filter(isLow).length; toast(`Busy hour: ${n} units sold on the POS`, `Stock updated automatically. ${low} item${low === 1 ? '' : 's'} now below minimum.`, low ? 'warn' : 'ok', 'pos'); });
  const adjustModal = (p) => {
    const card = modal.open(`<h2>Adjust · ${esc(p.name)}</h2><p class="muted small" style="margin-bottom:1rem">Currently ${p.stock} ${p.unit}${p.stock === 1 ? '' : 's'} · minimum ${p.min}</p>
      <div class="form-grid"><div class="field"><label>New count</label><input class="input" type="number" name="count" value="${p.stock}" min="0"></div><div class="field"><label>Reason</label><select class="input" name="reason"><option>Stock count</option><option>Waste / expired</option><option>Breakage</option><option>Staff use</option><option>Correction</option></select></div><div class="field full"><label>Minimum level (reorder point)</label><input class="input" type="number" name="min" value="${p.min}" min="0"></div></div>
      <div class="modal-actions"><button class="btn btn-ghost" type="button" data-close>Cancel</button><button class="btn btn-primary" type="button" data-save>${icon('check')}Save</button></div>`);
    $('[data-close]', card).addEventListener('click', modal.close);
    $('[data-save]', card).addEventListener('click', () => { const c = parseInt($('[name=count]', card).value, 10); const reason = $('[name=reason]', card).value; const diff = c - p.stock; p.stock = Math.max(0, c); p.min = Math.max(0, parseInt($('[name=min]', card).value, 10) || 0); modal.close(); renderStock(p.id); renderReports(); toast('Stock adjusted', `${esc(p.name)}: ${diff >= 0 ? '+' : ''}${diff} (${reason}), logged with your name and the time.`); });
  };
  $('#inv-search').addEventListener('input', (e) => { query = e.target.value.trim().toLowerCase(); renderStock(); });
  $$('#inv-filter button').forEach((b) => b.addEventListener('click', () => { filter = b.dataset.f; $$('#inv-filter button').forEach((x) => x.classList.toggle('on', x === b)); renderStock(); }));

  /* ---------- receive ---------- */
  const receive = (p, qty, how) => { p.stock += qty; movement[6][1] += qty; received.unshift({ p, qty, how, at: time() }); renderReceive(); renderStock(p.id); renderReports(); toast(`+${qty} ${esc(p.name)}`, `${how} · now ${p.stock} in stock${isLow(p) ? ' (still below minimum)' : ''}.`, 'ok', 'plus'); };
  const renderReceive = () => {
    $('#rcv-product').innerHTML = P.map((p) => `<option value="${p.id}">${esc(p.name)}</option>`).join('');
    $('#rcv-log').innerHTML = received.map((r, i) => `<div class="list-row ${i === 0 ? 'new' : ''}"><span class="avatar sm c2">${icon('package')}</span><div class="grow"><b>${esc(r.p.name)}</b><small>${r.how} · ${r.at}</small></div><span class="mk-badge green">+${r.qty}</span></div>`).join('') || '<div class="empty">Nothing received yet today. Scan an item or add stock manually.</div>';
  };
  $('#scan-btn').addEventListener('click', () => {
    const btn = $('#scan-btn'); btn.disabled = true; btn.innerHTML = '<i class="spin"></i> Scanning…';
    const visual = $('#scan-visual'); visual.classList.add('scanning');
    setTimeout(() => { const low = P.filter(isLow); const p = (low.length ? low : P)[Math.floor(Math.random() * (low.length ? low.length : P.length))]; const qty = p.unit === 'box' || p.unit === 'dozen' ? 2 : 12; receive(p, qty, 'Scanned'); btn.disabled = false; btn.innerHTML = `${icon('scan')}Scan next item`; visual.classList.remove('scanning'); }, 900);
  });
  $('#rcv-btn').addEventListener('click', () => { const p = P.find((x) => x.id === +$('#rcv-product').value); const qty = Math.max(1, parseInt($('#rcv-qty').value, 10) || 1); receive(p, qty, 'Manual entry'); });

  /* ---------- purchase orders ---------- */
  const createPOsFromLow = () => {
    const low = P.filter(isLow); if (!low.length) { toast('Nothing is low right now', '', 'info', 'check'); return; }
    const bySup = {}; low.forEach((p) => { (bySup[p.sup] = bySup[p.sup] || []).push({ id: p.id, qty: Math.max(p.min * 2 - p.stock, p.min) }); });
    Object.entries(bySup).forEach(([s, items]) => pos.unshift({ no: ++poNo, sup: +s, items, status: 'Draft', at: time(), isNew: true }));
    renderPOs(); renderStock(); toast(`${Object.keys(bySup).length} purchase order${Object.keys(bySup).length > 1 ? 's' : ''} created`, 'One per supplier, quantities suggested from your minimums. Review and send.', 'ok', 'file');
    document.querySelector('[data-nav="orders"]').click();
  };
  $('#po-from-low').addEventListener('click', createPOsFromLow);
  const renderPOs = () => {
    $('#po-list').innerHTML = pos.map((o) => { const s = sup(o.sup); const total = o.items.reduce((a, it) => a + P.find((p) => p.id === it.id).cost * it.qty, 0); return `<div class="panel po ${o.isNew ? 'new' : ''}"><div class="panel-head"><div><h3 style="margin:0">PO-${o.no} · ${esc(s.name)}</h3><small class="muted">${o.at} · lead time ${s.lead}</small></div><span class="mk-badge ${o.status === 'Received' ? 'green' : o.status === 'Sent' ? 'blue' : 'amber'}">${o.status}</span></div>
      <table class="table" style="margin-bottom:.8rem"><tbody>${o.items.map((it) => { const p = P.find((x) => x.id === it.id); return `<tr><td>${esc(p.name)}</td><td class="num">${it.qty} ${p.unit}${it.qty === 1 ? '' : 's'}</td><td class="num">${money(p.cost * it.qty)}</td></tr>`; }).join('')}<tr><td><b>Total</b></td><td></td><td class="num"><b>${money(total)}</b></td></tr></tbody></table>
      <div class="row" style="justify-content:flex-end">${o.status === 'Draft' ? `<button class="btn btn-ghost btn-xs" type="button" data-del="${o.no}">Delete</button><button class="btn btn-primary btn-xs" type="button" data-send="${o.no}">${icon('mail')}Email to supplier</button>` : o.status === 'Sent' ? `<button class="btn btn-success btn-xs" type="button" data-recv="${o.no}">${icon('check')}Delivery arrived · receive all</button>` : `<span class="muted small">Received into stock</span>`}</div></div>`; }).join('') || '<div class="empty">No purchase orders. Create one from the low-stock list.</div>';
    pos.forEach((o) => { o.isNew = false; });
    $$('#po-list [data-send]').forEach((b) => b.addEventListener('click', () => { const o = pos.find((x) => x.no === +b.dataset.send); o.status = 'Sent'; renderPOs(); renderStock(); toast(`PO-${o.no} emailed to ${sup(o.sup).name}`, `Expected in ${sup(o.sup).lead}. You will receive it by scanning.`, 'ok', 'mail'); }));
    $$('#po-list [data-recv]').forEach((b) => b.addEventListener('click', () => { const o = pos.find((x) => x.no === +b.dataset.recv); o.status = 'Received'; o.items.forEach((it) => { const p = P.find((x) => x.id === it.id); p.stock += it.qty; movement[6][1] += it.qty; received.unshift({ p, qty: it.qty, how: `PO-${o.no}`, at: time() }); }); renderPOs(); renderStock(); renderReceive(); renderReports(); toast(`PO-${o.no} received`, 'Stock levels updated. Differences would be flagged here.', 'ok', 'package'); }));
    $$('#po-list [data-del]').forEach((b) => b.addEventListener('click', () => { const i = pos.findIndex((x) => x.no === +b.dataset.del); pos.splice(i, 1); renderPOs(); renderStock(); }));
  };

  /* ---------- suppliers & reports ---------- */
  const renderSuppliers = () => { $('#sup-grid').innerHTML = SUPPLIERS.map((s) => `<div class="card static"><div class="icon-ring">${icon('truck')}</div><h3 style="margin-top:.9rem">${esc(s.name)}</h3><p class="small">${esc(s.items)}</p><ul class="contact-list" style="list-style:none;padding:0;margin:.8rem 0 0;display:grid;gap:.4rem;font-size:.84rem"><li>${icon('mail')}<span>${esc(s.contact)}</span></li><li>${icon('clock')}<span>Lead time ${s.lead}</span></li><li>${icon('package')}<span>${P.filter((p) => p.sup === s.id).length} products</span></li></ul></div>`).join(''); };
  const renderReports = () => {
    const value = P.reduce((a, p) => a + p.stock * p.cost, 0);
    const low = P.filter(isLow).length;
    const out = movement.reduce((a, m) => a + m[0], 0), inn = movement.reduce((a, m) => a + m[1], 0);
    $('#rep-kpis').innerHTML = `<div class="kpi-tile"><small>Stock value</small><b>${money(value)}</b><em>at cost price</em><span class="ic grad-blue">${icon('dollar')}</span></div><div class="kpi-tile"><small>Below minimum</small><b>${low}</b><em class="${low ? 'bad' : ''}">${low ? 'needs ordering' : 'all good'}</em><span class="ic grad-violet">${icon('bell')}</span></div><div class="kpi-tile"><small>Units sold · 7 days</small><b>${out}</b><em>from the POS</em><span class="ic grad-indigo">${icon('trending-up')}</span></div><div class="kpi-tile"><small>Units received · 7 days</small><b>${inn}</b><em>from deliveries</em><span class="ic grad-cyan">${icon('package')}</span></div>`;
    const max = Math.max(...movement.flat(), 1);
    const days = ['Thu', 'Fri', 'Sat', 'Sun', 'Mon', 'Tue', 'Today'];
    $('#rep-chart').innerHTML = `<div class="chart-bars">${movement.map(([o, i]) => `<div><i style="height:${(o / max * 100).toFixed(0)}%" title="${o} sold"></i><i class="alt" style="height:${(i / max * 100).toFixed(0)}%" title="${i} received"></i></div>`).join('')}</div><div class="chart-labels">${days.map((d) => `<span>${d}</span>`).join('')}</div><div class="row" style="gap:1rem;margin-top:.6rem;font-size:.74rem;color:var(--muted)"><span><i class="status-dot" style="background:#60a5fa"></i> Sold</span><span><i class="status-dot" style="background:#a78bfa"></i> Received</span></div>`;
    const top = [...P].sort((a, b) => b.vel - a.vel).slice(0, 5);
    $('#rep-top').innerHTML = top.map((p) => `<div class="list-row"><span class="grow">${esc(p.name)}</span><div class="level" style="width:110px"><i style="width:${(p.vel / top[0].vel * 100).toFixed(0)}%"></i></div><b style="min-width:70px;text-align:right">${p.vel}/day</b></div>`).join('');
  };

  renderStock(); renderReceive(); renderPOs(); renderSuppliers(); renderReports(); views();
})();
