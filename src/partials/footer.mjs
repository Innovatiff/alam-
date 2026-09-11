import { logoFull } from './logo.mjs';

export default (ctx) => {
  const { site, products, root, year } = ctx;
  const productLinks = products.map((p) => `<li><a href="${root}products/${p.slug}.html">${p.name}</a></li>`).join('');
  const socials = site.social
    .map((s) => `<a class="social" href="${s.href}" aria-label="${s.label}" rel="noopener"><svg><use href="#i-${s.icon}"/></svg></a>`)
    .join('');
  return `</main>
<footer class="site-footer">
  <div class="container">
    <div class="footer-grid">
      <div class="footer-brand">
        <a class="brand" href="${root}index.html">${logoFull(root, 34)}</a>
        <p>${site.tagline}</p>
        <div class="socials">${socials}</div>
      </div>
      <div>
        <h4>Productos</h4>
        <ul>${productLinks}</ul>
      </div>
      <div>
        <h4>Empresa</h4>
        <ul>
          <li><a href="${root}how-it-works.html">Cómo funciona</a></li>
          <li><a href="${root}samples.html">Muestras en vivo</a></li>
          <li><a href="${root}about.html">Nosotros</a></li>
          <li><a href="${root}contact.html">Contacto</a></li>
        </ul>
      </div>
      <div>
        <h4>Contáctanos</h4>
        <ul class="contact-list">
          <li><svg><use href="#i-mail"/></svg><a href="mailto:${site.contact.email}">${site.contact.email}</a></li>
          <li><svg><use href="#i-phone"/></svg><a href="${site.contact.phoneHref}">${site.contact.phone}</a></li>
          <li><svg><use href="#i-map-pin"/></svg><span>${site.contact.address}</span></li>
          <li><svg><use href="#i-clock"/></svg><span>${site.contact.hours}</span></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <span>© ${year} ${site.name}. Todos los derechos reservados.</span>
      <span>Diseñado, construido e instalado en tu local.</span>
    </div>
  </div>
  <div class="footer-giant" aria-hidden="true" data-giant><span class="giant">${site.name}</span></div>
</footer>
<script src="${root}assets/js/site.js" defer></script>
${ctx.extraJs ? `<script src="${root}${ctx.extraJs}" defer></script>` : ''}
</body>
</html>`;
};
