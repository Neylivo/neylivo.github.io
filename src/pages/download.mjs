import { APP_URL, urlFor, RELEASES_URL } from '../site.mjs'
import { sizeMB, fmtDate } from '../release.mjs'

const t = {
  en: {
    title: 'Download Ponoi for Windows, Android and Web',
    desc: 'Download Ponoi directly: the Windows installer, the Android APK, or open the web app in your browser. Free, no account needed to download.',
    h1: 'Download Ponoi',
    lede: 'Files come straight from this page. Pick a platform and the download starts — no account, no store, no detour.',
    rec: 'Recommended for your device',

    win: 'Windows',
    winBtn: 'Download for Windows',
    winReq: 'Windows 10 or 11, 64-bit. Installs for the current user, no administrator rights needed.',
    winNote: '<b>Windows may warn you about an unrecognised app.</b> The installer is not code-signed — a signing certificate costs money the project does not spend. In the SmartScreen dialog, choose “More info” and then “Run anyway”. Never turn off your antivirus or SmartScreen to install anything, including this.',
    winUpd: 'The Windows app updates itself: new versions are downloaded in the background and installed when you close the window.',

    and: 'Android',
    andBtn: 'Download APK',
    andReq: 'Android 7.0 or newer. Installed manually from the APK file — Ponoi is not on Google Play.',
    andNote: '<b>Android will ask for permission to install apps from this source.</b> That prompt is normal for any app installed outside the store: allow it for the browser or file manager you opened the file with. You do not need to disable Play Protect or any other system protection.',
    andUpd: 'The app checks for new versions itself and offers to install them.',

    web: 'Web',
    webBtn: 'Open Ponoi',
    webReq: 'Any modern browser: Chrome, Edge, Firefox, Safari. Nothing to install.',
    webNote: 'On a phone you can add the web version to the home screen and it will behave like an installed app.',

    verifyH: 'Verifying what you downloaded',
    verifyP: 'Every release is built by GitHub Actions from the public source code, and the files are published as release assets. The buttons above link straight to those files. You can compare what you downloaded against the release page:',
    verifyLink: 'All releases and their files',
    verifyNote: 'The Windows installer is not code-signed and the APK is signed with the project’s own key, not a store key. That means the file’s origin can be checked by where it came from, not by a certificate authority.',

    sysH: 'Which one should I take?',
    sysWin: 'Use the Windows app if Ponoi is something you keep open: it lives in the tray, keeps notifications working when the window is closed, records clips and can show a call overlay on top of games.',
    sysAnd: 'Use the Android app for the phone. Same account, same servers and conversations.',
    sysWeb: 'Use the web version to try Ponoi in thirty seconds, or on a machine where you cannot install software.',

    ver: 'Version', size: 'Size', req: 'Requirements', rel: 'Released', upd: 'Updates',
    other: 'Other platforms',
    noAsset: 'The file for this platform is not attached to the latest release. Check the releases page.',
    changelog: 'What changed in this version',
  },

  ru: {
    title: 'Скачать Поной для Windows, Android и веба',
    desc: 'Скачать Ponoi (Поной) напрямую: установщик для Windows, APK для Android или открыть веб-версию в браузере. Бесплатно, учётная запись для скачивания не нужна.',
    h1: 'Скачать Ponoi',
    lede: 'Файлы отдаются прямо с этой страницы. Выбираешь платформу — начинается загрузка. Без учётной записи, без магазина, без обходных путей.',
    rec: 'Похоже, это ваша платформа',

    win: 'Windows',
    winBtn: 'Скачать для Windows',
    winReq: 'Windows 10 или 11, 64 бита. Ставится для текущего пользователя, права администратора не нужны.',
    winNote: '<b>Windows может предупредить о неизвестном приложении.</b> Установщик не подписан сертификатом — сертификат стоит денег, которых у проекта нет. В окне SmartScreen нажми «Подробнее», затем «Выполнить в любом случае». Отключать антивирус или SmartScreen ради установки не нужно — ни ради этого приложения, ни ради какого-либо другого.',
    winUpd: 'Приложение обновляется само: новая версия скачивается в фоне и ставится, когда закрываешь окно.',

    and: 'Android',
    andBtn: 'Скачать APK',
    andReq: 'Android 7.0 и новее. Ставится вручную из файла APK — в Google Play приложения нет.',
    andNote: '<b>Android попросит разрешение на установку приложений из этого источника.</b> Такой запрос появляется для любого приложения не из магазина: разреши его браузеру или файловому менеджеру, которым открываешь файл. Отключать Play Защиту или другую системную защиту не нужно.',
    andUpd: 'Приложение само проверяет новые версии и предлагает их поставить.',

    web: 'Веб',
    webBtn: 'Открыть Ponoi',
    webReq: 'Любой современный браузер: Chrome, Edge, Firefox, Safari. Ставить ничего не надо.',
    webNote: 'На телефоне веб-версию можно добавить на главный экран — дальше она ведёт себя как установленное приложение.',

    verifyH: 'Как проверить, что скачал',
    verifyP: 'Каждый выпуск собирается GitHub Actions из открытого исходного кода, а файлы прикладываются к выпуску. Кнопки выше ведут прямо на эти файлы. Сверить скачанное можно на странице выпусков:',
    verifyLink: 'Все выпуски и их файлы',
    verifyNote: 'Установщик Windows не подписан сертификатом, а APK подписан собственным ключом проекта, а не ключом магазина. Значит, происхождение файла подтверждается тем, откуда он взят, а не удостоверяющим центром.',

    sysH: 'Что выбрать',
    sysWin: 'Приложение для Windows — если Ponoi всегда открыт: оно живёт в трее, продолжает уведомлять при закрытом окне, записывает клипы и умеет показывать накладку звонка поверх игры.',
    sysAnd: 'Приложение для Android — для телефона. Та же учётная запись, те же серверы и переписка.',
    sysWeb: 'Веб-версия — чтобы посмотреть Ponoi за полминуты или на компьютере, куда нельзя ничего ставить.',

    ver: 'Версия', size: 'Размер', req: 'Требования', rel: 'Выпущено', upd: 'Обновления',
    other: 'Другие платформы',
    noAsset: 'Файл для этой платформы не приложен к последнему выпуску. Загляни на страницу выпусков.',
    changelog: 'Что изменилось в этой версии',
  },
}

export default {
  slug: 'download',
  title: (lang) => t[lang].title,
  description: (lang) => t[lang].desc,

  jsonld: (ctx, lang) => JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Ponoi',
    alternateName: 'Поной',
    applicationCategory: 'CommunicationApplication',
    operatingSystem: 'Windows, Android, Web',
    softwareVersion: ctx.release.version,
    url: 'https://ponoiai.github.io/download/',
    downloadUrl: ctx.release.windows?.url ?? 'https://ponoiai.github.io/download/',
    fileSize: ctx.release.windows ? String(ctx.release.windows.bytes) : undefined,
    datePublished: ctx.release.published ?? undefined,
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    inLanguage: [lang],
  }),

  body: (ctx, lang) => {
    const s = t[lang]
    const r = ctx.release
    const date = fmtDate(r.published, lang)

    const card = (os, a, label, req, note, upd) => `
      <article class="dl-card" id="${os}" data-os="${os}">
        <h2>${os === 'win' ? s.win : s.and}</h2>
        <p class="meta">
          <span>${s.ver} ${r.version}</span>
          ${a ? `<span>${sizeMB(a.bytes)}</span>` : ''}
          ${date ? `<span>${date}</span>` : ''}
        </p>
        ${a
          ? `<a class="btn btn-solid btn-big" href="${a.url}" data-dl>${label}</a>`
          : `<p class="note note-warn">${s.noAsset} <a href="${RELEASES_URL}" rel="noopener">${s.verifyLink}</a></p>`}
        <p class="muted" style="margin:0"><b>${s.req}:</b> ${req}</p>
        <p class="muted" style="margin:0"><b>${s.upd}:</b> ${upd}</p>
        <div class="note note-warn" style="margin:6px 0 0">${note}</div>
      </article>`

    return `
<section class="page-head">
  <div class="wrap">
    <p class="eyebrow">${lang === 'en' ? 'Download' : 'Загрузка'}</p>
    <h1>${s.h1}</h1>
    <p class="lede">${s.lede}</p>
  </div>
</section>

<section class="wrap" style="padding-top:26px">
  <div class="grid g3" data-dl-grid
       data-win="${r.windows?.url ?? ''}" data-and="${r.android?.url ?? ''}"
       data-rec="${s.rec}">
    ${card('win', r.windows, s.winBtn, s.winReq, s.winNote, s.winUpd)}
    ${card('and', r.android, s.andBtn, s.andReq, s.andNote, s.andUpd)}
    <article class="dl-card" id="web" data-os="web">
      <h2>${s.web}</h2>
      <p class="meta"><span>${lang === 'en' ? 'No installation' : 'Без установки'}</span></p>
      <a class="btn btn-quiet btn-big" href="${APP_URL}">${s.webBtn}</a>
      <p class="muted" style="margin:0"><b>${s.req}:</b> ${s.webReq}</p>
      <div class="note" style="margin:6px 0 0">${s.webNote}</div>
    </article>
  </div>
</section>

<section class="band">
  <div class="wrap prose">
    <h2 class="mt0">${s.sysH}</h2>
    <ul>
      <li>${s.sysWin}</li>
      <li>${s.sysAnd}</li>
      <li>${s.sysWeb}</li>
    </ul>

    <h2>${s.verifyH}</h2>
    <p>${s.verifyP}</p>
    <p><a href="${RELEASES_URL}" rel="noopener">${s.verifyLink} →</a>
       &nbsp;·&nbsp; <a href="${urlFor('changelog', lang)}">${s.changelog} →</a></p>
    <div class="note note-warn">${s.verifyNote}</div>
  </div>
</section>
`
  },
}
