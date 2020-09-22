// Common JS for use with the server
const NextI18Next = require('next-i18next').default
const path = require('path')

module.exports = new NextI18Next({
  browserLanguageDetection: false,
  localePath: path.resolve('./public/static/locales'),
  defaultLanguage: 'en',
  otherLanguages: [
    'de-DE',
    'en',
    'es-ES',
    'es-LA',
    'fr-CA',
    'fr-FR',
    'it-IT',
    'ja-JP',
    'ko-KR',
    'nl-NL',
    'pl-PL',
    'pt-BR',
    'pt-PT',
    'ru-RU',
    'zh-CN',
    'zh-TW'
  ],
  shallowRender: true
})
