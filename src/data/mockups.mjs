/**
 * Illustration & mockup library.  Everything is HTML/CSS (styles live in assets/css/site.css,
 * section "mockups"), so it stays crisp at any size and animates without images.
 */
const I = (n) => `<svg><use href="#i-${n}"/></svg>`;
const phone = (inner, cls = '') => `<div class="phone ${cls}"><div class="phone-screen"><div class="phone-notch"></div>${inner}</div></div>`;
const device = (inner, cls = '', url = '') =>
  `<div class="device ${cls}"><div class="device-bar"><i></i><i></i><i></i>${url ? `<span class="url">${url}</span>` : ''}</div>${inner}</div>`;
const lvl = (w, cls = '') => `<div class="lvl ${cls}"><i style="--w:${w}"></i></div>`;
const wave = (n = 7, cls = '') => `<div class="wave ${cls}">${Array.from({ length: n }, (_, i) => `<i style="--i:${i}"></i>`).join('')}</div>`;
const barcode = () => `<div class="barcode">${Array.from({ length: 14 }, (_, i) => `<i style="--w:${[1, 2, 1, 3, 1, 1, 2, 1, 1, 3, 1, 2, 1, 1][i]}"></i>`).join('')}</div>`;

/* ---------------------------------------------------------------- hero art */
const HERO = {
  'website-ordering': () => `<div class="hero-art ha-order" aria-hidden="true">
    <div class="float p1">${phone(`
      <div class="os-head"><span class="os-logo"></span><b>Bella Cucina</b><span class="os-cart">${I('bag')}<i class="os-cnt">1</i></span></div>
      <div class="os-banner"><b>Order online</b><small>Pickup in 15 min · Delivery in 30 min</small></div>
      <div class="os-chips"><span class="on">Pizza</span><span>Pasta</span><span>Salads</span><span>Drinks</span></div>
      <div class="os-item"><div class="os-img g1"></div><div><b>Margherita</b><small>Tomato, mozzarella, basil</small></div><span class="os-price">$14.50</span><span class="os-add a1">${I('plus')}</span></div>
      <div class="os-item"><div class="os-img g2"></div><div><b>Diavola</b><small>Spicy salami, chili</small></div><span class="os-price">$16.00</span><span class="os-add">${I('plus')}</span></div>
      <div class="os-item"><div class="os-img g3"></div><div><b>Tiramisu</b><small>Homemade</small></div><span class="os-price">$7.00</span><span class="os-add">${I('plus')}</span></div>
      <div class="os-cartbar"><span>1 item · $14.50</span><b>View cart</b></div>`)}</div>
    <div class="ha-card ha-neworder"><div class="title">${I('bell')}New order <b>#1043</b><span class="mk-badge blue">Pickup 12:30</span></div><div class="ha-line"><span>1 × Margherita</span><span>$14.50</span></div><div class="ha-line muted"><span>Note: extra basil, please</span></div><div class="ha-accept"><span class="mk-btn a">Accept order</span><span class="mk-btn b green">${I('check')}Accepted</span></div></div>
    <div class="ha-card ha-status"><div class="title">${I('clock')}Order #1043</div><div class="ha-steps"><div class="s s1"><i></i><span>Received</span></div><div class="s s2"><i></i><span>Preparing</span></div><div class="s s3"><i></i><span>Ready</span></div></div></div>
    <div class="ha-card ha-notify"><div class="title">${I('message')}SMS to customer</div><p>Hi Sarah, your order #1043 is ready for pickup. See you soon!</p></div>
  </div>`,

  'employee-management': () => `<div class="hero-art ha-staff" aria-hidden="true">
    <div class="float d1">${device(`
      <div class="sc"><div class="sc-head"><b>Week 37 · 8 to 14 Sep</b><span class="mk-btn">Publish</span></div>
      <div class="sc-grid">
        ${['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map((d, c) => `<div class="sc-col"><span>${d}</span>${[0, 1, 2].map((r) => (c === 2 && r === 2) ? '<i class="sh open" style="--i:' + (c * 3 + r) + '">Open shift</i>' : `<i class="sh c${(c + r) % 4}" style="--i:${c * 3 + r}">${['Sam K.', 'Maria L.', 'Jon P.', 'Ava R.'][(c + r) % 4]}</i>`).join('')}</div>`).join('')}
      </div></div>`, 'sc-device', 'staff.local / schedule')}</div>
    <div class="ha-card ha-clockin"><div class="title"><span class="mk-avatar">SK</span>Sam K. <small class="muted">· Barista</small></div><div class="ha-clockwrap"><span class="mk-btn a">Clock in</span><span class="ha-onshift b"><i></i>On shift since 08:58</span></div></div>
    <div class="ha-card ha-leave"><div class="title">${I('calendar')}Leave request</div><p><b>Maria L.</b> · Fri 12 Sep · Full day</p><div class="ha-leavebtns"><span class="a"><span class="mk-btn">Approve</span><span class="mk-btn ghost">Decline</span></span><span class="mk-badge green b">${I('check')}Approved · schedule updated</span></div></div>
  </div>`,

  'pos-system': () => `<div class="hero-art ha-pos" aria-hidden="true">
    <div class="float d1">${device(`
      <div class="pos"><div class="pos-grid">${[['Latte', '4.50', 'i1'], ['Cappuccino', '4.00', ''], ['Croissant', '3.20', 'i2'], ['Bagel', '3.80', ''], ['Juice', '4.20', 'i3'], ['Muffin', '3.50', '']].map(([n, p, c]) => `<div class="pos-tile ${c}"><b>${n}</b><span>$${p}</span></div>`).join('')}</div>
      <div class="pos-cart"><div class="pc-head">Sale #482 <span>Register 1</span></div><div class="pc-item i1"><span>Latte</span><span>$4.50</span></div><div class="pc-item i2"><span>Croissant</span><span>$3.20</span></div><div class="pc-item i3"><span>Juice</span><span>$4.20</span></div><div class="pc-total"><span>Total</span><span class="pc-amt"><i class="t0">$0.00</i><i class="t1">$4.50</i><i class="t2">$7.70</i><i class="t3">$11.90</i></span></div><span class="mk-btn pc-charge">Charge $11.90</span></div></div>`, 'pos-device')}</div>
    <div class="ha-card ha-reader"><div class="reader"><div class="reader-screen"><span class="r0">Tap or insert card</span><span class="r1"><i class="spin"></i>Processing…</span><span class="r2">${I('check')}Approved</span></div><div class="reader-slot"></div></div><div class="ha-line muted"><span>Card reader</span><span>$11.90</span></div></div>
    <div class="ha-printer"><div class="printer-head">${I('printer')}<span>Receipt printer</span></div><div class="paper"><b>Sunrise Café</b><span>Latte ............ $4.50</span><span>Croissant ....... $3.20</span><span>Juice ............ $4.20</span><b>Total ........... $11.90</b><small>Paid by card · Thank you!</small></div></div>
  </div>`,

  'ai-receptionist': () => `<div class="hero-art ha-ai" aria-hidden="true">
    <div class="float p1">${phone(`
      <div class="call">
        <div class="call-in"><div class="call-avatar"><i></i><i></i>${I('user')}</div><b>Incoming call</b><small>Emma · +1 555 0134</small><div class="call-btns"><span class="red">${I('phone-off')}</span><span class="green">${I('phone')}</span></div></div>
        <div class="call-on"><div class="call-ai">${I('headset')}</div><b>AI receptionist</b><small>Answered for Bloom Salon</small>${wave(9)}<small class="call-timer">Listening…</small></div>
      </div>`)}</div>
    <div class="ha-card ha-transcript"><div class="title">${I('message')}Live transcript</div>
      <div class="bub ai b1">Thanks for calling Bloom Salon, how can I help?</div>
      <div class="bub me b2">I'd like a haircut on Tuesday afternoon.</div>
      <div class="bub ai b3">Tuesday at 2:30 pm is free. Shall I book it for you?</div>
      <div class="bub me b4">Yes please.</div>
    </div>
    <div class="ha-card ha-cal"><div class="title">${I('calendar')}Tuesday 16 Sep</div><div class="cal-rows"><div class="cal-row"><span>13:30</span><i></i></div><div class="cal-row"><span>14:30</span><b class="cal-appt">Haircut · Emma</b></div><div class="cal-row"><span>15:30</span><i></i></div></div></div>
    <div class="ha-card ha-summary"><div class="title">${I('check')}Summary sent to you</div><p>Emma booked a haircut, Tuesday 2:30 pm. Confirmation SMS sent to the caller.</p></div>
  </div>`,

  'inventory-software': () => `<div class="hero-art ha-inv" aria-hidden="true">
    <div class="float d1">${device(`
      <div class="inv"><div class="inv-head"><b>Stock levels</b><span class="mk-badge red inv-alert">${I('alert')}1 item low</span></div>
      <div class="inv-row"><span>Espresso beans 1 kg</span>${lvl('78%')}<b>39</b></div>
      <div class="inv-row"><span>Oat milk 1 L</span><div class="lvl drain"><i></i></div><b class="inv-cnt"><i class="c0">24</i><i class="c1">3</i><i class="c2">27</i></b></div>
      <div class="inv-row"><span>Croissants (frozen)</span>${lvl('62%')}<b>124</b></div>
      <div class="inv-row"><span>Cups 12 oz</span>${lvl('90%')}<b>900</b></div>
      <div class="inv-row"><span>Paper bags</span>${lvl('45%')}<b>450</b></div></div>`, 'inv-device', 'stock.local / levels')}</div>
    <div class="ha-card ha-scan"><div class="scanbox">${barcode()}<div class="beam"></div></div><div class="ha-line"><span>Receiving delivery</span><b class="mk-badge green">+24 Oat milk</b></div></div>
    <div class="ha-card ha-po"><div class="title">${I('file')}Purchase order PO-218</div><div class="ha-line"><span>Oat milk 1 L × 48</span><span>$62.40</span></div><div class="ha-line muted"><span>Supplier: Northside Dairy</span></div><span class="mk-badge blue" style="margin-top:6px">${I('check')}Sent by email</span></div>
  </div>`,

  'custom-software': () => `<div class="hero-art ha-custom" aria-hidden="true">
    <div class="blueprint"></div>
    <div class="float d1">${device(`
      <div class="app"><div class="app-side"><i></i><i></i><i></i><i></i><i></i></div><div class="app-main"><div class="slot s1"></div><div class="slot s2"></div><div class="slot s3"></div><div class="slot s4"></div></div></div>`, 'custom-device', 'yourbusiness.local')}</div>
    <div class="mod m1">${I('calendar')}<span>Bookings</span></div>
    <div class="mod m2">${I('file')}<span>Invoices</span></div>
    <div class="mod m3">${I('users')}<span>Customers</span></div>
    <div class="mod m4">${I('bar-chart')}<span>Reports</span></div>
    <svg class="mod-lines" viewBox="0 0 560 460"><path d="M215 165 H335 M215 275 H335 M275 165 V275" /></svg>
    <div class="ha-card ha-tailored"><div class="title">${I('sparkles')}Your system</div><p>4 modules · built around your process · installed on site</p></div>
  </div>`,
};

export const heroArt = (slug, thumb = false) => {
  const fn = HERO[slug];
  if (!fn) return '';
  return thumb ? `<div class="thumb">${fn()}</div>` : fn();
};

/* ---------------------------------------------------------------- flow art */
const bars = (vals) => `<div class="bars">${vals.map((h, i) => `<i style="--h:${h}%;--i:${i}"></i>`).join('')}</div>`;
const FLOW = {
  'phone-order': () => `<div class="fa fa-phone" aria-hidden="true"><div class="mini-phone"><div class="mp-bar"></div><div class="mp-item"><i class="g1"></i><span></span><b>+</b></div><div class="mp-item"><i class="g2"></i><span></span><b class="press">+</b></div><div class="mp-item"><i class="g3"></i><span></span><b>+</b></div><div class="mp-cta">Checkout · $21.50</div></div><div class="fa-bubble">${I('check')}Order placed</div></div>`,
  ticket: () => `<div class="fa fa-ticket" aria-hidden="true"><div class="tk-printer">${I('printer')}<span>Counter printer</span></div><div class="tk-paper"><b>ORDER #1043</b><span>Pickup · 12:30</span><span>1 × Margherita</span><span>1 × Tiramisu</span><b>Total $21.50</b></div></div>`,
  status: () => `<div class="fa fa-status" aria-hidden="true"><div class="st-line"><div class="st s1"><i></i><span>Received</span></div><div class="st s2"><i></i><span>Preparing</span></div><div class="st s3"><i></i><span>Ready</span></div></div><div class="fa-bubble late">${I('message')}"Your order is ready"</div></div>`,
  report: () => `<div class="fa fa-report" aria-hidden="true"><div class="rp"><small>Sales this week</small>${bars([40, 55, 48, 70, 62, 90, 78])}</div><div class="rp-list"><div><span>Margherita</span><b>128</b></div><div><span>Diavola</span><b>96</b></div><div><span>Tiramisu</span><b>74</b></div></div></div>`,
  team: () => `<div class="fa fa-team" aria-hidden="true">${[['SK', 'Sam K.', 'Barista', '$16.50/h'], ['ML', 'Maria L.', 'Manager', '$22.00/h'], ['JP', 'Jon P.', 'Cook', '$18.00/h'], ['AR', 'Ava R.', 'Server', '$15.00/h']].map(([i, n, r, p], k) => `<div class="tm-row" style="--i:${k}"><span class="mk-avatar">${i}</span><div><b>${n}</b><small>${r}</small></div><em>${p}</em></div>`).join('')}</div>`,
  schedule: () => `<div class="fa fa-sched" aria-hidden="true"><div class="sg">${['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d, c) => `<div class="sg-col"><span>${d}</span>${[0, 1].map((r) => `<i class="sh c${(c + r) % 4}" style="--i:${c * 2 + r}"></i>`).join('')}</div>`).join('')}</div></div>`,
  clock: () => `<div class="fa fa-clock" aria-hidden="true"><div class="kp"><div class="kp-dots"><i></i><i></i><i></i><i></i></div><div class="kp-keys">${[1, 2, 3, 4, 5, 6, 7, 8, 9].map((k) => `<span class="${k === 4 || k === 8 || k === 2 || k === 9 ? 'hit' : ''}">${k}</span>`).join('')}</div></div><div class="fa-bubble">${I('check')}Sam clocked in at 08:58</div></div>`,
  export: () => `<div class="fa fa-export" aria-hidden="true"><div class="ts"><div class="ts-row h"><span>Employee</span><span>Hours</span><span>Pay</span></div><div class="ts-row"><span>Sam K.</span><span>38.5</span><span>$635</span></div><div class="ts-row"><span>Maria L.</span><span>40.0</span><span>$880</span></div><div class="ts-row"><span>Jon P.</span><span>32.0</span><span>$576</span></div></div><div class="fa-bubble">${I('download')}timesheet_week37.xlsx</div></div>`,
  install: () => `<div class="fa fa-install" aria-hidden="true"><div class="ck"><b>${I('wrench')}Installation day</b>${['Mount terminal and printer', 'Connect cash drawer and scanner', 'Set up network and backups', 'Import products and prices', 'Print test receipts and train team'].map((t, i) => `<div class="ck-row" style="--i:${i}"><i>${I('check')}</i><span>${t}</span></div>`).join('')}</div></div>`,
  products: () => `<div class="fa fa-products" aria-hidden="true"><div class="sheet">${[0, 1, 2, 3, 4].map((i) => `<div class="sheet-row" style="--i:${i}"><i></i><i></i><i></i></div>`).join('')}</div><div class="fa-arrow">${I('arrow-right')}</div><div class="ptiles">${[['Latte', '4.50'], ['Bagel', '3.80'], ['Juice', '4.20'], ['Muffin', '3.50']].map(([n, p], i) => `<div class="ptile" style="--i:${i}"><b>${n}</b><span>$${p}</span></div>`).join('')}</div></div>`,
  sale: () => `<div class="fa fa-sale" aria-hidden="true"><div class="sl-grid">${['Latte', 'Bagel', 'Juice', 'Muffin', 'Tea', 'Cookie'].map((n, i) => `<span class="${i < 3 ? 'hit' : ''}" style="--i:${i}">${n}</span>`).join('')}</div><div class="sl-cart"><span>3 items</span><b>$11.90</b><i class="mk-btn">Charge</i></div></div>`,
  eod: () => `<div class="fa fa-eod" aria-hidden="true"><div class="eod"><b>End of day · Wed 10 Sep</b><div class="eod-row"><span>Cash</span>${lvl('28%')}<b>$412</b></div><div class="eod-row"><span>Card</span>${lvl('82%')}<b>$1,238</b></div><div class="eod-row"><span>Online</span>${lvl('40%')}<b>$596</b></div><div class="eod-total"><span>Total</span><b>$2,246</b></div></div></div>`,
  call: () => `<div class="fa fa-call" aria-hidden="true"><div class="ring"><i></i><i></i><i></i>${I('phone')}</div><div class="fa-bubble late">${I('arrow-right')}Forwarded to the AI receptionist</div></div>`,
  answer: () => `<div class="fa fa-answer" aria-hidden="true">${wave(11, 'big')}<div class="bub ai">Thanks for calling. How can I help you today?</div></div>`,
  calendar: () => `<div class="fa fa-cal" aria-hidden="true"><div class="cal7">${['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map((d, c) => `<div class="cal-col"><span>${d}</span><i></i><i class="${c === 1 ? 'appt' : ''}">${c === 1 ? 'Emma 14:30' : ''}</i><i></i></div>`).join('')}</div></div>`,
  summary: () => `<div class="fa fa-summary" aria-hidden="true"><div class="sms"><div class="sms-h">${I('message')}SMS · just now</div><p>New appointment: Emma, haircut, Tue 2:30 pm. Transcript on your dashboard.</p></div><div class="log"><div><i class="ok"></i><span>Emma · Booking</span><b>2:14</b></div><div><i class="ok"></i><span>Unknown · Opening hours</span><b>0:41</b></div><div><i class="msg"></i><span>Marc · Message taken</span><b>1:05</b></div></div></div>`,
  stock: () => `<div class="fa fa-stock" aria-hidden="true"><div class="stk-row"><span>Espresso beans</span>${lvl('78%')}<b>39</b></div><div class="stk-row"><span>Oat milk</span><div class="lvl drain"><i></i></div><b class="red">3</b></div><div class="stk-row"><span>Croissants</span>${lvl('62%')}<b>124</b></div><div class="stk-row"><span>Cups 12 oz</span>${lvl('90%')}<b>900</b></div></div>`,
  alert: () => `<div class="fa fa-alert" aria-hidden="true"><div class="ro"><b>${I('bell')}Reorder list</b><div class="ro-row"><span>Oat milk 1 L</span><em>3 / min 12</em></div><div class="ro-row"><span>Cups 8 oz</span><em>40 / min 100</em></div><span class="mk-btn press2">Create purchase order</span><span class="mk-badge green sent">${I('check')}PO-218 sent to supplier</span></div></div>`,
  scan: () => `<div class="fa fa-scan" aria-hidden="true"><div class="scanbox big">${barcode()}<div class="beam"></div></div><div class="fa-bubble">${I('plus')}24 units received</div></div>`,
  workshop: () => `<div class="fa fa-workshop" aria-hidden="true"><div class="wk"><div class="wk-node n1">Customer calls</div><div class="wk-node n2">Quote sent</div><div class="wk-node n3">Job scheduled</div><div class="wk-node n4">Invoice paid</div><svg class="wk-lines" viewBox="0 0 320 150"><path d="M90 40 H118" /><path d="M160 58 V76 H50 V94" /><path d="M102 110 H232" /></svg></div></div>`,
  prototype: () => `<div class="fa fa-proto" aria-hidden="true"><div class="wf"><div class="wf-bar"><i></i><i></i><i></i></div><div class="wf-body"><div class="wf-side"><i></i><i></i><i></i></div><div class="wf-main"><i></i><i></i><i></i><i class="wide"></i></div></div></div><div class="fa-bubble">${I('eye')}Click-through prototype</div></div>`,
  build: () => `<div class="fa fa-build" aria-hidden="true"><div class="stg"><div class="stg-row"><span>Stage 1 · Bookings</span>${lvl('100%')}<b class="green">Live</b></div><div class="stg-row"><span>Stage 2 · Invoicing</span>${lvl('70%')}<b>70%</b></div><div class="stg-row"><span>Stage 3 · Reports</span>${lvl('15%')}<b>Next</b></div></div></div>`,
};
export const flowArt = (key) => (FLOW[key] ? FLOW[key]() : '');
export const miniArt = (slug) =>
  ({ 'website-ordering': 'phone-order', 'employee-management': 'schedule', 'pos-system': 'sale', 'ai-receptionist': 'answer', 'inventory-software': 'stock', 'custom-software': 'workshop' }[slug]
    ? flowArt({ 'website-ordering': 'phone-order', 'employee-management': 'schedule', 'pos-system': 'sale', 'ai-receptionist': 'answer', 'inventory-software': 'stock', 'custom-software': 'workshop' }[slug])
    : '');

/* ---------------------------------------------------------------- home dashboard */
export const dashboard = (site) => `<div class="dash device" data-tilt="3" aria-hidden="true">
  <aside class="dash-side">
    <div class="dash-brand"><i></i><span>${site.name} Hub</span></div>
    <nav class="dash-nav">
      <a class="on">${I('home')}Dashboard</a><a>${I('pos')}Sales</a><a>${I('bag')}Online orders</a><a>${I('users')}Staff</a><a>${I('boxes')}Inventory</a><a>${I('headset')}Calls</a>
    </nav>
    <div class="dash-nav-title">Account</div>
    <nav class="dash-nav"><a>${I('user')}Profile</a><a>${I('settings')}Settings</a></nav>
    <div class="dash-onsite">${I('server')}<span>Running on site<br><small>Back-office server · online</small></span></div>
  </aside>
  <div class="dash-main">
    <div class="dash-top"><div><small>Home / Dashboard</small><b>Dashboard</b></div><div class="dash-search">${I('search')}<span>Type here…</span></div><div class="dash-icons">${I('bell')}${I('user')}</div></div>
    <div class="dash-stats">
      <div class="mk-tile"><small>Today's sales</small><b><span data-count="2840" data-prefix="$">0</span></b><span class="mk-up">+12%</span><i class="grad-blue">${I('pos')}</i></div>
      <div class="mk-tile"><small>Online orders</small><b><span data-count="38">0</span></b><span class="mk-up">+8%</span><i class="grad-indigo">${I('globe')}</i></div>
      <div class="mk-tile"><small>Staff on shift</small><b><span data-count="6">0</span></b><span class="mk-up">of 9</span><i class="grad-violet">${I('users')}</i></div>
      <div class="mk-tile"><small>Low stock items</small><b><span data-count="3">0</span></b><span class="mk-down">action</span><i class="grad-cyan">${I('boxes')}</i></div>
    </div>
    <div class="dash-row">
      <div class="dash-welcome"><small>Welcome back</small><b>Your business at a glance</b><p>Sales, orders, staff and stock in one place, running on your own equipment.</p><span>Everything is up to date</span></div>
      <div class="dash-card"><small>Calls answered by AI</small><div class="gauge"><svg viewBox="0 0 120 120"><defs><linearGradient id="gauge-grad" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#60a5fa"/><stop offset="1" stop-color="#a78bfa"/></linearGradient></defs><circle class="track" cx="60" cy="60" r="50"/><circle class="val" cx="60" cy="60" r="50" style="--v:.96"/></svg><b>96%<small>this week</small></b></div><em>0 missed calls</em></div>
      <div class="dash-card"><small>Inventory health</small><div class="gauge"><svg viewBox="0 0 120 120"><circle class="track" cx="60" cy="60" r="50"/><circle class="val" cx="60" cy="60" r="50" style="--v:.93"/></svg><b>9.3<small>score</small></b></div><em>3 items to reorder</em></div>
    </div>
    <div class="dash-row two">
      <div class="dash-card left"><small>Sales · last 7 days</small>${bars([45, 62, 55, 78, 70, 95, 84])}<div class="dash-days"><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span><span>Mon</span><span>Tue</span><span>Wed</span></div></div>
      <div class="dash-card left"><small>Recent orders</small><div class="dash-list"><div><span class="mk-avatar">SB</span><span>Sarah B. · Pickup</span><b>$21.50</b><em class="mk-badge green">Ready</em></div><div><span class="mk-avatar">TK</span><span>Tom K. · Delivery</span><b>$38.00</b><em class="mk-badge amber">Preparing</em></div><div><span class="mk-avatar">LM</span><span>Lena M. · Pickup</span><b>$14.50</b><em class="mk-badge blue">New</em></div></div></div>
    </div>
  </div>
</div>`;

/* ---------------------------------------------------------------- hero waves */
export const waves = () => {
  const svg = (id) => `<svg viewBox="0 0 760 800" preserveAspectRatio="xMinYMax meet" aria-hidden="true"><defs>
    <linearGradient id="${id}a" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#4f46e5"/><stop offset="1" stop-color="#0a1140"/></linearGradient>
    <linearGradient id="${id}b" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#3b82f6"/><stop offset=".55" stop-color="#1d4ed8"/><stop offset="1" stop-color="#0c1550"/></linearGradient>
    <linearGradient id="${id}c" x1="0" y1="0" x2="0.6" y2="1"><stop offset="0" stop-color="#93c5fd"/><stop offset=".35" stop-color="#3b82f6"/><stop offset="1" stop-color="#101a5e"/></linearGradient>
    <linearGradient id="${id}d" x1="0" y1="0" x2="0.6" y2="1"><stop offset="0" stop-color="#bfdbfe"/><stop offset=".4" stop-color="#60a5fa"/><stop offset="1" stop-color="#1e3a8a"/></linearGradient>
    <filter id="${id}s" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="14"/></filter>
  </defs>
    <path d="M-40 820 C 90 560, 300 420, 640 380 C 380 470, 250 620, 240 820 Z" fill="url(#${id}a)" opacity=".85"/>
    <path d="M-60 820 C 60 600, 240 470, 560 440 C 320 520, 190 660, 180 820 Z" fill="url(#${id}b)"/>
    <path d="M-80 820 C 10 640, 150 540, 420 510 C 230 590, 110 700, 100 820 Z" fill="url(#${id}c)"/>
    <path d="M-100 820 C -30 700, 70 620, 260 600 C 130 660, 50 740, 30 820 Z" fill="url(#${id}d)"/>
    <path d="M640 380 C 380 470, 250 620, 240 820" fill="none" stroke="#a5b4fc" stroke-opacity=".35" stroke-width="2"/>
    <path d="M560 440 C 320 520, 190 660, 180 820" fill="none" stroke="#bfdbfe" stroke-opacity=".45" stroke-width="2"/>
    <path d="M420 510 C 230 590, 110 700, 100 820" fill="none" stroke="#dbeafe" stroke-opacity=".6" stroke-width="2"/>
    <ellipse cx="200" cy="700" rx="200" ry="60" fill="#3b82f6" opacity=".25" filter="url(#${id}s)"/>
  </svg>`;
  return `<div class="hero-waves wave-l">${svg('wl')}</div><div class="hero-waves wave-r">${svg('wr')}</div>`;
};

/* ---------------------------------------------------------------- hero network */
export const network = (site) => {
  const nodes = [
    { x: 70, y: 40, icon: 'globe', label: 'Website & ordering', c: 'grad-blue', fx: '-120px', fy: '-60px', d: 100 },
    { x: 150, y: 172, icon: 'pos', label: 'POS', c: 'grad-violet', fx: '-140px', fy: '80px', d: 250 },
    { x: 245, y: 70, icon: 'users', label: 'Staff', c: 'grad-indigo', fx: '-60px', fy: '-90px', d: 400 },
    { x: 690, y: 40, icon: 'headset', label: 'AI receptionist', c: 'grad-cyan', fx: '120px', fy: '-60px', d: 180 },
    { x: 610, y: 172, icon: 'boxes', label: 'Inventory', c: 'grad-sky', fx: '140px', fy: '80px', d: 330 },
    { x: 515, y: 70, icon: 'sparkles', label: 'Custom software', c: 'grad-fuchsia', fx: '60px', fy: '-90px', d: 480 },
  ];
  const paths = [
    'M70 40 C 200 40, 260 115, 338 115', 'M150 172 C 230 172, 280 115, 338 115', 'M245 70 C 290 70, 300 115, 338 115',
    'M690 40 C 560 40, 500 115, 422 115', 'M610 172 C 530 172, 480 115, 422 115', 'M515 70 C 470 70, 460 115, 422 115',
  ];
  return `<div class="net-wrap" data-reveal="none"><div class="net" data-w="760" data-h="230">
    <svg class="lines" viewBox="0 0 760 230" fill="none"><defs><linearGradient id="net-grad" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="760" y2="0"><stop offset="0" stop-color="#60a5fa"/><stop offset=".5" stop-color="#c4b5fd"/><stop offset="1" stop-color="#60a5fa"/></linearGradient></defs>
      ${paths.map((d, i) => `<path id="np${i}" class="line" d="${d}"/>`).join('')}
      ${paths.map((d, i) => `<circle class="pulse" r="3.2"><animateMotion dur="${2.6 + (i % 3) * 0.5}s" begin="${(i * 0.45).toFixed(2)}s" repeatCount="indefinite" keyPoints="${i < 3 ? '0;1' : '0;1'}" keyTimes="0;1"><mpath href="#np${i}"/></animateMotion></circle>`).join('')}
    </svg>
    ${nodes.map((n) => `<div class="node ${n.c}" style="left:${n.x - 29}px;top:${n.y - 29}px;--fx:${n.fx};--fy:${n.fy};--d:${n.d}ms">${I(n.icon)}<small>${n.label}</small></div>`).join('')}
    <div class="node center" style="left:338px;top:73px;--d:0ms;--fx:0;--fy:20px"><svg viewBox="0 0 32 32" fill="none" aria-hidden="true"><path d="M16 12.5v11" stroke="#fff" stroke-width="4.2" stroke-linecap="round"/><circle cx="16" cy="7.4" r="2.5" fill="#fff"/><path d="M23.2 5.2l.7 1.9 1.9.7-1.9.7-.7 1.9-.7-1.9-1.9-.7 1.9-.7.7-1.9z" fill="#c7d2fe"/></svg></div>
  </div></div>`;
};

/* ---------------------------------------------------------------- on-site diagram */
export const onsiteArt = () => `<div class="net-wrap onsite-wrap" data-reveal="none"><div class="net onsite-net" data-w="560" data-h="380">
  <svg class="lines" viewBox="0 0 560 380" fill="none">
    <defs><linearGradient id="on-grad" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="560" y2="0"><stop offset="0" stop-color="#60a5fa"/><stop offset=".5" stop-color="#c4b5fd"/><stop offset="1" stop-color="#60a5fa"/></linearGradient>
    <linearGradient id="bld" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="rgba(96,165,250,.16)"/><stop offset="1" stop-color="rgba(96,165,250,.02)"/></linearGradient></defs>
    <path class="bld" d="M120 360 V170 L280 90 L440 170 V360 Z" fill="url(#bld)" stroke="rgba(147,197,253,.4)" stroke-width="1.5"/>
    <path d="M100 178 L280 88 L460 178" fill="none" stroke="#93c5fd" stroke-opacity=".8" stroke-width="2.5" stroke-linecap="round"/>
    <rect x="255" y="290" width="50" height="70" rx="6" fill="rgba(255,255,255,.04)" stroke="rgba(255,255,255,.14)"/>
    <path d="M120 360 H440" stroke="rgba(255,255,255,.18)"/>
    <path id="op0" class="line" d="M280 205 C 240 205, 210 215, 170 240"/>
    <path id="op1" class="line" d="M280 205 C 320 205, 350 215, 390 240"/>
    <path id="op2" class="line" d="M280 205 C 260 240, 220 270, 175 315"/>
    <path id="op3" class="line" d="M280 205 C 300 240, 340 270, 385 315"/>
    <path id="op4" class="line dashed" d="M280 205 C 330 150, 400 110, 470 60"/>
    ${[0, 1, 2, 3].map((i) => `<circle class="pulse" r="3"><animateMotion dur="${2.4 + i * 0.3}s" begin="${i * 0.4}s" repeatCount="indefinite"><mpath href="#op${i}"/></animateMotion></circle>`).join('')}
    <circle class="pulse" r="2.5"><animateMotion dur="3.4s" repeatCount="indefinite"><mpath href="#op4"/></animateMotion></circle>
  </svg>
  <div class="node center" style="left:238px;top:163px;width:84px;height:84px;--d:0ms;--fx:0;--fy:20px">${I('server')}<small>On-site server</small></div>
  <div class="node grad-violet" style="left:141px;top:211px;--fx:-80px;--fy:0;--d:200ms">${I('pos')}<small>POS</small></div>
  <div class="node grad-indigo" style="left:361px;top:211px;--fx:80px;--fy:0;--d:300ms">${I('tablet')}<small>Clock-in tablet</small></div>
  <div class="node grad-blue" style="left:146px;top:286px;--fx:-80px;--fy:40px;--d:400ms">${I('printer')}<small>Printers</small></div>
  <div class="node grad-cyan" style="left:356px;top:286px;--fx:80px;--fy:40px;--d:500ms">${I('headset')}<small>Call dashboard</small></div>
  <div class="node glass" style="left:441px;top:31px;--fx:40px;--fy:-40px;--d:650ms">${I('globe')}<small>Internet · optional sync</small></div>
  <div class="onsite-badge b1">${I('wifi-off')}Keeps working offline</div>
  <div class="onsite-badge b2">${I('lock')}Your data stays here</div>
</div></div>`;

/* extra process illustrations used on secondary pages */
FLOW.quote = () => `<div class="fa fa-quote" aria-hidden="true"><div class="qt"><div class="qt-h"><b>Quote · Sunrise Café</b><span class="mk-badge green">Fixed price</span></div><div class="qt-row"><span>POS terminal, printer, drawer</span><i></i></div><div class="qt-row"><span>POS + inventory software</span><i></i></div><div class="qt-row"><span>Installation and training</span><i></i></div><div class="qt-row"><span>Support plan · 12 months</span><i></i></div><div class="qt-total"><span>Everything included</span><b>1 price</b></div></div></div>`;
FLOW.training = () => `<div class="fa fa-training" aria-hidden="true"><div class="tr"><div class="tr-people"><span class="mk-avatar">SK</span><span class="mk-avatar">ML</span><span class="mk-avatar">JP</span><span class="mk-avatar">AR</span></div><div class="tr-list"><div class="ck-row" style="--i:0"><i>${I('check')}</i><span>Ring up a sale and take payment</span></div><div class="ck-row" style="--i:1"><i>${I('check')}</i><span>Accept an online order</span></div><div class="ck-row" style="--i:2"><i>${I('check')}</i><span>Close the day and read the report</span></div><div class="ck-row" style="--i:3"><i>${I('check')}</i><span>What to do if something looks wrong</span></div></div></div><div class="fa-bubble late">${I('graduation')}Team trained · guide handed over</div></div>`;
FLOW.support = () => `<div class="fa fa-support" aria-hidden="true"><div class="sp"><div class="bub me b1">The kitchen printer stopped printing tickets.</div><div class="bub ai b2">On it. I can see it from here. Paper sensor was stuck, it is printing again. Can you confirm?</div><div class="bub me b3">Yes, working. Thanks!</div><span class="mk-badge green sp-done">${I('check')}Resolved in 6 minutes</span></div></div>`;
