import { APP_URL, urlFor } from '../site.mjs'
import { mark } from '../layout.mjs'
import { sizeMB } from '../release.mjs'

const t = {
  en: {
    title: 'NeyLivo — Private Extensible Messenger',
    desc: 'NeyLivo is a privacy-focused extensible messenger with private conversations, communities, calls, Trackoteka and a JavaScript plugin platform for Windows, Android and the web.',
    tagline: 'Private. Extensible. Yours.',
    lede: 'NeyLivo is a privacy-focused extensible messenger for conversations, communities, calls, music and powerful customization.',
    dl: 'Download NeyLivo',
    dlWin: 'Download for Windows',
    dlAnd: 'Download for Android',
    open: 'Open Web App',
    plat: 'Windows · Android · Web',
    other: 'Other platforms',
    shotCap: 'A server with channels, a conversation and the member list — NeyLivo on Windows.',
    shotLight: 'The same server in the light theme.',
    shotPhone: 'The same server on a phone.',
    shotsH: 'This is what it looks like',
    freeNote: 'Free. No ads, no trackers, no account tiers.',

    whatH: 'What is NeyLivo?',
    whatP: '<b>NeyLivo (Нейливо) is a messenger and communication platform.</b> You write to people directly, build servers with channels for your community, call each other with video and screen sharing, listen to music together, and change almost everything about how the app looks and works — including writing your own plugins for it.',
    whatP2: 'It runs on Windows, on Android and in a browser, with the same account everywhere. Two names, one product: <b>NeyLivo</b> in Latin script and <b>Нейливо</b> in Cyrillic.',
    whatMore: 'Read the full description',

    fH: 'What it does',
    fMsg: 'Messaging',
    fMsgP: 'Direct messages and group chats, replies, reactions, edits, pinned messages, threads, attachments, GIFs and custom emoji.',
    fCom: 'Communities',
    fComP: 'Servers with text, voice and forum channels, roles with granular permissions, invites, moderation tools, an audit log and webhooks.',
    fCall: 'Calls',
    fCallP: 'Voice and video calls, screen sharing with audio, noise suppression, push-to-talk, per-participant volume and an overlay that stays on top of games.',
    fCust: 'Customization',
    fCustP: 'Light and dark themes with presets, your own fonts, chat backgrounds, profile colours and banners. It is meant to be rearranged.',
    fPlug: 'Plugins',
    fPlugP: 'A plugin is one <code>.neylivo</code> file. It runs in an isolated Web Worker and can only do what its declared permissions allow.',
    fMus: 'Trackoteka',
    fMusP: 'A shared music library inside NeyLivo: upload tracks or add links, build playlists, follow synced lyrics and listen together in one room.',
    fAll: 'See all features',

    privH: 'Privacy you can check, not just read about',
    privP: 'Claims about security are easy to write and hard to verify. NeyLivo does it the other way round: the source code is public, and every claim on this site points at the part of it that backs the claim up.',
    p1H: 'End-to-end encrypted direct messages',
    p1P: 'One-to-one conversations can be encrypted device to device with ECDH P-256, HKDF-SHA256 and AES-256-GCM. Keys never leave your device in the clear, message length is hidden by padding, and fingerprints let you verify the other person.',
    p1Note: 'This is a setting, and it is off until you turn it on. Group chats and server channels are not end-to-end encrypted.',
    p2H: 'No analytics, no crash reporting, no ad trackers',
    p2P: 'There is no analytics SDK in the app. Nothing counts your sessions, no third party is told what you clicked, and errors stay on your device instead of being uploaded somewhere.',
    p3H: 'Plugins are contained by the browser, not by promises',
    p3P: 'Plugin code runs in a Web Worker with no DOM, no cookies and no access to your session. Plugin pages run in a cross-origin sandboxed frame. Network access is limited to the domains the plugin declared up front.',
    privCta: 'Read the security page',
    privCta2: 'Read the privacy page',

    hnH: 'What NeyLivo is not',
    hnP: 'A product page is where projects tend to exaggerate. This is the list we keep ourselves honest with:',
    hn1: 'Not fully end-to-end encrypted. Encryption covers one-to-one direct messages and is a setting you switch on. Server channels and group chats are protected by access rules on the server, not by end-to-end encryption.',
    hn2: 'Not anonymous. Registration needs an email address, messages have an author, and servers keep a moderation log.',
    hn3: 'Not audited. No external security audit has been done. Nobody has certified anything.',
    hn4: 'Not finished. NeyLivo is under active development, and some parts are marked experimental exactly because they have not been proven in the field yet.',
    hnCta: 'What we know is imperfect',

    dlH: 'Get NeyLivo',
    dlP: 'Downloads come straight from this site. Pick your platform and the file starts downloading — you do not need a GitHub account or any account at all to get the app.',
    ver: 'Version',
  },

  ru: {
    title: 'Нейливо — приватный расширяемый мессенджер',
    desc: 'NeyLivo (Нейливо) — приватный расширяемый мессенджер: личные сообщения, сообщества, звонки, Трекотека, персонализация и плагины. Windows, Android и веб.',
    tagline: 'Приватный. Расширяемый. Твой.',
    lede: 'NeyLivo — приватный расширяемый мессенджер для общения, сообществ, звонков, музыки и глубокой персонализации.',
    dl: 'Скачать NeyLivo',
    dlWin: 'Скачать для Windows',
    dlAnd: 'Скачать для Android',
    open: 'Открыть в браузере',
    plat: 'Windows · Android · Веб',
    other: 'Другие платформы',
    shotCap: 'Сервер с каналами, переписка и список участников — NeyLivo на Windows.',
    shotLight: 'Тот же сервер на светлой теме.',
    shotPhone: 'Тот же сервер на телефоне.',
    shotsH: 'Как это выглядит',
    freeNote: 'Бесплатно. Без рекламы, без слежки, без платных уровней.',

    whatH: 'Что такое Нейливо?',
    whatP: '<b>NeyLivo (Нейливо) — мессенджер и платформа для общения.</b> В нём пишут людям напрямую, собирают серверы с каналами под своё сообщество, созваниваются с видео и демонстрацией экрана, слушают музыку вместе и меняют почти всё в том, как приложение выглядит и работает, — вплоть до собственных плагинов к нему.',
    whatP2: 'Он работает на Windows, на Android и в браузере, с одной и той же учётной записью везде. Два написания, один продукт: <b>NeyLivo</b> латиницей и <b>Нейливо</b> кириллицей.',
    whatMore: 'Подробное описание',

    fH: 'Что он умеет',
    fMsg: 'Переписка',
    fMsgP: 'Личные сообщения и групповые чаты, ответы, реакции, правка, закреплённые сообщения, обсуждения, вложения, GIF и свои эмодзи.',
    fCom: 'Сообщества',
    fComP: 'Серверы с текстовыми, голосовыми и форумными каналами, роли с точными правами, приглашения, средства модерации, журнал действий и вебхуки.',
    fCall: 'Звонки',
    fCallP: 'Голос и видео, демонстрация экрана со звуком, шумоподавление, рация, громкость каждого участника и накладка поверх игры.',
    fCust: 'Персонализация',
    fCustP: 'Светлая и тёмная темы с наборами, свои шрифты, фоны чата, цвета и обложки профиля. Приложение рассчитано на то, что его переделают под себя.',
    fPlug: 'Плагины',
    fPlugP: 'Плагин — это один файл <code>.neylivo</code>. Он работает в отдельном Web Worker и может ровно то, на что человек дал разрешение.',
    fMus: 'Трекотека',
    fMusP: 'Общая музыкальная библиотека внутри NeyLivo: загружай треки или добавляй ссылки, собирай плейлисты, следи за текстом по строчкам и слушай вместе.',
    fAll: 'Все возможности',

    privH: 'Приватность, которую можно проверить',
    privP: 'Написать про безопасность легко, проверить написанное трудно. В NeyLivo сделано наоборот: исходный код открыт, и каждое утверждение на этом сайте указывает на ту часть кода, которая за него отвечает.',
    p1H: 'Сквозное шифрование личной переписки',
    p1P: 'Переписку один на один можно шифровать от устройства до устройства: ECDH P-256, HKDF-SHA256, AES-256-GCM. Приватный ключ не покидает устройство в открытом виде, длина сообщения скрыта дополнением, а отпечаток ключа можно сверить голосом.',
    p1Note: 'Это переключатель, и по умолчанию он выключен. Групповые чаты и каналы серверов сквозным шифрованием не защищены.',
    p2H: 'Ни аналитики, ни сбора падений, ни рекламных счётчиков',
    p2P: 'В приложении нет ни одной системы аналитики. Никто не считает ваши сеансы, никому не сообщается, куда вы нажали, а ошибки остаются на вашем устройстве, а не уезжают на чужой сервер.',
    p3H: 'Плагины держит браузер, а не обещания',
    p3P: 'Код плагина работает в Web Worker: без DOM, без куки, без доступа к вашей сессии. Страницы плагинов живут в песочнице с чужим происхождением. В сеть плагин ходит только на домены, которые объявил заранее.',
    privCta: 'Страница безопасности',
    privCta2: 'Страница приватности',

    hnH: 'Чем NeyLivo не является',
    hnP: 'Главная страница — то место, где проекты обычно преувеличивают. Вот список, которым мы удерживаем себя от этого:',
    hn1: 'Это не полностью сквозное шифрование. Оно есть в личной переписке один на один и включается вручную. Каналы серверов и групповые чаты защищены правилами доступа на сервере, а не сквозным шифрованием.',
    hn2: 'Это не анонимность. Для регистрации нужна почта, у сообщений есть автор, а на серверах ведётся журнал действий модерации.',
    hn3: 'Внешнего аудита не было. Никто ничего не сертифицировал.',
    hn4: 'Это не законченный продукт. NeyLivo активно разрабатывается, и часть возможностей помечена как экспериментальная именно потому, что ещё не проверена в жизни.',
    hnCta: 'Что мы знаем о своих слабых местах',

    dlH: 'Забрать NeyLivo',
    dlP: 'Скачивание идёт прямо с этого сайта. Выбираешь платформу — начинается загрузка файла. Ни учётной записи GitHub, ни вообще какой-либо учётной записи для этого не нужно.',
    ver: 'Версия',
  },
}

function icon(name) {
  const paths = {
    msg: '<path d="M4 5h16v12H9l-5 4z"/>',
    com: '<path d="M4 6h16M4 12h16M4 18h9"/><circle cx="19" cy="18" r="2"/>',
    call: '<path d="M4 6h11v9H4z"/><path d="M15 10l5-3v9l-5-3z"/>',
    cust: '<circle cx="12" cy="12" r="8"/><path d="M12 4v16M4 12h16"/>',
    plug: '<path d="M7 4v6M17 4v6"/><path d="M5 10h14v3a7 7 0 0 1-14 0z"/><path d="M12 20v-3"/>',
    mus: '<circle cx="7" cy="18" r="3"/><path d="M10 18V5l10-2v13"/><circle cx="17" cy="16" r="3"/>',
  }
  return `<svg class="ic" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name]}</svg>`
}

export default {
  slug: '',
  title: (lang) => t[lang].title,
  description: (lang) => t[lang].desc,

  jsonld: (ctx, lang) => JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': 'https://neylivo.github.io/#website',
        name: 'NeyLivo',
        alternateName: 'Нейливо',
        url: 'https://neylivo.github.io/',
        inLanguage: ['en', 'ru'],
      },
      {
        '@type': 'SoftwareApplication',
        '@id': 'https://neylivo.github.io/#app',
        name: 'NeyLivo',
        alternateName: ['Нейливо', 'NeyLivo Messenger', 'мессенджер Нейливо'],
        applicationCategory: 'CommunicationApplication',
        applicationSubCategory: 'Messaging',
        operatingSystem: 'Windows, Android, Web',
        softwareVersion: ctx.release.version,
        url: 'https://neylivo.github.io/',
        downloadUrl: 'https://neylivo.github.io/download/',
        installUrl: 'https://neylivo.github.io/download/',
        softwareHelp: 'https://neylivo.github.io/docs/',
        releaseNotes: 'https://neylivo.github.io/changelog/',
        inLanguage: ['en', 'ru'],
        author: { '@type': 'Person', name: 'NeyLivo', url: 'https://github.com/Neylivo' },
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
        description: lang === 'en'
          ? 'NeyLivo is a privacy-focused extensible messaging platform for conversations, communities, calls, music and plugins.'
          : 'NeyLivo (Нейливо) — приватный расширяемый мессенджер для общения, сообществ, звонков, музыки и плагинов.',
        featureList: lang === 'en'
          ? ['Direct messages', 'Servers and channels', 'Voice and video calls', 'Screen sharing',
             'End-to-end encrypted direct messages (optional)', 'JavaScript plugins', 'Trackoteka music library', 'Themes and customization']
          : ['Личные сообщения', 'Серверы и каналы', 'Голосовые и видеозвонки', 'Демонстрация экрана',
             'Сквозное шифрование личной переписки (по выбору)', 'Плагины на JavaScript', 'Музыкальная Трекотека', 'Темы и персонализация'],
      },
    ],
  }),

  body: (ctx, lang) => {
    const s = t[lang]
    const r = ctx.release
    const win = r.windows
    const and = r.android

    const dlBtn = (a, label) => a
      ? `<a class="btn btn-solid btn-big" href="${a.url}" data-dl>${label}<span class="sub">${sizeMB(a.bytes) ?? ''}</span></a>`
      : ''

    return `
<section class="hero">
  <div class="wrap hero-grid">
    <div>
      <h1 class="wordmark">NEYLIVO</h1>
      <p class="tagline">${s.tagline}</p>
      <p class="lede">${s.lede}</p>
      <div class="cta-row">
        <a class="btn btn-solid btn-big" href="${urlFor('download', lang)}"
           data-os-cta
           data-win="${win?.url ?? ''}" data-win-label="${s.dlWin}"
           data-and="${and?.url ?? ''}" data-and-label="${s.dlAnd}">${s.dl}</a>
        <a class="btn btn-quiet btn-big" href="${APP_URL}">${s.open}</a>
      </div>
      <p class="platline" style="margin-bottom:14px"><a href="${urlFor('download', lang)}">${s.other} →</a></p>
      <p class="platline"><b>${s.plat}</b> · ${s.ver} ${r.version} · ${s.freeNote}</p>
    </div>
    <figure class="hero-shot">
      <div class="win">
        <div class="win-bar"><span></span><span></span><span></span></div>
        <img src="/assets/shots/server-dark.png" width="1440" height="900"
             alt="${s.shotCap}" fetchpriority="high" decoding="async">
      </div>
      <figcaption>${s.shotCap}</figcaption>
    </figure>
  </div>
</section>

<section class="band band-alt">
  <div class="wrap">
    <div class="prose">
      <p class="eyebrow">NeyLivo · Нейливо</p>
      <h2 class="mt0">${s.whatH}</h2>
      <p class="lede">${s.whatP}</p>
      <p>${s.whatP2}</p>
      <p><a href="${urlFor('about', lang)}">${s.whatMore} →</a></p>
    </div>
  </div>
</section>

<section class="band">
  <div class="wrap">
    <h2 class="mt0">${s.shotsH}</h2>
    <div class="shots">
      <figure class="shot-card">
        <div class="win light">
          <div class="win-bar"><span></span><span></span><span></span></div>
          <img src="/assets/shots/server-light.png" width="1440" height="900"
               alt="${s.shotLight}" loading="lazy" decoding="async">
        </div>
        <figcaption>${s.shotLight}</figcaption>
      </figure>
      <figure class="shot-card narrow">
        <div class="phone">
          <img src="/assets/shots/phone-server.png" width="412" height="892"
               alt="${s.shotPhone}" loading="lazy" decoding="async">
        </div>
        <figcaption>${s.shotPhone}</figcaption>
      </figure>
    </div>
  </div>
</section>

<section class="band band-alt">
  <div class="wrap">
    <h2 class="mt0">${s.fH}</h2>
    <div class="grid g3">
      <article class="card">${icon('msg')}<h3>${s.fMsg}</h3><p>${s.fMsgP}</p></article>
      <article class="card">${icon('com')}<h3>${s.fCom}</h3><p>${s.fComP}</p></article>
      <article class="card">${icon('call')}<h3>${s.fCall}</h3><p>${s.fCallP}</p></article>
      <article class="card">${icon('cust')}<h3>${s.fCust}</h3><p>${s.fCustP}</p></article>
      <article class="card">${icon('plug')}<h3>${s.fPlug}</h3><p>${s.fPlugP}</p></article>
      <article class="card">${icon('mus')}<h3>${s.fMus}</h3><p>${s.fMusP}</p></article>
    </div>
    <p style="margin-top:22px"><a href="${urlFor('features', lang)}">${s.fAll} →</a></p>
  </div>
</section>

<section class="band band-alt">
  <div class="wrap">
    <div class="prose">
      <h2 class="mt0">${s.privH}</h2>
      <p class="lede">${s.privP}</p>
    </div>
    <div class="grid g3">
      <article class="card">
        <h3>${s.p1H}</h3><p>${s.p1P}</p>
        <p style="margin-top:10px" class="muted"><small>${s.p1Note}</small></p>
      </article>
      <article class="card"><h3>${s.p2H}</h3><p>${s.p2P}</p></article>
      <article class="card"><h3>${s.p3H}</h3><p>${s.p3P}</p></article>
    </div>
    <p style="margin-top:22px">
      <a href="${urlFor('security', lang)}">${s.privCta} →</a>
      &nbsp;&nbsp;<a href="${urlFor('privacy', lang)}">${s.privCta2} →</a>
    </p>
  </div>
</section>

<section class="band">
  <div class="wrap prose">
    <h2 class="mt0">${s.hnH}</h2>
    <p>${s.hnP}</p>
    <ul>
      <li>${s.hn1}</li>
      <li>${s.hn2}</li>
      <li>${s.hn3}</li>
      <li>${s.hn4}</li>
    </ul>
    <p><a href="${urlFor('transparency', lang)}">${s.hnCta} →</a></p>
  </div>
</section>

<section class="band band-alt">
  <div class="wrap">
    <div class="prose">
      <h2 class="mt0">${s.dlH}</h2>
      <p>${s.dlP}</p>
    </div>
    <div class="grid g3">
      <article class="card dl-card dl-primary">
        <h2>Windows</h2>
        <p class="meta"><span>${s.ver} ${r.version}</span>${win ? `<span>${sizeMB(win.bytes)}</span>` : ''}</p>
        ${dlBtn(win, s.dlWin)}
      </article>
      <article class="card dl-card">
        <h2>Android</h2>
        <p class="meta"><span>${s.ver} ${r.version}</span>${and ? `<span>${sizeMB(and.bytes)}</span>` : ''}</p>
        ${dlBtn(and, s.dlAnd)}
      </article>
      <article class="card dl-card">
        <h2>${lang === 'en' ? 'Web' : 'Веб'}</h2>
        <p class="meta"><span>${lang === 'en' ? 'No installation' : 'Без установки'}</span></p>
        <a class="btn btn-quiet btn-big" href="${APP_URL}">${s.open}</a>
      </article>
    </div>
    <p style="margin-top:22px"><a href="${urlFor('download', lang)}">${lang === 'en' ? 'All download options and system requirements' : 'Все варианты загрузки и требования'} →</a></p>
  </div>
</section>
`
  },
}
