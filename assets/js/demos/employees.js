(() => {
  const { $, $$, money, toast, modal, views, icon, time, pad, download, tour, x, lang } = window.Demo;

  const STAFF = [
    { id: 1, name: 'Sam Kaur', role: 'Barista', rate: 16.5, c: 0 },
    { id: 2, name: 'María López', role: x('Encargada', 'Manager'), rate: 22, c: 1 },
    { id: 3, name: 'Juan Pérez', role: x('Cocinero', 'Cook'), rate: 18, c: 2 },
    { id: 4, name: 'Ana Rossi', role: x('Mesera', 'Server'), rate: 15, c: 3 },
    { id: 5, name: 'Leo Brandt', role: x('Mesero', 'Server'), rate: 15, c: 4 },
    { id: 6, name: 'Nina Osei', role: 'Barista', rate: 16.5, c: 5 },
  ];
  const byId = (id) => STAFF.find((s) => s.id === id);
  const initials = (s) => s.name.split(' ').map((w) => w[0]).join('');
  const DAYS = x(['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'], ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']);
  const LONG = x(['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'], ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']);
  const MONTHS = x(['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'], ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']);
  const now = new Date();
  const monday = new Date(now); monday.setDate(now.getDate() - ((now.getDay() + 6) % 7)); monday.setHours(0, 0, 0, 0);
  const dayDate = (d) => { const y = new Date(monday); y.setDate(monday.getDate() + d); return y; };
  const fmtDate = (d) => (lang === 'en' ? `${MONTHS[d.getMonth()]} ${d.getDate()}` : `${d.getDate()} ${MONTHS[d.getMonth()]}`);
  const todayIdx = (now.getDay() + 6) % 7;
  const todayLong = () => (lang === 'en' ? `${LONG[todayIdx]}, ${MONTHS[now.getMonth()]} ${now.getDate()}` : `${LONG[todayIdx]} ${now.getDate()} de ${MONTHS[now.getMonth()]}`);
  const weekLabel = () => x(`Semana del ${fmtDate(monday)} al ${fmtDate(dayDate(6))}`, `Week of ${fmtDate(monday)} to ${fmtDate(dayDate(6))}`);
  const hrs = (a, b) => { const [h1, m1] = a.split(':').map(Number); const [h2, m2] = b.split(':').map(Number); return Math.max(0, (h2 * 60 + m2 - h1 * 60 - m1) / 60); };
  const OPEN = x('Turno libre', 'Open shift');

  let shiftId = 1;
  const template = [
    [1, '07:00', '15:00'], [2, '08:00', '16:00'], [4, '11:00', '19:00'],
    [6, '07:00', '15:00'], [3, '10:00', '18:00'], [5, '12:00', '20:00'],
    [1, '07:00', '15:00'], [2, '08:00', '16:00'], [4, '11:00', '19:00'], [null, '15:00', '21:00'],
    [6, '07:00', '15:00'], [3, '10:00', '18:00'], [5, '12:00', '20:00'],
    [1, '07:00', '15:00'], [2, '08:00', '16:00'], [3, '10:00', '18:00'], [4, '12:00', '21:00'],
    [6, '08:00', '16:00'], [5, '09:00', '17:00'], [3, '10:00', '18:00'],
    [1, '09:00', '15:00'], [4, '09:00', '15:00'],
  ];
  const dayOf = [0, 0, 0, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 6, 6];
  let shifts = template.map(([emp, s, e], i) => ({ id: shiftId++, day: dayOf[i], emp, start: s, end: e }));
  const clockLog = [];
  const seedIn = (emp, h, m) => { const d = new Date(); d.setHours(h, m, 0, 0); if (d > now) d.setHours(now.getHours() - 1); clockLog.push({ emp, in: d, out: null }); };
  seedIn(1, 6, 58); seedIn(2, 8, 2);
  const leave = [
    { id: 1, emp: 4, day: 4, type: x('Día completo', 'Full day'), reason: x('Evento familiar', 'Family event'), status: 'pending' },
    { id: 2, emp: 5, day: 5, type: x('Mañana', 'Morning'), reason: x('Cita médica', 'Doctor\'s appointment'), status: 'pending' },
    { id: 3, emp: 3, day: 2, type: x('Día completo', 'Full day'), reason: x('Mudanza', 'Moving house'), status: 'approved' },
  ];
  const approvedTs = new Set();

  /* ---------- dashboard ---------- */
  const renderDashboard = () => {
    $('#today-label').textContent = todayLong();
    const inNow = clockLog.filter((c) => !c.out);
    const schedHours = shifts.reduce((s, y) => s + hrs(y.start, y.end), 0);
    const cost = shifts.reduce((s, y) => s + (y.emp ? hrs(y.start, y.end) * byId(y.emp).rate : 0), 0);
    const open = shifts.filter((y) => !y.emp).length;
    const pending = leave.filter((l) => l.status === 'pending').length;
    $('#kpis').innerHTML = `
      <div class="kpi-tile"><small>${x('En turno ahora', 'On shift now')}</small><b>${inNow.length}</b><em>${x(`de ${STAFF.length} empleados`, `of ${STAFF.length} employees`)}</em><span class="ic grad-blue">${icon('users')}</span></div>
      <div class="kpi-tile"><small>${x('Horas programadas · semana', 'Scheduled hours · week')}</small><b>${schedHours.toFixed(1)}</b><em>${shifts.length} ${x('turnos', 'shifts')}</em><span class="ic grad-indigo">${icon('calendar')}</span></div>
      <div class="kpi-tile"><small>${x('Costo de personal · semana', 'Labour cost · week')}</small><b>${money(cost)}</b><em>${(cost / 9800 * 100).toFixed(0)} % ${x('de las ventas previstas', 'of forecast sales')}</em><span class="ic grad-violet">${icon('dollar')}</span></div>
      <div class="kpi-tile"><small>${x('Requiere atención', 'Needs attention')}</small><b>${open + pending}</b><em class="${open + pending ? 'warn' : ''}">${x(`${open} turno${open === 1 ? '' : 's'} libre${open === 1 ? '' : 's'} · ${pending} permiso${pending === 1 ? '' : 's'}`, `${open} open shift${open === 1 ? '' : 's'} · ${pending} request${pending === 1 ? '' : 's'}`)}</em><span class="ic grad-amber">${icon('bell')}</span></div>`;
    const perDay = DAYS.map((_, d) => shifts.filter((y) => y.day === d).reduce((s, y) => s + hrs(y.start, y.end), 0));
    const max = Math.max(...perDay, 1);
    $('#hours-chart').innerHTML = `<div class="chart-bars">${perDay.map((h, d) => `<div title="${h.toFixed(1)} h"><i style="height:${(h / max * 100).toFixed(0)}%" class="${d === todayIdx ? 'alt' : ''}"></i></div>`).join('')}</div><div class="chart-labels">${DAYS.map((d, i) => `<span>${d}<br><b>${perDay[i].toFixed(0)} h</b></span>`).join('')}</div>`;
    $('#who-in').innerHTML = inNow.map((c) => { const s = byId(c.emp); return `<div class="list-row"><span class="avatar sm c${s.c}">${initials(s)}</span><div class="grow"><b>${s.name}</b><small>${s.role} · ${x('desde las', 'since')} ${time(c.in)}</small></div><span class="status-dot on"></span></div>`; }).join('') || `<div class="empty">${x('Nadie ha marcado entrada. Prueba el reloj checador.', 'Nobody has clocked in. Try the time clock.')}</div>`;
    const today = shifts.filter((y) => y.day === todayIdx).sort((a, b) => a.start.localeCompare(b.start));
    $('#today-shifts').innerHTML = today.map((y) => { const s = y.emp ? byId(y.emp) : null; const inLog = s && clockLog.find((c) => c.emp === s.id && !c.out); return `<div class="list-row">${s ? `<span class="avatar sm c${s.c}">${initials(s)}</span>` : `<span class="avatar sm" style="border:1px dashed var(--border-strong)">?</span>`}<div class="grow"><b>${s ? s.name : OPEN}</b><small>${y.start} ${x('a', 'to')} ${y.end}${s ? ' · ' + s.role : ' · ' + x('falta cubrirlo', 'needs covering')}</small></div>${inLog ? `<span class="mk-badge green">${x('En turno', 'On shift')}</span>` : s ? `<span class="mk-badge blue">${x('Programado', 'Scheduled')}</span>` : `<span class="mk-badge amber">${x('Sin asignar', 'Unassigned')}</span>`}</div>`; }).join('') || `<div class="empty">${x('No hay turnos hoy.', 'No shifts today.')}</div>`;
    $('#leave-count').textContent = pending || '';
  };

  /* ---------- schedule ---------- */
  const renderWeek = () => {
    $('#week-label').textContent = weekLabel();
    $('#week').innerHTML = DAYS.map((d, i) => {
      const list = shifts.filter((y) => y.day === i).sort((a, b) => a.start.localeCompare(b.start));
      const h = list.reduce((s, y) => s + hrs(y.start, y.end), 0);
      return `<div class="day-col ${i === todayIdx ? 'today' : ''}"><div class="day-head"><b>${d}</b><small>${fmtDate(dayDate(i))} · ${h.toFixed(0)} h</small></div>
        ${list.map((y) => { const s = y.emp ? byId(y.emp) : null; return `<button type="button" class="shift ${s ? 'c' + s.c : 'open'}" data-shift="${y.id}"><b>${s ? s.name.split(' ')[0] : OPEN}</b><span>${y.start} – ${y.end}</span></button>`; }).join('')}
        <button type="button" class="add-shift" data-day="${i}">${icon('plus')}${x('Agregar turno', 'Add shift')}</button></div>`;
    }).join('');
    $$('#week .add-shift').forEach((b) => b.addEventListener('click', () => shiftModal({ day: +b.dataset.day })));
    $$('#week .shift').forEach((b) => b.addEventListener('click', () => shiftModal(shifts.find((y) => y.id === +b.dataset.shift))));
  };
  const shiftModal = (shift) => {
    const isNew = !shift.id;
    const card = modal.open(`<h2>${isNew ? x('Agregar turno', 'Add shift') : x('Editar turno', 'Edit shift')} · ${DAYS[shift.day]} ${fmtDate(dayDate(shift.day))}</h2>
      <div class="form-grid">
        <div class="field full"><label>${x('Empleado', 'Employee')}</label><select class="input" name="emp"><option value="">${x('Turno libre (sin asignar)', 'Open shift (unassigned)')}</option>${STAFF.map((s) => `<option value="${s.id}" ${shift.emp === s.id ? 'selected' : ''}>${s.name} · ${s.role}</option>`).join('')}</select></div>
        <div class="field"><label>${x('Inicio', 'Start')}</label><input class="input" type="time" name="start" value="${shift.start || '09:00'}"></div>
        <div class="field"><label>${x('Fin', 'End')}</label><input class="input" type="time" name="end" value="${shift.end || '17:00'}"></div>
      </div>
      <div class="modal-actions">${isNew ? '' : `<button class="btn btn-danger" type="button" data-remove>${icon('trash')}${x('Quitar', 'Remove')}</button>`}<button class="btn btn-ghost" type="button" data-close>${x('Cancelar', 'Cancel')}</button><button class="btn btn-primary" type="button" data-save>${icon('check')}${x('Guardar', 'Save')}</button></div>`);
    $('[data-close]', card).addEventListener('click', modal.close);
    const rm = $('[data-remove]', card); if (rm) rm.addEventListener('click', () => { shifts = shifts.filter((y) => y.id !== shift.id); modal.close(); renderAll(); toast(x('Turno eliminado', 'Shift removed')); });
    $('[data-save]', card).addEventListener('click', () => {
      const emp = $('[name=emp]', card).value ? +$('[name=emp]', card).value : null;
      const start = $('[name=start]', card).value, end = $('[name=end]', card).value;
      if (hrs(start, end) <= 0) { toast(x('La hora de fin debe ser después del inicio', 'End time must be after the start'), '', 'warn', 'alert'); return; }
      if (isNew) shifts.push({ id: shiftId++, day: shift.day, emp, start, end }); else Object.assign(shift, { emp, start, end });
      modal.close(); renderAll();
      toast(isNew ? x('Turno agregado', 'Shift added') : x('Turno actualizado', 'Shift updated'), emp ? x(`${byId(emp).name} recibirá el aviso cuando publiques.`, `${byId(emp).name} will be notified when you publish.`) : x('Quedó como turno libre.', 'Left as an open shift.'));
    });
  };
  $('#copy-week').addEventListener('click', () => { shifts = template.map(([emp, s, e], i) => ({ id: shiftId++, day: dayOf[i], emp, start: s, end: e })); renderAll(); toast(x('Semana pasada copiada', 'Last week copied'), x('Ajusta lo que necesites y publica.', 'Adjust what you need and publish.'), 'info', 'refresh'); });
  $('#publish').addEventListener('click', () => { const n = new Set(shifts.filter((y) => y.emp).map((y) => y.emp)).size; toast(x('Horario publicado', 'Schedule published'), x(`${n} empleados recibieron sus turnos en el celular.`, `${n} employees received their shifts on their phone.`), 'ok', 'bell'); });

  /* ---------- time clock ---------- */
  let clockStage = 'pick', clockEmp = null, pin = '';
  const renderClockTime = () => { $('#clock-time').innerHTML = `<b>${time()}</b><span>${todayLong()}</span>`; };
  const renderClock = () => {
    const stage = $('#clock-stage');
    if (clockStage === 'pick') {
      stage.innerHTML = `<p class="muted small" style="margin-bottom:.8rem">${x('Toca tu nombre para marcar entrada o salida.', 'Tap your name to clock in or out.')}</p><div class="pick-grid">${STAFF.map((s) => { const inLog = clockLog.find((c) => c.emp === s.id && !c.out); return `<button type="button" class="pick" data-emp="${s.id}"><span class="avatar c${s.c}">${initials(s)}</span><b>${s.name}</b><small>${inLog ? `<i class="status-dot on"></i> ${x('En turno desde', 'On shift since')} ` + time(inLog.in) : s.role}</small></button>`; }).join('')}</div>`;
      $$('.pick', stage).forEach((b) => b.addEventListener('click', () => { clockEmp = byId(+b.dataset.emp); pin = ''; clockStage = 'pin'; renderClock(); }));
    } else if (clockStage === 'pin') {
      stage.innerHTML = `<div class="pin-head"><span class="avatar c${clockEmp.c}">${initials(clockEmp)}</span><div><b>${clockEmp.name}</b><small>${x('Escribe tu PIN de 4 dígitos (en esta muestra funciona cualquiera)', 'Enter your 4-digit PIN (any PIN works in this sample)')}</small></div></div>
        <div class="pin-dots">${[0, 1, 2, 3].map((i) => `<i class="${i < pin.length ? 'on' : ''}"></i>`).join('')}</div>
        <div class="pin-pad">${[1, 2, 3, 4, 5, 6, 7, 8, 9, 'back', 0, 'ok'].map((k) => `<button type="button" data-key="${k}" class="${k === 'ok' ? 'ok' : ''}">${k === 'back' ? icon('arrow-left') : k === 'ok' ? icon('check') : k}</button>`).join('')}</div>
        <button type="button" class="btn-link" data-cancel>${icon('arrow-left')}${x('¿No eres tú? Regresar', 'Not you? Go back')}</button>`;
      $('[data-cancel]', stage).addEventListener('click', () => { clockStage = 'pick'; renderClock(); });
      $$('[data-key]', stage).forEach((b) => b.addEventListener('click', () => {
        const k = b.dataset.key;
        if (k === 'back') pin = pin.slice(0, -1);
        else if (k === 'ok') { if (pin.length === 4) clockStage = 'action'; else toast(x('Escribe 4 dígitos', 'Enter 4 digits'), '', 'warn', 'alert'); }
        else if (pin.length < 4) pin += k;
        if (k !== 'ok' && pin.length === 4) clockStage = 'action';
        renderClock();
      }));
    } else {
      const inLog = clockLog.find((c) => c.emp === clockEmp.id && !c.out);
      const sched = shifts.find((y) => y.day === todayIdx && y.emp === clockEmp.id);
      stage.innerHTML = `<div class="pin-head"><span class="avatar c${clockEmp.c}">${initials(clockEmp)}</span><div><b>${x('Hola', 'Hi')}, ${clockEmp.name.split(' ')[0]}</b><small>${sched ? x(`Tu turno de hoy: ${sched.start} a ${sched.end}`, `Your shift today: ${sched.start} to ${sched.end}`) : x('No tienes turno programado hoy', 'You have no shift scheduled today')}${inLog ? ` · ${x('en turno desde las', 'on shift since')} ${time(inLog.in)}` : ''}</small></div></div>
        <div class="clock-actions">${inLog ? `<button type="button" class="btn btn-danger btn-lg" data-out>${icon('log-out')}${x('Marcar salida', 'Clock out')}</button><button type="button" class="btn btn-ghost btn-lg" data-break>${icon('coffee')}${x('Iniciar descanso', 'Start break')}</button>` : `<button type="button" class="btn btn-success btn-lg" data-in>${icon('check')}${x('Marcar entrada', 'Clock in')}</button>`}</div>
        <button type="button" class="btn-link" data-cancel>${icon('arrow-left')}${x('Regresar', 'Go back')}</button>`;
      $('[data-cancel]', stage).addEventListener('click', () => { clockStage = 'pick'; renderClock(); });
      const done = (msg) => { clockStage = 'pick'; renderAll(); toast(...msg); };
      const bi = $('[data-in]', stage); if (bi) bi.addEventListener('click', () => { const d = new Date(); clockLog.push({ emp: clockEmp.id, in: d, out: null }); const late = sched && `${pad(d.getHours())}:${pad(d.getMinutes())}` > sched.start; done([x(`${clockEmp.name} marcó entrada a las ${time(d)}`, `${clockEmp.name} clocked in at ${time(d)}`), late ? x('Señalado: llegó después de la hora programada.', 'Flagged: arrived after the scheduled start.') : x('A tiempo.', 'On time.'), late ? 'warn' : 'ok', late ? 'alert' : 'check']); });
      const bo = $('[data-out]', stage); if (bo) bo.addEventListener('click', () => { inLog.out = new Date(); const h = (inLog.out - inLog.in) / 36e5; done([x(`${clockEmp.name} marcó salida a las ${time(inLog.out)}`, `${clockEmp.name} clocked out at ${time(inLog.out)}`), x(`${h.toFixed(2)} horas registradas en la hoja de horas.`, `${h.toFixed(2)} hours recorded on the timesheet.`)]); });
      const bb = $('[data-break]', stage); if (bb) bb.addEventListener('click', () => done([x(`Descanso iniciado para ${clockEmp.name}`, `Break started for ${clockEmp.name}`), x('Los descansos se descuentan automáticamente según tus reglas.', 'Breaks are deducted automatically according to your rules.'), 'info', 'coffee']));
    }
    const inNow = clockLog.filter((c) => !c.out);
    $('#clocked-in').innerHTML = inNow.map((c) => { const s = byId(c.emp); return `<div class="list-row"><span class="avatar sm c${s.c}">${initials(s)}</span><div class="grow"><b>${s.name}</b><small>${x('desde las', 'since')} ${time(c.in)}</small></div><b class="timer" data-since="${c.in.getTime()}"></b></div>`; }).join('') || `<div class="empty">${x('Nadie en turno.', 'Nobody on shift.')}</div>`;
    $('#clock-log').innerHTML = [...clockLog].reverse().map((c) => { const s = byId(c.emp); return `<div class="list-row"><span class="avatar sm c${s.c}">${initials(s)}</span><div class="grow"><b>${s.name}</b><small>${x('Entrada', 'In')} ${time(c.in)}${c.out ? ` · ${x('Salida', 'Out')} ${time(c.out)} · ${((c.out - c.in) / 36e5).toFixed(2)} h` : ` · ${x('sigue en turno', 'still on shift')}`}</small></div><span class="mk-badge ${c.out ? 'blue' : 'green'}">${c.out ? x('Completo', 'Complete') : x('En turno', 'On shift')}</span></div>`; }).join('');
    tickTimers();
  };
  const tickTimers = () => { $$('.timer').forEach((t) => { const ms = Date.now() - +t.dataset.since; const h = Math.floor(ms / 36e5), m = Math.floor((ms % 36e5) / 6e4), s = Math.floor((ms % 6e4) / 1e3); t.textContent = `${pad(h)}:${pad(m)}:${pad(s)}`; }); };
  setInterval(() => { renderClockTime(); tickTimers(); }, 1000);

  /* ---------- time off ---------- */
  const renderLeave = () => {
    $('#leave-list').innerHTML = leave.map((l) => { const s = byId(l.emp); return `<div class="list-row"><span class="avatar c${s.c}">${initials(s)}</span><div class="grow"><b>${s.name}</b><small>${DAYS[l.day]} ${fmtDate(dayDate(l.day))} · ${l.type} · ${l.reason}</small></div>
      ${l.status === 'pending' ? `<button class="btn btn-ghost btn-xs" type="button" data-decline="${l.id}">${x('Rechazar', 'Decline')}</button><button class="btn btn-success btn-xs" type="button" data-approve="${l.id}">${icon('check')}${x('Aprobar', 'Approve')}</button>` : `<span class="mk-badge ${l.status === 'approved' ? 'green' : 'red'}">${l.status === 'approved' ? x('Aprobado', 'Approved') : x('Rechazado', 'Declined')}</span>`}</div>`; }).join('');
    $$('#leave-list [data-approve]').forEach((b) => b.addEventListener('click', () => {
      const l = leave.find((y) => y.id === +b.dataset.approve); l.status = 'approved';
      let freed = 0; shifts.forEach((y) => { if (y.day === l.day && y.emp === l.emp) { y.emp = null; freed++; } });
      renderAll(); toast(x(`Permiso aprobado para ${byId(l.emp).name}`, `Time off approved for ${byId(l.emp).name}`), freed ? x(`${freed} turno del ${DAYS[l.day]} quedó libre. El empleado ya recibió el aviso.`, `${freed} shift on ${DAYS[l.day]} is now open. The employee has been notified.`) : x('El empleado ya recibió el aviso.', 'The employee has been notified.'), 'ok', 'check');
    }));
    $$('#leave-list [data-decline]').forEach((b) => b.addEventListener('click', () => { const l = leave.find((y) => y.id === +b.dataset.decline); l.status = 'declined'; renderAll(); toast(x('Solicitud rechazada', 'Request declined'), x(`${byId(l.emp).name} ya recibió el aviso.`, `${byId(l.emp).name} has been notified.`), 'info', 'x'); }));
  };

  /* ---------- timesheets ---------- */
  const tsRows = () => STAFF.map((s) => {
    const sched = shifts.filter((y) => y.emp === s.id).reduce((a, y) => a + hrs(y.start, y.end), 0);
    const clocked = clockLog.filter((c) => c.emp === s.id).reduce((a, c) => a + ((c.out || new Date()) - c.in) / 36e5, 0) + sched * 0.92;
    const ot = Math.max(0, clocked - 38);
    return { s, sched, clocked, ot, pay: clocked * s.rate + ot * s.rate * 0.5 };
  });
  const renderTs = () => {
    $('#ts-label').textContent = weekLabel();
    const rows = tsRows();
    $('#ts-table').innerHTML = `<thead><tr><th>${x('Empleado', 'Employee')}</th><th class="num">${x('Programadas', 'Scheduled')}</th><th class="num">${x('Marcadas', 'Clocked')}</th><th class="num">${x('Tiempo extra', 'Overtime')}</th><th class="num">${x('Tarifa', 'Rate')}</th><th class="num">${x('Pago', 'Pay')}</th><th>${x('Estado', 'Status')}</th></tr></thead><tbody>${rows.map((r) => `<tr><td><div class="row" style="gap:.6rem;flex-wrap:nowrap"><span class="avatar sm c${r.s.c}">${initials(r.s)}</span><div><b>${r.s.name}</b><small class="muted" style="display:block">${r.s.role}</small></div></div></td><td class="num">${r.sched.toFixed(1)} h</td><td class="num">${r.clocked.toFixed(1)} h</td><td class="num">${r.ot ? `<span class="mk-badge amber">${r.ot.toFixed(1)} h</span>` : '—'}</td><td class="num">${money(r.s.rate)}</td><td class="num"><b>${money(r.pay)}</b></td><td>${approvedTs.has(r.s.id) ? `<span class="mk-badge green">${x('Aprobada', 'Approved')}</span>` : `<span class="mk-badge blue">${x('Por revisar', 'To review')}</span>`}</td></tr>`).join('')}</tbody><tfoot><tr><td><b>Total</b></td><td class="num">${rows.reduce((a, r) => a + r.sched, 0).toFixed(1)} h</td><td class="num">${rows.reduce((a, r) => a + r.clocked, 0).toFixed(1)} h</td><td class="num">${rows.reduce((a, r) => a + r.ot, 0).toFixed(1)} h</td><td></td><td class="num"><b>${money(rows.reduce((a, r) => a + r.pay, 0))}</b></td><td></td></tr></tfoot>`;
  };
  $('#approve-all').addEventListener('click', () => { STAFF.forEach((s) => approvedTs.add(s.id)); renderTs(); toast(x('Todas las hojas aprobadas', 'All timesheets approved'), x('Listas para exportar a nómina.', 'Ready to export to payroll.')); });
  $('#export').addEventListener('click', () => {
    const rows = tsRows();
    const csv = [x('Empleado,Puesto,Horas programadas,Horas marcadas,Tiempo extra,Tarifa,Pago', 'Employee,Role,Scheduled hours,Clocked hours,Overtime,Rate,Pay'), ...rows.map((r) => `"${r.s.name}",${r.s.role},${r.sched.toFixed(2)},${r.clocked.toFixed(2)},${r.ot.toFixed(2)},${r.s.rate},${r.pay.toFixed(2)}`)].join('\n');
    download(`${x('horas_semana', 'hours_week')}_${fmtDate(monday).replace(/\s/g, '-')}.csv`, csv);
    toast(x('Hoja de horas exportada', 'Timesheet exported'), x('Un archivo CSV que tu proveedor de nómina o contador puede abrir.', 'A CSV file your payroll provider or accountant can open.'), 'ok', 'download');
  });

  const renderAll = () => { renderDashboard(); renderWeek(); renderClock(); renderLeave(); renderTs(); };
  renderClockTime(); renderAll();
  const show = views();

  /* ---------- guide ---------- */
  tour.auto([
    { title: x('Así se ve la gestión de personal de tu negocio', 'This is what staff management looks like for your business'), text: x('Este panel corre en un pequeño servidor dentro de tu local. Te guiamos por las 4 cosas que harías cada semana: armar el horario, marcar entradas, aprobar permisos y exportar las horas a nómina.', 'This dashboard runs on a small server inside your business. We walk you through the 4 things you would do every week: build the schedule, clock in, approve time off and export hours to payroll.') },
    { target: '#kpis', title: x('Tu semana de un vistazo', 'Your week at a glance'), text: x('Quién está en turno ahora, cuántas horas programaste, cuánto te cuesta el personal y qué necesita tu atención.', 'Who is on shift now, how many hours you scheduled, what your staff costs and what needs your attention.') },
    { target: '[data-nav="schedule"]', title: x('Arma el horario semanal', 'Build the weekly schedule'), text: x('Entra a <b>Horarios</b>. Ahí agregas turnos con un toque, copias la semana pasada y publicas para que cada empleado reciba sus turnos en el celular.', 'Open <b>Schedule</b>. There you add shifts with a tap, copy last week and publish so every employee gets their shifts on their phone.'), action: x('Toca "Horarios" para continuar', 'Tap "Schedule" to continue'), advanceOn: '[data-nav="schedule"]', delay: 300 },
    { target: '#week', title: x('Agrega o cambia un turno', 'Add or change a shift'), text: x('Toca <b>+ Agregar turno</b> en un día, elige a la persona y la hora. Los turnos punteados están libres y hay que cubrirlos.', 'Tap <b>+ Add shift</b> on a day, pick the person and the time. Dotted shifts are open and need covering.'), action: x('Prueba agregar un turno (opcional)', 'Try adding a shift (optional)') },
    { target: '[data-nav="clock"]', title: x('El reloj checador', 'The time clock'), text: x('Esta pantalla vive en la tableta de la entrada. Cada empleado toca su nombre, escribe su PIN y marca entrada o salida. Las llegadas tarde quedan señaladas.', 'This screen lives on the tablet at the entrance. Each employee taps their name, enters their PIN and clocks in or out. Late arrivals get flagged.'), action: x('Toca "Reloj checador" para verlo', 'Tap "Time clock" to see it'), advanceOn: '[data-nav="clock"]', delay: 300, before: () => {} },
    { target: '#clock-tablet', title: x('Marca una entrada', 'Clock someone in'), text: x('Toca un nombre, escribe cualquier PIN de 4 dígitos y marca la entrada. Verás cómo aparece en "En turno ahora" y en la hoja de horas.', 'Tap a name, enter any 4-digit PIN and clock in. Watch it appear under "On shift now" and on the timesheet.'), action: x('Prueba marcar una entrada (opcional)', 'Try clocking in (optional)') },
    { target: '[data-nav="leave"]', title: x('Permisos con un toque', 'One-tap time off'), text: x('Cuando alguien pide un día libre desde su celular, aparece aquí. Al aprobarlo, su turno queda libre en el horario automáticamente.', 'When someone requests a day off from their phone, it shows up here. Approve it and their shift opens up on the schedule automatically.'), action: x('Toca "Permisos"', 'Tap "Time off"'), advanceOn: '[data-nav="leave"]', delay: 300 },
    { target: '[data-nav="timesheets"]', title: x('Horas listas para la nómina', 'Hours ready for payroll'), text: x('Al cierre de la semana, las horas ya están calculadas con tiempo extra. Apruebas y exportas un archivo que tu contador o proveedor de nómina abre directo.', 'At the end of the week the hours are already calculated with overtime. Approve and export a file your accountant or payroll provider opens directly.'), action: x('Toca "Hojas de horas"', 'Tap "Timesheets"'), advanceOn: '[data-nav="timesheets"]', delay: 300 },
    { title: x('Eso es todo', 'That is it'), text: x('Todo lo que viste corre en tu local, sin cuotas por empleado. Sigue explorando o usa el botón "Guía paso a paso" para repetir el recorrido.', 'Everything you saw runs on site, with no per-employee fees. Keep exploring or use the "Step-by-step guide" button to replay the tour.') },
  ], { key: 'employees' });
  void show;
})();
