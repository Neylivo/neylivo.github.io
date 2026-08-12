import { urlFor, REPO_URL, APP_URL } from '../site.mjs'

const t = {
  en: {
    title: 'Ponoi Documentation',
    desc: 'Documentation for Ponoi: the plugin format and API, security architecture, the release process and the source code.',
    h1: 'Documentation',
    lede: 'Ponoi is developed in the open, and the technical documentation lives with the code it describes. This page is the index.',

    userH: 'Using Ponoi',
    userL: [
      ['Features', 'What the app can do, area by area.', 'features'],
      ['Download and install', 'Windows, Android and the web version, with system requirements.', 'download'],
      ['Trackoteka', 'The music system: library, playlists, lyrics, listening together.', 'trackoteka'],
      ['Questions and answers', 'Short answers to the common ones.', 'faq'],
    ],

    devH: 'Building plugins',
    devP: 'A plugin is a single <code>.ponoi</code> JavaScript file. The format, the whole API and the permission list are documented in the repository, and there is an editor inside the app that runs your code as you write it.',
    devL: [
      ['PLUGINS.md', 'The plugin format, the API and how isolation works.', REPO_URL + '/blob/main/PLUGINS.md'],
      ['Plugins on this site', 'What plugins can do and how permissions work, in prose.', null],
    ],

    secH: 'Security and privacy',
    secL: [
      ['Security architecture', 'What protects what, the threat model and the known limitations.', 'security'],
      ['Privacy', 'Every kind of data the app handles, item by item.', 'privacy'],
      ['Security audit', 'The project’s own technical audit, with file references.', REPO_URL + '/blob/main/SECURITY_ARCHITECTURE_AUDIT.md'],
      ['Reporting vulnerabilities', 'How to report a problem responsibly.', REPO_URL + '/blob/main/SECURITY.md'],
      ['End-to-end encryption design', 'The design work for encrypting groups and channels, before any of it is built.', REPO_URL + '/blob/main/E2EE_DESIGN.md'],
    ],

    srcH: 'Source and releases',
    srcL: [
      ['Repository', 'The whole application: client, database migrations and build workflows.', REPO_URL],
      ['Releases', 'Every version with its installer and APK.', REPO_URL + '/releases'],
      ['Changelog', 'What changed in each version.', 'changelog'],
      ['README', 'What Ponoi is, what works today and what is still planned.', REPO_URL + '#readme'],
    ],
    note: 'Developer documentation is intentionally kept in the repository rather than copied onto this site: two copies of the same instructions drift apart, and the one on the website is always the stale one.',
  },

  ru: {
    title: 'Документация Ponoi',
    desc: 'Документация Ponoi (Поной): формат и API плагинов, устройство безопасности, порядок выпусков и исходный код.',
    h1: 'Документация',
    lede: 'Ponoi разрабатывается открыто, и техническая документация лежит рядом с кодом, который описывает. Эта страница — указатель.',

    userH: 'Пользоваться Ponoi',
    userL: [
      ['Возможности', 'Что приложение умеет, по областям.', 'features'],
      ['Скачать и установить', 'Windows, Android и веб-версия, с требованиями.', 'download'],
      ['Трекотека', 'Музыкальная система: библиотека, плейлисты, текст песни, совместное прослушивание.', 'trackoteka'],
      ['Вопросы и ответы', 'Короткие ответы на частые вопросы.', 'faq'],
    ],

    devH: 'Писать плагины',
    devP: 'Плагин — один файл <code>.ponoi</code> на JavaScript. Формат, весь API и список разрешений описаны в репозитории, а внутри приложения есть редактор, который запускает ваш код прямо по ходу написания.',
    devL: [
      ['PLUGINS.md', 'Формат плагина, API и то, как устроена изоляция.', REPO_URL + '/blob/main/PLUGINS.md'],
      ['Плагины на этом сайте', 'Что умеют плагины и как работают разрешения — словами.', null],
    ],

    secH: 'Безопасность и приватность',
    secL: [
      ['Устройство безопасности', 'Что и чем защищено, модель угроз и известные слабые места.', 'security'],
      ['Приватность', 'Все виды данных, с которыми работает приложение, по пунктам.', 'privacy'],
      ['Аудит безопасности', 'Собственный технический разбор проекта со ссылками на файлы.', REPO_URL + '/blob/main/SECURITY_ARCHITECTURE_AUDIT.md'],
      ['Сообщить об уязвимости', 'Как сообщить о проблеме так, чтобы это никому не навредило.', REPO_URL + '/blob/main/SECURITY.md'],
      ['Проект сквозного шифрования', 'Проработка шифрования групп и каналов — до того, как что-либо из этого написано.', REPO_URL + '/blob/main/E2EE_DESIGN.md'],
    ],

    srcH: 'Исходный код и выпуски',
    srcL: [
      ['Репозиторий', 'Всё приложение: клиент, миграции базы и сборочные процессы.', REPO_URL],
      ['Выпуски', 'Каждая версия с установщиком и APK.', REPO_URL + '/releases'],
      ['Что нового', 'Что изменилось в каждой версии.', 'changelog'],
      ['README', 'Что такое Ponoi, что уже работает и что ещё нет.', REPO_URL + '#readme'],
    ],
    note: 'Документация для разработчиков намеренно живёт в репозитории, а не переписана на сайт: две копии одних и тех же указаний расходятся, и устаревшей всегда оказывается та, что на сайте.',
  },
}

export default {
  slug: 'docs',
  title: (lang) => t[lang].title,
  description: (lang) => t[lang].desc,

  body: (ctx, lang) => {
    const s = t[lang]
    const cards = (rows) => `<div class="grid g2">${rows.map(([h, p, target]) => {
      const href = target === null ? urlFor('plugins', lang)
        : /^https?:/.test(target) ? target : urlFor(target, lang)
      const rel = /^https?:/.test(href) && !href.startsWith('/') ? ' rel="noopener"' : ''
      return `<article class="card"><h3><a href="${href}"${rel}>${h}</a></h3><p>${p}</p></article>`
    }).join('')}</div>`

    return `
<section class="page-head">
  <div class="wrap">
    <p class="eyebrow">${lang === 'en' ? 'Documentation' : 'Документация'}</p>
    <h1>${s.h1}</h1>
    <p class="lede">${s.lede}</p>
  </div>
</section>

<section class="wrap">
  <h2>${s.userH}</h2>
  ${cards(s.userL)}
</section>

<section class="band band-alt">
  <div class="wrap">
    <h2 class="mt0">${s.devH}</h2>
    <p class="prose">${s.devP}</p>
    ${cards(s.devL)}
  </div>
</section>

<section class="wrap">
  <h2>${s.secH}</h2>
  ${cards(s.secL)}
</section>

<section class="band band-alt">
  <div class="wrap">
    <h2 class="mt0">${s.srcH}</h2>
    ${cards(s.srcL)}
    <p class="prose muted" style="margin-top:22px">${s.note}</p>
    <p class="prose"><a href="${APP_URL}">${lang === 'en' ? 'Open the web app' : 'Открыть веб-версию'} →</a></p>
  </div>
</section>
`
  },
}
