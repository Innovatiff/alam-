export default (ctx) => {
  const { site, root } = ctx;
  const title = ctx.title ? `${ctx.title} · ${site.name}` : `${site.name} · ${site.tagline}`;
  const description = ctx.description || site.description;
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title}</title>
<meta name="description" content="${description}">
<meta name="theme-color" content="#050816">
<meta property="og:type" content="website">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${description}">
<meta property="og:image" content="${site.url.replace(/\/$/, '')}/assets/img/og.jpg">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="${root}assets/img/favicon.svg" type="image/svg+xml">
<link rel="icon" href="${root}assets/img/favicon.png" type="image/png" sizes="64x64">
<link rel="apple-touch-icon" href="${root}assets/img/icon-180.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
<link rel="stylesheet" href="${root}assets/css/site.css">
${ctx.extraCss ? `<link rel="stylesheet" href="${root}${ctx.extraCss}">` : ''}
</head>
<body class="${ctx.bodyClass || ''}">
<a class="skip-link" href="#main">Skip to content</a>
<div class="page-veil" aria-hidden="true"></div>
<div class="cursor-glow" aria-hidden="true"></div>
{{> icons}}
`;
};
