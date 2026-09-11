export default (ctx) => {
  const { x, base, icon: I } = ctx;
  const flow = [
    { tag: x('Gratis · 1 hora', 'Free · 1 hour'), title: x('Te visitamos y te escuchamos', 'We visit and listen'), text: x('Vemos cómo trabajas hoy y qué te frena.', 'We see how you work today and what holds you back.'), art: 'art-workshop' },
    { tag: x('En pocos días', 'Within days'), title: x('Recibes una cotización clara', 'You get a clear quote'), text: x('Software, equipo, instalación y capacitación. Un precio.', 'Software, hardware, installation and training. One price.'), art: 'art-quote' },
    { tag: x('Antes de llegar', 'Before we arrive'), title: x('Preparamos todo', 'We prepare everything'), text: x('Tus productos, precios y personal ya cargados.', 'Your products, prices and staff already loaded.'), art: 'art-products' },
    { tag: x('Día de instalación', 'Install day'), title: x('Lo instalamos en tu local', 'We install it on site'), text: x('Terminales, impresoras, tabletas y servidor, probados contigo.', 'Terminals, printers, tablets and server, tested with you.'), art: 'art-install' },
    { tag: x('El mismo día', 'The same day'), title: x('Capacitamos a tu equipo', 'We train your team'), text: x('Práctica real y una guía impresa junto al mostrador.', 'Hands-on practice and a printed guide by the counter.'), art: 'art-training' },
    { tag: x('Siempre', 'Always'), title: x('Soporte y mejoras', 'Support and improvements'), text: x('Nos llamas y lo arreglamos, remoto o en tu local.', 'You call us and we fix it, remotely or on site.'), art: 'art-support' },
  ];
  const day = [
    ['08:00', x('Llegada y equipo', 'Arrival and hardware'), x('Montamos terminales, impresoras y tabletas.', 'We mount terminals, printers and tablets.')],
    ['10:00', x('Servidor y red', 'Server and network'), x('Cada dispositivo conectado y probado.', 'Every device connected and tested.')],
    ['11:30', x('Tus datos, revisados', 'Your data, reviewed'), x('Productos, precios y personal contigo.', 'Products, prices and staff with you.')],
    ['13:00', x('Capacitación', 'Training'), x('Grupos pequeños, práctica real.', 'Small groups, real practice.')],
    ['15:00', x('Arranque', 'Go live'), x('Tus primeras ventas, con nosotros al lado.', 'Your first sales, with us beside you.')],
    ['17:00', x('Entrega', 'Handover'), x('Guía impresa y número directo de soporte.', 'Printed guide and a direct support number.')],
  ];
  const plans = [
    { icon: 'headset', color: 'grad-blue', name: x('Esencial', 'Essential'), items: [x('Soporte en horario laboral', 'Business-hours support'), x('Actualizaciones instaladas por nosotros', 'Updates installed by us'), x('Diagnóstico remoto', 'Remote diagnostics')] },
    { icon: 'zap', color: 'grad-violet', name: x('Prioritario', 'Priority'), items: [x('Respuesta el mismo día', 'Same-day response'), x('Noches y fines de semana', 'Evenings and weekends'), x('Revisión anual en tu local', 'Yearly on-site check-up')], featured: true },
    { icon: 'shield', color: 'grad-cyan', name: x('Administrado', 'Managed'), items: [x('Monitoreo preventivo', 'Proactive monitoring'), x('Respaldos externos cifrados', 'Encrypted off-site backups'), x('Reemplazo de equipo cubierto', 'Hardware replacement covered')] },
  ];
  return {
    title: x('Cómo funciona', 'How it works'),
    description: x('Una visita gratuita, una cotización clara, el día de instalación en tu local, capacitación y soporte. Así trabaja Innovatiff.', 'A free visit, a clear quote, install day at your business, training and support. This is how Innovatiff works.'),
    body: `{{> head}}
{{> nav}}
<section class="p-hero" style="padding-bottom:0">
  <div class="orb violet" style="width:700px;height:700px;right:-300px;top:-200px"></div>
  <div class="container center">
    <span class="eyebrow" data-reveal="blur"><span class="dot"></span>${x('Cómo funciona', 'How it works')}</span>
    <h1 class="h-display" data-words style="margin:1.2rem auto 1.2rem;max-width:20ch">${x('De la primera visita al <span class="grad">día de instalación</span>', 'From the first visit to <span class="grad">install day</span>')}</h1>
    <p class="lead" data-reveal="blur" style="--d:400ms;margin:0 auto 2rem">${x('Sin tecnicismos y sin sorpresas. Seis pasos, un solo proveedor.', 'No jargon, no surprises. Six steps, one provider.')}</p>
    <div class="row" style="justify-content:center" data-reveal="up">
      <a class="btn btn-primary btn-lg" href="${base}contact.html">${x('Agendar una visita gratuita', 'Book a free visit')} <svg class="arrow"><use href="#i-arrow-right"/></svg></a>
      <a class="btn btn-ghost btn-lg" href="#onsite">${x('Qué significa "en tu local"', 'What "on site" means')}</a>
    </div>
  </div>
</section>

<section class="section rel">
  <div class="rings"><i></i><i></i><i></i></div>
  <div class="container z1">
    <div class="flow">
      ${flow.map((s, i) => `<div class="flow-step"><div class="flow-dot">${i + 1}</div><div class="flow-text" data-reveal="${i % 2 ? 'right' : 'left'}"><span class="tag violet">${s.tag}</span><h3>${s.title}</h3><p>${s.text}</p></div><div class="flow-art" data-reveal="${i % 2 ? 'left' : 'right'}" data-play>{{> ${s.art}}}</div></div>`).join('')}
    </div>
  </div>
</section>

<section class="section" id="onsite">
  <div class="container">
    <div class="split">
      <div data-reveal="left">{{> onsite-art}}</div>
      <div>
        <span class="eyebrow left" data-reveal="blur"><span class="dot"></span>${x('Instalado en tu local', 'Installed on site')}</span>
        <h2 style="margin:1rem 0 1.4rem" data-words>${x('Un servidor en tu oficina corre todo', 'One server in your office runs everything')}</h2>
        <div class="stack" data-stagger="110">
          <div class="feature-row" data-reveal="right"><span class="icon-ring">${I('wifi-off')}</span><div><h4>${x('Sigue sin internet', 'Keeps working offline')}</h4><p>${x('Ventas, pedidos, entradas e inventario.', 'Sales, orders, clock-ins and inventory.')}</p></div></div>
          <div class="feature-row" data-reveal="right"><span class="icon-ring">${I('lock')}</span><div><h4>${x('Tus datos, en tu edificio', 'Your data, in your building')}</h4><p>${x('Con respaldo externo cifrado si lo quieres.', 'With an encrypted off-site backup if you want it.')}</p></div></div>
          <div class="feature-row" data-reveal="right"><span class="icon-ring">${I('refresh')}</span><div><h4>${x('Respaldos y actualizaciones solos', 'Backups and updates on their own')}</h4><p>${x('Cada noche, fuera de tus horas pico.', 'Every night, outside your busy hours.')}</p></div></div>
          <div class="feature-row" data-reveal="right"><span class="icon-ring">${I('smartphone')}</span><div><h4>${x('Acceso seguro desde fuera', 'Secure access from outside')}</h4><p>${x('Reportes desde tu casa, si así lo quieres.', 'Reports from home, if you want them.')}</p></div></div>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="section-head">
      <span class="eyebrow" data-reveal="blur"><span class="dot"></span>${x('Día de instalación', 'Install day')}</span>
      <h2 data-words>${x('Un día típico, hora por hora', 'A typical day, hour by hour')}</h2>
    </div>
    <div class="grid grid-3" data-stagger="90">
      ${day.map(([t, h, p]) => `<div class="card" data-reveal="up"><span class="tag">${t}</span><h3 style="margin-top:.9rem">${h}</h3><p>${p}</p></div>`).join('')}
    </div>
  </div>
</section>

<section class="section rel">
  <div class="orb blue" style="width:600px;height:600px;left:-200px;bottom:-200px"></div>
  <div class="container z1">
    <div class="section-head">
      <span class="eyebrow" data-reveal="blur"><span class="dot"></span>${x('Después de la instalación', 'After installation')}</span>
      <h2 data-words>${x('Soporte a tu medida', 'Support your way')}</h2>
    </div>
    <div class="grid grid-3" data-stagger="110">
      ${plans.map((p, i) => `<div class="card ${p.featured ? 'gradient-border' : ''}" data-reveal="${i === 0 ? 'fold-right' : i === 2 ? 'fold-left' : 'up'}"><div class="icon-tile ${p.color}">${I(p.icon)}</div><h3>${p.name}</h3><ul class="checks" style="margin-top:1rem">${p.items.map((t) => `<li>${I('check')}<span>${t}</span></li>`).join('')}</ul></div>`).join('')}
    </div>
    <p class="center muted small" style="margin-top:1.5rem" data-reveal="up">${x('Los planes se cotizan junto con tu instalación: un solo precio completo.', 'Plans are quoted with your installation: one complete price.')}</p>
  </div>
</section>

<section class="section tight">
  <div class="container">
    <div class="cta-band" data-reveal="scale">
      <span class="eyebrow"><span class="dot"></span>${x('Primer paso', 'First step')}</span>
      <h2 style="margin-top:1rem" data-words>${x('Agenda una visita gratuita', 'Book a free visit')}</h2>
      <div class="row" style="justify-content:center;margin-top:1.6rem"><a class="btn btn-white btn-lg" href="${base}contact.html">${x('Agendar una visita', 'Book a visit')} <svg class="arrow"><use href="#i-arrow-right"/></svg></a></div>
    </div>
  </div>
</section>
{{> footer}}`,
  };
};
