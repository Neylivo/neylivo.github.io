import { urlFor, REPO_URL, DATE_LABEL } from '../site.mjs'

const t = {
  en: {
    title: 'NeyLivo Transparency — What We Know Is Imperfect',
    desc: 'An honest list of what NeyLivo does not do well yet: unencrypted attachments, encryption off by default, unverified features and the absence of an external audit.',
    h1: 'Transparency',
    lede: 'Product pages are written to impress. This one is written to be checkable. Everything below is a real weakness of NeyLivo, listed by the project itself.',
    updated: 'Last updated',

    whyH: 'Why this page exists',
    whyP: 'A privacy product that hides its own limitations is asking to be trusted more than it deserves. People make decisions based on what a page like this says — whether to send a document, whether to have a conversation. If we get that wrong in our favour, the cost is paid by someone else.',
    whyP2: 'So: everything here is a thing we would rather not have to write.',

    openH: 'Open weaknesses',
    open: [
      ['Attachments are in public storage',
       'Files sent without attachment encryption can be downloaded by anyone who has the link, without signing in. The database is protected by access rules; this storage is not. Turning on attachment encryption in Settings fixes it for your direct messages today. The proper fix — closing the storage and moving to signed links without breaking the links already embedded in old messages — is planned in stages, and the first, harmless stage is to stop the bucket being listable at all.',
       'Being fixed'],
      ['Encryption is off by default',
       'End-to-end encryption for messages, attachments and calls exists, works and is documented — and all three switches start off. Privacy that only reaches the people who go looking for it in the settings is privacy that most people never get.',
       'Open'],
      ['Group chats and channels are not end-to-end encrypted',
       'Only one-to-one direct messages are. Group encryption is a different and much larger problem — key distribution, members joining and leaving, multiple devices — and it will be designed properly before anything is written, not improvised.',
       'Design stage'],
      ['Call encryption has never been proven in a real call',
       'The code path is covered by tests, and the library calls were checked against the library’s own source. But nobody has yet made an encrypted call between two real devices and confirmed it. Until that happens it is labelled experimental everywhere it is mentioned.',
       'Unverified'],
      ['No Content-Security-Policy',
       'There is no known way to inject code into the app today — messages are rendered as React nodes, and there is no raw HTML insertion anywhere in it. CSP is the second line of defence that catches the mistake nobody has made yet. Adding it needs care because plugin pages, embedded players and emoji load from several places.',
       'Open'],
      ['Emoji images come from a public CDN',
       'The interface contains emoji, so a third party receives your IP address on every launch without you doing anything. The app deliberately avoided this for fonts, which are bundled; emoji should be bundled too.',
       'Open'],
      ['Minimum password length is six characters',
       'That is the platform default and it is too short.',
       'Open'],
      ['No two-factor authentication',
       'Trusted devices and a recovery code exist, and they help, but they are not the same as an authenticator app.',
       'Open'],
      ['No external security audit',
       'Nobody outside the project has reviewed any of this. Everything on the security page is our own reading of our own code — which is exactly why the code is public.',
       'Open'],
      ['No open source licence yet',
       'The source is public and readable, but it carries no licence, which technically makes it source-available rather than open source. That is an unfinished decision, not a stance.',
       'Open'],
    ],

    unvH: 'Shipped but not verified in real use',
    unvP: 'Some things are released, appear to work, and have never been confirmed by two people actually using them at once. They are not presented as finished:',
    unv: [
      'End-to-end encrypted calls — needs two people and a live media server to verify.',
      'The Android update installer — the native code was checked line by line against the platform sources, but has never been run through a real update on a real phone.',
      'Some notification paths that need a second person and a closed window to test.',
    ],
    unvP2: 'Where the app itself knows something is unproven, it says so in the setting rather than in a footnote.',

    fixedH: 'What has been dealt with',
    fixedP: 'Some earlier problems are closed, and it is only fair to say so: the database access rules were tightened repeatedly and are now tested against a real Postgres on every change; push notifications used to let any logged-in user send a fake system notification to anyone and no longer do; a personal GIF collection used to be visible to everyone and is now private; message length is no longer visible through ciphertext size.',

    howH: 'How to check any of this',
    howP: 'Everything above points at code you can read. The repository is public, the technical audit with file references is published in it, and the database access rules have a test suite that plays several users against a real database.',
    audit: 'Read the security audit',
    repo: 'Open the repository',
  },

  ru: {
    title: 'Прозрачность NeyLivo — что у нас пока плохо',
    desc: 'Честный список того, что в NeyLivo (Нейливо) пока сделано плохо: незашифрованные вложения, шифрование выключено по умолчанию, непроверенные возможности и отсутствие внешнего аудита.',
    h1: 'Прозрачность',
    lede: 'Страницы о продукте пишут, чтобы впечатлить. Эта написана, чтобы её можно было проверить. Всё, что ниже, — настоящие слабые места NeyLivo, перечисленные самим проектом.',
    updated: 'Обновлено',

    whyH: 'Зачем эта страница',
    whyP: 'Продукт о приватности, который прячет свои пределы, просит доверия больше, чем заслуживает. Люди принимают решения по тому, что написано на такой странице: отправлять ли документ, вести ли разговор. Если мы ошибёмся в свою пользу, платить за это будет кто-то другой.',
    whyP2: 'Поэтому здесь — всё то, чего мы предпочли бы не писать.',

    openH: 'Незакрытые слабые места',
    open: [
      ['Вложения лежат в публичном хранилище',
       'Файлы, отправленные без шифрования вложений, скачает любой, у кого есть ссылка, — без входа. Базу защищают правила доступа, это хранилище — нет. Включённое в настройках шифрование вложений закрывает это для вашей личной переписки уже сегодня. Правильное исправление — закрыть хранилище и перейти на подписанные ссылки, не сломав те, что уже лежат внутри старых сообщений, — идёт по шагам, и первый, безобидный шаг это запретить перечисление содержимого вовсе.',
       'Исправляется'],
      ['Шифрование выключено по умолчанию',
       'Сквозное шифрование сообщений, вложений и звонков есть, работает и описано — и все три переключателя начинают выключенными. Приватность, которая достаётся только тем, кто пошёл искать её в настройках, — это приватность, которой большинство не получает.',
       'Открыто'],
      ['Групповые беседы и каналы не защищены сквозным шифрованием',
       'Защищена только переписка один на один. Групповое шифрование — совсем другая и куда большая задача: раздача ключей, приход и уход участников, несколько устройств. Её сначала спроектируют как следует и только потом напишут, а не придумают на ходу.',
       'Проектируется'],
      ['Шифрование звонков ни разу не проверено настоящим звонком',
       'Путь в коде покрыт проверками, а вызовы библиотеки сверены с её собственными исходниками. Но никто ещё не позвонил с шифрованием между двумя настоящими устройствами и не убедился. Пока этого не произошло, оно помечено экспериментальным везде, где упоминается.',
       'Не проверено'],
      ['Нет Content-Security-Policy',
       'Известного способа внедрить код в приложение сегодня нет: сообщения рисуются узлами React, вставки сырого HTML нет нигде. CSP — второй рубеж, который ловит ошибку, которую ещё никто не сделал. Включать его надо осторожно: страницы плагинов, встроенные проигрыватели и эмодзи грузятся из разных мест.',
       'Открыто'],
      ['Картинки эмодзи приходят с чужого CDN',
       'В интерфейсе есть эмодзи, поэтому посторонний получает ваш IP при каждом запуске без единого вашего действия. Со шрифтами приложение этого избежало намеренно — они лежат в сборке; эмодзи должны лежать там же.',
       'Открыто'],
      ['Минимальная длина пароля — шесть символов',
       'Это значение платформы по умолчанию, и оно мало.',
       'Открыто'],
      ['Нет двухфакторной проверки',
       'Доверенные устройства и код восстановления есть и помогают, но это не то же самое, что приложение-аутентификатор.',
       'Открыто'],
      ['Внешнего аудита не было',
       'Никто со стороны всё это не проверял. Всё на странице безопасности — наше собственное прочтение собственного кода. Именно поэтому код открыт.',
       'Открыто'],
      ['Нет лицензии открытого кода',
       'Исходник открыт и читается, но лицензии на нём нет — то есть формально это «исходник доступен», а не «открытый код». Это незавершённое решение, а не позиция.',
       'Открыто'],
    ],

    unvH: 'Выпущено, но не проверено в живой работе',
    unvP: 'Кое-что выпущено, выглядит работающим и ни разу не подтверждено двумя людьми, которые пользуются этим одновременно. Как готовое оно не подаётся:',
    unv: [
      'Звонки со сквозным шифрованием — для проверки нужны два человека и живой медиасервер.',
      'Установщик обновлений на Android — нативный код сверен построчно с исходниками платформы, но ни разу не проходил настоящее обновление на настоящем телефоне.',
      'Часть путей уведомлений, для проверки которых нужен второй человек и закрытое окно.',
    ],
    unvP2: 'Там, где приложение само знает, что что-то не проверено, оно говорит это в настройке, а не в сноске.',

    fixedH: 'Что уже закрыто',
    fixedP: 'Часть прежних проблем закрыта, и об этом честно сказать тоже стоит: правила доступа к базе не раз ужесточались и теперь проверяются на настоящем Postgres при каждом изменении; пуш-уведомления когда-то позволяли любому вошедшему прислать кому угодно поддельное системное уведомление — больше нет; личная коллекция гифок была видна всем, теперь она личная; длина сообщения больше не видна по размеру шифротекста.',

    howH: 'Как всё это проверить',
    howP: 'Всё перечисленное указывает на код, который можно прочитать. Репозиторий открыт, технический аудит со ссылками на файлы опубликован в нём, а у правил доступа к базе есть набор проверок, который играет за нескольких пользователей против настоящей базы.',
    audit: 'Читать аудит безопасности',
    repo: 'Открыть репозиторий',
  },
}

export default {
  slug: 'transparency',
  title: (lang) => t[lang].title,
  description: (lang) => t[lang].desc,

  body: (ctx, lang) => {
    const s = t[lang]

    return `
<section class="page-head">
  <div class="wrap">
    <p class="eyebrow">${lang === 'en' ? 'Transparency' : 'Прозрачность'}</p>
    <h1>${s.h1}</h1>
    <p class="lede">${s.lede}</p>
    <p class="stamp">${s.updated}: ${DATE_LABEL[lang]} · NeyLivo ${ctx.release.version}</p>
  </div>
</section>

<section class="wrap prose">
  <h2 class="mt0">${s.whyH}</h2>
  <p>${s.whyP}</p>
  <p>${s.whyP2}</p>
</section>

<section class="wrap">
  <h2>${s.openH}</h2>
  <div class="tbl-scroll">
    <table>
      <thead><tr>
        <th scope="col">${lang === 'en' ? 'Weakness' : 'Слабое место'}</th>
        <th scope="col">${lang === 'en' ? 'What it means' : 'Что это значит'}</th>
        <th scope="col">${lang === 'en' ? 'State' : 'Состояние'}</th>
      </tr></thead>
      <tbody>
        ${s.open.map(([h, p, st]) => `<tr><th scope="row">${h}</th><td>${p}</td><td class="nowrap">${st}</td></tr>`).join('\n        ')}
      </tbody>
    </table>
  </div>
</section>

<section class="band band-alt">
  <div class="wrap prose">
    <h2 class="mt0">${s.unvH}</h2>
    <p>${s.unvP}</p>
    <ul>${s.unv.map((x) => `<li>${x}</li>`).join('')}</ul>
    <p>${s.unvP2}</p>
  </div>
</section>

<section class="wrap prose">
  <h2>${s.fixedH}</h2>
  <p>${s.fixedP}</p>

  <h2>${s.howH}</h2>
  <p>${s.howP}</p>
  <div class="cta-row">
    <a class="btn btn-quiet" href="${REPO_URL}/blob/main/SECURITY_ARCHITECTURE_AUDIT.md" rel="noopener">${s.audit}</a>
    <a class="btn btn-quiet" href="${REPO_URL}" rel="noopener">${s.repo}</a>
  </div>
  <p style="margin-top:20px"><a href="${urlFor('security', lang)}">${lang === 'en' ? 'Security page' : 'Страница безопасности'} →</a></p>
</section>
`
  },
}
