import type { Config } from 'next-i18n-router/dist/types'
import { SUPPORTED_LOCALES } from '@common/constants'

export const DEFAULT_LOCALE = 'en'
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
