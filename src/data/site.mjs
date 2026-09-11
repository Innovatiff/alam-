/**
 * Configuración general del sitio / General site configuration.
 * Edita este archivo y ejecuta `npm run build`.  Edit this file and run `npm run build`.
 *
 * !! MARCADORES / PLACEHOLDERS: los datos de contacto son provisionales (dominio ".example",
 * !! teléfono 555).  Reemplázalos por los reales antes de publicar.
 */
const base = {
  name: 'Innovatiff',
  url: 'https://www.innovatiff.example',
  contact: {
    email: 'hola@innovatiff.example',
    phone: '+1 (555) 010-0100',
    phoneHref: 'tel:+15550100100',
  },
  /** Opcional: URL de un servicio de formularios (Formspree, Basin, tu propia API). Vacío = se abre el correo del visitante. */
  formEndpoint: '',
  social: [
    { label: 'Instagram', href: '#', icon: 'instagram' },
    { label: 'LinkedIn', href: '#', icon: 'linkedin' },
    { label: 'Facebook', href: '#', icon: 'facebook' },
  ],
};

/** Textos por idioma / Texts per language */
const text = {
  es: {
    lang: 'es',
    locale: 'es_MX',
    tagline: 'Software para tu negocio. Instalado en tu local.',
    description:
      'Innovatiff diseña e instala sitios web con pedidos en línea, sistemas POS, gestión de empleados, recepcionistas con IA, inventario y software a la medida. Todo instalado en tu negocio.',
    address: 'Leamington, Ontario, Canadá',
    hours: 'Lunes a viernes, 9:00 a 18:00',
    nav: [
      { label: 'Inicio', href: 'index.html' },
      { label: 'Productos', href: 'products.html', children: 'products' },
      { label: 'Cómo funciona', href: 'how-it-works.html' },
      { label: 'Muestras', href: 'samples.html' },
      { label: 'Nosotros', href: 'about.html' },
      { label: 'Contacto', href: 'contact.html' },
    ],
    cta: { label: 'Pedir cotización', href: 'contact.html' },
    /** Testimonios de muestra: REEMPLÁZALOS por comentarios reales antes de publicar. */
    testimonials: [
      { quote: 'Los pedidos llegan directo a la cocina. Dejamos de pagar comisiones a las apps.', name: 'Dueño de restaurante', role: 'Sitio web + pedidos', initials: 'DR' },
      { quote: 'Instalaron el POS en una tarde y se quedaron en la hora pico. Cerrar la caja toma cinco minutos.', name: 'Encargada de cafetería', role: 'Sistema POS', initials: 'EC' },
      { quote: 'La recepcionista con IA agenda mientras atendemos. No perdemos llamadas.', name: 'Dueña de salón', role: 'Recepcionista con IA', initials: 'DS' },
    ],
  },
  en: {
    lang: 'en',
    locale: 'en_CA',
    tagline: 'Software for your business. Installed on site.',
    description:
      'Innovatiff designs and installs websites with online ordering, POS systems, employee management, AI receptionists, inventory and custom software. Everything installed at your business.',
    address: 'Leamington, Ontario, Canada',
    hours: 'Monday to Friday, 9 am to 6 pm',
    nav: [
      { label: 'Home', href: 'index.html' },
      { label: 'Products', href: 'products.html', children: 'products' },
      { label: 'How it works', href: 'how-it-works.html' },
      { label: 'Live samples', href: 'samples.html' },
      { label: 'About', href: 'about.html' },
      { label: 'Contact', href: 'contact.html' },
    ],
    cta: { label: 'Get a quote', href: 'contact.html' },
    /** Sample testimonials: REPLACE them with real customer feedback before publishing. */
    testimonials: [
      { quote: 'Orders print straight in the kitchen. We stopped paying commissions to the apps.', name: 'Restaurant owner', role: 'Website + ordering', initials: 'RO' },
      { quote: 'They installed the POS in an afternoon and stayed for the rush. Closing takes five minutes.', name: 'Café manager', role: 'POS system', initials: 'CM' },
      { quote: 'The AI receptionist books appointments while we work. We never miss a call.', name: 'Salon owner', role: 'AI receptionist', initials: 'SO' },
    ],
  },
};

export const getSite = (lang = 'es') => {
  const t = text[lang] || text.es;
  return { ...base, ...t, contact: { ...base.contact, address: t.address, hours: t.hours } };
};

export const site = getSite('es');
