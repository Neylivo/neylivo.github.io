// Единственный скрипт на сайте. Без него страница работает целиком: он только
// подсказывает, какая кнопка скачивания подходит этому устройству.
//
// Никакого распознавания «отпечатка» здесь нет и быть не должно: смотрим на
// одну строку, которую браузер и так сообщает каждому сайту, и ничего никуда
// не отправляем — считать посетителей нечем и незачем.
(function () {
  'use strict'

  function platform() {
    var d = navigator.userAgentData
    if (d && d.platform) {
      var p = d.platform.toLowerCase()
      if (p.indexOf('android') > -1) return 'and'
      if (p.indexOf('windows') > -1) return 'win'
      return null
    }
    var ua = navigator.userAgent || ''
    if (/android/i.test(ua)) return 'and'
    if (/windows/i.test(ua)) return 'win'
    return null
  }

  var os = platform()
  if (!os) return

  // Первый экран: главная кнопка ведёт прямо на нужный файл.
  var hero = document.querySelector('[data-os-cta]')
  if (hero) {
    var href = hero.getAttribute('data-' + os)
    var label = hero.getAttribute('data-' + os + '-label')
    if (href && label) {
      hero.setAttribute('href', href)
      hero.textContent = label
    }
  }

  // Страница скачивания: помечаем подходящую карточку и ставим её первой.
  // Порядок меняем свойством CSS, а не переносом узлов: так порядок чтения с
  // клавиатуры и экранным диктором остаётся прежним, а глазами видно нужное.
  var grid = document.querySelector('[data-dl-grid]')
  if (grid) {
    var card = grid.querySelector('[data-os="' + os + '"]')
    if (card) {
      card.style.order = '-1'
      grid.style.display = 'grid'
      if (!card.classList.contains('dl-primary')) card.classList.add('dl-primary')
      var tag = document.createElement('p')
      tag.className = 'meta'
      tag.style.color = 'var(--accent)'
      tag.textContent = grid.getAttribute('data-rec') || ''
      if (tag.textContent) card.insertBefore(tag, card.firstChild)
    }
  }
})()
