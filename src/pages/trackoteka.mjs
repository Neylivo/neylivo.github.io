import { urlFor } from '../site.mjs'

const t = {
  en: {
    title: 'Trackoteka — Music in NeyLivo',
    desc: 'Trackoteka (Трекотека) is NeyLivo’s integrated music system: a shared library, playlists, a personal queue, synced lyrics and listening together in one room.',
    h1: 'Trackoteka',
    lede: '<b>Trackoteka is NeyLivo’s integrated music experience.</b> Not a link to a streaming service bolted on the side — the library, the player and listening together are part of the messenger.',

    defH: 'What Trackoteka is',
    defP: 'Trackoteka (Russian: <b>Трекотека</b>) is the shared music library that sits at the centre of NeyLivo Music, the app’s built-in player. Tracks put into it are there for everyone who uses that library: you add a song, and the people you listen with have it too.',
    defP2: 'It exists because listening is something people do together. Sharing a link and pressing play at the same time is not listening together; being in the same room with the same queue is.',

    libH: 'The library',
    libL: [
      '<b>Upload audio files</b> from your device — they live in the library with their metadata, cover art and duration.',
      '<b>Add tracks by link.</b> YouTube plays through the official player, Audius streams directly, SoundCloud and direct audio links work too.',
      '<b>Covers and metadata</b> are looked up automatically, so a library assembled from files is not a wall of file names.',
      '<b>Search</b> across titles, artists and the names tracks were saved under.',
      '<b>Play counts.</b> The total for a track is shown to everyone; your own listening history is private and is not shown to anyone else.',
    ],
    linkNote: 'Links to Spotify, Apple Music, Yandex Music and Bandcamp are recognised and shown properly with title and cover, but they cannot be played in full by any third-party app — those services only allow playback in their own players. NeyLivo says so instead of pretending otherwise.',

    playH: 'The player',
    playL: [
      '<b>Playlists</b> that can be opened, renamed, reordered and played as a whole.',
      '<b>A queue that thinks.</b> What plays next is built around what you actually listen to, with unfamiliar tracks mixed in at the end, so the queue does not collapse into the same five favourites forever.',
      '<b>Play next</b> — put a track right after the current one, ahead of the normal order.',
      '<b>Lyrics.</b> Plain lyrics scroll behind the player; timed lyrics turn into karaoke, with the current line highlighted exactly as it is sung.',
      '<b>Visualisation.</b> A spectrum analyser and a live background that reacts to the music.',
      '<b>System integration.</b> Title, artist and cover appear in the Windows media panel and in the Android notification, and the media keys on your keyboard or headset work.',
      '<b>It remembers where you stopped</b> — the track and the position, but it does not start playing by itself.',
    ],

    togH: 'Listening together',
    togP: 'Open a lobby, share the code, and everyone hears the same thing at the same moment. The host controls what plays; listeners keep their own volume, because that is theirs and there is no reason to take it away.',
    togP2: 'While a lobby is running, listeners cannot skip, pause or remove tracks — those decisions affect everybody in the room. The app puts a line on screen saying exactly that, so the disabled buttons read as a rule rather than a bug.',

    aiH: 'Recognising lyrics',
    aiP: 'When a track has no lyrics anywhere, NeyLivo can listen to it and write them down itself, using a speech recognition model that runs on your device. The model is downloaded only when you press the button, and the audio never leaves your computer.',
    aiNote: 'Recognition is a fallback, not magic: it produces plain lyrics, not karaoke timing, and how well it does depends on the recording.',

    nameH: 'The name',
    nameP: '<b>Trackoteka</b> and <b>Трекотека</b> are the same thing — the word is used inside the app in Russian and transliterated here. It belongs to NeyLivo: there is no separate app, no separate account and no separate subscription.',

    ctaH: 'Try it',
    ctaP: 'Trackoteka is part of the app — there is nothing extra to install. Open NeyLivo and press the music button.',
  },

  ru: {
    title: 'Трекотека — музыка в NeyLivo',
    desc: 'Трекотека (Trackoteka) — встроенная музыкальная система NeyLivo: общая библиотека, плейлисты, личная очередь, синхронный текст песни и совместное прослушивание.',
    h1: 'Трекотека',
    lede: '<b>Трекотека — встроенная музыкальная система NeyLivo.</b> Не ссылка на стриминг сбоку: библиотека, проигрыватель и совместное прослушивание — часть мессенджера.',

    defH: 'Что такое Трекотека',
    defP: 'Трекотека (латиницей <b>Trackoteka</b>) — общая музыкальная библиотека, вокруг которой построена NeyLivo Music, встроенный проигрыватель приложения. Положенные в неё треки есть у всех, кто этой библиотекой пользуется: добавил песню — и она есть у тех, с кем вы слушаете.',
    defP2: 'Она существует потому, что музыку слушают вместе. Скинуть ссылку и нажать «играть» одновременно — это не «слушать вместе»; быть в одной комнате с одной очередью — это оно.',

    libH: 'Библиотека',
    libL: [
      '<b>Загрузка файлов</b> с устройства — они лежат в библиотеке со своими данными, обложкой и длительностью.',
      '<b>Добавление ссылкой.</b> YouTube играет через официальный проигрыватель, Audius отдаёт поток напрямую, работают SoundCloud и прямые ссылки на аудио.',
      '<b>Обложки и сведения о треке</b> подтягиваются сами, чтобы собранная из файлов библиотека не была стеной из имён файлов.',
      '<b>Поиск</b> по названию, исполнителю и по тому имени, под которым трек когда-то сохранили.',
      '<b>Счётчик прослушиваний.</b> Общее число по треку видно всем; ваша личная история прослушивания приватна и никому не показывается.',
    ],
    linkNote: 'Ссылки на Spotify, Apple Music, Яндекс.Музыку и Bandcamp распознаются и показываются как надо — с названием и обложкой, — но сыграть их целиком не может ни одно стороннее приложение: эти сервисы разрешают воспроизведение только в своих проигрывателях. NeyLivo говорит это прямо, а не делает вид, что умеет.',

    playH: 'Проигрыватель',
    playL: [
      '<b>Плейлисты</b>, которые открываются, переименовываются, переставляются и включаются целиком.',
      '<b>Очередь, которая думает.</b> Что заиграет дальше, строится вокруг того, что вы действительно слушаете, а в конец подмешивается незнакомое — иначе очередь схлопнулась бы в бесконечное повторение любимой пятёрки.',
      '<b>«Поставить следующим»</b> — трек играет сразу после текущего, вперёд обычного порядка.',
      '<b>Текст песни.</b> Обычный текст плывёт за проигрывателем; текст с метками времени превращается в караоке — строка подсвечивается ровно тогда, когда её поют.',
      '<b>Визуализация.</b> Спектр и живой фон, который отзывается на музыку.',
      '<b>Связь с системой.</b> Название, исполнитель и обложка попадают в панель Windows и в уведомление Android, работают кнопки на клавиатуре и на гарнитуре.',
      '<b>Помнит, где вы остановились</b> — и трек, и секунду, — но сам воспроизведение не включает.',
    ],

    togH: 'Слушать вместе',
    togP: 'Открываешь лобби, делишься кодом — и все слышат одно и то же в один и тот же момент. Ведущий решает, что играет; громкость у каждого своя, потому что она его и отбирать её не за что.',
    togP2: 'Пока идёт лобби, слушатели не переключают, не ставят на паузу и не удаляют треки — это решения, которые касаются всех в комнате. Приложение пишет об этом строкой на экране, чтобы выключенные кнопки читались как правило, а не как поломка.',

    aiH: 'Распознавание текста',
    aiP: 'Когда текста песни нет нигде, NeyLivo может послушать её и записать текст сам — моделью распознавания речи, которая работает на вашем устройстве. Модель скачивается только по нажатию кнопки, а звук никуда не уходит.',
    aiNote: 'Распознавание — это запасной путь, а не волшебство: получается обычный текст, без караоке-меток, и качество зависит от записи.',

    nameH: 'О названии',
    nameP: '<b>Трекотека</b> и <b>Trackoteka</b> — одно и то же; слово используется внутри приложения по-русски, здесь оно записано латиницей. Она принадлежит NeyLivo: отдельного приложения, отдельной учётной записи и отдельной подписки у неё нет.',

    ctaH: 'Попробовать',
    ctaP: 'Трекотека — часть приложения, ставить отдельно нечего. Открой NeyLivo и нажми кнопку музыки.',
  },
}

export default {
  slug: 'trackoteka',
  title: (lang) => t[lang].title,
  description: (lang) => t[lang].desc,

  body: (ctx, lang) => {
    const s = t[lang]
    const li = (arr) => arr.map((x) => `<li>${x}</li>`).join('\n    ')

    return `
<section class="page-head">
  <div class="wrap">
    <p class="eyebrow">Trackoteka · Трекотека</p>
    <h1>${s.h1}</h1>
    <p class="lede">${s.lede}</p>
  </div>
</section>

<section class="wrap prose">
  <h2 class="mt0">${s.defH}</h2>
  <p>${s.defP}</p>
  <p>${s.defP2}</p>
</section>

<section class="band band-alt">
  <div class="wrap">
    <div class="grid g2">
      <article class="card">
        <h3>${s.libH}</h3>
        <ul>${li(s.libL)}</ul>
      </article>
      <article class="card">
        <h3>${s.playH}</h3>
        <ul>${li(s.playL)}</ul>
      </article>
    </div>
    <div class="prose"><div class="note note-warn"><p>${s.linkNote}</p></div></div>
  </div>
</section>

<section class="band">
  <div class="wrap prose">
    <h2 class="mt0">${s.togH}</h2>
    <p>${s.togP}</p>
    <p>${s.togP2}</p>

    <h2>${s.aiH}</h2>
    <p>${s.aiP}</p>
    <div class="note"><p>${s.aiNote}</p></div>

    <h2>${s.nameH}</h2>
    <p>${s.nameP}</p>

    <h2>${s.ctaH}</h2>
    <p>${s.ctaP}</p>
    <div class="cta-row">
      <a class="btn btn-solid" href="${urlFor('download', lang)}">${lang === 'en' ? 'Download NeyLivo' : 'Скачать NeyLivo'}</a>
      <a class="btn btn-quiet" href="${urlFor('features', lang)}">${lang === 'en' ? 'All features' : 'Все возможности'}</a>
    </div>
  </div>
</section>
`
  },
}
