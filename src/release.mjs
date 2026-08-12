// Сведения о последнем выпуске NeyLivo.
//
// Зачем это здесь. Кнопка «Скачать» обязана вести на ФАЙЛ, а не на страницу
// GitHub. Прямая ссылка на файл содержит версию в имени
// (`NeyLivo-Setup-1.556.1.exe`), поэтому её нельзя один раз написать руками:
// через месяц сайт раздавал бы устаревшее приложение.
//
// Поэтому версия берётся при каждой сборке из GitHub, а сборка запускается не
// только на изменение сайта, но и по расписанию и по сигналу из репозитория
// приложения (см. .github/workflows/deploy.yml).
//
// Если GitHub недоступен, берём последнее, что удалось узнать в прошлый раз, —
// data/release.json лежит в репозитории. Сборка не падает и не выкладывает сайт
// без кнопки скачивания.

import { readFile, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const HERE = dirname(fileURLToPath(import.meta.url))
const CACHE = join(HERE, '..', 'data', 'release.json')
const API = 'https://api.github.com/repos/Neylivo/neylivo/releases/latest'

const MB = 1024 * 1024

/** Размер файла человеческими словами. */
export function sizeMB(bytes) {
  if (!bytes) return null
  const v = bytes / MB
  return (v >= 100 ? Math.round(v) : Math.round(v * 10) / 10) + ' MB'
}

export function fmtDate(iso, lang) {
  if (!iso) return null
  const d = new Date(iso)
  if (Number.isNaN(+d)) return null
  return d.toLocaleDateString(lang === 'ru' ? 'ru-RU' : 'en-US',
    { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' })
}

async function readCache() {
  try { return JSON.parse(await readFile(CACHE, 'utf8')) } catch { return null }
}

/**
 * @returns {Promise<{version:string, published:string, windows:object|null, android:object|null, source:string}>}
 */
export async function getRelease() {
  const cached = await readCache()
  try {
    const headers = { 'accept': 'application/vnd.github+json', 'user-agent': 'neylivo-site-build' }
    if (process.env.GITHUB_TOKEN) headers.authorization = `Bearer ${process.env.GITHUB_TOKEN}`
    const r = await fetch(API, { headers, signal: AbortSignal.timeout(20000) })
    if (!r.ok) throw new Error('GitHub ответил ' + r.status)
    const j = await r.json()

    const pick = (re) => {
      const a = (j.assets ?? []).find((x) => re.test(x.name))
      return a ? { name: a.name, url: a.browser_download_url, bytes: a.size } : null
    }
    const data = {
      version: String(j.tag_name ?? '').replace(/^v/, '') || String(j.name ?? ''),
      published: j.published_at ?? j.created_at ?? null,
      windows: pick(/\.exe$/i),
      android: pick(/\.apk$/i),
      fetchedAt: new Date().toISOString(),
    }
    if (!data.version) throw new Error('в ответе нет версии')
    // Пустой ответ хуже устаревшего: если у свежего выпуска ещё не приложены
    // файлы (сборка Windows и Android идут параллельно), оставляем прошлые
    // ссылки, а не отдаём страницу скачивания без кнопок.
    if (!data.windows && cached?.windows) data.windows = cached.windows
    if (!data.android && cached?.android) data.android = cached.android

    await writeFile(CACHE, JSON.stringify(data, null, 2) + '\n')
    return { ...data, source: 'github' }
  } catch (e) {
    if (cached) {
      console.warn('! не удалось спросить GitHub (' + e.message + '), берём data/release.json')
      return { ...cached, source: 'cache' }
    }
    throw new Error('нет данных о выпуске: ' + e.message)
  }
}
