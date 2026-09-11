/**
 * Site-wide configuration.  Edit this file, then run `npm run build`.
 *
 * !! PLACEHOLDERS: the contact details below are placeholders (".example" domain,
 * !! 555 phone number).  Replace them with the real ones before publishing.
 */
export const site = {
  name: 'Innovatiff',
  tagline: 'Software built for your business. Installed on site.',
  description:
    'Innovatiff designs and builds websites with online ordering, POS systems, employee management, AI receptionists, inventory software and exclusive custom software for businesses. Everything is installed on site, in your business.',
  url: 'https://www.innovatiff.example',

  contact: {
    email: 'hello@innovatiff.example',
    phone: '+1 (555) 010-0100',
    phoneHref: 'tel:+15550100100',
    address: 'Your city, your region',
    hours: 'Monday to Friday, 9:00 to 18:00',
  },

  /** Optional: a form endpoint (e.g. Formspree, Basin, your own API). Empty = the form opens the visitor's email app. */
  formEndpoint: '',

  social: [
    { label: 'Instagram', href: '#', icon: 'instagram' },
    { label: 'LinkedIn', href: '#', icon: 'linkedin' },
    { label: 'Facebook', href: '#', icon: 'facebook' },
  ],

  nav: [
    { label: 'Home', href: 'index.html' },
    { label: 'Products', href: 'products.html', children: 'products' },
    { label: 'How it works', href: 'how-it-works.html' },
    { label: 'Live samples', href: 'samples.html' },
    { label: 'About', href: 'about.html' },
    { label: 'Contact', href: 'contact.html' },
  ],
  cta: { label: 'Get a quote', href: 'contact.html' },

  /** Sample quotes — REPLACE with real client feedback before publishing. */
  testimonials: [
    {
      quote:
        'Orders now come straight to the kitchen printer. We stopped paying commissions to delivery apps and our regulars order from our own site.',
      name: 'Restaurant owner',
      role: 'Family restaurant · Website + ordering',
      initials: 'RO',
    },
    {
      quote:
        'The POS was installed in one afternoon. They set up every product, trained the team and stayed for the evening rush. Closing the till now takes five minutes.',
      name: 'Café manager',
      role: 'Coffee shop · POS system',
      initials: 'CM',
    },
    {
      quote:
        'The AI receptionist books appointments while we are with clients. We stopped missing calls and the summary arrives on my phone right after.',
      name: 'Salon owner',
      role: 'Hair salon · AI receptionist',
      initials: 'SO',
    },
    {
      quote:
        'Everything runs on a small server in our back office. If the internet drops, sales and clock-ins keep working. That was the deciding factor for us.',
      name: 'Store owner',
      role: 'Retail store · POS + inventory + staff',
      initials: 'ST',
    },
  ],
};
