// Общие данные сайта: адреса, навигация, подписи интерфейса.
//
// Всё, что повторяется на страницах, живёт здесь в одном экземпляре. Иначе
// «Ponoi» на одной странице и «Ponoi Messenger» на другой разойдутся сами
// собой, а поисковику нужна одна сущность, а не четыре похожие.

export const ORIGIN = 'https://ponoiai.github.io'

/** Веб-версия приложения. Это НЕ сайт: приложение живёт по своему адресу. */
export const APP_URL = 'https://ponoiai.github.io/ponoi/'
export const REPO_URL = 'https://github.com/ponoiai/ponoi'
export const RELEASES_URL = 'https://github.com/ponoiai/ponoi/releases'

export const LANGS = ['en', 'ru']

/** Путь страницы в конкретном языке. Английский — в корне, русский — под /ru/. */
export function urlFor(slug, lang) {
  const base = slug === '' ? '/' : `/${slug}/`
  return lang === 'en' ? base : `/ru${base}`
}

export const NAV = [
  { slug: 'features', en: 'Features', ru: 'Возможности' },
  { slug: 'security', en: 'Security', ru: 'Безопасность' },
  { slug: 'plugins', en: 'Plugins', ru: 'Плагины' },
  { slug: 'trackoteka', en: 'Trackoteka', ru: 'Трекотека' },
  { slug: 'download', en: 'Download', ru: 'Скачать' },
]

export const FOOTER = [
  {
    en: 'Product', ru: 'Продукт',
    links: [
      { slug: 'features', en: 'Features', ru: 'Возможности' },
      { slug: 'download', en: 'Download', ru: 'Скачать' },
      { slug: 'plugins', en: 'Plugins', ru: 'Плагины' },
      { slug: 'trackoteka', en: 'Trackoteka', ru: 'Трекотека' },
      { slug: 'changelog', en: 'Changelog', ru: 'Что нового' },
    ],
  },
  {
    en: 'Trust', ru: 'Доверие',
    links: [
      { slug: 'security', en: 'Security', ru: 'Безопасность' },
      { slug: 'privacy', en: 'Privacy', ru: 'Приватность' },
      { slug: 'transparency', en: 'Transparency', ru: 'Прозрачность' },
      { slug: 'faq', en: 'FAQ', ru: 'Вопросы и ответы' },
    ],
  },
  {
    en: 'About', ru: 'О проекте',
    links: [
      { slug: 'about', en: 'What is Ponoi?', ru: 'Что такое Поной?' },
      { slug: 'docs', en: 'Documentation', ru: 'Документация' },
      { slug: 'press', en: 'Press kit', ru: 'Для прессы' },
      { href: REPO_URL, en: 'Source code', ru: 'Исходный код', external: true },
    ],
  },
]

/** Подписи, которые встречаются в обвязке каждой страницы. */
export const UI = {
  en: {
    skip: 'Skip to content',
    menu: 'Menu',
    openApp: 'Open Ponoi',
    download: 'Download',
    onThisPage: 'On this page',
    langLabel: 'Language',
    otherLang: 'Русский',
    footerNote:
      'Ponoi is an independent project. This site is the official source of information about it.',
    updated: 'Last updated',
    home: 'Home',
  },
  ru: {
    skip: 'К содержанию',
    menu: 'Меню',
    openApp: 'Открыть Ponoi',
    download: 'Скачать',
    onThisPage: 'На этой странице',
    langLabel: 'Язык',
    otherLang: 'English',
    footerNote:
      'Ponoi — независимый проект. Этот сайт — официальный источник сведений о нём.',
    updated: 'Обновлено',
    home: 'Главная',
  },
}

/** Дата, которую показывают страницы безопасности и приватности. */
export const DOC_DATE = '2026-08-12'

export const DATE_LABEL = {
  en: 'August 12, 2026',
  ru: '12 августа 2026',
}
