export * from './constants'

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
