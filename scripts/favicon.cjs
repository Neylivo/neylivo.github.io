// Значок сайта из настоящего логотипа. Запуск:
//   ../ponoi/node_modules/.bin/electron scripts/favicon.cjs
//
// ЗАЧЕМ ОТДЕЛЬНЫЙ СКРИПТ. favicon.ico до сих пор был собран разово и по моему
// старому рисунку. Раз логотип у продукта настоящий, значок обязан быть из него
// же и пересобираться одной командой — иначе он снова разойдётся с сайтом.
//
// ЧТО ВНУТРИ. Четыре размера (16/32/48/256) из assets/icon.png — того же файла,
// который стоит значком приложения. Каждый размер лежит в .ico отдельной
// картинкой в формате PNG: так делают все современные значки, и Windows с
// браузерами это понимают.
//
// ПРО 16 ПИКСЕЛЕЙ. Логотип — светло-серый круг с белым кубом, и на белой полосе
// вкладок серое по белому теряется. Поэтому у мелких размеров под кругом
// подложен тёмный квадрат со скруглением: сам знак не меняется, но у него
// появляется опора. У 256 подложки нет — там значок показывается на своём фоне.
const { app, BrowserWindow, nativeImage } = require('electron')
const path = require('path')
const fs = require('fs')

const ВХОД = path.join(__dirname, '..', 'assets', 'icon.png')
const ВЫХОД = path.join(__dirname, '..', 'assets', 'favicon.ico')
const РАЗМЕРЫ = [16, 32, 48, 256]
const ПОДЛОЖКА = 64          // до этого размера включительно рисуем тёмную плашку
const ФОН = '#0e1012'        // --paper тёмной темы сайта

app.disableHardwareAcceleration()

// Страница пишется файлом, а не грузится как data:. Логотип весит 113 КБ, и
// вшитый в адрес он делает адрес длиной под 160 тысяч символов — Chromium
// такой просто отказывается открывать (ERR_FAILED).
//
// Файл ложится в системный временный каталог, а НЕ рядом с картинкой. Первая
// версия клала его в assets/, один прогон упал на полпути, файл остался — и
// сборка честно вынесла его в dist как страницу сайта, а проверка так же
// честно сообщила, что у страницы нет ни заголовка, ни описания. Во временном
// каталоге такого не случится, даже если прогон снова оборвётся.
const ВРЕМЕННО = path.join(require('os').tmpdir(), 'ponoi-favicon-' + process.pid + '.html')
const ЗНАЧОК = 'file:///' + ВХОД.split(path.sep).join('/')

/**
 * Снять ВСЕ размеры одним окном.
 *
 * Почему не по окну на размер: окно шириной 16 пикселей Windows создавать
 * отказывается (у неё свой нижний предел), и загрузка страницы в нём падает с
 * ERR_FAILED. Поэтому окно одно, нормального размера, а размеры лежат в нём
 * столбиком и снимаются каждый своим прямоугольником.
 */
async function снятьВсе() {
  const ширина = Math.max(...РАЗМЕРЫ)
  const блоки = РАЗМЕРЫ.map((размер) => {
    const радиус = Math.max(2, Math.round(размер * 0.22))
    const поле = размер <= ПОДЛОЖКА ? Math.round(размер * 0.06) : 0
    const подложка = размер <= ПОДЛОЖКА ? `background:${ФОН};border-radius:${радиус}px;` : ''
    return `<div class="b" style="width:${размер}px;height:${размер}px;${подложка}">`
      + `<img style="width:${размер - поле * 2}px;height:${размер - поле * 2}px"></div>`
  }).join('\n')

  const html = `<!doctype html><meta charset=utf-8>
<style>*{margin:0;padding:0}html,body{width:${ширина}px;overflow:hidden;background:transparent}
.b{display:grid;place-items:center}
img{display:block}</style>
${блоки}
<script>for (const i of document.images) i.src = ${JSON.stringify(ЗНАЧОК)}</script>`
  fs.writeFileSync(ВРЕМЕННО, html)

  const высота = РАЗМЕРЫ.reduce((s, r) => s + r, 0)
  const win = new BrowserWindow({
    width: ширина, height: высота, show: false, useContentSize: true,
    transparent: true, frame: false,
  })
  await win.loadFile(ВРЕМЕННО)
  await new Promise((r) => setTimeout(r, 600))

  const куски = []
  let y = 0
  for (const размер of РАЗМЕРЫ) {
    const кадр = await win.webContents.capturePage({ x: 0, y, width: размер, height: размер })
    куски.push({ размер, png: кадр.resize({ width: размер, height: размер }).toPNG() })
    y += размер
  }
  win.destroy()
  return куски
}

/** Сложить .ico из готовых PNG. */
function собратьIco(куски) {
  const шапка = Buffer.alloc(6)
  шапка.writeUInt16LE(0, 0); шапка.writeUInt16LE(1, 2); шапка.writeUInt16LE(куски.length, 4)
  let смещение = 6 + 16 * куски.length
  const записи = []
  for (const { размер, png } of куски) {
    const e = Buffer.alloc(16)
    e.writeUInt8(размер >= 256 ? 0 : размер, 0)
    e.writeUInt8(размер >= 256 ? 0 : размер, 1)
    e.writeUInt8(0, 2); e.writeUInt8(0, 3)
    e.writeUInt16LE(1, 4); e.writeUInt16LE(32, 6)
    e.writeUInt32LE(png.length, 8); e.writeUInt32LE(смещение, 12)
    смещение += png.length
    записи.push(e)
  }
  return Buffer.concat([шапка, ...записи, ...куски.map((к) => к.png)])
}

app.whenReady().then(async () => {
  if (!fs.existsSync(ВХОД)) { console.error('не найден ' + ВХОД); app.exit(1); return }

  const куски = await снятьВсе()
  fs.unlinkSync(ВРЕМЕННО)

  fs.writeFileSync(ВЫХОД, собратьIco(куски))
  console.log('значок: ' + ВЫХОД + ' ('
    + (fs.statSync(ВЫХОД).size / 1024).toFixed(1) + ' КБ, размеры ' + РАЗМЕРЫ.join('/') + ')')
  app.exit(0)
})
