(() => {
  const { $, $$, money, toast, modal, icon, time, esc, tour, x } = window.Demo;
  const U = (id, w = 900) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=75`;

  const CATS = [
    { id: 'pizzas', name: x('Pizzas', 'Pizzas'), desc: x('Al horno de leña, masa de 48 horas', 'Wood-fired, 48-hour dough') },
    { id: 'pastas', name: x('Pastas', 'Pasta'), desc: x('Hechas en casa cada mañana', 'Made in-house every morning') },
    { id: 'burgers', name: x('Hamburguesas', 'Burgers'), desc: x('Carne de res de la región, pan brioche', 'Local beef, brioche bun') },
    { id: 'ensaladas', name: x('Ensaladas', 'Salads'), desc: x('Frescas, con productos del mercado', 'Fresh, with market produce') },
    { id: 'postres', name: x('Postres', 'Desserts'), desc: x('Para terminar bien', 'To finish well') },
    { id: 'bebidas', name: x('Bebidas', 'Drinks'), desc: x('Frías y calientes', 'Hot and cold') },
  ];
  const TAGS = { veg: x('Vegetariana', 'Vegetarian'), fav: x('Favorita', 'Favourite'), vegan: x('Vegana', 'Vegan'), spicy: x('Picante', 'Spicy'), gf: x('Sin gluten', 'Gluten-free') };
  const MENU = [
    { id: 1, cat: 'pizzas', name: x('Pizza Margarita', 'Margherita Pizza'), desc: x('Tomate San Marzano, mozzarella fresca, albahaca', 'San Marzano tomato, fresh mozzarella, basil'), price: 15.5, tags: ['veg', 'fav'], sizes: true, ini: 'M', img: ['1513104890138-7c749659a591', '1565299624946-b28f40a0ae38'], g: 'g1' },
    { id: 2, cat: 'pizzas', name: x('Pizza Pepperoni', 'Pepperoni Pizza'), desc: x('Pepperoni artesanal, mozzarella, orégano', 'Artisan pepperoni, mozzarella, oregano'), price: 17, tags: ['fav'], sizes: true, ini: 'P', img: ['1565299624946-b28f40a0ae38', '1513104890138-7c749659a591'], g: 'g2' },
    { id: 3, cat: 'pizzas', name: x('Pizza Cuatro Quesos', 'Four Cheese Pizza'), desc: x('Mozzarella, gorgonzola, parmesano, provolone y miel', 'Mozzarella, gorgonzola, parmesan, provolone and honey'), price: 18, tags: ['veg'], sizes: true, ini: 'C', img: ['1565299585323-38d6b0865b47', '1513104890138-7c749659a591'], g: 'g4' },
    { id: 4, cat: 'pastas', name: 'Spaghetti Carbonara', desc: x('Panceta, pecorino, yema de huevo, pimienta', 'Pancetta, pecorino, egg yolk, pepper'), price: 16.5, tags: [], ini: 'S', img: ['1473093295043-cdd812d0e601', '1551504734-5ee1c4a1479b'], g: 'g6' },
    { id: 5, cat: 'pastas', name: x('Lasaña de la casa', 'House Lasagna'), desc: x('Ragú de res cocido 6 horas, bechamel, parmesano', '6-hour beef ragù, béchamel, parmesan'), price: 17.5, tags: ['fav'], ini: 'L', img: ['1551504734-5ee1c4a1479b', '1473093295043-cdd812d0e601'], g: 'g2' },
    { id: 6, cat: 'pastas', name: 'Penne Arrabbiata', desc: x('Tomate, ajo, chile, albahaca', 'Tomato, garlic, chili, basil'), price: 14, tags: ['vegan', 'spicy'], ini: 'P', img: ['1476718406336-bb5a9690ee2a', '1473093295043-cdd812d0e601'], g: 'g1' },
    { id: 7, cat: 'burgers', name: x('Hamburguesa Clásica', 'Classic Burger'), desc: x('Res 180 g, cheddar, lechuga, tomate, salsa de la casa, papas', '180 g beef, cheddar, lettuce, tomato, house sauce, fries'), price: 15, tags: ['fav'], ini: 'C', img: ['1568901346375-23c9450c58cd', '1551782450-a2132b4ba21d'], g: 'g5' },
    { id: 8, cat: 'burgers', name: x('Hamburguesa BBQ', 'BBQ Burger'), desc: x('Res 180 g, tocino, aros de cebolla, BBQ ahumada, papas', '180 g beef, bacon, onion rings, smoky BBQ, fries'), price: 16.5, tags: [], ini: 'B', img: ['1551782450-a2132b4ba21d', '1568901346375-23c9450c58cd'], g: 'g6' },
    { id: 9, cat: 'ensaladas', name: x('Ensalada César', 'Caesar Salad'), desc: x('Lechuga romana, parmesano, crutones, aderezo César', 'Romaine, parmesan, croutons, Caesar dressing'), price: 12, tags: [], ini: 'C', img: ['1546069901-ba9599a7e63c', '1512621776951-a57141f2eefd'], g: 'g8' },
    { id: 10, cat: 'ensaladas', name: x('Ensalada Verde de Temporada', 'Seasonal Green Salad'), desc: x('Hojas frescas, aguacate, semillas, vinagreta de limón', 'Fresh greens, avocado, seeds, lemon vinaigrette'), price: 11.5, tags: ['vegan', 'gf'], ini: 'V', img: ['1512621776951-a57141f2eefd', '1546069901-ba9599a7e63c'], g: 'g7' },
    { id: 11, cat: 'postres', name: x('Pastel de Chocolate', 'Chocolate Cake'), desc: x('Chocolate 70 %, centro suave, helado de vainilla', '70% chocolate, soft centre, vanilla ice cream'), price: 8, tags: ['veg'], ini: 'C', img: ['1551024506-0bccd828d307', '1565958011703-44f9829ba187'], g: 'g9' },
    { id: 12, cat: 'postres', name: x('Cheesecake de Fresa', 'Strawberry Cheesecake'), desc: x('Receta de la casa, fresas frescas', 'House recipe, fresh strawberries'), price: 7.5, tags: ['fav'], ini: 'F', img: ['1565958011703-44f9829ba187', '1551024506-0bccd828d307'], g: 'g3' },
    { id: 13, cat: 'bebidas', name: x('Limonada de la Casa', 'House Lemonade'), desc: x('Limón, menta, un toque de jengibre', 'Lemon, mint, a touch of ginger'), price: 4.5, tags: ['vegan'], ini: 'L', img: ['1571877227200-a0d98ea607e9', '1544145945-f90425340c7e'], g: 'g10' },
    { id: 14, cat: 'bebidas', name: x('Capuchino', 'Cappuccino'), desc: x('Espresso doble, leche texturizada', 'Double espresso, steamed milk'), price: 4.25, tags: [], ini: 'C', img: ['1541167760496-1628856ab772', '1509042239860-f550ce710b93'], g: 'g6' },
  ];
  const TAX = 0.13, DELIVERY = 3.99;
  const cart = [];
  let orderType = 'pickup', orderNo = 1043;
  const typeLabel = (t = orderType) => (t === 'pickup' ? x('Recoger', 'Pickup') : x('A domicilio', 'Delivery'));
  const SIZE = { medium: x('Mediana', 'Medium'), large: x('Grande', 'Large') };
  const orders = [{ no: 1043, name: 'Sara B.', type: 'pickup', slot: '12:30', items: [{ name: `${x('Pizza Margarita', 'Margherita Pizza')} (${SIZE.medium})`, qty: 1, price: 15.5 }, { name: x('Limonada de la Casa', 'House Lemonade'), qty: 2, price: 4.5 }], total: 27.69, status: 'preparing', note: x('Sin albahaca, por favor', 'No basil, please'), mine: false, at: '12:07' }];

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
        <div class="rs-dish-media ${m.g}">${imgTag(m.img, m.name)}<span class="rs-dish-initial">${m.ini}</span>${m.tags.includes('fav') ? `<span class="rs-fav">★ ${TAGS.fav}</span>` : ''}</div>
        <div class="rs-dish-body"><div class="rs-dish-top"><h4>${m.name}</h4><b>${money(m.price)}</b></div><p>${m.desc}</p>
        <div class="rs-dish-foot"><div class="rs-tags">${m.tags.filter((t) => t !== 'fav').map((t) => `<span>${TAGS[t]}</span>`).join('')}</div><button class="rs-add" type="button" data-id="${m.id}">${icon('plus')}${x('Agregar', 'Add')}</button></div></div>
      </article>`).join('')}</div></div>`).join('');
    $$('.rs-add').forEach((b) => b.addEventListener('click', () => addItem(+b.dataset.id, b)));
    wireFallbacks();
    const links = $$('#rs-cats a');
    const io = new IntersectionObserver((ents) => { ents.forEach((e) => { if (e.isIntersecting) links.forEach((l) => l.classList.toggle('on', l.dataset.cat === e.target.id.replace('cat-', ''))); }); }, { rootMargin: '-40% 0px -55% 0px' });
    $$('.rs-cat').forEach((c) => io.observe(c));
  };

  const addItem = (id, btn) => {
    const item = MENU.find((m) => m.id === id);
    if (item.sizes) {
      const card = modal.open(`<div class="rs-modal-media ${item.g}">${imgTag(item.img, item.name)}</div><h2>${item.name}</h2><p class="muted small" style="margin-bottom:1rem">${item.desc}</p>
        <div class="opt-list">
          <label class="opt"><input type="radio" name="size" value="medium" checked><span>${SIZE.medium} · ${x('30 cm', '12 in')}</span><b>${money(item.price)}</b></label>
          <label class="opt"><input type="radio" name="size" value="large"><span>${SIZE.large} · ${x('40 cm', '16 in')}</span><b>${money(item.price + 4)}</b></label>
        </div>
        <div class="opt-list" style="margin-top:.8rem">
          <label class="opt"><input type="checkbox" name="extra" value="${x('Extra queso', 'Extra cheese')}" data-price="2"><span>${x('Extra queso', 'Extra cheese')}</span><b>+$2.00</b></label>
          <label class="opt"><input type="checkbox" name="extra" value="${x('Masa sin gluten', 'Gluten-free crust')}" data-price="3"><span>${x('Masa sin gluten', 'Gluten-free crust')}</span><b>+$3.00</b></label>
        </div>
        <div class="modal-actions"><button class="btn btn-ghost" type="button" data-close>${x('Cancelar', 'Cancel')}</button><button class="btn btn-primary" type="button" data-add>${icon('bag')}${x('Agregar al pedido', 'Add to order')}</button></div>`, 'rs-modal');
      wireFallbacks(card);
      $('[data-close]', card).addEventListener('click', modal.close);
      $('[data-add]', card).addEventListener('click', () => {
        const size = $('input[name=size]:checked', card).value;
        const extras = $$('input[name=extra]:checked', card);
        const price = item.price + (size === 'large' ? 4 : 0) + extras.reduce((s, e) => s + parseFloat(e.dataset.price), 0);
        const opts = [SIZE[size], ...extras.map((e) => e.value)].join(', ');
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
    toast(x('Agregado a tu pedido', 'Added to your order'), `${line.name} · ${money(line.price)}. ${x('Revísalo con el botón "Mi pedido".', 'Review it with the "My order" button.')}`, 'ok', 'bag');
  };

  /* ---------- cart drawer ---------- */
  const totals = () => {
    const subtotal = cart.reduce((s, c) => s + c.price * c.qty, 0);
    const fee = orderType === 'delivery' && cart.length ? DELIVERY : 0;
    const tax = subtotal * TAX;
    return { subtotal, fee, tax, total: subtotal + fee + tax, count: cart.reduce((s, c) => s + c.qty, 0) };
  };
  const openCart = () => { toast.clear(); $('#rs-cart').classList.add('open'); $('#rs-cart-backdrop').classList.add('open'); };
  const closeCart = () => { $('#rs-cart').classList.remove('open'); $('#rs-cart-backdrop').classList.remove('open'); };
  $('#rs-cart-btn').addEventListener('click', openCart);
  $('#rs-cart-backdrop').addEventListener('click', closeCart);
  $('#rs-cartbar-btn').addEventListener('click', openCart);

  const totalsHtml = (t) => `<div class="totals"><div><span>Subtotal</span><span>${money(t.subtotal)}</span></div>${t.fee ? `<div><span>${x('Envío', 'Delivery')}</span><span>${money(t.fee)}</span></div>` : ''}<div><span>${x('Impuestos', 'Tax')} (13 %)</span><span>${money(t.tax)}</span></div><div class="grand"><span>Total</span><span>${money(t.total)}</span></div></div>`;
  const renderCart = (bounce = false) => {
    const t = totals();
    const badge = $('#rs-count'); badge.textContent = t.count; badge.classList.toggle('show', t.count > 0); if (bounce) { badge.classList.remove('bump'); void badge.offsetWidth; badge.classList.add('bump'); }
    $('#rs-cart').innerHTML = `<div class="rs-cart-head"><h3>${icon('bag')}${x('Mi pedido', 'My order')} <span class="rs-pill">${t.count}</span></h3><button class="icon-btn" type="button" id="rs-cart-close" aria-label="${x('Cerrar', 'Close')}">${icon('x')}</button></div>
      <div class="seg rs-seg"><button type="button" class="${orderType === 'pickup' ? 'on' : ''}" data-type="pickup">${icon('store')} ${typeLabel('pickup')}</button><button type="button" class="${orderType === 'delivery' ? 'on' : ''}" data-type="delivery">${icon('truck')} ${typeLabel('delivery')}</button></div>
      <div class="rs-cart-body">${cart.length ? cart.map((c, i) => { const m = MENU.find((y) => y.id === c.id); return `<div class="rs-line"><div class="rs-line-thumb ${m.g}">${imgTag(m.img, '')}</div><div class="rs-line-info"><b>${esc(c.name)}</b>${c.opts ? `<small>${esc(c.opts)}</small>` : ''}<span>${money(c.price)} ${x('c/u', 'each')}</span></div><div class="rs-line-side"><div class="qty"><button class="icon-btn" type="button" data-dec="${i}" aria-label="${x('Quitar uno', 'Remove one')}">${icon('minus')}</button><span>${c.qty}</span><button class="icon-btn" type="button" data-inc="${i}" aria-label="${x('Agregar uno', 'Add one')}">${icon('plus')}</button></div><b>${money(c.price * c.qty)}</b></div></div>`; }).join('') : `<div class="rs-empty">${icon('bag')}<b>${x('Tu pedido está vacío', 'Your order is empty')}</b><span>${x('Elige algo del menú para ver cómo funciona.', 'Pick something from the menu to see how it works.')}</span></div>`}</div>
      ${cart.length ? `<div class="rs-cart-foot">${totalsHtml(t)}<button class="rs-btn primary lg" type="button" id="rs-checkout" style="width:100%">${x('Pagar', 'Checkout')} · ${money(t.total)} ${icon('arrow-right')}</button><small class="rs-muted center" style="display:block;margin-top:.5rem">${orderType === 'pickup' ? x('Listo para recoger en unos 20 minutos', 'Ready for pickup in about 20 minutes') : x('Entrega estimada: 30 a 40 minutos', 'Estimated delivery: 30 to 40 minutes')}</small></div>` : ''}`;
    wireFallbacks($('#rs-cart'));
    $('#rs-cart-close').addEventListener('click', closeCart);
    $$('#rs-cart [data-type]').forEach((b) => b.addEventListener('click', () => { orderType = b.dataset.type; renderCart(); }));
    $$('#rs-cart [data-inc]').forEach((b) => b.addEventListener('click', () => { cart[+b.dataset.inc].qty += 1; renderCart(); }));
    $$('#rs-cart [data-dec]').forEach((b) => b.addEventListener('click', () => { const i = +b.dataset.dec; cart[i].qty -= 1; if (cart[i].qty <= 0) cart.splice(i, 1); renderCart(); }));
    const co = $('#rs-checkout'); if (co) co.addEventListener('click', checkout);
    const bar = $('#rs-cartbar'); bar.hidden = !cart.length; $('#rs-cartbar-btn').innerHTML = `${icon('bag')}${x('Ver mi pedido', 'View my order')} · ${t.count} · ${money(t.total)}`;
  };

  /* ---------- checkout (3 steps) ---------- */
  const WHEN = [{ v: 'asap', l: x('Lo antes posible', 'As soon as possible') }, { v: '30', l: x('En 30 minutos', 'In 30 minutes') }, { v: '45', l: x('En 45 minutos', 'In 45 minutes') }, { v: '60', l: x('En 1 hora', 'In 1 hour') }];
  const whenLabel = (v) => (WHEN.find((w) => w.v === v) || WHEN[0]).l;
  const payLabel = (p) => (p === 'online' ? x('Tarjeta en línea', 'Card online') : orderType === 'pickup' ? x('Pagar al recoger', 'Pay at pickup') : x('Pagar al recibir', 'Pay on delivery'));
  const checkout = () => {
    toast.clear();
    closeCart();
    const t = totals();
    let step = 1; const data = { nombre: 'Alex Morales', telefono: '+1 555 0102', direccion: x('Calle Talbot 14, depto. 3', '14 Talbot Street, apt. 3'), hora: 'asap', pago: 'online', nota: '' };
    const card = modal.open('', 'rs-modal wide');
    const render = () => {
      card.innerHTML = `<button class="icon-btn modal-x" type="button" aria-label="${x('Cerrar', 'Close')}">${icon('x')}</button>
        <div class="rs-steps"><span class="${step >= 1 ? 'on' : ''}"><i>1</i>${x('Tus datos', 'Your details')}</span><span class="${step >= 2 ? 'on' : ''}"><i>2</i>${x('Pago', 'Payment')}</span><span class="${step >= 3 ? 'on' : ''}"><i>3</i>${x('Confirmar', 'Confirm')}</span></div>
        ${step === 1 ? `<h2>${x('¿Para quién es el pedido?', 'Who is the order for?')}</h2><div class="form-grid">
            <div class="field"><label>${x('Nombre', 'Name')}</label><input class="input" name="nombre" value="${esc(data.nombre)}"></div>
            <div class="field"><label>${x('Celular (para avisarte por SMS)', 'Mobile (to text you updates)')}</label><input class="input" name="telefono" value="${esc(data.telefono)}"></div>
            <div class="field full"><label>${x('Modalidad', 'Order type')}</label><div class="seg"><button type="button" class="${orderType === 'pickup' ? 'on' : ''}" data-type="pickup">${icon('store')} ${x('Recoger en el local', 'Pickup in store')}</button><button type="button" class="${orderType === 'delivery' ? 'on' : ''}" data-type="delivery">${icon('truck')} ${typeLabel('delivery')}</button></div></div>
            ${orderType === 'delivery' ? `<div class="field full"><label>${x('Dirección de entrega', 'Delivery address')}</label><input class="input" name="direccion" value="${esc(data.direccion)}"></div>` : ''}
            <div class="field"><label>${x('¿Cuándo?', 'When?')}</label><select class="input" name="hora">${WHEN.map((w) => `<option value="${w.v}" ${data.hora === w.v ? 'selected' : ''}>${w.l}</option>`).join('')}</select></div>
            <div class="field"><label>${x('Nota para la cocina (opcional)', 'Note for the kitchen (optional)')}</label><input class="input" name="nota" placeholder="${x('Alergias, sin cebolla…', 'Allergies, no onions…')}" value="${esc(data.nota)}"></div>
          </div>
          <div class="modal-actions"><button class="btn btn-ghost" type="button" data-back>${x('Volver al menú', 'Back to menu')}</button><button class="btn btn-primary" type="button" data-next>${x('Continuar al pago', 'Continue to payment')} ${icon('arrow-right')}</button></div>`
        : step === 2 ? `<h2>${x('¿Cómo quieres pagar?', 'How would you like to pay?')}</h2>
          <div class="opt-list">
            <label class="opt"><input type="radio" name="pago" value="online" ${data.pago === 'online' ? 'checked' : ''}><span>${icon('credit-card')} ${x('Tarjeta en línea', 'Card online')}</span><b>${x('Seguro', 'Secure')}</b></label>
            <label class="opt"><input type="radio" name="pago" value="later" ${data.pago !== 'online' ? 'checked' : ''}><span>${icon('dollar')} ${payLabel('later')}</span><b>${x('Efectivo o tarjeta', 'Cash or card')}</b></label>
          </div>
          <div class="rs-card-form" id="rs-card-form"><div class="form-grid"><div class="field full"><label>${x('Número de tarjeta', 'Card number')}</label><input class="input" value="4242 4242 4242 4242" readonly></div><div class="field"><label>${x('Vence', 'Expiry')}</label><input class="input" value="12/28" readonly></div><div class="field"><label>CVC</label><input class="input" value="123" readonly></div></div><p class="muted small">${x('Tarjeta de prueba: no se cobra nada. En tu sitio real, el pago va directo a tu cuenta a través de tu proveedor de pagos.', 'Test card: nothing is charged. On your real site, payment goes straight to your account through your payment provider.')}</p></div>
          <div class="modal-actions"><button class="btn btn-ghost" type="button" data-prev>${icon('arrow-left')}${x('Atrás', 'Back')}</button><button class="btn btn-primary" type="button" data-next>${x('Revisar el pedido', 'Review the order')} ${icon('arrow-right')}</button></div>`
        : `<h2>${x('Revisa y confirma', 'Review and confirm')}</h2>
          <div class="rs-review">
            <div class="rs-review-lines">${cart.map((c) => `<div><span>${c.qty} × ${esc(c.name)}${c.opts ? ` <small>(${esc(c.opts)})</small>` : ''}</span><b>${money(c.price * c.qty)}</b></div>`).join('')}</div>
            ${totalsHtml(t)}
            <div class="rs-review-meta"><span>${icon('user')}${esc(data.nombre)} · ${esc(data.telefono)}</span><span>${orderType === 'pickup' ? icon('store') + x('Recoger en el local', 'Pickup in store') : icon('truck') + esc(data.direccion)}</span><span>${icon('clock')}${whenLabel(data.hora)}</span><span>${icon('credit-card')}${payLabel(data.pago)}</span>${data.nota ? `<span>${icon('message')}${esc(data.nota)}</span>` : ''}</div>
          </div>
          <div class="modal-actions"><button class="btn btn-ghost" type="button" data-prev>${icon('arrow-left')}${x('Atrás', 'Back')}</button><button class="btn btn-primary btn-lg" type="button" data-place>${icon('lock')}${x('Confirmar pedido', 'Place order')} · ${money(t.total)}</button></div>`}`;
      $('.modal-x', card).addEventListener('click', modal.close);
      const save = () => { ['nombre', 'telefono', 'direccion', 'hora', 'nota'].forEach((k) => { const f = $(`[name=${k}]`, card); if (f) data[k] = f.value; }); const pg = $('input[name=pago]:checked', card); if (pg) data.pago = pg.value; };
      $$('[data-type]', card).forEach((b) => b.addEventListener('click', () => { save(); orderType = b.dataset.type; renderCart(); render(); }));
      const nx = $('[data-next]', card); if (nx) nx.addEventListener('click', () => { save(); step += 1; render(); });
      const pv = $('[data-prev]', card); if (pv) pv.addEventListener('click', () => { save(); step -= 1; render(); });
      const bk = $('[data-back]', card); if (bk) bk.addEventListener('click', modal.close);
      $$('input[name=pago]', card).forEach((r) => r.addEventListener('change', () => { $('#rs-card-form', card).hidden = r.value !== 'online' || !r.checked; }));
      const cf = $('#rs-card-form', card); if (cf) cf.hidden = data.pago !== 'online';
      const pl = $('[data-place]', card); if (pl) pl.addEventListener('click', () => {
        pl.disabled = true; pl.innerHTML = `<i class="spin"></i> ${data.pago === 'online' ? x('Procesando el pago…', 'Processing payment…') : x('Enviando el pedido…', 'Sending the order…')}`;
        setTimeout(() => { placeOrder(data); }, 1500);
      });
    };
    render();
  };

  const placeOrder = (data) => {
    const t = totals();
    const slot = data.hora === 'asap' ? (orderType === 'delivery' ? x('30 a 40 min', '30 to 40 min') : '20 min') : `${data.hora} min`;
    const o = { no: ++orderNo, name: data.nombre || x('Cliente', 'Customer'), phone: data.telefono, type: orderType, slot, items: cart.map((c) => ({ name: c.opts ? `${c.name} (${c.opts})` : c.name, qty: c.qty, price: c.price })), total: t.total, status: 'new', note: data.nota, pay: data.pago, address: data.direccion, mine: true, at: time() };
    orders.unshift(o); cart.length = 0;
    modal.close(); renderCart(); renderOrders(true); printTicket(o); renderStatus();
    $('#rs-kds-fab').hidden = false;
    setTimeout(() => walkthrough(o), 350);
  };

  /* ---------- customer status card ---------- */
  const STEPS = ['new', 'preparing', 'ready'];
  const LABEL = { new: x('Recibido', 'Received'), preparing: x('En preparación', 'Preparing'), ready: x('Listo', 'Ready'), collected: x('Entregado', 'Delivered') };
  const smsText = (o) => x(`Hola ${esc(o.name.split(' ')[0])}, tu pedido #${o.no} está listo${o.type === 'delivery' ? ' y va en camino' : ' para recoger'}.`, `Hi ${esc(o.name.split(' ')[0])}, your order #${o.no} is ${o.type === 'delivery' ? 'ready and on its way' : 'ready for pickup'}.`);
  const stepsHtml = (idx) => `<div class="ha-steps big"><div class="s ${idx >= 0 ? 'done' : ''}"><i></i><span>${x('Recibido', 'Received')}</span></div><div class="s ${idx >= 1 ? 'done' : ''}"><i></i><span>${x('Preparando', 'Preparing')}</span></div><div class="s ${idx >= 2 ? 'done' : ''}"><i></i><span>${x('Listo', 'Ready')}</span></div></div>`;
  const renderStatus = () => {
    const o = orders.find((y) => y.mine && y.status !== 'collected');
    const box = $('#rs-status');
    if (!o) { box.hidden = true; return; }
    const idx = STEPS.indexOf(o.status);
    box.hidden = false;
    box.innerHTML = `<div class="rs-status-head"><b>${x('Tu pedido', 'Your order')} #${o.no}</b><span class="mk-badge ${o.status === 'ready' ? 'green' : o.status === 'preparing' ? 'amber' : 'blue'}">${LABEL[o.status]}</span></div>
      ${stepsHtml(idx)}
      <small>${o.status === 'ready' ? `${icon('message')} ${x('SMS enviado', 'Text sent')}: "${smsText(o)}"` : o.status === 'preparing' ? x('La cocina ya lo está preparando.', 'The kitchen is preparing it now.') : `${typeLabel(o.type)} · ${o.slot} · ${x('el restaurante lo aceptará en un momento', 'the restaurant will accept it in a moment')}`}</small>`;
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
      <div class="grow"><div class="row" style="gap:.5rem;margin-bottom:.2rem"><b>#${o.no}</b><span class="mk-badge ${o.status === 'new' ? 'blue' : o.status === 'preparing' ? 'amber' : 'green'}">${o.status === 'new' ? x('NUEVO', 'NEW') : LABEL[o.status].toUpperCase()}</span><small>${typeLabel(o.type)} · ${o.slot} · ${o.at}</small></div>
        <small>${o.items.map((it) => `${it.qty} × ${esc(it.name)}`).join(', ')}</small>${o.note ? `<small class="note">${icon('message')}${esc(o.note)}</small>` : ''}</div>
      <div class="order-actions">${o.status === 'new' ? `<button class="btn btn-primary btn-xs" type="button" data-accept="${o.no}">${x('Aceptar', 'Accept')}</button>` : o.status === 'preparing' ? `<button class="btn btn-success btn-xs" type="button" data-ready="${o.no}">${icon('check')}${x('Listo', 'Ready')}</button>` : `<button class="btn btn-ghost btn-xs" type="button" data-done="${o.no}">${x('Entregado', 'Delivered')}</button>`}</div>
    </div>`).join('') || `<div class="empty">${x('No hay pedidos abiertos.', 'No open orders.')}</div>`;
    const setStatus = (no, status, msg) => { const o = orders.find((y) => y.no === no); o.status = status; renderOrders(); renderStatus(); if (msg) toast(...msg); };
    $$('#rs-orders [data-accept]').forEach((b) => b.addEventListener('click', () => setStatus(+b.dataset.accept, 'preparing', [x(`Pedido #${b.dataset.accept} aceptado`, `Order #${b.dataset.accept} accepted`), x('El cliente ve "En preparación" en su celular.', 'The customer sees "Preparing" on their phone.'), 'info', 'utensils'])));
    $$('#rs-orders [data-ready]').forEach((b) => b.addEventListener('click', () => setStatus(+b.dataset.ready, 'ready', [x(`Pedido #${b.dataset.ready} listo`, `Order #${b.dataset.ready} ready`), x('SMS enviado al cliente automáticamente.', 'Text sent to the customer automatically.'), 'ok', 'message'])));
    $$('#rs-orders [data-done]').forEach((b) => b.addEventListener('click', () => setStatus(+b.dataset.done, 'collected')));
  };
  const ticketHtml = (o) => `<div class="tk-paper"><b>${x('PEDIDO', 'ORDER')} #${o.no} · ${typeLabel(o.type).toUpperCase()}</b><span>${o.at} · ${x('listo en', 'ready in')} ${o.slot}</span><span>${esc(o.name)} · ${esc(o.phone || '')}</span>${o.items.map((it) => `<span>${it.qty} × ${esc(it.name)}</span>`).join('')}${o.note ? `<span>${x('NOTA', 'NOTE')}: ${esc(o.note)}</span>` : ''}<b>TOTAL ${money(o.total)} · ${o.pay === 'online' ? x('PAGADO', 'PAID') : x('POR COBRAR', 'TO COLLECT')}</b></div>`;
  const printTicket = (o) => { const out = $('#rs-printer-out'); out.innerHTML = ticketHtml(o); out.classList.remove('printing'); void out.offsetWidth; out.classList.add('printing'); };

  /* ---------- post-order walkthrough ---------- */
  const walkthrough = (o) => {
    const walk = $('#walk');
    const first = o.name.split(' ')[0];
    const items = o.items.map((it) => `${it.qty} × ${esc(it.name)}`).join('<br>');
    const kdsTicket = (status) => `<div class="wk-ticket ${status}"><div class="wk-ticket-head"><b>#${o.no}</b><span class="mk-badge ${status === 'new' ? 'blue' : status === 'preparing' ? 'amber' : 'green'}">${status === 'new' ? x('NUEVO', 'NEW') : LABEL[status].toUpperCase()}</span><small class="wk-timer">00:00</small></div><div class="wk-ticket-body">${items}${o.note ? `<em>${icon('message')}${esc(o.note)}</em>` : ''}</div><div class="wk-ticket-foot"><span>${typeLabel(o.type)} · ${o.slot}</span><span class="wk-btn ${status === 'new' ? 'primary' : status === 'preparing' ? 'success' : 'ghost'}">${status === 'new' ? x('Aceptar', 'Accept') : status === 'preparing' ? x('Listo', 'Ready') : x('Entregado', 'Delivered')}</span></div></div>`;
    const phone = (status, sms = false) => `<div class="wk-phone"><div class="wk-phone-screen"><div class="wk-phone-top"><b>La Terraza</b><small>${x('Tu pedido', 'Your order')} #${o.no}</small></div><div class="wk-phone-status ${status}"><span class="mk-badge ${status === 'ready' ? 'green' : status === 'preparing' ? 'amber' : 'blue'}">${LABEL[status]}</span>${stepsHtml(STEPS.indexOf(status))}</div>${sms ? `<div class="wk-sms">${icon('message')}<div><b>SMS · La Terraza</b><span>${smsText(o)} ${x('¡Gracias!', 'Thank you!')}</span></div></div>` : ''}</div></div>`;
    const kdsTitle = x('Pantalla de cocina', 'Kitchen screen');
    const steps = [
      { tag: x('Pedido realizado', 'Order placed'), title: x(`¡Listo, ${esc(first)}! Tu pedido #${o.no} ya está en el restaurante`, `Done, ${esc(first)}! Your order #${o.no} is already at the restaurant`), text: x(`Pagaste ${money(o.total)} desde tu celular, sin descargar ninguna app y sin que el restaurante pague comisión. Ahora mira, paso a paso, <b>lo que verías en tu restaurante</b> en este preciso momento.`, `You paid ${money(o.total)} from your phone, with no app to download and no commission for the restaurant. Now watch, step by step, <b>what you would see in your restaurant</b> right now.`), stage: `<div class="wk-stage-center"><div class="wk-check">${icon('check')}</div><div class="wk-receipt">${ticketHtml(o)}</div></div>`, cta: x('Ver qué pasa en el restaurante', 'See what happens in the restaurant') },
      { tag: x('Paso 1 · Pantalla de cocina', 'Step 1 · Kitchen screen'), title: x('El pedido aparece al instante en la pantalla de cocina', 'The order appears instantly on the kitchen screen'), text: x('En cuanto el cliente paga, el pedido entra a la pantalla que instalamos en tu cocina o mostrador: suena un aviso, aparece el ticket y arranca el cronómetro. Sin llamadas, sin errores al anotar.', 'The moment the customer pays, the order lands on the screen we install in your kitchen or at your counter: a chime sounds, the ticket appears and the timer starts. No phone calls, no mistakes writing it down.'), stage: `<div class="wk-kds"><div class="wk-kds-bar"><span class="status-dot on"></span>${kdsTitle} · La Terraza<span class="wk-kds-time">${time()}</span></div><div class="wk-kds-grid"><div class="wk-ticket old preparing"><div class="wk-ticket-head"><b>#1043</b><span class="mk-badge amber">${LABEL.preparing.toUpperCase()}</span><small>04:12</small></div><div class="wk-ticket-body">${orders[orders.length - 1].items.map((it) => `${it.qty} × ${esc(it.name)}`).join('<br>')}</div><div class="wk-ticket-foot"><span>${typeLabel('pickup')} · 12:30</span><span class="wk-btn success">${x('Listo', 'Ready')}</span></div></div>${kdsTicket('new')}</div><div class="wk-beep">${icon('bell')}${x('Nuevo pedido', 'New order')}</div></div>` },
      { tag: x('Paso 2 · Impresora', 'Step 2 · Printer'), title: x('Al mismo tiempo se imprime el ticket en el mostrador', 'At the same time the ticket prints at the counter'), text: x('La impresora de tickets que instalamos junto a tu caja imprime el pedido completo: platillos, opciones, nota del cliente, hora y si ya está pagado. Perfecto para la barra o para engrapar en la bolsa.', 'The ticket printer we install next to your register prints the full order: dishes, options, customer note, time and whether it is paid. Perfect for the pass or to staple to the bag.'), stage: `<div class="wk-stage-center"><div class="wk-printer"><div class="printer-head">${icon('printer')}<span>${x('Impresora del mostrador', 'Counter printer')}</span><i class="status-dot on"></i></div><div class="printer-out printing">${ticketHtml(o)}</div></div></div>` },
      { tag: x('Paso 3 · Tu equipo', 'Step 3 · Your team'), title: x('Tu equipo lo acepta con un solo toque', 'Your team accepts it with one tap'), text: x('Quien esté en la cocina toca "Aceptar". En ese instante, el cliente ve en su celular que su pedido está "En preparación". Nadie tiene que llamar ni escribir mensajes.', 'Whoever is in the kitchen taps "Accept". That instant, the customer sees "Preparing" on their phone. Nobody has to call or type messages.'), stage: `<div class="wk-split"><div class="wk-kds mini"><div class="wk-kds-bar"><span class="status-dot on"></span>${kdsTitle}</div>${kdsTicket('new')}<div class="wk-finger">${icon('hand')}</div></div>${phone('new')}</div>`, play: 'accept' },
      { tag: x('Paso 4 · Aviso al cliente', 'Step 4 · Customer alert'), title: x('Marcan "Listo" y el cliente recibe un SMS automático', 'They tap "Ready" and the customer gets an automatic text'), text: x('Cuando el pedido sale, tocan "Listo". El sistema le envía un SMS al cliente con el aviso. Si es a domicilio, el repartidor ve la dirección, el teléfono y un enlace al mapa.', 'When the order is out, they tap "Ready". The system texts the customer. For delivery, the driver sees the address, the phone number and a map link.'), stage: `<div class="wk-split"><div class="wk-kds mini"><div class="wk-kds-bar"><span class="status-dot on"></span>${kdsTitle}</div>${kdsTicket('preparing')}<div class="wk-finger">${icon('hand')}</div></div>${phone('preparing')}</div>`, play: 'ready' },
      { tag: x('Paso 5 · Reportes', 'Step 5 · Reports'), title: x('Todo queda registrado en tu sistema, sin comisiones', 'Everything is recorded in your system, with no commissions'), text: x('La venta, el cliente, la hora y los platillos quedan guardados en el servidor de tu negocio. Al final del día ves cuánto vendiste en línea y cuáles son tus platillos estrella. Y de este pedido, tú te quedas con el 100 %.', 'The sale, the customer, the time and the dishes are saved on the server at your business. At the end of the day you see how much you sold online and which dishes are your stars. And from this order, you keep 100%.'), stage: `<div class="wk-dash"><div class="kpi-tile"><small>${x('Pedidos en línea hoy', 'Online orders today')}</small><b><span class="wk-count" data-from="38" data-to="39">38</span></b><em>${x('+1 justo ahora', '+1 just now')}</em><span class="ic grad-blue">${icon('bag')}</span></div><div class="kpi-tile"><small>${x('Ventas en línea hoy', 'Online sales today')}</small><b>$<span class="wk-count" data-from="812.40" data-to="${(812.4 + o.total).toFixed(2)}" data-dec="2">812.40</span></b><em>+${money(o.total)}</em><span class="ic grad-indigo">${icon('dollar')}</span></div><div class="kpi-tile"><small>${x('Comisiones pagadas', 'Commissions paid')}</small><b>$0.00</b><em>${x('a ninguna app', 'to any app')}</em><span class="ic grad-emerald">${icon('percent')}</span></div><div class="kpi-tile"><small>${x('Cliente registrado', 'Customer saved')}</small><b>${esc(first)}</b><em>${esc(o.phone || '')} · ${x('vuelve a pedir con 1 toque', 'reorders with 1 tap')}</em><span class="ic grad-violet">${icon('user')}</span></div><div class="wk-dash-list"><small>${x('Más vendidos hoy', 'Best sellers today')}</small>${[[MENU[1].name, 92], [MENU[0].name, 80], [MENU[6].name, 64]].map(([n, w]) => `<div><span>${n}</span><div class="level"><i style="width:${w}%"></i></div></div>`).join('')}</div></div>` },
      { tag: x('Así de simple', 'That simple'), title: x('Esto es lo que instalaríamos en tu restaurante', 'This is what we would install in your restaurant'), text: x('<b>Un sitio web con tu identidad</b>, una pantalla de cocina y una impresora de tickets en tu mostrador, todo conectado y corriendo en tu local. Tú editas el menú desde tu celular. Tus clientes piden sin apps y sin comisiones.', '<b>A website with your brand</b>, a kitchen screen and a ticket printer at your counter, all connected and running on site. You edit the menu from your phone. Your customers order with no apps and no commissions.'), stage: `<div class="wk-stage-center"><div class="wk-summary"><div>${icon('globe')}<b>${x('Sitio web + menú', 'Website + menu')}</b><span>${x('Con tus fotos y tu dominio', 'With your photos and domain')}</span></div><div>${icon('monitor')}<b>${kdsTitle}</b><span>${x('Instalada en tu local', 'Installed on site')}</span></div><div>${icon('printer')}<b>${x('Impresora de tickets', 'Ticket printer')}</b><span>${x('Junto a tu caja', 'Next to your register')}</span></div><div>${icon('message')}<b>${x('Avisos por SMS', 'Text alerts')}</b><span>${x('Automáticos', 'Automatic')}</span></div></div></div>`, final: true },
    ];
    let i = 0, timer = null;
    const show = () => {
      const s = steps[i];
      walk.innerHTML = `<div class="walk-box">
        <div class="walk-side"><span class="walk-tag">${s.tag}</span><div class="walk-dots">${steps.map((_, k) => `<i class="${k === i ? 'on' : k < i ? 'done' : ''}"></i>`).join('')}</div><h2>${s.title}</h2><p>${s.text}</p>
          <div class="walk-actions">${i > 0 ? `<button class="btn btn-ghost" type="button" data-prev>${icon('arrow-left')}${x('Anterior', 'Back')}</button>` : ''}${s.final ? `<button class="btn btn-primary btn-lg" type="button" data-kds>${icon('monitor')}${x('Probar la pantalla de cocina', 'Try the kitchen screen')}</button><a class="btn btn-ghost btn-lg" href="../contact.html?interest=website-ordering">${x('Lo quiero para mi negocio', 'I want this for my business')}</a>` : `<button class="btn btn-primary btn-lg" type="button" data-next>${s.cta || x('Siguiente', 'Next')} ${icon('arrow-right')}</button>`}</div>
          ${s.final ? '' : `<small class="walk-hint">${i === 0 ? x('Recorrido de 6 pasos · 1 minuto', '6-step walkthrough · 1 minute') : `${x('Paso', 'Step')} ${i} ${x('de', 'of')} 5`}</small>`}</div>
        <div class="walk-stage" data-step="${i}">${s.stage}</div>
        <button class="icon-btn walk-x" type="button" aria-label="${x('Cerrar', 'Close')}">${icon('x')}</button></div>`;
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
    { title: x('Este es el sitio web de un restaurante, tal como lo instalaríamos para ti', 'This is a restaurant website, just as we would install it for you'), text: x('Es un sitio real: menú con fotos, carrito y pago. Haz un pedido como si fueras un cliente y, al terminar, te mostraremos paso a paso lo que pasa dentro del restaurante.', 'It is a real site: menu with photos, cart and checkout. Place an order as if you were a customer and, when you finish, we will show you step by step what happens inside the restaurant.') },
    { target: '#menu', title: x('Elige un platillo', 'Pick a dish'), text: x('Navega el menú por categorías y toca <b>Agregar</b> en cualquier platillo. Las pizzas te preguntan tamaño y extras, igual que en un sitio real.', 'Browse the menu by category and tap <b>Add</b> on any dish. Pizzas ask for size and extras, just like a real site.'), action: x('Agrega un platillo para continuar', 'Add a dish to continue'), advanceOn: '.rs-add', delay: 900 },
    { target: '#rs-cart', title: x('Revisa tu pedido', 'Review your order'), text: x('Aquí cambias cantidades, eliges <b>recoger</b> o <b>a domicilio</b> y ves el total con impuestos. Cuando estés listo, toca <b>Pagar</b>.', 'Here you change quantities, choose <b>pickup</b> or <b>delivery</b> and see the total with tax. When you are ready, tap <b>Checkout</b>.'), action: x('Toca "Pagar" para continuar', 'Tap "Checkout" to continue'), advanceOn: '#rs-checkout', before: () => { if (cart.length) openCart(); } },
    { title: x('Completa el pago', 'Complete the payment'), text: x('Tres pasos cortos: tus datos, la forma de pago y la confirmación. Al confirmar, verás exactamente lo que pasa en el restaurante.', 'Three short steps: your details, the payment method and the confirmation. When you confirm, you will see exactly what happens in the restaurant.'), action: x('Confirma el pedido en la ventana', 'Place the order in the window'), advanceOn: '[data-place]', delay: 200 },
  ];

  renderMenu(); renderCart(); renderOrders(); renderStatus();
  wireFallbacks();
  tour.auto(tourSteps, { key: 'ordering' });
})();
