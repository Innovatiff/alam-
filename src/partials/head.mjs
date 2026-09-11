export default (ctx) => {
  const { site, root, lang, x, alt, altAbs } = ctx;
  const title = ctx.title ? `${ctx.title} · ${site.name}` : `${site.name} · ${site.tagline}`;
  const description = ctx.description || site.description;
  const og = `${site.url.replace(/\/$/, '')}/assets/img/${lang === 'en' ? 'og-en.jpg' : 'og.jpg'}`;
  return `<!DOCTYPE html>
<html lang="${lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title}</title>
<meta name="description" content="${description}">
<meta name="theme-color" content="#000000">
<link rel="alternate" hreflang="es" href="${altAbs.es}">
<link rel="alternate" hreflang="en" href="${altAbs.en}">
<link rel="alternate" hreflang="x-default" href="${altAbs.es}">
<meta property="og:type" content="website">
<meta property="og:locale" content="${site.locale}">
<meta property="og:locale:alternate" content="${lang === 'en' ? 'es_MX' : 'en_CA'}">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${description}">
<meta property="og:image" content="${og}">
<meta name="twitter:card" content="summary_large_image">
<script>(function(){try{var l='${lang}',p=localStorage.getItem('lang');if(p!=='es'&&p!=='en')p=null;if(!p&&l==='es'&&/^en/i.test(navigator.language||''))p='en';if(p&&p!==l)location.replace('${alt}'+location.search+location.hash);}catch(e){}})();</script>
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
<a class="skip-link" href="#main">${x('Ir al contenido', 'Skip to content')}</a>
<div class="page-veil" aria-hidden="true"></div>
<div class="cursor-glow" aria-hidden="true"></div>
{{> icons}}
`;
};
