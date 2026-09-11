# Innovatiff — website

Marketing website for Innovatiff: websites with online ordering, POS systems, employee management,
AI receptionists, inventory software and exclusive custom software, all installed on site.

The site is **static HTML, CSS and JavaScript with no dependencies**. It can be hosted anywhere
(GitHub Pages, Netlify, Vercel, any web host) by uploading the repository as is.

## Structure

| Path | What it is |
| --- | --- |
| `index.html`, `products.html`, `how-it-works.html`, `samples.html`, `about.html`, `contact.html` | Generated pages (do not edit by hand, see below) |
| `products/*.html` | Generated product pages, one per product |
| `demos/*.html` | Generated interactive samples, one per product |
| `assets/css/site.css` | Design system, animations and illustrations |
| `assets/css/demo.css` | Shared styles for the interactive samples |
| `assets/js/site.js` | Navigation, scroll animations, carousels, forms |
| `assets/js/demos/*.js` | Logic of each interactive sample |
| `src/` | **Source of the pages**: templates, partials and content |
| `build.mjs` | Zero-dependency build script (Node 18+) |

## Editing content

1. **Business details, navigation, testimonials**: `src/data/site.mjs`.
   The contact email, phone and address are placeholders — replace them before publishing.
2. **Products** (names, features, steps, FAQ, on-site notes): `src/data/products.mjs`.
3. **Pages**: `src/pages/*.html` (they use `{{> partial}}` includes and `{{variable}}` values).
4. **Illustrations and mockups**: `src/data/mockups.mjs` (HTML) and the "mockups" section of `assets/css/site.css`.

Then rebuild:

```bash
npm run build      # regenerates the HTML files at the root, in products/ and demos/
npm run serve      # optional: preview at http://localhost:8080
```

## Contact form

By default the form opens the visitor's email app with the message pre-filled (no server needed).
To receive submissions directly, set `formEndpoint` in `src/data/site.mjs` to a form service URL
(for example Formspree or Basin) and rebuild.

## Notes

- Testimonials in `src/data/site.mjs` are sample quotes to be replaced with real client feedback.
- The site respects `prefers-reduced-motion`.
- Fonts: Inter from Google Fonts with a system-font fallback.
