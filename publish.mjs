// Разложить собранный сайт в корень репозитория. Запуск: node publish.mjs
//
// ЗАЧЕМ ЭТО ПОЯВИЛОСЬ (12.08.2026).
//
// Сайт выкладывался через GitHub Actions артефактом из dist/. Но у репозитория
// параллельно работает и СТАРЫЙ конвейер GitHub Pages — «pages build and
// deployment», который берёт ветку целиком и прогоняет её через Jekyll. Оба
// запускаются на один и тот же push, и кто закончит последним, того и сайт.
// В какой-то момент последним закончил Jekyll: на ponoiai.github.io оказалась
// сгенерированная им страница из README.md, а /about/, /ru/, /download/ и все
// остальные стали отдавать 404. Проверено живыми запросами, не по журналу.
//
// Переключить источник Pages может только владелец в настройках репозитория, а
// сайт не должен зависеть от галочки, о которой никто не помнит. Поэтому
// собранный сайт теперь лежит В КОРНЕ ветки: что бы ни выложило страницу —
// наш процесс или чужой, — содержимое одно и то же.
//
// Файл .nojekyll рядом запрещает Jekyll трогать содержимое.
//
// Источник правды по-прежнему src/: корень — это результат сборки, его правят
// не руками, а командой `node build.mjs && node publish.mjs`.
import { cp, rm, writeFile, readdir } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const HERE = dirname(fileURLToPath(import.meta.url))
const DIST = join(HERE, 'dist')

/**
 * Что в корне принадлежит сборке.
 *
 * Список явный, а не «всё из dist»: в корне живут ещё и исходники (src,
 * scripts, data, build.mjs, README.md), и стирать корень целиком нельзя ни при
 * каких обстоятельствах. Каждая строка здесь — то, что сборка создаёт сама и
 * вправе перезаписать.
 */
const НАШЕ = [
  'index.html', '404.html', 'robots.txt', 'sitemap.xml', 'llms.txt',
  'manifest.webmanifest', 'favicon.ico', 'assets',
  'download', 'features', 'about', 'security', 'privacy', 'plugins',
  'trackoteka', 'faq', 'press', 'changelog', 'docs', 'transparency',
  'en', 'ru',
]

if (!existsSync(DIST)) {
  console.error('нет dist/ — сначала node build.mjs')
  process.exit(1)
}

// Сверка: если сборка начала создавать что-то, чего нет в списке, разложить это
// в корень молча нельзя — иначе новая страница просто не появится на сайте, и
// заметит это в лучшем случае поисковик через месяц.
const вDist = await readdir(DIST)
const незнакомое = вDist.filter((x) => !НАШЕ.includes(x))
if (незнакомое.length) {
  console.error('в dist/ есть то, чего нет в списке publish.mjs: ' + незнакомое.join(', '))
  console.error('допиши в НАШЕ — иначе оно не попадёт на сайт')
  process.exit(1)
}

for (const имя of НАШЕ) {
  const откуда = join(DIST, имя)
  const куда = join(HERE, имя)
  if (!existsSync(откуда)) continue
  await rm(куда, { recursive: true, force: true })
  await cp(откуда, куда, { recursive: true })
}

// Без этого Jekyll съедает каталоги и файлы, начинающиеся с подчёркивания, и
// вообще пытается «собрать» готовый сайт заново.
await writeFile(join(HERE, '.nojekyll'), '')

console.log('разложено в корень: ' + НАШЕ.filter((x) => existsSync(join(HERE, x))).length + ' записей')
