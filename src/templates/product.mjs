import { heroArt, flowArt } from '../data/mockups.mjs';

const icon = (name) => `<svg><use href="#i-${name}"/></svg>`;

export function renderProductPage(p, ctx) {
  const { root, products, site } = ctx;
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

  const faq = p.faq
    .map(
      (f) => `<div class="acc">
        <button class="acc-btn" type="button" aria-expanded="false">${f.q}${icon('plus')}</button>
        <div class="acc-body"><div><p>${f.a}</p></div></div>
      </div>`
    )
    .join('');

  const examples = p.examples
    ? `<section class="section tight">
        <div class="container">
          <div class="section-head"><span class="eyebrow"><span class="dot"></span>What we build</span><h2>A few things we build to order</h2></div>
          <div class="examples" data-stagger="70">
            ${p.examples.map((e) => `<div class="chip" data-reveal="scale">${icon('check')}${e}</div>`).join('')}
          </div>
        </div>
      </section>`
    : '';

  const related = others
    .map(
      (o) => `<a class="card" href="${root}products/${o.slug}.html" data-reveal="up">
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
        <nav class="breadcrumb" aria-label="Breadcrumb" data-reveal="up">
          <a href="${root}index.html">Home</a>${icon('chevron-right')}<a href="${root}products.html">Products</a>${icon('chevron-right')}<span>${p.name}</span>
        </nav>
        <h1 class="h-display" data-words>${p.headline}</h1>
        <p class="lead" data-reveal="blur" style="--d:300ms">${p.lead}</p>
        <div class="row" data-reveal="up" style="--d:450ms">
          <a class="btn btn-primary btn-lg" href="${root}${p.demo.href}">${icon('play')}Try the live sample</a>
          <a class="btn btn-ghost btn-lg" href="${root}contact.html?interest=${p.slug}">Get a quote ${icon('arrow-right')}<span class="sr-only"></span></a>
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
      <span class="eyebrow"><span class="dot"></span>Features</span>
      <h2 data-words>Everything you need, nothing you have to figure out alone</h2>
      <p class="lead">Each feature is set up by us on installation day and explained to your team in plain language.</p>
    </div>
    <div class="feature-grid" data-stagger="90">${features}</div>
  </div>
</section>

<section class="section rel">
  <div class="rings"><i></i><i></i><i></i></div>
  <div class="container z1">
    <div class="section-head">
      <span class="eyebrow"><span class="dot"></span>How it works</span>
      <h2 data-words>From the first tap to the report, step by step</h2>
    </div>
    <div class="flow">${how}</div>
  </div>
</section>

${examples}

<section class="section">
  <div class="container">
    <div class="card gradient-border static onsite-panel" data-reveal="up">
      <div>
        <span class="eyebrow left"><span class="dot"></span>Installed on site</span>
        <h2 style="margin:1rem 0 .9rem">${p.onsite.title}</h2>
        <p class="lead" style="margin-bottom:1.4rem">${p.onsite.desc}</p>
        <ul class="checks">${onsiteItems}</ul>
      </div>
      <div class="onsite-side">
        <div class="onsite-visual">{{> onsite-mini}}</div>
        <div class="hw-list">${hardware}</div>
      </div>
    </div>
  </div>
</section>

<section class="section tight">
  <div class="container">
    <div class="card solid static demo-panel" data-reveal="up">
      <div>
        <span class="tag green"><span class="dot" style="width:7px;height:7px;border-radius:50%;background:currentColor"></span> Live sample</span>
        <h2 style="margin:1rem 0 .9rem">${p.demo.title}</h2>
        <p class="lead" style="margin-bottom:1.2rem">${p.demo.desc}</p>
        <ul class="checks" style="margin-bottom:1.6rem">${p.demo.bullets.map((b) => `<li>${icon('check')}<span>${b}</span></li>`).join('')}</ul>
        <div class="row">
          <a class="btn btn-primary btn-lg" href="${root}${p.demo.href}">${icon('play')}Open the sample</a>
          <a class="btn-link" href="${root}samples.html">All samples ${icon('arrow-right')}</a>
        </div>
      </div>
      <a class="demo-preview" href="${root}${p.demo.href}" aria-label="Open the ${p.name} sample">
        <div class="demo-frame">
          <div class="device-bar"><i></i><i></i><i></i><span class="url">${site.name.toLowerCase()}-samples / ${p.demo.href.replace('demos/', '').replace('.html', '')}</span></div>
          <div class="demo-shot">${heroArt(p.slug, true)}</div>
          <div class="demo-hover">${icon('play')}<span>Open interactive sample</span></div>
        </div>
      </a>
    </div>
  </div>
</section>

<section class="section">
  <div class="container narrow">
    <div class="section-head">
      <span class="eyebrow"><span class="dot"></span>Questions</span>
      <h2>Common questions about ${p.name.toLowerCase()}</h2>
    </div>
    <div data-reveal="up">${faq}</div>
  </div>
</section>

<section class="section tight">
  <div class="container">
    <div class="cta-band" data-reveal="scale">
      <span class="eyebrow"><span class="dot"></span>Next step</span>
      <h2 style="margin-top:1rem">Want ${p.name.toLowerCase()} in your business?</h2>
      <p class="lead">Tell us about your business. We visit, we listen, and you receive a clear quote with everything included: software, hardware, installation and training.</p>
      <div class="row" style="justify-content:center">
        <a class="btn btn-white btn-lg" href="${root}contact.html?interest=${p.slug}">Get a quote ${icon('arrow-right')}</a>
        <a class="btn btn-ghost btn-lg" href="${root}how-it-works.html">See how installation works</a>
      </div>
    </div>
  </div>
</section>

<section class="section tight">
  <div class="container">
    <div class="section-head left" style="margin-bottom:1.5rem"><h3>Other products that connect to it</h3></div>
    <div class="related" data-stagger="70">${related}</div>
  </div>
</section>
{{> footer}}`;
}
