import { urlFor, RELEASES_URL, REPO_URL } from '../site.mjs'
import { esc } from '../layout.mjs'

const t = {
  en: {
    title: 'NeyLivo Changelog — What Changed in Each Version',
    desc: 'Release history of NeyLivo (Нейливо): every version with its date and what was added, changed and fixed in it.',
    h1: 'Changelog',
    lede: 'Every version of NeyLivo and what changed in it. The list is generated from the project’s own history, so it matches what the app shows in its “What’s new” window.',
    note: 'Release notes are written in Russian, the language the project is developed in. Versions and dates are the same in both.',
    showing: 'Showing the most recent versions.',
    all: 'All releases with their files',
    dl: 'Download the current version',
    empty: 'The version history could not be loaded at build time. It is available on the releases page.',
  },
  ru: {
    title: 'Что нового в NeyLivo — история версий',
    desc: 'История выпусков NeyLivo (Нейливо): каждая версия с датой и списком того, что в ней добавлено, изменено и исправлено.',
    h1: 'Что нового',
    lede: 'Каждая версия NeyLivo и то, что в ней изменилось. Список собирается из собственной истории проекта, поэтому совпадает с тем, что показывает окно «Что нового» в самом приложении.',
    note: '',
    showing: 'Показаны последние версии.',
    all: 'Все выпуски и их файлы',
    dl: 'Скачать текущую версию',
    empty: 'Историю версий не удалось получить при сборке. Она есть на странице выпусков.',
  },
}

/** Помечает первое слово вроде «Добавлено:» — по нему список читается глазами. */
function item(line) {
  const m = /^(Добавлено|Изменено|Исправлено|Убрано|Безопасность|Added|Changed|Fixed|Removed|Security):\s*/.exec(line)
  if (!m) return esc(line)
  return `<b>${esc(m[1])}:</b> ${esc(line.slice(m[0].length))}`
}

export default {
  slug: 'changelog',
  title: (lang) => t[lang].title,
  description: (lang) => t[lang].desc,

  body: (ctx, lang) => {
    const s = t[lang]
    const log = ctx.changelog ?? []

    const body = log.length === 0
      ? `<p class="note note-warn">${s.empty}</p>`
      : log.map((v) => `
    <article class="prose" style="margin-bottom:34px">
      <h2 id="v${esc(v.version)}" style="margin-top:1.4em">NeyLivo ${esc(v.version)}
        <span class="muted" style="font-size:15px;font-weight:400;font-family:var(--mono)">${esc(v.date)}</span></h2>
      <ul>
        ${v.items.map((i) => `<li>${item(i)}</li>`).join('\n        ')}
      </ul>
    </article>`).join('\n')

    return `
<section class="page-head">
  <div class="wrap">
    <p class="eyebrow">${lang === 'en' ? 'Changelog' : 'История версий'}</p>
    <h1>${s.h1}</h1>
    <p class="lede">${s.lede}</p>
    <p class="stamp">${lang === 'en' ? 'Current version' : 'Текущая версия'}: ${ctx.release.version}</p>
  </div>
</section>

<section class="wrap">
  ${s.note ? `<div class="prose"><div class="note"><p>${s.note}</p></div></div>` : ''}
  <div class="prose">
    <p><a href="${urlFor('download', lang)}">${s.dl} →</a>
       &nbsp;·&nbsp; <a href="${RELEASES_URL}" rel="noopener">${s.all} →</a>
       &nbsp;·&nbsp; <a href="${REPO_URL}/commits/main" rel="noopener">${lang === 'en' ? 'Commit history' : 'История коммитов'} →</a></p>
    <p class="muted">${s.showing}</p>
  </div>
  ${body}
</section>
`
  },
}
