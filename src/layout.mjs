// Обвязка страницы: голова документа, шапка, подвал.
//
// Правило, ради которого этот файл существует: всё, что должен прочитать
// поисковик или человек, попадает в ГОТОВЫЙ html прямо здесь. Никакой сборки
// текста на стороне браузера — страница без единой строчки JavaScript обязана
// быть целой, включая меню на телефоне (оно на <details>, а не на скрипте).

import { ORIGIN, APP_URL, NAV, FOOTER, UI, LANGS, urlFor } from './site.mjs'

const esc = (s) => String(s)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;')

export { esc }

/**
 * Знак Ponoi — настоящий логотип, а не «в духе».
 *
 * До 12.08.2026 здесь был мой рисунок: шестиугольник с кубиком внутри, сделанный
 * на глаз по значку приложения. Владелец прислал настоящий логотип, и это
 * заменено обводкой самого файла (scripts/trace-mark.cjs, обводится
 * assets/icon.png — тот же файл, что стоит значком приложения).
 *
 * Здесь ТОЛЬКО куб, без серого круга: круг у логотипа светлый и рассчитан на
 * тёмный фон, а на белой странице он исчезает. Куб идёт currentColor и потому
 * одинаково читается в любой теме. Круглый значок целиком остаётся там, где он
 * и нужен: favicon, значок на телефоне, картинка для соцсетей.
 */
export function mark(size = 28, cls = 'mark') {
  return `<svg class="${cls}" width="${size}" height="${size}" viewBox="0 0 64 64" aria-hidden="true" focusable="false">
  <path fill="currentColor" fill-rule="evenodd" d="M3.1 17.08L14.36 23.46L14.55 30.97L10.23 28.53L9.1 27.96L8.91 28.15L8.91 45.42L23.37 53.68L23.55 47.11L29.94 50.67L29.75 64L3.1 48.8L3.1 17.27ZM60.72 17.08L60.9 48.8L34.06 64L34.06 50.67L40.45 47.11L40.45 53.49L40.82 53.68L55.27 45.23L55.27 28.15L55.09 27.96L49.64 30.97L49.64 23.46L60.53 17.27ZM31.81 0L39.32 3.57L58.84 13.7L47.39 20.08L41.38 16.7L46.26 14.08L46.45 13.89L46.08 13.51L32 6.38L18.3 13.33L17.74 13.89L17.92 14.08L22.8 16.7L16.42 20.08L5.35 13.7L31.62 0.19ZM46.08 25.34L46.08 33.03L41.2 35.85L40.45 36.6L40.45 43.17L34.06 46.55L34.06 32.28L45.89 25.52ZM17.92 25.34L29.94 32.28L29.94 46.55L26.37 44.67L23.55 42.98L23.55 36.41L17.92 32.84L17.92 25.52ZM26.18 18.77L27.12 18.96L32 21.77L36.32 19.33L38.01 18.77L44.01 22.15L32 28.9L20.18 22.15L25.99 18.96Z"/>
</svg>`
}

function navHtml(lang, active) {
  return NAV.map((n) => {
    const cur = n.slug === active ? ' aria-current="page"' : ''
    return `<a href="${urlFor(n.slug, lang)}"${cur}>${esc(n[lang])}</a>`
  }).join('\n        ')
}

function footerHtml(lang) {
  const t = UI[lang]
  const cols = FOOTER.map((col) => {
    const links = col.links.map((l) => {
      const href = l.href ?? urlFor(l.slug, lang)
      const rel = l.external ? ' rel="noopener"' : ''
      return `<li><a href="${href}"${rel}>${esc(l[lang])}</a></li>`
    }).join('\n            ')
    return `<div class="f-col">
          <h2 class="f-h">${esc(col[lang])}</h2>
          <ul>
            ${links}
          </ul>
        </div>`
  }).join('\n        ')

  return `<footer class="site-foot">
      <div class="wrap">
        <div class="f-brand">
          <span class="f-logo">${mark(24)}<b>Ponoi</b></span>
          <p>${esc(t.footerNote)}</p>
        </div>
        ${cols}
      </div>
    </footer>`
}

/**
 * Сборка страницы целиком.
 *
 * @param {object} p
 * @param {string} p.lang        язык страницы
 * @param {string} p.slug        путь без языка ('' — главная)
 * @param {string} p.title       содержимое <title>
 * @param {string} p.description мета-описание
 * @param {string} p.body        готовая разметка <main>
 * @param {string} [p.jsonld]    дополнительная структурированная разметка
 * @param {string} [p.ogImage]   своё изображение для соцсетей
 */
export function page(p) {
  const { lang, slug, title, description, body } = p
  const t = UI[lang]
  const url = ORIGIN + urlFor(slug, lang)
  const other = lang === 'en' ? 'ru' : 'en'
  // Глубина вложенности — чтобы ссылки на значок и таблицу стилей работали и
  // из /ru/security/. У страницы 404 своя: она лежит файлом в корне, а её slug
  // ('404') сделал бы вид, что она в папке, и все её ссылки уехали бы на уровень
  // выше сайта.
  const depth = p.root !== undefined
    ? 0
    : urlFor(slug, lang).split('/').filter(Boolean).length
  const root = p.root ?? (depth === 0 ? './' : '../'.repeat(depth))

  const alts = LANGS.map(
    (l) => `<link rel="alternate" hreflang="${l}" href="${ORIGIN + urlFor(slug, l)}">`,
  ).join('\n  ')

  const ogImage = p.ogImage ?? `${ORIGIN}/assets/ponoi-og.png`

  return `<!doctype html>
<html lang="${lang}" dir="ltr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<link rel="canonical" href="${url}">
${alts}
<link rel="alternate" hreflang="x-default" href="${ORIGIN + urlFor(slug, 'en')}">
<meta property="og:site_name" content="Ponoi">
<meta property="og:type" content="website">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${ogImage}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:locale" content="${lang === 'en' ? 'en_US' : 'ru_RU'}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(title)}">
<meta name="twitter:description" content="${esc(description)}">
<meta name="twitter:image" content="${ogImage}">
<meta name="theme-color" content="#0e1012" media="(prefers-color-scheme: dark)">
<meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)">
<link rel="icon" href="${root}favicon.ico" sizes="any">
<link rel="icon" href="${root}assets/mark.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="${root}assets/icon.png">
<link rel="manifest" href="${root}manifest.webmanifest">
<link rel="stylesheet" href="${root}assets/site.css">
<script src="${root}assets/site.js" defer></script>
${p.jsonld ? `<script type="application/ld+json">${p.jsonld}</script>` : ''}
</head>
<body>
<a class="skip" href="#main">${esc(t.skip)}</a>
<header class="site-head">
  <div class="wrap">
    <a class="brand" href="${urlFor('', lang)}">${mark(26)}<span>Ponoi</span></a>
    <nav class="nav-wide" aria-label="${lang === 'en' ? 'Main' : 'Основная навигация'}">
        ${navHtml(lang, slug)}
    </nav>
    <div class="head-cta">
      <a class="btn btn-quiet" href="${APP_URL}">${esc(t.openApp)}</a>
      <a class="btn btn-solid" href="${urlFor('download', lang)}">${esc(t.download)}</a>
    </div>
    <details class="nav-mob">
      <summary aria-label="${esc(t.menu)}"><span class="bars" aria-hidden="true"></span>${esc(t.menu)}</summary>
      <nav aria-label="${lang === 'en' ? 'Main' : 'Основная навигация'}">
        ${navHtml(lang, slug)}
        <a href="${APP_URL}">${esc(t.openApp)}</a>
        <a href="${ORIGIN + urlFor(slug, other)}" hreflang="${other}" lang="${other}">${esc(t.otherLang)}</a>
      </nav>
    </details>
    <a class="lang-sw" href="${ORIGIN + urlFor(slug, other)}" hreflang="${other}" lang="${other}"
       title="${esc(t.langLabel)}">${esc(t.otherLang)}</a>
  </div>
</header>
<main id="main">
${body}
</main>
${footerHtml(lang)}
</body>
</html>
`
}
