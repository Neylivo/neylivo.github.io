import { urlFor, REPO_URL } from '../site.mjs'

const t = {
  en: {
    title: 'NeyLivo Plugins — Extend Your Messenger',
    desc: 'NeyLivo plugins are single .neylivo JavaScript files that run sandboxed in a Web Worker with declared permissions. Add buttons, commands, panels, whole windows, bots and games.',
    h1: 'Make NeyLivo yours.',
    lede: '<b>Extend NeyLivo with plugins distributed as a single <code>.neylivo</code> file.</b> Write one in an afternoon, send it to a friend in a chat, and it installs from the message.',

    whyH: 'Why this exists',
    whyP: 'Most messengers let you pick a theme. NeyLivo lets you change what the app does. If you want a button in the composer that rolls dice, a panel that shows your team’s deploy status, a slash command that talks to a language model, a game that lives in a window inside the app, or a bot that greets people in your server — you write it yourself instead of asking somebody to add it.',
    whyP2: 'A plugin is not a package with a build step and a manifest folder. It is one JavaScript file with a comment at the top:',

    codeCap: 'A complete, working plugin.',

    distH: 'One file, sent like any other file',
    distP: 'Install a plugin from a file in Settings → Plugins, or receive one in a conversation: the message shows a card with the name, author, version and the full list of permissions the plugin is asking for, and an Install button. There is also a built-in catalogue, and personal transfer codes if you want to hand a plugin to one specific person.',
    distP2: 'There is an editor inside the app, so you can write, run and fix a plugin without leaving NeyLivo, and a workshop for plugins that need a 3D scene.',

    capH: 'What a plugin can do',
    capP: 'Around ninety API methods, grouped by what they touch. All of them go through one dispatcher that checks permissions on every call.',
    caps: [
      ['Interface', 'Buttons in the composer, actions on a message, context menu items, header buttons, hotkeys, your own settings page, side panels, and CSS for the whole app.'],
      ['Messages', 'Read the open channel, send messages, add reactions, delete, intercept a message before it is sent or before it is rendered, and hook file uploads — for example to strip location data from photos.'],
      ['Windows and pages', 'Open a real window inside NeyLivo with your own HTML: a full DOM with WebGL, WebGPU, WebAssembly, audio and unthrottled animation. Frameless and transparent windows are supported; the plugin can move them and knows when the user moves them.'],
      ['Storage and data', 'Key-value storage on the device, a small local database with tables and queries, and asset storage for files the plugin ships or downloads.'],
      ['Network', 'HTTP requests, streaming responses and WebSocket connections — restricted to the domains the plugin declared.'],
      ['Music', 'Read what is playing, control playback, read the library and add tracks to the queue.'],
      ['Commands and notifications', 'Slash commands with named and typed arguments, toasts, dialogs, confirmations and prompts.'],
      ['Between plugins', 'Plugins can register services and call each other, so one can build on another instead of duplicating it.'],
      ['Background and input', 'Timers that keep running while you use the app, and gamepad input.'],
    ],

    secH: 'Built with permissions in mind',
    secP: 'Everything above is only reachable if the plugin declared it, and you agreed at install time.',
    sec1H: 'Isolation is the browser’s, not ours',
    sec1P: 'Plugin code runs in a <b>Web Worker</b>. A worker has no DOM, no cookies and no access to the page, so a plugin cannot read your session, cannot draw a fake login window and cannot reach into the interface. Plugins with their own page get an <code>&lt;iframe sandbox="allow-scripts"&gt;</code> <b>without</b> <code>allow-same-origin</code> — a unique opaque origin, with its own DOM but no access to NeyLivo’s document or storage.',
    sec1P2: 'These are boundaries enforced by the browser, not checks in our code that a clever plugin could argue with.',
    sec2H: '23 permissions, in plain language',
    sec2P: 'The install screen shows exactly what the plugin asked for, worded for a person and not for a developer: “Send messages on your behalf”, “See messages in the open channel”, “Reach the internet (only the listed sites)”, “Change the appearance of the app”. You can turn a plugin off or remove it at any time.',
    sec3H: 'Network is an allowlist',
    sec3P: 'A plugin declares its domains in the header. Only <code>https:</code> and <code>wss:</code> are allowed, <code>Cookie</code> is never allowed, and a plugin can never make requests to NeyLivo itself or its backend — it cannot turn your own session against the app. A plugin may ask for access to <em>any</em> site, and if it does, the install screen says so in red.',

    honestH: 'What the sandbox does not do',
    honestP: 'A plugin cannot escape the browser. It absolutely can do what you allowed it to do. If you granted “send messages on your behalf”, it can send messages as you, whenever it likes — there are no rate limits, by design. The app says this before you install, because the real protection here is your judgement about who wrote the plugin, not a quota.',
    honestP2: 'Install plugins you trust, from people you trust, and turn off anything that starts behaving oddly.',

    startH: 'Start writing',
    startP: 'The plugin format, the full API and the permission list are documented in the repository. The fastest way in is the editor inside the app: Settings → Plugins → Create.',
    docsBtn: 'Plugin documentation',
    firstBtn: 'Create your first plugin',
    firstNote: 'Opens the plugin guide in the repository — the same text the in-app guide shows.',
  },

  ru: {
    title: 'Плагины NeyLivo — расширь свой мессенджер',
    desc: 'Плагины NeyLivo (Нейливо) — это один файл .neylivo на JavaScript, который работает в песочнице Web Worker с объявленными разрешениями. Кнопки, команды, панели, целые окна, боты и игры.',
    h1: 'Сделай NeyLivo своим.',
    lede: '<b>Расширяй NeyLivo плагинами, которые раздаются одним файлом <code>.neylivo</code>.</b> Такой пишется за вечер, отправляется другу прямо в чат и ставится из сообщения.',

    whyH: 'Зачем это',
    whyP: 'В большинстве мессенджеров можно выбрать тему. В NeyLivo можно поменять то, что приложение делает. Нужна кнопка в поле ввода, которая бросает кубик; панель со статусом выкладки у твоей команды; команда, которая разговаривает с языковой моделью; игра, живущая в окне внутри приложения; бот, который встречает людей на твоём сервере — ты пишешь это сам, а не просишь кого-то добавить.',
    whyP2: 'Плагин — это не пакет со сборкой и папкой манифеста. Это один файл на JavaScript с комментарием в начале:',

    codeCap: 'Целый рабочий плагин.',

    distH: 'Один файл, который передаётся как любой другой',
    distP: 'Плагин ставится из файла в Настройках → Плагины или приходит в беседу: сообщение показывает карточку с названием, автором, версией и полным списком запрошенных разрешений, и кнопку «Установить». Есть и встроенный каталог, и личные коды передачи, если плагин надо отдать одному конкретному человеку.',
    distP2: 'Внутри приложения есть редактор — писать, запускать и чинить плагин можно не выходя из NeyLivo, — и мастерская для плагинов, которым нужна 3D-сцена.',

    capH: 'Что плагин умеет',
    capP: 'Около девяноста методов, сгруппированных по тому, чего они касаются. Все они идут через один диспетчер, который на каждом вызове сверяется с разрешениями.',
    caps: [
      ['Интерфейс', 'Кнопки в поле ввода, действия на сообщении, пункты контекстного меню, кнопки в шапке, горячие клавиши, своя страница настроек, боковые панели и CSS для всего приложения.'],
      ['Сообщения', 'Читать открытый канал, отправлять сообщения, ставить реакции, удалять, перехватывать сообщение до отправки и до отрисовки, а также вмешиваться в загрузку файлов — например, снимать геометку с фотографий.'],
      ['Окна и страницы', 'Открыть внутри NeyLivo настоящее окно со своим HTML: полноценный DOM с WebGL, WebGPU, WebAssembly, звуком и анимацией без ограничения частоты. Есть окна без рамки и прозрачные; плагин может их двигать и знает, когда их двигает человек.'],
      ['Хранилище и данные', 'Хранилище «ключ — значение» на устройстве, небольшая local-база с таблицами и запросами, и хранилище файлов, которые плагин привёз с собой или скачал.'],
      ['Сеть', 'Запросы, потоковые ответы и постоянные соединения — только к доменам, которые плагин объявил.'],
      ['Музыка', 'Узнать, что играет, управлять воспроизведением, читать библиотеку и добавлять треки в очередь.'],
      ['Команды и уведомления', 'Команды через косую черту с именованными и типизированными аргументами, всплывающие сообщения, диалоги, подтверждения и запросы ввода.'],
      ['Между плагинами', 'Плагины умеют регистрировать службы и вызывать друг друга, чтобы один строился на другом, а не повторял его.'],
      ['Фон и устройства ввода', 'Таймеры, которые продолжают работать, пока человек пользуется приложением, и геймпады.'],
    ],

    secH: 'Разрешения продуманы заранее',
    secP: 'Всё перечисленное доступно, только если плагин это объявил, а человек согласился при установке.',
    sec1H: 'Изолирует браузер, а не мы',
    sec1P: 'Код плагина работает в <b>Web Worker</b>. У воркера нет ни DOM, ни куки, ни доступа к странице — поэтому плагин не прочитает вашу сессию, не нарисует поддельное окно входа и не влезет в интерфейс. Плагинам со своей страницей достаётся <code>&lt;iframe sandbox="allow-scripts"&gt;</code> <b>без</b> <code>allow-same-origin</code> — уникальное чужое происхождение: свой DOM есть, доступа к документу и хранилищу NeyLivo нет.',
    sec1P2: 'Это границы, которые держит браузер, а не проверки в нашем коде, с которыми хитрый плагин мог бы поспорить.',
    sec2H: '23 разрешения человеческими словами',
    sec2P: 'Экран установки показывает ровно то, что плагин попросил, и словами для человека, а не для программиста: «Отправлять сообщения от твоего имени», «Видеть сообщения в открытом канале», «Обращаться в интернет (только к указанным сайтам)», «Менять оформление приложения». Выключить или удалить плагин можно в любой момент.',
    sec3H: 'Сеть — по белому списку',
    sec3P: 'Домены плагин объявляет в шапке. Разрешены только <code>https:</code> и <code>wss:</code>, <code>Cookie</code> не разрешён никогда, а обратиться к самому NeyLivo и его серверу плагин не может вовсе — он не сумеет обратить вашу сессию против приложения. Плагин вправе попросить доступ к <em>любым</em> сайтам, и тогда экран установки говорит об этом красным.',

    honestH: 'Чего песочница не делает',
    honestP: 'Сбежать из браузера плагин не может. А вот сделать то, на что вы согласились, — вполне. Дали «отправлять сообщения от твоего имени» — он будет отправлять сообщения от вашего имени, когда захочет: количественных ограничений нет намеренно. Приложение говорит это до установки, потому что настоящая защита здесь — ваше суждение о том, кто написал плагин, а не квота.',
    honestP2: 'Ставьте то, чему доверяете, от людей, которым доверяете, и выключайте всё, что повело себя странно.',

    startH: 'Написать свой',
    startP: 'Формат плагина, весь API и список разрешений описаны в репозитории. Самый быстрый вход — редактор внутри приложения: Настройки → Плагины → Создать.',
    docsBtn: 'Документация плагинов',
    firstBtn: 'Создать первый плагин',
    firstNote: 'Откроется руководство в репозитории — тот же текст, что показывает встроенная подсказка.',
  },
}

const CODE = `/**
 * @name        Night mode
 * @id          nightmode
 * @version     1.0.0
 * @author      you
 * @description Highlights messages and adds a command
 * @permissions ui, css, commands, messages.write
 */

function onLoad(neylivo) {
  neylivo.css('.msg { border-left: 2px solid hotpink }')

  neylivo.ui.addComposerButton({
    key: 'wave', icon: 'flame', tooltip: 'Wave',
    onClick: () =&gt; neylivo.messages.send('o/'),
  })

  neylivo.commands.register('hello', 'Say hello', args =&gt;
    neylivo.messages.send('Hello, ' + (args || 'world') + '!'))
}`

export default {
  slug: 'plugins',
  title: (lang) => t[lang].title,
  description: (lang) => t[lang].desc,

  body: (ctx, lang) => {
    const s = t[lang]

    return `
<section class="page-head">
  <div class="wrap">
    <p class="eyebrow">${lang === 'en' ? 'Plugins' : 'Плагины'}</p>
    <h1>${s.h1}</h1>
    <p class="lede">${s.lede}</p>
    <div class="cta-row">
      <a class="btn btn-solid" href="${REPO_URL}/blob/main/PLUGINS.md" rel="noopener">${s.docsBtn}</a>
      <a class="btn btn-quiet" href="${REPO_URL}/blob/main/PLUGINS.md#формат-файла" rel="noopener">${s.firstBtn}</a>
    </div>
  </div>
</section>

<section class="wrap prose">
  <h2 class="mt0">${s.whyH}</h2>
  <p>${s.whyP}</p>
  <p>${s.whyP2}</p>
</section>

<figure class="wrap" style="margin:0 auto 40px">
  <pre style="overflow-x:auto;background:var(--card);border:1px solid var(--rule);border-radius:10px;padding:20px;font-family:var(--mono);font-size:13.5px;line-height:1.6"><code>${CODE}</code></pre>
  <figcaption class="muted" style="font-size:14px;margin-top:8px">${s.codeCap}</figcaption>
</figure>

<section class="wrap prose">
  <h2 class="mt0">${s.distH}</h2>
  <p>${s.distP}</p>
  <p>${s.distP2}</p>
</section>

<section class="band band-alt">
  <div class="wrap">
    <h2 class="mt0">${s.capH}</h2>
    <p class="prose">${s.capP}</p>
    <div class="grid g3">
      ${s.caps.map(([h, p]) => `<article class="card"><h3>${h}</h3><p>${p}</p></article>`).join('\n      ')}
    </div>
  </div>
</section>

<section class="band">
  <div class="wrap">
    <h2 class="mt0">${s.secH}</h2>
    <p class="prose">${s.secP}</p>
    <div class="prose">
      <h3>${s.sec1H}</h3>
      <p>${s.sec1P}</p>
      <p>${s.sec1P2}</p>
      <h3>${s.sec2H}</h3>
      <p>${s.sec2P}</p>
      <h3>${s.sec3H}</h3>
      <p>${s.sec3P}</p>
    </div>
    <div class="prose">
      <h3>${s.honestH}</h3>
      <div class="note note-warn">
        <p>${s.honestP}</p>
        <p>${s.honestP2}</p>
      </div>
    </div>
  </div>
</section>

<section class="band band-alt">
  <div class="wrap prose">
    <h2 class="mt0">${s.startH}</h2>
    <p>${s.startP}</p>
    <div class="cta-row">
      <a class="btn btn-solid" href="${REPO_URL}/blob/main/PLUGINS.md" rel="noopener">${s.docsBtn}</a>
      <a class="btn btn-quiet" href="${urlFor('docs', lang)}">${lang === 'en' ? 'All documentation' : 'Вся документация'}</a>
    </div>
    <p class="muted"><small>${s.firstNote}</small></p>
  </div>
</section>
`
  },
}
