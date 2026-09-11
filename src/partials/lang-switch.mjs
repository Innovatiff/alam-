/* ES / EN switch: links to the same page in the other language and stores the choice */
export default (ctx) => {
  const { lang, alt } = ctx;
  const link = (code, label) =>
    code === lang
      ? `<span class="lang-on" aria-current="true">${label}</span>`
      : `<a href="${alt}" hreflang="${code}" lang="${code}" data-lang-switch="${code}" aria-label="${code === 'en' ? 'Switch to English' : 'Cambiar a español'}">${label}</a>`;
  return `<div class="lang-switch" role="group" aria-label="${lang === 'en' ? 'Language' : 'Idioma'}">${link('es', 'ES')}<i></i>${link('en', 'EN')}</div>`;
};
