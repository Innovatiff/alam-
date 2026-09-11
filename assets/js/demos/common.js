/* Shared helpers for the interactive samples */
window.Demo = (() => {
  const lang = (document.documentElement.lang || 'es').slice(0, 2) === 'en' ? 'en' : 'es';
  const x = (es, en) => (lang === 'en' ? en : es);
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const money = (n) => (n < 0 ? '-' : '') + '$' + Math.abs(n).toFixed(2);
  const icon = (n) => `<svg><use href="#i-${n}"/></svg>`;
  const el = (html) => { const t = document.createElement('template'); t.innerHTML = html.trim(); return t.content.firstElementChild; };
  const time = (d = new Date()) => d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const pad = (n) => String(n).padStart(2, '0');
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  let toasts;
  const toast = (title, text = '', type = 'ok', ic = 'check') => {
    if (!toasts) { toasts = document.createElement('div'); toasts.className = 'toasts'; document.body.appendChild(toasts); }
    const t = el(`<div class="toast ${type}">${icon(ic)}<div><b>${title}</b>${text ? `<span>${text}</span>` : ''}</div></div>`);
    toasts.appendChild(t);
    setTimeout(() => { t.classList.add('out'); setTimeout(() => t.remove(), 300); }, 4000);
  };
  toast.clear = () => { if (toasts) [...toasts.children].forEach((t) => t.remove()); };

  let modalEl;
  const modal = {
    open(html, cls = '') {
      if (!modalEl) {
        modalEl = el('<div class="modal" role="dialog" aria-modal="true"><div class="modal-card"></div></div>');
        document.body.appendChild(modalEl);
        modalEl.addEventListener('click', (e) => { if (e.target === modalEl) modal.close(); });
        document.addEventListener('keydown', (e) => { if (e.key === 'Escape') modal.close(); });
      }
      const card = $('.modal-card', modalEl);
      card.className = `modal-card ${cls}`;
      card.innerHTML = `<button class="icon-btn modal-x" type="button" aria-label="${x('Cerrar', 'Close')}">${icon('x')}</button>${html}`;
      $('.modal-x', card).addEventListener('click', modal.close);
      requestAnimationFrame(() => modalEl.classList.add('open'));
      return card;
    },
    close() { if (modalEl) modalEl.classList.remove('open'); },
  };

  const views = (root = document) => {
    const nav = $$('[data-nav]', root);
    const show = (id) => {
      nav.forEach((b) => b.classList.toggle('on', b.dataset.nav === id));
      $$('[data-view]', root).forEach((v) => v.classList.toggle('on', v.dataset.view === id));
      document.dispatchEvent(new CustomEvent('viewchange', { detail: id }));
    };
    nav.forEach((b) => b.addEventListener('click', () => show(b.dataset.nav)));
    if (nav[0]) show(nav[0].dataset.nav);
    return show;
  };

  const download = (name, content, type = 'text/csv') => {
    const blob = new Blob([content], { type });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob); a.download = name; document.body.appendChild(a); a.click();
    setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 500);
  };

  return { $, $$, money, toast, modal, views, icon, el, time, pad, esc, download, lang, x };
})();

/* ===== Guided tour (spotlight + step cards) ===== */
window.Demo.tour = (() => {
  const { $, $$, el, icon, x } = window.Demo;
  let steps = [], i = 0, root = null, spot = null, card = null, cleanup = null, onEnd = null, key = '';
  const pad = 8;

  const position = () => {
    if (!root) return;
    const s = steps[i];
    const target = s.target ? $(s.target) : null;
    const vw = document.documentElement.clientWidth, sy = window.scrollY, sx = window.scrollX;
    if (target) {
      const r = target.getBoundingClientRect();
      spot.hidden = false;
      spot.style.left = `${r.left + sx - pad}px`; spot.style.top = `${r.top + sy - pad}px`;
      spot.style.width = `${r.width + pad * 2}px`; spot.style.height = `${r.height + pad * 2}px`;
      const cw = Math.min(380, vw - 24);
      card.style.width = `${cw}px`;
      const below = r.bottom + 16 + card.offsetHeight < window.innerHeight || r.top < card.offsetHeight + 30;
      let left = r.left + sx + r.width / 2 - cw / 2;
      left = Math.max(sx + 12, Math.min(left, sx + vw - cw - 12));
      card.style.left = `${left}px`;
      card.style.top = below ? `${r.bottom + sy + 16}px` : `${r.top + sy - card.offsetHeight - 16}px`;
      card.classList.toggle('above', !below);
      card.classList.remove('centered');
    } else {
      spot.hidden = true;
      const cw = Math.min(460, vw - 24);
      card.style.width = `${cw}px`;
      card.classList.add('centered');
      card.style.left = `${sx + vw / 2 - cw / 2}px`;
      card.style.top = `${sy + Math.max(24, (window.innerHeight - card.offsetHeight) / 2)}px`;
    }
  };

  const render = () => {
    const s = steps[i];
    const last = i === steps.length - 1;
    card.innerHTML = `<div class="tour-head"><span class="tour-count">${s.target || i > 0 ? `${x('Paso', 'Step')} ${i} ${x('de', 'of')} ${steps.length - 1}` : x('Bienvenido', 'Welcome')}</span><button class="icon-btn tour-x" type="button" aria-label="${x('Cerrar guía', 'Close guide')}">${icon('x')}</button></div>
      <h3>${s.title}</h3><p>${s.text}</p>
      ${s.action ? `<div class="tour-action">${icon('hand')}<span>${s.action}</span></div>` : ''}
      <div class="tour-foot"><div class="tour-dots">${steps.map((_, k) => `<i class="${k === i ? 'on' : k < i ? 'done' : ''}"></i>`).join('')}</div>
        <div class="row" style="gap:.4rem">${i > 0 ? `<button class="btn btn-ghost btn-xs" type="button" data-prev>${icon('arrow-left')}${x('Anterior', 'Back')}</button>` : ''}<button class="btn btn-primary btn-xs" type="button" data-next>${last ? `${icon('check')}${x('Terminar', 'Finish')}` : i === 0 ? `${x('Empezar', 'Start')} ${icon('arrow-right')}` : `${x('Siguiente', 'Next')} ${icon('arrow-right')}`}</button></div></div>`;
    $('.tour-x', card).addEventListener('click', end);
    $('[data-next]', card).addEventListener('click', () => (last ? end() : go(i + 1)));
    const prev = $('[data-prev]', card); if (prev) prev.addEventListener('click', () => go(i - 1));
    card.classList.remove('pop'); void card.offsetWidth; card.classList.add('pop');
  };

  const go = (n) => {
    if (cleanup) { cleanup(); cleanup = null; }
    i = Math.max(0, Math.min(steps.length - 1, n));
    const s = steps[i];
    if (s.before) s.before();
    const target = s.target ? $(s.target) : null;
    if (target) target.scrollIntoView({ block: 'center', behavior: 'smooth' });
    render();
    requestAnimationFrame(() => { position(); setTimeout(position, 350); setTimeout(position, 800); });
    if (s.advanceOn) {
      const handler = (e) => { if (e.target.closest(s.advanceOn)) { setTimeout(() => go(i + 1), s.delay || 500); } };
      document.addEventListener('click', handler, true);
      cleanup = () => document.removeEventListener('click', handler, true);
    }
  };

  const end = () => {
    if (!root) return;
    if (cleanup) { cleanup(); cleanup = null; }
    root.classList.add('out');
    const r = root; root = null;
    setTimeout(() => r.remove(), 300);
    window.removeEventListener('resize', position); window.removeEventListener('scroll', position);
    try { if (key) sessionStorage.setItem(`tour:${key}`, '1'); } catch (e) { /* ignore */ }
    if (onEnd) onEnd();
  };

  const start = (list, opts = {}) => {
    if (root) end();
    steps = list; i = 0; onEnd = opts.onEnd || null; key = opts.key || location.pathname;
    root = el('<div class="tour" aria-live="polite"><div class="tour-spot" hidden></div><div class="tour-card" role="dialog"></div></div>');
    spot = $('.tour-spot', root); card = $('.tour-card', root);
    document.body.appendChild(root);
    window.addEventListener('resize', position); window.addEventListener('scroll', position, { passive: true });
    go(0);
  };

  const auto = (list, opts = {}) => {
    const k = opts.key || location.pathname;
    let seen = false; try { seen = !!sessionStorage.getItem(`tour:${k}`); } catch (e) { /* ignore */ }
    $$('[data-tour-start]').forEach((b) => b.addEventListener('click', () => start(list, { ...opts, key: k })));
    if (!seen && !opts.manualOnly) setTimeout(() => start(list, { ...opts, key: k }), opts.delay || 700);
  };

  return { start, end, auto, next: () => go(i + 1), position };
})();
