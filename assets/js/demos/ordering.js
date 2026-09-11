(() => {
  const { $, $$, money, toast, modal, icon, el, time, esc } = window.Demo;

  const MENU = [
    { id: 1, cat: 'Pizza', name: 'Margherita', desc: 'Tomato, fior di latte, basil', price: 14.5, tags: ['Vegetarian'], sizes: true, g: 'g1' },
    { id: 2, cat: 'Pizza', name: 'Diavola', desc: 'Spicy salami, chilli, mozzarella', price: 16, tags: ['Spicy'], sizes: true, g: 'g2' },
    { id: 3, cat: 'Pizza', name: 'Quattro Formaggi', desc: 'Four cheeses, honey drizzle', price: 17, tags: ['Vegetarian'], sizes: true, g: 'g4' },
    { id: 4, cat: 'Pizza', name: 'Prosciutto e Rucola', desc: 'Parma ham, rocket, parmesan', price: 18, tags: [], sizes: true, g: 'g5' },
    { id: 5, cat: 'Pasta', name: 'Spaghetti Carbonara', desc: 'Guanciale, pecorino, egg', price: 15.5, tags: [], g: 'g6' },
    { id: 6, cat: 'Pasta', name: 'Rigatoni al Ragù', desc: 'Slow-cooked beef ragù', price: 16, tags: [], g: 'g2' },
    { id: 7, cat: 'Pasta', name: 'Penne Arrabbiata', desc: 'Tomato, garlic, chilli', price: 13.5, tags: ['Vegan', 'Spicy'], g: 'g1' },
    { id: 8, cat: 'Salads', name: 'Caprese', desc: 'Tomato, mozzarella, basil, olive oil', price: 11, tags: ['Vegetarian'], g: 'g7' },
    { id: 9, cat: 'Salads', name: 'Caesar', desc: 'Romaine, parmesan, croutons', price: 12, tags: [], g: 'g8' },
    { id: 10, cat: 'Desserts', name: 'Tiramisu', desc: 'Homemade, family recipe', price: 7, tags: ['Vegetarian'], g: 'g3' },
    { id: 11, cat: 'Desserts', name: 'Panna Cotta', desc: 'Berry coulis', price: 6.5, tags: ['Vegetarian'], g: 'g9' },
    { id: 12, cat: 'Drinks', name: 'San Pellegrino 500 ml', desc: 'Sparkling water', price: 3, tags: [], g: 'g10' },
    { id: 13, cat: 'Drinks', name: 'Aranciata', desc: 'Italian orange soda', price: 3.5, tags: [], g: 'g5' },
    { id: 14, cat: 'Drinks', name: 'House Chianti (glass)', desc: '18+ · ID required', price: 7.5, tags: [], g: 'g2' },
  ];
  const CATS = ['Pizza', 'Pasta', 'Salads', 'Desserts', 'Drinks'];
  let activeCat = 'Pizza';
  const cart = [];
  let orderNo = 1043;
  const orders = [
    { no: 1043, name: 'Sarah B.', type: 'Pickup', slot: '12:30', items: [{ name: 'Margherita (Regular)', qty: 1, price: 14.5 }, { name: 'Tiramisu', qty: 1, price: 7 }], total: 21.5, status: 'preparing', note: 'Extra basil please', mine: false },
  ];

  /* ---------- menu ---------- */
  const renderCats = () => {
    $('#cats').innerHTML = CATS.map((c) => `<button type="button" class="${c === activeCat ? 'on' : ''}" data-cat="${c}">${c}</button>`).join('');
    $$('#cats button').forEach((b) => b.addEventListener('click', () => { activeCat = b.dataset.cat; renderCats(); renderMenu(); }));
  };
  const renderMenu = () => {
    const items = MENU.filter((m) => m.cat === activeCat);
    $('#menu').innerHTML = items.map((m, i) => `<article class="dish" style="--i:${i}">
      <div class="dish-img ${m.g}"><span>${m.name.split(' ').map((w) => w[0]).join('').slice(0, 2)}</span></div>
      <div class="dish-body"><div class="dish-top"><b>${m.name}</b><span class="dish-price">${money(m.price)}</span></div><p>${m.desc}</p>
      <div class="dish-foot">${m.tags.map((t) => `<span class="tag ${t === 'Spicy' ? 'amber' : 'green'}">${t}</span>`).join('')}<button class="btn btn-primary btn-xs add" type="button" data-id="${m.id}">${icon('plus')}Add</button></div></div>
    </article>`).join('');
    $$('#menu .add').forEach((b) => b.addEventListener('click', () => addItem(parseInt(b.dataset.id, 10), b)));
  };

  const addItem = (id, btn) => {
    const item = MENU.find((m) => m.id === id);
    if (item.sizes) {
      const card = modal.open(`<h2>${item.name}</h2><p class="muted small" style="margin-bottom:1rem">${item.desc}</p>
        <div class="opt-list">
          <label class="opt"><input type="radio" name="size" value="Regular" checked><span>Regular · 30 cm</span><b>${money(item.price)}</b></label>
          <label class="opt"><input type="radio" name="size" value="Large"><span>Large · 40 cm</span><b>${money(item.price + 4)}</b></label>
        </div>
        <div class="opt-list" style="margin-top:.8rem">
          <label class="opt"><input type="checkbox" name="extra" value="Extra mozzarella" data-price="2"><span>Extra mozzarella</span><b>+$2.00</b></label>
          <label class="opt"><input type="checkbox" name="extra" value="Gluten-free base" data-price="3"><span>Gluten-free base</span><b>+$3.00</b></label>
        </div>
        <div class="modal-actions"><button class="btn btn-ghost" type="button" data-close>Cancel</button><button class="btn btn-primary" type="button" data-add>${icon('bag')}Add to cart</button></div>`);
      $('[data-close]', card).addEventListener('click', modal.close);
      $('[data-add]', card).addEventListener('click', () => {
        const size = $('input[name=size]:checked', card).value;
        const extras = $$('input[name=extra]:checked', card);
        const price = item.price + (size === 'Large' ? 4 : 0) + extras.reduce((s, e) => s + parseFloat(e.dataset.price), 0);
        const label = `${item.name} (${size}${extras.length ? ', ' + extras.map((e) => e.value.toLowerCase()).join(', ') : ''})`;
        pushCart({ key: label, name: label, price });
        modal.close();
      });
    } else pushCart({ key: item.name, name: item.name, price: item.price });
    if (btn) { btn.classList.add('bump'); setTimeout(() => btn.classList.remove('bump'), 400); }
  };
  const pushCart = (line) => {
    const existing = cart.find((c) => c.key === line.key);
    if (existing) existing.qty += 1; else cart.push({ ...line, qty: 1 });
    renderCart(true);
  };

  /* ---------- cart ---------- */
  let orderType = 'Pickup';
  const cartTotals = () => {
    const subtotal = cart.reduce((s, c) => s + c.price * c.qty, 0);
    const fee = orderType === 'Delivery' && cart.length ? 3 : 0;
    return { subtotal, fee, total: subtotal + fee };
  };
  const renderCart = (bounce = false) => {
    const { subtotal, fee, total } = cartTotals();
    const count = cart.reduce((s, c) => s + c.qty, 0);
    const mine = orders.filter((o) => o.mine);
    $('#cart').innerHTML = `
      <div class="panel-head"><h3>${icon('bag')}Your order <span class="cart-count ${bounce ? 'bump' : ''}">${count}</span></h3>
        <div class="seg"><button type="button" class="${orderType === 'Pickup' ? 'on' : ''}" data-type="Pickup">Pickup</button><button type="button" class="${orderType === 'Delivery' ? 'on' : ''}" data-type="Delivery">Delivery</button></div></div>
      ${cart.length ? `<div class="cart-lines">${cart.map((c, i) => `<div class="cart-line"><div class="grow"><b>${esc(c.name)}</b><small>${money(c.price)} each</small></div>
        <div class="qty"><button class="icon-btn" type="button" data-dec="${i}" aria-label="Remove one">${icon('minus')}</button><span>${c.qty}</span><button class="icon-btn" type="button" data-inc="${i}" aria-label="Add one">${icon('plus')}</button></div><b class="line-total">${money(c.price * c.qty)}</b></div>`).join('')}</div>
        <div class="totals"><div><span>Subtotal</span><span>${money(subtotal)}</span></div>${fee ? `<div><span>Delivery</span><span>${money(fee)}</span></div>` : ''}<div class="grand"><span>Total</span><span>${money(total)}</span></div></div>
        <button class="btn btn-primary btn-lg" type="button" id="checkout" style="width:100%">Checkout · ${money(total)} ${icon('arrow-right')}</button>`
        : `<div class="empty">Your cart is empty.<br>Add something from the menu to see how ordering works.</div>`}
      ${mine.length ? `<div class="my-orders">${mine.map(renderStatus).join('')}</div>` : ''}`;
    $$('#cart [data-type]').forEach((b) => b.addEventListener('click', () => { orderType = b.dataset.type; renderCart(); }));
    $$('#cart [data-inc]').forEach((b) => b.addEventListener('click', () => { cart[+b.dataset.inc].qty += 1; renderCart(); }));
    $$('#cart [data-dec]').forEach((b) => b.addEventListener('click', () => { const i = +b.dataset.dec; cart[i].qty -= 1; if (cart[i].qty <= 0) cart.splice(i, 1); renderCart(); }));
    const co = $('#checkout'); if (co) co.addEventListener('click', checkout);
    const bar = $('#cart-bar'); bar.hidden = !cart.length; $('#cart-bar-btn').innerHTML = `${icon('bag')}View cart · ${count} item${count === 1 ? '' : 's'} · ${money(total)}`;
  };
  $('#cart-bar-btn').addEventListener('click', () => $('#cart').scrollIntoView({ behavior: 'smooth', block: 'start' }));

  const STEPS = ['new', 'preparing', 'ready'];
  const renderStatus = (o) => {
    const idx = STEPS.indexOf(o.status === 'collected' ? 'ready' : o.status);
    return `<div class="status-card ${o.status}"><div class="panel-head" style="margin-bottom:.5rem"><b>Order #${o.no} · ${o.type} ${o.slot}</b><span class="mk-badge ${o.status === 'ready' || o.status === 'collected' ? 'green' : o.status === 'preparing' ? 'amber' : 'blue'}">${{ new: 'Received', preparing: 'Preparing', ready: 'Ready for ' + (o.type === 'Delivery' ? 'delivery' : 'pickup'), collected: 'Completed' }[o.status]}</span></div>
      <div class="ha-steps big"><div class="s ${idx >= 0 ? 'done' : ''}"><i></i><span>Received</span></div><div class="s ${idx >= 1 ? 'done' : ''}"><i></i><span>Preparing</span></div><div class="s ${idx >= 2 ? 'done' : ''}"><i></i><span>Ready</span></div></div>
      ${o.status === 'new' ? `<p class="small muted" style="margin-top:.6rem">${icon('arrow-right')} Watch the kitchen screen: tap <b>Accept</b> to see the status update here.</p>` : ''}
      ${o.status === 'ready' ? `<div class="sms-preview">${icon('message')}<div><b>SMS sent to ${esc(o.name)}</b><span>Hi ${esc(o.name.split(' ')[0])}, your order #${o.no} is ready${o.type === 'Delivery' ? ' and on its way' : ' for pickup'}. Thank you!</span></div></div>` : ''}</div>`;
  };

  /* ---------- checkout ---------- */
  const checkout = () => {
    const { total } = cartTotals();
    const card = modal.open(`<h2>Checkout · ${orderType}</h2>
      <div class="form-grid">
        <div class="field"><label>Your name</label><input class="input" name="name" value="Alex Morgan"></div>
        <div class="field"><label>Mobile (for SMS updates)</label><input class="input" name="phone" value="+1 555 0102"></div>
        ${orderType === 'Delivery' ? `<div class="field full"><label>Delivery address</label><input class="input" name="address" value="14 Harbour Street, Apt 3"></div>` : ''}
        <div class="field"><label>When</label><select class="input" name="slot"><option>As soon as possible</option><option>In 30 minutes</option><option>In 45 minutes</option><option>In 1 hour</option></select></div>
        <div class="field"><label>Payment</label><select class="input" name="pay"><option>Pay online now (card)</option><option>Pay at ${orderType === 'Delivery' ? 'the door' : 'pickup'}</option></select></div>
        <div class="field full"><label>Note for the kitchen (optional)</label><input class="input" name="note" placeholder="Allergies, extra napkins…"></div>
      </div>
      <div class="totals" style="margin-top:1rem"><div class="grand"><span>Total to pay</span><span>${money(total)}</span></div></div>
      <div class="modal-actions"><button class="btn btn-ghost" type="button" data-close>Back</button><button class="btn btn-primary btn-lg" type="button" data-place>${icon('lock')}Place order · ${money(total)}</button></div>`);
    $('[data-close]', card).addEventListener('click', modal.close);
    $('[data-place]', card).addEventListener('click', () => {
      const f = (n) => ($(`[name=${n}]`, card) || {}).value || '';
      const btn = $('[data-place]', card); btn.disabled = true; btn.innerHTML = `<i class="spin"></i> Processing payment…`;
      setTimeout(() => {
        const slot = f('slot') === 'As soon as possible' ? (orderType === 'Delivery' ? '30 min' : '15 min') : f('slot').replace('In ', '');
        const o = { no: ++orderNo, name: f('name') || 'Guest', phone: f('phone'), type: orderType, slot, items: cart.map((c) => ({ name: c.name, qty: c.qty, price: c.price })), total, status: 'new', note: f('note'), pay: f('pay'), address: f('address'), mine: true, at: time() };
        orders.unshift(o); cart.length = 0;
        modal.close(); renderCart(); renderOrders(true); printTicket(o);
        toast(`Order #${o.no} placed`, `Paid ${money(total)} · ${o.type} in ${slot}. The kitchen screen just received it.`);
      }, 1400);
    });
  };

  /* ---------- kitchen ---------- */
  const renderOrders = (isNew = false) => {
    $('#orders').innerHTML = orders.filter((o) => o.status !== 'collected').map((o, i) => `<div class="list-row order-row ${isNew && i === 0 ? 'new' : ''} ${o.status}">
      <div class="grow"><div class="row" style="gap:.5rem;margin-bottom:.2rem"><b>#${o.no}</b><span class="mk-badge ${o.status === 'new' ? 'blue' : o.status === 'preparing' ? 'amber' : 'green'}">${o.status === 'new' ? 'NEW' : o.status.toUpperCase()}</span><small>${o.type} · ${o.slot}${o.at ? ' · ' + o.at : ''}</small></div>
        <small>${o.items.map((it) => `${it.qty} × ${esc(it.name)}`).join(', ')}</small>${o.note ? `<small class="note">${icon('message')}${esc(o.note)}</small>` : ''}</div>
      <div class="order-actions">${o.status === 'new' ? `<button class="btn btn-primary btn-xs" type="button" data-accept="${o.no}">Accept</button>` : o.status === 'preparing' ? `<button class="btn btn-success btn-xs" type="button" data-ready="${o.no}">${icon('check')}Ready</button>` : `<button class="btn btn-ghost btn-xs" type="button" data-done="${o.no}">Collected</button>`}</div>
    </div>`).join('') || '<div class="empty">No open orders. Place one from the menu.</div>';
    const setStatus = (no, status, msg) => { const o = orders.find((x) => x.no === no); o.status = status; renderOrders(); renderCart(); if (msg) toast(...msg); };
    $$('#orders [data-accept]').forEach((b) => b.addEventListener('click', () => setStatus(+b.dataset.accept, 'preparing', [`Order #${b.dataset.accept} accepted`, 'The customer sees "Preparing" on their phone.', 'info', 'utensils'])));
    $$('#orders [data-ready]').forEach((b) => b.addEventListener('click', () => setStatus(+b.dataset.ready, 'ready', [`Order #${b.dataset.ready} ready`, 'SMS sent to the customer automatically.', 'ok', 'message'])));
    $$('#orders [data-done]').forEach((b) => b.addEventListener('click', () => setStatus(+b.dataset.done, 'collected')));
  };
  const printTicket = (o) => {
    const out = $('#printer-out');
    out.innerHTML = `<div class="tk-paper"><b>ORDER #${o.no} · ${o.type.toUpperCase()}</b><span>${o.at} · ready in ${o.slot}</span><span>${esc(o.name)} · ${esc(o.phone || '')}</span>${o.items.map((it) => `<span>${it.qty} × ${esc(it.name)}</span>`).join('')}${o.note ? `<span>NOTE: ${esc(o.note)}</span>` : ''}<b>TOTAL ${money(o.total)} · ${o.pay && o.pay.startsWith('Pay online') ? 'PAID' : 'TO PAY'}</b></div>`;
    out.classList.remove('printing'); void out.offsetWidth; out.classList.add('printing');
  };

  renderCats(); renderMenu(); renderCart(); renderOrders();
})();
