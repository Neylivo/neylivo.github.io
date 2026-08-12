import { urlFor } from '../site.mjs'

const B = {
  ok: { en: 'Available', ru: 'Работает' },
  opt: { en: 'Optional', ru: 'По выбору' },
  exp: { en: 'Experimental', ru: 'Экспериментально' },
}
const badge = (kind, lang) =>
  `<span class="badge ${kind === 'ok' ? 'b-ok' : kind === 'exp' ? 'b-beta' : 'b-off'}">${B[kind][lang]}</span>`

const t = {
  en: {
    title: 'Ponoi Features — Messaging, Communities, Calls, Music, Plugins',
    desc: 'Everything Ponoi does today: direct messages, servers and channels, voice and video calls, screen sharing, Trackoteka music, themes and JavaScript plugins.',
    h1: 'What Ponoi can do',
    lede: 'This page lists what exists in the app right now. Nothing here is planned, promised or coming soon — where something is only partly proven, it says so.',
    toc: 'On this page',

    msgH: 'Messaging',
    msgP: 'The basics, done properly. Ponoi is a messenger first.',
    msgList: [
      'Direct messages with one person, and group conversations with several',
      'Replies with a quoted preview, and threads for longer side-conversations',
      'Reactions with any emoji, including custom emoji uploaded to a server',
      'Editing and deleting your own messages, with an edited marker',
      'Pinned messages per channel and per conversation',
      'File attachments of any type, images and video shown inline, large files uploaded in parts',
      'GIF search and a personal GIF collection',
      'Mentions of people and roles, with notification rules that respect them',
      'Read receipts in direct messages, typing indicators, forwarding, and bulk selection',
      'Markdown-style formatting, code blocks with syntax highlighting, and spoilers',
      'Slash commands, including ones added by plugins',
      'Message search inside a conversation and jump-to-message from a reply',
    ],
    e2eeNote: '<b>Direct messages between two people can be end-to-end encrypted.</b> It is a setting, off by default, and it does not apply to group conversations or server channels. Details on the <a href="/security/">security page</a>.',

    comH: 'Communities',
    comP: 'A server is a place with channels, members and rules. Ponoi covers the parts that make a community actually workable, not just a group chat with a name.',
    comList: [
      'Text, voice and forum channels, arranged in categories',
      'Roles with granular permissions, per-channel overrides, and read-only channels',
      'Private channels visible only to chosen roles',
      'Invites by code or link, with a limited number of uses or an expiry',
      'A public server catalogue, and verification levels that gate who can post',
      'Moderation: kick, ban, timeouts, bulk delete, an automod, and an audit log of who did what',
      'Server emoji and stickers, server templates, custom server rules people must accept',
      'Webhooks and bots, with a builder for simple bots',
      'Per-channel and per-server notification settings, including “mentions only”',
    ],

    callH: 'Calls',
    callP: 'Voice, video and screen sharing, in a direct conversation or in a server voice channel.',
    callList: [
      'Voice calls and video calls',
      'Screen sharing — a whole screen or a single window — with the sound of what you are sharing',
      'Noise suppression, a microphone test, and picking your input and output devices',
      'Push-to-talk, per-participant volume from 0 to 200%, and muting an individual person',
      'Full screen with a hiding control bar, and an overlay that stays visible on top of a game',
      'Soundboard, voice effects, and ringing with missed-call messages in the conversation',
    ],
    callNote: 'Calls can be end-to-end encrypted between two people, as a setting. That path has been tested in code but never verified in a real call between two devices, so it is marked experimental rather than presented as proven. If encryption cannot be set up, the call continues unencrypted and tells you so on screen.',

    musH: 'Music — Trackoteka',
    musP: 'Ponoi has a built-in music system called Trackoteka. It is not a link to a streaming service bolted on the side: the library, the player and listening together are part of the app.',
    musMore: 'Read more about Trackoteka',

    custH: 'Customization',
    custP: 'Ponoi is meant to be rearranged. Most of the visual surface is yours.',
    custList: [
      'Light and dark themes, plus preset colour schemes and your own accent colour',
      'Your own fonts for the interface and for message text, including uploaded font files',
      'Chat backgrounds and profile banners, colours, pronouns and an about section',
      'A pet that lives in the window, and profile plates',
      'Configurable hotkeys, and a quick switcher for jumping between conversations',
      'Compact and cozy message layouts, and a per-server nickname',
    ],

    plugH: 'Plugins',
    plugP: 'A plugin is one <code>.ponoi</code> file. Anyone can write one, and send it to a friend in a chat — it arrives as a card with the author, the version and the list of permissions it asks for.',
    plugMore: 'Read more about plugins',

    privH: 'Privacy and account safety',
    privList: [
      ['E2EE for direct messages, attachments and calls — three separate switches, all off by default', 'opt'],
      ['Trusted devices: a new device is limited until you confirm it, and a recovery code exists for the worst case', 'ok'],
      ['Log in by scanning a QR code from an already logged-in device', 'ok'],
      ['Screen capture protection: the window refuses to appear in screenshots and recordings, and on Android the app is absent from the recents preview', 'opt'],
      ['Blur messages until you hover them — against someone reading over your shoulder', 'opt'],
      ['Blocking people, controlling who can call you and who can add you', 'ok'],
      ['Deleting your account and its data from inside the app', 'ok'],
    ],
    privNote: 'No screen protection can stop someone photographing your screen with another phone — while text is visible to the eye, it is visible to a camera. The setting says so in the app too.',

    platH: 'Platforms',
    platP: 'The same application, with a few platform-specific extras.',
    platWin: '<b>Windows.</b> Installed app with a tray icon, notifications while the window is closed, self-updating, clip recording, a call overlay over games, and game detection for activity status.',
    platAnd: '<b>Android.</b> Installed from an APK file. Background music playback with a system media card, push notifications, and mobile-first navigation with swipes and sheets.',
    platWeb: '<b>Web.</b> Runs in a browser with no installation; can be added to a phone’s home screen and then behaves like an app.',
    offline: 'When the backend is unreachable for a long time, the app offers a minimal emergency chat so people can still reach each other. It is a separate small service and not a copy of Ponoi — it has no servers, channels or friends.',
  },

  ru: {
    title: 'Возможности Ponoi — сообщения, сообщества, звонки, музыка, плагины',
    desc: 'Всё, что Ponoi (Поной) умеет сегодня: личные сообщения, серверы и каналы, голосовые и видеозвонки, демонстрация экрана, Трекотека, темы и плагины на JavaScript.',
    h1: 'Что умеет Ponoi',
    lede: 'На этой странице перечислено то, что есть в приложении сейчас. Ничего запланированного и «скоро» здесь нет, а где что-то проверено не до конца — так и написано.',
    toc: 'На этой странице',

    msgH: 'Переписка',
    msgP: 'Основа, сделанная как следует. Ponoi прежде всего мессенджер.',
    msgList: [
      'Личные сообщения с одним человеком и групповые беседы с несколькими',
      'Ответы с цитатой и обсуждения для разговоров в стороне',
      'Реакции любыми эмодзи, включая свои, загруженные на сервер',
      'Правка и удаление своих сообщений с пометкой «изменено»',
      'Закреплённые сообщения в каждом канале и в каждой беседе',
      'Вложения любого типа, картинки и видео прямо в ленте, большие файлы уходят частями',
      'Поиск GIF и своя коллекция гифок',
      'Упоминания людей и ролей, и правила уведомлений, которые их учитывают',
      'Отметки о прочтении в личных, «печатает…», пересылка и выбор нескольких сообщений',
      'Разметка текста, блоки кода с подсветкой и спойлеры',
      'Команды через косую черту, в том числе добавленные плагинами',
      'Поиск по беседе и переход к сообщению из ответа',
    ],
    e2eeNote: '<b>Личную переписку двух людей можно защитить сквозным шифрованием.</b> Это настройка, по умолчанию выключенная, и на групповые беседы и каналы серверов она не распространяется. Подробности — на <a href="/ru/security/">странице безопасности</a>.',

    comH: 'Сообщества',
    comP: 'Сервер — это место с каналами, участниками и правилами. В Ponoi есть то, без чего сообщество не живёт, а не просто групповой чат с названием.',
    comList: [
      'Текстовые, голосовые и форумные каналы, разложенные по категориям',
      'Роли с точными правами, отдельные права на канал и каналы только для чтения',
      'Закрытые каналы, видимые только выбранным ролям',
      'Приглашения кодом или ссылкой, с ограничением по числу использований и по сроку',
      'Каталог публичных серверов и ступени проверки, решающие, кому можно писать',
      'Модерация: исключение, бан, тайм-ауты, массовое удаление, автомодерация и журнал действий',
      'Эмодзи и стикеры сервера, шаблоны серверов, свои правила с обязательным согласием',
      'Вебхуки и боты, с конструктором для простых ботов',
      'Настройки уведомлений на канал и на сервер, включая «только упоминания»',
    ],

    callH: 'Звонки',
    callP: 'Голос, видео и демонстрация экрана — в личной беседе или в голосовом канале сервера.',
    callList: [
      'Голосовые и видеозвонки',
      'Демонстрация экрана — целиком или отдельным окном — вместе со звуком того, что показываешь',
      'Шумоподавление, проверка микрофона, выбор устройства записи и вывода',
      'Рация, громкость каждого участника от 0 до 200%, отключение отдельного человека',
      'Полный экран с прячущейся панелью и накладка, видимая поверх игры',
      'Саундпад, эффекты голоса, гудки и сообщение о пропущенном звонке в беседе',
    ],
    callNote: 'Звонок двух людей можно зашифровать сквозным шифрованием — это отдельная настройка. Этот путь проверен в коде, но ни разу не проверен живым звонком между двумя устройствами, поэтому он помечен экспериментальным, а не выдаётся за доказанный. Если шифрование не удалось установить, звонок идёт незашифрованным и говорит об этом на экране.',

    musH: 'Музыка — Трекотека',
    musP: 'В Ponoi встроена музыкальная система — Трекотека. Это не ссылка на стриминг сбоку: библиотека, проигрыватель и совместное прослушивание — часть приложения.',
    musMore: 'Подробнее о Трекотеке',

    custH: 'Персонализация',
    custP: 'Ponoi рассчитан на то, что его переделают под себя. Почти всё, что видно на экране, — ваше.',
    custList: [
      'Светлая и тёмная темы, наборы цветовых схем и свой цвет акцента',
      'Свои шрифты для интерфейса и для текста сообщений, включая загруженные файлы шрифтов',
      'Фоны чата, обложки профиля, цвета, местоимения и раздел «о себе»',
      'Питомец, который живёт в окне, и таблички профиля',
      'Настраиваемые горячие клавиши и быстрый переход между беседами',
      'Плотный и просторный вид сообщений, свой ник на каждом сервере',
    ],

    plugH: 'Плагины',
    plugP: 'Плагин — это один файл <code>.ponoi</code>. Написать его может кто угодно и отправить другу прямо в чат — он придёт карточкой с автором, версией и списком запрошенных разрешений.',
    plugMore: 'Подробнее о плагинах',

    privH: 'Приватность и защита учётной записи',
    privList: [
      ['Сквозное шифрование переписки, вложений и звонков — три отдельных переключателя, все по умолчанию выключены', 'opt'],
      ['Доверенные устройства: с нового устройства опасное недоступно, пока его не подтвердят, а на крайний случай есть код восстановления', 'ok'],
      ['Вход по QR-коду с устройства, где уже выполнен вход', 'ok'],
      ['Защита от съёмки экрана: окно отказывается попадать в снимки и записи, а на Android приложения нет и в списке недавних', 'opt'],
      ['Размытие сообщений до наведения — против взгляда через плечо', 'opt'],
      ['Блокировка людей, выбор того, кто может звонить и кто может добавлять', 'ok'],
      ['Удаление учётной записи и её данных прямо из приложения', 'ok'],
    ],
    privNote: 'Никакая защита экрана не помешает снять его другим телефоном — пока текст виден глазу, он виден и камере. В самой настройке об этом сказано прямо.',

    platH: 'Платформы',
    platP: 'Одно и то же приложение, с небольшими добавками под каждую платформу.',
    platWin: '<b>Windows.</b> Установленное приложение со значком в трее, уведомлениями при закрытом окне, самообновлением, записью клипов, накладкой звонка поверх игр и определением запущенной игры для статуса.',
    platAnd: '<b>Android.</b> Ставится из файла APK. Музыка играет в фоне с системной карточкой, приходят пуш-уведомления, навигация сделана под телефон — свайпы и шторки.',
    platWeb: '<b>Веб.</b> Работает в браузере без установки; на телефоне добавляется на главный экран и дальше ведёт себя как приложение.',
    offline: 'Если основной сервер долго недоступен, приложение предлагает аварийный чат, чтобы люди всё же могли друг друга дозваться. Это отдельная маленькая служба, а не копия Ponoi: в ней нет ни серверов, ни каналов, ни друзей.',
  },
}

export default {
  slug: 'features',
  title: (lang) => t[lang].title,
  description: (lang) => t[lang].desc,

  body: (ctx, lang) => {
    const s = t[lang]
    const L = (slug) => urlFor(slug, lang)
    const li = (arr) => arr.map((x) => `<li>${x}</li>`).join('\n      ')
    const liB = (arr) => arr.map(([x, k]) => `<li>${x} ${badge(k, lang)}</li>`).join('\n      ')

    const toc = [
      ['messaging', s.msgH], ['communities', s.comH], ['calls', s.callH],
      ['music', s.musH], ['customization', s.custH], ['plugins', s.plugH],
      ['privacy', s.privH], ['platforms', s.platH],
    ]

    return `
<section class="page-head">
  <div class="wrap">
    <p class="eyebrow">${lang === 'en' ? 'Features' : 'Возможности'}</p>
    <h1>${s.h1}</h1>
    <p class="lede">${s.lede}</p>
  </div>
</section>

<section class="wrap">
  <nav class="toc" aria-label="${s.toc}">
    <h2>${s.toc}</h2>
    <ul>${toc.map(([id, name]) => `<li><a href="#${id}">${name}</a></li>`).join('')}</ul>
  </nav>
</section>

<section class="wrap prose" id="messaging">
  <h2 class="mt0">${s.msgH} ${badge('ok', lang)}</h2>
  <p>${s.msgP}</p>
  <ul>
      ${li(s.msgList)}
  </ul>
  <div class="note note-key">${s.e2eeNote}</div>
</section>

<section class="wrap prose" id="communities">
  <h2>${s.comH} ${badge('ok', lang)}</h2>
  <p>${s.comP}</p>
  <ul>
      ${li(s.comList)}
  </ul>
</section>

<section class="wrap prose" id="calls">
  <h2>${s.callH} ${badge('ok', lang)}</h2>
  <p>${s.callP}</p>
  <ul>
      ${li(s.callList)}
  </ul>
  <div class="note note-warn"><p>${s.callNote}</p></div>
</section>

<section class="wrap prose" id="music">
  <h2>${s.musH} ${badge('ok', lang)}</h2>
  <p>${s.musP}</p>
  <p><a href="${L('trackoteka')}">${s.musMore} →</a></p>
</section>

<section class="wrap prose" id="customization">
  <h2>${s.custH} ${badge('ok', lang)}</h2>
  <p>${s.custP}</p>
  <ul>
      ${li(s.custList)}
  </ul>
</section>

<section class="wrap prose" id="plugins">
  <h2>${s.plugH} ${badge('ok', lang)}</h2>
  <p>${s.plugP}</p>
  <p><a href="${L('plugins')}">${s.plugMore} →</a></p>
</section>

<section class="wrap prose" id="privacy">
  <h2>${s.privH}</h2>
  <ul>
      ${liB(s.privList)}
  </ul>
  <div class="note note-warn"><p>${s.privNote}</p></div>
</section>

<section class="wrap prose" id="platforms">
  <h2>${s.platH}</h2>
  <p>${s.platP}</p>
  <ul>
    <li>${s.platWin}</li>
    <li>${s.platAnd}</li>
    <li>${s.platWeb}</li>
  </ul>
  <p>${s.offline}</p>
  <p><a href="${L('download')}">${lang === 'en' ? 'Download Ponoi' : 'Скачать Ponoi'} →</a></p>
</section>
`
  },
}
