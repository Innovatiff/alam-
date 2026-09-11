export default (ctx) => {
  const { x, base } = ctx;
  return {
    title: x('Muestras en vivo', 'Live samples'),
    description: x('Prueba muestras que funcionan de cada producto: sitio con pedidos, gestión de empleados, POS, recepcionista con IA, inventario y un armador de sistemas a la medida.', 'Try working samples of every product: ordering site, employee management, POS, AI receptionist, inventory and a custom system builder.'),
    body: `{{> head}}
{{> nav}}
<section class="p-hero" style="padding-bottom:0">
  <div class="orb violet" style="width:700px;height:700px;right:-300px;top:-200px"></div>
  <div class="container center">
    <span class="eyebrow" data-reveal="blur"><span class="dot"></span>${x('Muestras en vivo', 'Live samples')}</span>
    <h1 class="h-display" data-words style="margin:1.2rem auto 1.2rem;max-width:18ch">${x('Prueba el software <span class="grad">antes de comprarlo</span>', 'Try the software <span class="grad">before you buy it</span>')}</h1>
    <p class="lead" data-reveal="blur" style="--d:400ms;margin:0 auto">${x('Versiones reales con datos de ejemplo y una guía paso a paso. Nada se guarda.', 'Real versions with sample data and a step-by-step guide. Nothing is saved.')}</p>
  </div>
</section>

<section class="section">
  <div class="container">
    {{> sample-cards}}
  </div>
</section>

<section class="section tight">
  <div class="container">
    <div class="card gradient-border static onsite-panel" data-reveal="up">
      <div>
        <span class="eyebrow left"><span class="dot"></span>${x('Lo que ves es lo que instalamos', 'What you see is what we install')}</span>
        <h2 style="margin:1rem 0 .9rem">${x('La versión real corre en tu local, con tus productos adentro', 'The real version runs on site, with your products inside')}</h2>
        <div class="row" style="margin-top:1.4rem"><a class="btn btn-primary" href="${base}contact.html">${x('Pedir cotización', 'Get a quote')} <svg class="arrow"><use href="#i-arrow-right"/></svg></a><a class="btn btn-ghost" href="${base}how-it-works.html">${x('Cómo es la instalación', 'How installation works')}</a></div>
      </div>
      <div class="onsite-side"><div class="onsite-visual">{{> onsite-mini}}</div></div>
    </div>
  </div>
</section>
{{> footer}}`,
  };
};
