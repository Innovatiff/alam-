(() => {
  const { $, $$, toast, icon, esc } = window.Demo;

  const TYPES = [
    { id: 'restaurant', name: 'Restaurant / takeaway', icon: 'utensils', mods: ['ordering', 'pos', 'inventory', 'staff', 'reports'] },
    { id: 'cafe', name: 'Café / bakery', icon: 'coffee', mods: ['pos', 'inventory', 'staff', 'loyalty', 'reports'] },
    { id: 'retail', name: 'Retail store', icon: 'store', mods: ['pos', 'inventory', 'loyalty', 'staff', 'reports'] },
    { id: 'salon', name: 'Salon / barber', icon: 'scissors', mods: ['bookings', 'ai', 'pos', 'loyalty', 'reports'] },
    { id: 'garage', name: 'Garage / workshop', icon: 'car', mods: ['jobs', 'invoicing', 'ai', 'inventory', 'reports'] },
    { id: 'clinic', name: 'Clinic / practice', icon: 'heart-pulse', mods: ['bookings', 'ai', 'invoicing', 'reports'] },
    { id: 'gym', name: 'Gym / studio', icon: 'dumbbell', mods: ['members', 'bookings', 'pos', 'staff', 'reports'] },
    { id: 'other', name: 'Something else', icon: 'sparkles', mods: ['reports'] },
  ];
  const MODULES = [
    { id: 'ordering', name: 'Online ordering', icon: 'globe', desc: 'Website with pickup and delivery orders', hw: ['Order tablet', 'Ticket printer'], product: 'website-ordering' },
    { id: 'pos', name: 'Point of sale', icon: 'pos', desc: 'Touch-screen till, card and cash', hw: ['POS terminal', 'Receipt printer', 'Cash drawer', 'Card reader'], product: 'pos-system' },
    { id: 'inventory', name: 'Inventory', icon: 'boxes', desc: 'Stock levels, alerts, purchase orders', hw: ['Barcode scanner'], product: 'inventory-software' },
    { id: 'staff', name: 'Staff & schedules', icon: 'users', desc: 'Rota, time clock, timesheets', hw: ['Clock-in tablet'], product: 'employee-management' },
    { id: 'ai', name: 'AI receptionist', icon: 'headset', desc: 'Answers calls, books, takes messages', hw: ['Phone line forwarding'], product: 'ai-receptionist' },
    { id: 'bookings', name: 'Bookings & appointments', icon: 'calendar', desc: 'Online booking, reminders, calendar', hw: [], product: 'custom-software' },
    { id: 'loyalty', name: 'Customer loyalty', icon: 'gift', desc: 'Points, rewards, customer list', hw: [], product: 'custom-software' },
    { id: 'invoicing', name: 'Quotes & invoicing', icon: 'file', desc: 'Quotes, invoices, payments, reminders', hw: [], product: 'custom-software' },
    { id: 'jobs', name: 'Jobs & work orders', icon: 'wrench', desc: 'Track each job from intake to done', hw: [], product: 'custom-software' },
    { id: 'delivery', name: 'Delivery tracking', icon: 'truck', desc: 'Drivers, routes, proof of delivery', hw: ['Driver phones'], product: 'custom-software' },
    { id: 'members', name: 'Memberships', icon: 'user', desc: 'Plans, renewals, check-in at the door', hw: ['Check-in tablet'], product: 'custom-software' },
    { id: 'reports', name: 'Reports dashboard', icon: 'bar-chart', desc: 'The whole business on one screen', hw: [], product: 'custom-software' },
  ];
  const WIDGETS = {
    ordering: () => `<div class="pw"><small>Online orders today</small><b>38</b><div class="pw-list"><span>#1043 Pickup 12:30 <em class="mk-badge amber">Preparing</em></span><span>#1044 Delivery <em class="mk-badge blue">New</em></span></div></div>`,
    pos: () => `<div class="pw"><small>Sales today</small><b>$2,840</b><div class="bars" style="height:44px">${[40, 60, 50, 80, 70, 95, 85].map((h, i) => `<i style="--h:${h}%;--i:${i}"></i>`).join('')}</div></div>`,
    inventory: () => `<div class="pw"><small>Stock</small><b>3 low</b><div class="pw-list"><span>Oat milk <em class="mk-badge red">5 / 12</em></span><span>Cups 8 oz <em class="mk-badge red">4 / 8</em></span></div></div>`,
    staff: () => `<div class="pw"><small>On shift</small><b>6 of 9</b><div class="pw-avatars"><i class="c0">SK</i><i class="c1">ML</i><i class="c2">JP</i><i class="c3">AR</i><i class="c4">+2</i></div></div>`,
    ai: () => `<div class="pw"><small>Calls answered</small><b>96%</b><div class="wave" style="height:26px;margin:.3rem 0 0">${Array.from({ length: 7 }, (_, i) => `<i style="--i:${i}"></i>`).join('')}</div></div>`,
    bookings: () => `<div class="pw"><small>Next appointments</small><b>14:30</b><div class="pw-list"><span>Emma W. · Haircut</span><span>15:30 · Tom R. · Colour</span></div></div>`,
    loyalty: () => `<div class="pw"><small>Loyalty members</small><b>1,284</b><div class="lvl" style="margin-top:.4rem"><i style="--w:72%"></i></div><small>72% returned this month</small></div>`,
    invoicing: () => `<div class="pw"><small>Unpaid invoices</small><b>$4,120</b><div class="pw-list"><span>INV-231 · Due Fri <em class="mk-badge amber">Sent</em></span><span>INV-228 <em class="mk-badge green">Paid</em></span></div></div>`,
    jobs: () => `<div class="pw"><small>Jobs in progress</small><b>7</b><div class="pw-list"><span>#J-88 Brake service <em class="mk-badge blue">Bay 2</em></span><span>#J-89 MOT <em class="mk-badge amber">Waiting parts</em></span></div></div>`,
    delivery: () => `<div class="pw"><small>Deliveries out</small><b>4</b><div class="pw-list"><span>Van 1 · 3 stops left</span><span>Van 2 · back 16:10</span></div></div>`,
    members: () => `<div class="pw"><small>Check-ins today</small><b>142</b><div class="lvl" style="margin-top:.4rem"><i style="--w:58%"></i></div><small>12 renewals due this week</small></div>`,
    reports: () => `<div class="pw"><small>This week vs last</small><b class="up">+12%</b><div class="bars" style="height:44px">${[50, 55, 45, 70, 65, 90, 80].map((h, i) => `<i style="--h:${h}%;--i:${i}"></i>`).join('')}</div></div>`,
  };

  let type = TYPES[0];
  const selected = new Set(type.mods);
  let locations = 1, terminals = 1;

  const renderTypes = () => {
    $('#types').innerHTML = TYPES.map((t) => `<button type="button" class="type ${t.id === type.id ? 'on' : ''}" data-t="${t.id}">${icon(t.icon)}<span>${t.name}</span></button>`).join('');
    $$('#types .type').forEach((b) => b.addEventListener('click', () => { type = TYPES.find((t) => t.id === b.dataset.t); selected.clear(); type.mods.forEach((m) => selected.add(m)); renderAll(); toast(`Suggested modules for a ${type.name.toLowerCase()}`, 'Switch any of them on or off.', 'info', 'sparkles'); }));
  };
  const renderModules = () => {
    $('#modules').innerHTML = MODULES.map((m) => `<button type="button" class="mod-card ${selected.has(m.id) ? 'on' : ''}" data-m="${m.id}" aria-pressed="${selected.has(m.id)}"><span class="icon-ring">${icon(m.icon)}</span><span class="mod-text"><b>${m.name}</b><small>${m.desc}</small></span><span class="switch ${selected.has(m.id) ? 'on' : ''}"></span></button>`).join('');
    $$('#modules .mod-card').forEach((b) => b.addEventListener('click', () => { const id = b.dataset.m; if (selected.has(id)) selected.delete(id); else selected.add(id); renderModules(); renderPreview(); renderSummary(); }));
    $('#mod-count').textContent = `${selected.size} selected`;
  };
  const renderPreview = () => {
    const mods = MODULES.filter((m) => selected.has(m.id));
    $('#preview').innerHTML = `<div class="device-bar"><i></i><i></i><i></i><span class="url">${esc(type.name.toLowerCase())}.local · your system</span></div>
      <div class="pv"><aside class="pv-side"><div class="pv-brand"><i></i>Your business</div>${mods.map((m, i) => `<span class="pv-nav ${i === 0 ? 'on' : ''}" style="--i:${i}">${icon(m.icon)}${m.name}</span>`).join('')}<span class="pv-foot">${icon('server')}On-site server</span></aside>
      <div class="pv-main">${mods.length ? mods.map((m, i) => `<div class="pv-widget" style="--i:${i}"><div class="pv-w-head">${icon(m.icon)}${m.name}</div>${WIDGETS[m.id]()}</div>`).join('') : '<div class="empty" style="grid-column:1/-1">Select at least one module to see your system.</div>'}</div></div>`;
  };
  const renderSummary = () => {
    const mods = MODULES.filter((m) => selected.has(m.id));
    const hw = new Set(); mods.forEach((m) => m.hw.forEach((h) => hw.add(h)));
    const hwList = [...hw].map((h) => (h === 'POS terminal' && terminals > 1 ? `${terminals} × POS terminals` : h));
    if (selected.size) hwList.push(`${locations > 1 ? locations + ' × ' : ''}On-site server`);
    if ($('#x-display').checked && selected.has('pos')) hwList.push('Customer display');
    const days = Math.max(1, Math.ceil(mods.length / 4)) * locations + (mods.some((m) => m.product === 'custom-software') ? 1 : 0);
    const custom = mods.filter((m) => m.product === 'custom-software');
    const products = [...new Set(mods.map((m) => m.product))];
    const note = `Business type: ${type.name}. Modules: ${mods.map((m) => m.name).join(', ') || 'none yet'}. Locations: ${locations}. Registers: ${terminals}. Extras: ${['x-remote', 'x-backup', 'x-display', 'x-multi'].filter((id) => $('#' + id).checked).map((id) => $('#' + id).parentElement.textContent.trim()).join(', ') || 'none'}.`;
    const url = `../contact.html?${products.map((p) => `interest=${p}`).join('&')}&business=${encodeURIComponent(type.name)}&note=${encodeURIComponent(note)}`;
    $('#summary').innerHTML = `<div class="panel-head"><h3>${icon('sparkles')}Your tailored system</h3><span class="tag violet">${mods.length} module${mods.length === 1 ? '' : 's'}</span></div>
      <div class="sum-grid">
        <div><small>Built around</small><b>${esc(type.name)}</b></div>
        <div><small>Installed in</small><b>${locations} location${locations > 1 ? 's' : ''}</b></div>
        <div><small>Installation</small><b>about ${days} day${days > 1 ? 's' : ''} on site</b></div>
        <div><small>Custom-built parts</small><b>${custom.length ? custom.map((m) => m.name).join(', ') : 'none needed'}</b></div>
      </div>
      <div class="sum-block"><small>Hardware we would supply and install</small><div class="row" style="gap:.4rem">${hwList.map((h) => `<span class="hw-chip">${icon('check')}${esc(h)}</span>`).join('') || '<span class="muted small">Pick modules first</span>'}</div></div>
      <div class="sum-block"><small>Everything connects on one on-site server</small><p class="small muted">Works without internet, your data stays in your building, ${$('#x-remote').checked ? 'with secure access from outside' : 'no outside access unless you want it'}${$('#x-backup').checked ? ', plus an encrypted off-site backup' : ''}.</p></div>
      <a class="btn btn-primary btn-lg" href="${url}" style="width:100%">${icon('mail')}Request a quote for this system</a>
      <p class="muted small center" style="margin-top:.6rem">Opens the contact form with your selection filled in.</p>`;
  };
  $$('#locations button').forEach((b) => b.addEventListener('click', () => { locations = +b.dataset.v; $$('#locations button').forEach((x) => x.classList.toggle('on', x === b)); renderSummary(); }));
  $('#terminals').addEventListener('input', (e) => { terminals = +e.target.value; $('#term-label').textContent = terminals; renderSummary(); });
  ['x-remote', 'x-backup', 'x-display', 'x-multi'].forEach((id) => $('#' + id).addEventListener('change', renderSummary));
  const renderAll = () => { renderTypes(); renderModules(); renderPreview(); renderSummary(); };
  renderAll();
})();
