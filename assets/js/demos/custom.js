(() => {
  const { $, $$, toast, icon, esc, tour } = window.Demo;

  const TYPES = [
    { id: 'restaurant', name: 'Restaurante / para llevar', icon: 'utensils', mods: ['ordering', 'pos', 'inventory', 'staff', 'reports'] },
    { id: 'cafe', name: 'Cafetería / panadería', icon: 'coffee', mods: ['pos', 'inventory', 'staff', 'loyalty', 'reports'] },
    { id: 'retail', name: 'Tienda', icon: 'store', mods: ['pos', 'inventory', 'loyalty', 'staff', 'reports'] },
    { id: 'salon', name: 'Salón / barbería', icon: 'scissors', mods: ['bookings', 'ai', 'pos', 'loyalty', 'reports'] },
    { id: 'garage', name: 'Taller mecánico', icon: 'car', mods: ['jobs', 'invoicing', 'ai', 'inventory', 'reports'] },
    { id: 'clinic', name: 'Clínica / consultorio', icon: 'heart-pulse', mods: ['bookings', 'ai', 'invoicing', 'reports'] },
    { id: 'gym', name: 'Gimnasio / estudio', icon: 'dumbbell', mods: ['members', 'bookings', 'pos', 'staff', 'reports'] },
    { id: 'other', name: 'Otro', icon: 'sparkles', mods: ['reports'] },
  ];
  const MODULES = [
    { id: 'ordering', name: 'Pedidos en línea', icon: 'globe', desc: 'Sitio web con pedidos para recoger y a domicilio', hw: ['Tableta de pedidos', 'Impresora de tickets'], product: 'website-ordering' },
    { id: 'pos', name: 'Punto de venta', icon: 'pos', desc: 'Caja táctil, tarjeta y efectivo', hw: ['Terminal POS', 'Impresora de recibos', 'Cajón de dinero', 'Terminal de tarjeta'], product: 'pos-system' },
    { id: 'inventory', name: 'Inventario', icon: 'boxes', desc: 'Existencias, alertas, órdenes de compra', hw: ['Lector de códigos'], product: 'inventory-software' },
    { id: 'staff', name: 'Personal y horarios', icon: 'users', desc: 'Horarios, reloj checador, hojas de horas', hw: ['Tableta de entrada'], product: 'employee-management' },
    { id: 'ai', name: 'Recepcionista con IA', icon: 'headset', desc: 'Contesta llamadas, agenda, toma recados', hw: ['Desvío de la línea telefónica'], product: 'ai-receptionist' },
    { id: 'bookings', name: 'Citas y reservaciones', icon: 'calendar', desc: 'Citas en línea, recordatorios, calendario', hw: [], product: 'custom-software' },
    { id: 'loyalty', name: 'Lealtad de clientes', icon: 'gift', desc: 'Puntos, recompensas, lista de clientes', hw: [], product: 'custom-software' },
    { id: 'invoicing', name: 'Cotizaciones y facturas', icon: 'file', desc: 'Cotizaciones, facturas, pagos, recordatorios', hw: [], product: 'custom-software' },
    { id: 'jobs', name: 'Órdenes de trabajo', icon: 'wrench', desc: 'Sigue cada trabajo de la entrada a la entrega', hw: [], product: 'custom-software' },
    { id: 'delivery', name: 'Seguimiento de entregas', icon: 'truck', desc: 'Repartidores, rutas, prueba de entrega', hw: ['Celulares de repartidores'], product: 'custom-software' },
    { id: 'members', name: 'Membresías', icon: 'user', desc: 'Planes, renovaciones, acceso en la puerta', hw: ['Tableta de acceso'], product: 'custom-software' },
    { id: 'reports', name: 'Panel de reportes', icon: 'bar-chart', desc: 'Todo tu negocio en una pantalla', hw: [], product: 'custom-software' },
  ];
  const WIDGETS = {
    ordering: () => `<div class="pw"><small>Pedidos en línea hoy</small><b>38</b><div class="pw-list"><span>#1043 Recoger 12:30 <em class="mk-badge amber">Preparando</em></span><span>#1044 A domicilio <em class="mk-badge blue">Nuevo</em></span></div></div>`,
    pos: () => `<div class="pw"><small>Ventas de hoy</small><b>$2,840</b><div class="bars" style="height:44px">${[40, 60, 50, 80, 70, 95, 85].map((h, i) => `<i style="--h:${h}%;--i:${i}"></i>`).join('')}</div></div>`,
    inventory: () => `<div class="pw"><small>Inventario</small><b>3 bajos</b><div class="pw-list"><span>Leche de avena <em class="mk-badge red">5 / 12</em></span><span>Vasos 8 oz <em class="mk-badge red">4 / 8</em></span></div></div>`,
    staff: () => `<div class="pw"><small>En turno</small><b>6 de 9</b><div class="pw-avatars"><i class="c0">SK</i><i class="c1">ML</i><i class="c2">JP</i><i class="c3">AR</i><i class="c4">+2</i></div></div>`,
    ai: () => `<div class="pw"><small>Llamadas contestadas</small><b>96 %</b><div class="wave" style="height:26px;margin:.3rem 0 0">${Array.from({ length: 7 }, (_, i) => `<i style="--i:${i}"></i>`).join('')}</div></div>`,
    bookings: () => `<div class="pw"><small>Próximas citas</small><b>14:30</b><div class="pw-list"><span>Emma W. · Corte</span><span>15:30 · Tomás R. · Color</span></div></div>`,
    loyalty: () => `<div class="pw"><small>Clientes en el programa</small><b>1,284</b><div class="lvl" style="margin-top:.4rem"><i style="--w:72%"></i></div><small>72 % regresó este mes</small></div>`,
    invoicing: () => `<div class="pw"><small>Facturas por cobrar</small><b>$4,120</b><div class="pw-list"><span>FAC-231 · vence vie <em class="mk-badge amber">Enviada</em></span><span>FAC-228 <em class="mk-badge green">Pagada</em></span></div></div>`,
    jobs: () => `<div class="pw"><small>Trabajos en curso</small><b>7</b><div class="pw-list"><span>#T-88 Frenos <em class="mk-badge blue">Bahía 2</em></span><span>#T-89 Afinación <em class="mk-badge amber">Esperando piezas</em></span></div></div>`,
    delivery: () => `<div class="pw"><small>Entregas en ruta</small><b>4</b><div class="pw-list"><span>Camioneta 1 · 3 paradas</span><span>Camioneta 2 · regresa 16:10</span></div></div>`,
    members: () => `<div class="pw"><small>Accesos de hoy</small><b>142</b><div class="lvl" style="margin-top:.4rem"><i style="--w:58%"></i></div><small>12 renovaciones esta semana</small></div>`,
    reports: () => `<div class="pw"><small>Esta semana vs. la pasada</small><b class="up">+12 %</b><div class="bars" style="height:44px">${[50, 55, 45, 70, 65, 90, 80].map((h, i) => `<i style="--h:${h}%;--i:${i}"></i>`).join('')}</div></div>`,
  };

  let type = TYPES[0];
  const selected = new Set(type.mods);
  let locations = 1, terminals = 1;

  const renderTypes = () => {
    $('#types').innerHTML = TYPES.map((t) => `<button type="button" class="type ${t.id === type.id ? 'on' : ''}" data-t="${t.id}">${icon(t.icon)}<span>${t.name}</span></button>`).join('');
    $$('#types .type').forEach((b) => b.addEventListener('click', () => { type = TYPES.find((t) => t.id === b.dataset.t); selected.clear(); type.mods.forEach((m) => selected.add(m)); renderAll(); toast(`Módulos sugeridos para ${type.name.toLowerCase()}`, 'Activa o desactiva los que quieras.', 'info', 'sparkles'); }));
  };
  const renderModules = () => {
    $('#modules').innerHTML = MODULES.map((m) => `<button type="button" class="mod-card ${selected.has(m.id) ? 'on' : ''}" data-m="${m.id}" aria-pressed="${selected.has(m.id)}"><span class="icon-ring">${icon(m.icon)}</span><span class="mod-text"><b>${m.name}</b><small>${m.desc}</small></span><span class="switch ${selected.has(m.id) ? 'on' : ''}"></span></button>`).join('');
    $$('#modules .mod-card').forEach((b) => b.addEventListener('click', () => { const id = b.dataset.m; if (selected.has(id)) selected.delete(id); else selected.add(id); renderModules(); renderPreview(); renderSummary(); }));
    $('#mod-count').textContent = `${selected.size} seleccionados`;
  };
  const renderPreview = () => {
    const mods = MODULES.filter((m) => selected.has(m.id));
    $('#preview').innerHTML = `<div class="device-bar"><i></i><i></i><i></i><span class="url">${esc(type.name.toLowerCase())}.local · tu sistema</span></div>
      <div class="pv"><aside class="pv-side"><div class="pv-brand"><i></i>Tu negocio</div>${mods.map((m, i) => `<span class="pv-nav ${i === 0 ? 'on' : ''}" style="--i:${i}">${icon(m.icon)}${m.name}</span>`).join('')}<span class="pv-foot">${icon('server')}Servidor local</span></aside>
      <div class="pv-main">${mods.length ? mods.map((m, i) => `<div class="pv-widget" style="--i:${i}"><div class="pv-w-head">${icon(m.icon)}${m.name}</div>${WIDGETS[m.id]()}</div>`).join('') : '<div class="empty" style="grid-column:1/-1">Elige al menos un módulo para ver tu sistema.</div>'}</div></div>`;
  };
  const renderSummary = () => {
    const mods = MODULES.filter((m) => selected.has(m.id));
    const hw = new Set(); mods.forEach((m) => m.hw.forEach((h) => hw.add(h)));
    const hwList = [...hw].map((h) => (h === 'Terminal POS' && terminals > 1 ? `${terminals} × terminales POS` : h));
    if (selected.size) hwList.push(`${locations > 1 ? locations + ' × ' : ''}Servidor local`);
    if ($('#x-display').checked && selected.has('pos')) hwList.push('Pantalla para el cliente');
    const days = Math.max(1, Math.ceil(mods.length / 4)) * locations + (mods.some((m) => m.product === 'custom-software') ? 1 : 0);
    const custom = mods.filter((m) => m.product === 'custom-software');
    const products = [...new Set(mods.map((m) => m.product))];
    const note = `Tipo de negocio: ${type.name}. Módulos: ${mods.map((m) => m.name).join(', ') || 'ninguno todavía'}. Sucursales: ${locations}. Cajas: ${terminals}. Extras: ${['x-remote', 'x-backup', 'x-display', 'x-multi'].filter((id) => $('#' + id).checked).map((id) => $('#' + id).parentElement.textContent.trim()).join(', ') || 'ninguno'}.`;
    const url = `../contact.html?${products.map((p) => `interest=${p}`).join('&')}&business=${encodeURIComponent(type.name)}&note=${encodeURIComponent(note)}`;
    $('#summary').innerHTML = `<div class="panel-head"><h3>${icon('sparkles')}Tu sistema a la medida</h3><span class="tag violet">${mods.length} módulo${mods.length === 1 ? '' : 's'}</span></div>
      <div class="sum-grid">
        <div><small>Diseñado para</small><b>${esc(type.name)}</b></div>
        <div><small>Instalado en</small><b>${locations} sucursal${locations > 1 ? 'es' : ''}</b></div>
        <div><small>Instalación</small><b>aprox. ${days} día${days > 1 ? 's' : ''} en tu local</b></div>
        <div><small>Partes a la medida</small><b>${custom.length ? custom.map((m) => m.name).join(', ') : 'no hacen falta'}</b></div>
      </div>
      <div class="sum-block"><small>Equipo que suministraríamos e instalaríamos</small><div class="row" style="gap:.4rem">${hwList.map((h) => `<span class="hw-chip">${icon('check')}${esc(h)}</span>`).join('') || '<span class="muted small">Elige módulos primero</span>'}</div></div>
      <div class="sum-block"><small>Todo se conecta en un solo servidor local</small><p class="small muted">Funciona sin internet, tus datos se quedan en tu edificio, ${$('#x-remote').checked ? 'con acceso seguro desde fuera' : 'sin acceso desde fuera a menos que lo quieras'}${$('#x-backup').checked ? ', más un respaldo externo cifrado' : ''}.</p></div>
      <a class="btn btn-primary btn-lg" href="${url}" style="width:100%" id="request-btn">${icon('mail')}Pedir cotización de este sistema</a>
      <p class="muted small center" style="margin-top:.6rem">Abre el formulario de contacto con tu selección ya cargada.</p>`;
  };
  $$('#locations button').forEach((b) => b.addEventListener('click', () => { locations = +b.dataset.v; $$('#locations button').forEach((x) => x.classList.toggle('on', x === b)); renderSummary(); }));
  $('#terminals').addEventListener('input', (e) => { terminals = +e.target.value; $('#term-label').textContent = terminals; renderSummary(); });
  ['x-remote', 'x-backup', 'x-display', 'x-multi'].forEach((id) => $('#' + id).addEventListener('change', renderSummary));
  const renderAll = () => { renderTypes(); renderModules(); renderPreview(); renderSummary(); };
  renderAll();

  /* ---------- guía ---------- */
  tour.auto([
    { title: 'Arma el sistema de tu negocio en 3 pasos', text: 'Aquí ves cómo un sistema a la medida se construye alrededor de tu negocio: eliges el giro, activas los módulos que necesitas y ves el resultado en vivo.' },
    { target: '#types-panel', title: 'Paso 1 · Tu tipo de negocio', text: 'Toca tu giro. Te sugerimos los módulos típicos para ese tipo de negocio, pero puedes cambiarlos.', action: 'Elige un tipo de negocio', advanceOn: '.type', delay: 600 },
    { target: '#modules-panel', title: 'Paso 2 · Los módulos', text: 'Activa o desactiva módulos. Cada uno agrega una sección y un widget al sistema de la derecha. Los que dicen "a la medida" los construimos exclusivamente para ti.', action: 'Prueba activar o desactivar un módulo', advanceOn: '.mod-card', delay: 500 },
    { target: '#preview', title: 'Tu sistema, en vivo', text: 'Esta vista previa cambia con cada módulo: así se vería el panel que tu equipo usaría cada día, corriendo en el servidor de tu local.' },
    { target: '#details-panel', title: 'Paso 3 · Detalles', text: 'Sucursales, cuántas cajas y extras como acceso desde casa o respaldo externo. Con eso calculamos el equipo y el tiempo de instalación.' },
    { target: '#summary', title: 'Tu cotización, con un clic', text: 'El resumen muestra el equipo que instalaríamos y cuánto tardaría. Al tocar <b>Pedir cotización</b>, el formulario de contacto se llena solo con tu selección.' },
    { title: 'Eso es todo', text: 'Ningún negocio es igual, y tu sistema tampoco. Sigue jugando con los módulos o repite la guía con "Ver guía paso a paso".' },
  ], { key: 'custom' });
})();
