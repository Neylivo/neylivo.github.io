import { urlFor, REPO_URL, DATE_LABEL } from '../site.mjs'

const t = {
  en: {
    title: 'Ponoi Security — Security Architecture and Privacy',
    desc: 'How Ponoi protects messages, files, calls and accounts: end-to-end encryption for direct messages, plugin isolation, the threat model and the known limitations.',
    h1: 'Ponoi Security',
    lede: 'This page describes what actually protects your data in Ponoi, and what does not. Where a protection is optional, off by default, or unproven, that is written here rather than left out.',
    toc: 'On this page',
    updated: 'Last updated',

    s: {
      philosophy: 'Security philosophy',
      messages: 'Message protection',
      transport: 'Transport security',
      account: 'Account security',
      password: 'Password storage',
      files: 'Attachments',
      calls: 'Voice and video',
      isolation: 'Plugin isolation',
      perms: 'Plugin permissions',
      net: 'Network permissions',
      meta: 'Metadata',
      infra: 'Infrastructure',
      threat: 'Threat model',
      limits: 'Known limitations',
      report: 'Reporting vulnerabilities',
    },

    philP1: 'Three rules the project holds itself to.',
    philL1: '<b>No claim without code behind it.</b> Everything on this page corresponds to something in the public source. If a protection is not implemented, it is not described as if it were.',
    philL2: '<b>No silent downgrade.</b> When encryption cannot be applied, the message is not sent at all and you are told why. A protection that quietly turns itself off is worse than no protection, because people keep trusting it.',
    philL3: '<b>Name the limits.</b> An honest limitation is more useful than a confident slogan. The limitations section below is not an afterthought — it is the point of the page.',

    msgP1: 'Direct messages between two people can be encrypted end to end. When it is on, the server stores ciphertext it has no key for.',
    msgSpec: [
      ['Key agreement', 'ECDH on the P-256 curve. X25519 would be preferable, but it is not available in the WebCrypto implementation the app must run on.'],
      ['Key derivation', 'HKDF-SHA256, with the purpose and the pair of devices bound into the derivation, so a key from one context is useless in another.'],
      ['Encryption', 'AES-256-GCM. GCM also authenticates: ciphertext altered on the server fails to decrypt rather than decrypting into something else.'],
      ['Keys belong to devices', 'Each device has its own key pair. The private part is stored in IndexedDB as a CryptoKey and is never sent anywhere in the clear.'],
      ['Length hiding', 'Message text is padded into fixed-size blocks before encryption, so ciphertext size no longer reveals whether you wrote “yes” or a page of text.'],
      ['Verification', 'Each key has a fingerprint — five groups of five digits — that two people can read out to each other to confirm nobody is in the middle.'],
      ['Multiple recipients', 'A per-message content key is wrapped separately for the other person’s devices and for your own, so your own second device can read your history.'],
    ],
    msgOff: '<b>This is a setting, and it is off until you turn it on</b> (Settings → Privacy). It applies to one-to-one direct messages only.',
    msgNot: 'Not end-to-end encrypted: group conversations and server channels. Those messages are stored so that the server can read them, and are protected by database access rules — the same model as most group chat products. If you need a conversation the server cannot read, use a one-to-one direct message with encryption on.',
    msgFail: 'If your correspondent has no published key — for example they have never opened a version that supports encryption — the message is <b>not sent</b>, and the app says so. It never falls back to plaintext behind your back.',

    transP: 'All traffic between the app and its backend goes over HTTPS/TLS, including the realtime connection (secure WebSocket) and file uploads. Plugins may only reach the network over <code>https:</code> and <code>wss:</code>; plain HTTP is refused.',
    transP2: 'The Windows app is downloaded over HTTPS and updates itself over HTTPS, checking the SHA-512 checksum published with the release. That checksum proves the file arrived intact — it is not a code-signing signature, and the installer is not code-signed.',

    accP: 'Accounts are handled by Supabase Auth. Sessions are JWT-based with refresh tokens, stored locally on your device (and additionally in native storage on Android so that an app update does not log you out).',
    accL: [
      '<b>Trusted devices.</b> Signing in from an unknown device marks it as new, and it stays limited until you confirm it. Your other devices are notified.',
      '<b>Recovery code.</b> Stored on the server only as a SHA-256 hash, never in readable form — a database leak does not hand out master keys to accounts.',
      '<b>QR sign-in.</b> You can log in on a new device by scanning a code with one that is already signed in.',
      '<b>Username or email.</b> Login by username goes through a dedicated endpoint that answers identically for “no such user” and “wrong password”, so it cannot be used to discover who exists.',
      '<b>Account deletion.</b> You can delete your account and its data from inside the app.',
    ],
    accNo: 'There is no two-factor authentication with an authenticator app yet. Trusted devices and the recovery code are a partial substitute, not a replacement.',

    passP: 'Ponoi does not store passwords. They are handled by Supabase Auth, which stores them as bcrypt hashes; the project writes no password storage code of its own.',
    passP2: 'The minimum password length is six characters, which is the platform default. That is short, and raising it is on the list of things to fix.',
    passP3: '<b>One consequence worth understanding.</b> Your encryption key can be backed up to the server, locked with your account password (PBKDF2-SHA256, 250 000 iterations, AES-256-GCM). This exists so that logging out does not destroy your message history. The cost: the same password is also what you type into the login form, so a malicious or compromised authentication server could capture it and unlock that backup. Ponoi protects your messages from outsiders and from a database leak; it does not protect them from whoever controls the server itself.',

    filesP: '<b>Attachments are the weakest part of Ponoi today, and it is being fixed.</b> Files you send are uploaded to cloud storage that is configured as public: anyone who has, or can construct, the link to a file can download it without logging in. Access rules protect the database, not this storage bucket.',
    filesP2: 'There is a switch that fixes this for direct messages: <b>encrypt attachments</b>. With it on, each file is encrypted in your browser with its own AES-256-GCM key before upload, stored under a neutral name with no file type, and the key travels inside the encrypted message — so it can only be obtained by decrypting the conversation. Like the other encryption switches, it is off by default.',
    filesP3: 'Until the storage layer is closed, treat anything you send without attachment encryption as a file that is technically public. This limitation is listed below and in the project’s own audit.',

    callsP: 'Calls run over LiveKit. Permission to call someone is decided on the server, not in the app: blocking and your “who can call me” setting are enforced by the service that issues the call token, so the check cannot be bypassed by a modified client.',
    callsP2: 'Calls between two people can be end-to-end encrypted, as a separate setting. The key is generated in your browser and delivered to the other person inside an encrypted message, so the call server never sees it.',
    callsP3: '<b>Marked experimental.</b> The encryption path is covered by tests in code, but it has never been verified in a real call between two devices. Until it has, it is not presented as proven. If the key cannot be delivered, the call proceeds unencrypted and says so on screen.',
    callsP4: 'Without call encryption, media is decrypted at the media server, as in any ordinary group call. Server voice channels are not end-to-end encrypted.',

    isoP: 'Plugin code does not run in the app. It runs in a Web Worker, which the browser gives no DOM, no cookies and no access to the page — so a plugin cannot read your session, cannot draw a fake login window, and cannot reach into the interface.',
    isoP2: 'Plugins that provide a full page (for games, visualisers, 3D scenes) get an <code>&lt;iframe sandbox="allow-scripts"&gt;</code> <b>without</b> <code>allow-same-origin</code>. That gives the page a unique opaque origin: it has its own DOM and can use WebGL, WebAssembly and audio, but it is a different origin from Ponoi and can touch neither the app’s document nor its storage.',
    isoP3: 'These are browser boundaries, not checks in our code that a clever plugin could talk its way around. Everything a plugin can do arrives through one dispatcher, and every call is checked against the permissions the plugin declared. There is a dedicated test suite that attacks these boundaries deliberately.',

    permP: 'Before installing anything, you see the plugin’s name, author, version and the exact list of what it is asking for, in plain language — for example “Send messages on your behalf” or “Reach the internet (only the listed sites)”. There are 23 such permissions.',
    permP2: '<b>Two things to know.</b> A plugin that declares <code>*</code> — or that declares nothing at all — asks for every permission, and the install screen shows this in red. And there are no quantitative limits: an installed plugin may send messages, make requests and run in the background as much as it likes. The app states this before you install, because the meaningful protection here is your decision, not a quota.',
    permP3: 'A plugin can be switched off or removed at any time.',

    netP: 'A plugin can only reach the internet if it has the network permission, and only the domains it declared in its header. The rules are enforced in one place for every way out — ordinary requests, streaming responses and persistent connections — so a second code path cannot drift out of sync with the first:',
    netL: [
      'Only <code>https:</code> and <code>wss:</code>; plain HTTP is refused',
      'Only the declared domains, or every domain if the plugin asked for that openly and you accepted it',
      'Never to Ponoi itself or to its backend — a plugin cannot use your session against the app',
      'Headers from an allowlist only; <code>Cookie</code> is never allowed',
    ],

    metaP: 'Encryption hides what you wrote. It does not hide that you wrote. Even with everything switched on, the server knows:',
    metaL: [
      'Which accounts exist, their usernames, avatars and profile fields',
      'Who is in a conversation with whom, and when messages were sent',
      'Which servers and channels you belong to',
      'That a call took place, between whom and for how long',
      'Approximate connection times, and the IP address your device connects from — as with any online service',
    ],
    metaP2: 'Message length is hidden by padding, and encrypted attachments carry no file name or type. The rest of the list above is metadata that Ponoi does not currently minimise.',

    infraP: 'Ponoi is not self-hosted infrastructure. It runs on:',
    infraL: [
      ['Supabase', 'Database, accounts, file storage and the realtime connection. Access is governed by row-level security rules, which are tested against a real Postgres on every change.'],
      ['LiveKit', 'Voice, video and screen sharing. Handles media only.'],
      ['GitHub', 'Source code, automated builds and the release files this site links to.'],
    ],
    infraP2: 'The <a href="/privacy/">privacy page</a> lists every third-party service the app talks to, including the ones that only see an IP address.',

    threatH1: 'What Ponoi protects against',
    threatL1: [
      'Someone else reading your one-to-one messages, with encryption on — including the operator of the database',
      'Another user reading data that is not theirs: access rules are enforced in the database, not in the app',
      'A malicious plugin stealing your session, faking the interface or calling home to an undeclared server',
      'Passive collection: there is no analytics, no crash reporting and no advertising code to leak anything',
      'Someone with your database dump reading your recovery code, or your key backup without your password',
    ],
    threatH2: 'What Ponoi does not protect against',
    threatL2: [
      'A malicious operator of the authentication server, who could capture your password as you log in and unlock your key backup',
      'Anyone reading group conversations or server channels at the database — those are not end-to-end encrypted',
      'Anyone downloading unencrypted attachments, which are in public storage today',
      'A compromised device: malware or someone with your unlocked computer sees what you see',
      'Traffic analysis: who talks to whom and when is visible to the server',
      'A photograph of your screen taken with another camera, whatever the capture protection setting says',
    ],

    limP: 'The list the project keeps of its own weak spots, in the order it intends to fix them:',
    limL: [
      '<b>Attachments are in public storage.</b> Files sent without attachment encryption can be downloaded by anyone with the link. The fix — closing the bucket and moving to signed links without breaking the millions of links already inside old messages — is planned in stages.',
      '<b>Encryption is off by default.</b> Privacy that only applies when found in the settings is privacy most people never get.',
      '<b>Group and channel messages are not end-to-end encrypted.</b> Group end-to-end encryption is a separate, larger design task and is not going to be improvised.',
      '<b>Call encryption is unverified in the field.</b> It works in tests; it has not been proven in a real call.',
      '<b>No Content-Security-Policy.</b> There is no known injection path today — messages are rendered as React nodes and there is no raw HTML insertion anywhere in the app — but CSP is the second line that catches tomorrow’s mistake.',
      '<b>Emoji images load from a public CDN.</b> That means a third party sees your IP address simply because the interface contains emoji. Bundling them is straightforward and planned.',
      '<b>Password minimum is six characters.</b> Too short.',
      '<b>No external security audit.</b> Nobody outside the project has reviewed any of this.',
    ],
    limP2: 'A full technical write-up of the same findings, with file references, is published in the repository as <code>SECURITY_ARCHITECTURE_AUDIT.md</code>.',

    repP: 'If you find a vulnerability, please report it privately first, and give it a chance to be fixed before it is public. That protects the people using Ponoi, not the project’s reputation.',
    repL: [
      'Use GitHub’s private vulnerability reporting on the repository, or open a minimal issue asking for a private channel — without the details.',
      'Include what you did, what happened, and why you believe it is a problem. A short reproduction is worth more than a long description.',
      'Please do not post working exploits, other people’s data or a public write-up before a fix exists.',
    ],
    repP2: 'There is no bug bounty. The project has no money to pay one, and promising one it cannot honour would be worse than saying this plainly.',
    repLink: 'Reporting policy in the repository',
  },

  ru: {
    title: 'Безопасность Ponoi — устройство защиты и её пределы',
    desc: 'Как Ponoi (Поной) защищает сообщения, файлы, звонки и учётные записи: сквозное шифрование личной переписки, изоляция плагинов, модель угроз и известные слабые места.',
    h1: 'Безопасность Ponoi',
    lede: 'Здесь описано, что в Ponoi действительно защищает ваши данные, а что нет. Если защита необязательна, выключена по умолчанию или не проверена в жизни — это написано, а не опущено.',
    toc: 'На этой странице',
    updated: 'Обновлено',

    s: {
      philosophy: 'Подход',
      messages: 'Защита сообщений',
      transport: 'Защита канала связи',
      account: 'Защита учётной записи',
      password: 'Хранение паролей',
      files: 'Вложения',
      calls: 'Голос и видео',
      isolation: 'Изоляция плагинов',
      perms: 'Разрешения плагинов',
      net: 'Доступ плагинов в сеть',
      meta: 'Метаданные',
      infra: 'Инфраструктура',
      threat: 'Модель угроз',
      limits: 'Известные слабые места',
      report: 'Как сообщить об уязвимости',
    },

    philP1: 'Три правила, которых проект держится.',
    philL1: '<b>Нет утверждения без кода за ним.</b> Всё на этой странице соответствует чему-то в открытом исходнике. Если защиты нет, о ней не пишут так, будто она есть.',
    philL2: '<b>Никакого тихого отката.</b> Если зашифровать не удалось, сообщение не отправляется вовсе и человек видит причину. Защита, которая молча выключается сама, хуже её отсутствия: в неё продолжают верить.',
    philL3: '<b>Пределы названы.</b> Честно названное ограничение полезнее уверенного лозунга. Раздел о слабых местах ниже — не приписка в конце, а смысл всей страницы.',

    msgP1: 'Личную переписку двух людей можно шифровать от устройства до устройства. Когда шифрование включено, на сервере лежит шифротекст, ключа от которого у сервера нет.',
    msgSpec: [
      ['Согласование ключа', 'ECDH на кривой P-256. X25519 был бы предпочтительнее, но в той реализации WebCrypto, где приложение обязано работать, его нет.'],
      ['Выведение ключа', 'HKDF-SHA256, причём в выведение вплетены назначение и пара устройств: ключ, годный в одном месте, бесполезен в другом.'],
      ['Шифрование', 'AES-256-GCM. GCM заодно проверяет целостность: изменённый на сервере шифротекст не расшифруется, а не расшифруется «во что-то другое».'],
      ['Ключи принадлежат устройству', 'У каждого устройства своя пара. Приватная часть лежит в IndexedDB как объект CryptoKey и никуда не уходит в открытом виде.'],
      ['Скрытие длины', 'Текст перед шифрованием укладывается в блок постоянного размера, и по длине шифротекста больше нельзя отличить «да» от страницы текста.'],
      ['Сверка', 'У каждого ключа есть отпечаток — пять групп по пять цифр. Двое могут прочитать его друг другу вслух и убедиться, что между ними никого нет.'],
      ['Несколько получателей', 'Ключ содержимого запечатывается отдельно для устройств собеседника и отдельно для ваших — иначе вы не прочитали бы собственную переписку со второго устройства.'],
    ],
    msgOff: '<b>Это настройка, и по умолчанию она выключена</b> (Настройки → Приватность). Она действует только на личную переписку один на один.',
    msgNot: 'Сквозным шифрованием не защищены: групповые беседы и каналы серверов. Эти сообщения хранятся так, что сервер может их прочитать, и защищены правилами доступа к базе — та же модель, что у большинства групповых мессенджеров. Если нужна переписка, которую сервер прочитать не может, — это личная переписка один на один с включённым шифрованием.',
    msgFail: 'Если у собеседника нет опубликованного ключа — например, он ни разу не заходил с версией, которая умеет шифровать, — сообщение <b>не отправляется</b>, и приложение говорит об этом. Тихо перейти на открытый текст оно не может.',

    transP: 'Весь обмен приложения с сервером идёт по HTTPS/TLS, включая соединение реального времени (защищённый WebSocket) и загрузку файлов. Плагину доступны только <code>https:</code> и <code>wss:</code>, обычный HTTP отклоняется.',
    transP2: 'Приложение для Windows скачивается по HTTPS и обновляется по HTTPS, сверяя контрольную сумму SHA-512, опубликованную вместе с выпуском. Эта сумма подтверждает, что файл дошёл целым; подписью кода она не является, и установщик сертификатом не подписан.',

    accP: 'Учётными записями занимается Supabase Auth. Сессия — это JWT с токеном обновления, который хранится локально на устройстве (а на Android дополнительно в нативном хранилище, чтобы обновление приложения не выкидывало из аккаунта).',
    accL: [
      '<b>Доверенные устройства.</b> Вход с незнакомого устройства помечает его как новое, и оно остаётся ограниченным, пока его не подтвердят. Остальные устройства получают оповещение.',
      '<b>Код восстановления.</b> На сервере хранится только его отпечаток SHA-256, никогда сам код: утечка базы не раздаёт главные ключи от учётных записей.',
      '<b>Вход по QR.</b> На новом устройстве можно войти, отсканировав код тем, где вход уже выполнен.',
      '<b>Юзернейм или почта.</b> Вход по юзернейму идёт через отдельную функцию, которая отвечает одинаково на «такого нет» и «пароль неверный», — по ней нельзя узнать, кто существует.',
      '<b>Удаление учётной записи.</b> Учётную запись и её данные можно удалить прямо из приложения.',
    ],
    accNo: 'Двухфакторной проверки с приложением-аутентификатором пока нет. Доверенные устройства и код восстановления — частичная замена, а не полная.',

    passP: 'Ponoi не хранит пароли. Ими занимается Supabase Auth, который держит их как хеши bcrypt; собственного кода хранения паролей в проекте нет.',
    passP2: 'Минимальная длина пароля — шесть символов, это значение платформы по умолчанию. Это мало, и поднять порог — в списке того, что надо исправить.',
    passP3: '<b>Одно следствие, которое стоит понимать.</b> Ключ шифрования можно положить на сервер резервной копией, запертой паролем от учётной записи (PBKDF2-SHA256, 250 000 повторов, AES-256-GCM). Это сделано, чтобы выход из аккаунта не уничтожал переписку. Цена: тот же пароль вводится в форму входа, и недобросовестный или взломанный сервер аутентификации мог бы перехватить его и открыть эту копию. Ponoi защищает переписку от постороннего и от утечки базы, но не от того, кто управляет самим сервером.',

    filesP: '<b>Вложения — самое слабое место Ponoi сегодня, и оно исправляется.</b> Отправленные файлы загружаются в облачное хранилище, настроенное как публичное: любой, у кого есть ссылка на файл или кто сможет её составить, скачает его без входа. Правила доступа защищают базу данных, но не это хранилище.',
    filesP2: 'Для личной переписки есть переключатель, который это чинит: <b>шифровать вложения</b>. С ним каждый файл шифруется прямо в браузере своим ключом AES-256-GCM ещё до отправки, лежит под нейтральным именем и без типа, а ключ едет внутри зашифрованного сообщения — то есть достать его можно, только расшифровав переписку.  Как и остальные переключатели шифрования, по умолчанию он выключен.',
    filesP3: 'Пока хранилище не закрыто, считайте всё отправленное без шифрования вложений технически общедоступным. Это ограничение перечислено ниже и в собственном аудите проекта.',

    callsP: 'Звонки идут через LiveKit. Право позвонить решает сервер, а не приложение: блокировка и настройка «кто может мне звонить» проверяются в той службе, которая выдаёт пропуск в звонок, поэтому обойти проверку изменённым клиентом нельзя.',
    callsP2: 'Звонок двух людей можно зашифровать сквозным шифрованием — отдельной настройкой. Ключ вырабатывается в браузере и уезжает собеседнику внутри зашифрованного сообщения, так что сервер звонков его не видит.',
    callsP3: '<b>Помечено экспериментальным.</b> Этот путь покрыт проверками в коде, но ни разу не проверен настоящим звонком между двумя устройствами. Пока это не сделано, он не выдаётся за доказанный. Если ключ доставить не удалось, звонок идёт незашифрованным и прямо об этом сообщает.',
    callsP4: 'Без шифрования звонка поток расшифровывается на медиасервере — как в любом обычном групповом звонке. Голосовые каналы серверов сквозным шифрованием не защищены.',

    isoP: 'Код плагина работает не в приложении. Он работает в Web Worker, которому браузер не даёт ни DOM, ни куки, ни доступа к странице, — поэтому плагин не может прочитать вашу сессию, не может нарисовать поддельное окно входа и не может влезть в интерфейс.',
    isoP2: 'Плагинам, которым нужна целая страница (игры, визуализаторы, 3D-сцены), достаётся <code>&lt;iframe sandbox="allow-scripts"&gt;</code> <b>без</b> <code>allow-same-origin</code>. Это даёт странице уникальное чужое происхождение: у неё есть свой DOM, работают WebGL, WebAssembly и звук, но она — другое происхождение, и ни документа Ponoi, ни его хранилища ей не достаётся.',
    isoP3: 'Это границы браузера, а не наши проверки, которые хитрый плагин уговорит. Всё, что плагину доступно, проходит через один диспетчер, и каждый вызов сверяется с объявленными разрешениями. На попытки обхода есть отдельный набор проверок, который нарочно штурмует эти границы.',

    permP: 'Перед установкой видно имя плагина, автора, версию и точный список того, что он просит, человеческими словами — например «Отправлять сообщения от твоего имени» или «Обращаться в интернет (только к указанным сайтам)». Всего таких разрешений 23.',
    permP2: '<b>Две вещи, которые надо знать.</b> Плагин, объявивший <code>*</code> — или не объявивший ничего, — просит все разрешения сразу, и на экране установки это показано красным. И количественных пределов нет: установленный плагин может отправлять сообщения, ходить в сеть и работать в фоне сколько угодно. Приложение говорит об этом до установки, потому что настоящая защита здесь — ваше решение, а не квота.',
    permP3: 'Плагин можно в любой момент выключить или удалить.',

    netP: 'В интернет плагин выходит, только если у него есть разрешение на сеть, и только на домены, объявленные им в шапке. Правила проверяются в одном месте для всех способов выйти — обычный запрос, поток и постоянное соединение, — чтобы второй путь не разошёлся с первым:',
    netL: [
      'Только <code>https:</code> и <code>wss:</code>, обычный HTTP отклоняется',
      'Только объявленные домены — или любые, если плагин попросил об этом открыто и человек согласился',
      'Никогда к самому Ponoi и его серверу: плагин не может обратить вашу сессию против приложения',
      'Заголовки только из белого списка; <code>Cookie</code> не разрешён никогда',
    ],

    metaP: 'Шифрование скрывает, что вы написали. Оно не скрывает, что вы писали. Даже со всеми включёнными настройками серверу известно:',
    metaL: [
      'Какие учётные записи существуют, их имена, аватары и поля профиля',
      'Кто с кем переписывается и когда отправлялись сообщения',
      'В каких серверах и каналах вы состоите',
      'Что состоялся звонок, между кем и сколько он длился',
      'Примерное время подключений и IP-адрес, с которого устройство подключается, — как у любой сетевой службы',
    ],
    metaP2: 'Длина сообщения скрыта дополнением, а у зашифрованного вложения нет ни имени файла, ни типа. Остальное из списка выше — метаданные, которые Ponoi сейчас не сокращает.',

    infraP: 'Ponoi не держит собственную инфраструктуру. Он работает на:',
    infraL: [
      ['Supabase', 'База данных, учётные записи, хранилище файлов и соединение реального времени. Доступ определяют правила уровня строк, которые проверяются на настоящем Postgres при каждом изменении.'],
      ['LiveKit', 'Голос, видео и демонстрация экрана. Занимается только медиапотоком.'],
      ['GitHub', 'Исходный код, автоматическая сборка и файлы выпусков, на которые ведёт этот сайт.'],
    ],
    infraP2: 'На <a href="/ru/privacy/">странице приватности</a> перечислены все сторонние службы, с которыми разговаривает приложение, включая те, что видят только IP-адрес.',

    threatH1: 'От чего Ponoi защищает',
    threatL1: [
      'От чтения вашей переписки один на один посторонним — при включённом шифровании, включая того, кто держит базу данных',
      'От чтения чужих данных другим пользователем: правила доступа работают в базе, а не в приложении',
      'От плагина, который захотел бы украсть сессию, подделать интерфейс или отчитаться на необъявленный сервер',
      'От пассивного сбора: нет ни аналитики, ни сбора падений, ни рекламного кода, которым что-то утекало бы',
      'От чтения кода восстановления по дампу базы и от вскрытия резервной копии ключа без пароля',
    ],
    threatH2: 'От чего Ponoi не защищает',
    threatL2: [
      'От недобросовестного владельца сервера аутентификации: он мог бы перехватить пароль при входе и открыть резервную копию ключа',
      'От чтения групповых бесед и каналов серверов в базе — они не защищены сквозным шифрованием',
      'От скачивания незашифрованных вложений: сегодня они лежат в публичном хранилище',
      'От взломанного устройства: вредоносная программа или человек за вашим разблокированным компьютером видит то же, что и вы',
      'От анализа связей: кто с кем и когда общается, серверу видно',
      'От снимка вашего экрана другой камерой — что бы ни было включено в защите от съёмки',
    ],

    limP: 'Список слабых мест, который проект ведёт сам, в том порядке, в каком собирается их закрывать:',
    limL: [
      '<b>Вложения в публичном хранилище.</b> Файлы, отправленные без шифрования вложений, скачает любой, у кого есть ссылка. Исправление — закрыть хранилище и перейти на подписанные ссылки, не сломав те ссылки, что уже лежат внутри старых сообщений, — запланировано и делается по шагам.',
      '<b>Шифрование выключено по умолчанию.</b> Приватность, которая работает только у того, кто нашёл её в настройках, — это приватность, которой большинство не получает.',
      '<b>Групповые беседы и каналы не защищены сквозным шифрованием.</b> Групповое сквозное шифрование — отдельная и большая задача, и придумывать её на ходу никто не будет.',
      '<b>Шифрование звонков не проверено в жизни.</b> В проверках оно работает; настоящим звонком не подтверждено.',
      '<b>Нет Content-Security-Policy.</b> Известного пути для внедрения кода сегодня нет — сообщения рисуются узлами React, и вставки сырого HTML в приложении нет нигде, — но CSP это второй рубеж, который ловит завтрашнюю ошибку.',
      '<b>Картинки эмодзи грузятся с чужого CDN.</b> Значит, посторонний видит ваш IP просто потому, что в интерфейсе есть эмодзи. Положить их в сборку несложно, и это запланировано.',
      '<b>Минимальная длина пароля — шесть символов.</b> Мало.',
      '<b>Внешнего аудита не было.</b> Никто со стороны всё это не проверял.',
    ],
    limP2: 'Полный технический разбор тех же находок, со ссылками на файлы, опубликован в репозитории как <code>SECURITY_ARCHITECTURE_AUDIT.md</code>.',

    repP: 'Если вы нашли уязвимость, сообщите о ней сначала лично и дайте шанс её починить до того, как о ней узнают все. Это защищает людей, которые пользуются Ponoi, а не репутацию проекта.',
    repL: [
      'Воспользуйтесь приватным сообщением об уязвимости в репозитории на GitHub или заведите короткое обращение с просьбой о личном канале — без подробностей.',
      'Опишите, что вы сделали, что произошло и почему считаете это проблемой. Короткое воспроизведение ценнее длинного описания.',
      'Пожалуйста, не публикуйте рабочие эксплойты, чужие данные и разбор до того, как появилось исправление.',
    ],
    repP2: 'Вознаграждения за уязвимости нет. Платить проекту нечем, а пообещать то, чего он не выполнит, было бы хуже, чем сказать это прямо.',
    repLink: 'Правила сообщения об уязвимостях в репозитории',
  },
}

export default {
  slug: 'security',
  title: (lang) => t[lang].title,
  description: (lang) => t[lang].desc,

  body: (ctx, lang) => {
    const s = t[lang]
    const S = s.s
    const li = (arr) => arr.map((x) => `<li>${x}</li>`).join('\n    ')
    const toc = Object.entries(S)

    return `
<section class="page-head">
  <div class="wrap">
    <p class="eyebrow">${lang === 'en' ? 'Security' : 'Безопасность'}</p>
    <h1>${s.h1}</h1>
    <p class="lede">${s.lede}</p>
    <p class="stamp">${s.updated}: ${DATE_LABEL[lang]} · Ponoi ${ctx.release.version}</p>
  </div>
</section>

<section class="wrap">
  <nav class="toc" aria-label="${s.toc}">
    <h2>${s.toc}</h2>
    <ul>${toc.map(([id, name]) => `<li><a href="#${id}">${name}</a></li>`).join('')}</ul>
  </nav>
</section>

<section class="wrap prose" id="philosophy">
  <h2 class="mt0">${S.philosophy}</h2>
  <p>${s.philP1}</p>
  <ul>${li([s.philL1, s.philL2, s.philL3])}</ul>
</section>

<section class="wrap prose" id="messages">
  <h2>${S.messages}</h2>
  <p>${s.msgP1}</p>
</section>
<div class="wrap">
  <dl class="spec">
    ${s.msgSpec.map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join('\n    ')}
  </dl>
</div>
<section class="wrap prose">
  <div class="note note-key"><p>${s.msgOff}</p></div>
  <p>${s.msgNot}</p>
  <p>${s.msgFail}</p>
</section>

<section class="wrap prose" id="transport">
  <h2>${S.transport}</h2>
  <p>${s.transP}</p>
  <p>${s.transP2}</p>
</section>

<section class="wrap prose" id="account">
  <h2>${S.account}</h2>
  <p>${s.accP}</p>
  <ul>${li(s.accL)}</ul>
  <p>${s.accNo}</p>
</section>

<section class="wrap prose" id="password">
  <h2>${S.password}</h2>
  <p>${s.passP}</p>
  <p>${s.passP2}</p>
  <div class="note note-warn"><p>${s.passP3}</p></div>
</section>

<section class="wrap prose" id="files">
  <h2>${S.files}</h2>
  <div class="note note-warn"><p>${s.filesP}</p></div>
  <p>${s.filesP2}</p>
  <p>${s.filesP3}</p>
</section>

<section class="wrap prose" id="calls">
  <h2>${S.calls}</h2>
  <p>${s.callsP}</p>
  <p>${s.callsP2}</p>
  <div class="note note-warn"><p>${s.callsP3}</p></div>
  <p>${s.callsP4}</p>
</section>

<section class="wrap prose" id="isolation">
  <h2>${S.isolation}</h2>
  <p>${s.isoP}</p>
  <p>${s.isoP2}</p>
  <p>${s.isoP3}</p>
</section>

<section class="wrap prose" id="perms">
  <h2>${S.perms}</h2>
  <p>${s.permP}</p>
  <p>${s.permP2}</p>
  <p>${s.permP3}</p>
</section>

<section class="wrap prose" id="net">
  <h2>${S.net}</h2>
  <p>${s.netP}</p>
  <ul>${li(s.netL)}</ul>
</section>

<section class="wrap prose" id="meta">
  <h2>${S.meta}</h2>
  <p>${s.metaP}</p>
  <ul>${li(s.metaL)}</ul>
  <p>${s.metaP2}</p>
</section>

<section class="wrap prose" id="infra">
  <h2>${S.infra}</h2>
  <p>${s.infraP}</p>
  <ul>${li(s.infraL.map(([k, v]) => `<b>${k}.</b> ${v}`))}</ul>
  <p>${s.infraP2}</p>
</section>

<section class="band band-alt" id="threat">
  <div class="wrap">
    <h2 class="mt0">${S.threat}</h2>
    <div class="grid g2">
      <article class="card">
        <h3>${s.threatH1}</h3>
        <ul>${li(s.threatL1)}</ul>
      </article>
      <article class="card">
        <h3>${s.threatH2}</h3>
        <ul>${li(s.threatL2)}</ul>
      </article>
    </div>
  </div>
</section>

<section class="wrap prose" id="limits">
  <h2>${S.limits}</h2>
  <p>${s.limP}</p>
  <ol>${li(s.limL)}</ol>
  <p>${s.limP2} <a href="${REPO_URL}/blob/main/SECURITY_ARCHITECTURE_AUDIT.md" rel="noopener">${lang === 'en' ? 'Open the audit' : 'Открыть аудит'} →</a></p>
</section>

<section class="wrap prose" id="report">
  <h2>${S.report}</h2>
  <p>${s.repP}</p>
  <ul>${li(s.repL)}</ul>
  <p>${s.repP2}</p>
  <p><a href="${REPO_URL}/blob/main/SECURITY.md" rel="noopener">${s.repLink} →</a>
     &nbsp;·&nbsp; <a href="${urlFor('privacy', lang)}">${lang === 'en' ? 'Privacy page' : 'Страница приватности'} →</a></p>
</section>
`
  },
}
