export default (ctx) => {
  const { x } = ctx;
  return {
    title: x('Muestra · Recepcionista con IA', 'Sample · AI receptionist'),
    description: x('Muestra interactiva de la recepcionista con IA: llamadas simuladas, transcripción en vivo, citas en el calendario y resúmenes.', 'Interactive AI receptionist sample: simulated calls, live transcript, calendar bookings and summaries.'),
    bodyClass: 'demo',
    extraCss: 'assets/css/demo.css',
    extraJs: 'assets/js/demos/receptionist.js',
    demoName: x('Salón Flor · Recepcionista con IA', 'Salón Flor · AI receptionist'),
    productSlug: 'ai-receptionist',
    body: `{{> head}}
{{> demo-bar}}
<main class="demo-main" id="main">
  <div class="ai-layout">
    <div class="stack">
      <div class="panel call-panel" id="call-panel">
        <div class="panel-head"><h3><svg><use href="#i-headset"/></svg>${x('Línea telefónica', 'Phone line')} · Salón Flor</h3><span class="tag green"><i class="dot" style="width:7px;height:7px;border-radius:50%;background:currentColor;display:inline-block"></i> ${x('La IA está contestando', 'The AI is answering')}</span></div>
        <div class="call-sim" id="call-sim"></div>
      </div>
      <div class="panel" id="chat-panel">
        <div class="panel-head"><h3><svg><use href="#i-message"/></svg>${x('Pregúntale tú a la recepcionista', 'Ask the receptionist yourself')}</h3><span class="muted small">${x('Versión escrita de la misma asistente', 'Text version of the same assistant')}</span></div>
        <div class="chat" id="chat"></div>
        <form class="chat-form" id="chat-form"><input class="input" id="chat-input" placeholder="${x('Escribe una pregunta, por ejemplo: ¿abren los domingos?', 'Type a question, for example: are you open on Sundays?')}" autocomplete="off"><button class="btn btn-primary" type="submit" aria-label="${x('Enviar', 'Send')}"><svg><use href="#i-arrow-right"/></svg></button></form>
        <div class="row" id="chat-chips" style="margin-top:.6rem"></div>
      </div>
    </div>
    <div class="stack">
      <div class="kpi-grid" id="ai-kpis"></div>
      <div class="panel" id="cal-panel"><div class="panel-head"><h3><svg><use href="#i-calendar"/></svg>${x('Citas de esta semana', 'This week\'s appointments')}</h3><span class="muted small">${x('Las citas que agenda la IA aparecen aquí al instante', 'Bookings made by the AI appear here instantly')}</span></div><div class="cal-grid" id="cal"></div></div>
      <div class="panel" id="log-panel"><div class="panel-head"><h3><svg><use href="#i-phone"/></svg>${x('Registro de llamadas', 'Call log')}</h3><span class="muted small">${x('Cada llamada, con su transcripción', 'Every call, with its transcript')}</span></div><div class="list" id="call-log"></div></div>
    </div>
  </div>
</main>
{{> demo-footer}}`,
  };
};
