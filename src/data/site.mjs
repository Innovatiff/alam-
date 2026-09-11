/**
 * Configuración general del sitio.  Edita este archivo y ejecuta `npm run build`.
 *
 * !! MARCADORES: los datos de contacto son provisionales (dominio ".example",
 * !! teléfono 555).  Reemplázalos por los reales antes de publicar.
 */
export const site = {
  name: 'Innovatiff',
  lang: 'es',
  tagline: 'Software hecho para tu negocio. Instalado en tu local.',
  description:
    'Innovatiff diseña e instala sitios web con pedidos en línea, sistemas POS, gestión de empleados, recepcionistas con inteligencia artificial, software de inventario y software a la medida para negocios. Todo se instala en tu local.',
  url: 'https://www.innovatiff.example',

  contact: {
    email: 'hola@innovatiff.example',
    phone: '+1 (555) 010-0100',
    phoneHref: 'tel:+15550100100',
    address: 'Leamington, Ontario, Canadá',
    hours: 'Lunes a viernes, 9:00 a 18:00',
  },

  /** Opcional: URL de un servicio de formularios (Formspree, Basin, tu propia API). Vacío = se abre el correo del visitante. */
  formEndpoint: '',

  social: [
    { label: 'Instagram', href: '#', icon: 'instagram' },
    { label: 'LinkedIn', href: '#', icon: 'linkedin' },
    { label: 'Facebook', href: '#', icon: 'facebook' },
  ],

  nav: [
    { label: 'Inicio', href: 'index.html' },
    { label: 'Productos', href: 'products.html', children: 'products' },
    { label: 'Cómo funciona', href: 'how-it-works.html' },
    { label: 'Muestras en vivo', href: 'samples.html' },
    { label: 'Nosotros', href: 'about.html' },
    { label: 'Contacto', href: 'contact.html' },
  ],
  cta: { label: 'Pedir cotización', href: 'contact.html' },

  /** Testimonios de muestra: REEMPLÁZALOS por comentarios reales de clientes antes de publicar. */
  testimonials: [
    {
      quote:
        'Los pedidos ahora llegan directo a la impresora de la cocina. Dejamos de pagar comisiones a las apps de reparto y nuestros clientes de siempre piden desde nuestro propio sitio.',
      name: 'Dueño de restaurante',
      role: 'Restaurante familiar · Sitio web + pedidos',
      initials: 'DR',
    },
    {
      quote:
        'Instalaron el POS en una tarde. Cargaron cada producto, capacitaron al equipo y se quedaron durante la hora pico. Cerrar la caja ahora toma cinco minutos.',
      name: 'Encargada de cafetería',
      role: 'Cafetería · Sistema POS',
      initials: 'EC',
    },
    {
      quote:
        'La recepcionista con IA agenda citas mientras atendemos clientes. Dejamos de perder llamadas y el resumen me llega al celular en cuanto cuelgan.',
      name: 'Dueña de salón',
      role: 'Salón de belleza · Recepcionista con IA',
      initials: 'DS',
    },
    {
      quote:
        'Todo corre en un pequeño servidor en nuestra oficina. Si se cae el internet, las ventas y las entradas del personal siguen funcionando. Eso fue lo que nos convenció.',
      name: 'Dueño de tienda',
      role: 'Tienda · POS + inventario + personal',
      initials: 'DT',
    },
  ],
};
