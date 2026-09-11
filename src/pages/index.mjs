import { mockups } from '../data/mockups.mjs';

export default (ctx) => {
  const { x, base, lang, icon: I } = ctx;
  const { flowArt } = mockups(lang);
  const steps = [
    { art: 'workshop', title: x('Te visitamos', 'We visit you'), text: x('Gratis, 1 hora', 'Free, 1 hour') },
    { art: 'quote', title: x('Cotización clara', 'A clear quote'), text: x('Un solo precio', 'One single price') },
    { art: 'install', title: x('Instalamos en tu local', 'We install on site'), text: x('En un día', 'In one day') },
    { art: 'training', title: x('Capacitamos a tu equipo', 'We train your team'), text: x('El mismo día', 'The same day') },
  ];
  return {
    title: '',
    description: ctx.site.description,
    bodyClass: 'home',
    body: `{{> head}}
{{> nav}}
<section class="hero">
  <div class="hero-glow"></div>
  {{> petals}}
  <div class="container hero-inner">
    {{> network}}
    <span class="eyebrow" data-reveal="blur" style="--d:200ms"><span class="dot"></span>${x('Software a la medida · Instalado en tu local', 'Custom software · Installed on site')}</span>
    <h1 class="h-display" data-words style="--d:250ms">${x('Software para tu negocio, <span class="grad">instalado en tu local</span>', 'Software for your business, <span class="grad">installed on site</span>')}</h1>
    <p class="lead" data-reveal="blur" style="--d:800ms">${x('Lo diseñamos, lo instalamos en tu negocio y capacitamos a tu equipo.', 'We design it, install it at your business and train your team.')}</p>
    <div class="hero-actions" data-reveal="up" style="--d:950ms">
      <form class="email-cta" action="${base}contact.html" method="get">
        <input type="email" name="email" placeholder="${x('Escribe tu correo…', 'Enter your email…')}" aria-label="${x('Tu correo', 'Your email')}" required>
        <button class="btn btn-primary" type="submit">${x('Pedir cotización', 'Get a quote')} <svg class="arrow"><use href="#i-arrow-right"/></svg></button>
      </form>
      <a class="btn btn-ghost btn-lg" href="${base}samples.html">${I('play')}${x('Probar las muestras', 'Try the samples')}</a>
    </div>
    <div class="hero-note" data-reveal="up" style="--d:1100ms">
      <span>${I('check')}${x('Sin comisiones', 'No commissions')}</span>
      <span>${I('check')}${x('Funciona sin internet', 'Works offline')}</span>
      <span>${I('check')}${x('Instalación incluida', 'Installation included')}</span>
    </div>
  </div>
  <div class="hero-mock container wide">
    <div class="mock-glow"></div>
    <div class="tilt-wrap"><div data-reveal="up" style="--d:1200ms">{{> dashboard}}</div></div>
  </div>
</section>

<section class="section tight">
  <div class="container">
    <p class="center muted small" style="margin-bottom:1.2rem" data-reveal="up">${x('Hecho para los negocios de tu ciudad', 'Built for the businesses in your town')}</p>
    {{> industry-marquee}}
  </div>
</section>

<section class="section" id="products">
  <div class="container">
    <div class="section-head">
      <span class="eyebrow" data-reveal="blur"><span class="dot"></span>${x('Lo que construimos', 'What we build')}</span>
      <h2 data-words>${x('Seis productos. Un solo sistema.', 'Six products. One system.')}</h2>
    </div>
    {{> home-products}}
  </div>
</section>

<section class="section rel">
  <div class="orb violet" style="width:600px;height:600px;right:-200px;top:0"></div>
  <div class="container z1">
    <div class="split">
      <div>
        <span class="eyebrow left" data-reveal="blur"><span class="dot"></span>${x('Instalado en tu local', 'Installed on site')}</span>
        <h2 style="margin:1rem 0 1.4rem" data-words>${x('Todo corre en tu negocio. Tus datos se quedan contigo.', 'Everything runs at your business. Your data stays with you.')}</h2>
        <div class="stack" data-stagger="120">
          <div class="feature-row" data-reveal="left"><span class="icon-ring">${I('wifi-off')}</span><div><h4>${x('Funciona sin internet', 'Works without internet')}</h4><p>${x('Ventas, pedidos y entradas siguen corriendo.', 'Sales, orders and clock-ins keep running.')}</p></div></div>
          <div class="feature-row" data-reveal="left"><span class="icon-ring">${I('lock')}</span><div><h4>${x('Tus datos, en tu edificio', 'Your data, in your building')}</h4><p>${x('En tu servidor, no en la nube de alguien más.', 'On your server, not in someone else\'s cloud.')}</p></div></div>
          <div class="feature-row" data-reveal="left"><span class="icon-ring">${I('wrench')}</span><div><h4>${x('Instalado y probado por nosotros', 'Installed and tested by us')}</h4><p>${x('Llevamos el equipo, lo conectamos y capacitamos.', 'We bring the hardware, wire it up and train.')}</p></div></div>
        </div>
        <div class="row" style="margin-top:1.8rem" data-reveal="up">
          <a class="btn btn-ghost" href="${base}how-it-works.html">${x('Cómo es la instalación', 'How installation works')} <svg class="arrow"><use href="#i-arrow-right"/></svg></a>
        </div>
      </div>
      <div data-reveal="right">{{> onsite-art}}</div>
    </div>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="section-head">
      <span class="eyebrow" data-reveal="blur"><span class="dot"></span>${x('Cómo funciona', 'How it works')}</span>
      <h2 data-words>${x('De la primera visita a tu equipo usándolo', 'From the first visit to your team using it')}</h2>
    </div>
    <div class="grid grid-4 step-cards" data-stagger="110">
      ${steps.map((s, i) => `<div class="card step-card" data-reveal="up"><div class="card-art" data-play>${flowArt(s.art)}</div><div class="step-card-text"><span class="step-num">${i + 1}</span><div><h4>${s.title}</h4><p>${s.text}</p></div></div></div>`).join('')}
    </div>
    <div class="center" style="margin-top:2.5rem" data-reveal="up"><a class="btn-link" href="${base}how-it-works.html">${x('Ver el proceso completo', 'See the full process')} ${I('arrow-right')}</a></div>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="section-head">
      <span class="eyebrow" data-reveal="blur"><span class="dot"></span>${x('Equipo', 'Hardware')}</span>
      <h2 data-words>${x('También llevamos e instalamos el equipo', 'We also supply and install the hardware')}</h2>
    </div>
    {{> hardware-fan}}
  </div>
</section>

<section class="section tight">
  <div class="container">
    <div class="stats" data-stagger="120">
      <div class="stat" data-reveal="up"><div class="stat-num"><span data-count="6">0</span></div><div class="stat-label">${x('productos que trabajan juntos', 'products that work together')}</div></div>
      <div class="stat" data-reveal="up"><div class="stat-num"><span data-count="1">0</span></div><div class="stat-label">${x('solo proveedor para todo', 'single provider for everything')}</div></div>
      <div class="stat" data-reveal="up"><div class="stat-num"><span data-count="100" data-suffix=" %">0</span></div><div class="stat-label">${x('instalado en tu local', 'installed on site')}</div></div>
      <div class="stat" data-reveal="up"><div class="stat-num"><span data-count="0" data-suffix=" %">0</span></div><div class="stat-label">${x('de comisión sobre tus ventas', 'commission on your sales')}</div></div>
    </div>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="section-head">
      <span class="eyebrow" data-reveal="blur"><span class="dot"></span>${x('Clientes', 'Customers')}</span>
      <h2 data-words>${x('Lo que dicen los dueños', 'What owners say')}</h2>
    </div>
    {{> testimonials}}
  </div>
</section>

<section class="section tight">
  <div class="container">
    <div class="cta-band" data-reveal="scale">
      <span class="eyebrow"><span class="dot"></span>${x('Hablemos', 'Let\'s talk')}</span>
      <h2 style="margin-top:1rem" data-words>${x('Cuéntanos de tu negocio. Te mostramos lo que construiríamos.', 'Tell us about your business. We\'ll show you what we would build.')}</h2>
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
