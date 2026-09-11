(() => {
  const { $, $$, toast, modal, icon, el, time, esc } = window.Demo;

  const DAYS = ['Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const SLOTS = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'];
  const SERVICES = { haircut: ['Haircut', 45, '45 min'], colour: ['Colour', 120, '2 h'], blowdry: ['Blow-dry', 35, '30 min'], beard: ['Beard trim', 20, '20 min'] };
  const appts = [
    { day: 0, time: '10:00', name: 'Priya S.', service: 'Colour' }, { day: 0, time: '15:00', name: 'Tom R.', service: 'Haircut' },
    { day: 1, time: '09:00', name: 'Hannah K.', service: 'Blow-dry' }, { day: 1, time: '13:00', name: 'Marcus D.', service: 'Beard trim' }, { day: 1, time: '16:00', name: 'Léa B.', service: 'Haircut' },
    { day: 2, time: '11:00', name: 'Olivia M.', service: 'Colour' }, { day: 2, time: '14:00', name: 'Jonas F.', service: 'Haircut' },
    { day: 3, time: '10:00', name: 'Ava N.', service: 'Haircut' }, { day: 3, time: '12:00', name: 'Sara P.', service: 'Blow-dry' }, { day: 3, time: '17:00', name: 'Ben C.', service: 'Haircut' },
    { day: 4, time: '09:00', name: 'Mia L.', service: 'Colour' }, { day: 4, time: '13:00', name: 'Noah W.', service: 'Beard trim' },
  ];
  const log = [
    { who: 'Priya S.', outcome: 'Booked', detail: 'Colour, Tue 10:00', dur: '2:14', at: '08:41' },
    { who: 'Unknown', outcome: 'Answered', detail: 'Opening hours and parking', dur: '0:41', at: '09:12' },
    { who: 'Marc T.', outcome: 'Message', detail: 'Wants a callback about a colour', dur: '1:05', at: '09:58' },
    { who: 'Sara P.', outcome: 'Rescheduled', detail: 'Blow-dry moved to Fri 12:00', dur: '1:32', at: '10:20' },
  ];
  const stats = { answered: 4, booked: 2, messages: 1, missed: 0 };

  const SCENARIOS = {
    book: { label: 'Book an appointment', icon: 'calendar', caller: 'Emma W. · +1 555 0134', lines: [
      ['ai', 'Thanks for calling Bloom Salon, this is Mia, the salon assistant. How can I help you today?'],
      ['caller', 'Hi, I would like to book a haircut sometime on Tuesday afternoon.'],
      ['ai', 'Of course. On Tuesday I have 2:00 pm and 4:00 pm free with Sofia. Which one suits you?'],
      ['caller', '2 pm works for me.'],
      ['ai', 'Great. Can I take your name and a mobile number for the confirmation?'],
      ['caller', 'Emma Walsh, 555 0134.'],
      ['ai', 'Thank you, Emma. You are booked for a haircut on Tuesday at 2:00 pm with Sofia. I have just sent you a confirmation by SMS. Anything else I can help with?'],
      ['caller', 'No, that is all. Thanks!'],
      ['ai', 'You are welcome, Emma. See you on Tuesday!'],
    ], outcome: { type: 'Booked', detail: 'Haircut, Tue 14:00 with Sofia', appt: { day: 0, time: '14:00', name: 'Emma W.', service: 'Haircut' }, summary: 'New booking: Emma Walsh, haircut, Tuesday 2:00 pm with Sofia. Confirmation SMS sent to the caller.' } },
    hours: { label: 'Ask opening hours', icon: 'clock', caller: 'Unknown number', lines: [
      ['ai', 'Thanks for calling Bloom Salon, this is Mia. How can I help?'],
      ['caller', 'Hi, are you open on Sunday? And is there parking nearby?'],
      ['ai', 'We are closed on Sunday and Monday. We are open Tuesday to Saturday from 9 am to 6 pm. There is free two-hour parking on Harbour Street, right behind the salon.'],
      ['caller', 'Perfect, thank you.'],
      ['ai', 'My pleasure. Would you like to book a visit while you are on the line?'],
      ['caller', 'Not today, thanks. Bye!'],
      ['ai', 'Have a lovely day. Goodbye!'],
    ], outcome: { type: 'Answered', detail: 'Opening hours and parking', summary: 'Caller asked about Sunday opening and parking. Answered from your business information. No action needed.' } },
    price: { label: 'Ask a price', icon: 'dollar', caller: 'Daniel · +1 555 0177', lines: [
      ['ai', 'Thanks for calling Bloom Salon, this is Mia. How can I help?'],
      ['caller', 'How much is a men\'s haircut and a beard trim?'],
      ['ai', 'A haircut is $45 and a beard trim is $20. Together they take about an hour. Would you like me to check availability?'],
      ['caller', 'Yes, do you have anything Saturday morning?'],
      ['ai', 'Saturday at 10 am and 11 am are free. Shall I book one for you?'],
      ['caller', '11 am please. It is Daniel.'],
      ['ai', 'Done, Daniel. Haircut and beard trim on Saturday at 11 am. You will receive an SMS confirmation now. See you Saturday!'],
    ], outcome: { type: 'Booked', detail: 'Haircut + beard trim, Sat 11:00', appt: { day: 4, time: '11:00', name: 'Daniel', service: 'Haircut + beard' }, summary: 'Daniel asked prices, then booked a haircut and beard trim for Saturday 11:00. SMS confirmation sent.' } },
    human: { label: 'Speak to a human', icon: 'users', caller: 'Grace · +1 555 0190', lines: [
      ['ai', 'Thanks for calling Bloom Salon, this is Mia. How can I help?'],
      ['caller', 'I am organising a wedding party for six people and I would like to talk to someone about it.'],
      ['ai', 'Congratulations! That is best arranged directly with Sofia, the owner. Let me connect you now. One moment, please.'],
      ['system', 'Transferring to Sofia\'s mobile with the caller\'s name and reason…'],
      ['system', 'Sofia picked up. Call handed over.'],
    ], outcome: { type: 'Transferred', detail: 'Wedding party for 6, handed to Sofia', summary: 'Grace wants to arrange a wedding party for six. Transferred to Sofia with the context of the call.' } },
    message: { label: 'After-hours message', icon: 'moon', caller: 'Marc T. · +1 555 0990', lines: [
      ['ai', 'Thanks for calling Bloom Salon, this is Mia. The salon is closed right now, but I can book appointments or take a message. How can I help?'],
      ['caller', 'I had a colour done last week and I have a question about the products you used.'],
      ['ai', 'I want to make sure you get the right answer, so I will pass this to your stylist. Which day did you visit, and is 555 0990 the best number to call you back on?'],
      ['caller', 'Last Thursday, with Sofia. Yes, that number is fine.'],
      ['ai', 'Thank you, Marc. Sofia will call you back tomorrow morning when we open at 9. Is there anything else?'],
      ['caller', 'No, that is all.'],
      ['ai', 'Good night, Marc.'],
    ], outcome: { type: 'Message', detail: 'Callback about colour products', summary: 'Message from Marc T.: question about the colour products used last Thursday with Sofia. Callback requested on 555 0990, tomorrow morning.' } },
  };

  /* ---------- call simulator ---------- */
  let callState = 'idle', timer = null, seconds = 0;
  const sim = $('#call-sim');
  const renderIdle = () => {
    callState = 'idle';
    sim.innerHTML = `<div class="call-idle"><div class="call-ai big">${icon('headset')}</div><b>Ready to answer</b><p class="muted small">Choose what the caller wants, then start the call. You will see the conversation as it happens.</p>
      <div class="scenario-grid">${Object.entries(SCENARIOS).map(([k, s]) => `<button type="button" class="scenario" data-s="${k}">${icon(s.icon)}<span>${s.label}</span></button>`).join('')}</div></div>`;
    $$('.scenario', sim).forEach((b) => b.addEventListener('click', () => startCall(b.dataset.s)));
  };
  const startCall = (key) => {
    const s = SCENARIOS[key];
    callState = 'ringing';
    sim.innerHTML = `<div class="call-live"><div class="call-avatar"><i></i><i></i>${icon('user')}</div><b>Incoming call</b><small>${s.caller}</small><div class="ring-label">Ringing… the AI picks up in under two rings</div></div>`;
    setTimeout(() => runCall(s), 1600);
  };
  const runCall = (s) => {
    callState = 'active'; seconds = 0;
    sim.innerHTML = `<div class="call-live active"><div class="call-head"><div class="call-ai">${icon('headset')}</div><div><b>Mia · AI receptionist</b><small>${s.caller}</small></div><b class="call-timer" id="call-timer">00:00</b></div>
      <div class="wave" id="wave">${Array.from({ length: 9 }, (_, i) => `<i style="--i:${i}"></i>`).join('')}</div>
      <div class="transcript" id="transcript"></div>
      <button class="btn btn-danger btn-sm" type="button" id="hangup">${icon('phone-off')}End call</button></div>`;
    timer = setInterval(() => { seconds += 1; $('#call-timer').textContent = `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`; }, 1000);
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
      setTimeout(() => { typing.classList.remove('typing'); typing.innerHTML = `<small>${who === 'ai' ? 'Mia' : 'Caller'}</small>${esc(text)}`; tr.scrollTop = tr.scrollHeight; setTimeout(next, 500 + Math.min(2600, text.length * 32)); }, who === 'ai' ? 700 : 900);
    };
    setTimeout(next, 400);
  };
  const endCall = (s, early = false) => {
    clearInterval(timer); callState = 'ended';
    const o = s.outcome;
    const dur = `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`;
    if (!early) {
      stats.answered += 1;
      if (o.type === 'Booked') { stats.booked += 1; if (o.appt) { appts.push({ ...o.appt, isNew: true }); } }
      if (o.type === 'Message') stats.messages += 1;
      log.unshift({ who: s.caller.split(' ·')[0], outcome: o.type, detail: o.detail, dur, at: time(), isNew: true });
      renderSide();
      toast('Summary sent to your phone', o.summary, 'ok', 'message');
    }
    sim.innerHTML = `<div class="call-ended"><div class="call-ai">${icon('check')}</div><b>Call ended · ${dur}</b>
      ${early ? '<p class="muted small">Call ended before the outcome. Start another one to see it through.</p>' : `<div class="outcome"><span class="mk-badge ${o.type === 'Booked' ? 'green' : o.type === 'Message' ? 'amber' : 'blue'}">${o.type}</span><p>${esc(o.summary)}</p></div><div class="sms-preview"><span>${icon('message')}</span><div><b>SMS to you</b><span>${esc(o.summary)}</span></div></div>`}
      <button class="btn btn-primary" type="button" id="again">${icon('phone')}Take another call</button></div>`;
    $('#again').addEventListener('click', renderIdle);
  };

  /* ---------- dashboard side ---------- */
  const renderSide = () => {
    $('#ai-kpis').innerHTML = `<div class="kpi-tile"><small>Calls answered today</small><b>${stats.answered}</b><em>0 missed</em><span class="ic grad-cyan">${icon('phone')}</span></div><div class="kpi-tile"><small>Appointments booked</small><b>${stats.booked}</b><em>by the AI</em><span class="ic grad-blue">${icon('calendar')}</span></div><div class="kpi-tile"><small>Messages taken</small><b>${stats.messages}</b><em class="${stats.messages ? 'warn' : ''}">${stats.messages ? 'to call back' : 'none pending'}</em><span class="ic grad-violet">${icon('message')}</span></div><div class="kpi-tile"><small>Average answer time</small><b>1.8 s</b><em>under two rings</em><span class="ic grad-indigo">${icon('zap')}</span></div>`;
    $('#cal').innerHTML = DAYS.map((d, di) => `<div class="cal-col"><div class="cal-day">${d}</div>${SLOTS.map((t) => { const a = appts.find((x) => x.day === di && x.time === t); return a ? `<div class="cal-slot booked ${a.isNew ? 'new' : ''}" title="${esc(a.name)} · ${esc(a.service)}"><b>${t}</b><span>${esc(a.name)}</span><small>${esc(a.service)}</small></div>` : `<div class="cal-slot"><b>${t}</b></div>`; }).join('')}</div>`).join('');
    $('#call-log').innerHTML = log.map((l) => `<div class="list-row ${l.isNew ? 'new' : ''}"><span class="avatar sm ${{ Booked: 'c2', Answered: 'c0', Message: 'c5', Transferred: 'c3', Rescheduled: 'c1' }[l.outcome] || 'c0'}">${icon('phone')}</span><div class="grow"><b>${esc(l.who)}</b><small>${esc(l.detail)} · ${l.dur} · ${l.at}</small></div><span class="mk-badge ${l.outcome === 'Booked' ? 'green' : l.outcome === 'Message' ? 'amber' : 'blue'}">${l.outcome}</span><button class="btn btn-ghost btn-xs" type="button" data-transcript="${esc(l.who)}">Transcript</button></div>`).join('');
    $$('#call-log [data-transcript]').forEach((b) => b.addEventListener('click', () => modal.open(`<h2>Transcript · ${b.dataset.transcript}</h2><p class="muted small" style="margin-bottom:1rem">Every call is recorded as text on your on-site dashboard, so you can read it later.</p><div class="transcript static">${(SCENARIOS.book.lines.slice(0, 5)).map(([w, t]) => `<div class="bub ${w === 'ai' ? 'ai' : 'me'}"><small>${w === 'ai' ? 'Mia' : 'Caller'}</small>${esc(t)}</div>`).join('')}</div>`)));
    appts.forEach((a) => { a.isNew = false; }); log.forEach((l) => { l.isNew = false; });
  };

  /* ---------- text chat ---------- */
  const chat = $('#chat');
  let pendingBooking = null;
  const say = (who, text) => { const b = el(`<div class="bub ${who}"><small>${who === 'ai' ? 'Mia' : 'You'}</small>${text}</div>`); chat.appendChild(b); chat.scrollTop = chat.scrollHeight; };
  const answer = (q) => {
    const t = q.toLowerCase();
    const has = (...w) => w.some((x) => t.includes(x));
    if (pendingBooking) {
      const dayIdx = DAYS.findIndex((d) => t.includes(d.toLowerCase()));
      const slot = SLOTS.find((s) => t.includes(s.slice(0, 2)) && !t.includes('pm')) || (t.includes('pm') ? SLOTS.find((s) => t.includes(String(+s.slice(0, 2) - 12))) : null);
      if (dayIdx >= 0 || slot) {
        const day = dayIdx >= 0 ? dayIdx : pendingBooking.day ?? 0;
        const free = SLOTS.filter((s) => !appts.find((a) => a.day === day && a.time === s));
        const chosen = slot && free.includes(slot) ? slot : free[0];
        const service = pendingBooking.service;
        appts.push({ day, time: chosen, name: 'You', service, isNew: true }); stats.booked += 1; renderSide(); pendingBooking = null;
        return `Done. Your ${service.toLowerCase()} is booked for ${DAYS[day]} at ${chosen}. I have added it to the calendar on the right, and you would receive an SMS confirmation now. Anything else?`;
      }
      return `Which day suits you? We are open ${DAYS.join(', ')}, 9 am to 6 pm.`;
    }
    if (has('open', 'hour', 'close', 'sunday', 'monday', 'when')) return 'We are open Tuesday to Saturday, 9 am to 6 pm, and closed on Sunday and Monday. Would you like to book a visit?';
    if (has('price', 'cost', 'how much', '$')) return `Our prices: haircut $45 (45 min), colour from $120 (about 2 hours), blow-dry $35 (30 min) and beard trim $20 (20 min). Shall I check availability for you?`;
    if (has('book', 'appointment', 'haircut', 'colour', 'color', 'blow', 'beard', 'trim', 'available', 'availability', 'slot')) {
      const service = has('colour', 'color') ? 'Colour' : has('blow') ? 'Blow-dry' : has('beard', 'trim') ? 'Beard trim' : 'Haircut';
      pendingBooking = { service };
      return `Happy to book a ${service.toLowerCase()}. Which day and time suits you? For example: "Thursday at 3 pm". We are open Tuesday to Saturday, 9 am to 6 pm.`;
    }
    if (has('park', 'where', 'address', 'located', 'find you', 'direction')) return 'We are at 12 Harbour Street, next to the bakery. There is free two-hour parking on Harbour Street, right behind the salon.';
    if (has('human', 'person', 'someone', 'manager', 'owner', 'speak to', 'talk to', 'sofia')) return 'Of course. I am connecting you to Sofia now and passing on what you told me. If she is with a client, I will take a message and she will call you back.';
    if (has('cancel', 'reschedule', 'move', 'change')) return 'No problem. Can you give me the name the appointment is under and the day? I will cancel or move it and send you a confirmation.';
    if (has('thank', 'thanks', 'bye', 'great')) return 'You are welcome! Have a lovely day.';
    if (has('hello', 'hi', 'hey')) return 'Hello! This is Mia at Bloom Salon. I can book appointments, answer questions about prices and hours, or take a message. What can I do for you?';
    return 'I want to make sure you get the right answer, so I will take a message for the team. Can I have your name and the best number to call you back on?';
  };
  $('#chat-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const input = $('#chat-input'); const q = input.value.trim(); if (!q) return;
    say('me', esc(q)); input.value = '';
    const typing = el('<div class="bub ai typing"><i></i><i></i><i></i></div>'); chat.appendChild(typing); chat.scrollTop = chat.scrollHeight;
    setTimeout(() => { typing.remove(); say('ai', answer(q)); }, 800);
  });
  const chips = ['Are you open on Sunday?', 'How much is a haircut?', 'Book a colour on Thursday', 'Where can I park?', 'Can I speak to Sofia?'];
  $('#chat-chips').innerHTML = chips.map((c) => `<button type="button" class="chip" style="cursor:pointer">${c}</button>`).join('');
  $$('#chat-chips .chip').forEach((b) => b.addEventListener('click', () => { $('#chat-input').value = b.textContent; $('#chat-form').requestSubmit(); }));
  say('ai', 'Hi! I am Mia, the AI receptionist for Bloom Salon. Ask me anything a caller would ask.');

  renderIdle(); renderSide();
})();
