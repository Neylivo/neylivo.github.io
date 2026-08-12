// Сборка сайта NeyLivo: из модулей страниц получается готовая статика в dist/.
//
// Никакого фреймворка здесь нет намеренно. Сайт из пятнадцати страниц, которые
// обязаны читаться поисковым роботом без единой строчки JavaScript, — ровно та
// задача, где фреймворк добавляет сборку, гидрацию и способы всё это сломать,
// не добавляя ничего нужного.
//
// Запуск: node build.mjs

import { mkdir, writeFile, readFile, cp, rm, readdir } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

import { page } from './src/layout.mjs'
import { ORIGIN, LANGS, urlFor, APP_URL } from './src/site.mjs'
import { getRelease } from './src/release.mjs'
import { getChangelog } from './src/changelog-data.mjs'

const HERE = dirname(fileURLToPath(import.meta.url))
const DIST = join(HERE, 'dist')

const PAGE_FILES = [
  'index', 'download', 'features', 'about', 'security', 'privacy',
  'plugins', 'trackoteka', 'faq', 'press', 'changelog', 'docs', 'transparency',
]

/** Приоритет страницы в карте сайта. Главная выше, справочное ниже. */
const PRIORITY = {
  '': '1.0', download: '0.9', about: '0.9', features: '0.8', security: '0.8',
  plugins: '0.8', privacy: '0.7', trackoteka: '0.7', faq: '0.7',
  changelog: '0.5', docs: '0.5', press: '0.4', transparency: '0.5',
}

async function main() {
  const release = await getRelease()
  console.log(`выпуск ${release.version} (${release.source === 'github' ? 'с GitHub' : 'из кэша'})`)
  if (!release.windows) console.warn('! нет установщика Windows в данных о выпуске')
  if (!release.android) console.warn('! нет APK в данных о выпуске')

  const pages = []
  for (const name of PAGE_FILES) {
    const mod = (await import(`./src/pages/${name}.mjs`)).default
    pages.push(mod)
  }

  await rm(DIST, { recursive: true, force: true })
  await mkdir(DIST, { recursive: true })

  const changelog = await getChangelog(40)
  console.log(`история версий: ${changelog.length} выпусков`)

  const ctx = { release, changelog, urlFor, APP_URL }
  const written = []

  for (const p of pages) {
    for (const lang of LANGS) {
      const html = page({
        lang,
        slug: p.slug,
        title: p.title(lang),
        description: p.description(lang),
        jsonld: p.jsonld ? p.jsonld(ctx, lang) : null,
        body: p.body(ctx, lang),
      })
      const rel = urlFor(p.slug, lang)          // '/', '/about/', '/ru/about/'
      const dir = join(DIST, rel)
      await mkdir(dir, { recursive: true })
      await writeFile(join(dir, 'index.html'), html)
      written.push({ slug: p.slug, lang, rel })
    }
  }

  // ── 404 ──────────────────────────────────────────────────────────────
  const notFound = (await import('./src/pages/404.mjs')).default
  await writeFile(join(DIST, '404.html'), page({
    lang: 'en', slug: '404', root: './',
    title: notFound.title('en'), description: notFound.description('en'),
    body: notFound.body(ctx, 'en'),
  }))

  // ── /en/ — вежливая пересылка в корень ───────────────────────────────
  // Английский живёт в корне (он же x-default). Адрес /en/ существует потому,
  // что его набирают руками, и упереться в 404 из-за этого человек не должен.
  await mkdir(join(DIST, 'en'), { recursive: true })
  await writeFile(join(DIST, 'en', 'index.html'), redirect('/', 'en'))

  // ── robots.txt ───────────────────────────────────────────────────────
  await writeFile(join(DIST, 'robots.txt'), robots())

  // ── sitemap.xml ──────────────────────────────────────────────────────
  await writeFile(join(DIST, 'sitemap.xml'), sitemap(pages))

  // ── llms.txt ─────────────────────────────────────────────────────────
  await writeFile(join(DIST, 'llms.txt'), (await import('./src/llms.mjs')).default(ctx))

  // ── manifest ─────────────────────────────────────────────────────────
  await writeFile(join(DIST, 'manifest.webmanifest'), JSON.stringify({
    name: 'NeyLivo',
    short_name: 'NeyLivo',
    description: 'NeyLivo is a privacy-focused extensible messenger for conversations, communities, calls, music and plugins.',
    start_url: '/',
    scope: '/',
    display: 'browser',
    background_color: '#0e1012',
    theme_color: '#0e1012',
    icons: [
      { src: '/assets/icon.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
      { src: '/assets/mark.svg', sizes: 'any', type: 'image/svg+xml' },
    ],
  }, null, 2) + '\n')

  // ── статика ──────────────────────────────────────────────────────────
  await cp(join(HERE, 'assets'), join(DIST, 'assets'), { recursive: true })
  if (existsSync(join(HERE, 'assets', 'favicon.ico'))) {
    await cp(join(HERE, 'assets', 'favicon.ico'), join(DIST, 'favicon.ico'))
  }

  console.log(`готово: ${written.length} страниц + 404, robots, sitemap, llms.txt`)
}

function redirect(to, lang) {
  return `<!doctype html>
<html lang="${lang}">
<head>
<meta charset="utf-8">
<title>NeyLivo</title>
<link rel="canonical" href="${ORIGIN}${to}">
<meta name="robots" content="noindex, follow">
<meta http-equiv="refresh" content="0; url=${to}">
</head>
<body><p>NeyLivo: <a href="${to}">${ORIGIN}${to}</a></p></body>
</html>
`
}

function robots() {
  // Имена роботов сверены с их официальной документацией (Google, OpenAI,
  // Anthropic, Perplexity, Common Crawl). Ничего не запрещаем: сайт целиком
  // публичный, а закрытый от роботов CSS сломал бы им же оценку страницы.
  const bots = [
    '*',
    'Googlebot', 'Googlebot-Image', 'Google-Extended', 'Bingbot', 'YandexBot',
    'DuckDuckBot', 'Applebot', 'Applebot-Extended',
    'OAI-SearchBot', 'GPTBot', 'ChatGPT-User',
    'ClaudeBot', 'Claude-SearchBot', 'Claude-User', 'anthropic-ai',
    'PerplexityBot', 'Perplexity-User',
    'CCBot', 'Amazonbot', 'meta-externalagent',
  ]
  return bots.map((b) => `User-agent: ${b}\nAllow: /\n`).join('\n')
    + `\nSitemap: ${ORIGIN}/sitemap.xml\n`
}

function sitemap(pages) {
  const today = new Date().toISOString().slice(0, 10)
  const urls = []
  for (const p of pages) {
    for (const lang of LANGS) {
      const loc = ORIGIN + urlFor(p.slug, lang)
      const alts = LANGS
        .map((l) => `    <xhtml:link rel="alternate" hreflang="${l}" href="${ORIGIN + urlFor(p.slug, l)}"/>`)
        .join('\n')
      urls.push(`  <url>
    <loc>${loc}</loc>
${alts}
    <xhtml:link rel="alternate" hreflang="x-default" href="${ORIGIN + urlFor(p.slug, 'en')}"/>
    <lastmod>${today}</lastmod>
    <priority>${PRIORITY[p.slug] ?? '0.5'}</priority>
  </url>`)
    }
  }
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join('\n')}
</urlset>
`
}

main().catch((e) => { console.error(e); process.exit(1) })
