export default (ctx) => {
  const { x } = ctx;
  return {
    title: x('Muestra · Sitio web con pedidos en línea', 'Sample · Website with online ordering'),
    description: x('Muestra interactiva de un sitio web de restaurante con pedidos en línea y un recorrido animado de lo que pasa en el restaurante.', 'Interactive sample of a restaurant website with online ordering and an animated walkthrough of what happens in the restaurant.'),
    bodyClass: 'demo demo-rs',
    extraCss: 'assets/css/demo.css',
    extraJs: 'assets/js/demos/ordering.js',
    demoName: x('La Terraza · Sitio web + pedidos en línea', 'La Terraza · Website + online ordering'),
    productSlug: 'website-ordering',
    body: `{{> head}}
{{> demo-bar}}
<main class="rs" id="main">
  <header class="rs-nav" id="rs-nav">
    <a class="rs-brand" href="#top"><span class="rs-logo">LT</span><span>La Terraza<small>${x('Cocina de barrio', 'Neighbourhood kitchen')}</small></span></a>
    <nav class="rs-links"><a href="#menu">${x('Menú', 'Menu')}</a><a href="#nosotros">${x('Nosotros', 'About')}</a><a href="#horario">${x('Horario y ubicación', 'Hours & location')}</a><a href="#opiniones">${x('Opiniones', 'Reviews')}</a></nav>
    <div class="rs-nav-actions">
      <a class="rs-btn ghost" href="tel:+15550100200"><svg><use href="#i-phone"/></svg><span>${x('Llamar', 'Call')}</span></a>
      <button class="rs-btn primary" type="button" id="rs-cart-btn"><svg><use href="#i-bag"/></svg><span>${x('Mi pedido', 'My order')}</span><b class="rs-badge" id="rs-count">0</b></button>
    </div>
  </header>

  <section class="rs-hero" id="top">
    <div class="rs-hero-media"><img src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1800&q=75" data-fallback="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1800&q=75" alt="" loading="eager"><div class="rs-hero-fallback"></div></div>
    <div class="rs-hero-inner">
      <span class="rs-eyebrow"><i></i>${x('Abierto hoy · 11:30 a 22:00', 'Open today · 11:30 am to 10 pm')}</span>
      <h1>${x('Cocina de barrio,<br>hecha con calma', 'Neighbourhood cooking,<br>made with care')}</h1>
      <p>${x('Pizzas al horno de leña, pastas frescas y hamburguesas de la casa. Pide en línea y recoge en 20 minutos, o te lo llevamos a tu puerta.', 'Wood-fired pizzas, fresh pasta and house burgers. Order online and pick up in 20 minutes, or we bring it to your door.')}</p>
      <div class="rs-hero-actions"><a class="rs-btn primary lg" href="#menu">${x('Ver el menú y pedir', 'See the menu and order')} <svg><use href="#i-arrow-right"/></svg></a><a class="rs-btn ghost lg" href="#horario">${x('Cómo llegar', 'Find us')}</a></div>
      <div class="rs-hero-badges"><span><b>4.9</b> ★ · 312 ${x('opiniones', 'reviews')}</span><span><svg><use href="#i-clock"/></svg>${x('Recoger en 20 min', 'Pickup in 20 min')}</span><span><svg><use href="#i-truck"/></svg>${x('Domicilio 30 a 40 min', 'Delivery 30 to 40 min')}</span></div>
    </div>
    <div class="rs-status" id="rs-status" hidden></div>
  </section>

  <section class="rs-strip">
    <div><svg><use href="#i-smartphone"/></svg><b>${x('Pide desde tu celular', 'Order from your phone')}</b><span>${x('Sin descargar ninguna app', 'No app to download')}</span></div>
    <div><svg><use href="#i-credit-card"/></svg><b>${x('Paga en línea o al recoger', 'Pay online or at pickup')}</b><span>${x('Tarjeta, efectivo o transferencia', 'Card, cash or e-transfer')}</span></div>
    <div><svg><use href="#i-bell"/></svg><b>${x('Te avisamos cuando esté listo', 'We text you when it is ready')}</b><span>${x('Por SMS, al momento', 'By text, right away')}</span></div>
  </section>

  <section class="rs-menu" id="menu">
    <div class="rs-menu-head"><h2>${x('Nuestro menú', 'Our menu')}</h2><p>${x('Todo se prepara al momento. Elige tus platillos y agrégalos a tu pedido.', 'Everything is made to order. Pick your dishes and add them to your order.')}</p></div>
    <nav class="rs-cats" id="rs-cats" aria-label="${x('Categorías', 'Categories')}"></nav>
    <div id="rs-menu-body"></div>
  </section>

  <section class="rs-about" id="nosotros">
    <div class="rs-about-media"><img src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=75" data-fallback="https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=1200&q=75" alt="" loading="lazy"><div class="rs-img-fallback"></div></div>
    <div class="rs-about-text">
      <span class="rs-eyebrow"><i></i>${x('Desde 2016', 'Since 2016')}</span>
      <h2>${x('Un restaurante de familia, con los vecinos de siempre', 'A family restaurant, with the same neighbours as always')}</h2>
      <p>${x('Empezamos con un horno de leña y seis mesas. Hoy seguimos amasando cada mañana, comprando las verduras en el mercado de la esquina y saludando a cada cliente por su nombre.', 'We started with a wood-fired oven and six tables. We still knead every morning, buy our vegetables at the corner market and greet every customer by name.')}</p>
      <ul><li><svg><use href="#i-check"/></svg>${x('Masa fermentada 48 horas', '48-hour fermented dough')}</li><li><svg><use href="#i-check"/></svg>${x('Ingredientes de productores locales', 'Ingredients from local producers')}</li><li><svg><use href="#i-check"/></svg>${x('Opciones vegetarianas y sin gluten', 'Vegetarian and gluten-free options')}</li></ul>
    </div>
  </section>

  <section class="rs-info" id="horario">
    <div class="rs-info-card"><h3><svg><use href="#i-clock"/></svg>${x('Horario', 'Hours')}</h3><table><tr><td>${x('Lunes a jueves', 'Monday to Thursday')}</td><td>11:30 – 22:00</td></tr><tr><td>${x('Viernes y sábado', 'Friday and Saturday')}</td><td>11:30 – 23:30</td></tr><tr><td>${x('Domingo', 'Sunday')}</td><td>12:00 – 21:00</td></tr></table></div>
    <div class="rs-info-card"><h3><svg><use href="#i-map-pin"/></svg>${x('Ubicación', 'Location')}</h3><p>${x('Calle Erie 42, Leamington, ON', '42 Erie Street, Leamington, ON')}<br>${x('Estacionamiento gratis atrás del local', 'Free parking behind the restaurant')}</p><div class="rs-map" aria-hidden="true"><i class="pin"></i><span></span><span></span><span></span></div></div>
    <div class="rs-info-card"><h3><svg><use href="#i-phone"/></svg>${x('Contacto', 'Contact')}</h3><p><a href="tel:+15550100200">+1 (555) 010-0200</a><br><a href="mailto:hola@laterraza.example">hola@laterraza.example</a></p><p class="rs-muted">${x('¿Un evento o grupo grande? Llámanos y lo organizamos.', 'An event or a large group? Call us and we will arrange it.')}</p></div>
  </section>

  <section class="rs-reviews" id="opiniones">
    <h2>${x('Lo que dicen nuestros clientes', 'What our customers say')}</h2>
    <div class="rs-review-grid">
      <blockquote><div class="stars">★★★★★</div><p>"${x('La pizza de pepperoni es la mejor de la zona. Pedí desde el celular y estaba lista justo cuando llegué.', 'The pepperoni pizza is the best around. I ordered from my phone and it was ready right when I arrived.')}"</p><footer>— Daniela R.</footer></blockquote>
      <blockquote><div class="stars">★★★★★</div><p>"${x('Atención de diez. La entrega llegó caliente y antes de lo prometido.', 'Great service. The delivery arrived hot and ahead of time.')}"</p><footer>— Jorge M.</footer></blockquote>
      <blockquote><div class="stars">★★★★★</div><p>"${x('Las pastas frescas se notan. El cheesecake de fresa, obligatorio.', 'You can tell the pasta is fresh. The strawberry cheesecake is a must.')}"</p><footer>— Ana P.</footer></blockquote>
    </div>
  </section>

  <footer class="rs-footer">
    <div><span class="rs-logo sm">LT</span><b>La Terraza</b><span class="rs-muted">${x('Calle Erie 42, Leamington', '42 Erie Street, Leamington')} · +1 (555) 010-0200</span></div>
    <span class="rs-muted">${x('Sitio web y sistema de pedidos por', 'Website and ordering system by')} <b>Innovatiff</b></span>
  </footer>

  <aside class="rs-cart" id="rs-cart" aria-label="${x('Tu pedido', 'Your order')}"></aside>
  <div class="rs-cart-backdrop" id="rs-cart-backdrop"></div>
  <div class="rs-cartbar" id="rs-cartbar" hidden><button class="rs-btn primary lg" type="button" id="rs-cartbar-btn"></button></div>

  <button class="rs-kds-fab" type="button" id="rs-kds-fab" hidden><svg><use href="#i-monitor"/></svg>${x('Ver la pantalla de cocina', 'See the kitchen screen')} <b id="rs-kds-count">1</b></button>
  <aside class="rs-kds" id="rs-kds" aria-label="${x('Pantalla de cocina', 'Kitchen screen')}">
    <div class="rs-kds-head"><div><span class="tag green"><i class="dot"></i>${x('Lado del restaurante', 'Restaurant side')}</span><h3>${x('Pantalla de cocina', 'Kitchen screen')} · La Terraza</h3><small>${x('Esto es lo que ve tu equipo. Toca los botones para cambiar el estado del pedido y mira cómo se actualiza lo que ve el cliente.', 'This is what your team sees. Tap the buttons to change the order status and watch what the customer sees update.')}</small></div><button class="icon-btn" type="button" id="rs-kds-close" aria-label="${x('Cerrar', 'Close')}">✕</button></div>
    <div class="rs-kds-body"><div class="printer-strip"><div class="printer-head"><svg><use href="#i-printer"/></svg><span>${x('Impresora del mostrador', 'Counter printer')}</span><i class="status-dot on"></i></div><div class="printer-out" id="rs-printer-out"></div></div><div class="list" id="rs-orders"></div></div>
  </aside>

  <div class="walk" id="walk" hidden></div>
</main>
{{> demo-footer}}`,
  };
};
