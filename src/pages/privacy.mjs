import { urlFor, DATE_LABEL } from '../site.mjs'

const t = {
  en: {
    title: 'Privacy at NeyLivo — What Data NeyLivo Collects',
    desc: 'Exactly what data NeyLivo handles: email, username, messages, attachments, calls, device information — what is collected, why, how long it is kept and who can see it.',
    h1: 'Privacy at NeyLivo',
    lede: 'Not a legal document written to be unreadable. This is a list of every kind of data NeyLivo touches, why it exists, and who can reach it.',
    updated: 'Last updated',

    shortH: 'The short version',
    short1: 'NeyLivo has no analytics, no crash reporting service and no advertising code. Nothing counts you.',
    short2: 'To register you need an email address and a password. Nothing else is required.',
    short3: 'Your messages and files are stored so the app can show them to you on any device. One-to-one direct messages can be end-to-end encrypted, and then the server holds ciphertext it cannot read.',
    short4: 'Attachments sent without attachment encryption are in public storage today and can be downloaded by anyone with the link. This is the project’s most serious open issue and it is listed as such.',
    short5: 'This website sets no cookies, loads no fonts or scripts from other servers, and does not measure your visit in any way.',

    tblH: 'Data, item by item',
    tblNote: 'Scroll sideways on a phone.',
    cols: ['Data', 'Collected', 'Purpose', 'Retention', 'Who can access it'],
    rows: [
      ['Email address', 'Yes',
        'Registration, sign-in, password reset',
        'Until you delete your account',
        'You and the authentication service. Other users never see it.'],
      ['Password', 'Yes, as a hash',
        'Sign-in',
        'Until changed or the account is deleted',
        'Nobody. Stored as a bcrypt hash by Supabase Auth; NeyLivo writes no password storage of its own.'],
      ['Username and display name', 'Yes',
        'So people can find and recognise you',
        'Until you delete your account',
        'Anyone who can see you in a conversation or a server.'],
      ['Profile details you add', 'Only what you enter',
        'Your profile card: avatar, banner, colours, pronouns, about text, favourite games',
        'Until you remove them or delete the account',
        'Other users, according to the privacy settings you choose.'],
      ['Messages', 'Yes',
        'To deliver them and show your history on every device',
        'Until deleted by you, or by a moderator in a server',
        'You and the recipients. <b>With end-to-end encryption on, one-to-one messages are ciphertext the server cannot read.</b> Group chats and server channels are readable by the database operator.'],
      ['Attachments and avatars', 'Yes',
        'To deliver files you send',
        'Until deleted',
        '<b>Currently: anyone with the link, without signing in</b> — storage is public. With attachment encryption on, the file is encrypted before upload and useless without the key.'],
      ['Calls', 'Metadata only',
        'To place the call and show it in the conversation',
        'The call record (who, when, how long) stays in the conversation; the media is not recorded',
        'Participants. Media passes through the LiveKit server, which can decrypt it unless call encryption is on.'],
      ['Contacts and friends', 'Yes',
        'Friend list, blocking, who may call you',
        'Until you remove them',
        'You. Your friend list is not published to other users.'],
      ['IP address', 'Not stored by NeyLivo',
        'Unavoidable for any network connection',
        'Whatever the infrastructure providers keep in their own logs',
        'The services listed below, as part of serving the request. NeyLivo has no table of IP addresses.'],
      ['Device information', 'Minimal',
        'Trusted devices: a random identifier the app generates, a label you can set, and when it was last seen',
        'Until you remove the device',
        'You only. It is a random value and says nothing about your hardware.'],
      ['Analytics', 'None',
        '—', '—',
        'There is no analytics system in the app. Not a self-hosted one either.'],
      ['Crash reports', 'Not sent anywhere',
        'Diagnosing an error you hit',
        'On your device only, until cleared',
        'You. Errors are written to local storage, not uploaded.'],
      ['Location', 'Never',
        '—', '—',
        'The app does not ask for location and does not use it.'],
      ['Cookies', 'None',
        'The app keeps your session in local storage, not in cookies. This website sets no cookies at all.',
        '—',
        '—'],
      ['Push notifications', 'Only if you allow them',
        'Notifying you when the app is closed',
        'Until you turn notifications off',
        'The subscription is stored so the server can deliver a notification; the push service of your browser or phone delivers it.'],
      ['Music listening', 'Yes, inside the app',
        'Play counts and building your personal queue',
        'Until the track or the account is removed',
        'Total play counts are visible to everyone in the library; <b>your personal listening history is yours and is not shown to others</b>.'],
    ],

    thirdH: 'Third parties',
    thirdP: 'NeyLivo is not self-hosted. These services take part in making it work, and each of them at minimum sees the IP address of the device that connects to it.',
    thirdCols: ['Service', 'What it does', 'When it is contacted'],
    third: [
      ['Supabase', 'Database, accounts, file storage, realtime connection', 'Constantly, while the app is open'],
      ['LiveKit', 'Voice, video and screen sharing', 'During a call'],
      ['jsDelivr (CDN)', 'Emoji images', '<b>Always, without any action from you</b> — because the interface contains emoji. Bundling them locally is planned.'],
      ['Tenor (Google)', 'GIF search', 'When you open the GIF panel'],
      ['lrclib.net', 'Song lyrics', 'When lyrics are requested for a track'],
      ['Audius, SoundCloud, YouTube', 'Playing music added by link', 'When such a track is added or played'],
      ['Deezer, iTunes', 'Track metadata and cover art', 'When searching for a track'],
      ['SteamGridDB', 'Game cover art', 'When game activity is displayed'],
      ['OpenDota', 'Dota 2 statistics', 'Only if you request them in a profile'],
      ['Hugging Face', 'Downloading a speech recognition model', 'Only when you press the button that needs it'],
      ['GitHub', 'Checking for and downloading updates', 'On an update check'],
      ['Render', 'The emergency chat', 'Only when the main backend has been unreachable for a while'],
    ],
    thirdNote: 'The app does not load fonts from a font CDN: they are bundled, specifically so that starting NeyLivo does not report your IP address to a third party before you have even signed in.',

    pluginH: 'Plugins and your data',
    pluginP: 'A plugin can only reach what its permissions allow, and you see that list before installing. But a plugin with the “send messages” permission really can send messages as you, and a plugin with network permission really can send data to the domains it declared. That is the point of the permission screen: an installed plugin acts with your hands.',
    pluginP2: 'Plugins cannot read your session, your password or your encryption keys — the browser does not give them access to any of those.',

    controlH: 'What you control',
    controlL: [
      'Turn on end-to-end encryption for messages, attachments and calls',
      'Choose who may send you a friend request, who may write to you and who may call you',
      'Block a person, so nothing gets through in either direction',
      'Delete individual messages, or your entire account with its data, from inside the app',
      'Turn off notifications entirely, or per server and per channel',
      'Turn off screen capture protection, blurred messages, presence and activity status',
    ],

    siteH: 'This website',
    siteP: 'The site you are reading is static HTML on GitHub Pages. It sets no cookies, contains no analytics, embeds nothing from other servers, and loads no external fonts or scripts. GitHub, which serves the pages, sees the request itself — that is unavoidable for any hosted site.',

    changeH: 'Changes',
    changeP: 'When this page changes in a way that matters, the date at the top changes with it. The page is generated from the repository, so its history is public along with everything else.',
    more: 'For the technical detail behind these answers, see the <a href="/security/">security page</a>.',
  },

  ru: {
    title: 'Приватность NeyLivo — какие данные собирает Нейливо',
    desc: 'Что именно за данные обрабатывает NeyLivo (Нейливо): почта, имя, сообщения, вложения, звонки, сведения об устройстве — что собирается, зачем, сколько хранится и кому доступно.',
    h1: 'Приватность в NeyLivo',
    lede: 'Это не юридический документ, написанный, чтобы его не читали. Это перечень всех видов данных, которых NeyLivo касается, зачем они нужны и кто может до них добраться.',
    updated: 'Обновлено',

    shortH: 'Коротко',
    short1: 'В NeyLivo нет ни аналитики, ни службы сбора падений, ни рекламного кода. Вас никто не считает.',
    short2: 'Для регистрации нужны почта и пароль. Больше ничего не требуется.',
    short3: 'Сообщения и файлы хранятся, чтобы приложение показало их вам на любом устройстве. Личную переписку один на один можно защитить сквозным шифрованием — тогда на сервере лежит шифротекст, который он прочитать не может.',
    short4: 'Вложения, отправленные без шифрования вложений, сегодня лежат в публичном хранилище, и скачать их может любой, у кого есть ссылка. Это самая серьёзная незакрытая проблема проекта, и она названа таковой.',
    short5: 'Этот сайт не ставит куки, не подгружает ни шрифтов, ни скриптов с чужих серверов и никак не измеряет ваш визит.',

    tblH: 'Данные по пунктам',
    tblNote: 'На телефоне таблица прокручивается вбок.',
    cols: ['Данные', 'Собираются', 'Зачем', 'Сколько хранятся', 'Кому доступны'],
    rows: [
      ['Адрес почты', 'Да',
        'Регистрация, вход, восстановление пароля',
        'Пока не удалите учётную запись',
        'Вам и службе аутентификации. Другие пользователи его не видят.'],
      ['Пароль', 'Да, в виде хеша',
        'Вход',
        'Пока не смените или не удалите учётную запись',
        'Никому. Хранится как хеш bcrypt в Supabase Auth; собственного хранения паролей в NeyLivo нет.'],
      ['Имя пользователя и отображаемое имя', 'Да',
        'Чтобы вас находили и узнавали',
        'Пока не удалите учётную запись',
        'Всем, кто видит вас в беседе или на сервере.'],
      ['Сведения о себе в профиле', 'Только то, что введёте',
        'Карточка профиля: аватар, обложка, цвета, местоимения, «о себе», любимые игры',
        'Пока не уберёте или не удалите учётную запись',
        'Другим пользователям — в тех пределах, которые вы выбрали в настройках приватности.'],
      ['Сообщения', 'Да',
        'Чтобы их доставить и показать вашу переписку на всех устройствах',
        'Пока вы их не удалите — или модератор на сервере',
        'Вам и получателям. <b>При включённом сквозном шифровании личное сообщение — шифротекст, который сервер прочитать не может.</b> Групповые беседы и каналы серверов читаемы тем, кто держит базу.'],
      ['Вложения и аватары', 'Да',
        'Чтобы доставить отправленные файлы',
        'Пока не удалены',
        '<b>Сейчас: любому, у кого есть ссылка, без входа</b> — хранилище публичное. При включённом шифровании вложений файл шифруется до отправки и без ключа бесполезен.'],
      ['Звонки', 'Только метаданные',
        'Чтобы соединить и показать звонок в беседе',
        'Запись о звонке (кто, когда, сколько длился) остаётся в беседе; сам разговор не записывается',
        'Участникам. Поток проходит через сервер LiveKit, который может его расшифровать, если шифрование звонка не включено.'],
      ['Друзья и контакты', 'Да',
        'Список друзей, блокировки, кто может звонить',
        'Пока не удалите',
        'Вам. Список друзей другим пользователям не публикуется.'],
      ['IP-адрес', 'NeyLivo его не хранит',
        'Неизбежен для любого сетевого соединения',
        'Столько, сколько его держат в своих журналах поставщики инфраструктуры',
        'Перечисленным ниже службам — в рамках обработки запроса. Таблицы с IP-адресами в NeyLivo нет.'],
      ['Сведения об устройстве', 'Минимум',
        'Доверенные устройства: случайный идентификатор, который создаёт само приложение, ваша подпись к нему и время последнего входа',
        'Пока не уберёте устройство',
        'Только вам. Это случайное значение, и о вашей технике оно не говорит ничего.'],
      ['Аналитика', 'Нет',
        '—', '—',
        'Системы аналитики в приложении нет. Своей собственной тоже.'],
      ['Отчёты о сбоях', 'Никуда не отправляются',
        'Разобраться в ошибке, на которую вы наткнулись',
        'Только на вашем устройстве, пока не очистите',
        'Вам. Ошибки пишутся в локальное хранилище, а не уезжают на сервер.'],
      ['Местоположение', 'Никогда',
        '—', '—',
        'Приложение не спрашивает местоположение и не использует его.'],
      ['Куки', 'Нет',
        'Сессия лежит в локальном хранилище, а не в куки. Этот сайт не ставит куки вовсе.',
        '—',
        '—'],
      ['Пуш-уведомления', 'Только если разрешите',
        'Уведомить вас при закрытом приложении',
        'Пока не выключите уведомления',
        'Подписка хранится, чтобы сервер мог доставить уведомление; доставляет его служба вашего браузера или телефона.'],
      ['Прослушивание музыки', 'Да, внутри приложения',
        'Счётчик прослушиваний и построение вашей личной очереди',
        'Пока трек или учётная запись не удалены',
        'Общее число прослушиваний видно всем в библиотеке; <b>ваша личная история прослушивания — ваша и другим не показывается</b>.'],
    ],

    thirdH: 'Сторонние службы',
    thirdP: 'NeyLivo не держит свою инфраструктуру. Эти службы участвуют в его работе, и каждая из них как минимум видит IP-адрес устройства, которое к ней подключается.',
    thirdCols: ['Служба', 'Что делает', 'Когда к ней обращаются'],
    third: [
      ['Supabase', 'База данных, учётные записи, хранилище файлов, соединение реального времени', 'Постоянно, пока приложение открыто'],
      ['LiveKit', 'Голос, видео и демонстрация экрана', 'Во время звонка'],
      ['jsDelivr (CDN)', 'Картинки эмодзи', '<b>Всегда, без каких-либо ваших действий</b> — потому что в интерфейсе есть эмодзи. Положить их в сборку запланировано.'],
      ['Tenor (Google)', 'Поиск GIF', 'Когда открываете панель GIF'],
      ['lrclib.net', 'Тексты песен', 'Когда запрашивается текст трека'],
      ['Audius, SoundCloud, YouTube', 'Воспроизведение музыки, добавленной ссылкой', 'Когда такой трек добавляют или включают'],
      ['Deezer, iTunes', 'Сведения о треке и обложки', 'При поиске трека'],
      ['SteamGridDB', 'Обложки игр', 'Когда показывается активность с игрой'],
      ['OpenDota', 'Статистика Dota 2', 'Только если вы запросили её в профиле'],
      ['Hugging Face', 'Скачивание модели распознавания речи', 'Только по нажатию кнопки, которой она нужна'],
      ['GitHub', 'Проверка и загрузка обновлений', 'При проверке обновления'],
      ['Render', 'Аварийный чат', 'Только когда основной сервер долго недоступен'],
    ],
    thirdNote: 'Шрифты приложение с чужого CDN не грузит: они лежат в сборке — именно затем, чтобы запуск NeyLivo не сообщал ваш IP постороннему ещё до входа в учётную запись.',

    pluginH: 'Плагины и ваши данные',
    pluginP: 'Плагину доступно только то, на что даны разрешения, и список вы видите до установки. Но плагин с разрешением «отправлять сообщения» действительно сможет писать от вашего имени, а плагин с доступом в сеть — действительно сможет отправить данные на объявленные им домены. В этом и смысл экрана разрешений: установленный плагин действует вашими руками.',
    pluginP2: 'Прочитать вашу сессию, пароль или ключи шифрования плагин не может — браузер не даёт ему доступа ни к чему из этого.',

    controlH: 'Что решаете вы',
    controlL: [
      'Включить сквозное шифрование для сообщений, вложений и звонков',
      'Выбрать, кто может прислать вам заявку в друзья, кто может писать и кто может звонить',
      'Заблокировать человека — тогда ничего не проходит ни в одну сторону',
      'Удалить отдельные сообщения или учётную запись со всеми данными прямо из приложения',
      'Выключить уведомления совсем или по серверам и каналам',
      'Выключить защиту от съёмки экрана, размытие сообщений, показ присутствия и активности',
    ],

    siteH: 'Этот сайт',
    siteP: 'Сайт, который вы читаете, — статические страницы на GitHub Pages. Он не ставит куки, не содержит аналитики, ничего не встраивает с чужих серверов и не подгружает внешних шрифтов и скриптов. GitHub, который отдаёт страницы, видит сам запрос — это неизбежно для любого размещённого сайта.',

    changeH: 'Изменения',
    changeP: 'Когда на этой странице меняется что-то существенное, вместе с ней меняется дата наверху. Страница собирается из репозитория, поэтому её история открыта так же, как и всё остальное.',
    more: 'Технические подробности за этими ответами — на <a href="/ru/security/">странице безопасности</a>.',
  },
}

export default {
  slug: 'privacy',
  title: (lang) => t[lang].title,
  description: (lang) => t[lang].desc,

  body: (ctx, lang) => {
    const s = t[lang]
    const li = (arr) => arr.map((x) => `<li>${x}</li>`).join('\n    ')

    const table = (cols, rows) => `
  <div class="tbl-scroll">
    <table>
      <thead><tr>${cols.map((c) => `<th scope="col">${c}</th>`).join('')}</tr></thead>
      <tbody>
        ${rows.map((r) => `<tr>${r.map((c, i) => i === 0
          ? `<th scope="row">${c}</th>` : `<td>${c}</td>`).join('')}</tr>`).join('\n        ')}
      </tbody>
    </table>
  </div>`

    return `
<section class="page-head">
  <div class="wrap">
    <p class="eyebrow">${lang === 'en' ? 'Privacy' : 'Приватность'}</p>
    <h1>${s.h1}</h1>
    <p class="lede">${s.lede}</p>
    <p class="stamp">${s.updated}: ${DATE_LABEL[lang]}</p>
  </div>
</section>

<section class="wrap prose">
  <h2 class="mt0">${s.shortH}</h2>
  <ul>${li([s.short1, s.short2, s.short3, s.short4, s.short5])}</ul>
</section>

<section class="wrap">
  <h2>${s.tblH}</h2>
  <p class="muted">${s.tblNote}</p>
  ${table(s.cols, s.rows)}
</section>

<section class="wrap">
  <h2>${s.thirdH}</h2>
  <p class="prose">${s.thirdP}</p>
  ${table(s.thirdCols, s.third)}
  <p class="prose">${s.thirdNote}</p>
</section>

<section class="wrap prose">
  <h2>${s.pluginH}</h2>
  <p>${s.pluginP}</p>
  <p>${s.pluginP2}</p>

  <h2>${s.controlH}</h2>
  <ul>${li(s.controlL)}</ul>

  <h2>${s.siteH}</h2>
  <p>${s.siteP}</p>

  <h2>${s.changeH}</h2>
  <p>${s.changeP}</p>
  <p>${s.more}</p>
  <p><a href="${urlFor('security', lang)}">${lang === 'en' ? 'Security page' : 'Страница безопасности'} →</a>
     &nbsp;·&nbsp; <a href="${urlFor('transparency', lang)}">${lang === 'en' ? 'Transparency' : 'Прозрачность'} →</a></p>
</section>
`
  },
}
