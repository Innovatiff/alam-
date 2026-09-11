(() => {
  const { $, $$, toast, icon, esc, tour, x } = window.Demo;

  const TYPES = [
    { id: 'restaurant', name: x('Restaurante / para llevar', 'Restaurant / takeout'), icon: 'utensils', mods: ['ordering', 'pos', 'inventory', 'staff', 'reports'] },
    { id: 'cafe', name: x('Cafetería / panadería', 'Café / bakery'), icon: 'coffee', mods: ['pos', 'inventory', 'staff', 'loyalty', 'reports'] },
    { id: 'retail', name: x('Tienda', 'Retail shop'), icon: 'store', mods: ['pos', 'inventory', 'loyalty', 'staff', 'reports'] },
    { id: 'salon', name: x('Salón / barbería', 'Salon / barbershop'), icon: 'scissors', mods: ['bookings', 'ai', 'pos', 'loyalty', 'reports'] },
    { id: 'garage', name: x('Taller mecánico', 'Auto shop'), icon: 'car', mods: ['jobs', 'invoicing', 'ai', 'inventory', 'reports'] },
    { id: 'clinic', name: x('Clínica / consultorio', 'Clinic / practice'), icon: 'heart-pulse', mods: ['bookings', 'ai', 'invoicing', 'reports'] },
    { id: 'gym', name: x('Gimnasio / estudio', 'Gym / studio'), icon: 'dumbbell', mods: ['members', 'bookings', 'pos', 'staff', 'reports'] },
    { id: 'other', name: x('Otro', 'Other'), icon: 'sparkles', mods: ['reports'] },
  ];
  const HW = { tablet: x('Tableta de pedidos', 'Order tablet'), ticket: x('Impresora de tickets', 'Ticket printer'), pos: x('Terminal POS', 'POS terminal'), receipt: x('Impresora de recibos', 'Receipt printer'), drawer: x('Cajón de dinero', 'Cash drawer'), card: x('Terminal de tarjeta', 'Card reader'), scanner: x('Lector de códigos', 'Barcode scanner'), clock: x('Tableta de entrada', 'Clock-in tablet'), phone: x('Desvío de la línea telefónica', 'Phone line forwarding'), drivers: x('Celulares de repartidores', 'Driver phones'), access: x('Tableta de acceso', 'Access tablet') };
  const MODULES = [
    { id: 'ordering', name: x('Pedidos en línea', 'Online ordering'), icon: 'globe', desc: x('Sitio web con pedidos para recoger y a domicilio', 'Website with pickup and delivery orders'), hw: ['tablet', 'ticket'], product: 'website-ordering' },
    { id: 'pos', name: x('Punto de venta', 'Point of sale'), icon: 'pos', desc: x('Caja táctil, tarjeta y efectivo', 'Touch register, card and cash'), hw: ['pos', 'receipt', 'drawer', 'card'], product: 'pos-system' },
    { id: 'inventory', name: x('Inventario', 'Inventory'), icon: 'boxes', desc: x('Existencias, alertas, órdenes de compra', 'Stock, alerts, purchase orders'), hw: ['scanner'], product: 'inventory-software' },
    { id: 'staff', name: x('Personal y horarios', 'Staff and schedules'), icon: 'users', desc: x('Horarios, reloj checador, hojas de horas', 'Schedules, time clock, timesheets'), hw: ['clock'], product: 'employee-management' },
    { id: 'ai', name: x('Recepcionista con IA', 'AI receptionist'), icon: 'headset', desc: x('Contesta llamadas, agenda, toma recados', 'Answers calls, books, takes messages'), hw: ['phone'], product: 'ai-receptionist' },
    { id: 'bookings', name: x('Citas y reservaciones', 'Appointments and bookings'), icon: 'calendar', desc: x('Citas en línea, recordatorios, calendario', 'Online booking, reminders, calendar'), hw: [], product: 'custom-software' },
    { id: 'loyalty', name: x('Lealtad de clientes', 'Customer loyalty'), icon: 'gift', desc: x('Puntos, recompensas, lista de clientes', 'Points, rewards, customer list'), hw: [], product: 'custom-software' },
    { id: 'invoicing', name: x('Cotizaciones y facturas', 'Quotes and invoices'), icon: 'file', desc: x('Cotizaciones, facturas, pagos, recordatorios', 'Quotes, invoices, payments, reminders'), hw: [], product: 'custom-software' },
    { id: 'jobs', name: x('Órdenes de trabajo', 'Work orders'), icon: 'wrench', desc: x('Sigue cada trabajo de la entrada a la entrega', 'Track every job from intake to handover'), hw: [], product: 'custom-software' },
    { id: 'delivery', name: x('Seguimiento de entregas', 'Delivery tracking'), icon: 'truck', desc: x('Repartidores, rutas, prueba de entrega', 'Drivers, routes, proof of delivery'), hw: ['drivers'], product: 'custom-software' },
    { id: 'members', name: x('Membresías', 'Memberships'), icon: 'user', desc: x('Planes, renovaciones, acceso en la puerta', 'Plans, renewals, door access'), hw: ['access'], product: 'custom-software' },
    { id: 'reports', name: x('Panel de reportes', 'Reporting dashboard'), icon: 'bar-chart', desc: x('Todo tu negocio en una pantalla', 'Your whole business on one screen'), hw: [], product: 'custom-software' },
  ];
  const WIDGETS = {
    ordering: () => `<div class="pw"><small>${x('Pedidos en línea hoy', 'Online orders today')}</small><b>38</b><div class="pw-list"><span>#1043 ${x('Recoger', 'Pickup')} 12:30 <em class="mk-badge amber">${x('Preparando', 'Preparing')}</em></span><span>#1044 ${x('A domicilio', 'Delivery')} <em class="mk-badge blue">${x('Nuevo', 'New')}</em></span></div></div>`,
    pos: () => `<div class="pw"><small>${x('Ventas de hoy', 'Sales today')}</small><b>$2,840</b><div class="bars" style="height:44px">${[40, 60, 50, 80, 70, 95, 85].map((h, i) => `<i style="--h:${h}%;--i:${i}"></i>`).join('')}</div></div>`,
    inventory: () => `<div class="pw"><small>${x('Inventario', 'Inventory')}</small><b>3 ${x('bajos', 'low')}</b><div class="pw-list"><span>${x('Leche de avena', 'Oat milk')} <em class="mk-badge red">5 / 12</em></span><span>${x('Vasos 8 oz', 'Cups 8 oz')} <em class="mk-badge red">4 / 8</em></span></div></div>`,
    staff: () => `<div class="pw"><small>${x('En turno', 'On shift')}</small><b>6 ${x('de', 'of')} 9</b><div class="pw-avatars"><i class="c0">SK</i><i class="c1">ML</i><i class="c2">JP</i><i class="c3">AR</i><i class="c4">+2</i></div></div>`,
    ai: () => `<div class="pw"><small>${x('Llamadas contestadas', 'Calls answered')}</small><b>96 %</b><div class="wave" style="height:26px;margin:.3rem 0 0">${Array.from({ length: 7 }, (_, i) => `<i style="--i:${i}"></i>`).join('')}</div></div>`,
    bookings: () => `<div class="pw"><small>${x('Próximas citas', 'Upcoming appointments')}</small><b>14:30</b><div class="pw-list"><span>Emma W. · ${x('Corte', 'Haircut')}</span><span>15:30 · Tomás R. · ${x('Color', 'Colour')}</span></div></div>`,
    loyalty: () => `<div class="pw"><small>${x('Clientes en el programa', 'Customers in the program')}</small><b>1,284</b><div class="lvl" style="margin-top:.4rem"><i style="--w:72%"></i></div><small>${x('72 % regresó este mes', '72% came back this month')}</small></div>`,
    invoicing: () => `<div class="pw"><small>${x('Facturas por cobrar', 'Invoices outstanding')}</small><b>$4,120</b><div class="pw-list"><span>${x('FAC-231 · vence vie', 'INV-231 · due Fri')} <em class="mk-badge amber">${x('Enviada', 'Sent')}</em></span><span>${x('FAC-228', 'INV-228')} <em class="mk-badge green">${x('Pagada', 'Paid')}</em></span></div></div>`,
    jobs: () => `<div class="pw"><small>${x('Trabajos en curso', 'Jobs in progress')}</small><b>7</b><div class="pw-list"><span>#T-88 ${x('Frenos', 'Brakes')} <em class="mk-badge blue">${x('Bahía 2', 'Bay 2')}</em></span><span>#T-89 ${x('Afinación', 'Tune-up')} <em class="mk-badge amber">${x('Esperando piezas', 'Waiting for parts')}</em></span></div></div>`,
    delivery: () => `<div class="pw"><small>${x('Entregas en ruta', 'Deliveries on the road')}</small><b>4</b><div class="pw-list"><span>${x('Camioneta 1 · 3 paradas', 'Van 1 · 3 stops')}</span><span>${x('Camioneta 2 · regresa 16:10', 'Van 2 · back 16:10')}</span></div></div>`,
    members: () => `<div class="pw"><small>${x('Accesos de hoy', 'Check-ins today')}</small><b>142</b><div class="lvl" style="margin-top:.4rem"><i style="--w:58%"></i></div><small>${x('12 renovaciones esta semana', '12 renewals this week')}</small></div>`,
    reports: () => `<div class="pw"><small>${x('Esta semana vs. la pasada', 'This week vs. last')}</small><b class="up">+12 %</b><div class="bars" style="height:44px">${[50, 55, 45, 70, 65, 90, 80].map((h, i) => `<i style="--h:${h}%;--i:${i}"></i>`).join('')}</div></div>`,
  };

  let type = TYPES[0];
  const selected = new Set(type.mods);
  let locations = 1, terminals = 1;

  const renderTypes = () => {
    $('#types').innerHTML = TYPES.map((t) => `<button type="button" class="type ${t.id === type.id ? 'on' : ''}" data-t="${t.id}">${icon(t.icon)}<span>${t.name}</span></button>`).join('');
    $$('#types .type').forEach((b) => b.addEventListener('click', () => { type = TYPES.find((t) => t.id === b.dataset.t); selected.clear(); type.mods.forEach((m) => selected.add(m)); renderAll(); toast(x(`Módulos sugeridos para ${type.name.toLowerCase()}`, `Suggested modules for ${type.name.toLowerCase()}`), x('Activa o desactiva los que quieras.', 'Turn on or off whatever you like.'), 'info', 'sparkles'); }));
  };
  const renderModules = () => {
    $('#modules').innerHTML = MODULES.map((m) => `<button type="button" class="mod-card ${selected.has(m.id) ? 'on' : ''}" data-m="${m.id}" aria-pressed="${selected.has(m.id)}"><span class="icon-ring">${icon(m.icon)}</span><span class="mod-text"><b>${m.name}</b><small>${m.desc}</small></span><span class="switch ${selected.has(m.id) ? 'on' : ''}"></span></button>`).join('');
    $$('#modules .mod-card').forEach((b) => b.addEventListener('click', () => { const id = b.dataset.m; if (selected.has(id)) selected.delete(id); else selected.add(id); renderModules(); renderPreview(); renderSummary(); }));
    $('#mod-count').textContent = `${selected.size} ${x('seleccionados', 'selected')}`;
  };
  const renderPreview = () => {
    const mods = MODULES.filter((m) => selected.has(m.id));
    $('#preview').innerHTML = `<div class="device-bar"><i></i><i></i><i></i><span class="url">${esc(type.name.toLowerCase())}.local · ${x('tu sistema', 'your system')}</span></div>
      <div class="pv"><aside class="pv-side"><div class="pv-brand"><i></i>${x('Tu negocio', 'Your business')}</div>${mods.map((m, i) => `<span class="pv-nav ${i === 0 ? 'on' : ''}" style="--i:${i}">${icon(m.icon)}${m.name}</span>`).join('')}<span class="pv-foot">${icon('server')}${x('Servidor local', 'Local server')}</span></aside>
      <div class="pv-main">${mods.length ? mods.map((m, i) => `<div class="pv-widget" style="--i:${i}"><div class="pv-w-head">${icon(m.icon)}${m.name}</div>${WIDGETS[m.id]()}</div>`).join('') : `<div class="empty" style="grid-column:1/-1">${x('Elige al menos un módulo para ver tu sistema.', 'Pick at least one module to see your system.')}</div>`}</div></div>`;
  };
  const renderSummary = () => {
    const mods = MODULES.filter((m) => selected.has(m.id));
    const hw = new Set(); mods.forEach((m) => m.hw.forEach((h) => hw.add(h)));
    const hwList = [...hw].map((h) => (h === 'pos' && terminals > 1 ? `${terminals} × ${x('terminales POS', 'POS terminals')}` : HW[h]));
    if (selected.size) hwList.push(`${locations > 1 ? locations + ' × ' : ''}${x('Servidor local', 'Local server')}`);
    if ($('#x-display').checked && selected.has('pos')) hwList.push(x('Pantalla para el cliente', 'Customer display'));
    const days = Math.max(1, Math.ceil(mods.length / 4)) * locations + (mods.some((m) => m.product === 'custom-software') ? 1 : 0);
    const custom = mods.filter((m) => m.product === 'custom-software');
    const products = [...new Set(mods.map((m) => m.product))];
    const extras = ['x-remote', 'x-backup', 'x-display', 'x-multi'].filter((id) => $('#' + id).checked).map((id) => $('#' + id).parentElement.textContent.trim()).join(', ');
    const note = x(`Tipo de negocio: ${type.name}. Módulos: ${mods.map((m) => m.name).join(', ') || 'ninguno todavía'}. Sucursales: ${locations}. Cajas: ${terminals}. Extras: ${extras || 'ninguno'}.`, `Business type: ${type.name}. Modules: ${mods.map((m) => m.name).join(', ') || 'none yet'}. Locations: ${locations}. Registers: ${terminals}. Extras: ${extras || 'none'}.`);
    const url = `../contact.html?${products.map((p) => `interest=${p}`).join('&')}&business=${encodeURIComponent(type.name)}&note=${encodeURIComponent(note)}`;
    $('#summary').innerHTML = `<div class="panel-head"><h3>${icon('sparkles')}${x('Tu sistema a la medida', 'Your custom system')}</h3><span class="tag violet">${mods.length} ${x(mods.length === 1 ? 'módulo' : 'módulos', mods.length === 1 ? 'module' : 'modules')}</span></div>
      <div class="sum-grid">
        <div><small>${x('Diseñado para', 'Designed for')}</small><b>${esc(type.name)}</b></div>
        <div><small>${x('Instalado en', 'Installed at')}</small><b>${locations} ${x(locations > 1 ? 'sucursales' : 'sucursal', locations > 1 ? 'locations' : 'location')}</b></div>
        <div><small>${x('Instalación', 'Installation')}</small><b>${x(`aprox. ${days} día${days > 1 ? 's' : ''} en tu local`, `about ${days} day${days > 1 ? 's' : ''} on site`)}</b></div>
        <div><small>${x('Partes a la medida', 'Custom parts')}</small><b>${custom.length ? custom.map((m) => m.name).join(', ') : x('no hacen falta', 'not needed')}</b></div>
      </div>
      <div class="sum-block"><small>${x('Equipo que suministraríamos e instalaríamos', 'Hardware we would supply and install')}</small><div class="row" style="gap:.4rem">${hwList.map((h) => `<span class="hw-chip">${icon('check')}${esc(h)}</span>`).join('') || `<span class="muted small">${x('Elige módulos primero', 'Pick modules first')}</span>`}</div></div>
      <div class="sum-block"><small>${x('Todo se conecta en un solo servidor local', 'Everything connects on one local server')}</small><p class="small muted">${x('Funciona sin internet, tus datos se quedan en tu edificio', 'Works offline, your data stays in your building')}${$('#x-remote').checked ? x(', con acceso seguro desde fuera', ', with secure access from outside') : x(', sin acceso desde fuera a menos que lo quieras', ', with no outside access unless you want it')}${$('#x-backup').checked ? x(', más un respaldo externo cifrado', ', plus an encrypted off-site backup') : ''}.</p></div>
      <a class="btn btn-primary btn-lg" href="${url}" style="width:100%" id="request-btn">${icon('mail')}${x('Pedir cotización de este sistema', 'Request a quote for this system')}</a>
      <p class="muted small center" style="margin-top:.6rem">${x('Abre el formulario de contacto con tu selección ya cargada.', 'Opens the contact form with your selection already filled in.')}</p>`;
  };
  $$('#locations button').forEach((b) => b.addEventListener('click', () => { locations = +b.dataset.v; $$('#locations button').forEach((y) => y.classList.toggle('on', y === b)); renderSummary(); }));
  $('#terminals').addEventListener('input', (e) => { terminals = +e.target.value; $('#term-label').textContent = terminals; renderSummary(); });
  ['x-remote', 'x-backup', 'x-display', 'x-multi'].forEach((id) => $('#' + id).addEventListener('change', renderSummary));
  const renderAll = () => { renderTypes(); renderModules(); renderPreview(); renderSummary(); };
  renderAll();

  /* ---------- guide ---------- */
  tour.auto([
    { title: x('Arma el sistema de tu negocio en 3 pasos', 'Build your business system in 3 steps'), text: x('Aquí ves cómo un sistema a la medida se construye alrededor de tu negocio: eliges el giro, activas los módulos que necesitas y ves el resultado en vivo.', 'Here you see how a custom system is built around your business: pick your type, turn on the modules you need and see the result live.') },
    { target: '#types-panel', title: x('Paso 1 · Tu tipo de negocio', 'Step 1 · Your business type'), text: x('Toca tu giro. Te sugerimos los módulos típicos para ese tipo de negocio, pero puedes cambiarlos.', 'Tap your type. We suggest the usual modules for that kind of business, but you can change them.'), action: x('Elige un tipo de negocio', 'Pick a business type'), advanceOn: '.type', delay: 600 },
    { target: '#modules-panel', title: x('Paso 2 · Los módulos', 'Step 2 · The modules'), text: x('Activa o desactiva módulos. Cada uno agrega una sección y un widget al sistema de la derecha. Los que dicen "a la medida" los construimos exclusivamente para ti.', 'Turn modules on or off. Each one adds a section and a widget to the system on the right. The "custom" ones we build exclusively for you.'), action: x('Prueba activar o desactivar un módulo', 'Try turning a module on or off'), advanceOn: '.mod-card', delay: 500 },
    { target: '#preview', title: x('Tu sistema, en vivo', 'Your system, live'), text: x('Esta vista previa cambia con cada módulo: así se vería el panel que tu equipo usaría cada día, corriendo en el servidor de tu local.', 'This preview changes with every module: this is what the dashboard your team would use every day looks like, running on your local server.') },
    { target: '#details-panel', title: x('Paso 3 · Detalles', 'Step 3 · Details'), text: x('Sucursales, cuántas cajas y extras como acceso desde casa o respaldo externo. Con eso calculamos el equipo y el tiempo de instalación.', 'Locations, how many registers and extras like home access or off-site backup. That is how we work out the hardware and the install time.') },
    { target: '#summary', title: x('Tu cotización, con un clic', 'Your quote, in one click'), text: x('El resumen muestra el equipo que instalaríamos y cuánto tardaría. Al tocar <b>Pedir cotización</b>, el formulario de contacto se llena solo con tu selección.', 'The summary shows the hardware we would install and how long it would take. Tap <b>Request a quote</b> and the contact form fills itself in with your selection.') },
    { title: x('Eso es todo', 'That is it'), text: x('Ningún negocio es igual, y tu sistema tampoco. Sigue jugando con los módulos o repite la guía con "Guía paso a paso".', 'No two businesses are the same, and neither is your system. Keep playing with the modules or replay the guide with "Step-by-step guide".') },
  ], { key: 'custom' });
})();
