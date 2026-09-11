(() => {
  const { $, $$, money, toast, modal, icon, el, time, esc, tour } = window.Demo;
  const U = (id, w = 900) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=75`;

  const CATS = [
    { id: 'pizzas', name: 'Pizzas', desc: 'Al horno de leña, masa de 48 horas' },
    { id: 'pastas', name: 'Pastas', desc: 'Hechas en casa cada mañana' },
    { id: 'burgers', name: 'Hamburguesas', desc: 'Carne de res de la región, pan brioche' },
    { id: 'ensaladas', name: 'Ensaladas', desc: 'Frescas, con productos del mercado' },
    { id: 'postres', name: 'Postres', desc: 'Para terminar bien' },
    { id: 'bebidas', name: 'Bebidas', desc: 'Frías y calientes' },
  ];
  const MENU = [
    { id: 1, cat: 'pizzas', name: 'Pizza Margarita', desc: 'Tomate San Marzano, mozzarella fresca, albahaca', price: 15.5, tags: ['Vegetariana', 'Favorita'], sizes: true, img: ['1513104890138-7c749659a591', '1565299624946-b28f40a0ae38'], g: 'g1' },
    { id: 2, cat: 'pizzas', name: 'Pizza Pepperoni', desc: 'Pepperoni artesanal, mozzarella, orégano', price: 17, tags: ['Favorita'], sizes: true, img: ['1565299624946-b28f40a0ae38', '1513104890138-7c749659a591'], g: 'g2' },
    { id: 3, cat: 'pizzas', name: 'Pizza Cuatro Quesos', desc: 'Mozzarella, gorgonzola, parmesano, provolone y miel', price: 18, tags: ['Vegetariana'], sizes: true, img: ['1565299585323-38d6b0865b47', '1513104890138-7c749659a591'], g: 'g4' },
    { id: 4, cat: 'pastas', name: 'Spaghetti Carbonara', desc: 'Panceta, pecorino, yema de huevo, pimienta', price: 16.5, tags: [], img: ['1473093295043-cdd812d0e601', '1551504734-5ee1c4a1479b'], g: 'g6' },
    { id: 5, cat: 'pastas', name: 'Lasaña de la casa', desc: 'Ragú de res cocido 6 horas, bechamel, parmesano', price: 17.5, tags: ['Favorita'], img: ['1551504734-5ee1c4a1479b', '1473093295043-cdd812d0e601'], g: 'g2' },
    { id: 6, cat: 'pastas', name: 'Penne Arrabbiata', desc: 'Tomate, ajo, chile, albahaca', price: 14, tags: ['Vegana', 'Picante'], img: ['1476718406336-bb5a9690ee2a', '1473093295043-cdd812d0e601'], g: 'g1' },
    { id: 7, cat: 'burgers', name: 'Hamburguesa Clásica', desc: 'Res 180 g, cheddar, lechuga, tomate, salsa de la casa, papas', price: 15, tags: ['Favorita'], img: ['1568901346375-23c9450c58cd', '1551782450-a2132b4ba21d'], g: 'g5' },
    { id: 8, cat: 'burgers', name: 'Hamburguesa BBQ', desc: 'Res 180 g, tocino, aros de cebolla, BBQ ahumada, papas', price: 16.5, tags: [], img: ['1551782450-a2132b4ba21d', '1568901346375-23c9450c58cd'], g: 'g6' },
    { id: 9, cat: 'ensaladas', name: 'Ensalada César', desc: 'Lechuga romana, parmesano, crutones, aderezo César', price: 12, tags: [], img: ['1546069901-ba9599a7e63c', '1512621776951-a57141f2eefd'], g: 'g8' },
    { id: 10, cat: 'ensaladas', name: 'Ensalada Verde de Temporada', desc: 'Hojas frescas, aguacate, semillas, vinagreta de limón', price: 11.5, tags: ['Vegana', 'Sin gluten'], img: ['1512621776951-a57141f2eefd', '1546069901-ba9599a7e63c'], g: 'g7' },
    { id: 11, cat: 'postres', name: 'Pastel de Chocolate', desc: 'Chocolate 70 %, centro suave, helado de vainilla', price: 8, tags: ['Vegetariana'], img: ['1551024506-0bccd828d307', '1565958011703-44f9829ba187'], g: 'g9' },
    { id: 12, cat: 'postres', name: 'Cheesecake de Fresa', desc: 'Receta de la casa, fresas frescas', price: 7.5, tags: ['Favorita'], img: ['1565958011703-44f9829ba187', '1551024506-0bccd828d307'], g: 'g3' },
    { id: 13, cat: 'bebidas', name: 'Limonada de la Casa', desc: 'Limón, menta, un toque de jengibre', price: 4.5, tags: ['Vegana'], img: ['1571877227200-a0d98ea607e9', '1544145945-f90425340c7e'], g: 'g10' },
    { id: 14, cat: 'bebidas', name: 'Capuchino', desc: 'Espresso doble, leche texturizada', price: 4.25, tags: [], img: ['1541167760496-1628856ab772', '1509042239860-f550ce710b93'], g: 'g6' },
  ];
  const TAX = 0.13, DELIVERY = 3.99;
  const cart = [];
  let orderType = 'Recoger', orderNo = 1043;
  const orders = [{ no: 1043, name: 'Sara B.', type: 'Recoger', slot: '12:30', items: [{ name: 'Pizza Margarita (Mediana)', qty: 1, price: 15.5 }, { name: 'Limonada de la Casa', qty: 2, price: 4.5 }], total: 27.69, status: 'preparing', note: 'Sin albahaca, por favor', mine: false, at: '12:07' }];

  /* ---------- images with graceful fallback ---------- */
  const imgTag = (ids, alt, cls = '') => `<img class="${cls}" src="${U(ids[0])}" data-fallback="${ids[1] ? U(ids[1]) : ''}" alt="${esc(alt)}" loading="lazy">`;
  const wireFallbacks = (root = document) => {
    $$('img[data-fallback]', root).forEach((img) => {
      if (img.dataset.wired) return; img.dataset.wired = '1';
      const fail = () => { const fb = img.dataset.fallback; if (fb) { img.dataset.fallback = ''; img.src = fb; } else { img.classList.add('is-missing'); } };
      img.addEventListener('error', fail);
      if (img.complete && img.naturalWidth === 0) fail();
    });
  };

  /* ---------- menu ---------- */
  const renderMenu = () => {
    $('#rs-cats').innerHTML = CATS.map((c, i) => `<a href="#cat-${c.id}" class="${i === 0 ? 'on' : ''}" data-cat="${c.id}">${c.name}</a>`).join('');
    $('#rs-menu-body').innerHTML = CATS.map((c) => `<div class="rs-cat" id="cat-${c.id}"><div class="rs-cat-head"><h3>${c.name}</h3><span>${c.desc}</span></div><div class="rs-dishes">${MENU.filter((m) => m.cat === c.id).map((m, i) => `<article class="rs-dish" style="--i:${i}">
        <div class="rs-dish-media ${m.g}">${imgTag(m.img, m.name)}<span class="rs-dish-initial">${m.name.replace(/^(Pizza|Ensalada|Hamburguesa|Pastel de|Cheesecake de) /, '')[0]}</span>${m.tags.includes('Favorita') ? '<span class="rs-fav">★ Favorita</span>' : ''}</div>
        <div class="rs-dish-body"><div class="rs-dish-top"><h4>${m.name}</h4><b>${money(m.price)}</b></div><p>${m.desc}</p>
        <div class="rs-dish-foot"><div class="rs-tags">${m.tags.filter((t) => t !== 'Favorita').map((t) => `<span>${t}</span>`).join('')}</div><button class="rs-add" type="button" data-id="${m.id}">${icon('plus')}Agregar</button></div></div>
      </article>`).join('')}</div></div>`).join('');
    $$('.rs-add').forEach((b) => b.addEventListener('click', () => addItem(+b.dataset.id, b)));
    wireFallbacks();
    // active category on scroll
    const links = $$('#rs-cats a');
    const io = new IntersectionObserver((ents) => { ents.forEach((e) => { if (e.isIntersecting) links.forEach((l) => l.classList.toggle('on', l.dataset.cat === e.target.id.replace('cat-', ''))); }); }, { rootMargin: '-40% 0px -55% 0px' });
    $$('.rs-cat').forEach((c) => io.observe(c));
  };

  const addItem = (id, btn) => {
    const item = MENU.find((m) => m.id === id);
    if (item.sizes) {
      const card = modal.open(`<div class="rs-modal-media ${item.g}">${imgTag(item.img, item.name)}</div><h2>${item.name}</h2><p class="muted small" style="margin-bottom:1rem">${item.desc}</p>
        <div class="opt-list">
          <label class="opt"><input type="radio" name="size" value="Mediana" checked><span>Mediana · 30 cm</span><b>${money(item.price)}</b></label>
          <label class="opt"><input type="radio" name="size" value="Grande"><span>Grande · 40 cm</span><b>${money(item.price + 4)}</b></label>
        </div>
        <div class="opt-list" style="margin-top:.8rem">
          <label class="opt"><input type="checkbox" name="extra" value="Extra queso" data-price="2"><span>Extra queso</span><b>+$2.00</b></label>
          <label class="opt"><input type="checkbox" name="extra" value="Masa sin gluten" data-price="3"><span>Masa sin gluten</span><b>+$3.00</b></label>
        </div>
        <div class="modal-actions"><button class="btn btn-ghost" type="button" data-close>Cancelar</button><button class="btn btn-primary" type="button" data-add>${icon('bag')}Agregar al pedido</button></div>`, 'rs-modal');
      wireFallbacks(card);
      $('[data-close]', card).addEventListener('click', modal.close);
      $('[data-add]', card).addEventListener('click', () => {
        const size = $('input[name=size]:checked', card).value;
        const extras = $$('input[name=extra]:checked', card);
        const price = item.price + (size === 'Grande' ? 4 : 0) + extras.reduce((s, e) => s + parseFloat(e.dataset.price), 0);
        const opts = [size, ...extras.map((e) => e.value)].join(', ');
        pushCart({ key: `${item.id}:${opts}`, id: item.id, name: item.name, opts, price });
        modal.close();
      });
    } else pushCart({ key: String(item.id), id: item.id, name: item.name, opts: '', price: item.price });
    if (btn) { btn.classList.add('bump'); setTimeout(() => btn.classList.remove('bump'), 500); }
  };
  const pushCart = (line) => {
    const existing = cart.find((c) => c.key === line.key);
    if (existing) existing.qty += 1; else cart.push({ ...line, qty: 1 });
    renderCart(true);
    toast('Agregado a tu pedido', `${line.name} · ${money(line.price)}. Revísalo con el botón "Mi pedido".`, 'ok', 'bag');
  };

  /* ---------- cart drawer ---------- */
  const totals = () => {
    const subtotal = cart.reduce((s, c) => s + c.price * c.qty, 0);
    const fee = orderType === 'A domicilio' && cart.length ? DELIVERY : 0;
    const tax = subtotal * TAX;
    return { subtotal, fee, tax, total: subtotal + fee + tax, count: cart.reduce((s, c) => s + c.qty, 0) };
  };
  const openCart = () => { toast.clear(); $('#rs-cart').classList.add('open'); $('#rs-cart-backdrop').classList.add('open'); };
  const closeCart = () => { $('#rs-cart').classList.remove('open'); $('#rs-cart-backdrop').classList.remove('open'); };
  $('#rs-cart-btn').addEventListener('click', openCart);
  $('#rs-cart-backdrop').addEventListener('click', closeCart);
  $('#rs-cartbar-btn').addEventListener('click', openCart);

  const renderCart = (bounce = false) => {
    const t = totals();
    const badge = $('#rs-count'); badge.textContent = t.count; badge.classList.toggle('show', t.count > 0); if (bounce) { badge.classList.remove('bump'); void badge.offsetWidth; badge.classList.add('bump'); }
    $('#rs-cart').innerHTML = `<div class="rs-cart-head"><h3>${icon('bag')}Mi pedido <span class="rs-pill">${t.count}</span></h3><button class="icon-btn" type="button" id="rs-cart-close" aria-label="Cerrar">${icon('x')}</button></div>
      <div class="seg rs-seg"><button type="button" class="${orderType === 'Recoger' ? 'on' : ''}" data-type="Recoger">${icon('store')} Recoger</button><button type="button" class="${orderType === 'A domicilio' ? 'on' : ''}" data-type="A domicilio">${icon('truck')} A domicilio</button></div>
      <div class="rs-cart-body">${cart.length ? cart.map((c, i) => { const m = MENU.find((x) => x.id === c.id); return `<div class="rs-line"><div class="rs-line-thumb ${m.g}">${imgTag(m.img, '')}</div><div class="rs-line-info"><b>${esc(c.name)}</b>${c.opts ? `<small>${esc(c.opts)}</small>` : ''}<span>${money(c.price)} c/u</span></div><div class="rs-line-side"><div class="qty"><button class="icon-btn" type="button" data-dec="${i}" aria-label="Quitar uno">${icon('minus')}</button><span>${c.qty}</span><button class="icon-btn" type="button" data-inc="${i}" aria-label="Agregar uno">${icon('plus')}</button></div><b>${money(c.price * c.qty)}</b></div></div>`; }).join('') : `<div class="rs-empty">${icon('bag')}<b>Tu pedido está vacío</b><span>Elige algo del menú para ver cómo funciona.</span></div>`}</div>
      ${cart.length ? `<div class="rs-cart-foot"><div class="totals"><div><span>Subtotal</span><span>${money(t.subtotal)}</span></div>${t.fee ? `<div><span>Envío</span><span>${money(t.fee)}</span></div>` : ''}<div><span>Impuestos (13 %)</span><span>${money(t.tax)}</span></div><div class="grand"><span>Total</span><span>${money(t.total)}</span></div></div><button class="rs-btn primary lg" type="button" id="rs-checkout" style="width:100%">Pagar · ${money(t.total)} ${icon('arrow-right')}</button><small class="rs-muted center" style="display:block;margin-top:.5rem">${orderType === 'Recoger' ? 'Listo para recoger en unos 20 minutos' : 'Entrega estimada: 30 a 40 minutos'}</small></div>` : ''}`;
    wireFallbacks($('#rs-cart'));
    $('#rs-cart-close').addEventListener('click', closeCart);
    $$('#rs-cart [data-type]').forEach((b) => b.addEventListener('click', () => { orderType = b.dataset.type; renderCart(); }));
    $$('#rs-cart [data-inc]').forEach((b) => b.addEventListener('click', () => { cart[+b.dataset.inc].qty += 1; renderCart(); }));
    $$('#rs-cart [data-dec]').forEach((b) => b.addEventListener('click', () => { const i = +b.dataset.dec; cart[i].qty -= 1; if (cart[i].qty <= 0) cart.splice(i, 1); renderCart(); }));
    const co = $('#rs-checkout'); if (co) co.addEventListener('click', checkout);
    const bar = $('#rs-cartbar'); bar.hidden = !cart.length; $('#rs-cartbar-btn').innerHTML = `${icon('bag')}Ver mi pedido · ${t.count} · ${money(t.total)}`;
  };

  /* ---------- checkout (3 steps) ---------- */
  const checkout = () => {
    toast.clear();
    closeCart();
    const t = totals();
    let step = 1; const data = { nombre: 'Alex Morales', telefono: '+1 555 0102', direccion: 'Calle Talbot 14, depto. 3', hora: 'Lo antes posible', pago: 'Tarjeta en línea', nota: '' };
    const card = modal.open('', 'rs-modal wide');
    const render = () => {
      card.innerHTML = `<button class="icon-btn modal-x" type="button" aria-label="Cerrar">${icon('x')}</button>
        <div class="rs-steps"><span class="${step >= 1 ? 'on' : ''}"><i>1</i>Tus datos</span><span class="${step >= 2 ? 'on' : ''}"><i>2</i>Pago</span><span class="${step >= 3 ? 'on' : ''}"><i>3</i>Confirmar</span></div>
        ${step === 1 ? `<h2>¿Para quién es el pedido?</h2><div class="form-grid">
            <div class="field"><label>Nombre</label><input class="input" name="nombre" value="${esc(data.nombre)}"></div>
            <div class="field"><label>Celular (para avisarte por SMS)</label><input class="input" name="telefono" value="${esc(data.telefono)}"></div>
            <div class="field full"><label>Modalidad</label><div class="seg"><button type="button" class="${orderType === 'Recoger' ? 'on' : ''}" data-type="Recoger">${icon('store')} Recoger en el local</button><button type="button" class="${orderType === 'A domicilio' ? 'on' : ''}" data-type="A domicilio">${icon('truck')} A domicilio</button></div></div>
            ${orderType === 'A domicilio' ? `<div class="field full"><label>Dirección de entrega</label><input class="input" name="direccion" value="${esc(data.direccion)}"></div>` : ''}
            <div class="field"><label>¿Cuándo?</label><select class="input" name="hora"><option>Lo antes posible</option><option>En 30 minutos</option><option>En 45 minutos</option><option>En 1 hora</option></select></div>
            <div class="field"><label>Nota para la cocina (opcional)</label><input class="input" name="nota" placeholder="Alergias, sin cebolla…" value="${esc(data.nota)}"></div>
          </div>
          <div class="modal-actions"><button class="btn btn-ghost" type="button" data-back>Volver al menú</button><button class="btn btn-primary" type="button" data-next>Continuar al pago ${icon('arrow-right')}</button></div>`
        : step === 2 ? `<h2>¿Cómo quieres pagar?</h2>
          <div class="opt-list">
            <label class="opt"><input type="radio" name="pago" value="Tarjeta en línea" ${data.pago === 'Tarjeta en línea' ? 'checked' : ''}><span>${icon('credit-card')} Tarjeta en línea</span><b>Seguro</b></label>
            <label class="opt"><input type="radio" name="pago" value="${orderType === 'Recoger' ? 'Al recoger' : 'Al recibir'}" ${data.pago !== 'Tarjeta en línea' ? 'checked' : ''}><span>${icon('dollar')} Pagar ${orderType === 'Recoger' ? 'al recoger' : 'al recibir'}</span><b>Efectivo o tarjeta</b></label>
          </div>
          <div class="rs-card-form" id="rs-card-form"><div class="form-grid"><div class="field full"><label>Número de tarjeta</label><input class="input" value="4242 4242 4242 4242" readonly></div><div class="field"><label>Vence</label><input class="input" value="12/28" readonly></div><div class="field"><label>CVC</label><input class="input" value="123" readonly></div></div><p class="muted small">Tarjeta de prueba: no se cobra nada. En tu sitio real, el pago va directo a tu cuenta a través de tu proveedor de pagos.</p></div>
          <div class="modal-actions"><button class="btn btn-ghost" type="button" data-prev>${icon('arrow-left')}Atrás</button><button class="btn btn-primary" type="button" data-next>Revisar el pedido ${icon('arrow-right')}</button></div>`
        : `<h2>Revisa y confirma</h2>
          <div class="rs-review">
            <div class="rs-review-lines">${cart.map((c) => `<div><span>${c.qty} × ${esc(c.name)}${c.opts ? ` <small>(${esc(c.opts)})</small>` : ''}</span><b>${money(c.price * c.qty)}</b></div>`).join('')}</div>
            <div class="totals"><div><span>Subtotal</span><span>${money(t.subtotal)}</span></div>${t.fee ? `<div><span>Envío</span><span>${money(t.fee)}</span></div>` : ''}<div><span>Impuestos (13 %)</span><span>${money(t.tax)}</span></div><div class="grand"><span>Total</span><span>${money(t.total)}</span></div></div>
            <div class="rs-review-meta"><span>${icon('user')}${esc(data.nombre)} · ${esc(data.telefono)}</span><span>${orderType === 'Recoger' ? icon('store') + 'Recoger en el local' : icon('truck') + esc(data.direccion)}</span><span>${icon('clock')}${esc(data.hora)}</span><span>${icon('credit-card')}${esc(data.pago)}</span>${data.nota ? `<span>${icon('message')}${esc(data.nota)}</span>` : ''}</div>
          </div>
          <div class="modal-actions"><button class="btn btn-ghost" type="button" data-prev>${icon('arrow-left')}Atrás</button><button class="btn btn-primary btn-lg" type="button" data-place>${icon('lock')}Confirmar pedido · ${money(t.total)}</button></div>`}`;
      $('.modal-x', card).addEventListener('click', modal.close);
      const save = () => { ['nombre', 'telefono', 'direccion', 'hora', 'nota'].forEach((k) => { const f = $(`[name=${k}]`, card); if (f) data[k] = f.value; }); const pg = $('input[name=pago]:checked', card); if (pg) data.pago = pg.value; };
      $$('[data-type]', card).forEach((b) => b.addEventListener('click', () => { save(); orderType = b.dataset.type; renderCart(); render(); }));
      const nx = $('[data-next]', card); if (nx) nx.addEventListener('click', () => { save(); step += 1; render(); });
      const pv = $('[data-prev]', card); if (pv) pv.addEventListener('click', () => { save(); step -= 1; render(); });
      const bk = $('[data-back]', card); if (bk) bk.addEventListener('click', modal.close);
      $$('input[name=pago]', card).forEach((r) => r.addEventListener('change', () => { $('#rs-card-form', card).hidden = r.value !== 'Tarjeta en línea' || !r.checked; }));
      const cf = $('#rs-card-form', card); if (cf) cf.hidden = data.pago !== 'Tarjeta en línea';
      const pl = $('[data-place]', card); if (pl) pl.addEventListener('click', () => {
        pl.disabled = true; pl.innerHTML = `<i class="spin"></i> ${data.pago === 'Tarjeta en línea' ? 'Procesando el pago…' : 'Enviando el pedido…'}`;
        setTimeout(() => { placeOrder(data); }, 1500);
      });
    };
    render();
  };

  const placeOrder = (data) => {
    const t = totals();
    const slot = data.hora === 'Lo antes posible' ? (orderType === 'A domicilio' ? '30 a 40 min' : '20 min') : data.hora.replace('En ', '');
    const o = { no: ++orderNo, name: data.nombre || 'Cliente', phone: data.telefono, type: orderType, slot, items: cart.map((c) => ({ name: c.opts ? `${c.name} (${c.opts})` : c.name, qty: c.qty, price: c.price })), total: t.total, status: 'new', note: data.nota, pay: data.pago, address: data.direccion, mine: true, at: time() };
    orders.unshift(o); cart.length = 0;
    modal.close(); renderCart(); renderOrders(true); printTicket(o); renderStatus();
    $('#rs-kds-fab').hidden = false;
    setTimeout(() => walkthrough(o), 350);
  };

  /* ---------- customer status card ---------- */
  const STEPS = ['new', 'preparing', 'ready'];
  const LABEL = { new: 'Recibido', preparing: 'En preparación', ready: 'Listo', collected: 'Entregado' };
  const renderStatus = () => {
    const o = orders.find((x) => x.mine && x.status !== 'collected');
    const box = $('#rs-status');
    if (!o) { box.hidden = true; return; }
    const idx = STEPS.indexOf(o.status);
    box.hidden = false;
    box.innerHTML = `<div class="rs-status-head"><b>Tu pedido #${o.no}</b><span class="mk-badge ${o.status === 'ready' ? 'green' : o.status === 'preparing' ? 'amber' : 'blue'}">${LABEL[o.status]}</span></div>
      <div class="ha-steps big"><div class="s ${idx >= 0 ? 'done' : ''}"><i></i><span>Recibido</span></div><div class="s ${idx >= 1 ? 'done' : ''}"><i></i><span>Preparando</span></div><div class="s ${idx >= 2 ? 'done' : ''}"><i></i><span>Listo</span></div></div>
      <small>${o.status === 'ready' ? `${icon('message')} SMS enviado: "Hola ${esc(o.name.split(' ')[0])}, tu pedido #${o.no} está listo${o.type === 'A domicilio' ? ' y va en camino' : ' para recoger'}."` : o.status === 'preparing' ? 'La cocina ya lo está preparando.' : `${o.type} · ${o.slot} · el restaurante lo aceptará en un momento`}</small>`;
  };

  /* ---------- kitchen screen ---------- */
  const openKds = () => { $('#rs-kds').classList.add('open'); };
  const closeKds = () => { $('#rs-kds').classList.remove('open'); };
  $('#rs-kds-fab').addEventListener('click', openKds);
  $('#rs-kds-close').addEventListener('click', closeKds);
  const renderOrders = (isNew = false) => {
    const open = orders.filter((o) => o.status !== 'collected');
    $('#rs-kds-count').textContent = open.length;
    $('#rs-orders').innerHTML = open.map((o, i) => `<div class="list-row order-row ${isNew && i === 0 ? 'new' : ''} ${o.status}">
      <div class="grow"><div class="row" style="gap:.5rem;margin-bottom:.2rem"><b>#${o.no}</b><span class="mk-badge ${o.status === 'new' ? 'blue' : o.status === 'preparing' ? 'amber' : 'green'}">${o.status === 'new' ? 'NUEVO' : LABEL[o.status].toUpperCase()}</span><small>${o.type} · ${o.slot} · ${o.at}</small></div>
        <small>${o.items.map((it) => `${it.qty} × ${esc(it.name)}`).join(', ')}</small>${o.note ? `<small class="note">${icon('message')}${esc(o.note)}</small>` : ''}</div>
      <div class="order-actions">${o.status === 'new' ? `<button class="btn btn-primary btn-xs" type="button" data-accept="${o.no}">Aceptar</button>` : o.status === 'preparing' ? `<button class="btn btn-success btn-xs" type="button" data-ready="${o.no}">${icon('check')}Listo</button>` : `<button class="btn btn-ghost btn-xs" type="button" data-done="${o.no}">Entregado</button>`}</div>
    </div>`).join('') || '<div class="empty">No hay pedidos abiertos.</div>';
    const setStatus = (no, status, msg) => { const o = orders.find((x) => x.no === no); o.status = status; renderOrders(); renderStatus(); if (msg) toast(...msg); };
    $$('#rs-orders [data-accept]').forEach((b) => b.addEventListener('click', () => setStatus(+b.dataset.accept, 'preparing', [`Pedido #${b.dataset.accept} aceptado`, 'El cliente ve "En preparación" en su celular.', 'info', 'utensils'])));
    $$('#rs-orders [data-ready]').forEach((b) => b.addEventListener('click', () => setStatus(+b.dataset.ready, 'ready', [`Pedido #${b.dataset.ready} listo`, 'SMS enviado al cliente automáticamente.', 'ok', 'message'])));
    $$('#rs-orders [data-done]').forEach((b) => b.addEventListener('click', () => setStatus(+b.dataset.done, 'collected')));
  };
  const ticketHtml = (o) => `<div class="tk-paper"><b>PEDIDO #${o.no} · ${o.type.toUpperCase()}</b><span>${o.at} · listo en ${o.slot}</span><span>${esc(o.name)} · ${esc(o.phone || '')}</span>${o.items.map((it) => `<span>${it.qty} × ${esc(it.name)}</span>`).join('')}${o.note ? `<span>NOTA: ${esc(o.note)}</span>` : ''}<b>TOTAL ${money(o.total)} · ${o.pay === 'Tarjeta en línea' ? 'PAGADO' : 'POR COBRAR'}</b></div>`;
  const printTicket = (o) => { const out = $('#rs-printer-out'); out.innerHTML = ticketHtml(o); out.classList.remove('printing'); void out.offsetWidth; out.classList.add('printing'); };

  /* ---------- post-order walkthrough ---------- */
  const walkthrough = (o) => {
    const walk = $('#walk');
    const first = o.name.split(' ')[0];
    const items = o.items.map((it) => `${it.qty} × ${esc(it.name)}`).join('<br>');
    const kdsTicket = (status) => `<div class="wk-ticket ${status}"><div class="wk-ticket-head"><b>#${o.no}</b><span class="mk-badge ${status === 'new' ? 'blue' : status === 'preparing' ? 'amber' : 'green'}">${status === 'new' ? 'NUEVO' : LABEL[status].toUpperCase()}</span><small class="wk-timer">00:00</small></div><div class="wk-ticket-body">${items}${o.note ? `<em>${icon('message')}${esc(o.note)}</em>` : ''}</div><div class="wk-ticket-foot"><span>${o.type} · ${o.slot}</span><span class="wk-btn ${status === 'new' ? 'primary' : status === 'preparing' ? 'success' : 'ghost'}">${status === 'new' ? 'Aceptar' : status === 'preparing' ? 'Listo' : 'Entregado'}</span></div></div>`;
    const phone = (status, sms = false) => `<div class="wk-phone"><div class="wk-phone-screen"><div class="wk-phone-top"><b>La Terraza</b><small>Tu pedido #${o.no}</small></div><div class="wk-phone-status ${status}"><span class="mk-badge ${status === 'ready' ? 'green' : status === 'preparing' ? 'amber' : 'blue'}">${LABEL[status]}</span><div class="ha-steps big"><div class="s ${status ? 'done' : ''}"><i></i><span>Recibido</span></div><div class="s ${status === 'preparing' || status === 'ready' ? 'done' : ''}"><i></i><span>Preparando</span></div><div class="s ${status === 'ready' ? 'done' : ''}"><i></i><span>Listo</span></div></div></div>${sms ? `<div class="wk-sms">${icon('message')}<div><b>SMS · La Terraza</b><span>Hola ${esc(first)}, tu pedido #${o.no} está listo${o.type === 'A domicilio' ? ' y va en camino' : ' para recoger'}. ¡Gracias!</span></div></div>` : ''}</div></div>`;
    const steps = [
      { tag: 'Pedido realizado', title: `¡Listo, ${esc(first)}! Tu pedido #${o.no} ya está en el restaurante`, text: `Pagaste ${money(o.total)} desde tu celular, sin descargar ninguna app y sin que el restaurante pague comisión. Ahora mira, paso a paso, <b>lo que verías en tu restaurante</b> en este preciso momento.`, stage: `<div class="wk-stage-center"><div class="wk-check">${icon('check')}</div><div class="wk-receipt">${ticketHtml(o)}</div></div>`, cta: 'Ver qué pasa en el restaurante' },
      { tag: 'Paso 1 · Pantalla de cocina', title: 'El pedido aparece al instante en la pantalla de cocina', text: 'En cuanto el cliente paga, el pedido entra a la pantalla que instalamos en tu cocina o mostrador: suena un aviso, aparece el ticket y arranca el cronómetro. Sin llamadas, sin errores al anotar.', stage: `<div class="wk-kds"><div class="wk-kds-bar"><span class="status-dot on"></span>Pantalla de cocina · La Terraza<span class="wk-kds-time">${time()}</span></div><div class="wk-kds-grid"><div class="wk-ticket old preparing"><div class="wk-ticket-head"><b>#1043</b><span class="mk-badge amber">EN PREPARACIÓN</span><small>04:12</small></div><div class="wk-ticket-body">1 × Pizza Margarita (Mediana)<br>2 × Limonada de la Casa</div><div class="wk-ticket-foot"><span>Recoger · 12:30</span><span class="wk-btn success">Listo</span></div></div>${kdsTicket('new')}</div><div class="wk-beep">${icon('bell')}Nuevo pedido</div></div>` },
      { tag: 'Paso 2 · Impresora', title: 'Al mismo tiempo se imprime el ticket en el mostrador', text: 'La impresora de tickets que instalamos junto a tu caja imprime el pedido completo: platillos, opciones, nota del cliente, hora y si ya está pagado. Perfecto para la barra o para engrapar en la bolsa.', stage: `<div class="wk-stage-center"><div class="wk-printer"><div class="printer-head">${icon('printer')}<span>Impresora del mostrador</span><i class="status-dot on"></i></div><div class="printer-out printing">${ticketHtml(o)}</div></div></div>` },
      { tag: 'Paso 3 · Tu equipo', title: 'Tu equipo lo acepta con un solo toque', text: 'Quien esté en la cocina toca "Aceptar". En ese instante, el cliente ve en su celular que su pedido está "En preparación". Nadie tiene que llamar ni escribir mensajes.', stage: `<div class="wk-split"><div class="wk-kds mini"><div class="wk-kds-bar"><span class="status-dot on"></span>Pantalla de cocina</div>${kdsTicket('new')}<div class="wk-finger">${icon('hand')}</div></div>${phone('new')}</div>`, play: 'accept' },
      { tag: 'Paso 4 · Aviso al cliente', title: 'Marcan "Listo" y el cliente recibe un SMS automático', text: 'Cuando el pedido sale, tocan "Listo". El sistema le envía un SMS al cliente con el aviso. Si es a domicilio, el repartidor ve la dirección, el teléfono y un enlace al mapa.', stage: `<div class="wk-split"><div class="wk-kds mini"><div class="wk-kds-bar"><span class="status-dot on"></span>Pantalla de cocina</div>${kdsTicket('preparing')}<div class="wk-finger">${icon('hand')}</div></div>${phone('preparing')}</div>`, play: 'ready' },
      { tag: 'Paso 5 · Reportes', title: 'Todo queda registrado en tu sistema, sin comisiones', text: 'La venta, el cliente, la hora y los platillos quedan guardados en el servidor de tu negocio. Al final del día ves cuánto vendiste en línea y cuáles son tus platillos estrella. Y de este pedido, tú te quedas con el 100 %.', stage: `<div class="wk-dash"><div class="kpi-tile"><small>Pedidos en línea hoy</small><b><span class="wk-count" data-from="38" data-to="39">38</span></b><em>+1 justo ahora</em><span class="ic grad-blue">${icon('bag')}</span></div><div class="kpi-tile"><small>Ventas en línea hoy</small><b>$<span class="wk-count" data-from="812.40" data-to="${(812.4 + o.total).toFixed(2)}" data-dec="2">812.40</span></b><em>+${money(o.total)}</em><span class="ic grad-indigo">${icon('dollar')}</span></div><div class="kpi-tile"><small>Comisiones pagadas</small><b>$0.00</b><em>a ninguna app</em><span class="ic grad-emerald">${icon('percent')}</span></div><div class="kpi-tile"><small>Cliente registrado</small><b>${esc(first)}</b><em>${esc(o.phone || '')} · vuelve a pedir con 1 toque</em><span class="ic grad-violet">${icon('user')}</span></div><div class="wk-dash-list"><small>Más vendidos hoy</small>${[['Pizza Pepperoni', 92], ['Pizza Margarita', 80], ['Hamburguesa Clásica', 64]].map(([n, w]) => `<div><span>${n}</span><div class="level"><i style="width:${w}%"></i></div></div>`).join('')}</div></div>` },
      { tag: 'Así de simple', title: 'Esto es lo que instalaríamos en tu restaurante', text: '<b>Un sitio web con tu identidad</b>, una pantalla de cocina y una impresora de tickets en tu mostrador, todo conectado y corriendo en tu local. Tú editas el menú desde tu celular. Tus clientes piden sin apps y sin comisiones.', stage: `<div class="wk-stage-center"><div class="wk-summary"><div>${icon('globe')}<b>Sitio web + menú</b><span>Con tus fotos y tu dominio</span></div><div>${icon('monitor')}<b>Pantalla de cocina</b><span>Instalada en tu local</span></div><div>${icon('printer')}<b>Impresora de tickets</b><span>Junto a tu caja</span></div><div>${icon('message')}<b>Avisos por SMS</b><span>Automáticos</span></div></div></div>`, final: true },
    ];
    let i = 0, timer = null;
    const show = () => {
      const s = steps[i];
      walk.innerHTML = `<div class="walk-box">
        <div class="walk-side"><span class="walk-tag">${s.tag}</span><div class="walk-dots">${steps.map((_, k) => `<i class="${k === i ? 'on' : k < i ? 'done' : ''}"></i>`).join('')}</div><h2>${s.title}</h2><p>${s.text}</p>
          <div class="walk-actions">${i > 0 ? `<button class="btn btn-ghost" type="button" data-prev>${icon('arrow-left')}Anterior</button>` : ''}${s.final ? `<button class="btn btn-primary btn-lg" type="button" data-kds>${icon('monitor')}Probar la pantalla de cocina</button><a class="btn btn-ghost btn-lg" href="../contact.html?interest=website-ordering">Lo quiero para mi negocio</a>` : `<button class="btn btn-primary btn-lg" type="button" data-next>${s.cta || 'Siguiente'} ${icon('arrow-right')}</button>`}</div>
          ${s.final ? '' : `<small class="walk-hint">${i === 0 ? 'Recorrido de 6 pasos · 1 minuto' : `Paso ${i} de 5`}</small>`}</div>
        <div class="walk-stage" data-step="${i}">${s.stage}</div>
        <button class="icon-btn walk-x" type="button" aria-label="Cerrar">${icon('x')}</button></div>`;
      wireFallbacks(walk);
      $('.walk-x', walk).addEventListener('click', close);
      const nx = $('[data-next]', walk); if (nx) nx.addEventListener('click', () => { i += 1; show(); });
      const pv = $('[data-prev]', walk); if (pv) pv.addEventListener('click', () => { i -= 1; show(); });
      const kd = $('[data-kds]', walk); if (kd) kd.addEventListener('click', () => { close(); openKds(); });
      clearTimeout(timer);
      if (s.play === 'accept') timer = setTimeout(() => { const st = $('.walk-stage', walk); st.classList.add('tapped'); setTimeout(() => { const t1 = $('.wk-kds .wk-ticket', walk); if (t1) t1.outerHTML = kdsTicket('preparing'); const ph = $('.wk-phone', walk); if (ph) ph.outerHTML = phone('preparing'); }, 700); }, 900);
      if (s.play === 'ready') timer = setTimeout(() => { const st = $('.walk-stage', walk); st.classList.add('tapped'); setTimeout(() => { const t1 = $('.wk-kds .wk-ticket', walk); if (t1) t1.outerHTML = kdsTicket('ready'); const ph = $('.wk-phone', walk); if (ph) ph.outerHTML = phone('ready', true); }, 700); }, 900);
      $$('.wk-count', walk).forEach((c) => { const from = parseFloat(c.dataset.from), to = parseFloat(c.dataset.to), dec = +(c.dataset.dec || 0); const t0 = performance.now(); const tick = (now) => { const p = Math.min(1, (now - t0) / 1400); const e = 1 - Math.pow(1 - p, 3); c.textContent = (from + (to - from) * e).toFixed(dec); if (p < 1) requestAnimationFrame(tick); }; setTimeout(() => requestAnimationFrame(tick), 500); });
      $$('.wk-timer', walk).forEach((tm) => { let s2 = 0; const iv = setInterval(() => { s2 += 1; if (!document.body.contains(tm)) { clearInterval(iv); return; } tm.textContent = `${String(Math.floor(s2 / 60)).padStart(2, '0')}:${String(s2 % 60).padStart(2, '0')}`; }, 1000); });
    };
    const close = () => { walk.classList.remove('open'); setTimeout(() => { walk.hidden = true; walk.innerHTML = ''; }, 350); document.body.classList.remove('walk-open'); };
    walk.hidden = false; document.body.classList.add('walk-open'); requestAnimationFrame(() => walk.classList.add('open')); show();
  };

  /* ---------- guided tour ---------- */
  const tourSteps = [
    { title: 'Este es el sitio web de un restaurante, tal como lo instalaríamos para ti', text: 'Es un sitio real: menú con fotos, carrito y pago. Haz un pedido como si fueras un cliente y, al terminar, te mostraremos paso a paso lo que pasa dentro del restaurante.' },
    { target: '#menu', title: 'Elige un platillo', text: 'Navega el menú por categorías y toca <b>Agregar</b> en cualquier platillo. Las pizzas te preguntan tamaño y extras, igual que en un sitio real.', action: 'Agrega un platillo para continuar', advanceOn: '.rs-add', delay: 900 },
    { target: '#rs-cart', title: 'Revisa tu pedido', text: 'Aquí cambias cantidades, eliges <b>recoger</b> o <b>a domicilio</b> y ves el total con impuestos. Cuando estés listo, toca <b>Pagar</b>.', action: 'Toca "Pagar" para continuar', advanceOn: '#rs-checkout', before: () => { if (cart.length) openCart(); } },
    { title: 'Completa el pago', text: 'Tres pasos cortos: tus datos, la forma de pago y la confirmación. Al confirmar, verás exactamente lo que pasa en el restaurante.', action: 'Confirma el pedido en la ventana', advanceOn: '[data-place]', delay: 200 },
  ];

  renderMenu(); renderCart(); renderOrders(); renderStatus();
  wireFallbacks();
  tour.auto(tourSteps, { key: 'ordering' });
  document.addEventListener('viewchange', () => {});
})();
