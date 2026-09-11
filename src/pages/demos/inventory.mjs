export default (ctx) => {
  const { x } = ctx;
  const bars = '<i style="--w:1"></i><i style="--w:2"></i><i style="--w:1"></i><i style="--w:3"></i>'.repeat(4);
  return {
    title: x('Muestra · Inventario', 'Sample · Inventory'),
    description: x('Muestra interactiva del software de inventario: existencias en vivo, alertas de stock bajo, recepción con lector y órdenes de compra.', 'Interactive inventory sample: live stock, low-stock alerts, receiving by scanner and purchase orders.'),
    bodyClass: 'demo',
    extraCss: 'assets/css/demo.css',
    extraJs: 'assets/js/demos/inventory.js',
    demoName: x('Café Amanecer · Inventario', 'Café Amanecer · Inventory'),
    productSlug: 'inventory-software',
    body: `{{> head}}
{{> demo-bar}}
<main class="demo-main" id="main">
  <div class="shell">
    <aside class="shell-side">
      <div class="shell-brand"><i></i><div>Café Amanecer<small>${x('Bodega', 'Stockroom')}</small></div></div>
      <nav class="shell-nav" id="shell-nav">
        <button type="button" data-nav="stock"><svg><use href="#i-boxes"/></svg>${x('Existencias', 'Stock')} <span class="count" id="low-count"></span></button>
        <button type="button" data-nav="receive"><svg><use href="#i-scan"/></svg>${x('Recibir', 'Receive')}</button>
        <button type="button" data-nav="orders"><svg><use href="#i-file"/></svg>${x('Órdenes de compra', 'Purchase orders')} <span class="count" id="po-count"></span></button>
        <button type="button" data-nav="suppliers"><svg><use href="#i-truck"/></svg>${x('Proveedores', 'Suppliers')}</button>
        <button type="button" data-nav="reports"><svg><use href="#i-bar-chart"/></svg>${x('Reportes', 'Reports')}</button>
      </nav>
      <div class="shell-foot"><svg><use href="#i-link"/></svg><div>${x('Conectado al POS', 'Connected to the POS')}<small>${x('Cada venta actualiza las existencias al instante', 'Every sale updates stock instantly')}</small></div></div>
    </aside>
    <div class="shell-main">
      <section data-view="stock">
        <div class="shell-top"><div><h1>${x('Existencias', 'Stock')}</h1><span class="sub">${x('En vivo, actualizadas con cada venta y cada entrega', 'Live, updated with every sale and every delivery')}</span></div><div class="right"><div class="search"><svg><use href="#i-search"/></svg><input id="inv-search" placeholder="${x('Buscar productos…', 'Search products…')}"></div><div class="seg" id="inv-filter"><button type="button" data-f="all" class="on">${x('Todo', 'All')}</button><button type="button" data-f="low">${x('Stock bajo', 'Low stock')}</button></div><button class="btn btn-ghost btn-sm" type="button" id="simulate-sales"><svg><use href="#i-pos"/></svg>${x('Simular una hora pico', 'Simulate a rush hour')}</button></div></div>
        <div id="low-panel"></div>
        <div class="panel table-wrap" id="stock-panel"><table class="table" id="stock-table"></table></div>
      </section>
      <section data-view="receive">
        <div class="shell-top"><div><h1>${x('Recibir mercancía', 'Receive goods')}</h1><span class="sub">${x('Escanea cada producto conforme llega la entrega', 'Scan each item as the delivery arrives')}</span></div></div>
        <div class="two">
          <div class="panel scan-panel" id="scan-panel"><h3><svg><use href="#i-scan"/></svg>${x('Lector de códigos de barras', 'Barcode scanner')}</h3><div class="scanbox big" id="scan-visual"><div class="barcode">${bars}</div><div class="beam"></div></div><button class="btn btn-primary btn-lg" type="button" id="scan-btn" style="width:100%"><svg><use href="#i-scan"/></svg>${x('Escanear el siguiente producto', 'Scan the next item')}</button><p class="muted small" style="margin-top:.6rem">${x('En tu negocio esto se hace con el lector de mano que instalamos. Cada escaneo suma una caja a las existencias.', 'At your business this is done with the handheld scanner we install. Every scan adds a case to stock.')}</p></div>
          <div class="stack">
            <div class="panel"><h3><svg><use href="#i-plus"/></svg>${x('Recibir a mano', 'Receive manually')}</h3><div class="form-grid"><div class="field full"><label>${x('Producto', 'Product')}</label><select class="input" id="rcv-product"></select></div><div class="field"><label>${x('Cantidad', 'Quantity')}</label><input class="input" id="rcv-qty" type="number" min="1" value="12"></div><div class="field"><label>&nbsp;</label><button class="btn btn-success" type="button" id="rcv-btn" style="width:100%"><svg><use href="#i-check"/></svg>${x('Sumar a existencias', 'Add to stock')}</button></div></div></div>
            <div class="panel"><h3><svg><use href="#i-file"/></svg>${x('Recibido hoy', 'Received today')}</h3><div class="list" id="rcv-log"></div></div>
          </div>
        </div>
      </section>
      <section data-view="orders">
        <div class="shell-top"><div><h1>${x('Órdenes de compra', 'Purchase orders')}</h1><span class="sub">${x('Se crean desde la lista de reorden y se envían por correo al proveedor', 'Created from the reorder list and emailed to the supplier')}</span></div><div class="right"><button class="btn btn-primary btn-sm" type="button" id="po-from-low"><svg><use href="#i-plus"/></svg>${x('Pedir todo lo que está bajo', 'Order everything that is low')}</button></div></div>
        <div class="list" id="po-list"></div>
      </section>
      <section data-view="suppliers">
        <div class="shell-top"><div><h1>${x('Proveedores', 'Suppliers')}</h1><span class="sub">${x('Quién surte qué, y en cuánto tiempo', 'Who supplies what, and how fast')}</span></div></div>
        <div class="grid grid-3" id="sup-grid"></div>
      </section>
      <section data-view="reports">
        <div class="shell-top"><div><h1>${x('Reportes', 'Reports')}</h1><span class="sub">${x('Valor del inventario, movimiento y qué vigilar', 'Inventory value, movement and what to watch')}</span></div></div>
        <div class="kpi-grid" id="rep-kpis"></div>
        <div class="two"><div class="panel"><h3><svg><use href="#i-bar-chart"/></svg>${x('Movimiento · últimos 7 días', 'Movement · last 7 days')}</h3><div id="rep-chart"></div></div><div class="panel"><h3><svg><use href="#i-trending-up"/></svg>${x('Los que más se mueven', 'Fastest movers')}</h3><div class="list" id="rep-top"></div></div></div>
      </section>
    </div>
  </div>
</main>
{{> demo-footer}}`,
  };
};
