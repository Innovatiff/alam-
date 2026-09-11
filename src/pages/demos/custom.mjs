export default (ctx) => {
  const { x } = ctx;
  return {
    title: x('Muestra · Arma tu propio sistema', 'Sample · Build your own system'),
    description: x('Elige tu tipo de negocio y los módulos que necesitas, y mira cómo se arma un sistema a tu medida.', 'Pick your business type and the modules you need, and watch a custom system take shape.'),
    bodyClass: 'demo',
    extraCss: 'assets/css/demo.css',
    extraJs: 'assets/js/demos/custom.js',
    demoName: x('Arma tu propio sistema', 'Build your own system'),
    productSlug: 'custom-software',
    body: `{{> head}}
{{> demo-bar}}
<main class="demo-main" id="main">
  <div class="builder">
    <div class="builder-config">
      <div class="panel" id="types-panel">
        <div class="panel-head"><h3><span class="step-badge">1</span>${x('¿Qué tipo de negocio tienes?', 'What kind of business do you have?')}</h3></div>
        <div class="type-grid" id="types"></div>
      </div>
      <div class="panel" id="modules-panel">
        <div class="panel-head"><h3><span class="step-badge">2</span>${x('¿Qué módulos necesitas?', 'Which modules do you need?')}</h3><span class="muted small" id="mod-count"></span></div>
        <div class="mod-grid" id="modules"></div>
      </div>
      <div class="panel" id="details-panel">
        <div class="panel-head"><h3><span class="step-badge">3</span>${x('Unos detalles más', 'A few more details')}</h3></div>
        <div class="form-grid">
          <div class="field"><label>${x('Sucursales', 'Locations')}</label><div class="seg" id="locations"><button type="button" data-v="1" class="on">1</button><button type="button" data-v="2">2</button><button type="button" data-v="3">${x('3 o más', '3 or more')}</button></div></div>
          <div class="field"><label>${x('Cajas / mostradores', 'Registers / counters')}: <b id="term-label">1</b></label><input type="range" id="terminals" min="1" max="6" value="1" class="range"></div>
          <div class="field full"><label>${x('Extras', 'Extras')}</label><div class="check-grid">
            <label class="check"><input type="checkbox" id="x-remote" checked> ${x('Acceso seguro desde casa', 'Secure access from home')}</label>
            <label class="check"><input type="checkbox" id="x-backup"> ${x('Respaldo externo cifrado', 'Encrypted off-site backup')}</label>
            <label class="check"><input type="checkbox" id="x-display"> ${x('Pantalla para el cliente', 'Customer display')}</label>
            <label class="check"><input type="checkbox" id="x-multi"> ${x('Varios idiomas', 'Multiple languages')}</label>
          </div></div>
        </div>
      </div>
    </div>
    <div class="builder-preview">
      <div class="preview-app device" id="preview"></div>
      <div class="panel summary" id="summary"></div>
    </div>
  </div>
</main>
{{> demo-footer}}`,
  };
};
