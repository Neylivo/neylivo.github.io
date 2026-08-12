// Посмотреть на собранный сайт глазами. Запуск:
//   electron scripts/look.cjs                  — все снимки в dist-look/
//
// Стенд открывает НАСТОЯЩИЕ файлы из dist/, то есть ровно то, что уедет на
// GitHub Pages, а не отдельную разметку «по мотивам».
//
// Через свой http-сервер, а не file://: адреса на сайте абсолютные (/assets/…,
// /about/), и по file:// они ведут в корень диска. Пока картинок на сайте не
// было, это ничего не портило; со снимками приложения стенд сразу показал
// битые картинки — то есть врал в самом заметном месте.
const { app, BrowserWindow, nativeTheme } = require('electron')
const path = require('path')
const fs = require('fs')
const http = require('http')

const DIST = path.join(__dirname, '..', 'dist')
const OUT = path.join(__dirname, '..', 'dist-look')

const СТРАНИЦЫ = [
  ['главная', 'index.html'],
  ['главная-ru', 'ru/index.html'],
  ['скачать', 'download/index.html'],
  ['возможности', 'features/index.html'],
  ['безопасность', 'security/index.html'],
  ['приватность-ru', 'ru/privacy/index.html'],
  ['плагины', 'plugins/index.html'],
  ['трекотека-ru', 'ru/trackoteka/index.html'],
  ['вопросы', 'faq/index.html'],
  ['о-проекте-ru', 'ru/about/index.html'],
  ['прозрачность', 'transparency/index.html'],
  ['404', '404.html'],
]

const РАЗМЕРЫ = [
  ['', 1280, 900],
  ['-телефон', 390, 844],
]

const ТИПЫ = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8', '.png': 'image/png', '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon', '.webmanifest': 'application/manifest+json', '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml',
}
let ПОРТ = 0

app.disableHardwareAcceleration()

app.whenReady().then(async () => {
  fs.mkdirSync(OUT, { recursive: true })

  const сервер = http.createServer((req, res) => {
    let п = decodeURIComponent((req.url || '/').split('?')[0])
    if (п.endsWith('/')) п += 'index.html'
    const файл = path.join(DIST, п)
    // Наружу из dist/ не выпускаем: стенд обязан показывать сайт, а не диск.
    if (!файл.startsWith(DIST)) { res.writeHead(403); res.end(); return }
    fs.readFile(файл, (e, тело) => {
      if (e) { res.writeHead(404, { 'content-type': 'text/plain' }); res.end('нет: ' + п); return }
      res.writeHead(200, { 'content-type': ТИПЫ[path.extname(файл)] || 'application/octet-stream' })
      res.end(тело)
    })
  })
  await new Promise((r) => сервер.listen(0, '127.0.0.1', r))
  ПОРТ = сервер.address().port
  console.log('сервер стенда: http://127.0.0.1:' + ПОРТ)
  // Окно одно на размер и переиспользуется: создание и уничтожение окна на
  // каждый снимок роняло загрузку следующей страницы (ERR_FAILED) — новое окно
  // успевало начать загрузку раньше, чем предыдущее закончило умирать.
  // Окно одно на весь прогон, размер меняется на месте: уничтожить окно и тут
  // же создать новое не выходит — следующая загрузка падает с ERR_FAILED.
  const win = new BrowserWindow({
    width: РАЗМЕРЫ[0][1], height: РАЗМЕРЫ[0][2], show: false, useContentSize: true,
    webPreferences: { offscreen: true },
  })
  for (const [суффикс, w, h] of РАЗМЕРЫ) {
    win.setContentSize(w, h)
    await new Promise((r) => setTimeout(r, 200))
    for (const [тема, признак] of [['тёмная', true], ['светлая', false]]) {
      nativeTheme.themeSource = признак ? 'dark' : 'light'
      for (const [имя, файл] of СТРАНИЦЫ) {
        // Светлую тему снимаем только на трёх страницах: она проверяется на
        // читаемость, а не на содержание, и двадцать четыре лишних снимка
        // просматривать никто не станет.
        if (!признак && !['главная', 'безопасность', 'скачать'].includes(имя)) continue
        await win.loadURL('http://127.0.0.1:' + ПОРТ + '/' + файл.split('\\').join('/'))
        await new Promise((r) => setTimeout(r, 400))
        const узлов = await win.webContents.executeJavaScript('document.querySelectorAll("*").length')
        const кадр = await win.webContents.capturePage()
        const полное = имя + суффикс + (признак ? '' : '-светлая')
        fs.writeFileSync(path.join(OUT, полное + '.png'), кадр.toPNG())
        console.log('снято: ' + полное + '.png  (узлов: ' + узлов + ')')
      }
    }
  }
  win.destroy()
  app.quit()
})
