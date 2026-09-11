export default (ctx) => {
  const { x, base, site, products, icon: I } = ctx;
  const types = x(
    ['Restaurante o comida para llevar', 'Cafetería o panadería', 'Tienda', 'Salón o barbería', 'Clínica o consultorio', 'Taller mecánico', 'Gimnasio o estudio', 'Hotel u hospedaje', 'Mayorista o distribución', 'Servicios', 'Otro'],
    ['Restaurant or takeout', 'Café or bakery', 'Retail shop', 'Salon or barbershop', 'Clinic or practice', 'Auto shop', 'Gym or studio', 'Hotel or lodging', 'Wholesale or distribution', 'Services', 'Other']
  );
  return {
    title: x('Contacto', 'Contact'),
    description: x('Pide una cotización. Cuéntanos de tu negocio y te sugerimos el software, el equipo y la instalación correctos.', 'Get a quote. Tell us about your business and we\'ll suggest the right software, hardware and installation.'),
    body: `{{> head}}
{{> nav}}
<section class="p-hero" style="padding-bottom:0">
  <div class="orb blue" style="width:700px;height:700px;left:-300px;top:-200px"></div>
  <div class="container center">
    <span class="eyebrow" data-reveal="blur"><span class="dot"></span>${x('Contacto', 'Contact')}</span>
    <h1 class="h-display" data-words style="margin:1.2rem auto 1.2rem;max-width:18ch">${x('Hablemos de <span class="grad">tu negocio</span>', 'Let\'s talk about <span class="grad">your business</span>')}</h1>
    <p class="lead" data-reveal="blur" style="--d:400ms;margin:0 auto">${x('Respondemos en un día hábil. La visita es gratis.', 'We reply within one business day. The visit is free.')}</p>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="contact-grid">
      <form class="card static pad-lg" data-contact data-endpoint="${site.formEndpoint}" data-email="${site.contact.email}" data-reveal="up" novalidate>
        <h2 style="font-size:1.5rem;margin-bottom:.4rem">${x('Pedir una cotización', 'Get a quote')}</h2>
        <p class="muted" style="margin-bottom:1.6rem">${x('Gratis y sin compromiso. Los campos con * son obligatorios.', 'Free and no strings attached. Fields with * are required.')}</p>
        <div class="form-grid">
          <div class="field"><label for="f-name">${x('Tu nombre', 'Your name')} *</label><input id="f-name" name="nombre" type="text" required autocomplete="name"></div>
          <div class="field"><label for="f-business">${x('Nombre del negocio', 'Business name')}</label><input id="f-business" name="business" type="text" autocomplete="organization"></div>
          <div class="field"><label for="f-email">${x('Correo', 'Email')} *</label><input id="f-email" name="email" type="email" required autocomplete="email"></div>
          <div class="field"><label for="f-phone">${x('Teléfono', 'Phone')}</label><input id="f-phone" name="telefono" type="tel" autocomplete="tel"></div>
          <div class="field full"><label for="f-type">${x('Tipo de negocio', 'Type of business')}</label>
            <select id="f-type" name="tipo">
              <option value="">${x('Elige uno…', 'Choose one…')}</option>
              ${types.map((t) => `<option>${t}</option>`).join('')}
            </select>
          </div>
          <div class="field full"><label>${x('Me interesa', 'I\'m interested in')}</label>
            <div class="check-grid">
              ${products.map((p) => `<label class="check"><input type="checkbox" name="interest" value="${p.slug}"> ${p.name}</label>`).join('')}
              <label class="check"><input type="checkbox" name="interest" value="not-sure"> ${x('Aún no sé, asesórenme', 'Not sure yet, advise me')}</label>
            </div>
          </div>
          <div class="field full"><label for="f-message">${x('¿Qué te frena hoy?', 'What is holding you back today?')}</label><textarea id="f-message" name="message" placeholder="${x('Por ejemplo: perdemos llamadas en la hora pico, pagamos 30 % a las apps de reparto…', 'For example: we miss calls during the rush, we pay 30% to delivery apps…')}"></textarea></div>
        </div>
        <div class="row" style="margin-top:1.4rem;justify-content:space-between">
          <button class="btn btn-primary btn-lg" type="submit">${x('Enviar solicitud', 'Send request')} <svg class="arrow"><use href="#i-arrow-right"/></svg></button>
          <span class="muted small">${x('Nunca compartimos tus datos.', 'We never share your data.')}</span>
        </div>
        <div class="form-status" role="status" aria-live="polite"></div>
      </form>

      <div class="stack" data-stagger="120">
        <div class="card static" data-reveal="right">
          <h3>${x('Contáctanos directamente', 'Contact us directly')}</h3>
          <ul class="contact-list" style="list-style:none;margin:1rem 0 0;padding:0;display:grid;gap:.8rem">
            <li>${I('mail')}<a href="mailto:${site.contact.email}">${site.contact.email}</a></li>
            <li>${I('phone')}<a href="${site.contact.phoneHref}">${site.contact.phone}</a></li>
            <li>${I('map-pin')}<span>${site.contact.address}</span></li>
            <li>${I('clock')}<span>${site.contact.hours}</span></li>
          </ul>
        </div>
        <div class="card static" data-reveal="right">
          <h3>${x('Qué pasa después', 'What happens next')}</h3>
          <ol class="next-steps">
            <li><b>1</b><div><strong>${x('Respondemos en un día hábil', 'We reply within a business day')}</strong></div></li>
            <li><b>2</b><div><strong>${x('Visita gratuita a tu negocio', 'Free visit to your business')}</strong></div></li>
            <li><b>3</b><div><strong>${x('Una cotización clara, todo incluido', 'A clear quote, all included')}</strong></div></li>
          </ol>
        </div>
        <div class="card static gradient-border" data-reveal="right">
          <h3>${x('¿Prefieres verlo primero?', 'Prefer to see it first?')}</h3>
          <a class="btn btn-ghost" style="margin-top:1rem" href="${base}samples.html">${I('play')}${x('Abrir las muestras en vivo', 'Open the live samples')}</a>
        </div>
      </div>
    </div>
  </div>
</section>
{{> footer}}`,
  };
};
