(() => {
  const { $, $$, money, toast, modal, views, icon, time, esc } = window.Demo;

  const PRODUCTS = [
    { id: 1, cat: 'Coffee', name: 'Espresso', price: 3.2, bc: '5001' }, { id: 2, cat: 'Coffee', name: 'Latte', price: 4.5, bc: '5002' }, { id: 3, cat: 'Coffee', name: 'Cappuccino', price: 4.2, bc: '5003' }, { id: 4, cat: 'Coffee', name: 'Flat white', price: 4.4, bc: '5004' }, { id: 5, cat: 'Coffee', name: 'Iced latte', price: 5, bc: '5005' },
    { id: 6, cat: 'Food', name: 'Croissant', price: 3.2, bc: '5011' }, { id: 7, cat: 'Food', name: 'Bagel & cream cheese', price: 5.5, bc: '5012' }, { id: 8, cat: 'Food', name: 'Avocado toast', price: 9.5, bc: '5013' }, { id: 9, cat: 'Food', name: 'Blueberry muffin', price: 3.5, bc: '5014' }, { id: 10, cat: 'Food', name: 'Granola bowl', price: 8, bc: '5015' },
    { id: 11, cat: 'Drinks', name: 'Fresh orange juice', price: 4.8, bc: '5021' }, { id: 12, cat: 'Drinks', name: 'Sparkling water', price: 2.5, bc: '5022' }, { id: 13, cat: 'Drinks', name: 'Iced tea', price: 3.8, bc: '5023' },
    { id: 14, cat: 'Retail', name: 'Coffee beans 250 g', price: 14, bc: '5031' }, { id: 15, cat: 'Retail', name: 'Reusable cup', price: 18, bc: '5032' }, { id: 16, cat: 'Retail', name: 'Gift card $25', price: 25, bc: '5033' },
  ];
  const CATS = ['All', 'Coffee', 'Food', 'Drinks', 'Retail'];
  const TAX = 0.08;
  let cat = 'All', query = '';
  const cart = []; // {id, qty}
  let discount = { type: 'pct', value: 0 };
  let saleNo = 483;
  const sales = [];
  // seed today's earlier sales
  const rnd = (n) => Math.floor(Math.random() * n);
  for (let i = 0; i < 26; i++) {
    const items = Array.from({ length: 1 + rnd(3) }, () => { const p = PRODUCTS[rnd(PRODUCTS.length)]; return { id: p.id, qty: 1 + rnd(2) }; });
    const sub = items.reduce((s, it) => s + PRODUCTS.find((p) => p.id === it.id).price * it.qty, 0);
    const h = 7 + Math.floor(i / 3), m = rnd(60);
    sales.push({ no: 456 + i, at: `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`, items, subtotal: sub, discount: 0, tax: sub * TAX, total: sub * (1 + TAX), pay: ['Card', 'Card', 'Cash', 'Card', 'Cash'][rnd(5)], synced: true });
  }

  const totals = () => {
    const subtotal = cart.reduce((s, it) => s + PRODUCTS.find((p) => p.id === it.id).price * it.qty, 0);
    const disc = discount.type === 'pct' ? subtotal * discount.value / 100 : Math.min(subtotal, discount.value);
    const taxable = subtotal - disc; const tax = taxable * TAX;
    return { subtotal, disc, tax, total: taxable + tax, count: cart.reduce((s, it) => s + it.qty, 0) };
  };

  /* ---------- products ---------- */
  const renderCats = () => {
    $('#pos-cats').innerHTML = CATS.map((c) => `<button type="button" class="${c === cat ? 'on' : ''}" data-cat="${c}">${c}</button>`).join('');
    $$('#pos-cats button').forEach((b) => b.addEventListener('click', () => { cat = b.dataset.cat; renderCats(); renderProducts(); }));
  };
  const renderProducts = () => {
    const list = PRODUCTS.filter((p) => (cat === 'All' || p.cat === cat) && (!query || p.name.toLowerCase().includes(query) || p.bc.includes(query)));
    $('#pos-products').innerHTML = list.map((p, i) => `<button type="button" class="pos-product c${p.id % 6}" data-id="${p.id}" style="--i:${i}"><span class="pp-cat">${p.cat}</span><b>${p.name}</b><span class="pp-price">${money(p.price)}</span></button>`).join('') || '<div class="empty">No product matches.</div>';
    $$('#pos-products .pos-product').forEach((b) => b.addEventListener('click', () => add(+b.dataset.id)));
  };
  const add = (id) => { const line = cart.find((c) => c.id === id); if (line) line.qty += 1; else cart.push({ id, qty: 1 }); renderCart(id); };
  $('#pos-search').addEventListener('input', (e) => { query = e.target.value.trim().toLowerCase(); renderProducts(); });
  $('#pos-search').addEventListener('keydown', (e) => {
    if (e.key !== 'Enter') return;
    const p = PRODUCTS.find((x) => x.bc === query);
    if (p) { add(p.id); toast(`Scanned: ${p.name}`, `Barcode ${p.bc} · ${money(p.price)}`, 'info', 'scan'); e.target.value = ''; query = ''; renderProducts(); }
    else toast('No product with that barcode', 'Try 5012 for a bagel.', 'warn', 'alert');
  });

  /* ---------- cart ---------- */
  const renderCart = (flashId) => {
    const t = totals();
    $('#pos-cart').innerHTML = `<div class="panel-head"><h3>${icon('receipt')}Sale #${saleNo}</h3><div class="row" style="gap:.4rem"><button class="btn btn-ghost btn-xs" type="button" id="disc-btn">${icon('percent')}Discount</button><button class="btn btn-ghost btn-xs" type="button" id="clear-btn" ${cart.length ? '' : 'disabled'}>Clear</button></div></div>
      <div class="pos-lines">${cart.length ? cart.map((it, i) => { const p = PRODUCTS.find((x) => x.id === it.id); return `<div class="cart-line ${it.id === flashId ? 'flash' : ''}"><div class="grow"><b>${p.name}</b><small>${money(p.price)} each</small></div><div class="qty"><button class="icon-btn" type="button" data-dec="${i}" aria-label="Remove one">${icon('minus')}</button><span>${it.qty}</span><button class="icon-btn" type="button" data-inc="${i}" aria-label="Add one">${icon('plus')}</button></div><b class="line-total">${money(p.price * it.qty)}</b></div>`; }).join('') : '<div class="empty">Tap products or scan a barcode to start a sale.</div>'}</div>
      <div class="totals"><div><span>Subtotal</span><span>${money(t.subtotal)}</span></div>${t.disc ? `<div><span>Discount (${discount.type === 'pct' ? discount.value + '%' : money(discount.value)})</span><span>−${money(t.disc)}</span></div>` : ''}<div><span>Tax (8%)</span><span>${money(t.tax)}</span></div><div class="grand"><span>Total</span><span>${money(t.total)}</span></div></div>
      <button class="btn btn-primary btn-lg charge-btn" type="button" id="charge" ${cart.length ? '' : 'disabled'}>Charge ${money(t.total)} ${icon('arrow-right')}</button>`;
    $$('#pos-cart [data-inc]').forEach((b) => b.addEventListener('click', () => { cart[+b.dataset.inc].qty += 1; renderCart(); }));
    $$('#pos-cart [data-dec]').forEach((b) => b.addEventListener('click', () => { const i = +b.dataset.dec; cart[i].qty -= 1; if (cart[i].qty <= 0) cart.splice(i, 1); renderCart(); }));
    $('#clear-btn').addEventListener('click', () => { cart.length = 0; discount = { type: 'pct', value: 0 }; renderCart(); });
    $('#disc-btn').addEventListener('click', discountModal);
    $('#charge').addEventListener('click', payModal);
  };
  const discountModal = () => {
    const card = modal.open(`<h2>Discount</h2><div class="quick-grid">${[5, 10, 15, 20].map((v) => `<button type="button" class="btn btn-ghost" data-pct="${v}">${v}% off</button>`).join('')}</div>
      <div class="form-grid" style="margin-top:1rem"><div class="field"><label>Fixed amount off</label><input class="input" type="number" min="0" step="0.5" name="amt" placeholder="0.00"></div><div class="field"><label>Reason (printed on receipt)</label><select class="input" name="reason"><option>Staff discount</option><option>Loyalty reward</option><option>Manager approval</option></select></div></div>
      <div class="modal-actions"><button class="btn btn-ghost" type="button" data-none>Remove discount</button><button class="btn btn-primary" type="button" data-apply>Apply amount</button></div>`);
    $$('[data-pct]', card).forEach((b) => b.addEventListener('click', () => { discount = { type: 'pct', value: +b.dataset.pct }; modal.close(); renderCart(); toast(`${b.dataset.pct}% discount applied`); }));
    $('[data-none]', card).addEventListener('click', () => { discount = { type: 'pct', value: 0 }; modal.close(); renderCart(); });
    $('[data-apply]', card).addEventListener('click', () => { const v = parseFloat($('[name=amt]', card).value) || 0; discount = { type: 'amt', value: v }; modal.close(); renderCart(); if (v) toast(`${money(v)} discount applied`); });
  };

  /* ---------- payment ---------- */
  const payModal = () => {
    const t = totals();
    let method = 'card';
    const card = modal.open(`<h2>Take payment · ${money(t.total)}</h2>
      <div class="seg" style="margin-bottom:1rem" id="pay-seg"><button type="button" data-m="card" class="on">${icon('credit-card')} Card</button><button type="button" data-m="cash">${icon('dollar')} Cash</button><button type="button" data-m="split">Split</button></div>
      <div id="pay-body"></div>`);
    const body = $('#pay-body', card);
    const render = () => {
      $$('#pay-seg button', card).forEach((b) => b.classList.toggle('on', b.dataset.m === method));
      if (method === 'card') {
        body.innerHTML = `<div class="reader-big"><div class="reader-screen"><span class="r0">${icon('credit-card')}Tap, insert or swipe on the card reader</span></div><div class="reader-slot"></div></div><p class="muted small center" style="margin:.8rem 0 1rem">The amount is sent to the card reader automatically. Nothing to retype.</p><div class="modal-actions"><button class="btn btn-ghost" type="button" data-cancel>Cancel</button><button class="btn btn-primary btn-lg" type="button" data-card>Simulate card tap</button></div>`;
        $('[data-card]', body).addEventListener('click', () => {
          const scr = $('.reader-screen span', body); scr.innerHTML = '<i class="spin"></i> Processing…'; $('[data-card]', body).disabled = true;
          setTimeout(() => { scr.innerHTML = `${icon('check')} Approved`; scr.style.color = '#6ee7b7'; setTimeout(() => complete('Card', t.total, 0), 700); }, 1500);
        });
      } else if (method === 'cash') {
        const quick = [Math.ceil(t.total), Math.ceil(t.total / 5) * 5, Math.ceil(t.total / 10) * 10, Math.ceil(t.total / 20) * 20].filter((v, i, a) => a.indexOf(v) === i);
        body.innerHTML = `<div class="quick-grid">${quick.map((v) => `<button type="button" class="btn btn-ghost" data-cash="${v}">${money(v)}</button>`).join('')}</div>
          <div class="field" style="margin-top:1rem"><label>Amount received</label><input class="input" type="number" step="0.01" name="cash" value="${t.total.toFixed(2)}"></div>
          <div class="totals" style="margin-top:.6rem"><div class="grand"><span>Change due</span><span id="change">${money(0)}</span></div></div>
          <div class="modal-actions"><button class="btn btn-ghost" type="button" data-cancel>Cancel</button><button class="btn btn-success btn-lg" type="button" data-cash-done>${icon('check')}Complete · open drawer</button></div>`;
        const input = $('[name=cash]', body);
        const upd = () => { $('#change', body).textContent = money(Math.max(0, (parseFloat(input.value) || 0) - t.total)); };
        input.addEventListener('input', upd);
        $$('[data-cash]', body).forEach((b) => b.addEventListener('click', () => { input.value = (+b.dataset.cash).toFixed(2); upd(); }));
        $('[data-cash-done]', body).addEventListener('click', () => { const got = parseFloat(input.value) || 0; if (got < t.total - 0.001) { toast('Not enough cash received', '', 'warn', 'alert'); return; } complete('Cash', t.total, got - t.total); });
      } else {
        body.innerHTML = `<div class="field"><label>Cash part</label><input class="input" type="number" step="0.01" name="cashpart" value="${(t.total / 2).toFixed(2)}"></div><div class="totals" style="margin-top:.6rem"><div class="grand"><span>Remaining on card</span><span id="rest">${money(t.total / 2)}</span></div></div>
          <div class="modal-actions"><button class="btn btn-ghost" type="button" data-cancel>Cancel</button><button class="btn btn-primary btn-lg" type="button" data-split>Take cash, then card</button></div>`;
        const input = $('[name=cashpart]', body);
        input.addEventListener('input', () => { $('#rest', body).textContent = money(Math.max(0, t.total - (parseFloat(input.value) || 0))); });
        $('[data-split]', body).addEventListener('click', () => { $('[data-split]', body).disabled = true; $('[data-split]', body).innerHTML = '<i class="spin"></i> Card processing…'; setTimeout(() => complete('Split (cash + card)', t.total, 0), 1500); });
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
    if (pay === 'Cash') toast('Cash drawer opened', change > 0 ? `Change due: ${money(change)}` : 'Exact amount received.', 'info', 'drawer');
    if (!sale.synced) toast('Saved on the on-site server', 'This sale will sync when the internet is back.', 'warn', 'wifi-off');
    receipt(sale, change);
  };
  const receipt = (sale, change) => {
    const card = modal.open(`<h2>Receipt printed</h2>
      <div class="receipt-wrap"><div class="receipt"><b class="rc-title">Sunrise Café</b><span>12 Harbour Street · Tel 555 0100</span><span>Sale #${sale.no} · ${sale.at} · Register 1 · Sam K.</span><hr>
        ${sale.items.map((it) => { const p = PRODUCTS.find((x) => x.id === it.id); return `<div class="rc-line"><span>${it.qty} × ${esc(p.name)}</span><span>${money(p.price * it.qty)}</span></div>`; }).join('')}
        <hr><div class="rc-line"><span>Subtotal</span><span>${money(sale.subtotal)}</span></div>${sale.discount ? `<div class="rc-line"><span>Discount</span><span>−${money(sale.discount)}</span></div>` : ''}<div class="rc-line"><span>Tax 8%</span><span>${money(sale.tax)}</span></div><div class="rc-line rc-total"><span>TOTAL</span><span>${money(sale.total)}</span></div><div class="rc-line"><span>Paid by ${sale.pay}</span><span>${change > 0 ? 'Change ' + money(change) : ''}</span></div><hr><span class="center">Thank you! See you tomorrow.</span><div class="rc-barcode">${Array.from({ length: 28 }, (_, i) => `<i style="--w:${[1, 2, 1, 3][i % 4]}"></i>`).join('')}</div></div></div>
      <div class="modal-actions"><button class="btn btn-ghost" type="button" data-email>${icon('mail')}Email receipt</button><button class="btn btn-primary" type="button" data-new>New sale ${icon('arrow-right')}</button></div>`);
    $('[data-email]', card).addEventListener('click', () => toast('Receipt emailed', 'Sent to the customer\'s address on file.', 'ok', 'mail'));
    $('[data-new]', card).addEventListener('click', modal.close);
  };

  /* ---------- sales & end of day ---------- */
  const renderSales = () => {
    const list = [...sales].reverse();
    $('#sales-sub').textContent = `${sales.length} sales · ${money(sales.reduce((s, x) => s + x.total, 0))} so far`;
    $('#sales-table').innerHTML = `<thead><tr><th>#</th><th>Time</th><th>Items</th><th>Payment</th><th class="num">Total</th><th>Sync</th></tr></thead><tbody>${list.map((s, i) => `<tr class="${i === 0 ? 'new' : ''}"><td>${s.no}</td><td>${s.at}</td><td>${s.items.map((it) => `${it.qty} × ${PRODUCTS.find((p) => p.id === it.id).name}`).join(', ')}</td><td>${s.pay}</td><td class="num"><b>${money(s.total)}</b></td><td>${s.synced ? '<span class="mk-badge green">Synced</span>' : '<span class="mk-badge amber">Saved locally</span>'}</td></tr>`).join('')}</tbody>`;
  };
  const renderEod = () => {
    const total = sales.reduce((s, x) => s + x.total, 0);
    const byPay = {}; sales.forEach((s) => { byPay[s.pay] = (byPay[s.pay] || 0) + s.total; });
    const byProd = {}; sales.forEach((s) => s.items.forEach((it) => { byProd[it.id] = (byProd[it.id] || 0) + it.qty; }));
    const top = Object.entries(byProd).sort((a, b) => b[1] - a[1]).slice(0, 5);
    const maxQ = top.length ? top[0][1] : 1;
    $('#eod-kpis').innerHTML = `<div class="kpi-tile"><small>Sales</small><b>${money(total)}</b><em>${sales.length} transactions</em><span class="ic grad-blue">${icon('dollar')}</span></div><div class="kpi-tile"><small>Average sale</small><b>${money(sales.length ? total / sales.length : 0)}</b><em>per transaction</em><span class="ic grad-indigo">${icon('receipt')}</span></div><div class="kpi-tile"><small>Tax collected</small><b>${money(sales.reduce((s, x) => s + x.tax, 0))}</b><em>8% sales tax</em><span class="ic grad-violet">${icon('percent')}</span></div><div class="kpi-tile"><small>Cash in drawer</small><b>${money(150 + (byPay.Cash || 0))}</b><em>incl. $150 float</em><span class="ic grad-cyan">${icon('drawer')}</span></div>`;
    $('#eod-pay').innerHTML = Object.entries(byPay).map(([k, v]) => `<div class="list-row"><span class="grow">${k}</span><div class="level" style="width:120px"><i style="width:${(v / total * 100).toFixed(0)}%"></i></div><b style="min-width:80px;text-align:right">${money(v)}</b></div>`).join('');
    $('#eod-top').innerHTML = top.map(([id, q]) => `<div class="list-row"><span class="grow">${PRODUCTS.find((p) => p.id === +id).name}</span><div class="level" style="width:120px"><i style="width:${(q / maxQ * 100).toFixed(0)}%"></i></div><b style="min-width:50px;text-align:right">${q} sold</b></div>`).join('');
  };
  $('#close-day').addEventListener('click', () => toast('Register closed', 'Z report printed and emailed. Stock updated in inventory.', 'ok', 'printer'));

  /* ---------- offline switch ---------- */
  const sw = $('#offline');
  const toggleOffline = () => { const on = sw.classList.toggle('on'); sw.setAttribute('aria-checked', String(on)); document.body.classList.toggle('is-offline', on); if (on) toast('Internet connection lost', 'Keep selling. Sales are stored on the on-site server.', 'warn', 'wifi-off'); else { sales.forEach((s) => { s.synced = true; }); renderSales(); toast('Back online', 'Local sales synced to the website and reports.', 'ok', 'refresh'); } };
  sw.addEventListener('click', toggleOffline);
  sw.addEventListener('keydown', (e) => { if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); toggleOffline(); } });

  renderCats(); renderProducts(); renderCart(); renderSales(); renderEod(); views();
})();
