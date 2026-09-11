export default (ctx) => {
  const { x } = ctx;
  return {
    title: x('Muestra · Caja POS', 'Sample · POS register'),
    description: x('Muestra interactiva del sistema POS: cobra productos, recibe efectivo o tarjeta, imprime recibos y cierra el día.', 'Interactive POS sample: ring up items, take cash or card, print receipts and close the day.'),
    bodyClass: 'demo',
    extraCss: 'assets/css/demo.css',
    extraJs: 'assets/js/demos/pos.js',
    demoName: x('Café Amanecer · Caja POS', 'Café Amanecer · POS register'),
    productSlug: 'pos-system',
    body: `{{> head}}
{{> demo-bar}}
<main class="demo-main" id="main">
  <div class="shell-top" style="margin-bottom:1rem">
    <div class="seg" id="pos-seg"><button type="button" data-nav="register"><svg><use href="#i-pos"/></svg>${x('Caja', 'Register')}</button><button type="button" data-nav="sales"><svg><use href="#i-receipt"/></svg>${x('Ventas de hoy', 'Today\'s sales')}</button><button type="button" data-nav="eod"><svg><use href="#i-bar-chart"/></svg>${x('Cierre del día', 'End of day')}</button></div>
    <div class="right">
      <span class="pill"><span class="dot"></span>${x('Caja 1', 'Register 1')} · Sam K.</span>
      <label class="offline-toggle" id="offline-wrap"><span class="switch" id="offline" role="switch" aria-checked="false" tabindex="0"></span><span>${x('Simular que se cae el internet', 'Simulate the internet going down')}</span></label>
    </div>
  </div>
  <div class="offline-banner" style="margin-bottom:1rem"><svg><use href="#i-wifi-off"/></svg>${x('Se cayó el internet. El POS sigue vendiendo: cada venta se guarda en el servidor local y se sincroniza cuando regrese la conexión.', 'The internet is down. The POS keeps selling: every sale is saved on the local server and syncs when the connection returns.')}</div>
  <section data-view="register">
    <div class="pos-layout">
      <div class="pos-left">
        <div class="pos-toolbar"><div class="search"><svg><use href="#i-search"/></svg><input id="pos-search" placeholder="${x('Buscar, o escribir un código de barras…', 'Search, or type a barcode…')}" aria-label="${x('Buscar productos', 'Search products')}"></div><nav class="cats" id="pos-cats"></nav><span class="hint"><svg><use href="#i-scan"/></svg>${x('Prueba escanear: escribe <b>5012</b> y presiona Enter', 'Try scanning: type <b>5012</b> and press Enter')}</span></div>
        <div class="pos-products" id="pos-products"></div>
      </div>
      <div class="pos-right panel" id="pos-cart"></div>
    </div>
  </section>
  <section data-view="sales">
    <div class="shell-top"><div><h1>${x('Ventas de hoy', 'Today\'s sales')}</h1><span class="sub" id="sales-sub"></span></div></div>
    <div class="panel table-wrap"><table class="table" id="sales-table"></table></div>
  </section>
  <section data-view="eod">
    <div class="shell-top"><div><h1>${x('Cierre del día', 'End of day')}</h1><span class="sub">${x('Todo lo de abajo se calcula solo. Cerrar la caja toma un toque.', 'Everything below is calculated for you. Closing takes one tap.')}</span></div></div>
    <div class="kpi-grid" id="eod-kpis"></div>
    <div class="two">
      <div class="panel"><h3><svg><use href="#i-credit-card"/></svg>${x('Por forma de pago', 'By payment method')}</h3><div class="list" id="eod-pay"></div></div>
      <div class="panel"><h3><svg><use href="#i-trending-up"/></svg>${x('Productos más vendidos', 'Best sellers')}</h3><div class="list" id="eod-top"></div></div>
    </div>
    <div class="panel"><div class="panel-head"><h3><svg><use href="#i-lock"/></svg>${x('Cerrar caja', 'Close register')}</h3><button class="btn btn-primary" type="button" id="close-day"><svg><use href="#i-printer"/></svg>${x('Imprimir reporte Z y cerrar', 'Print Z report and close')}</button></div><p class="muted small">${x('Cuadra el cajón contra las ventas en efectivo, imprime el reporte y envía una copia a tu correo. Las existencias ya quedaron actualizadas.', 'Balances the drawer against cash sales, prints the report and emails you a copy. Stock is already updated.')}</p></div>
  </section>
</main>
{{> demo-footer}}`,
  };
};
