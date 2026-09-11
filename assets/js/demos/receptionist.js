(() => {
  const { $, $$, toast, modal, icon, el, time, esc, tour, x } = window.Demo;

  const DAYS = x(['Mar', 'Mié', 'Jue', 'Vie', 'Sáb'], ['Tue', 'Wed', 'Thu', 'Fri', 'Sat']);
  const DAY_LONG = x(['martes', 'miércoles', 'jueves', 'viernes', 'sábado'], ['Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']);
  const SLOTS = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'];
  const S = { color: x('Color', 'Colour'), cut: x('Corte', 'Haircut'), blow: x('Secado', 'Blow-dry'), beard: x('Barba', 'Beard'), cutbeard: x('Corte + barba', 'Haircut + beard') };
  const appts = [
    { day: 0, time: '10:00', name: 'Priya S.', service: S.color }, { day: 0, time: '15:00', name: 'Tomás R.', service: S.cut },
    { day: 1, time: '09:00', name: 'Hanna K.', service: S.blow }, { day: 1, time: '13:00', name: 'Marcos D.', service: S.beard }, { day: 1, time: '16:00', name: 'Lea B.', service: S.cut },
    { day: 2, time: '11:00', name: 'Olivia M.', service: S.color }, { day: 2, time: '14:00', name: 'Jonás F.', service: S.cut },
    { day: 3, time: '10:00', name: 'Ana N.', service: S.cut }, { day: 3, time: '12:00', name: 'Sara P.', service: S.blow }, { day: 3, time: '17:00', name: 'Beto C.', service: S.cut },
    { day: 4, time: '09:00', name: 'Mía L.', service: S.color }, { day: 4, time: '13:00', name: 'Noé W.', service: S.beard },
  ];
  const OUT = { booking: x('Cita', 'Booking'), answered: x('Respondida', 'Answered'), message: x('Recado', 'Message'), transferred: x('Transferida', 'Transferred'), rescheduled: x('Reagendada', 'Rescheduled') };
  const log = [
    { who: 'Priya S.', outcome: 'booking', detail: x('Color, mar 10:00', 'Colour, Tue 10:00'), dur: '2:14', at: '08:41' },
    { who: x('Desconocido', 'Unknown'), outcome: 'answered', detail: x('Horarios y estacionamiento', 'Hours and parking'), dur: '0:41', at: '09:12' },
    { who: 'Marco T.', outcome: 'message', detail: x('Quiere que le regresen la llamada por un color', 'Wants a call back about a colour'), dur: '1:05', at: '09:58' },
    { who: 'Sara P.', outcome: 'rescheduled', detail: x('Secado movido al vie 12:00', 'Blow-dry moved to Fri 12:00'), dur: '1:32', at: '10:20' },
  ];
  const stats = { answered: 4, booked: 2, messages: 1 };
  const GREET = x('Gracias por llamar a Salón Flor, habla Mía. ¿En qué puedo ayudarte?', 'Thanks for calling Salón Flor, this is Mía. How can I help you?');

  const SCENARIOS = {
    book: { label: x('Agendar una cita', 'Book an appointment'), icon: 'calendar', caller: 'Emma W. · +1 555 0134', lines: [
      ['ai', x('Gracias por llamar a Salón Flor, habla Mía, la asistente del salón. ¿En qué puedo ayudarte?', 'Thanks for calling Salón Flor, this is Mía, the salon assistant. How can I help you?')],
      ['caller', x('Hola, quisiera agendar un corte el martes por la tarde.', 'Hi, I would like to book a haircut on Tuesday afternoon.')],
      ['ai', x('Claro. El martes tengo a las 2:00 pm y a las 4:00 pm con Sofía. ¿Cuál te conviene?', 'Of course. On Tuesday I have 2:00 pm and 4:00 pm with Sofía. Which works for you?')],
      ['caller', x('A las 2 está bien.', '2 pm is fine.')],
      ['ai', x('Perfecto. ¿Me das tu nombre y un celular para enviarte la confirmación?', 'Perfect. Can I get your name and a mobile number to send the confirmation?')],
      ['caller', 'Emma Walsh, 555 0134.'],
      ['ai', x('Gracias, Emma. Quedas agendada para un corte el martes a las 2:00 pm con Sofía. Te acabo de enviar la confirmación por SMS. ¿Algo más en lo que pueda ayudarte?', 'Thanks, Emma. You are booked for a haircut on Tuesday at 2:00 pm with Sofía. I just texted you the confirmation. Anything else I can help with?')],
      ['caller', x('No, eso es todo. ¡Gracias!', 'No, that is all. Thanks!')],
      ['ai', x('Con gusto, Emma. ¡Nos vemos el martes!', 'My pleasure, Emma. See you on Tuesday!')],
    ], outcome: { type: 'booking', detail: x('Corte, mar 14:00 con Sofía', 'Haircut, Tue 14:00 with Sofía'), appt: { day: 0, time: '14:00', name: 'Emma W.', service: S.cut }, summary: x('Nueva cita: Emma Walsh, corte, martes 2:00 pm con Sofía. SMS de confirmación enviado a la clienta.', 'New booking: Emma Walsh, haircut, Tuesday 2:00 pm with Sofía. Confirmation text sent to the client.') } },
    hours: { label: x('Preguntar el horario', 'Ask about hours'), icon: 'clock', caller: x('Número desconocido', 'Unknown number'), lines: [
      ['ai', GREET],
      ['caller', x('Hola, ¿abren los domingos? ¿Y hay dónde estacionarse?', 'Hi, are you open on Sundays? And is there parking?')],
      ['ai', x('Los domingos y lunes estamos cerrados. Abrimos de martes a sábado, de 9 de la mañana a 6 de la tarde. Hay estacionamiento gratis por dos horas en la calle Harbour, justo detrás del salón.', 'We are closed on Sundays and Mondays. We are open Tuesday to Saturday, 9 am to 6 pm. There is free two-hour parking on Harbour Street, right behind the salon.')],
      ['caller', x('Perfecto, gracias.', 'Perfect, thanks.')],
      ['ai', x('Con mucho gusto. ¿Quieres que te agende una visita mientras estás en la línea?', 'You are welcome. Would you like me to book you a visit while you are on the line?')],
      ['caller', x('Hoy no, gracias. ¡Adiós!', 'Not today, thanks. Bye!')],
      ['ai', x('Que tengas un lindo día. ¡Adiós!', 'Have a lovely day. Bye!')],
    ], outcome: { type: 'answered', detail: x('Horarios y estacionamiento', 'Hours and parking'), summary: x('La persona preguntó si abren los domingos y por el estacionamiento. Respondido con la información de tu negocio. No requiere acción.', 'The caller asked about Sunday hours and parking. Answered with your business information. No action needed.') } },
    price: { label: x('Preguntar un precio', 'Ask a price'), icon: 'dollar', caller: 'Daniel · +1 555 0177', lines: [
      ['ai', GREET],
      ['caller', x('¿Cuánto cuesta un corte de caballero con arreglo de barba?', 'How much is a men\'s haircut with a beard trim?')],
      ['ai', x('El corte cuesta $45 y el arreglo de barba $20. Juntos toman más o menos una hora. ¿Quieres que revise disponibilidad?', 'The haircut is $45 and the beard trim is $20. Together they take about an hour. Would you like me to check availability?')],
      ['caller', x('Sí, ¿tienen algo el sábado por la mañana?', 'Yes, do you have anything on Saturday morning?')],
      ['ai', x('El sábado tengo a las 10 y a las 11 de la mañana libres. ¿Te agendo una?', 'On Saturday I have 10 am and 11 am open. Shall I book one for you?')],
      ['caller', x('A las 11, por favor. Soy Daniel.', '11 am, please. It is Daniel.')],
      ['ai', x('Listo, Daniel. Corte y barba el sábado a las 11 de la mañana. Te llega la confirmación por SMS ahora mismo. ¡Nos vemos el sábado!', 'Done, Daniel. Haircut and beard on Saturday at 11 am. The confirmation is on its way by text. See you Saturday!')],
    ], outcome: { type: 'booking', detail: x('Corte + barba, sáb 11:00', 'Haircut + beard, Sat 11:00'), appt: { day: 4, time: '11:00', name: 'Daniel', service: S.cutbeard }, summary: x('Daniel preguntó precios y agendó corte con arreglo de barba para el sábado a las 11:00. SMS de confirmación enviado.', 'Daniel asked about prices and booked a haircut with beard trim for Saturday at 11:00. Confirmation text sent.') } },
    human: { label: x('Hablar con una persona', 'Talk to a person'), icon: 'users', caller: 'Gracia · +1 555 0190', lines: [
      ['ai', GREET],
      ['caller', x('Estoy organizando el arreglo para una boda de seis personas y quisiera hablar con alguien.', 'I am organizing hair for a wedding party of six and I would like to speak with someone.')],
      ['ai', x('¡Felicidades! Eso se coordina mejor directamente con Sofía, la dueña. Te comunico ahora mismo. Un momento, por favor.', 'Congratulations! That is best arranged directly with Sofía, the owner. I will put you through now. One moment, please.')],
      ['system', x('Transfiriendo al celular de Sofía con el nombre de la persona y el motivo…', 'Transferring to Sofía\'s mobile with the caller\'s name and reason…')],
      ['system', x('Sofía contestó. Llamada transferida.', 'Sofía answered. Call transferred.')],
    ], outcome: { type: 'transferred', detail: x('Boda de 6 personas, pasada a Sofía', 'Wedding party of 6, passed to Sofía'), summary: x('Gracia quiere organizar el arreglo de una boda de seis personas. Transferida a Sofía con el contexto de la llamada.', 'Gracia wants to arrange hair for a wedding party of six. Transferred to Sofía with the call context.') } },
    message: { label: x('Recado fuera de horario', 'After-hours message'), icon: 'moon', caller: 'Marco T. · +1 555 0990', lines: [
      ['ai', x('Gracias por llamar a Salón Flor, habla Mía. En este momento el salón está cerrado, pero puedo agendar citas o tomar un recado. ¿En qué puedo ayudarte?', 'Thanks for calling Salón Flor, this is Mía. The salon is closed right now, but I can book appointments or take a message. How can I help?')],
      ['caller', x('Me hice un color la semana pasada y tengo una duda sobre los productos que usaron.', 'I had a colour done last week and I have a question about the products you used.')],
      ['ai', x('Quiero asegurarme de que recibas la respuesta correcta, así que se lo paso a tu estilista. ¿Qué día viniste, y el 555 0990 es el mejor número para regresarte la llamada?', 'I want to make sure you get the right answer, so I will pass it to your stylist. What day did you come in, and is 555 0990 the best number to call you back?')],
      ['caller', x('El jueves pasado, con Sofía. Sí, ese número está bien.', 'Last Thursday, with Sofía. Yes, that number is fine.')],
      ['ai', x('Gracias, Marco. Sofía te llama mañana por la mañana cuando abrimos a las 9. ¿Algo más?', 'Thanks, Marco. Sofía will call you tomorrow morning when we open at 9. Anything else?')],
      ['caller', x('No, eso es todo.', 'No, that is all.')],
      ['ai', x('Buenas noches, Marco.', 'Good night, Marco.')],
    ], outcome: { type: 'message', detail: x('Duda sobre productos de color', 'Question about colour products'), summary: x('Recado de Marco T.: duda sobre los productos del color que se hizo el jueves pasado con Sofía. Pide que le regresen la llamada al 555 0990 mañana por la mañana.', 'Message from Marco T.: question about the products used for his colour last Thursday with Sofía. Asks for a call back at 555 0990 tomorrow morning.') } },
  };

  /* ---------- call simulator ---------- */
  let timer = null, seconds = 0;
  const sim = $('#call-sim');
  const renderIdle = () => {
    sim.innerHTML = `<div class="call-idle"><div class="call-ai big">${icon('headset')}</div><b>${x('Lista para contestar', 'Ready to answer')}</b><p class="muted small">${x('Elige qué quiere la persona que llama y arranca la llamada. Verás la conversación mientras ocurre.', 'Choose what the caller wants and start the call. You will see the conversation as it happens.')}</p>
      <div class="scenario-grid" id="scenarios">${Object.entries(SCENARIOS).map(([k, s]) => `<button type="button" class="scenario" data-s="${k}">${icon(s.icon)}<span>${s.label}</span></button>`).join('')}</div></div>`;
    $$('.scenario', sim).forEach((b) => b.addEventListener('click', () => startCall(b.dataset.s)));
  };
  const startCall = (key) => {
    const s = SCENARIOS[key];
    sim.innerHTML = `<div class="call-live"><div class="call-avatar"><i></i><i></i>${icon('user')}</div><b>${x('Llamada entrante', 'Incoming call')}</b><small>${s.caller}</small><div class="ring-label">${x('Sonando… la IA contesta antes del segundo timbre', 'Ringing… the AI answers before the second ring')}</div></div>`;
    setTimeout(() => runCall(s), 1600);
  };
  const runCall = (s) => {
    seconds = 0;
    sim.innerHTML = `<div class="call-live active"><div class="call-head"><div class="call-ai">${icon('headset')}</div><div><b>Mía · ${x('Recepcionista IA', 'AI receptionist')}</b><small>${s.caller}</small></div><b class="call-timer" id="call-timer">00:00</b></div>
      <div class="wave" id="wave">${Array.from({ length: 9 }, (_, i) => `<i style="--i:${i}"></i>`).join('')}</div>
      <div class="transcript" id="transcript"></div>
      <button class="btn btn-danger btn-sm" type="button" id="hangup">${icon('phone-off')}${x('Colgar', 'Hang up')}</button></div>`;
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
      setTimeout(() => { typing.classList.remove('typing'); typing.innerHTML = `<small>${who === 'ai' ? 'Mía' : x('Cliente', 'Caller')}</small>${esc(text)}`; tr.scrollTop = tr.scrollHeight; setTimeout(next, 500 + Math.min(2600, text.length * 32)); }, who === 'ai' ? 700 : 900);
    };
    setTimeout(next, 400);
  };
  const endCall = (s, early = false) => {
    clearInterval(timer);
    const o = s.outcome;
    const dur = `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`;
    if (!early) {
      stats.answered += 1;
      if (o.type === 'booking') { stats.booked += 1; if (o.appt) appts.push({ ...o.appt, isNew: true }); }
      if (o.type === 'message') stats.messages += 1;
      log.unshift({ who: s.caller.split(' ·')[0], outcome: o.type, detail: o.detail, dur, at: time(), isNew: true });
      renderSide();
      toast(x('Resumen enviado a tu celular', 'Summary sent to your phone'), o.summary, 'ok', 'message');
    }
    sim.innerHTML = `<div class="call-ended"><div class="call-ai">${icon('check')}</div><b>${x('Llamada terminada', 'Call ended')} · ${dur}</b>
      ${early ? `<p class="muted small">${x('La llamada terminó antes del resultado. Empieza otra para verla completa.', 'The call ended before the outcome. Start another one to see it in full.')}</p>` : `<div class="outcome"><span class="mk-badge ${o.type === 'booking' ? 'green' : o.type === 'message' ? 'amber' : 'blue'}">${OUT[o.type]}</span><p>${esc(o.summary)}</p></div><div class="sms-preview"><span>${icon('message')}</span><div><b>${x('SMS para ti', 'Text to you')}</b><span>${esc(o.summary)}</span></div></div>`}
      <button class="btn btn-primary" type="button" id="again">${icon('phone')}${x('Atender otra llamada', 'Take another call')}</button></div>`;
    $('#again').addEventListener('click', renderIdle);
  };

  /* ---------- side panel ---------- */
  const renderSide = () => {
    $('#ai-kpis').innerHTML = `<div class="kpi-tile"><small>${x('Llamadas contestadas hoy', 'Calls answered today')}</small><b>${stats.answered}</b><em>${x('0 perdidas', '0 missed')}</em><span class="ic grad-cyan">${icon('phone')}</span></div><div class="kpi-tile"><small>${x('Citas agendadas', 'Appointments booked')}</small><b>${stats.booked}</b><em>${x('por la IA', 'by the AI')}</em><span class="ic grad-blue">${icon('calendar')}</span></div><div class="kpi-tile"><small>${x('Recados tomados', 'Messages taken')}</small><b>${stats.messages}</b><em class="${stats.messages ? 'warn' : ''}">${stats.messages ? x('por regresar llamada', 'to call back') : x('ninguno pendiente', 'none pending')}</em><span class="ic grad-violet">${icon('message')}</span></div><div class="kpi-tile"><small>${x('Tiempo promedio en contestar', 'Average time to answer')}</small><b>1.8 s</b><em>${x('antes del segundo timbre', 'before the second ring')}</em><span class="ic grad-indigo">${icon('zap')}</span></div>`;
    $('#cal').innerHTML = DAYS.map((d, di) => `<div class="cal-col"><div class="cal-day">${d}</div>${SLOTS.map((t) => { const a = appts.find((y) => y.day === di && y.time === t); return a ? `<div class="cal-slot booked ${a.isNew ? 'new' : ''}" title="${esc(a.name)} · ${esc(a.service)}"><b>${t}</b><span>${esc(a.name)}</span><small>${esc(a.service)}</small></div>` : `<div class="cal-slot"><b>${t}</b></div>`; }).join('')}</div>`).join('');
    $('#call-log').innerHTML = log.map((l) => `<div class="list-row ${l.isNew ? 'new' : ''}"><span class="avatar sm ${{ booking: 'c2', answered: 'c0', message: 'c5', transferred: 'c3', rescheduled: 'c1' }[l.outcome] || 'c0'}">${icon('phone')}</span><div class="grow"><b>${esc(l.who)}</b><small>${esc(l.detail)} · ${l.dur} · ${l.at}</small></div><span class="mk-badge ${l.outcome === 'booking' ? 'green' : l.outcome === 'message' ? 'amber' : 'blue'}">${OUT[l.outcome]}</span><button class="btn btn-ghost btn-xs" type="button" data-transcript="${esc(l.who)}">${x('Transcripción', 'Transcript')}</button></div>`).join('');
    $$('#call-log [data-transcript]').forEach((b) => b.addEventListener('click', () => modal.open(`<h2>${x('Transcripción', 'Transcript')} · ${b.dataset.transcript}</h2><p class="muted small" style="margin-bottom:1rem">${x('Cada llamada queda escrita en tu panel local para que la leas cuando quieras.', 'Every call is written down in your local dashboard so you can read it whenever you like.')}</p><div class="transcript static">${(SCENARIOS.book.lines.slice(0, 5)).map(([w, t]) => `<div class="bub ${w === 'ai' ? 'ai' : 'me'}"><small>${w === 'ai' ? 'Mía' : x('Cliente', 'Caller')}</small>${esc(t)}</div>`).join('')}</div>`)));
    appts.forEach((a) => { a.isNew = false; }); log.forEach((l) => { l.isNew = false; });
  };

  /* ---------- written chat ---------- */
  const chat = $('#chat');
  let pendingBooking = null;
  const say = (who, text) => { const b = el(`<div class="bub ${who}"><small>${who === 'ai' ? 'Mía' : x('Tú', 'You')}</small>${text}</div>`); chat.appendChild(b); chat.scrollTop = chat.scrollHeight; };
  const norm = (t) => t.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
  const DAY_KEYS = ['martes', 'miercoles', 'jueves', 'viernes', 'sabado', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  const answer = (q) => {
    const t = norm(q);
    const has = (...w) => w.some((y) => t.includes(y));
    if (pendingBooking) {
      const dayIdx = DAY_KEYS.findIndex((d) => t.includes(d)) % 5;
      const m = t.match(/(\d{1,2})\s*(?::(\d{2}))?\s*(am|pm|de la tarde|de la manana|in the afternoon|in the morning)?/);
      let slot = null;
      if (m) { let h = parseInt(m[1], 10); if ((m[3] === 'pm' || m[3] === 'de la tarde' || m[3] === 'in the afternoon') && h < 12) h += 12; if (!m[3] && h < 9) h += 12; slot = SLOTS.find((s) => parseInt(s, 10) === h) || null; }
      if (dayIdx >= 0 || slot) {
        const day = dayIdx >= 0 ? dayIdx : (pendingBooking.day ?? 0);
        const free = SLOTS.filter((s) => !appts.find((a) => a.day === day && a.time === s));
        const chosen = slot && free.includes(slot) ? slot : free[0];
        const service = pendingBooking.service;
        appts.push({ day, time: chosen, name: x('Tú', 'You'), service, isNew: true }); stats.booked += 1; renderSide(); pendingBooking = null;
        return x(`Listo. Tu ${service.toLowerCase()} queda agendado el ${DAY_LONG[day]} a las ${chosen}. Ya lo agregué al calendario de la derecha y recibirías un SMS de confirmación ahora mismo. ¿Algo más?`, `Done. Your ${service.toLowerCase()} is booked for ${DAY_LONG[day]} at ${chosen}. I have added it to the calendar on the right and you would get a confirmation text right now. Anything else?`);
      }
      return x('¿Qué día te conviene? Abrimos de martes a sábado, de 9 am a 6 pm.', 'Which day works for you? We are open Tuesday to Saturday, 9 am to 6 pm.');
    }
    if (has('abren', 'horario', 'hora', 'cierran', 'domingo', 'lunes', 'cuando', 'open', 'hours', 'sunday', 'monday', 'close', 'when')) return x('Abrimos de martes a sábado, de 9 de la mañana a 6 de la tarde. Domingos y lunes estamos cerrados. ¿Quieres que te agende una visita?', 'We are open Tuesday to Saturday, 9 am to 6 pm. We are closed on Sundays and Mondays. Would you like me to book you a visit?');
    if (has('precio', 'cuesta', 'cuanto', 'costo', '$', 'price', 'cost', 'how much')) return x('Nuestros precios: corte $45 (45 min), color desde $120 (unas 2 horas), secado $35 (30 min) y arreglo de barba $20 (20 min). ¿Reviso disponibilidad para ti?', 'Our prices: haircut $45 (45 min), colour from $120 (about 2 hours), blow-dry $35 (30 min) and beard trim $20 (20 min). Shall I check availability for you?');
    if (has('cita', 'agendar', 'reservar', 'corte', 'color', 'tinte', 'secado', 'barba', 'disponible', 'disponibilidad', 'espacio', 'appointment', 'book', 'haircut', 'colour', 'blow', 'beard', 'available', 'availability', 'slot')) {
      const service = has('color', 'tinte', 'colour') ? S.color : has('secado', 'blow') ? S.blow : has('barba', 'beard') ? S.beard : S.cut;
      pendingBooking = { service };
      return x(`Con gusto te agendo un ${service.toLowerCase()}. ¿Qué día y hora te convienen? Por ejemplo: "jueves a las 3 pm". Abrimos de martes a sábado, de 9 am a 6 pm.`, `Happy to book a ${service.toLowerCase()} for you. Which day and time work? For example: "Thursday at 3 pm". We are open Tuesday to Saturday, 9 am to 6 pm.`);
    }
    if (has('estacion', 'donde', 'direccion', 'ubicad', 'llegar', 'quedan', 'park', 'where', 'address', 'located', 'directions')) return x('Estamos en la calle Harbour 12, junto a la panadería. Hay estacionamiento gratis por dos horas en la calle Harbour, justo detrás del salón.', 'We are at 12 Harbour Street, next to the bakery. There is free two-hour parking on Harbour Street, right behind the salon.');
    if (has('persona', 'alguien', 'humano', 'gerente', 'duena', 'hablar con', 'sofia', 'person', 'someone', 'human', 'manager', 'owner', 'speak', 'talk to')) return x('Claro. Te comunico con Sofía ahora mismo y le paso lo que me contaste. Si está con una clienta, tomo el recado y ella te regresa la llamada.', 'Of course. I will connect you with Sofía right now and pass along what you told me. If she is with a client, I will take a message and she will call you back.');
    if (has('cancelar', 'reagendar', 'mover', 'cambiar', 'cancel', 'reschedule', 'move', 'change')) return x('Sin problema. ¿Me das el nombre con el que está la cita y el día? La cancelo o la muevo y te envío la confirmación.', 'No problem. Can I get the name on the booking and the day? I will cancel or move it and send you a confirmation.');
    if (has('gracias', 'adios', 'genial', 'perfecto', 'thanks', 'thank', 'bye', 'great', 'perfect')) return x('¡Con gusto! Que tengas un lindo día.', 'You are welcome! Have a lovely day.');
    if (has('hola', 'buenas', 'buenos', 'hello', 'hi ', 'hey')) return x('¡Hola! Habla Mía, de Salón Flor. Puedo agendar citas, responder sobre precios y horarios, o tomar un recado. ¿En qué te ayudo?', 'Hello! This is Mía from Salón Flor. I can book appointments, answer questions about prices and hours, or take a message. How can I help?');
    return x('Quiero asegurarme de que recibas la respuesta correcta, así que tomaré un recado para el equipo. ¿Me das tu nombre y el mejor número para regresarte la llamada?', 'I want to make sure you get the right answer, so I will take a message for the team. Can I get your name and the best number to call you back?');
  };
  $('#chat-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const input = $('#chat-input'); const q = input.value.trim(); if (!q) return;
    say('me', esc(q)); input.value = '';
    const typing = el('<div class="bub ai typing"><i></i><i></i><i></i></div>'); chat.appendChild(typing); chat.scrollTop = chat.scrollHeight;
    setTimeout(() => { typing.remove(); say('ai', answer(q)); }, 800);
  });
  const chips = x(['¿Abren los domingos?', '¿Cuánto cuesta un corte?', 'Quiero un color el jueves', '¿Dónde me estaciono?', '¿Puedo hablar con Sofía?'], ['Are you open on Sundays?', 'How much is a haircut?', 'I want a colour on Thursday', 'Where do I park?', 'Can I speak with Sofía?']);
  $('#chat-chips').innerHTML = chips.map((c) => `<button type="button" class="chip" style="cursor:pointer">${c}</button>`).join('');
  $$('#chat-chips .chip').forEach((b) => b.addEventListener('click', () => { $('#chat-input').value = b.textContent; $('#chat-form').requestSubmit(); }));
  say('ai', x('¡Hola! Soy Mía, la recepcionista con IA de Salón Flor. Pregúntame lo que preguntaría cualquier cliente.', 'Hello! I am Mía, the AI receptionist at Salón Flor. Ask me anything a customer would ask.'));

  renderIdle(); renderSide();

  /* ---------- guide ---------- */
  tour.auto([
    { title: x('Así contesta tu recepcionista con IA', 'This is how your AI receptionist answers'), text: x('Cada llamada a tu número la atiende Mía: responde preguntas, agenda citas y toma recados. Vamos a ver una llamada real de principio a fin.', 'Every call to your number is handled by Mía: she answers questions, books appointments and takes messages. Let\'s watch a real call from start to finish.') },
    { target: '#scenarios', title: x('Paso 1 · Elige qué quiere la persona que llama', 'Step 1 · Choose what the caller wants'), text: x('Toca <b>Agendar una cita</b> y observa la conversación. La IA contesta antes del segundo timbre y habla con naturalidad.', 'Tap <b>Book an appointment</b> and watch the conversation. The AI answers before the second ring and speaks naturally.'), action: x('Toca un escenario para empezar la llamada', 'Tap a scenario to start the call'), advanceOn: '.scenario', delay: 2200 },
    { target: '#call-panel', title: x('Paso 2 · La conversación en vivo', 'Step 2 · The live conversation'), text: x('Lee la transcripción mientras pasa. Cuando termine la llamada, verás el resultado y el resumen que te llegaría al celular.', 'Read the transcript as it happens. When the call ends you will see the outcome and the summary you would get on your phone.'), action: x('Espera a que termine la llamada', 'Wait for the call to end') },
    { target: '#cal-panel', title: x('Paso 3 · La cita cae en tu calendario', 'Step 3 · The booking lands in your calendar'), text: x('Si la persona agendó, la cita aparece resaltada aquí, sin que nadie la escriba a mano. Es el mismo calendario que usa tu equipo.', 'If the caller booked, the appointment shows up highlighted here without anyone writing it down. It is the same calendar your team uses.') },
    { target: '#log-panel', title: x('Paso 4 · Todo queda registrado', 'Step 4 · Everything is logged'), text: x('Cada llamada aparece con su resultado, duración y transcripción completa, en el panel de tu local.', 'Every call appears with its outcome, duration and full transcript, in the dashboard at your business.') },
    { target: '#chat-panel', title: x('Paso 5 · Pregúntale lo que quieras', 'Step 5 · Ask it anything'), text: x('Escribe como lo haría un cliente: horarios, precios, ubicación o "quiero una cita el jueves a las 3". Esta es la misma asistente, en versión escrita.', 'Type like a customer would: hours, prices, location or "I want an appointment Thursday at 3". This is the same assistant, in writing.'), action: x('Prueba una de las preguntas sugeridas', 'Try one of the suggested questions') },
    { title: x('Eso es todo', 'That is it'), text: x('Ninguna llamada perdida, citas agendadas solas y un resumen en tu celular. Repite la guía cuando quieras con "Guía paso a paso".', 'No missed calls, appointments booked by themselves and a summary on your phone. Replay the guide any time with "Step-by-step guide".') },
  ], { key: 'receptionist' });
})();
