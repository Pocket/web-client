import type { Config } from 'next-i18n-router/dist/types'

export const DEFAULT_LOCALE = 'en'
export const SUPPORTED_LOCALES = [
  'zh-TW',
  'zh',
  'nl',
  'en',
  'en-KE',
  'fr',
  'fr-CA',
  'de',
  'it',
  'ja',
  'ko',
  'pl',
  'pt',
  'pt-BR',
  'ru',
  'es',
  'es-LA'
]

export const LANGUAGE_BY_LOCALE: { [key: string]: string } = {
  'zh-TW': 'Chinese (Taiwan)',
  zh: 'Chinese',
  nl: 'Dutch',
  en: 'English',
  fr: 'French',
  'fr-CA': 'French (Canada)',
  de: 'German',
  it: 'Italian',
  ja: 'Japanese',
  ko: 'Korean',
  pl: 'Polish',
  pt: 'Portuguese',
  'pt-BR': 'Portuguese (Brazil)',
  ru: 'Russian',
  es: 'Spanish (Spain)',
  'es-LA': 'Spanish (Latin America)'
}

export const DEFAULT_NS = 'common'
export const LOCALE_COOKIE_NAME = 'NEXT_LOCALE'
export const I18N_OPTIONS = {
  fallbackLng: DEFAULT_LOCALE,
  supportedLngs: SUPPORTED_LOCALES,
  defaultNS: DEFAULT_NS,
  fallbackNS: DEFAULT_NS,
  preload: SUPPORTED_LOCALES
}

export const I18N_ROUTER_CONFIG: Config = {
  locales: SUPPORTED_LOCALES,
  defaultLocale: DEFAULT_LOCALE,
  localeDetector: false
}
