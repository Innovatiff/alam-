import { mockups } from '../data/mockups.mjs';

const icon = (name) => `<svg><use href="#i-${name}"/></svg>`;

export function renderProductPage(p, ctx) {
  const { base, products, x, lang } = ctx;
  const { heroArt, flowArt } = mockups(lang);
  const others = products.filter((o) => o.slug !== p.slug);

  const kpis = p.kpis.map((k) => `<div class="kpi">${icon(k.icon)}<span>${k.text}</span></div>`).join('');

  const features = p.features
    .map(
      (f) => `<article class="card feature" data-reveal="up">
        <div class="icon-tile grad-${p.color}">${icon(f.icon)}</div>
        <h3>${f.title}</h3>
        <p>${f.desc}</p>
      </article>`
    )
    .join('');

  const how = p.how
    .map(
      (s, i) => `<div class="flow-step">
        <div class="flow-dot">${i + 1}</div>
        <div class="flow-text" data-reveal="${i % 2 === 0 ? 'left' : 'right'}">
          <span class="tag violet">${s.tag}</span>
          <h3>${s.title}</h3>
          <p>${s.desc}</p>
        </div>
        <div class="flow-art" data-reveal="${i % 2 === 0 ? 'right' : 'left'}" data-play>${flowArt(s.art)}</div>
      </div>`
    )
    .join('');

  const onsiteItems = p.onsite.items.map((t) => `<li>${icon('check')}<span>${t}</span></li>`).join('');
  const hardware = p.onsite.hardware.map((h) => `<div class="hw-chip">${icon(h.icon)}<span>${h.name}</span></div>`).join('');

  const examples = p.examples
    ? `<section class="section tight">
        <div class="container">
          <div class="section-head"><span class="eyebrow"><span class="dot"></span>${x('Lo que construimos', 'What we build')}</span><h2>${x('Algunos ejemplos', 'A few examples')}</h2></div>
          <div class="examples" data-stagger="70">
            ${p.examples.map((e) => `<div class="chip" data-reveal="scale">${icon('check')}${e}</div>`).join('')}
          </div>
        </div>
      </section>`
    : '';

  const related = others
    .map(
      (o) => `<a class="card" href="${base}products/${o.slug}.html" data-reveal="up">
        <div class="icon-tile sm grad-${o.color}">${icon(o.icon)}</div>
        <h4>${o.name}</h4>
        <p class="small">${o.short}</p>
      </a>`
    )
    .join('');

  return `{{> head}}
{{> nav}}
<section class="p-hero">
  <div class="orb blue" style="width:700px;height:700px;left:-300px;top:-200px"></div>
  <div class="container">
    <div class="split">
      <div>
        <nav class="breadcrumb" aria-label="${x('Ruta', 'Breadcrumb')}" data-reveal="up">
          <a href="${base}index.html">${x('Inicio', 'Home')}</a>${icon('chevron-right')}<a href="${base}products.html">${x('Productos', 'Products')}</a>${icon('chevron-right')}<span>${p.name}</span>
        </nav>
        <h1 class="h-display" data-words>${p.headline}</h1>
        <p class="lead" data-reveal="blur" style="--d:300ms">${p.lead}</p>
        <div class="row" data-reveal="up" style="--d:450ms">
          <a class="btn btn-primary btn-lg" href="${base}${p.demo.href}">${icon('play')}${x('Probar la muestra', 'Try the sample')}</a>
          <a class="btn btn-ghost btn-lg" href="${base}contact.html?interest=${p.slug}">${x('Pedir cotización', 'Get a quote')} ${icon('arrow-right')}</a>
        </div>
        <div class="kpis" data-reveal="up" style="--d:600ms">${kpis}</div>
      </div>
      <div class="p-hero-art" data-reveal="scale" style="--d:200ms">
        <div class="orb violet"></div>
        ${heroArt(p.slug)}
      </div>
    </div>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="section-head">
      <span class="eyebrow"><span class="dot"></span>${x('Funciones', 'Features')}</span>
      <h2 data-words>${x('Lo que hace', 'What it does')}</h2>
    </div>
    <div class="feature-grid four" data-stagger="90">${features}</div>
  </div>
</section>

<section class="section rel">
  <div class="rings"><i></i><i></i><i></i></div>
  <div class="container z1">
    <div class="section-head">
      <span class="eyebrow"><span class="dot"></span>${x('Cómo funciona', 'How it works')}</span>
      <h2 data-words>${x('En tres pasos', 'In three steps')}</h2>
    </div>
    <div class="flow">${how}</div>
  </div>
</section>

${examples}

<section class="section">
  <div class="container">
    <div class="card gradient-border static onsite-panel" data-reveal="up">
      <div>
        <span class="eyebrow left"><span class="dot"></span>${x('Instalado en tu local', 'Installed on site')}</span>
        <h2 style="margin:1rem 0 1.2rem">${p.onsite.title}</h2>
        <ul class="checks" style="margin-bottom:1.4rem">${onsiteItems}</ul>
        <div class="hw-list">${hardware}</div>
      </div>
      <div class="onsite-side">
        <div class="onsite-visual">{{> onsite-mini}}</div>
      </div>
    </div>
  </div>
</section>

<section class="section tight">
  <div class="container">
    <div class="card solid static demo-panel" data-reveal="up">
      <div>
        <span class="tag green"><span class="dot" style="width:7px;height:7px;border-radius:50%;background:currentColor"></span> ${x('Muestra en vivo', 'Live sample')}</span>
        <h2 style="margin:1rem 0 .9rem">${p.demo.title}</h2>
        <p class="lead" style="margin-bottom:1.2rem">${p.demo.desc}</p>
        <ul class="checks" style="margin-bottom:1.6rem">${p.demo.bullets.map((b) => `<li>${icon('check')}<span>${b}</span></li>`).join('')}</ul>
        <div class="row">
          <a class="btn btn-primary btn-lg" href="${base}${p.demo.href}">${icon('play')}${x('Abrir la muestra', 'Open the sample')}</a>
          <a class="btn-link" href="${base}samples.html">${x('Todas las muestras', 'All samples')} ${icon('arrow-right')}</a>
        </div>
      </div>
      <a class="demo-preview" href="${base}${p.demo.href}" aria-label="${x('Abrir la muestra', 'Open the sample')}: ${p.name}">
        <div class="demo-frame">
          <div class="device-bar"><i></i><i></i><i></i><span class="url">${x('muestras', 'samples')} / ${p.demo.href.replace('demos/', '').replace('.html', '')}</span></div>
          <div class="demo-shot">${heroArt(p.slug, true)}</div>
          <div class="demo-hover">${icon('play')}<span>${x('Abrir la muestra', 'Open the sample')}</span></div>
        </div>
      </a>
    </div>
  </div>
</section>

<section class="section tight">
  <div class="container">
    <div class="cta-band" data-reveal="scale">
      <span class="eyebrow"><span class="dot"></span>${x('Siguiente paso', 'Next step')}</span>
      <h2 style="margin-top:1rem">${x('¿Lo quieres en tu negocio?', 'Want this at your business?')}</h2>
      <div class="row" style="justify-content:center;margin-top:1.6rem">
        <a class="btn btn-white btn-lg" href="${base}contact.html?interest=${p.slug}">${x('Pedir cotización', 'Get a quote')} ${icon('arrow-right')}</a>
        <a class="btn btn-ghost btn-lg" href="${base}how-it-works.html">${x('Cómo es la instalación', 'How installation works')}</a>
      </div>
    </div>
  </div>
</section>

<section class="section tight">
  <div class="container">
    <div class="section-head left" style="margin-bottom:1.5rem"><h3>${x('Se conecta con', 'Works together with')}</h3></div>
    <div class="related" data-stagger="70">${related}</div>
  </div>
</section>
{{> footer}}`;
}
