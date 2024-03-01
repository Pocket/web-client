import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

i18n.use(initReactI18next).init({
  lng: 'en',
  fallbackLng: 'en',
  // have a common namespace used around the full app
  ns: ['common'],
  defaultNS: 'common',
  resources: { en: { common: {} } }
})

export { i18n }
