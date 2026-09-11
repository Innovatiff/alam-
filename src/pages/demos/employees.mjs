export default (ctx) => {
  const { x } = ctx;
  return {
    title: x('Muestra · Gestión de empleados', 'Sample · Employee management'),
    description: x('Muestra interactiva del software de gestión de empleados: horarios, reloj checador, permisos y hojas de horas.', 'Interactive employee management sample: schedules, time clock, time off and timesheets.'),
    bodyClass: 'demo',
    extraCss: 'assets/css/demo.css',
    extraJs: 'assets/js/demos/employees.js',
    demoName: x('Café Amanecer · Gestión de empleados', 'Café Amanecer · Employee management'),
    productSlug: 'employee-management',
    body: `{{> head}}
{{> demo-bar}}
<main class="demo-main" id="main">
  <div class="shell">
    <aside class="shell-side">
      <div class="shell-brand"><i></i><div>Café Amanecer<small>${x('Gestión de personal', 'Staff management')}</small></div></div>
      <nav class="shell-nav" id="shell-nav">
        <button type="button" data-nav="dashboard"><svg><use href="#i-home"/></svg>${x('Panel', 'Dashboard')}</button>
        <button type="button" data-nav="schedule"><svg><use href="#i-calendar"/></svg>${x('Horarios', 'Schedule')}</button>
        <button type="button" data-nav="clock"><svg><use href="#i-clock"/></svg>${x('Reloj checador', 'Time clock')}</button>
        <button type="button" data-nav="leave"><svg><use href="#i-smile"/></svg>${x('Permisos', 'Time off')} <span class="count" id="leave-count"></span></button>
        <button type="button" data-nav="timesheets"><svg><use href="#i-file"/></svg>${x('Hojas de horas', 'Timesheets')}</button>
      </nav>
      <div class="shell-foot"><svg><use href="#i-server"/></svg><div>${x('Corriendo en tu local', 'Running on site')}<small>${x('Servidor de la oficina · tableta de entrada en línea', 'Office server · clock-in tablet online')}</small></div></div>
    </aside>
    <div class="shell-main">
      <section data-view="dashboard">
        <div class="shell-top"><div><h1>${x('Buenos días, María', 'Good morning, María')}</h1><span class="sub" id="today-label"></span></div><div class="right"><span class="hint"><svg><use href="#i-info"/></svg>${x('Prueba: asigna un turno, marca una entrada, aprueba un permiso', 'Try it: assign a shift, clock someone in, approve time off')}</span></div></div>
        <div class="kpi-grid" id="kpis"></div>
        <div class="two-wide">
          <div class="panel"><div class="panel-head"><h3><svg><use href="#i-bar-chart"/></svg>${x('Horas programadas esta semana', 'Hours scheduled this week')}</h3><span class="muted small">${x('Por día', 'Per day')}</span></div><div id="hours-chart"></div></div>
          <div class="panel" id="who-in-panel"><h3><svg><use href="#i-users"/></svg>${x('Quién está ahora', 'Who is in now')}</h3><div class="list" id="who-in"></div></div>
        </div>
        <div class="panel"><h3><svg><use href="#i-calendar"/></svg>${x('Turnos de hoy', 'Today\'s shifts')}</h3><div class="list" id="today-shifts"></div></div>
      </section>

      <section data-view="schedule">
        <div class="shell-top"><div><h1>${x('Horario semanal', 'Weekly schedule')}</h1><span class="sub" id="week-label"></span></div><div class="right"><button class="btn btn-ghost btn-sm" type="button" id="copy-week"><svg><use href="#i-refresh"/></svg>${x('Copiar la semana pasada', 'Copy last week')}</button><button class="btn btn-primary btn-sm" type="button" id="publish"><svg><use href="#i-bell"/></svg>${x('Publicar y avisar al personal', 'Publish and notify staff')}</button></div></div>
        <div class="week-grid" id="week"></div>
        <p class="muted small">${x('Toca <b>+ Agregar turno</b> en cualquier día para asignar a alguien. Toca un turno para cambiarlo o quitarlo. Los turnos libres se muestran punteados.', 'Tap <b>+ Add shift</b> on any day to assign someone. Tap a shift to change or remove it. Open shifts are dotted.')}</p>
      </section>

      <section data-view="clock">
        <div class="shell-top"><div><h1>${x('Reloj checador', 'Time clock')}</h1><span class="sub">${x('Esta pantalla corre en la tableta de la entrada de tu negocio', 'This screen runs on the tablet at your entrance')}</span></div></div>
        <div class="two">
          <div class="panel clock-tablet" id="clock-tablet">
            <div id="clock-time" class="clock-time"></div>
            <div id="clock-stage"></div>
          </div>
          <div class="stack">
            <div class="panel"><h3><svg><use href="#i-users"/></svg>${x('En turno ahora', 'On shift now')}</h3><div class="list" id="clocked-in"></div></div>
            <div class="panel"><h3><svg><use href="#i-file"/></svg>${x('Registro de hoy', 'Today\'s log')}</h3><div class="list" id="clock-log"></div></div>
          </div>
        </div>
      </section>

      <section data-view="leave">
        <div class="shell-top"><div><h1>${x('Solicitudes de permiso', 'Time-off requests')}</h1><span class="sub">${x('Las pide el personal desde su celular', 'Staff request them from their phone')}</span></div></div>
        <div class="list" id="leave-list"></div>
      </section>

      <section data-view="timesheets">
        <div class="shell-top"><div><h1>${x('Hojas de horas', 'Timesheets')}</h1><span class="sub" id="ts-label"></span></div><div class="right"><button class="btn btn-ghost btn-sm" type="button" id="approve-all"><svg><use href="#i-check"/></svg>${x('Aprobar todas', 'Approve all')}</button><button class="btn btn-primary btn-sm" type="button" id="export"><svg><use href="#i-download"/></svg>${x('Exportar para nómina (CSV)', 'Export for payroll (CSV)')}</button></div></div>
        <div class="panel table-wrap"><table class="table" id="ts-table"></table></div>
        <p class="muted small">${x('Las horas vienen de las entradas en la tableta; las programadas se muestran para comparar. El tiempo extra por encima de 38 horas se señala solo.', 'Hours come from the tablet clock-ins; scheduled hours are shown for comparison. Overtime above 38 hours is flagged automatically.')}</p>
      </section>
    </div>
  </div>
</main>
{{> demo-footer}}`,
  };
};
