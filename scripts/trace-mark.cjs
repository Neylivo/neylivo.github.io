// Обвести настоящий значок NeyLivo в SVG. Запуск:
//   ../ponoi/node_modules/.bin/electron scripts/trace-mark.cjs
//
// ЗАЧЕМ. Знак в шапке сайта был МОИМ рисунком «в духе» значка приложения.
// Владелец прислал настоящий логотип, и рисовать похожее вместо него нельзя:
// логотип у продукта один, а «похоже» — это другой логотип.
//
// ПОЧЕМУ ОБВОДКА, А НЕ ПРОСТО PNG. Логотип залит небом с облаками и живёт на
// белом квадрате. В шапке сайта, где знак ростом с строку и стоит на тёмной
// теме тоже, белый квадрат смотрелся бы заплаткой, а облака на 26 пикселях
// превратились бы в грязь. Поэтому в шапку идёт СИЛУЭТ знака в currentColor —
// он одинаково читается в любой теме. Полноцветный логотип остаётся там, где
// он и нужен: значок приложения, favicon, картинка для соцсетей.
//
// КАК. Силуэт — это всё, что заметно темнее белого фона. Граница обводится
// по-пиксельно (алгоритм Мура), ломаная упрощается (Дуглас-Пекер) и переводится
// в координаты viewBox 64×64. Никаких кривых: в знаке одни прямые, и любая
// кривая означала бы ошибку обводки.
const { app, nativeImage } = require('electron')
const path = require('path')
const fs = require('fs')

const ВХОД = path.join(__dirname, '..', 'assets', 'icon.png')
const ВЫХОД = path.join(__dirname, '..', 'assets', 'mark.svg')
const ПОРОГ = 238          // темнее этого хотя бы в одном канале — это знак, а не фон
const EPS = 1.1            // упрощение ломаной, в пикселях исходника

app.whenReady().then(() => {
  const img = nativeImage.createFromPath(ВХОД)
  const { width: W, height: H } = img.getSize()
  const buf = img.toBitmap()          // BGRA
  if (!W || !H) { console.error('не прочитался ' + ВХОД); app.exit(1); return }

  // Маска знака: непрозрачное и заметно темнее белого фона.
  const маска = new Uint8Array(W * H)
  for (let i = 0; i < W * H; i++) {
    const b = buf[i * 4], g = buf[i * 4 + 1], r = buf[i * 4 + 2], a = buf[i * 4 + 3]
    маска[i] = (a > 128 && (r < ПОРОГ || g < ПОРОГ || b < ПОРОГ)) ? 1 : 0
  }

  const внутри = (x, y) => (x < 0 || y < 0 || x >= W || y >= H) ? 0 : маска[y * W + x]

  // ── Разметка связных областей, чтобы обвести каждую фигуру отдельно ──────
  const метка = new Int32Array(W * H).fill(-1)
  const области = []
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
    const i = y * W + x
    if (!маска[i] || метка[i] >= 0) continue
    const id = области.length
    const стек = [i]; метка[i] = id
    let n = 0, minx = x, miny = y
    while (стек.length) {
      const j = стек.pop(); n++
      const jx = j % W, jy = (j - jx) / W
      if (jy < miny || (jy === miny && jx < minx)) { minx = jx; miny = jy }
      for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
        const nx = jx + dx, ny = jy + dy
        if (nx < 0 || ny < 0 || nx >= W || ny >= H) continue
        const k = ny * W + nx
        if (маска[k] && метка[k] < 0) { метка[k] = id; стек.push(k) }
      }
    }
    области.push({ id, n, minx, miny })
  }
  // Пыль от сглаживания краёв выбрасываем.
  const крупные = области.filter(о => о.n > (W * H) / 20000)
  крупные.sort((a, b) => b.n - a.n)

  // ── Обводка границы области (алгоритм Мура) ──────────────────────────────
  const СОСЕДИ = [[1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0], [-1, -1], [0, -1], [1, -1]]
  function обвести(старт, id) {
    const свой = (x, y) => внутри(x, y) && метка[y * W + x] === id
    const точки = []
    let cx = старт[0], cy = старт[1], dir = 6   // пришли сверху
    const первый = [cx, cy]
    let шагов = 0
    do {
      точки.push([cx, cy])
      let нашли = false
      for (let k = 0; k < 8; k++) {
        const d = (dir + 6 + k) % 8              // начинаем с «назад-налево»
        const nx = cx + СОСЕДИ[d][0], ny = cy + СОСЕДИ[d][1]
        if (свой(nx, ny)) { cx = nx; cy = ny; dir = d; нашли = true; break }
      }
      if (!нашли) break
      if (++шагов > W * H) break
    } while (!(cx === первый[0] && cy === первый[1]))
    return точки
  }

  // ── Упрощение ломаной ────────────────────────────────────────────────────
  function рдп(pts, eps) {
    if (pts.length < 3) return pts
    let макс = 0, idx = 0
    const [ax, ay] = pts[0], [bx, by] = pts[pts.length - 1]
    const dx = bx - ax, dy = by - ay
    const дл = Math.hypot(dx, dy) || 1
    for (let i = 1; i < pts.length - 1; i++) {
      const d = Math.abs((pts[i][0] - ax) * dy - (pts[i][1] - ay) * dx) / дл
      if (d > макс) { макс = d; idx = i }
    }
    if (макс <= eps) return [pts[0], pts[pts.length - 1]]
    return [...рдп(pts.slice(0, idx + 1), eps).slice(0, -1), ...рдп(pts.slice(idx), eps)]
  }

  // ── Перевод в viewBox 64×64 вокруг самого знака ──────────────────────────
  // Обрезаем по границам куба, а не по картинке: в шапке нужен знак, а не
  // прозрачные поля вокруг него.
  let minx = W, miny = H, maxx = 0, maxy = 0
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
    if (маска[y * W + x] && крупные.some(о => о.id === метка[y * W + x])) {
      if (x < minx) minx = x; if (x > maxx) maxx = x
      if (y < miny) miny = y; if (y > maxy) maxy = y
    }
  }
  const сторона = Math.max(maxx - minx, maxy - miny)
  const ox = minx - (сторона - (maxx - minx)) / 2
  const oy = miny - (сторона - (maxy - miny)) / 2
  const к = (v, o) => +(((v - o) / сторона) * 64).toFixed(2)

  const пути = крупные.map(о => {
    const контур = рдп(обвести([о.minx, о.miny], о.id), EPS)
    if (контур.length < 3) return null
    return 'M' + контур.map(([x, y]) => `${к(x, ox)} ${к(y, oy)}`).join('L') + 'Z'
  }).filter(Boolean)

  // ── Дырки внутри знака ──────────────────────────────────────────────────
  //
  // Обводка выше даёт ТОЛЬКО внешнюю границу каждой фигуры. У прежнего логотипа
  // этого хватало: он состоял из отдельных белых кусков. У нового знак — кольцо
  // с буквой внутри, и без дырок он превращается в сплошной шестиугольник.
  // Поймал это на первом же прогоне, глядя на снимок.
  //
  // Дырка — это область ФОНА, не связанная с краем картинки. Обводим её так же
  // и добавляем в тот же путь: fill-rule="evenodd" вычтет её из фигуры.
  const фон = new Int32Array(W * H).fill(-1)
  const дырки = []
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
    const i = y * W + x
    if (маска[i] || фон[i] >= 0) continue
    const id = дырки.length
    const стек = [i]; фон[i] = id
    let n = 0, minx2 = x, miny2 = y, край = false
    while (стек.length) {
      const j = стек.pop(); n++
      const jx = j % W, jy = (j - jx) / W
      if (jx === 0 || jy === 0 || jx === W - 1 || jy === H - 1) край = true
      if (jy < miny2 || (jy === miny2 && jx < minx2)) { minx2 = jx; miny2 = jy }
      for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
        const nx = jx + dx, ny = jy + dy
        if (nx < 0 || ny < 0 || nx >= W || ny >= H) continue
        const k = ny * W + nx
        if (!маска[k] && фон[k] < 0) { фон[k] = id; стек.push(k) }
      }
    }
    дырки.push({ id, n, minx: minx2, miny: miny2, край })
  }
  const настоящиеДырки = дырки.filter(д => !д.край && д.n > (W * H) / 20000)

  const СОСЕДИ2 = СОСЕДИ
  function обвестиДырку(старт, id) {
    const свой = (x, y) => (x >= 0 && y >= 0 && x < W && y < H) && !маска[y * W + x] && фон[y * W + x] === id
    const точки = []
    let cx = старт[0], cy = старт[1], dir = 6
    const первый = [cx, cy]
    let шагов = 0
    do {
      точки.push([cx, cy])
      let нашли = false
      for (let k = 0; k < 8; k++) {
        const d = (dir + 6 + k) % 8
        const nx = cx + СОСЕДИ2[d][0], ny = cy + СОСЕДИ2[d][1]
        if (свой(nx, ny)) { cx = nx; cy = ny; dir = d; нашли = true; break }
      }
      if (!нашли) break
      if (++шагов > W * H) break
    } while (!(cx === первый[0] && cy === первый[1]))
    return точки
  }

  for (const д of настоящиеДырки) {
    const контур = рдп(обвестиДырку([д.minx, д.miny], д.id), EPS)
    if (контур.length < 3) continue
    пути.push('M' + контур.map(([x, y]) => `${к(x, ox)} ${к(y, oy)}`).join('L') + 'Z')
  }
  console.log('дырок: ' + настоящиеДырки.length)

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64" role="img" aria-label="NeyLivo">
  <path fill="currentColor" fill-rule="evenodd" d="${пути.join('')}"/>
</svg>
`
  fs.writeFileSync(ВЫХОД, svg)
  console.log('областей: ' + крупные.length + ', вершин: '
    + пути.reduce((s, p) => s + p.split('L').length, 0) + ', байт: ' + svg.length)
  console.log('записано: ' + ВЫХОД)
  app.exit(0)
})
