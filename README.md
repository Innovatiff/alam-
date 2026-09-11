# Innovatiff — sitio web

Sitio web de Innovatiff (en español): sitios web con pedidos en línea, sistemas POS, gestión de
empleados, recepcionistas con IA, software de inventario y software a la medida, todo instalado en
el local del cliente.

El sitio es **HTML, CSS y JavaScript estáticos, sin dependencias**. Se puede publicar en cualquier
hosting (GitHub Pages, Netlify, Vercel, cualquier servidor) subiendo el repositorio tal cual.

## Estructura

| Ruta | Qué es |
| --- | --- |
| `index.html`, `products.html`, `how-it-works.html`, `samples.html`, `about.html`, `contact.html` | Páginas generadas (no editar a mano, ver abajo) |
| `products/*.html` | Páginas de producto generadas, una por producto |
| `demos/*.html` | Muestras interactivas generadas, una por producto |
| `assets/css/site.css` | Sistema de diseño, animaciones e ilustraciones |
| `assets/css/demo.css` | Estilos de las muestras interactivas (incluye el sitio de restaurante y la guía paso a paso) |
| `assets/js/site.js` | Navegación, animaciones al hacer scroll, carruseles, formulario |
| `assets/js/demos/common.js` | Ayudantes compartidos de las muestras y el motor de la guía paso a paso |
| `assets/js/demos/*.js` | Lógica de cada muestra |
| `src/` | **Fuente de las páginas**: plantillas, parciales y contenido |
| `build.mjs` | Generador estático sin dependencias (Node 18+) |

## Editar contenido

1. **Datos del negocio, navegación, testimonios**: `src/data/site.mjs`.
   El correo, teléfono y dirección son **marcadores provisionales**: reemplázalos antes de publicar.
2. **Productos** (nombres, funciones, pasos, preguntas, notas de instalación): `src/data/products.mjs`.
3. **Páginas**: `src/pages/*.html` (usan `{{> parcial}}` para incluir fragmentos y `{{variable}}` para valores).
4. **Ilustraciones y maquetas**: `src/data/mockups.mjs` (HTML) y la sección "mockups" de `assets/css/site.css`.

Después, vuelve a generar:

```bash
npm run build      # regenera los archivos HTML en la raíz, en products/ y en demos/
npm run serve      # opcional: vista previa en http://localhost:8080
```

## Logotipo

El logo se lee de archivos, así que cambiarlo no requiere tocar código:

- `assets/img/logo-mark.svg`: ícono cuadrado (se usa en la barra de navegación, el pie de página y las muestras).
- `assets/img/favicon.svg`, `assets/img/favicon.png`, `assets/img/icon-180.png`: favicons.
- Si tienes un logotipo completo (ícono + nombre), guárdalo como `assets/img/logo.svg`, pon
  `useFullLogo = true` en `src/partials/logo.mjs` y ejecuta `npm run build`.

## Fotos de la muestra de restaurante

La muestra `demos/ordering.html` usa fotos de Unsplash cargadas desde su CDN (licencia Unsplash,
uso comercial permitido). Si una foto no carga, la tarjeta muestra un fondo de color con la inicial
del platillo. Para usar tus propias fotos, cambia las URLs en `assets/js/demos/ordering.js`
(campo `img` de cada platillo y las imágenes de `src/pages/demos/ordering.html`).

## Formulario de contacto

Por defecto, el formulario abre la aplicación de correo del visitante con el mensaje ya escrito (no
necesita servidor). Para recibir las solicitudes directamente, pon en `formEndpoint`
(`src/data/site.mjs`) la URL de un servicio de formularios (por ejemplo Formspree o Basin) y
vuelve a generar el sitio.

## Notas

- Los testimonios de `src/data/site.mjs` son ejemplos: reemplázalos por comentarios reales.
- Las muestras no guardan nada; cada visita empieza desde cero. La guía paso a paso se muestra la
  primera vez por sesión y se puede repetir con el botón "Ver guía paso a paso".
- El sitio respeta `prefers-reduced-motion`.
- Fuente: Inter (Google Fonts) con respaldo del sistema.
