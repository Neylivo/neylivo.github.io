import { urlFor, APP_URL, REPO_URL } from '../site.mjs'

// Вопросы и ответы. Каждый ответ — обычный текст в разметке страницы, и та же
// пара «вопрос — ответ» уходит в структурированные данные. Расхождения между
// ними быть не должно: поисковики считают это обманом, и справедливо.

const qa = {
  en: [
    ['What is Ponoi?',
      'Ponoi is a messenger and communication platform. You write to people directly, build servers with channels for a community, call each other with video and screen sharing, listen to music together and extend the app with plugins. It runs on Windows, Android and in a browser.'],
    ['What is Поной?',
      'Поной is the same product, spelled in Cyrillic. Ponoi and Поной are two spellings of one name — one app, one account, one website.'],
    ['Is Ponoi a messenger?',
      'Yes. Messaging is the core of it: direct messages, group conversations, and servers with channels. Calls, music and plugins are built around that, not instead of it.'],
    ['Is Ponoi free?',
      'Yes, and completely. There are no paid tiers, no subscriptions, no in-app purchases and no advertising. There is no payment code in the app at all.'],
    ['Is Ponoi encrypted?',
      'In transit, always: everything between the app and the server goes over HTTPS/TLS. On top of that, one-to-one direct messages can be end-to-end encrypted so the server holds ciphertext it cannot read — that part is a setting, and it is off by default.'],
    ['Is Ponoi end-to-end encrypted?',
      'Partly, and only if you turn it on. End-to-end encryption covers direct messages between two people, their attachments and their calls — three separate switches, all off by default. Group conversations and server channels are not end-to-end encrypted: they are protected by access rules in the database instead. Calling Ponoi “an end-to-end encrypted messenger” without those qualifications would be misleading, so we do not.'],
    ['Is Ponoi anonymous?',
      'No. Registration requires an email address, messages have an author, and servers keep a moderation log. Encryption can hide what you wrote; it does not hide that you wrote, to whom, or when. If you need anonymity, you need a tool built for it.'],
    ['What data does Ponoi collect?',
      'An email address and a password to register, whatever you put in your profile, and the messages and files you send so they can be delivered and shown on your devices. There is no analytics, no crash reporting service and no advertising code. The privacy page lists every kind of data item by item, including which third-party services see your IP address.'],
    ['Who develops Ponoi?',
      'Ponoi is an independent project developed in the open by ponoiai on GitHub. There is no company behind it, no funding and no investors.'],
    ['Where can I download Ponoi?',
      'From this website: the download page links straight to the installer for Windows and the APK for Android, and to the web version. You do not need a GitHub account or any account to download it.'],
    ['Does Ponoi have an Android app?',
      'Yes. It is installed from an APK file downloaded here — Ponoi is not on Google Play. Android will ask you to allow installing apps from that source, which is the normal prompt for any app outside the store. You should not need to disable any system protection.'],
    ['Does Ponoi have a Windows app?',
      'Yes, a normal installed application with a tray icon, background notifications and automatic updates. It installs for the current user and does not require administrator rights.'],
    ['Can I use Ponoi in a browser?',
      'Yes. The web version needs no installation and works in any modern browser. On a phone it can be added to the home screen and then behaves like an installed app.'],
    ['What are Ponoi plugins?',
      'Small programs written in JavaScript that add things to the app: buttons, slash commands, panels, whole windows, games, bots. A plugin runs in an isolated Web Worker and can only do what its declared permissions allow, which you see and accept before installing.'],
    ['What is a .ponoi file?',
      'The format a Ponoi plugin comes in: a single JavaScript file with a header comment describing the plugin’s name, author, version, permissions and the domains it may contact. You can install one from a file, or receive it in a conversation as a card with an Install button.'],
    ['What is Trackoteka?',
      'Trackoteka (Трекотека) is Ponoi’s built-in music system: a shared library of tracks, playlists, a queue, synced lyrics and listening together in a lobby where everyone hears the same thing at the same moment.'],
    ['How is Ponoi different from Discord?',
      'The structure is familiar — servers, channels, roles, voice. The differences are that Ponoi can end-to-end encrypt one-to-one conversations, has no analytics or advertising, is free with no paid tier, and lets you extend the app with your own plugins that run sandboxed in the client. Discord is a large funded product with moderation, scale and reliability that an independent project does not match.'],
    ['How is Ponoi different from Telegram?',
      'Both offer optional end-to-end encryption for one-to-one chats rather than by default. Ponoi is organised around servers and channels rather than channels and groups, is much smaller, and is extensible with client-side plugins. Telegram has enormous reach, its own infrastructure and years of operational maturity; Ponoi has none of that yet.'],
    ['How is Ponoi different from Signal?',
      'Signal is an encrypted messenger first: end-to-end encryption is on by default, for everything, including group chats and calls, using a protocol reviewed by cryptographers for years. Ponoi does not match that and does not claim to — encryption here is optional and covers one-to-one conversations only. What Ponoi offers instead is communities, music and plugins in one app. If your priority is the strongest available message privacy, use Signal.'],
    ['Is Ponoi safe to use?',
      'It is a young, independent project with no external security audit, so the honest answer is: it depends on what you need. For talking to friends, running a community and keeping ordinary conversations away from advertisers, yes. For anything where being read would put you in danger, use software built and audited for that. The security page lists the known weaknesses plainly, including the one about attachments.'],
    ['Is Ponoi open source?',
      'The full source code is public and can be read, checked and built by anyone. It does not currently carry an open source licence, which technically makes it source-available rather than open source — a licence is something the author still needs to choose.'],
  ],

  ru: [
    ['Что такое Поной?',
      'Поной (Ponoi) — мессенджер и платформа для общения. В нём пишут людям напрямую, собирают серверы с каналами под сообщество, созваниваются с видео и демонстрацией экрана, слушают музыку вместе и расширяют приложение плагинами. Работает на Windows, Android и в браузере.'],
    ['Что такое Ponoi?',
      'Это то же самое, только латиницей. Ponoi и Поной — два написания одного названия: одно приложение, одна учётная запись, один сайт.'],
    ['Поной — это мессенджер?',
      'Да. Переписка — его основа: личные сообщения, групповые беседы и серверы с каналами. Звонки, музыка и плагины построены вокруг этого, а не вместо.'],
    ['Ponoi бесплатный?',
      'Да, полностью. Нет платных уровней, подписок, покупок внутри и рекламы. Кода приёма платежей в приложении нет вовсе.'],
    ['Переписка в Ponoi шифруется?',
      'В канале связи — всегда: всё между приложением и сервером идёт по HTTPS/TLS. Сверх того личную переписку двух людей можно защитить сквозным шифрованием, и тогда на сервере лежит шифротекст, который он прочитать не может; это настройка, и по умолчанию она выключена.'],
    ['В Ponoi есть сквозное шифрование?',
      'Частично и только если его включить. Сквозное шифрование действует на личную переписку двух людей, её вложения и звонки — три отдельных переключателя, все по умолчанию выключены. Групповые беседы и каналы серверов сквозным шифрованием не защищены: их защищают правила доступа в базе. Называть Ponoi «мессенджером со сквозным шифрованием» без этих оговорок было бы враньём, поэтому мы так не делаем.'],
    ['Ponoi анонимный?',
      'Нет. Для регистрации нужна почта, у сообщений есть автор, на серверах ведётся журнал действий модерации. Шифрование скрывает, что вы написали; оно не скрывает, что вы писали, кому и когда. Если нужна анонимность, нужен инструмент, сделанный ради неё.'],
    ['Какие данные собирает Ponoi?',
      'Почту и пароль для регистрации, то, что вы сами напишете в профиле, и отправленные сообщения и файлы — чтобы их доставить и показать на ваших устройствах. Аналитики, службы сбора падений и рекламного кода нет. На странице приватности всё перечислено по пунктам, включая то, какие сторонние службы видят ваш IP-адрес.'],
    ['Кто разрабатывает Ponoi?',
      'Ponoi — независимый проект, который разрабатывается открыто; автор — ponoiai на GitHub. За ним нет компании, финансирования и инвесторов.'],
    ['Где скачать Поной?',
      'На этом сайте: страница загрузки ведёт прямо на установщик для Windows и APK для Android, а также на веб-версию. Учётная запись GitHub — или какая-либо ещё — для скачивания не нужна.'],
    ['Есть ли приложение Ponoi для Android?',
      'Да. Оно ставится из файла APK, скачанного здесь, — в Google Play приложения нет. Android попросит разрешить установку из этого источника: обычный запрос для любого приложения не из магазина. Отключать системную защиту для этого не требуется.'],
    ['Есть ли приложение Ponoi для Windows?',
      'Да, обычная установленная программа со значком в трее, уведомлениями в фоне и автоматическими обновлениями. Ставится для текущего пользователя и прав администратора не требует.'],
    ['Можно ли пользоваться Ponoi в браузере?',
      'Да. Веб-версия не требует установки и работает в любом современном браузере. На телефоне её можно добавить на главный экран, и дальше она ведёт себя как установленное приложение.'],
    ['Что такое плагины Ponoi?',
      'Небольшие программы на JavaScript, которые добавляют в приложение своё: кнопки, команды, панели, целые окна, игры, ботов. Плагин работает в отдельном Web Worker и может только то, на что даны разрешения, — их видно и надо принять до установки.'],
    ['Что такое файл .ponoi?',
      'Это формат, в котором приходит плагин Ponoi: один файл на JavaScript с комментарием в начале, где указаны название, автор, версия, разрешения и домены, к которым плагину можно обращаться. Такой файл можно поставить с диска или получить в беседе карточкой с кнопкой «Установить».'],
    ['Что такое Трекотека?',
      'Трекотека — встроенная музыкальная система Ponoi: общая библиотека треков, плейлисты, очередь, синхронный текст песни и совместное прослушивание в лобби, где все слышат одно и то же в один момент.'],
    ['Чем Ponoi отличается от Discord?',
      'Устройство знакомое — серверы, каналы, роли, голос. Отличия в том, что Ponoi умеет сквозное шифрование переписки один на один, в нём нет аналитики и рекламы, он бесплатный без платного уровня, и приложение расширяется своими плагинами, которые работают в песочнице прямо у вас. Discord — большой профинансированный продукт с модерацией, масштабом и надёжностью, которых у независимого проекта нет.'],
    ['Чем Ponoi отличается от Telegram?',
      'В обоих сквозное шифрование для переписки один на один — по выбору, а не по умолчанию. Ponoi построен вокруг серверов и каналов, а не каналов и групп, он гораздо меньше и расширяется плагинами на стороне клиента. У Telegram огромный охват, своя инфраструктура и годы работы под нагрузкой; у Ponoi ничего этого пока нет.'],
    ['Чем Ponoi отличается от Signal?',
      'Signal прежде всего шифрованный мессенджер: сквозное шифрование там включено по умолчанию и на всё, включая групповые чаты и звонки, по протоколу, который криптографы разбирают годами. Ponoi этого уровня не достигает и не заявляет: шифрование здесь по выбору и только для переписки один на один. Взамен Ponoi даёт сообщества, музыку и плагины в одном приложении. Если для вас важнее всего защищённость переписки — пользуйтесь Signal.'],
    ['Безопасно ли пользоваться Ponoi?',
      'Это молодой независимый проект без внешнего аудита, поэтому честный ответ — смотря для чего. Общаться с друзьями, вести сообщество и держать обычные разговоры подальше от рекламодателей — да. Для всего, где прочтение переписки означало бы опасность, нужна программа, сделанная и проверенная ради этого. На странице безопасности слабые места названы прямо, включая то, что связано с вложениями.'],
    ['Ponoi — открытый исходный код?',
      'Исходный код полностью открыт: его можно читать, проверять и собирать. При этом лицензии открытого кода на нём сейчас нет, то есть формально это «исходник доступен», а не «открытый код», — лицензию автору ещё предстоит выбрать.'],
  ],
}

const t = {
  en: {
    title: 'Ponoi FAQ — Questions About Ponoi Messenger',
    desc: 'Answers about Ponoi (Поной): what it is, whether it is free, whether it is encrypted or anonymous, where to download it, what plugins and Trackoteka are, and how it compares to Discord, Telegram and Signal.',
    h1: 'Questions and answers',
    lede: 'Short answers, including to the questions where the honest answer is “no”.',
    more: 'If your question is not here, the <a href="/about/">about</a>, <a href="/security/">security</a> and <a href="/privacy/">privacy</a> pages go into much more detail.',
  },
  ru: {
    title: 'Вопросы о Поное — FAQ мессенджера Ponoi',
    desc: 'Ответы о Ponoi (Поной): что это, бесплатный ли, шифруется ли переписка, анонимен ли он, где скачать, что такое плагины и Трекотека, чем отличается от Discord, Telegram и Signal.',
    h1: 'Вопросы и ответы',
    lede: 'Короткие ответы, включая те вопросы, где честный ответ — «нет».',
    more: 'Если вашего вопроса здесь нет, гораздо подробнее написано на страницах <a href="/ru/about/">о проекте</a>, <a href="/ru/security/">безопасность</a> и <a href="/ru/privacy/">приватность</a>.',
  },
}

const slugify = (q, i) => 'q' + (i + 1)

export default {
  slug: 'faq',
  title: (lang) => t[lang].title,
  description: (lang) => t[lang].desc,

  // FAQPage допустим только когда на самой странице действительно есть эти
  // вопросы и ответы полным текстом — здесь так и есть, они берутся из одного
  // и того же массива.
  jsonld: (ctx, lang) => JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    inLanguage: lang,
    mainEntity: qa[lang].map(([q, a]) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  }),

  body: (ctx, lang) => {
    const s = t[lang]
    return `
<section class="page-head">
  <div class="wrap">
    <p class="eyebrow">FAQ</p>
    <h1>${s.h1}</h1>
    <p class="lede">${s.lede}</p>
  </div>
</section>

<section class="wrap">
  <div class="qa">
    ${qa[lang].map(([q, a], i) => `<h2 id="${slugify(q, i)}">${q}</h2>\n    <p>${a}</p>`).join('\n\n    ')}
    <p style="margin-top:2em">${s.more}</p>
    <p><a href="${urlFor('download', lang)}">${lang === 'en' ? 'Download Ponoi' : 'Скачать Ponoi'} →</a>
       &nbsp;·&nbsp; <a href="${APP_URL}">${lang === 'en' ? 'Open the web app' : 'Открыть в браузере'} →</a>
       &nbsp;·&nbsp; <a href="${REPO_URL}" rel="noopener">${lang === 'en' ? 'Source code' : 'Исходный код'} →</a></p>
  </div>
</section>
`
  },
}
