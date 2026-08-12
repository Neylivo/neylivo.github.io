// История версий берётся из репозитория приложения.
//
// Единственный источник правды там — src/lib/changelog.ts, который приложение
// само собирает из истории коммитов и показывает в окне «Что нового». Значит и
// на сайте должно быть ровно то же: своя копия, набранная руками, разошлась бы
// с приложением на первом же выпуске.
//
// Разбор нарочно грубый — регулярным выражением по тексту файла, без запуска
// чужого кода. Если формат когда-нибудь поменяется, сборка не сломается: она
// возьмёт сохранённую копию и скажет об этом в журнале.

import { readFile, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const HERE = dirname(fileURLToPath(import.meta.url))
const CACHE = join(HERE, '..', 'data', 'changelog.json')
const RAW = 'https://raw.githubusercontent.com/ponoiai/ponoi/main/src/lib/changelog.ts'

/** { version, date, items[] }[] — новые сверху. */
export async function getChangelog(limit = 40) {
  let cached = null
  try { cached = JSON.parse(await readFile(CACHE, 'utf8')) } catch { /* нет копии */ }

  try {
    const r = await fetch(RAW, { signal: AbortSignal.timeout(20000) })
    if (!r.ok) throw new Error('raw.githubusercontent ответил ' + r.status)
    const text = await r.text()
    const out = []

    // { version: "1.556.1", date: "2026-08-11", items: ["…", "…"] }
    const re = /\{\s*version:\s*"([^"]+)",\s*date:\s*"([^"]+)",\s*items:\s*\[([\s\S]*?)\]\s*\}/g
    let m
    while ((m = re.exec(text)) !== null) {
      const items = []
      const ire = /"((?:[^"\\]|\\.)*)"/g
      let im
      while ((im = ire.exec(m[3])) !== null) {
        items.push(im[1].replace(/\\"/g, '"').replace(/\\\\/g, '\\'))
      }
      out.push({ version: m[1], date: m[2], items })
    }
    if (!out.length) throw new Error('в файле не нашлось ни одной версии')

    await writeFile(CACHE, JSON.stringify(out.slice(0, 200), null, 1) + '\n')
    return out.slice(0, limit)
  } catch (e) {
    if (cached) {
      console.warn('! история версий не скачалась (' + e.message + '), берём сохранённую')
      return cached.slice(0, limit)
    }
    console.warn('! истории версий нет вовсе: ' + e.message)
    return []
  }
}
