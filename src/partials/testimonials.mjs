const I = (n) => `<svg><use href="#i-${n}"/></svg>`;
export default (ctx) => {
  const list = ctx.site.testimonials;
  return `<div class="carousel" data-reveal="scale">
  <div class="carousel-track">
    ${list.map((t) => `<figure class="slide">
      <div class="avatar">${t.initials}</div>
      <figcaption><div class="name">${t.name}</div><div class="role">${t.role}</div></figcaption>
      <div class="stars">${I('star')}${I('star')}${I('star')}${I('star')}${I('star')}</div>
      <q>${t.quote}</q>
    </figure>`).join('')}
  </div>
  <div class="carousel-nav">
    <button class="car-btn car-prev" type="button" aria-label="Previous">${I('arrow-left')}</button>
    <div class="dots">${list.map((_, i) => `<button class="dot-btn" type="button" aria-label="Go to quote ${i + 1}"></button>`).join('')}</div>
    <button class="car-btn car-next" type="button" aria-label="Next">${I('arrow-right')}</button>
  </div>
</div>`;
};
