/* Shared helpers for the interactive samples */
window.Demo = (() => {
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
    setTimeout(() => { t.classList.add('out'); setTimeout(() => t.remove(), 300); }, 4500);
  };

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
      card.innerHTML = `<button class="icon-btn modal-x" type="button" aria-label="Close">${icon('x')}</button>${html}`;
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

  return { $, $$, money, toast, modal, views, icon, el, time, pad, esc, download };
})();
