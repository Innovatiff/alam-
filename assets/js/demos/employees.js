(() => {
  const { $, $$, money, toast, modal, views, icon, time, pad, download, tour } = window.Demo;

  const STAFF = [
    { id: 1, name: 'Sam Kaur', role: 'Barista', rate: 16.5, c: 0 },
    { id: 2, name: 'María López', role: 'Encargada', rate: 22, c: 1 },
    { id: 3, name: 'Juan Pérez', role: 'Cocinero', rate: 18, c: 2 },
    { id: 4, name: 'Ana Rossi', role: 'Mesera', rate: 15, c: 3 },
    { id: 5, name: 'Leo Brandt', role: 'Mesero', rate: 15, c: 4 },
    { id: 6, name: 'Nina Osei', role: 'Barista', rate: 16.5, c: 5 },
  ];
  const byId = (id) => STAFF.find((s) => s.id === id);
  const initials = (s) => s.name.split(' ').map((w) => w[0]).join('');
  const DAYS = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
  const LONG = ['lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado', 'domingo'];
  const MONTHS = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
  const now = new Date();
  const monday = new Date(now); monday.setDate(now.getDate() - ((now.getDay() + 6) % 7)); monday.setHours(0, 0, 0, 0);
  const dayDate = (d) => { const x = new Date(monday); x.setDate(monday.getDate() + d); return x; };
  const fmtDate = (d) => `${d.getDate()} ${MONTHS[d.getMonth()]}`;
  const todayIdx = (now.getDay() + 6) % 7;
  const hrs = (a, b) => { const [h1, m1] = a.split(':').map(Number); const [h2, m2] = b.split(':').map(Number); return Math.max(0, (h2 * 60 + m2 - h1 * 60 - m1) / 60); };

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
    { id: 1, emp: 4, day: 4, type: 'Día completo', reason: 'Evento familiar', status: 'pending' },
    { id: 2, emp: 5, day: 5, type: 'Mañana', reason: 'Cita médica', status: 'pending' },
    { id: 3, emp: 3, day: 2, type: 'Día completo', reason: 'Mudanza', status: 'approved' },
  ];
  const approvedTs = new Set();

  /* ---------- panel ---------- */
  const renderDashboard = () => {
    $('#today-label').textContent = `${LONG[todayIdx][0].toUpperCase() + LONG[todayIdx].slice(1)} ${now.getDate()} de ${MONTHS[now.getMonth()]}`;
    const inNow = clockLog.filter((c) => !c.out);
    const schedHours = shifts.reduce((s, x) => s + hrs(x.start, x.end), 0);
    const cost = shifts.reduce((s, x) => s + (x.emp ? hrs(x.start, x.end) * byId(x.emp).rate : 0), 0);
    const open = shifts.filter((x) => !x.emp).length;
    const pending = leave.filter((l) => l.status === 'pending').length;
    $('#kpis').innerHTML = `
      <div class="kpi-tile"><small>En turno ahora</small><b>${inNow.length}</b><em>de ${STAFF.length} empleados</em><span class="ic grad-blue">${icon('users')}</span></div>
      <div class="kpi-tile"><small>Horas programadas · semana</small><b>${schedHours.toFixed(1)}</b><em>${shifts.length} turnos</em><span class="ic grad-indigo">${icon('calendar')}</span></div>
      <div class="kpi-tile"><small>Costo de personal · semana</small><b>${money(cost)}</b><em>${(cost / 9800 * 100).toFixed(0)} % de las ventas previstas</em><span class="ic grad-violet">${icon('dollar')}</span></div>
      <div class="kpi-tile"><small>Requiere atención</small><b>${open + pending}</b><em class="${open + pending ? 'warn' : ''}">${open} turno${open === 1 ? '' : 's'} libre${open === 1 ? '' : 's'} · ${pending} permiso${pending === 1 ? '' : 's'}</em><span class="ic grad-amber">${icon('bell')}</span></div>`;
    const perDay = DAYS.map((_, d) => shifts.filter((x) => x.day === d).reduce((s, x) => s + hrs(x.start, x.end), 0));
    const max = Math.max(...perDay, 1);
    $('#hours-chart').innerHTML = `<div class="chart-bars">${perDay.map((h, d) => `<div title="${h.toFixed(1)} h"><i style="height:${(h / max * 100).toFixed(0)}%" class="${d === todayIdx ? 'alt' : ''}"></i></div>`).join('')}</div><div class="chart-labels">${DAYS.map((d, i) => `<span>${d}<br><b>${perDay[i].toFixed(0)} h</b></span>`).join('')}</div>`;
    $('#who-in').innerHTML = inNow.map((c) => { const s = byId(c.emp); return `<div class="list-row"><span class="avatar sm c${s.c}">${initials(s)}</span><div class="grow"><b>${s.name}</b><small>${s.role} · desde las ${time(c.in)}</small></div><span class="status-dot on"></span></div>`; }).join('') || '<div class="empty">Nadie ha marcado entrada. Prueba el reloj checador.</div>';
    const today = shifts.filter((x) => x.day === todayIdx).sort((a, b) => a.start.localeCompare(b.start));
    $('#today-shifts').innerHTML = today.map((x) => { const s = x.emp ? byId(x.emp) : null; const inLog = s && clockLog.find((c) => c.emp === s.id && !c.out); return `<div class="list-row">${s ? `<span class="avatar sm c${s.c}">${initials(s)}</span>` : `<span class="avatar sm" style="border:1px dashed var(--border-strong)">?</span>`}<div class="grow"><b>${s ? s.name : 'Turno libre'}</b><small>${x.start} a ${x.end}${s ? ' · ' + s.role : ' · falta cubrirlo'}</small></div>${inLog ? '<span class="mk-badge green">En turno</span>' : s ? '<span class="mk-badge blue">Programado</span>' : '<span class="mk-badge amber">Sin asignar</span>'}</div>`; }).join('') || '<div class="empty">No hay turnos hoy.</div>';
    $('#leave-count').textContent = pending || '';
  };

  /* ---------- horarios ---------- */
  const renderWeek = () => {
    $('#week-label').textContent = `Semana del ${fmtDate(monday)} al ${fmtDate(dayDate(6))}`;
    $('#week').innerHTML = DAYS.map((d, i) => {
      const list = shifts.filter((x) => x.day === i).sort((a, b) => a.start.localeCompare(b.start));
      const h = list.reduce((s, x) => s + hrs(x.start, x.end), 0);
      return `<div class="day-col ${i === todayIdx ? 'today' : ''}"><div class="day-head"><b>${d}</b><small>${fmtDate(dayDate(i))} · ${h.toFixed(0)} h</small></div>
        ${list.map((x) => { const s = x.emp ? byId(x.emp) : null; return `<button type="button" class="shift ${s ? 'c' + s.c : 'open'}" data-shift="${x.id}"><b>${s ? s.name.split(' ')[0] : 'Turno libre'}</b><span>${x.start} – ${x.end}</span></button>`; }).join('')}
        <button type="button" class="add-shift" data-day="${i}">${icon('plus')}Agregar turno</button></div>`;
    }).join('');
    $$('#week .add-shift').forEach((b) => b.addEventListener('click', () => shiftModal({ day: +b.dataset.day })));
    $$('#week .shift').forEach((b) => b.addEventListener('click', () => shiftModal(shifts.find((x) => x.id === +b.dataset.shift))));
  };
  const shiftModal = (shift) => {
    const isNew = !shift.id;
    const card = modal.open(`<h2>${isNew ? 'Agregar turno' : 'Editar turno'} · ${DAYS[shift.day]} ${fmtDate(dayDate(shift.day))}</h2>
      <div class="form-grid">
        <div class="field full"><label>Empleado</label><select class="input" name="emp"><option value="">Turno libre (sin asignar)</option>${STAFF.map((s) => `<option value="${s.id}" ${shift.emp === s.id ? 'selected' : ''}>${s.name} · ${s.role}</option>`).join('')}</select></div>
        <div class="field"><label>Inicio</label><input class="input" type="time" name="start" value="${shift.start || '09:00'}"></div>
        <div class="field"><label>Fin</label><input class="input" type="time" name="end" value="${shift.end || '17:00'}"></div>
      </div>
      <div class="modal-actions">${isNew ? '' : `<button class="btn btn-danger" type="button" data-remove>${icon('trash')}Quitar</button>`}<button class="btn btn-ghost" type="button" data-close>Cancelar</button><button class="btn btn-primary" type="button" data-save>${icon('check')}Guardar</button></div>`);
    $('[data-close]', card).addEventListener('click', modal.close);
    const rm = $('[data-remove]', card); if (rm) rm.addEventListener('click', () => { shifts = shifts.filter((x) => x.id !== shift.id); modal.close(); renderAll(); toast('Turno eliminado'); });
    $('[data-save]', card).addEventListener('click', () => {
      const emp = $('[name=emp]', card).value ? +$('[name=emp]', card).value : null;
      const start = $('[name=start]', card).value, end = $('[name=end]', card).value;
      if (hrs(start, end) <= 0) { toast('La hora de fin debe ser después del inicio', '', 'warn', 'alert'); return; }
      if (isNew) shifts.push({ id: shiftId++, day: shift.day, emp, start, end }); else Object.assign(shift, { emp, start, end });
      modal.close(); renderAll();
      toast(isNew ? 'Turno agregado' : 'Turno actualizado', emp ? `${byId(emp).name} recibirá el aviso cuando publiques.` : 'Quedó como turno libre.');
    });
  };
  $('#copy-week').addEventListener('click', () => { shifts = template.map(([emp, s, e], i) => ({ id: shiftId++, day: dayOf[i], emp, start: s, end: e })); renderAll(); toast('Semana pasada copiada', 'Ajusta lo que necesites y publica.', 'info', 'refresh'); });
  $('#publish').addEventListener('click', () => { const n = new Set(shifts.filter((x) => x.emp).map((x) => x.emp)).size; toast('Horario publicado', `${n} empleados recibieron sus turnos en el celular.`, 'ok', 'bell'); });

  /* ---------- reloj checador ---------- */
  let clockStage = 'pick', clockEmp = null, pin = '';
  const renderClockTime = () => { $('#clock-time').innerHTML = `<b>${time()}</b><span>${LONG[todayIdx][0].toUpperCase() + LONG[todayIdx].slice(1)} ${now.getDate()} de ${MONTHS[now.getMonth()]}</span>`; };
  const renderClock = () => {
    const stage = $('#clock-stage');
    if (clockStage === 'pick') {
      stage.innerHTML = `<p class="muted small" style="margin-bottom:.8rem">Toca tu nombre para marcar entrada o salida.</p><div class="pick-grid">${STAFF.map((s) => { const inLog = clockLog.find((c) => c.emp === s.id && !c.out); return `<button type="button" class="pick" data-emp="${s.id}"><span class="avatar c${s.c}">${initials(s)}</span><b>${s.name}</b><small>${inLog ? '<i class="status-dot on"></i> En turno desde ' + time(inLog.in) : s.role}</small></button>`; }).join('')}</div>`;
      $$('.pick', stage).forEach((b) => b.addEventListener('click', () => { clockEmp = byId(+b.dataset.emp); pin = ''; clockStage = 'pin'; renderClock(); }));
    } else if (clockStage === 'pin') {
      stage.innerHTML = `<div class="pin-head"><span class="avatar c${clockEmp.c}">${initials(clockEmp)}</span><div><b>${clockEmp.name}</b><small>Escribe tu PIN de 4 dígitos (en esta muestra funciona cualquiera)</small></div></div>
        <div class="pin-dots">${[0, 1, 2, 3].map((i) => `<i class="${i < pin.length ? 'on' : ''}"></i>`).join('')}</div>
        <div class="pin-pad">${[1, 2, 3, 4, 5, 6, 7, 8, 9, 'back', 0, 'ok'].map((k) => `<button type="button" data-key="${k}" class="${k === 'ok' ? 'ok' : ''}">${k === 'back' ? icon('arrow-left') : k === 'ok' ? icon('check') : k}</button>`).join('')}</div>
        <button type="button" class="btn-link" data-cancel>${icon('arrow-left')}¿No eres tú? Regresar</button>`;
      $('[data-cancel]', stage).addEventListener('click', () => { clockStage = 'pick'; renderClock(); });
      $$('[data-key]', stage).forEach((b) => b.addEventListener('click', () => {
        const k = b.dataset.key;
        if (k === 'back') pin = pin.slice(0, -1);
        else if (k === 'ok') { if (pin.length === 4) clockStage = 'action'; else toast('Escribe 4 dígitos', '', 'warn', 'alert'); }
        else if (pin.length < 4) pin += k;
        if (k !== 'ok' && pin.length === 4) clockStage = 'action';
        renderClock();
      }));
    } else {
      const inLog = clockLog.find((c) => c.emp === clockEmp.id && !c.out);
      const sched = shifts.find((x) => x.day === todayIdx && x.emp === clockEmp.id);
      stage.innerHTML = `<div class="pin-head"><span class="avatar c${clockEmp.c}">${initials(clockEmp)}</span><div><b>Hola, ${clockEmp.name.split(' ')[0]}</b><small>${sched ? `Tu turno de hoy: ${sched.start} a ${sched.end}` : 'No tienes turno programado hoy'}${inLog ? ` · en turno desde las ${time(inLog.in)}` : ''}</small></div></div>
        <div class="clock-actions">${inLog ? `<button type="button" class="btn btn-danger btn-lg" data-out>${icon('log-out')}Marcar salida</button><button type="button" class="btn btn-ghost btn-lg" data-break>${icon('coffee')}Iniciar descanso</button>` : `<button type="button" class="btn btn-success btn-lg" data-in>${icon('check')}Marcar entrada</button>`}</div>
        <button type="button" class="btn-link" data-cancel>${icon('arrow-left')}Regresar</button>`;
      $('[data-cancel]', stage).addEventListener('click', () => { clockStage = 'pick'; renderClock(); });
      const done = (msg) => { clockStage = 'pick'; renderAll(); toast(...msg); };
      const bi = $('[data-in]', stage); if (bi) bi.addEventListener('click', () => { const d = new Date(); clockLog.push({ emp: clockEmp.id, in: d, out: null }); const late = sched && `${pad(d.getHours())}:${pad(d.getMinutes())}` > sched.start; done([`${clockEmp.name} marcó entrada a las ${time(d)}`, late ? 'Señalado: llegó después de la hora programada.' : 'A tiempo.', late ? 'warn' : 'ok', late ? 'alert' : 'check']); });
      const bo = $('[data-out]', stage); if (bo) bo.addEventListener('click', () => { inLog.out = new Date(); const h = (inLog.out - inLog.in) / 36e5; done([`${clockEmp.name} marcó salida a las ${time(inLog.out)}`, `${h.toFixed(2)} horas registradas en la hoja de horas.`]); });
      const bb = $('[data-break]', stage); if (bb) bb.addEventListener('click', () => done([`Descanso iniciado para ${clockEmp.name}`, 'Los descansos se descuentan automáticamente según tus reglas.', 'info', 'coffee']));
    }
    const inNow = clockLog.filter((c) => !c.out);
    $('#clocked-in').innerHTML = inNow.map((c) => { const s = byId(c.emp); return `<div class="list-row"><span class="avatar sm c${s.c}">${initials(s)}</span><div class="grow"><b>${s.name}</b><small>desde las ${time(c.in)}</small></div><b class="timer" data-since="${c.in.getTime()}"></b></div>`; }).join('') || '<div class="empty">Nadie en turno.</div>';
    $('#clock-log').innerHTML = [...clockLog].reverse().map((c) => { const s = byId(c.emp); return `<div class="list-row"><span class="avatar sm c${s.c}">${initials(s)}</span><div class="grow"><b>${s.name}</b><small>Entrada ${time(c.in)}${c.out ? ` · Salida ${time(c.out)} · ${((c.out - c.in) / 36e5).toFixed(2)} h` : ' · sigue en turno'}</small></div><span class="mk-badge ${c.out ? 'blue' : 'green'}">${c.out ? 'Completo' : 'En turno'}</span></div>`; }).join('');
    tickTimers();
  };
  const tickTimers = () => { $$('.timer').forEach((t) => { const ms = Date.now() - +t.dataset.since; const h = Math.floor(ms / 36e5), m = Math.floor((ms % 36e5) / 6e4), s = Math.floor((ms % 6e4) / 1e3); t.textContent = `${pad(h)}:${pad(m)}:${pad(s)}`; }); };
  setInterval(() => { renderClockTime(); tickTimers(); }, 1000);

  /* ---------- permisos ---------- */
  const renderLeave = () => {
    $('#leave-list').innerHTML = leave.map((l) => { const s = byId(l.emp); return `<div class="list-row"><span class="avatar c${s.c}">${initials(s)}</span><div class="grow"><b>${s.name}</b><small>${DAYS[l.day]} ${fmtDate(dayDate(l.day))} · ${l.type} · ${l.reason}</small></div>
      ${l.status === 'pending' ? `<button class="btn btn-ghost btn-xs" type="button" data-decline="${l.id}">Rechazar</button><button class="btn btn-success btn-xs" type="button" data-approve="${l.id}">${icon('check')}Aprobar</button>` : `<span class="mk-badge ${l.status === 'approved' ? 'green' : 'red'}">${l.status === 'approved' ? 'Aprobado' : 'Rechazado'}</span>`}</div>`; }).join('');
    $$('#leave-list [data-approve]').forEach((b) => b.addEventListener('click', () => {
      const l = leave.find((x) => x.id === +b.dataset.approve); l.status = 'approved';
      let freed = 0; shifts.forEach((x) => { if (x.day === l.day && x.emp === l.emp) { x.emp = null; freed++; } });
      renderAll(); toast(`Permiso aprobado para ${byId(l.emp).name}`, freed ? `${freed} turno del ${DAYS[l.day]} quedó libre. El empleado ya recibió el aviso.` : 'El empleado ya recibió el aviso.', 'ok', 'check');
    }));
    $$('#leave-list [data-decline]').forEach((b) => b.addEventListener('click', () => { const l = leave.find((x) => x.id === +b.dataset.decline); l.status = 'declined'; renderAll(); toast('Solicitud rechazada', `${byId(l.emp).name} ya recibió el aviso.`, 'info', 'x'); }));
  };

  /* ---------- hojas de horas ---------- */
  const tsRows = () => STAFF.map((s) => {
    const sched = shifts.filter((x) => x.emp === s.id).reduce((a, x) => a + hrs(x.start, x.end), 0);
    const clocked = clockLog.filter((c) => c.emp === s.id).reduce((a, c) => a + ((c.out || new Date()) - c.in) / 36e5, 0) + sched * 0.92;
    const ot = Math.max(0, clocked - 38);
    return { s, sched, clocked, ot, pay: clocked * s.rate + ot * s.rate * 0.5 };
  });
  const renderTs = () => {
    $('#ts-label').textContent = `Semana del ${fmtDate(monday)} al ${fmtDate(dayDate(6))}`;
    const rows = tsRows();
    $('#ts-table').innerHTML = `<thead><tr><th>Empleado</th><th class="num">Programadas</th><th class="num">Marcadas</th><th class="num">Tiempo extra</th><th class="num">Tarifa</th><th class="num">Pago</th><th>Estado</th></tr></thead><tbody>${rows.map((r) => `<tr><td><div class="row" style="gap:.6rem;flex-wrap:nowrap"><span class="avatar sm c${r.s.c}">${initials(r.s)}</span><div><b>${r.s.name}</b><small class="muted" style="display:block">${r.s.role}</small></div></div></td><td class="num">${r.sched.toFixed(1)} h</td><td class="num">${r.clocked.toFixed(1)} h</td><td class="num">${r.ot ? `<span class="mk-badge amber">${r.ot.toFixed(1)} h</span>` : '—'}</td><td class="num">${money(r.s.rate)}</td><td class="num"><b>${money(r.pay)}</b></td><td>${approvedTs.has(r.s.id) ? '<span class="mk-badge green">Aprobada</span>' : '<span class="mk-badge blue">Por revisar</span>'}</td></tr>`).join('')}</tbody><tfoot><tr><td><b>Total</b></td><td class="num">${rows.reduce((a, r) => a + r.sched, 0).toFixed(1)} h</td><td class="num">${rows.reduce((a, r) => a + r.clocked, 0).toFixed(1)} h</td><td class="num">${rows.reduce((a, r) => a + r.ot, 0).toFixed(1)} h</td><td></td><td class="num"><b>${money(rows.reduce((a, r) => a + r.pay, 0))}</b></td><td></td></tr></tfoot>`;
  };
  $('#approve-all').addEventListener('click', () => { STAFF.forEach((s) => approvedTs.add(s.id)); renderTs(); toast('Todas las hojas aprobadas', 'Listas para exportar a nómina.'); });
  $('#export').addEventListener('click', () => {
    const rows = tsRows();
    const csv = ['Empleado,Puesto,Horas programadas,Horas marcadas,Tiempo extra,Tarifa,Pago', ...rows.map((r) => `"${r.s.name}",${r.s.role},${r.sched.toFixed(2)},${r.clocked.toFixed(2)},${r.ot.toFixed(2)},${r.s.rate},${r.pay.toFixed(2)}`)].join('\n');
    download(`horas_semana_${fmtDate(monday).replace(/\s/g, '-')}.csv`, csv);
    toast('Hoja de horas exportada', 'Un archivo CSV que tu proveedor de nómina o contador puede abrir.', 'ok', 'download');
  });

  const renderAll = () => { renderDashboard(); renderWeek(); renderClock(); renderLeave(); renderTs(); };
  renderClockTime(); renderAll();
  const show = views();

  /* ---------- guía ---------- */
  tour.auto([
    { title: 'Así se ve la gestión de personal de tu negocio', text: 'Este panel corre en un pequeño servidor dentro de tu local. Te guiamos por las 4 cosas que harías cada semana: armar el horario, marcar entradas, aprobar permisos y exportar las horas a nómina.' },
    { target: '#kpis', title: 'Tu semana de un vistazo', text: 'Quién está en turno ahora, cuántas horas programaste, cuánto te cuesta el personal y qué necesita tu atención.' },
    { target: '[data-nav="schedule"]', title: 'Arma el horario semanal', text: 'Entra a <b>Horarios</b>. Ahí agregas turnos con un toque, copias la semana pasada y publicas para que cada empleado reciba sus turnos en el celular.', action: 'Toca "Horarios" para continuar', advanceOn: '[data-nav="schedule"]', delay: 300 },
    { target: '#week', title: 'Agrega o cambia un turno', text: 'Toca <b>+ Agregar turno</b> en un día, elige a la persona y la hora. Los turnos punteados están libres y hay que cubrirlos.', action: 'Prueba agregar un turno (opcional)' },
    { target: '[data-nav="clock"]', title: 'El reloj checador', text: 'Esta pantalla vive en la tableta de la entrada. Cada empleado toca su nombre, escribe su PIN y marca entrada o salida. Las llegadas tarde quedan señaladas.', action: 'Toca "Reloj checador" para verlo', advanceOn: '[data-nav="clock"]', delay: 300, before: () => {} },
    { target: '#clock-tablet', title: 'Marca una entrada', text: 'Toca un nombre, escribe cualquier PIN de 4 dígitos y marca la entrada. Verás cómo aparece en "En turno ahora" y en la hoja de horas.', action: 'Prueba marcar una entrada (opcional)' },
    { target: '[data-nav="leave"]', title: 'Permisos con un toque', text: 'Cuando alguien pide un día libre desde su celular, aparece aquí. Al aprobarlo, su turno queda libre en el horario automáticamente.', action: 'Toca "Permisos"', advanceOn: '[data-nav="leave"]', delay: 300 },
    { target: '[data-nav="timesheets"]', title: 'Horas listas para la nómina', text: 'Al cierre de la semana, las horas ya están calculadas con tiempo extra. Apruebas y exportas un archivo que tu contador o proveedor de nómina abre directo.', action: 'Toca "Hojas de horas"', advanceOn: '[data-nav="timesheets"]', delay: 300 },
    { title: 'Eso es todo', text: 'Todo lo que viste corre en tu local, sin cuotas por empleado. Sigue explorando o usa el botón "Ver guía paso a paso" para repetir el recorrido.' },
  ], { key: 'employees' });
  void show;
})();
