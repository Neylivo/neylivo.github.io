// Картинка для соцсетей, 1200×630. Запуск:
//   node scripts/og.cjs            (через electron из соседнего проекта)
//
// Рисуется той же вёрсткой и теми же цветами, что и сайт, и снимается
// настоящим движком, а не собирается в редакторе. Значит она не разойдётся с
// сайтом по цвету и по знаку: поменяется палитра — переснимем одной командой.
const { app, BrowserWindow } = require('electron')
const path = require('path')
const fs = require('fs')

const OUT = path.join(__dirname, '..', 'assets', 'ponoi-og.png')
const W = 1200
const H = 630

const MARK = `<svg width="132" height="132" viewBox="0 0 64 64">
  <g fill="none" stroke="#e8945e" stroke-width="3.2" stroke-linejoin="round" stroke-linecap="round">
    <path d="M32 5 57 19v26L32 59 7 45V19Z"/>
    <path d="M7 19l25 14 25-14M32 33v26"/>
    <path d="M32 19l12 7-12 7-12-7Z"/>
  </g>
</svg>`

const HTML = `<!doctype html><meta charset="utf-8">
<style>
  * { margin:0; padding:0; box-sizing:border-box }
  html,body { width:${W}px; height:${H}px; overflow:hidden }
  body {
    background:#14140f; color:#ece8dd;
    font-family: system-ui, "Segoe UI", Roboto, sans-serif;
    display:flex; flex-direction:column; justify-content:center;
    padding:0 84px; position:relative;
  }
  /* Тонкая сетка — тот же приём, что на первом экране сайта. */
  body::before {
    content:''; position:absolute; inset:0; pointer-events:none;
    background:
      linear-gradient(0deg, transparent calc(100% - 1px), #24241d 100%) 0 0/100% 42px,
      linear-gradient(90deg, transparent calc(100% - 1px), #24241d 100%) 0 0/42px 100%;
    mask-image: radial-gradient(120% 90% at 78% 50%, #000 20%, transparent 72%);
  }
  .row { display:flex; align-items:center; gap:46px; position:relative }
  .mark { flex:none; margin-top:6px }
  h1 { font-size:104px; letter-spacing:-.05em; font-weight:700; line-height:.9 }
  .tag { font-size:40px; font-weight:600; letter-spacing:-.02em; color:#e8945e; margin-top:18px }
  .lede { font-size:25px; line-height:1.5; color:#c8c4b8; margin-top:26px; max-width:40ch }
  .foot {
    position:absolute; left:84px; right:84px; bottom:46px;
    display:flex; justify-content:space-between; align-items:baseline;
    font-family: ui-monospace, "Cascadia Mono", Consolas, monospace;
    font-size:21px; color:#999588; letter-spacing:.02em;
  }
</style>
<div class="row">
  <div class="mark">${MARK}</div>
  <div>
    <h1>PONOI</h1>
    <div class="tag">Private. Extensible. Yours.</div>
    <div class="lede">A privacy-focused extensible messenger for conversations, communities, calls and music.</div>
  </div>
</div>
<div class="foot"><span>ponoiai.github.io</span><span>Windows · Android · Web</span></div>
`

app.disableHardwareAcceleration()

app.whenReady().then(async () => {
  const win = new BrowserWindow({
    width: W, height: H, show: false, useContentSize: true,
    webPreferences: { offscreen: true },
  })
  await win.loadURL('data:text/html;charset=utf-8,' + encodeURIComponent(HTML))
  // Даём странице отрисоваться: снимок сразу после загрузки ловит пустой кадр.
  await new Promise((r) => setTimeout(r, 700))
  const img = await win.webContents.capturePage()
  fs.writeFileSync(OUT, img.toPNG())
  const kb = (fs.statSync(OUT).size / 1024).toFixed(0)
  console.log('снято: ' + OUT + ' (' + kb + ' КБ, ' + img.getSize().width + '×' + img.getSize().height + ')')
  app.quit()
})
