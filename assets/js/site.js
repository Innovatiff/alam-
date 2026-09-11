/* =====================================================================
   Innovatiff — site behaviour & animation engine (no dependencies)
   ===================================================================== */
(() => {
  'use strict';
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const coarse = window.matchMedia('(hover: none)').matches;
  const clamp = (n, a, b) => Math.min(b, Math.max(a, n));
  document.documentElement.classList.add('js');

  /* ---------- header ---------- */
  const onScroll = () => document.body.classList.toggle('is-scrolled', window.scrollY > 24);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  const toggle = $('.nav-toggle');
  if (toggle) {
    toggle.addEventListener('click', () => {
      const open = document.body.classList.toggle('menu-open');
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
    });
  }
  $$('.has-menu > .nav-link').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const item = btn.parentElement;
      const open = item.classList.toggle('is-open');
      btn.setAttribute('aria-expanded', String(open));
    });
  });
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.has-menu')) $$('.has-menu.is-open').forEach((i) => i.classList.remove('is-open'));
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.body.classList.remove('menu-open');
      $$('.has-menu.is-open').forEach((i) => i.classList.remove('is-open'));
    }
  });
  window.matchMedia('(min-width: 961px)').addEventListener('change', (m) => {
    if (m.matches) document.body.classList.remove('menu-open');
  });

  /* ---------- word splitting (blur-in headlines) ---------- */
  $$('[data-words]').forEach((el) => {
    if (el.dataset.split) return;
    let i = 0;
    const process = (node, parent) => {
      Array.from(node.childNodes).forEach((child) => {
        if (child.nodeType === 3) {
          child.textContent.split(/(\s+)/).forEach((part) => {
            if (!part) return;
            if (/^\s+$/.test(part)) parent.appendChild(document.createTextNode(' '));
            else {
              const s = document.createElement('span');
              s.className = 'w';
              s.style.setProperty('--i', i++);
              s.textContent = part;
              parent.appendChild(s);
            }
          });
        } else if (child.nodeType === 1) {
          if (child.tagName === 'BR') { parent.appendChild(document.createElement('br')); return; }
          const clone = child.cloneNode(false);
          process(child, clone);
          parent.appendChild(clone);
        }
      });
    };
    const frag = document.createDocumentFragment();
    process(el, frag);
    el.textContent = '';
    el.appendChild(frag);
    el.dataset.split = '1';
    el.classList.add('words');
  });

  /* ---------- stagger helpers ---------- */
  $$('[data-stagger]').forEach((group) => {
    const step = parseInt(group.dataset.stagger, 10) || 90;
    Array.from(group.children).forEach((c, i) => c.style.setProperty('--d', `${i * step}ms`));
  });

  /* ---------- counters ---------- */
  const runCounter = (el) => {
    const raw = el.dataset.count;
    const target = parseFloat(raw);
    const decimals = (raw.split('.')[1] || '').length;
    const prefix = el.dataset.prefix || '';
    const suffix = el.dataset.suffix || '';
    const fmt = (n) => prefix + n.toLocaleString(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals }) + suffix;
    if (reduced) { el.textContent = fmt(target); return; }
    const dur = parseInt(el.dataset.dur, 10) || 1700;
    const start = performance.now();
    const tick = (t) => {
      const p = clamp((t - start) / dur, 0, 1);
      const e = 1 - Math.pow(1 - p, 3);
      el.textContent = fmt(target * e);
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  /* ---------- reveal on scroll ---------- */
  const revealEls = $$('[data-reveal], .words, [data-giant], [data-count], [data-play]');
  if (reduced || !('IntersectionObserver' in window)) {
    revealEls.forEach((el) => { el.classList.add('in'); if (el.dataset.count) runCounter(el); });
  } else {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        const el = en.target;
        el.classList.add('in');
        if (el.dataset.count) runCounter(el);
        if (el.dataset.play !== undefined) el.classList.add('play');
        io.unobserve(el);
      });
    }, { threshold: 0.05, rootMargin: '0px 0px -5% 0px' });
    revealEls.forEach((el) => io.observe(el));
    /* safety net: anything scrolled past very quickly (fast flick, anchor jump) is revealed on the next scroll */
    let pending = revealEls.slice();
    let sweeping = false;
    const sweep = () => {
      sweeping = false;
      const vh = window.innerHeight;
      pending = pending.filter((el) => {
        if (el.classList.contains('in')) return false;
        const r = el.getBoundingClientRect();
        if (r.top < vh * 0.95 && r.bottom > -vh) {
          el.classList.add('in');
          if (el.dataset.count) runCounter(el);
          if (el.dataset.play !== undefined) el.classList.add('play');
          io.unobserve(el);
          return false;
        }
        return true;
      });
    };
    window.addEventListener('scroll', () => { if (!sweeping && pending.length) { sweeping = true; requestAnimationFrame(sweep); } }, { passive: true });
  }

  /* ---------- spotlight on cards ---------- */
  document.addEventListener('pointermove', (e) => {
    const card = e.target.closest && e.target.closest('.card, .spot');
    if (!card) return;
    const r = card.getBoundingClientRect();
    card.style.setProperty('--mx', `${e.clientX - r.left}px`);
    card.style.setProperty('--my', `${e.clientY - r.top}px`);
  }, { passive: true });

  /* ---------- 3D tilt ---------- */
  if (!coarse && !reduced) {
    $$('[data-tilt]').forEach((el) => {
      const max = parseFloat(el.dataset.tilt) || 6;
      el.style.transition = 'transform .5s cubic-bezier(.22,.61,.36,1)';
      el.addEventListener('pointermove', (e) => {
        const r = el.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        el.style.transform = `perspective(1200px) rotateX(${(-y * max).toFixed(2)}deg) rotateY(${(x * max).toFixed(2)}deg) translateY(-4px)`;
      });
      el.addEventListener('pointerleave', () => { el.style.transform = ''; });
    });
  }

  /* ---------- parallax + hero tilt ---------- */
  const par = $$('[data-parallax]');
  const tiltWraps = $$('.tilt-wrap');
  if ((par.length || tiltWraps.length) && !reduced) {
    let ticking = false;
    const update = () => {
      ticking = false;
      const vh = window.innerHeight;
      par.forEach((el) => {
        const r = el.getBoundingClientRect();
        const c = r.top + r.height / 2 - vh / 2;
        el.style.setProperty('--py', `${(-c * parseFloat(el.dataset.parallax || 0.1)).toFixed(1)}px`);
      });
      tiltWraps.forEach((el) => {
        const r = el.getBoundingClientRect();
        const p = clamp((vh * 0.9 - r.top) / (vh * 0.6), 0, 1);
        el.style.setProperty('--tilt', `${(14 - 14 * p).toFixed(2)}deg`);
      });
    };
    const req = () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } };
    window.addEventListener('scroll', req, { passive: true });
    window.addEventListener('resize', req);
    update();
  }

  /* ---------- cursor glow ---------- */
  const glow = $('.cursor-glow');
  if (glow && !coarse && !reduced) {
    let x = innerWidth / 2, y = innerHeight / 2, tx = x, ty = y, raf = null;
    const loop = () => {
      x += (tx - x) * 0.14; y += (ty - y) * 0.14;
      glow.style.transform = `translate(${(x - 260).toFixed(1)}px, ${(y - 260).toFixed(1)}px)`;
      if (Math.abs(tx - x) > 0.5 || Math.abs(ty - y) > 0.5) raf = requestAnimationFrame(loop); else raf = null;
    };
    document.addEventListener('pointermove', (e) => {
      tx = e.clientX; ty = e.clientY;
      document.body.classList.add('has-pointer');
      if (!raf) raf = requestAnimationFrame(loop);
    }, { passive: true });
  }

  /* ---------- page transitions ---------- */
  const veil = $('.page-veil');
  if (veil && !reduced) {
    document.addEventListener('click', (e) => {
      const a = e.target.closest('a[href]');
      if (!a || e.defaultPrevented || e.button !== 0) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || a.target === '_blank' || a.hasAttribute('download')) return;
      const href = a.getAttribute('href');
      if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) return;
      const url = new URL(a.href, location.href);
      if (url.origin !== location.origin) return;
      if (url.pathname === location.pathname && url.hash) return;
      e.preventDefault();
      veil.classList.add('is-on');
      setTimeout(() => { location.href = url.href; }, 300);
    });
    window.addEventListener('pageshow', (e) => { if (e.persisted) veil.classList.remove('is-on'); });
  }

  /* ---------- accordion ---------- */
  $$('.acc-btn').forEach((btn) => btn.addEventListener('click', () => {
    const acc = btn.closest('.acc');
    const open = acc.classList.toggle('is-open');
    btn.setAttribute('aria-expanded', String(open));
  }));

  /* ---------- tabs ---------- */
  $$('[data-tabs]').forEach((root) => {
    const tabs = $$('[data-tab]', root);
    const panels = $$('[data-panel]', root);
    const activate = (id) => {
      tabs.forEach((t) => { const on = t.dataset.tab === id; t.classList.toggle('is-active', on); t.setAttribute('aria-selected', String(on)); });
      panels.forEach((p) => { p.hidden = p.dataset.panel !== id; });
    };
    tabs.forEach((t) => t.addEventListener('click', () => activate(t.dataset.tab)));
    if (tabs[0]) activate(tabs[0].dataset.tab);
  });

  /* ---------- progress lines for steps / flows ---------- */
  const progressRoots = $$('.steps, .flow');
  if (progressRoots.length) {
    const update = () => {
      const vh = window.innerHeight;
      progressRoots.forEach((root) => {
        const items = $$('.step, .flow-step', root);
        if (reduced) { items.forEach((i) => i.classList.add('is-active')); root.style.setProperty('--p', 1); return; }
        const r = root.getBoundingClientRect();
        const horizontal = root.classList.contains('steps') && window.innerWidth > 960;
        let p;
        if (horizontal) p = clamp((vh * 0.85 - r.top) / (vh * 0.55), 0, 1);
        else p = clamp((vh * 0.62 - r.top) / r.height, 0, 1);
        root.style.setProperty('--p', p.toFixed(3));
        items.forEach((it, i) => {
          if (horizontal) it.classList.toggle('is-active', p >= (i + 0.35) / items.length);
          else it.classList.toggle('is-active', it.getBoundingClientRect().top < vh * 0.62);
        });
      });
    };
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    update();
  }

  /* ---------- testimonial carousel ---------- */
  $$('.carousel').forEach((c) => {
    const slides = $$('.slide', c);
    const n = slides.length;
    if (!n) return;
    let i = 0, timer = null;
    const dots = $$('.dot-btn', c);
    const set = () => {
      slides.forEach((s, k) => {
        s.classList.remove('is-current', 'is-prev', 'is-next');
        if (k === i) s.classList.add('is-current');
        else if (k === (i - 1 + n) % n) s.classList.add('is-prev');
        else if (k === (i + 1) % n) s.classList.add('is-next');
      });
      dots.forEach((d, k) => d.classList.toggle('is-active', k === i));
    };
    const restart = () => {
      clearInterval(timer);
      if (!reduced) timer = setInterval(() => { i = (i + 1) % n; set(); }, 6000);
    };
    const go = (d) => { i = (i + d + n) % n; set(); restart(); };
    const prev = $('.car-prev', c), next = $('.car-next', c);
    if (prev) prev.addEventListener('click', () => go(-1));
    if (next) next.addEventListener('click', () => go(1));
    dots.forEach((d, k) => d.addEventListener('click', () => { i = k; set(); restart(); }));
    slides.forEach((s) => s.addEventListener('click', () => {
      if (s.classList.contains('is-prev')) go(-1);
      else if (s.classList.contains('is-next')) go(1);
    }));
    let sx = null;
    c.addEventListener('touchstart', (e) => { sx = e.touches[0].clientX; }, { passive: true });
    c.addEventListener('touchend', (e) => {
      if (sx == null) return;
      const dx = e.changedTouches[0].clientX - sx;
      if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
      sx = null;
    });
    set(); restart();
  });

  /* ---------- fan of tiles ---------- */
  $$('.fan').forEach((fan) => {
    const tiles = $$('.fan-tile', fan);
    const label = $('.fan-label', fan);
    const n = tiles.length;
    if (!n) return;
    let active = 0, timer = null;
    const layout = () => {
      const w = fan.clientWidth;
      const tile = tiles[0].offsetWidth || 120;
      const gap = tile * 1.22;
      const visible = Math.max(1, Math.min(Math.floor(n / 2), Math.floor((w / gap - 1) / 2)));
      tiles.forEach((t, idx) => {
        let k = idx - active;
        if (k > n / 2) k -= n;
        if (k < -n / 2) k += n;
        const abs = Math.abs(k);
        const x = k * gap;
        const y = Math.pow(abs, 1.5) * 12 + (k === 0 ? -14 : 0);
        const rot = k * 9;
        const s = k === 0 ? 1.14 : 1 - abs * 0.05;
        t.style.transform = `translate(calc(-50% + ${x.toFixed(1)}px), ${y.toFixed(1)}px) rotate(${rot}deg) scale(${s.toFixed(3)})`;
        t.style.zIndex = String(20 - abs);
        t.style.opacity = abs > visible ? '0' : '1';
        t.style.pointerEvents = abs > visible ? 'none' : 'auto';
        t.classList.toggle('is-active', k === 0);
      });
      if (label) {
        label.classList.remove('in');
        void label.offsetWidth;
        label.innerHTML = `<strong>${tiles[active].dataset.name || ''}</strong><span>${tiles[active].dataset.desc || ''}</span>`;
        label.classList.add('in');
      }
    };
    const restart = () => {
      clearInterval(timer);
      if (!reduced) timer = setInterval(() => { active = (active + 1) % n; layout(); }, 2600);
    };
    tiles.forEach((t, idx) => t.addEventListener('click', () => { active = idx; layout(); restart(); }));
    window.addEventListener('resize', layout);
    layout(); restart();
  });

  /* ---------- hero network scaling ---------- */
  $$('.net-wrap').forEach((wrap) => {
    const net = $('.net', wrap);
    if (!net) return;
    const baseW = parseFloat(net.dataset.w) || 760;
    const baseH = parseFloat(net.dataset.h) || 230;
    const fit = () => {
      const s = Math.min(1, wrap.clientWidth / baseW);
      net.style.transform = `translateX(-50%) scale(${s.toFixed(4)})`;
      wrap.style.height = `${Math.round(baseH * s)}px`;
    };
    window.addEventListener('resize', fit);
    fit();
    setTimeout(() => wrap.classList.add('loaded'), 150);
  });

  /* ---------- typewriter / cycling text ---------- */
  $$('[data-cycle]').forEach((el) => {
    const words = el.dataset.cycle.split('|').map((w) => w.trim()).filter(Boolean);
    if (words.length < 2 || reduced) return;
    let idx = 0;
    setInterval(() => {
      idx = (idx + 1) % words.length;
      el.classList.add('is-out');
      setTimeout(() => { el.textContent = words[idx]; el.classList.remove('is-out'); }, 350);
    }, 2600);
  });

  /* ---------- contact form ---------- */
  const form = $('form[data-contact]');
  if (form) {
    const status = $('.form-status', form);
    const setStatus = (msg, ok) => { if (!status) return; status.textContent = msg; status.className = `form-status ${ok ? 'is-ok' : 'is-err'}`; };
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const endpoint = form.dataset.endpoint;
      const data = new FormData(form);
      const btn = $('button[type=submit]', form);
      if (endpoint) {
        btn.disabled = true;
        try {
          const res = await fetch(endpoint, { method: 'POST', headers: { Accept: 'application/json' }, body: data });
          if (!res.ok) throw new Error('bad status');
          form.reset();
          setStatus('Gracias. Recibimos tu mensaje y te respondemos en un día hábil.', true);
        } catch (err) {
          setStatus('Algo falló al enviar el formulario. Escríbenos o llámanos directamente.', false);
        }
        btn.disabled = false;
      } else {
        const lines = [];
        data.forEach((v, k) => { if (v) lines.push(`${k}: ${v}`); });
        const subject = encodeURIComponent(`Solicitud de cotización de ${data.get('nombre') || 'un visitante del sitio'}`);
        const body = encodeURIComponent(lines.join('\n'));
        window.location.href = `mailto:${form.dataset.email}?subject=${subject}&body=${body}`;
        setStatus('Se abrirá tu aplicación de correo con el mensaje listo para enviar.', true);
      }
    });
    const params = new URLSearchParams(location.search);
    const interests = params.getAll('interest');
    $$('input[name="interest"]', form).forEach((cb) => { if (interests.includes(cb.value)) cb.checked = true; });
    const message = form.elements.message;
    if (message && params.get('note') && !message.value) message.value = params.get('note');
    if (params.get('business') && form.elements.business) form.elements.business.value = params.get('business');
    if (params.get('email') && form.elements.email) form.elements.email.value = params.get('email');
  }

  /* ---------- "in view" helper for looping mockup animations ---------- */
  $$('[data-loop]').forEach((el) => el.classList.add('loop'));
})();
