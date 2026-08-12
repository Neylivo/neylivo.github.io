// Проверка собранного сайта. Запуск: node check.mjs (после node build.mjs)
//
// Ловит ровно то, что ломается само и незаметно: ссылку в никуда, страницу без
// заголовка, повторяющееся описание, битую структурированную разметку, забытый
// localhost. Всё это выглядит на экране нормально и обнаруживается только когда
// на сайт уже пришли люди.

import { readdir, readFile, stat } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const DIST = join(dirname(fileURLToPath(import.meta.url)), 'dist')
const ORIGIN = 'https://neylivo.github.io'

let errors = 0
let warnings = 0
const fail = (m) => { console.error('  ОШИБКА: ' + m); errors++ }
const warn = (m) => { console.warn('  ! ' + m); warnings++ }

async function walk(dir) {
  const out = []
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, e.name)
    if (e.isDirectory()) out.push(...await walk(p))
    else if (e.name.endsWith('.html')) out.push(p)
  }
  return out
}

/** Существует ли внутренний адрес в собранном сайте. */
function resolves(href) {
  const clean = href.split('#')[0].split('?')[0]
  if (clean === '' || clean === '/') return existsSync(join(DIST, 'index.html'))
  const rel = clean.replace(/^\//, '')
  if (existsSync(join(DIST, rel))) {
    return !rel.endsWith('/') || existsSync(join(DIST, rel, 'index.html'))
  }
  return existsSync(join(DIST, rel, 'index.html')) || existsSync(join(DIST, rel + '.html'))
}

const files = await walk(DIST)
const titles = new Map()
const descs = new Map()

for (const f of files) {
  const rel = f.slice(DIST.length).replace(/\\/g, '/')
  const html = await readFile(f, 'utf8')
  const problems = []
  const say = (m) => problems.push(m)

  // Страницы-пересылки (например /en/) проверяем иначе: у них нет и не должно
  // быть ни H1, ни описания — они и не индексируются.
  const isRedirect = /http-equiv="refresh"/.test(html)
  if (isRedirect) {
    if (!/name="robots" content="noindex/.test(html)) say('пересылка без noindex')
    if (!/<link rel="canonical"/.test(html)) say('пересылка без canonical')
    if (problems.length) { console.log(rel); problems.forEach(fail) }
    continue
  }

  // ── заголовок и описание ────────────────────────────────────────────
  const title = /<title>([^<]*)<\/title>/.exec(html)?.[1]
  const desc = /<meta name="description" content="([^"]*)"/.exec(html)?.[1]
  if (!title) say('нет <title>')
  else if (titles.has(title) && !rel.includes('/en/')) say(`заголовок повторяет ${titles.get(title)}`)
  else titles.set(title, rel)

  if (!desc && !rel.endsWith('/en/index.html')) say('нет описания')
  else if (desc) {
    if (desc.length > 320) say(`описание длиннее 320 символов (${desc.length})`)
    if (descs.has(desc)) say(`описание повторяет ${descs.get(desc)}`)
    else descs.set(desc, rel)
  }

  // ── один H1 ─────────────────────────────────────────────────────────
  const h1 = (html.match(/<h1[\s>]/g) ?? []).length
  if (h1 !== 1) say(`заголовков H1: ${h1}, должен быть один`)

  // ── canonical ───────────────────────────────────────────────────────
  const canon = /<link rel="canonical" href="([^"]*)"/.exec(html)?.[1]
  if (!canon) say('нет canonical')
  else if (!canon.startsWith(ORIGIN)) say(`canonical не на боевой адрес: ${canon}`)

  // ── localhost и заглушки ────────────────────────────────────────────
  if (/localhost|127\.0\.0\.1|lorem ipsum|TODO|FIXME|ЗАГЛУШКА/i.test(html)) {
    say('в тексте остался localhost / заглушка')
  }
  if (/undefined|\[object Object\]|NaN(?![a-zA-Z])/.test(html.replace(/<script[\s\S]*?<\/script>/g, ''))) {
    say('в тексте видно undefined / [object Object] / NaN')
  }

  // ── структурированная разметка ──────────────────────────────────────
  for (const m of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try { JSON.parse(m[1]) } catch (e) { say('JSON-LD не разбирается: ' + e.message) }
  }

  // ── ссылки ──────────────────────────────────────────────────────────
  for (const m of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    const href = m[1]
    if (/^(https?:|mailto:|tel:|#|data:)/.test(href)) continue
    if (href.startsWith('/')) {
      if (!resolves(href)) say(`ссылка в никуда: ${href}`)
    } else {
      // относительная — считаем от папки страницы
      const base = dirname(f)
      const target = join(base, href.split('#')[0].split('?')[0])
      if (!existsSync(target) && !existsSync(join(target, 'index.html'))) {
        say(`ссылка в никуда (относительная): ${href}`)
      }
    }
  }

  if (problems.length) {
    console.log(rel)
    problems.forEach(fail)
  }
}

// ── общие файлы ───────────────────────────────────────────────────────
for (const f of ['robots.txt', 'sitemap.xml', 'llms.txt', 'manifest.webmanifest', 'favicon.ico', '404.html']) {
  if (!existsSync(join(DIST, f))) fail(`нет ${f}`)
}
const sm = await readFile(join(DIST, 'sitemap.xml'), 'utf8')
for (const m of sm.matchAll(/<loc>([^<]+)<\/loc>/g)) {
  const path = m[1].slice(ORIGIN.length)
  if (!resolves(path)) fail(`карта сайта указывает в никуда: ${m[1]}`)
}
const robots = await readFile(join(DIST, 'robots.txt'), 'utf8')
if (!robots.includes(`Sitemap: ${ORIGIN}/sitemap.xml`)) fail('в robots.txt нет боевого адреса карты сайта')

// ── вес первой страницы ───────────────────────────────────────────────
const home = (await stat(join(DIST, 'index.html'))).size
const css = (await stat(join(DIST, 'assets', 'site.css'))).size
const js = (await stat(join(DIST, 'assets', 'site.js'))).size
console.log(`\nглавная ${(home / 1024).toFixed(1)} КБ + css ${(css / 1024).toFixed(1)} КБ + js ${(js / 1024).toFixed(1)} КБ`)
if (home + css + js > 200 * 1024) warn('первая страница тяжелее 200 КБ')

console.log(`\nстраниц проверено: ${files.length}, ошибок: ${errors}, замечаний: ${warnings}`)
process.exit(errors ? 1 : 0)
