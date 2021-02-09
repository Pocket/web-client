// Common JS for use with the server
const NextI18Next = require('next-i18next').default
const path = require('path')

module.exports = new NextI18Next({
  browserLanguageDetection: false,
  localePath: path.resolve('./public/static/locales'),
  defaultLanguage: 'en',
  otherLanguages: [
    'de',
    'en',
    'es',
    'es-XL',
    'fr',
    'fr-CA',
    'it',
    'ja',
    'ko',
    'nl',
    'pl',
    'pt',
    'pt-BR',
    'ru',
    'zh',
    'zh-TW'
  ],
  shallowRender: true
})
