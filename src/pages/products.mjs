export default (ctx) => {
  const { x, base, icon: I } = ctx;
  const problems = [
    { slug: 'website-ordering', reveal: 'fly-tl', title: x('Pagas comisiones a las apps de reparto', 'You pay commissions to delivery apps'), text: x('Ten tu propio sitio con pedidos.', 'Get your own site with ordering.') },
    { slug: 'ai-receptionist', reveal: 'up', title: x('Pierdes llamadas mientras trabajas', 'You miss calls while you work'), text: x('Una IA contesta y agenda por ti.', 'An AI answers and books for you.') },
    { slug: 'pos-system', reveal: 'fly-tr', title: x('Cierras la caja a mano', 'You close the register by hand'), text: x('Un POS táctil, instalado por nosotros.', 'A touch POS, installed by us.') },
    { slug: 'inventory-software', reveal: 'fly-bl', title: x('Te quedas sin producto sin aviso', 'You run out of stock without warning'), text: x('Alertas y órdenes con un clic.', 'Alerts and one-click orders.') },
    { slug: 'employee-management', reveal: 'up', title: x('Armas horarios en una hoja de cálculo', 'You build schedules in a spreadsheet'), text: x('Horarios, reloj checador y nómina.', 'Schedules, time clock and payroll.') },
    { slug: 'custom-software', reveal: 'fly-br', title: x('Ningún programa cubre tu proceso', 'No software fits your process'), text: x('Lo construimos a tu medida.', 'We build it around you.') },
  ];
  return {
    title: x('Productos', 'Products'),
    description: x('Sitios web con pedidos, POS, gestión de empleados, recepcionista con IA, inventario y software a la medida. Todo instalado en tu local.', 'Websites with ordering, POS, employee management, AI receptionist, inventory and custom software. All installed on site.'),
    body: `{{> head}}
{{> nav}}
<section class="p-hero" style="padding-bottom:0">
  <div class="orb blue" style="width:700px;height:700px;left:-300px;top:-200px"></div>
  <div class="container center">
    <span class="eyebrow" data-reveal="blur"><span class="dot"></span>${x('Productos', 'Products')}</span>
    <h1 class="h-display" data-words style="margin:1.2rem auto 1.2rem;max-width:18ch">${x('Todo lo que tu negocio necesita, <span class="grad">de un solo proveedor</span>', 'Everything your business needs, <span class="grad">from one provider</span>')}</h1>
    <p class="lead" data-reveal="blur" style="--d:400ms;margin:0 auto 2rem">${x('Usa uno hoy y agrega más después. Todo se conecta.', 'Start with one today and add more later. Everything connects.')}</p>
    <div class="row" style="justify-content:center" data-reveal="up" data-stagger="80">
      {{> product-chips}}
    </div>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="section-head">
      <span class="eyebrow" data-reveal="blur"><span class="dot"></span>${x('¿Cuál necesitas?', 'Which one do you need?')}</span>
      <h2 data-words>${x('Empieza por lo que más te cuesta', 'Start with what hurts the most')}</h2>
    </div>
    <div class="grid grid-3" data-stagger="90">
      ${problems.map((p) => { const prod = ctx.products.find((q) => q.slug === p.slug); return `<a class="card problem-card" href="${base}products/${p.slug}.html" data-reveal="${p.reveal}"><span class="tag amber">${x('Si tú…', 'If you…')}</span><h3 style="margin-top:.8rem">${p.title}</h3><p>${p.text}</p><span class="card-foot"><span class="icon-tile sm grad-${prod.color}">${I(prod.icon)}</span>${prod.name} ${I('arrow-right')}</span></a>`; }).join('')}
    </div>
  </div>
</section>

<section class="section rel">
  <div class="rings"><i></i><i></i><i></i></div>
  <div class="container z1">
    <div class="section-head">
      <span class="eyebrow" data-reveal="blur"><span class="dot"></span>${x('A detalle', 'In detail')}</span>
      <h2 data-words>${x('Cada producto, en un vistazo', 'Each product, at a glance')}</h2>
    </div>
    {{> product-rows}}
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="section-head">
      <span class="eyebrow" data-reveal="blur"><span class="dot"></span>${x('Mejor juntos', 'Better together')}</span>
      <h2 data-words>${x('Un solo sistema, corriendo en tu local', 'One system, running on site')}</h2>
    </div>
    <div data-reveal="scale">{{> network}}</div>
    <div class="grid grid-3" style="margin-top:3rem" data-stagger="90">
      <div class="card" data-reveal="up"><div class="feature-row"><span class="icon-ring">${I('link')}</span><div><h4>${x('Un solo acceso', 'One login')}</h4><p>${x('Tu equipo aprende una sola forma de trabajar.', 'Your team learns one way of working.')}</p></div></div></div>
      <div class="card" data-reveal="up"><div class="feature-row"><span class="icon-ring">${I('server')}</span><div><h4>${x('Un servidor en tu oficina', 'One server in your office')}</h4><p>${x('Sigue funcionando cuando el internet no.', 'Keeps working when the internet doesn\'t.')}</p></div></div></div>
      <div class="card" data-reveal="up"><div class="feature-row"><span class="icon-ring">${I('headset')}</span><div><h4>${x('Un solo número', 'One number to call')}</h4><p>${x('Software, equipo y soporte de las mismas personas.', 'Software, hardware and support from the same people.')}</p></div></div></div>
    </div>
  </div>
</section>

<section class="section tight">
  <div class="container">
    <div class="cta-band" data-reveal="scale">
      <span class="eyebrow"><span class="dot"></span>${x('¿No sabes por dónde empezar?', 'Not sure where to start?')}</span>
      <h2 style="margin-top:1rem" data-words>${x('Cuéntanos qué te frena. Te sugerimos el primer paso.', 'Tell us what is holding you back. We\'ll suggest the first step.')}</h2>
      <div class="row" style="justify-content:center;margin-top:1.6rem">
        <a class="btn btn-white btn-lg" href="${base}contact.html">${x('Pedir cotización', 'Get a quote')} <svg class="arrow"><use href="#i-arrow-right"/></svg></a>
        <a class="btn btn-ghost btn-lg" href="${base}samples.html">${x('Probar las muestras', 'Try the samples')}</a>
      </div>
    </div>
  </div>
</section>
{{> footer}}`,
  };
};
