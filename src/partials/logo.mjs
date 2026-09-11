/**
 * Logotipo.  Para usar el logo real de Innovatiff:
 *   1. Reemplaza assets/img/logo-mark.svg por tu ícono (cuadrado, fondo transparente).
 *   2. Si tienes un logotipo completo (ícono + nombre), guárdalo como assets/img/logo.svg
 *      y cambia `useFullLogo` a true.
 *   3. Ejecuta `npm run build`.
 */
const useFullLogo = false;
export const logoMark = (size = 34, root = '') => `<img class="logo-mark" src="${root}assets/img/logo-mark.svg" width="${size}" height="${size}" alt="" aria-hidden="true">`;
export const logoFull = (root = '', height = 34) =>
  useFullLogo
    ? `<img class="logo-full" src="${root}assets/img/logo.svg" height="${height}" alt="Innovatiff">`
    : `${logoMark(height, root)}<span class="brand-name">Innovatiff</span>`;
export default (ctx) => logoMark(34, ctx.root);
