# Innovatiff — sitio web / website

Sitio web bilingüe de Innovatiff (español en la raíz, inglés en `/en/`): sitios web con pedidos en
línea, sistemas POS, gestión de empleados, recepcionistas con IA, software de inventario y software
a la medida, todo instalado en el local del cliente.

Bilingual Innovatiff website (Spanish at the root, English under `/en/`).

El sitio es **HTML, CSS y JavaScript estáticos, sin dependencias**. Se puede publicar en cualquier
hosting (GitHub Pages, Netlify, Vercel, cualquier servidor) subiendo el repositorio tal cual.

## Idiomas / Languages

- `index.html`, `products/…`, `demos/…` → español (idioma por defecto).
- `en/index.html`, `en/products/…`, `en/demos/…` → inglés.
- Cada página enlaza a su versión en el otro idioma (`hreflang`) y el interruptor **ES / EN** de la
  barra de navegación y el pie de página guarda la preferencia del visitante.
- La primera vez que alguien entra a la versión en español con un navegador en inglés, se le lleva
  a `/en/`. Si elige ES o EN, esa elección manda desde entonces.
- Las muestras en vivo leen el idioma de la página (`<html lang>`), así que los mismos archivos
  `assets/js/demos/*.js` sirven para ambos idiomas.

## Estructura

| Ruta | Qué es |
| --- | --- |
| `index.html`, `products.html`, `how-it-works.html`, `samples.html`, `about.html`, `contact.html` | Páginas generadas en español (no editar a mano) |
| `en/*.html`, `en/products/*.html`, `en/demos/*.html` | Las mismas páginas en inglés (generadas) |
| `products/*.html` | Páginas de producto generadas, una por producto |
| `demos/*.html` | Muestras interactivas generadas, una por producto |
| `assets/css/site.css` | Sistema de diseño (tema negro), animaciones e ilustraciones |
| `assets/css/demo.css` | Estilos de las muestras interactivas (incluye el sitio de restaurante y la guía paso a paso) |
| `assets/js/site.js` | Navegación, interruptor de idioma, animaciones al hacer scroll, carruseles, formulario |
| `assets/js/demos/common.js` | Ayudantes compartidos de las muestras, idioma y motor de la guía paso a paso |
| `assets/js/demos/*.js` | Lógica de cada muestra (bilingüe con `x('español', 'english')`) |
| `src/` | **Fuente de las páginas**: plantillas, parciales y contenido |
| `build.mjs` | Generador estático sin dependencias (Node 18+) |

## Editar contenido

Todos los textos se escriben en los dos idiomas con `x('texto en español', 'text in English')`.

1. **Datos del negocio, navegación, testimonios**: `src/data/site.mjs`.
   El correo, teléfono y dirección son **marcadores provisionales**: reemplázalos antes de publicar.
2. **Productos** (nombres, funciones, pasos, notas de instalación): `src/data/products.mjs`.
3. **Páginas**: `src/pages/*.mjs` (devuelven `{ title, description, body }`; el cuerpo usa
   `{{> parcial}}` para incluir fragmentos).
4. **Muestras**: `src/pages/demos/*.mjs` (HTML) y `assets/js/demos/*.js` (lógica).
5. **Ilustraciones y maquetas**: `src/data/mockups.mjs` (HTML) y la sección "mockups" de `assets/css/site.css`.

Después, vuelve a generar:

```bash
npm run build      # regenera los archivos HTML en la raíz, en products/, demos/ y en/
npm run serve      # opcional: vista previa en http://localhost:8080
```

## Logotipo

El logo se lee de archivos, así que cambiarlo no requiere tocar código:

- `assets/img/logo-mark.svg`: ícono cuadrado (se usa en la barra de navegación, el pie de página y las muestras).
- `assets/img/favicon.svg`, `assets/img/favicon.png`, `assets/img/icon-180.png`: favicons.
- Si tienes un logotipo completo (ícono + nombre), guárdalo como `assets/img/logo.svg`, pon
  `useFullLogo = true` en `src/partials/logo.mjs` y ejecuta `npm run build`.
- `assets/img/og.jpg` y `assets/img/og-en.jpg`: imagen para redes sociales (español e inglés).

## Fotos de la muestra de restaurante

La muestra `demos/ordering.html` usa fotos de Unsplash cargadas desde su CDN (licencia Unsplash,
uso comercial permitido). Si una foto no carga, la tarjeta muestra un fondo de color con la inicial
del platillo. Para usar tus propias fotos, cambia las URLs en `assets/js/demos/ordering.js`
(campo `img` de cada platillo y las imágenes de `src/pages/demos/ordering.mjs`).

## Formulario de contacto

Por defecto, el formulario abre la aplicación de correo del visitante con el mensaje ya escrito (no
necesita servidor). Para recibir las solicitudes directamente, pon en `formEndpoint`
(`src/data/site.mjs`) la URL de un servicio de formularios (por ejemplo Formspree o Basin) y
vuelve a generar el sitio.

## Notas

- Cambia `url` en `src/data/site.mjs` por tu dominio real antes de publicar: se usa en el
  `sitemap.xml`, los enlaces `hreflang` y las etiquetas para redes sociales.
- Las muestras no guardan nada; cada visita empieza desde cero. La guía paso a paso se muestra la
  primera vez por sesión y se puede repetir con el botón "Guía paso a paso".
- Los testimonios incluidos son de muestra: reemplázalos por comentarios reales.
