import { APP_URL, urlFor, REPO_URL, ORIGIN } from '../site.mjs'

const t = {
  en: {
    title: 'What is NeyLivo? — About NeyLivo Messenger',
    desc: 'NeyLivo (Нейливо) is a privacy-focused extensible messaging platform for private conversations, communities, calls, music and user-created plugins. Windows, Android and web.',
    h1: 'What is NeyLivo?',
    lede: '<b>NeyLivo (Нейливо) is a privacy-focused extensible messaging platform for private conversations, communities, calls, music and user-created plugins.</b>',

    p1: 'In plain terms: NeyLivo is an app you talk to people in. You can write to someone directly, create a server with channels where a group of people gather, call each other with video and screen sharing, listen to music in the same room, and reshape the app itself — themes, fonts, layout, and plugins you or someone else wrote.',
    p2: 'It runs on Windows as an installed application, on Android as an app you install from a file, and in any modern browser. One account works across all three.',

    nameH: 'NeyLivo and Нейливо',
    nameP: '<b>NeyLivo</b> and <b>Нейливо</b> are the same product — the Latin and Cyrillic spellings of one name. The interface exists in both English and Russian. Searching for either name should lead here; this site is the official source of information about the project.',

    factsH: 'The short version',
    fName: 'Name', fAlt: 'Alternative name', fCat: 'Category', fType: 'Type',
    fPlat: 'Platforms', fDev: 'Developer', fPrice: 'Price', fSite: 'Official website',
    fApp: 'Web app', fDocs: 'Documentation', fDl: 'Download', fSec: 'Security',
    fPriv: 'Privacy', fSrc: 'Source code', fLang: 'Interface languages',
    vType: 'Messaging and communication platform',
    vCat: 'Messaging software',
    vPlat: 'Windows, Android, Web',
    vDev: 'NeyLivo, an independent project developed by NeyLivo',
    vPrice: 'Free. No paid tiers, no advertising, no in-app purchases.',
    vLang: 'English, Russian',

    doesH: 'What NeyLivo does',
    doesP: 'Six areas, all of them shipped and working today. The <a href="/features/">features page</a> goes into each in detail.',
    d1: '<b>Messaging.</b> Direct messages with one person or a group, replies, reactions, message editing, pins, threads, file attachments, GIFs and custom emoji.',
    d2: '<b>Communities.</b> Servers with text, voice and forum channels; roles with granular permissions; invite codes; moderation tools with an audit log; webhooks and bots.',
    d3: '<b>Calls.</b> Voice and video, screen sharing with sound, noise suppression, push-to-talk, per-person volume, and an overlay that stays visible over a game.',
    d4: '<b>Music.</b> Trackoteka — a shared library of tracks inside the app, with playlists, a queue, synced lyrics and listening together in one room.',
    d5: '<b>Customization.</b> Light and dark themes with presets, custom fonts, chat backgrounds, profile colours and banners.',
    d6: '<b>Plugins.</b> A plugin is a single <code>.neylivo</code> file of JavaScript that runs sandboxed and can only do what its declared permissions allow. There is a built-in editor and a catalogue.',

    privH: 'What “privacy-focused” means here',
    privP: 'It means specific properties, not a slogan. Concretely:',
    pr1: 'Direct messages between two people can be end-to-end encrypted, so the server stores ciphertext it cannot read. This is a setting you turn on; it is not the default, and it does not cover group chats or server channels.',
    pr2: 'There is no analytics system, no crash reporting service and no advertising code in the app at all.',
    pr3: 'Plugins are isolated by the browser itself and cannot read your session, your messages or the page.',
    pr4: 'The source code is public, so all of the above can be checked rather than believed.',
    privMore: 'The <a href="/security/">security page</a> describes the architecture in detail, including its limits. The <a href="/privacy/">privacy page</a> lists every kind of data the app handles.',

    devH: 'Who makes NeyLivo',
    devP: 'NeyLivo is an independent project, not a company. It is developed in the open at <a href="' + REPO_URL + '" rel="noopener">github.com/Neylivo/neylivo</a>. There is no legal entity behind it, no funding round, and no investors — which is also why there is no code-signing certificate and no Google Play listing.',
    devP2: 'The infrastructure it uses is named on the <a href="/privacy/">privacy page</a>: Supabase for the database, accounts and storage, and LiveKit for voice and video.',

    histH: 'Status',
    histP: 'NeyLivo is under active development, and releases are frequent. Every version is listed with what changed in it on the <a href="/changelog/">changelog page</a>. Parts of the app that have not been verified in real use are marked as experimental rather than presented as finished — see <a href="/transparency/">transparency</a>.',

    linksH: 'Official links',
  },

  ru: {
    title: 'Что такое Нейливо — о мессенджере NeyLivo',
    desc: 'NeyLivo (Нейливо) — приватный расширяемый мессенджер для личного общения, сообществ, звонков, музыки и пользовательских плагинов. Windows, Android и веб.',
    h1: 'Что такое Нейливо?',
    lede: '<b>NeyLivo (Нейливо) — приватный расширяемый мессенджер для личного общения, сообществ, звонков, музыки и пользовательских плагинов.</b>',

    p1: 'Если совсем просто: NeyLivo — приложение, в котором общаются. Можно написать человеку напрямую, собрать сервер с каналами, где сидит компания, созвониться с видео и демонстрацией экрана, послушать музыку в одной комнате и переделать само приложение — темы, шрифты, расположение и плагины, свои или чужие.',
    p2: 'Он работает на Windows как установленная программа, на Android как приложение из файла и в любом современном браузере. Учётная запись одна на всё.',

    nameH: 'NeyLivo и Нейливо',
    nameP: '<b>NeyLivo</b> и <b>Нейливо</b> — один и тот же продукт, написание латиницей и кириллицей. Интерфейс есть и на русском, и на английском. По любому из двух написаний человек должен попадать сюда: этот сайт — официальный источник сведений о проекте.',

    factsH: 'Коротко',
    fName: 'Название', fAlt: 'Другое написание', fCat: 'Категория', fType: 'Тип',
    fPlat: 'Платформы', fDev: 'Разработчик', fPrice: 'Цена', fSite: 'Официальный сайт',
    fApp: 'Веб-версия', fDocs: 'Документация', fDl: 'Скачать', fSec: 'Безопасность',
    fPriv: 'Приватность', fSrc: 'Исходный код', fLang: 'Языки интерфейса',
    vType: 'Мессенджер и платформа для общения',
    vCat: 'Программа для обмена сообщениями',
    vPlat: 'Windows, Android, веб',
    vDev: 'NeyLivo — независимый проект NeyLivo',
    vPrice: 'Бесплатно. Без платных уровней, без рекламы, без покупок внутри.',
    vLang: 'русский, английский',

    doesH: 'Что NeyLivo делает',
    doesP: 'Шесть областей, и все они уже работают. Подробно о каждой — на <a href="/ru/features/">странице возможностей</a>.',
    d1: '<b>Переписка.</b> Личные сообщения с человеком или группой, ответы, реакции, правка сообщений, закрепление, обсуждения, вложения, GIF и свои эмодзи.',
    d2: '<b>Сообщества.</b> Серверы с текстовыми, голосовыми и форумными каналами; роли с точными правами; коды приглашений; средства модерации с журналом действий; вебхуки и боты.',
    d3: '<b>Звонки.</b> Голос и видео, демонстрация экрана со звуком, шумоподавление, рация, громкость каждого участника и накладка, которая видна поверх игры.',
    d4: '<b>Музыка.</b> Трекотека — общая библиотека треков внутри приложения, с плейлистами, очередью, синхронным текстом песни и совместным прослушиванием.',
    d5: '<b>Персонализация.</b> Светлая и тёмная темы с наборами, свои шрифты, фоны чата, цвета и обложки профиля.',
    d6: '<b>Плагины.</b> Плагин — один файл <code>.neylivo</code> с кодом на JavaScript, который работает в песочнице и может только то, на что даны разрешения. Есть встроенный редактор и каталог.',

    privH: 'Что здесь значит «приватный»',
    privP: 'Это конкретные свойства, а не лозунг. По пунктам:',
    pr1: 'Переписку двух людей можно зашифровать сквозным шифрованием — тогда на сервере лежит шифротекст, который он прочитать не может. Это переключатель, по умолчанию он выключен, и на групповые чаты и каналы серверов он не распространяется.',
    pr2: 'В приложении нет ни системы аналитики, ни службы сбора падений, ни рекламного кода — вообще.',
    pr3: 'Плагины изолирует сам браузер: до вашей сессии, сообщений и страницы приложения им не добраться.',
    pr4: 'Исходный код открыт, поэтому всё перечисленное можно проверить, а не принимать на слово.',
    privMore: 'На <a href="/ru/security/">странице безопасности</a> устройство разобрано подробно, вместе с его пределами. На <a href="/ru/privacy/">странице приватности</a> перечислены все виды данных, с которыми работает приложение.',

    devH: 'Кто делает NeyLivo',
    devP: 'NeyLivo — независимый проект, а не компания. Он разрабатывается открыто: <a href="' + REPO_URL + '" rel="noopener">github.com/Neylivo/neylivo</a>. За ним нет юридического лица, раунда инвестиций и инвесторов — отсюда же отсутствие сертификата подписи кода и страницы в Google Play.',
    devP2: 'Инфраструктура, на которой он работает, названа на <a href="/ru/privacy/">странице приватности</a>: Supabase для базы, учётных записей и хранилища, LiveKit для голоса и видео.',

    histH: 'Состояние',
    histP: 'NeyLivo активно разрабатывается, выпуски выходят часто. Каждая версия и то, что в ней изменилось, перечислены на <a href="/ru/changelog/">странице «Что нового»</a>. То, что не проверено в живой работе, помечено как экспериментальное, а не выдаётся за готовое, — см. <a href="/ru/transparency/">прозрачность</a>.',

    linksH: 'Официальные адреса',
  },
}

export default {
  slug: 'about',
  title: (lang) => t[lang].title,
  description: (lang) => t[lang].desc,

  jsonld: (ctx, lang) => JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'NeyLivo',
    alternateName: ['Нейливо', 'NeyLivo Messenger', 'NeyLivo Messenger'],
    applicationCategory: 'CommunicationApplication',
    operatingSystem: 'Windows, Android, Web',
    softwareVersion: ctx.release.version,
    url: ORIGIN + '/',
    sameAs: [REPO_URL],
    author: { '@type': 'Person', name: 'NeyLivo', url: 'https://github.com/Neylivo' },
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    inLanguage: ['en', 'ru'],
    description: lang === 'en'
      ? 'NeyLivo (Нейливо) is a privacy-focused extensible messaging platform for private conversations, communities, calls, music and user-created plugins.'
      : 'NeyLivo (Нейливо) — приватный расширяемый мессенджер для личного общения, сообществ, звонков, музыки и пользовательских плагинов.',
  }),

  body: (ctx, lang) => {
    const s = t[lang]
    const L = (slug) => urlFor(slug, lang)

    return `
<section class="page-head">
  <div class="wrap">
    <p class="eyebrow">NeyLivo · Нейливо</p>
    <h1>${s.h1}</h1>
    <p class="lede">${s.lede}</p>
  </div>
</section>

<section class="wrap prose">
  <p>${s.p1}</p>
  <p>${s.p2}</p>

  <h2>${s.nameH}</h2>
  <p>${s.nameP}</p>
</section>

<section class="band band-alt">
  <div class="wrap">
    <h2 class="mt0">${s.factsH}</h2>
    <dl class="spec">
      <div><dt>${s.fName}</dt><dd>NeyLivo</dd></div>
      <div><dt>${s.fAlt}</dt><dd>Нейливо</dd></div>
      <div><dt>${s.fType}</dt><dd>${s.vType}</dd></div>
      <div><dt>${s.fCat}</dt><dd>${s.vCat}</dd></div>
      <div><dt>${s.fPlat}</dt><dd>${s.vPlat}</dd></div>
      <div><dt>${s.fLang}</dt><dd>${s.vLang}</dd></div>
      <div><dt>${s.fDev}</dt><dd>${s.vDev}</dd></div>
      <div><dt>${s.fPrice}</dt><dd>${s.vPrice}</dd></div>
      <div><dt>${s.fSite}</dt><dd><a href="${L('')}">${ORIGIN}/</a></dd></div>
      <div><dt>${s.fApp}</dt><dd><a href="${APP_URL}">${APP_URL}</a></dd></div>
      <div><dt>${s.fDl}</dt><dd><a href="${L('download')}">${ORIGIN}${urlFor('download', 'en')}</a></dd></div>
      <div><dt>${s.fDocs}</dt><dd><a href="${L('docs')}">${ORIGIN}${urlFor('docs', 'en')}</a></dd></div>
      <div><dt>${s.fSec}</dt><dd><a href="${L('security')}">${ORIGIN}${urlFor('security', 'en')}</a></dd></div>
      <div><dt>${s.fPriv}</dt><dd><a href="${L('privacy')}">${ORIGIN}${urlFor('privacy', 'en')}</a></dd></div>
      <div><dt>${s.fSrc}</dt><dd><a href="${REPO_URL}" rel="noopener">${REPO_URL}</a></dd></div>
    </dl>
  </div>
</section>

<section class="band">
  <div class="wrap prose">
    <h2 class="mt0">${s.doesH}</h2>
    <p>${s.doesP}</p>
    <ul>
      <li>${s.d1}</li>
      <li>${s.d2}</li>
      <li>${s.d3}</li>
      <li>${s.d4}</li>
      <li>${s.d5}</li>
      <li>${s.d6}</li>
    </ul>

    <h2>${s.privH}</h2>
    <p>${s.privP}</p>
    <ul>
      <li>${s.pr1}</li>
      <li>${s.pr2}</li>
      <li>${s.pr3}</li>
      <li>${s.pr4}</li>
    </ul>
    <p>${s.privMore}</p>

    <h2>${s.devH}</h2>
    <p>${s.devP}</p>
    <p>${s.devP2}</p>

    <h2>${s.histH}</h2>
    <p>${s.histP}</p>
  </div>
</section>
`
  },
}
