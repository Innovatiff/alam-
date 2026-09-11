export default (ctx) => {
  const { x, base, site, icon: I } = ctx;
  const values = [
    { icon: 'message', color: 'grad-blue', reveal: 'fold-right', title: x('Palabras sencillas', 'Plain words'), text: x('Sin tecnicismos, ni en la cotización ni en la capacitación.', 'No jargon, not in the quote and not in training.') },
    { icon: 'sliders', color: 'grad-indigo', reveal: 'up', title: x('Construido alrededor de ti', 'Built around you'), text: x('El software se adapta a tu proceso, no al revés.', 'The software adapts to your process, not the other way around.') },
    { icon: 'server', color: 'grad-violet', reveal: 'up', title: x('En tu local y tuyo', 'On site and yours'), text: x('Funciona sin internet, con tus datos en tu equipo.', 'Works offline, with your data on your hardware.') },
    { icon: 'headset', color: 'grad-cyan', reveal: 'fold-left', title: x('Un solo socio', 'One partner'), text: x('Software, equipo, instalación y soporte de las mismas personas.', 'Software, hardware, installation and support from the same people.') },
  ];
  return {
    title: x('Nosotros', 'About'),
    description: x('Innovatiff es un estudio de software que diseña, construye e instala software en negocios locales.', 'Innovatiff is a software studio that designs, builds and installs software at local businesses.'),
    body: `{{> head}}
{{> nav}}
<section class="p-hero" style="padding-bottom:0">
  <div class="orb blue" style="width:700px;height:700px;left:-300px;top:-200px"></div>
  <div class="container">
    <div class="split">
      <div>
        <span class="eyebrow left" data-reveal="blur"><span class="dot"></span>${x('Sobre', 'About')} ${site.name}</span>
        <h1 class="h-display" data-words style="margin:1.2rem 0">${x('Un socio de software que <span class="grad">va a tu negocio</span>', 'A software partner that <span class="grad">comes to your business</span>')}</h1>
        <p class="lead" data-reveal="blur" style="--d:400ms">${x('Te visitamos, construimos alrededor de cómo trabajas, lo instalamos y capacitamos a tu equipo.', 'We visit you, build around how you work, install it and train your team.')}</p>
        <div class="row" style="margin-top:1.8rem" data-reveal="up">
          <a class="btn btn-primary" href="${base}contact.html">${x('Hablemos', 'Let\'s talk')} <svg class="arrow"><use href="#i-arrow-right"/></svg></a>
          <a class="btn btn-ghost" href="${base}products.html">${x('Ver los productos', 'See the products')}</a>
        </div>
      </div>
      <div class="p-hero-art" data-reveal="scale" style="--d:200ms">
        <div class="orb violet"></div>
        {{> onsite-art}}
      </div>
    </div>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="section-head">
      <span class="eyebrow" data-reveal="blur"><span class="dot"></span>${x('En lo que creemos', 'What we believe')}</span>
      <h2 data-words>${x('Cuatro cosas que hacemos diferente', 'Four things we do differently')}</h2>
    </div>
    <div class="grid grid-4" data-stagger="100">
      ${values.map((v) => `<div class="card" data-reveal="${v.reveal}"><div class="icon-tile ${v.color}">${I(v.icon)}</div><h3>${v.title}</h3><p>${v.text}</p></div>`).join('')}
    </div>
  </div>
</section>

<section class="section rel">
  <div class="rings"><i></i><i></i><i></i></div>
  <div class="container z1">
    <div class="split">
      <div data-reveal="left">
        <span class="eyebrow left" data-reveal="blur"><span class="dot"></span>${x('Cómo trabajamos', 'How we work')}</span>
        <h2 style="margin:1rem 0 1.4rem" data-words>${x('Equipo pequeño, contacto directo', 'Small team, direct contact')}</h2>
        <div class="stack" data-stagger="110">
          <div class="feature-row" data-reveal="left"><span class="icon-ring">${I('map-pin')}</span><div><h4>${x('Empezamos en tu local', 'We start at your place')}</h4><p>${x('Cada proyecto empieza con una visita.', 'Every project starts with a visit.')}</p></div></div>
          <div class="feature-row" data-reveal="left"><span class="icon-ring">${I('eye')}</span><div><h4>${x('Mostramos, luego construimos', 'We show, then we build')}</h4><p>${x('Prototipo y precio fijo antes de construir.', 'Prototype and fixed price before building.')}</p></div></div>
          <div class="feature-row" data-reveal="left"><span class="icon-ring">${I('headset')}</span><div><h4>${x('Nos quedamos', 'We stick around')}</h4><p>${x('La persona que instala es la que contesta.', 'The person who installs is the one who answers.')}</p></div></div>
        </div>
      </div>
      <div class="stack" data-reveal="right" data-stagger="120">
        ${ctx.products.slice(0, 4).map((p) => `<a class="card" href="${base}products/${p.slug}.html" data-reveal="right"><div class="feature-row"><span class="icon-tile sm grad-${p.color}">${I(p.icon)}</span><div><h4>${p.name}</h4><p>${p.short}</p></div></div></a>`).join('')}
      </div>
    </div>
  </div>
</section>

<section class="section tight">
  <div class="container">
    <p class="center muted small" style="margin-bottom:1.2rem" data-reveal="up">${x('Negocios para los que construimos', 'Businesses we build for')}</p>
    {{> industry-marquee}}
  </div>
</section>

<section class="section tight">
  <div class="container">
    <div class="cta-band" data-reveal="scale">
      <span class="eyebrow"><span class="dot"></span>${x('Saluda', 'Say hello')}</span>
      <h2 style="margin-top:1rem" data-words>${x('Veamos tu negocio juntos', 'Let\'s look at your business together')}</h2>
      <div class="row" style="justify-content:center;margin-top:1.6rem"><a class="btn btn-white btn-lg" href="${base}contact.html">${x('Contáctanos', 'Contact us')} <svg class="arrow"><use href="#i-arrow-right"/></svg></a><a class="btn btn-ghost btn-lg" href="${base}samples.html">${x('Probar las muestras', 'Try the samples')}</a></div>
    </div>
  </div>
</section>
{{> footer}}`,
  };
};
