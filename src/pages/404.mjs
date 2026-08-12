// Страница «не найдено». Двуязычная одним куском: какой язык нужен человеку,
// попавшему на несуществующий адрес, заранее неизвестно, а GitHub Pages отдаёт
// один и тот же 404.html на весь сайт.

export default {
  slug: '404',
  title: () => 'Page not found — NeyLivo',
  description: () => 'This page does not exist. Links to the main pages of the NeyLivo website.',

  body: () => `
<section class="page-head">
  <div class="wrap">
    <p class="eyebrow">404</p>
    <h1>Page not found<br><span lang="ru">Страница не найдена</span></h1>
    <p class="lede">This address does not exist on the NeyLivo website.<br>
      <span lang="ru">Такого адреса на сайте NeyLivo нет.</span></p>
  </div>
</section>

<section class="wrap">
  <div class="grid g2">
    <article class="card">
      <h2 style="margin-top:0;font-size:19px">English</h2>
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/about/">What is NeyLivo?</a></li>
        <li><a href="/download/">Download</a></li>
        <li><a href="/features/">Features</a></li>
        <li><a href="/security/">Security</a></li>
        <li><a href="/plugins/">Plugins</a></li>
        <li><a href="/faq/">FAQ</a></li>
      </ul>
    </article>
    <article class="card" lang="ru">
      <h2 style="margin-top:0;font-size:19px">Русский</h2>
      <ul>
        <li><a href="/ru/">Главная</a></li>
        <li><a href="/ru/about/">Что такое Нейливо?</a></li>
        <li><a href="/ru/download/">Скачать</a></li>
        <li><a href="/ru/features/">Возможности</a></li>
        <li><a href="/ru/security/">Безопасность</a></li>
        <li><a href="/ru/plugins/">Плагины</a></li>
        <li><a href="/ru/faq/">Вопросы и ответы</a></li>
      </ul>
    </article>
  </div>
</section>
`,
}
