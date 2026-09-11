(() => {
  const { $, $$, toast, modal, icon, el, time, esc, tour } = window.Demo;

  const DAYS = ['Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
  const SLOTS = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'];
  const appts = [
    { day: 0, time: '10:00', name: 'Priya S.', service: 'Color' }, { day: 0, time: '15:00', name: 'Tomás R.', service: 'Corte' },
    { day: 1, time: '09:00', name: 'Hanna K.', service: 'Secado' }, { day: 1, time: '13:00', name: 'Marcos D.', service: 'Barba' }, { day: 1, time: '16:00', name: 'Lea B.', service: 'Corte' },
    { day: 2, time: '11:00', name: 'Olivia M.', service: 'Color' }, { day: 2, time: '14:00', name: 'Jonás F.', service: 'Corte' },
    { day: 3, time: '10:00', name: 'Ana N.', service: 'Corte' }, { day: 3, time: '12:00', name: 'Sara P.', service: 'Secado' }, { day: 3, time: '17:00', name: 'Beto C.', service: 'Corte' },
    { day: 4, time: '09:00', name: 'Mía L.', service: 'Color' }, { day: 4, time: '13:00', name: 'Noé W.', service: 'Barba' },
  ];
  const log = [
    { who: 'Priya S.', outcome: 'Cita', detail: 'Color, mar 10:00', dur: '2:14', at: '08:41' },
    { who: 'Desconocido', outcome: 'Respondida', detail: 'Horarios y estacionamiento', dur: '0:41', at: '09:12' },
    { who: 'Marco T.', outcome: 'Recado', detail: 'Quiere que le regresen la llamada por un color', dur: '1:05', at: '09:58' },
    { who: 'Sara P.', outcome: 'Reagendada', detail: 'Secado movido al vie 12:00', dur: '1:32', at: '10:20' },
  ];
  const stats = { answered: 4, booked: 2, messages: 1 };

  const SCENARIOS = {
    book: { label: 'Agendar una cita', icon: 'calendar', caller: 'Emma W. · +1 555 0134', lines: [
      ['ai', 'Gracias por llamar a Salón Flor, habla Mía, la asistente del salón. ¿En qué puedo ayudarte?'],
      ['caller', 'Hola, quisiera agendar un corte el martes por la tarde.'],
      ['ai', 'Claro. El martes tengo a las 2:00 pm y a las 4:00 pm con Sofía. ¿Cuál te conviene?'],
      ['caller', 'A las 2 está bien.'],
      ['ai', 'Perfecto. ¿Me das tu nombre y un celular para enviarte la confirmación?'],
      ['caller', 'Emma Walsh, 555 0134.'],
      ['ai', 'Gracias, Emma. Quedas agendada para un corte el martes a las 2:00 pm con Sofía. Te acabo de enviar la confirmación por SMS. ¿Algo más en lo que pueda ayudarte?'],
      ['caller', 'No, eso es todo. ¡Gracias!'],
      ['ai', 'Con gusto, Emma. ¡Nos vemos el martes!'],
    ], outcome: { type: 'Cita', detail: 'Corte, mar 14:00 con Sofía', appt: { day: 0, time: '14:00', name: 'Emma W.', service: 'Corte' }, summary: 'Nueva cita: Emma Walsh, corte, martes 2:00 pm con Sofía. SMS de confirmación enviado a la clienta.' } },
    hours: { label: 'Preguntar el horario', icon: 'clock', caller: 'Número desconocido', lines: [
      ['ai', 'Gracias por llamar a Salón Flor, habla Mía. ¿En qué puedo ayudarte?'],
      ['caller', 'Hola, ¿abren los domingos? ¿Y hay dónde estacionarse?'],
      ['ai', 'Los domingos y lunes estamos cerrados. Abrimos de martes a sábado, de 9 de la mañana a 6 de la tarde. Hay estacionamiento gratis por dos horas en la calle Harbour, justo detrás del salón.'],
      ['caller', 'Perfecto, gracias.'],
      ['ai', 'Con mucho gusto. ¿Quieres que te agende una visita mientras estás en la línea?'],
      ['caller', 'Hoy no, gracias. ¡Adiós!'],
      ['ai', 'Que tengas un lindo día. ¡Adiós!'],
    ], outcome: { type: 'Respondida', detail: 'Horarios y estacionamiento', summary: 'La persona preguntó si abren los domingos y por el estacionamiento. Respondido con la información de tu negocio. No requiere acción.' } },
    price: { label: 'Preguntar un precio', icon: 'dollar', caller: 'Daniel · +1 555 0177', lines: [
      ['ai', 'Gracias por llamar a Salón Flor, habla Mía. ¿En qué puedo ayudarte?'],
      ['caller', '¿Cuánto cuesta un corte de caballero con arreglo de barba?'],
      ['ai', 'El corte cuesta $45 y el arreglo de barba $20. Juntos toman más o menos una hora. ¿Quieres que revise disponibilidad?'],
      ['caller', 'Sí, ¿tienen algo el sábado por la mañana?'],
      ['ai', 'El sábado tengo a las 10 y a las 11 de la mañana libres. ¿Te agendo una?'],
      ['caller', 'A las 11, por favor. Soy Daniel.'],
      ['ai', 'Listo, Daniel. Corte y barba el sábado a las 11 de la mañana. Te llega la confirmación por SMS ahora mismo. ¡Nos vemos el sábado!'],
    ], outcome: { type: 'Cita', detail: 'Corte + barba, sáb 11:00', appt: { day: 4, time: '11:00', name: 'Daniel', service: 'Corte + barba' }, summary: 'Daniel preguntó precios y agendó corte con arreglo de barba para el sábado a las 11:00. SMS de confirmación enviado.' } },
    human: { label: 'Hablar con una persona', icon: 'users', caller: 'Gracia · +1 555 0190', lines: [
      ['ai', 'Gracias por llamar a Salón Flor, habla Mía. ¿En qué puedo ayudarte?'],
      ['caller', 'Estoy organizando el arreglo para una boda de seis personas y quisiera hablar con alguien.'],
      ['ai', '¡Felicidades! Eso se coordina mejor directamente con Sofía, la dueña. Te comunico ahora mismo. Un momento, por favor.'],
      ['system', 'Transfiriendo al celular de Sofía con el nombre de la persona y el motivo…'],
      ['system', 'Sofía contestó. Llamada transferida.'],
    ], outcome: { type: 'Transferida', detail: 'Boda de 6 personas, pasada a Sofía', summary: 'Gracia quiere organizar el arreglo de una boda de seis personas. Transferida a Sofía con el contexto de la llamada.' } },
    message: { label: 'Recado fuera de horario', icon: 'moon', caller: 'Marco T. · +1 555 0990', lines: [
      ['ai', 'Gracias por llamar a Salón Flor, habla Mía. En este momento el salón está cerrado, pero puedo agendar citas o tomar un recado. ¿En qué puedo ayudarte?'],
      ['caller', 'Me hice un color la semana pasada y tengo una duda sobre los productos que usaron.'],
      ['ai', 'Quiero asegurarme de que recibas la respuesta correcta, así que se lo paso a tu estilista. ¿Qué día viniste, y el 555 0990 es el mejor número para regresarte la llamada?'],
      ['caller', 'El jueves pasado, con Sofía. Sí, ese número está bien.'],
      ['ai', 'Gracias, Marco. Sofía te llama mañana por la mañana cuando abrimos a las 9. ¿Algo más?'],
      ['caller', 'No, eso es todo.'],
      ['ai', 'Buenas noches, Marco.'],
    ], outcome: { type: 'Recado', detail: 'Duda sobre productos de color', summary: 'Recado de Marco T.: duda sobre los productos del color que se hizo el jueves pasado con Sofía. Pide que le regresen la llamada al 555 0990 mañana por la mañana.' } },
  };

  /* ---------- simulador de llamadas ---------- */
  let timer = null, seconds = 0;
  const sim = $('#call-sim');
  const renderIdle = () => {
    sim.innerHTML = `<div class="call-idle"><div class="call-ai big">${icon('headset')}</div><b>Lista para contestar</b><p class="muted small">Elige qué quiere la persona que llama y arranca la llamada. Verás la conversación mientras ocurre.</p>
      <div class="scenario-grid" id="scenarios">${Object.entries(SCENARIOS).map(([k, s]) => `<button type="button" class="scenario" data-s="${k}">${icon(s.icon)}<span>${s.label}</span></button>`).join('')}</div></div>`;
    $$('.scenario', sim).forEach((b) => b.addEventListener('click', () => startCall(b.dataset.s)));
  };
  const startCall = (key) => {
    const s = SCENARIOS[key];
    sim.innerHTML = `<div class="call-live"><div class="call-avatar"><i></i><i></i>${icon('user')}</div><b>Llamada entrante</b><small>${s.caller}</small><div class="ring-label">Sonando… la IA contesta antes del segundo timbre</div></div>`;
    setTimeout(() => runCall(s), 1600);
  };
  const runCall = (s) => {
    seconds = 0;
    sim.innerHTML = `<div class="call-live active"><div class="call-head"><div class="call-ai">${icon('headset')}</div><div><b>Mía · Recepcionista IA</b><small>${s.caller}</small></div><b class="call-timer" id="call-timer">00:00</b></div>
      <div class="wave" id="wave">${Array.from({ length: 9 }, (_, i) => `<i style="--i:${i}"></i>`).join('')}</div>
      <div class="transcript" id="transcript"></div>
      <button class="btn btn-danger btn-sm" type="button" id="hangup">${icon('phone-off')}Colgar</button></div>`;
    timer = setInterval(() => { seconds += 1; const t = $('#call-timer'); if (t) t.textContent = `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`; }, 1000);
    const tr = $('#transcript'), wave = $('#wave');
    let i = 0, cancelled = false;
    $('#hangup').addEventListener('click', () => { cancelled = true; endCall(s, true); });
    const next = () => {
      if (cancelled) return;
      if (i >= s.lines.length) { setTimeout(() => endCall(s), 900); return; }
      const [who, text] = s.lines[i++];
      wave.classList.toggle('talking', who === 'ai');
      if (who === 'system') { tr.appendChild(el(`<div class="bub sys">${icon('refresh')}${esc(text)}</div>`)); tr.scrollTop = tr.scrollHeight; setTimeout(next, 1400); return; }
      const typing = el(`<div class="bub ${who === 'ai' ? 'ai' : 'me'} typing"><i></i><i></i><i></i></div>`);
      tr.appendChild(typing); tr.scrollTop = tr.scrollHeight;
      setTimeout(() => { typing.classList.remove('typing'); typing.innerHTML = `<small>${who === 'ai' ? 'Mía' : 'Cliente'}</small>${esc(text)}`; tr.scrollTop = tr.scrollHeight; setTimeout(next, 500 + Math.min(2600, text.length * 32)); }, who === 'ai' ? 700 : 900);
    };
    setTimeout(next, 400);
  };
  const endCall = (s, early = false) => {
    clearInterval(timer);
    const o = s.outcome;
    const dur = `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`;
    if (!early) {
      stats.answered += 1;
      if (o.type === 'Cita') { stats.booked += 1; if (o.appt) appts.push({ ...o.appt, isNew: true }); }
      if (o.type === 'Recado') stats.messages += 1;
      log.unshift({ who: s.caller.split(' ·')[0], outcome: o.type, detail: o.detail, dur, at: time(), isNew: true });
      renderSide();
      toast('Resumen enviado a tu celular', o.summary, 'ok', 'message');
    }
    sim.innerHTML = `<div class="call-ended"><div class="call-ai">${icon('check')}</div><b>Llamada terminada · ${dur}</b>
      ${early ? '<p class="muted small">La llamada terminó antes del resultado. Empieza otra para verla completa.</p>' : `<div class="outcome"><span class="mk-badge ${o.type === 'Cita' ? 'green' : o.type === 'Recado' ? 'amber' : 'blue'}">${o.type}</span><p>${esc(o.summary)}</p></div><div class="sms-preview"><span>${icon('message')}</span><div><b>SMS para ti</b><span>${esc(o.summary)}</span></div></div>`}
      <button class="btn btn-primary" type="button" id="again">${icon('phone')}Atender otra llamada</button></div>`;
    $('#again').addEventListener('click', renderIdle);
  };

  /* ---------- panel ---------- */
  const renderSide = () => {
    $('#ai-kpis').innerHTML = `<div class="kpi-tile"><small>Llamadas contestadas hoy</small><b>${stats.answered}</b><em>0 perdidas</em><span class="ic grad-cyan">${icon('phone')}</span></div><div class="kpi-tile"><small>Citas agendadas</small><b>${stats.booked}</b><em>por la IA</em><span class="ic grad-blue">${icon('calendar')}</span></div><div class="kpi-tile"><small>Recados tomados</small><b>${stats.messages}</b><em class="${stats.messages ? 'warn' : ''}">${stats.messages ? 'por regresar llamada' : 'ninguno pendiente'}</em><span class="ic grad-violet">${icon('message')}</span></div><div class="kpi-tile"><small>Tiempo promedio en contestar</small><b>1.8 s</b><em>antes del segundo timbre</em><span class="ic grad-indigo">${icon('zap')}</span></div>`;
    $('#cal').innerHTML = DAYS.map((d, di) => `<div class="cal-col"><div class="cal-day">${d}</div>${SLOTS.map((t) => { const a = appts.find((x) => x.day === di && x.time === t); return a ? `<div class="cal-slot booked ${a.isNew ? 'new' : ''}" title="${esc(a.name)} · ${esc(a.service)}"><b>${t}</b><span>${esc(a.name)}</span><small>${esc(a.service)}</small></div>` : `<div class="cal-slot"><b>${t}</b></div>`; }).join('')}</div>`).join('');
    $('#call-log').innerHTML = log.map((l) => `<div class="list-row ${l.isNew ? 'new' : ''}"><span class="avatar sm ${{ Cita: 'c2', Respondida: 'c0', Recado: 'c5', Transferida: 'c3', Reagendada: 'c1' }[l.outcome] || 'c0'}">${icon('phone')}</span><div class="grow"><b>${esc(l.who)}</b><small>${esc(l.detail)} · ${l.dur} · ${l.at}</small></div><span class="mk-badge ${l.outcome === 'Cita' ? 'green' : l.outcome === 'Recado' ? 'amber' : 'blue'}">${l.outcome}</span><button class="btn btn-ghost btn-xs" type="button" data-transcript="${esc(l.who)}">Transcripción</button></div>`).join('');
    $$('#call-log [data-transcript]').forEach((b) => b.addEventListener('click', () => modal.open(`<h2>Transcripción · ${b.dataset.transcript}</h2><p class="muted small" style="margin-bottom:1rem">Cada llamada queda escrita en tu panel local para que la leas cuando quieras.</p><div class="transcript static">${(SCENARIOS.book.lines.slice(0, 5)).map(([w, t]) => `<div class="bub ${w === 'ai' ? 'ai' : 'me'}"><small>${w === 'ai' ? 'Mía' : 'Cliente'}</small>${esc(t)}</div>`).join('')}</div>`)));
    appts.forEach((a) => { a.isNew = false; }); log.forEach((l) => { l.isNew = false; });
  };

  /* ---------- chat escrito ---------- */
  const chat = $('#chat');
  let pendingBooking = null;
  const say = (who, text) => { const b = el(`<div class="bub ${who}"><small>${who === 'ai' ? 'Mía' : 'Tú'}</small>${text}</div>`); chat.appendChild(b); chat.scrollTop = chat.scrollHeight; };
  const norm = (t) => t.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
  const answer = (q) => {
    const t = norm(q);
    const has = (...w) => w.some((x) => t.includes(x));
    if (pendingBooking) {
      const dayIdx = ['martes', 'miercoles', 'jueves', 'viernes', 'sabado'].findIndex((d) => t.includes(d));
      const m = t.match(/(\d{1,2})\s*(?::(\d{2}))?\s*(am|pm|de la tarde|de la manana)?/);
      let slot = null;
      if (m) { let h = parseInt(m[1], 10); if ((m[2] === undefined || true) && (m[3] === 'pm' || m[3] === 'de la tarde') && h < 12) h += 12; if (!m[3] && h < 9) h += 12; slot = SLOTS.find((s) => parseInt(s, 10) === h) || null; }
      if (dayIdx >= 0 || slot) {
        const day = dayIdx >= 0 ? dayIdx : (pendingBooking.day ?? 0);
        const free = SLOTS.filter((s) => !appts.find((a) => a.day === day && a.time === s));
        const chosen = slot && free.includes(slot) ? slot : free[0];
        const service = pendingBooking.service;
        appts.push({ day, time: chosen, name: 'Tú', service, isNew: true }); stats.booked += 1; renderSide(); pendingBooking = null;
        return `Listo. Tu ${service.toLowerCase()} queda agendado el ${['martes', 'miércoles', 'jueves', 'viernes', 'sábado'][day]} a las ${chosen}. Ya lo agregué al calendario de la derecha y recibirías un SMS de confirmación ahora mismo. ¿Algo más?`;
      }
      return `¿Qué día te conviene? Abrimos de martes a sábado, de 9 am a 6 pm.`;
    }
    if (has('abren', 'horario', 'hora', 'cierran', 'domingo', 'lunes', 'cuando')) return 'Abrimos de martes a sábado, de 9 de la mañana a 6 de la tarde. Domingos y lunes estamos cerrados. ¿Quieres que te agende una visita?';
    if (has('precio', 'cuesta', 'cuanto', 'costo', '$')) return 'Nuestros precios: corte $45 (45 min), color desde $120 (unas 2 horas), secado $35 (30 min) y arreglo de barba $20 (20 min). ¿Reviso disponibilidad para ti?';
    if (has('cita', 'agendar', 'reservar', 'corte', 'color', 'tinte', 'secado', 'barba', 'disponible', 'disponibilidad', 'espacio')) {
      const service = has('color', 'tinte') ? 'Color' : has('secado') ? 'Secado' : has('barba') ? 'Barba' : 'Corte';
      pendingBooking = { service };
      return `Con gusto te agendo un ${service.toLowerCase()}. ¿Qué día y hora te convienen? Por ejemplo: "jueves a las 3 pm". Abrimos de martes a sábado, de 9 am a 6 pm.`;
    }
    if (has('estacion', 'donde', 'direccion', 'ubicad', 'llegar', 'quedan')) return 'Estamos en la calle Harbour 12, junto a la panadería. Hay estacionamiento gratis por dos horas en la calle Harbour, justo detrás del salón.';
    if (has('persona', 'alguien', 'humano', 'gerente', 'duena', 'hablar con', 'sofia')) return 'Claro. Te comunico con Sofía ahora mismo y le paso lo que me contaste. Si está con una clienta, tomo el recado y ella te regresa la llamada.';
    if (has('cancelar', 'reagendar', 'mover', 'cambiar')) return 'Sin problema. ¿Me das el nombre con el que está la cita y el día? La cancelo o la muevo y te envío la confirmación.';
    if (has('gracias', 'adios', 'genial', 'perfecto')) return '¡Con gusto! Que tengas un lindo día.';
    if (has('hola', 'buenas', 'buenos')) return '¡Hola! Habla Mía, de Salón Flor. Puedo agendar citas, responder sobre precios y horarios, o tomar un recado. ¿En qué te ayudo?';
    return 'Quiero asegurarme de que recibas la respuesta correcta, así que tomaré un recado para el equipo. ¿Me das tu nombre y el mejor número para regresarte la llamada?';
  };
  $('#chat-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const input = $('#chat-input'); const q = input.value.trim(); if (!q) return;
    say('me', esc(q)); input.value = '';
    const typing = el('<div class="bub ai typing"><i></i><i></i><i></i></div>'); chat.appendChild(typing); chat.scrollTop = chat.scrollHeight;
    setTimeout(() => { typing.remove(); say('ai', answer(q)); }, 800);
  });
  const chips = ['¿Abren los domingos?', '¿Cuánto cuesta un corte?', 'Quiero un color el jueves', '¿Dónde me estaciono?', '¿Puedo hablar con Sofía?'];
  $('#chat-chips').innerHTML = chips.map((c) => `<button type="button" class="chip" style="cursor:pointer">${c}</button>`).join('');
  $$('#chat-chips .chip').forEach((b) => b.addEventListener('click', () => { $('#chat-input').value = b.textContent; $('#chat-form').requestSubmit(); }));
  say('ai', '¡Hola! Soy Mía, la recepcionista con IA de Salón Flor. Pregúntame lo que preguntaría cualquier cliente.');

  renderIdle(); renderSide();

  /* ---------- guía ---------- */
  tour.auto([
    { title: 'Así contesta tu recepcionista con IA', text: 'Cada llamada a tu número la atiende Mía: responde preguntas, agenda citas y toma recados. Vamos a ver una llamada real de principio a fin.' },
    { target: '#scenarios', title: 'Paso 1 · Elige qué quiere la persona que llama', text: 'Toca <b>Agendar una cita</b> y observa la conversación. La IA contesta antes del segundo timbre y habla con naturalidad.', action: 'Toca un escenario para empezar la llamada', advanceOn: '.scenario', delay: 2200 },
    { target: '#call-panel', title: 'Paso 2 · La conversación en vivo', text: 'Lee la transcripción mientras pasa. Cuando termine la llamada, verás el resultado y el resumen que te llegaría al celular.', action: 'Espera a que termine la llamada' },
    { target: '#cal-panel', title: 'Paso 3 · La cita cae en tu calendario', text: 'Si la persona agendó, la cita aparece resaltada aquí, sin que nadie la escriba a mano. Es el mismo calendario que usa tu equipo.' },
    { target: '#log-panel', title: 'Paso 4 · Todo queda registrado', text: 'Cada llamada aparece con su resultado, duración y transcripción completa, en el panel de tu local.' },
    { target: '#chat-panel', title: 'Paso 5 · Pregúntale lo que quieras', text: 'Escribe como lo haría un cliente: horarios, precios, ubicación o "quiero una cita el jueves a las 3". Esta es la misma asistente, en versión escrita.', action: 'Prueba una de las preguntas sugeridas' },
    { title: 'Eso es todo', text: 'Ninguna llamada perdida, citas agendadas solas y un resumen en tu celular. Repite la guía cuando quieras con "Ver guía paso a paso".' },
  ], { key: 'receptionist' });
})();
