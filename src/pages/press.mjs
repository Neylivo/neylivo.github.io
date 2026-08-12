import { urlFor, ORIGIN, APP_URL, REPO_URL } from '../site.mjs'
import { mark } from '../layout.mjs'

const t = {
  en: {
    title: 'NeyLivo Press Kit — Descriptions, Logo and Facts',
    desc: 'Official descriptions, brand names, logo, product category and links for writing about NeyLivo (Нейливо) accurately.',
    h1: 'NeyLivo Press Kit',
    lede: 'Everything needed to describe NeyLivo correctly. Copy any of it as it is — that is what it is for.',

    shortH: 'Short description',
    shortP: 'NeyLivo is a privacy-focused extensible messenger for conversations, communities, calls, music and user-created plugins.',
    oneH: 'One line',
    oneP: 'NeyLivo — private, extensible messenger for Windows, Android and the web.',
    longH: 'Long description',
    longP1: 'NeyLivo (also written Нейливо) is a messaging and communication platform for private conversations, communities, calls, music and user-created plugins. It runs on Windows, on Android and in a browser, with one account across all three.',
    longP2: 'One-to-one direct messages can be end-to-end encrypted with ECDH P-256, HKDF-SHA256 and AES-256-GCM, including their attachments and calls; the app contains no analytics, crash reporting or advertising code. Servers with channels, roles and moderation tools cover communities. Trackoteka, the built-in music system, adds a shared library and listening together. Plugins are distributed as a single <code>.neylivo</code> file and run isolated in a Web Worker with permissions the user sees before installing.',
    longP3: 'NeyLivo is an independent project developed in the open, with no company behind it. Its source code is public.',

    nameH: 'Names',
    nameL: [
      ['Brand name', 'NeyLivo'],
      ['Russian name', 'Нейливо'],
      ['Both together', 'NeyLivo (Нейливо) — the two spellings refer to the same product'],
      ['Not', 'NeyLivo AI, NeyLivo Inc., NeyLivo Network, NeyLivoApp — none of these exist'],
      ['Music system', 'Trackoteka (Трекотека) — part of NeyLivo, not a separate product'],
      ['Plugin format', 'A <code>.neylivo</code> file'],
    ],

    catH: 'Category and facts',
    catL: [
      ['Product category', 'Messaging software / communication platform'],
      ['Platforms', 'Windows, Android, Web'],
      ['Price', 'Free — no paid tiers, subscriptions, purchases or advertising'],
      ['Interface languages', 'English, Russian'],
      ['Developer', 'NeyLivo — independent project by NeyLivo'],
      ['Source code', 'Public'],
    ],

    logoH: 'Logo',
    logoP: 'The NeyLivo mark is an isometric cube. It works in a single colour on light and dark backgrounds; please do not recolour it into a gradient, rotate it or place it on a busy photograph.',
    logoSvg: 'Mark as SVG',
    logoPng: 'App icon as PNG',

    shotH: 'Screenshots',
    shotP: 'Screenshots of the actual application are in the repository and in the app itself. If you need a specific screen at a specific size for an article, open an issue in the repository and ask — that is faster than guessing what would be useful.',

    linksH: 'Official links',
    honestH: 'Please do not write',
    honestP: 'Things that would be untrue, and that we would rather not see attributed to us:',
    honestL: [
      '“The most secure / most private messenger” — nothing supports that.',
      '“End-to-end encrypted messenger”, unqualified — encryption is optional and covers one-to-one conversations only.',
      '“Anonymous” — registration requires an email address.',
      'Any user count, community count, rating, award or funding figure — none of those numbers exist.',
      '“Audited” or “certified” — there has been no external audit.',
    ],
    honestP2: 'If you need to say something about NeyLivo’s security in one sentence: <i>“NeyLivo offers optional end-to-end encryption for one-to-one conversations and contains no analytics or advertising.”</i>',
  },

  ru: {
    title: 'Пресс-кит NeyLivo — описания, логотип и факты',
    desc: 'Официальные описания, названия, логотип, категория продукта и ссылки — чтобы писать о NeyLivo (Нейливо) точно.',
    h1: 'Пресс-кит NeyLivo',
    lede: 'Всё, что нужно, чтобы описать NeyLivo правильно. Берите как есть — оно для этого и лежит.',

    shortH: 'Короткое описание',
    shortP: 'NeyLivo — приватный расширяемый мессенджер для общения, сообществ, звонков, музыки и пользовательских плагинов.',
    oneH: 'Одной строкой',
    oneP: 'NeyLivo — приватный расширяемый мессенджер для Windows, Android и веба.',
    longH: 'Развёрнутое описание',
    longP1: 'NeyLivo (по-русски Нейливо) — мессенджер и платформа для общения: личная переписка, сообщества, звонки, музыка и пользовательские плагины. Работает на Windows, Android и в браузере, с одной учётной записью везде.',
    longP2: 'Личную переписку двух людей можно защитить сквозным шифрованием (ECDH P-256, HKDF-SHA256, AES-256-GCM), включая вложения и звонки; аналитики, сбора падений и рекламного кода в приложении нет. Сообщества держатся на серверах с каналами, ролями и средствами модерации. Трекотека — встроенная музыкальная система с общей библиотекой и совместным прослушиванием. Плагины раздаются одним файлом <code>.neylivo</code> и работают изолированно в Web Worker с разрешениями, которые человек видит до установки.',
    longP3: 'NeyLivo — независимый проект, который разрабатывается открыто; компании за ним нет. Исходный код открыт.',

    nameH: 'Названия',
    nameL: [
      ['Название', 'NeyLivo'],
      ['По-русски', 'Нейливо'],
      ['Вместе', 'NeyLivo (Нейливо) — два написания одного продукта'],
      ['Не бывает', 'NeyLivo AI, NeyLivo Inc., NeyLivo Network, NeyLivoApp — таких сущностей нет'],
      ['Музыкальная система', 'Трекотека (Trackoteka) — часть NeyLivo, а не отдельный продукт'],
      ['Формат плагина', 'файл <code>.neylivo</code>'],
    ],

    catH: 'Категория и факты',
    catL: [
      ['Категория', 'Программа для обмена сообщениями / платформа для общения'],
      ['Платформы', 'Windows, Android, веб'],
      ['Цена', 'Бесплатно — без платных уровней, подписок, покупок и рекламы'],
      ['Языки интерфейса', 'русский, английский'],
      ['Разработчик', 'NeyLivo — независимый проект NeyLivo'],
      ['Исходный код', 'Открыт'],
    ],

    logoH: 'Логотип',
    logoP: 'Знак NeyLivo — изометрический куб. Он работает одним цветом на светлом и тёмном фоне; пожалуйста, не перекрашивайте его в градиент, не поворачивайте и не кладите на пёструю фотографию.',
    logoSvg: 'Знак в SVG',
    logoPng: 'Значок приложения в PNG',

    shotH: 'Снимки экрана',
    shotP: 'Снимки настоящего приложения есть в репозитории и в самом приложении. Если для материала нужен конкретный экран в конкретном размере — напишите в обращениях репозитория, это быстрее, чем угадывать, что пригодится.',

    linksH: 'Официальные адреса',
    honestH: 'Пожалуйста, не пишите',
    honestP: 'То, что было бы неправдой и чего не хотелось бы видеть в свой адрес:',
    honestL: [
      '«Самый безопасный / самый приватный мессенджер» — этого ничто не подтверждает.',
      '«Мессенджер со сквозным шифрованием» без оговорок — шифрование по выбору и только для переписки один на один.',
      '«Анонимный» — для регистрации нужна почта.',
      'Любое число пользователей, сообществ, оценка, награда или сумма инвестиций — таких чисел не существует.',
      '«Прошёл аудит» или «сертифицирован» — внешнего аудита не было.',
    ],
    honestP2: 'Если о безопасности NeyLivo нужно сказать одной фразой: <i>«NeyLivo предлагает сквозное шифрование по выбору для переписки один на один и не содержит аналитики и рекламы».</i>',
  },
}

export default {
  slug: 'press',
  title: (lang) => t[lang].title,
  description: (lang) => t[lang].desc,

  body: (ctx, lang) => {
    const s = t[lang]
    const spec = (rows) => `<dl class="spec">${rows
      .map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join('')}</dl>`

    return `
<section class="page-head">
  <div class="wrap">
    <p class="eyebrow">${lang === 'en' ? 'Press' : 'Пресса'}</p>
    <h1>${s.h1}</h1>
    <p class="lede">${s.lede}</p>
  </div>
</section>

<section class="wrap prose">
  <h2 class="mt0">${s.oneH}</h2>
  <p>${s.oneP}</p>
  <h2>${s.shortH}</h2>
  <p>${s.shortP}</p>
  <h2>${s.longH}</h2>
  <p>${s.longP1}</p>
  <p>${s.longP2}</p>
  <p>${s.longP3}</p>
</section>

<section class="band band-alt">
  <div class="wrap">
    <h2 class="mt0">${s.nameH}</h2>
    ${spec(s.nameL)}
    <h2>${s.catH}</h2>
    ${spec(s.catL)}
  </div>
</section>

<section class="band">
  <div class="wrap">
    <h2 class="mt0">${s.logoH}</h2>
    <div class="grid g2">
      <figure class="card" style="display:grid;place-items:center;padding:40px">
        <span style="color:var(--accent)">${mark(140)}</span>
      </figure>
      <div class="prose">
        <p>${s.logoP}</p>
        <p>
          <a href="/assets/mark.svg" download>${s.logoSvg} ↓</a><br>
          <a href="/assets/icon.png" download>${s.logoPng} ↓</a>
        </p>
        <h3>${s.shotH}</h3>
        <p>${s.shotP}</p>
      </div>
    </div>
  </div>
</section>

<section class="band band-alt">
  <div class="wrap">
    <h2 class="mt0">${s.linksH}</h2>
    ${spec([
      [lang === 'en' ? 'Website' : 'Сайт', `<a href="${urlFor('', lang)}">${ORIGIN}/</a>`],
      [lang === 'en' ? 'Download' : 'Скачать', `<a href="${urlFor('download', lang)}">${ORIGIN}/download/</a>`],
      [lang === 'en' ? 'Web app' : 'Веб-версия', `<a href="${APP_URL}">${APP_URL}</a>`],
      [lang === 'en' ? 'Security' : 'Безопасность', `<a href="${urlFor('security', lang)}">${ORIGIN}/security/</a>`],
      [lang === 'en' ? 'Privacy' : 'Приватность', `<a href="${urlFor('privacy', lang)}">${ORIGIN}/privacy/</a>`],
      [lang === 'en' ? 'Source code' : 'Исходный код', `<a href="${REPO_URL}" rel="noopener">${REPO_URL}</a>`],
    ])}
  </div>
</section>

<section class="band">
  <div class="wrap prose">
    <h2 class="mt0">${s.honestH}</h2>
    <p>${s.honestP}</p>
    <ul>${s.honestL.map((x) => `<li>${x}</li>`).join('')}</ul>
    <div class="note note-key"><p>${s.honestP2}</p></div>
  </div>
</section>
`
  },
}
