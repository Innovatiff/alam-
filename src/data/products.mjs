/**
 * Catálogo de productos / Product catalogue.
 * Cada entrada genera su página (products/<slug>.html y en/products/<slug>.html), el menú,
 * la página de productos y las tarjetas del inicio.  Cada texto se escribe en los dos idiomas
 * con x('español', 'english').
 */
export const getProducts = (lang = 'es') => {
  const x = (es, en) => (lang === 'en' ? en : es);
  return [
    {
      slug: 'website-ordering',
      name: x('Sitio web + pedidos en línea', 'Website + online ordering'),
      short: x('Tu sitio, tus pedidos, sin comisiones', 'Your site, your orders, no commissions'),
      icon: 'globe',
      color: 'blue',
      headline: x('Tu propio sitio web con <span class="grad">pedidos en línea</span>', 'Your own website with <span class="grad">online ordering</span>'),
      lead: x('Tus clientes piden desde el celular. El pedido llega a tu cocina al instante. Tú te quedas con el 100 %.', 'Customers order from their phone. The order reaches your kitchen instantly. You keep 100%.'),
      metaDescription: x('Sitio web a la medida con pedidos en línea para recoger o a domicilio. Sin comisiones, instalado en tu local.', 'Custom website with online ordering for pickup or delivery. No commissions, installed on site.'),
      kpis: [
        { icon: 'percent', text: x('0 % de comisión', '0% commission') },
        { icon: 'smartphone', text: x('Sin descargar apps', 'No app to download') },
        { icon: 'printer', text: x('Se imprime en tu cocina', 'Prints in your kitchen') },
      ],
      features: [
        { icon: 'globe', title: x('Un sitio con tu identidad', 'A site with your brand'), desc: x('Tu logo, tus fotos, tu dominio.', 'Your logo, your photos, your domain.') },
        { icon: 'bag', title: x('Recoger o a domicilio', 'Pickup or delivery'), desc: x('Opciones, extras, hora y pago en línea.', 'Options, extras, time slot and online payment.') },
        { icon: 'pen', title: x('Menú que editas tú', 'A menu you edit yourself'), desc: x('Precios y agotados desde tu celular.', 'Prices and sold-outs from your phone.') },
        { icon: 'message', title: x('Avisos automáticos', 'Automatic notifications'), desc: x('SMS de confirmación y de "listo".', 'Confirmation and "ready" texts.') },
      ],
      how: [
        { tag: x('Cliente', 'Customer'), title: x('Pide desde tu sitio', 'Orders from your site'), desc: x('Sin apps ni comisiones.', 'No apps, no commissions.'), art: 'phone-order' },
        { tag: x('Tu cocina', 'Your kitchen'), title: x('El ticket se imprime solo', 'The ticket prints itself'), desc: x('Y aparece en la pantalla de cocina.', 'And shows up on the kitchen screen.'), art: 'ticket' },
        { tag: x('Cliente', 'Customer'), title: x('Recibe el aviso de listo', 'Gets the ready alert'), desc: x('Por SMS, en el momento.', 'By text, the moment it is ready.'), art: 'status' },
      ],
      onsite: {
        title: x('Instalado en tu mostrador', 'Installed at your counter'),
        items: [x('Tableta de pedidos e impresora de tickets', 'Order tablet and ticket printer'), x('Menú y fotos cargados por nosotros', 'Menu and photos loaded by us'), x('Equipo capacitado en 20 minutos', 'Staff trained in 20 minutes')],
        hardware: [
          { icon: 'tablet', name: x('Tableta de pedidos', 'Order tablet') },
          { icon: 'printer', name: x('Impresora de tickets', 'Ticket printer') },
          { icon: 'monitor', name: x('Pantalla de cocina', 'Kitchen screen') },
        ],
      },
      demo: {
        href: 'demos/ordering.html',
        title: x('Prueba el restaurante de muestra', 'Try the sample restaurant'),
        desc: x('Haz un pedido real y mira, paso a paso, lo que pasa en el restaurante.', 'Place a real order and watch, step by step, what happens in the restaurant.'),
        bullets: [x('Menú con fotos y carrito', 'Menu with photos and cart'), x('Pago para recoger o a domicilio', 'Pickup or delivery checkout'), x('Recorrido animado de la cocina', 'Animated kitchen walkthrough')],
      },
    },

    {
      slug: 'employee-management',
      name: x('Gestión de empleados', 'Employee management'),
      short: x('Horarios, reloj checador y horas', 'Schedules, time clock and hours'),
      icon: 'users',
      color: 'indigo',
      headline: x('Horarios, reloj checador y <span class="grad">nómina</span> sin hojas de cálculo', 'Schedules, time clock and <span class="grad">payroll</span> without spreadsheets'),
      lead: x('Arma la semana en minutos, tu personal marca entrada en una tableta y las horas salen listas para la nómina.', 'Build the week in minutes, staff clock in on a tablet, and hours come out payroll-ready.'),
      metaDescription: x('Horarios por turnos, reloj checador en tu local, permisos y hojas de horas listas para nómina. Instalado en tu negocio.', 'Shift schedules, on-site time clock, time off and payroll-ready timesheets. Installed at your business.'),
      kpis: [
        { icon: 'calendar', text: x('Horario en minutos', 'Schedule in minutes') },
        { icon: 'clock', text: x('Entrada con PIN', 'PIN clock-in') },
        { icon: 'file', text: x('Exporta a nómina', 'Payroll export') },
      ],
      features: [
        { icon: 'calendar', title: x('Horario semanal', 'Weekly schedule'), desc: x('Arrastra, copia la semana, publica.', 'Drag, copy last week, publish.') },
        { icon: 'clock', title: x('Reloj checador', 'Time clock'), desc: x('Tableta en la entrada, con PIN.', 'Tablet at the door, with a PIN.') },
        { icon: 'smile', title: x('Permisos con un toque', 'One-tap time off'), desc: x('Se piden desde el celular.', 'Requested from the phone.') },
        { icon: 'file', title: x('Hojas de horas', 'Timesheets'), desc: x('Extras y descansos calculados solos.', 'Overtime and breaks calculated for you.') },
      ],
      how: [
        { tag: x('Encargado', 'Manager'), title: x('Arma la semana', 'Build the week'), desc: x('El personal la ve en su celular.', 'Staff see it on their phone.'), art: 'schedule' },
        { tag: x('Personal', 'Staff'), title: x('Marca entrada en tu local', 'Clock in on site'), desc: x('Las llegadas tarde quedan señaladas.', 'Late arrivals get flagged.'), art: 'clock' },
        { tag: x('Nómina', 'Payroll'), title: x('Exporta las horas', 'Export the hours'), desc: x('Un archivo que tu contador abre directo.', 'A file your accountant opens directly.'), art: 'export' },
      ],
      onsite: {
        title: x('Corre en un servidor en tu oficina', 'Runs on a server in your office'),
        items: [x('Servidor y tableta de entrada instalados', 'Server and clock-in tablet installed'), x('Empleados y reglas cargados contigo', 'Staff and rules set up with you'), x('Sin cuotas por empleado', 'No per-employee fees')],
        hardware: [
          { icon: 'server', name: x('Mini servidor', 'Mini server') },
          { icon: 'tablet', name: x('Tableta de entrada', 'Clock-in tablet') },
          { icon: 'smartphone', name: x('Celulares del personal', 'Staff phones') },
        ],
      },
      demo: {
        href: 'demos/employees.html',
        title: x('Abre el panel de personal', 'Open the staff dashboard'),
        desc: x('Asigna turnos, marca una entrada, aprueba un permiso y exporta las horas.', 'Assign shifts, clock someone in, approve time off and export hours.'),
        bullets: [x('Horario semanal interactivo', 'Interactive weekly schedule'), x('Reloj checador que funciona', 'Working time clock'), x('Hojas de horas listas para nómina', 'Payroll-ready timesheets')],
      },
    },

    {
      slug: 'pos-system',
      name: x('Sistema POS', 'POS system'),
      short: x('Caja rápida, instalada por nosotros', 'A fast register, installed by us'),
      icon: 'pos',
      color: 'violet',
      headline: x('Un punto de venta rápido, <span class="grad">instalado por nosotros</span>', 'A fast point of sale, <span class="grad">installed by us</span>'),
      lead: x('Terminal, impresora, cajón, lector y terminal de tarjeta. Los llevamos, los instalamos y capacitamos a tu equipo.', 'Terminal, printer, cash drawer, scanner and card reader. We bring them, install them and train your team.'),
      metaDescription: x('Sistema POS táctil suministrado, instalado y configurado en tu local, con capacitación del personal.', 'Touch-screen POS supplied, installed and configured on site, with staff training.'),
      kpis: [
        { icon: 'zap', text: x('Venta en segundos', 'A sale in seconds') },
        { icon: 'wifi-off', text: x('Funciona sin internet', 'Works offline') },
        { icon: 'wrench', text: x('Equipo incluido', 'Hardware included') },
      ],
      features: [
        { icon: 'pos', title: x('Pantalla táctil', 'Touch screen'), desc: x('Botones grandes, se aprende en 10 minutos.', 'Big buttons, learned in 10 minutes.') },
        { icon: 'credit-card', title: x('Todos los pagos', 'Every payment'), desc: x('Tarjeta, efectivo, dividido, propinas.', 'Card, cash, split, tips.') },
        { icon: 'bar-chart', title: x('Cierre con un toque', 'One-tap close'), desc: x('Ventas por pago, producto y empleado.', 'Sales by payment, product and staff.') },
        { icon: 'wifi-off', title: x('Sin internet, sigue', 'Keeps going offline'), desc: x('Corre en tu local y sincroniza después.', 'Runs on site and syncs later.') },
      ],
      how: [
        { tag: x('Instalación', 'Install day'), title: x('Montamos el equipo', 'We set up the hardware'), desc: x('Cableado, probado, listo.', 'Wired, tested, ready.'), art: 'install' },
        { tag: x('Cada día', 'Every day'), title: x('Cobra las ventas', 'Ring up sales'), desc: x('Toca, escanea, cobra, recibo.', 'Tap, scan, charge, receipt.'), art: 'sale' },
        { tag: x('Cierre', 'Close'), title: x('Cierra el día', 'Close the day'), desc: x('Totales listos y stock actualizado.', 'Totals ready and stock updated.'), art: 'eod' },
      ],
      onsite: {
        title: x('El día de instalación lo hacemos nosotros', 'We handle install day'),
        items: [x('Terminal, impresora, cajón, lector y tarjeta', 'Terminal, printer, drawer, scanner and card reader'), x('Productos e impuestos cargados', 'Products and taxes loaded'), x('Nos quedamos en tu primera hora pico', 'We stay for your first rush')],
        hardware: [
          { icon: 'pos', name: x('Terminal táctil', 'Touch terminal') },
          { icon: 'printer', name: x('Impresora de recibos', 'Receipt printer') },
          { icon: 'drawer', name: x('Cajón de dinero', 'Cash drawer') },
          { icon: 'scan', name: x('Lector de códigos', 'Barcode scanner') },
          { icon: 'credit-card', name: x('Terminal de tarjeta', 'Card reader') },
        ],
      },
      demo: {
        href: 'demos/pos.html',
        title: x('Usa la caja de muestra', 'Use the sample register'),
        desc: x('Cobra, aplica un descuento, recibe el pago e imprime el recibo.', 'Ring up items, apply a discount, take payment and print the receipt.'),
        bullets: [x('Productos con categorías y búsqueda', 'Products with categories and search'), x('Efectivo, tarjeta y pagos divididos', 'Cash, card and split payments'), x('Recibo y cierre del día', 'Receipt and end-of-day report')],
      },
    },

    {
      slug: 'ai-receptionist',
      name: x('Recepcionista con IA', 'AI receptionist'),
      short: x('Contesta cada llamada, 24/7', 'Answers every call, 24/7'),
      icon: 'headset',
      color: 'cyan',
      headline: x('Ni una llamada perdida con una <span class="grad">recepcionista con IA</span>', 'Never miss a call with an <span class="grad">AI receptionist</span>'),
      lead: x('Contesta con voz natural, responde preguntas, agenda citas y te envía un resumen. Con tu número actual.', 'Answers in a natural voice, handles questions, books appointments and texts you a summary. On your current number.'),
      metaDescription: x('Recepcionista con inteligencia artificial que contesta tu teléfono 24/7, agenda citas y te envía resúmenes. Con tu número actual.', 'An AI receptionist that answers your phone 24/7, books appointments and sends you summaries. On your current number.'),
      kpis: [
        { icon: 'clock', text: x('Contesta en 2 segundos', 'Answers in 2 seconds') },
        { icon: 'calendar', text: x('Agenda en tu calendario', 'Books into your calendar') },
        { icon: 'languages', text: x('Español e inglés', 'Spanish and English') },
      ],
      features: [
        { icon: 'phone', title: x('Todas las llamadas', 'Every call answered'), desc: x('Ocupado, cerrado o con un cliente.', 'Busy, closed or with a customer.') },
        { icon: 'calendar', title: x('Agenda citas', 'Books appointments'), desc: x('Revisa tu disponibilidad real.', 'Checks your real availability.') },
        { icon: 'message', title: x('Recados y resúmenes', 'Messages and summaries'), desc: x('Por SMS justo después de colgar.', 'By text right after the call.') },
        { icon: 'users', title: x('Transfiere a una persona', 'Transfers to a person'), desc: x('Lo urgente llega a tu celular.', 'Urgent calls reach your phone.') },
      ],
      how: [
        { tag: x('Cliente', 'Caller'), title: x('Entra una llamada', 'A call comes in'), desc: x('Tu número se desvía a la IA.', 'Your number forwards to the AI.'), art: 'call' },
        { tag: x('IA', 'AI'), title: x('Contesta y agenda', 'Answers and books'), desc: x('La cita cae en tu calendario.', 'The appointment lands in your calendar.'), art: 'calendar' },
        { tag: x('Tú', 'You'), title: x('Recibes el resumen', 'You get the summary'), desc: x('Con la transcripción en tu panel.', 'With the transcript in your dashboard.'), art: 'summary' },
      ],
      onsite: {
        title: x('Con tu número, con el panel en tu negocio', 'Your number, your dashboard on site'),
        items: [x('Funciona con tu número actual', 'Works with your current number'), x('Servicios y reglas de agenda configurados', 'Services and booking rules set up'), x('Transcripciones en tu panel local', 'Transcripts in your local dashboard')],
        hardware: [
          { icon: 'phone', name: x('Tu línea telefónica', 'Your phone line') },
          { icon: 'monitor', name: x('Panel de llamadas', 'Call dashboard') },
          { icon: 'smartphone', name: x('Resúmenes en tu celular', 'Summaries on your phone') },
        ],
      },
      demo: {
        href: 'demos/receptionist.html',
        title: x('Escucha una llamada de muestra', 'Watch a sample call'),
        desc: x('Simula una llamada, mira la transcripción y cómo la cita cae en el calendario.', 'Simulate a call, read the live transcript and watch the booking land in the calendar.'),
        bullets: [x('Llamadas simuladas en vivo', 'Simulated live calls'), x('Citas en el calendario', 'Bookings in the calendar'), x('Pregúntale lo que quieras', 'Ask it anything')],
      },
    },

    {
      slug: 'inventory-software',
      name: x('Software de inventario', 'Inventory software'),
      short: x('Sabe qué hay y qué pedir', 'Know what you have and what to order'),
      icon: 'boxes',
      color: 'sky',
      headline: x('Sabe qué tienes y <span class="grad">qué pedir</span>, sin contar a mano', 'Know what you have and <span class="grad">what to order</span>, without counting by hand'),
      lead: x('Cada venta descuenta existencias. Recibes la alerta antes de que se acabe y pides con un clic.', 'Every sale updates stock. You get the alert before it runs out and reorder in one click.'),
      metaDescription: x('Existencias en tiempo real, alertas de stock bajo, lectura de códigos y órdenes de compra con un clic. Corre junto a tu POS.', 'Real-time stock, low-stock alerts, barcode scanning and one-click purchase orders. Runs next to your POS.'),
      kpis: [
        { icon: 'bell', text: x('Alertas de stock bajo', 'Low-stock alerts') },
        { icon: 'scan', text: x('Recibe escaneando', 'Receive by scanning') },
        { icon: 'link', text: x('Conectado al POS', 'Connected to the POS') },
      ],
      features: [
        { icon: 'boxes', title: x('Existencias en vivo', 'Live stock'), desc: x('Cada venta descuenta sola.', 'Every sale deducts itself.') },
        { icon: 'bell', title: x('Alertas de reorden', 'Reorder alerts'), desc: x('Un mínimo por producto.', 'A minimum per product.') },
        { icon: 'scan', title: x('Recibe escaneando', 'Receive by scanning'), desc: x('Las entregas suben en segundos.', 'Deliveries added in seconds.') },
        { icon: 'file', title: x('Órdenes de compra', 'Purchase orders'), desc: x('Un clic, al correo del proveedor.', 'One click, emailed to the supplier.') },
      ],
      how: [
        { tag: x('Cada día', 'Every day'), title: x('Las existencias se mueven solas', 'Stock moves on its own'), desc: x('Ventas restan, entregas suman.', 'Sales subtract, deliveries add.'), art: 'stock' },
        { tag: x('Alerta', 'Alert'), title: x('Te avisa qué pedir', 'It tells you what to order'), desc: x('Orden de compra con un clic.', 'Purchase order in one click.'), art: 'alert' },
        { tag: x('Recepción', 'Receiving'), title: x('Escanea la entrega', 'Scan the delivery'), desc: x('Diferencias señaladas al momento.', 'Differences flagged instantly.'), art: 'scan' },
      ],
      onsite: {
        title: x('Corre junto a tu POS, en tu equipo', 'Runs next to your POS, on your hardware'),
        items: [x('Mismo servidor que el POS, funciona sin internet', 'Same server as the POS, works offline'), x('Lectores e impresora de etiquetas', 'Scanners and label printer'), x('Productos y mínimos importados', 'Products and minimums imported')],
        hardware: [
          { icon: 'server', name: x('Servidor local', 'Local server') },
          { icon: 'scan', name: x('Lector de códigos', 'Barcode scanner') },
          { icon: 'printer', name: x('Impresora de etiquetas', 'Label printer') },
        ],
      },
      demo: {
        href: 'demos/inventory.html',
        title: x('Explora la bodega de muestra', 'Explore the sample stockroom'),
        desc: x('Simula una hora pico, mira aparecer las alertas y crea la orden de compra.', 'Simulate a rush, watch the alerts appear and create the purchase order.'),
        bullets: [x('Existencias en vivo con alertas', 'Live stock with alerts'), x('Lector de códigos simulado', 'Simulated barcode scanner'), x('Órdenes de compra con un clic', 'One-click purchase orders')],
      },
    },

    {
      slug: 'custom-software',
      name: x('Software a la medida', 'Custom software'),
      short: x('Exclusivo, alrededor de tu proceso', 'Built exclusively around your process'),
      icon: 'sparkles',
      color: 'fuchsia',
      headline: x('Software construido <span class="grad">solo para ti</span>', 'Software built <span class="grad">just for you</span>'),
      lead: x('Cuando nada genérico encaja, lo diseñamos alrededor de tu proceso y lo instalamos en tu local.', 'When nothing off the shelf fits, we design it around your process and install it on site.'),
      metaDescription: x('Software exclusivo diseñado alrededor del proceso de tu negocio, instalado en tu local y de tu propiedad.', 'Exclusive software designed around your business process, installed on site and owned by you.'),
      kpis: [
        { icon: 'sliders', text: x('Alrededor de tu proceso', 'Around your process') },
        { icon: 'lock', text: x('Tuyo, sin cuotas por usuario', 'Yours, no per-user fees') },
        { icon: 'server', text: x('Instalado en tu local', 'Installed on site') },
      ],
      features: [
        { icon: 'compass', title: x('Empieza por tu proceso', 'Starts with your process'), desc: x('Vemos cómo trabajas de verdad.', 'We look at how you really work.') },
        { icon: 'eye', title: x('Prototipo primero', 'Prototype first'), desc: x('Lo pruebas antes de construirlo.', 'You try it before we build it.') },
        { icon: 'link', title: x('Se conecta con lo tuyo', 'Connects to your tools'), desc: x('Contabilidad, pagos, proveedores.', 'Accounting, payments, suppliers.') },
        { icon: 'lock', title: x('Tuyo para siempre', 'Yours forever'), desc: x('Código, datos y equipo.', 'Code, data and hardware.') },
      ],
      examples: [
        x('Citas y reservaciones', 'Appointments and bookings'), x('Portales de clientes', 'Customer portals'), x('Cotizaciones y facturas', 'Quotes and invoices'), x('Órdenes de trabajo', 'Work orders'),
        x('Seguimiento de entregas', 'Delivery tracking'), x('Membresías', 'Memberships'), x('Paneles de reportes', 'Reporting dashboards'), x('Integraciones', 'Integrations'),
      ],
      how: [
        { tag: x('Semana 1', 'Week 1'), title: x('Taller', 'Workshop'), desc: x('Media jornada con tu equipo.', 'Half a day with your team.'), art: 'workshop' },
        { tag: x('Semanas 2 a 3', 'Weeks 2 to 3'), title: x('Prototipo navegable', 'Clickable prototype'), desc: x('Lo ajustamos hasta que encaje.', 'We adjust it until it fits.'), art: 'prototype' },
        { tag: x('Después', 'Then'), title: x('Construir e instalar', 'Build and install'), desc: x('Por etapas, con avances semanales.', 'In stages, with weekly progress.'), art: 'build' },
      ],
      onsite: {
        title: x('Tu software, en tus instalaciones', 'Your software, on your premises'),
        items: [x('Servidor local a tu medida', 'Local server sized for you'), x('Respaldos automáticos', 'Automatic backups'), x('Acceso seguro desde fuera', 'Secure access from outside')],
        hardware: [
          { icon: 'server', name: x('Servidor local', 'Local server') },
          { icon: 'monitor', name: x('Cualquier computadora', 'Any computer') },
          { icon: 'smartphone', name: x('Celulares y tabletas', 'Phones and tablets') },
        ],
      },
      demo: {
        href: 'demos/custom.html',
        title: x('Arma tu propio sistema', 'Build your own system'),
        desc: x('Elige tu giro y tus módulos y mira cómo se arma tu panel.', 'Pick your business type and modules and watch your dashboard take shape.'),
        bullets: [x('Módulos para tu negocio', 'Modules for your business'), x('Vista previa en vivo', 'Live preview'), x('Envíalo como solicitud de cotización', 'Send it as a quote request')],
      },
    },
  ];
};

export const getIndustries = (lang = 'es') => {
  const x = (es, en) => (lang === 'en' ? en : es);
  return [
    { icon: 'utensils', name: x('Restaurantes', 'Restaurants') },
    { icon: 'coffee', name: x('Cafeterías y panaderías', 'Cafés and bakeries') },
    { icon: 'store', name: x('Tiendas', 'Retail shops') },
    { icon: 'scissors', name: x('Salones y barberías', 'Salons and barbershops') },
    { icon: 'heart-pulse', name: x('Clínicas y consultorios', 'Clinics and practices') },
    { icon: 'car', name: x('Talleres mecánicos', 'Auto shops') },
    { icon: 'dumbbell', name: x('Gimnasios y estudios', 'Gyms and studios') },
    { icon: 'bed', name: x('Hoteles y hospedajes', 'Hotels and lodging') },
    { icon: 'pizza', name: x('Comida para llevar', 'Takeout') },
    { icon: 'package', name: x('Mayoristas', 'Wholesalers') },
    { icon: 'home', name: x('Servicios a domicilio', 'Home services') },
    { icon: 'graduation', name: x('Escuelas y capacitación', 'Schools and training') },
  ];
};

export const getHardware = (lang = 'es') => {
  const x = (es, en) => (lang === 'en' ? en : es);
  return [
    { icon: 'pos', name: x('Terminal POS táctil', 'Touch POS terminal'), desc: x('Rápida y hecha para mostradores con movimiento.', 'Fast and built for busy counters.') },
    { icon: 'printer', name: x('Impresoras de recibos y cocina', 'Receipt and kitchen printers'), desc: x('Térmicas, para recibos y comandas.', 'Thermal, for receipts and kitchen tickets.') },
    { icon: 'drawer', name: x('Cajón de dinero', 'Cash drawer'), desc: x('Se abre solo en ventas en efectivo.', 'Opens by itself on cash sales.') },
    { icon: 'scan', name: x('Lector de códigos', 'Barcode scanner'), desc: x('Para la caja, entregas y conteos.', 'For the register, deliveries and counts.') },
    { icon: 'credit-card', name: x('Terminal de tarjeta', 'Card reader'), desc: x('Conectada al POS, sin teclear montos.', 'Connected to the POS, no retyping amounts.') },
    { icon: 'tablet', name: x('Tabletas', 'Tablets'), desc: x('Pedidos, entradas y pantallas de cocina.', 'Orders, clock-ins and kitchen screens.') },
    { icon: 'monitor', name: x('Pantallas', 'Displays'), desc: x('Para clientes y para la cocina.', 'For customers and for the kitchen.') },
    { icon: 'server', name: x('Servidor local', 'Local server'), desc: x('Silencioso, compacto, en tu oficina.', 'Quiet, compact, in your office.') },
  ];
};

export const products = getProducts('es');
export const industries = getIndustries('es');
export const hardware = getHardware('es');
