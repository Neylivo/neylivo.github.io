// Посмотреть на собранный сайт глазами. Запуск:
//   electron scripts/look.cjs                  — все снимки в dist-look/
//
// Стенд открывает НАСТОЯЩИЕ файлы из dist/ через file://, то есть ровно то, что
// уедет на GitHub Pages, а не отдельную разметку «по мотивам». Единственное, в
// чём он врёт: относительные адреса вида /about/ через file:// не открываются,
// поэтому проверяем вид страниц, а не переходы по ссылкам — переходы проверяет
// check.mjs.
const { app, BrowserWindow, nativeTheme } = require('electron')
const path = require('path')
const fs = require('fs')

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

app.disableHardwareAcceleration()

app.whenReady().then(async () => {
  fs.mkdirSync(OUT, { recursive: true })
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
        await win.loadFile(path.join(DIST, файл))
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
