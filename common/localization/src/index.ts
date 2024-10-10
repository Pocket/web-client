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

/**
 *
 */
export function useTranslation(lang?: string, namespaces?: string[]) {
  return {
    t,
    Trans
  }
}

/**
 *
 */
export function t(key: string, text: string) {
  return text
}

/**
 *
 */
export function Trans({ children }: React.PropsWithChildren<{ i18nKey?: string }>) {
  return children
}
