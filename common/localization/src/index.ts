/**
 *
 */
export function useTranslation(namespace?: string | string[], options?: { lng: string }) {
  return {
    t,
    i18n: { namespace, options },
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
export function Trans({
  children
}: React.PropsWithChildren<{
  i18n: { namespace: string | string[] | undefined; options: { lng: string } | undefined }
  i18nKey: string
  t: (key: string, text: string) => string
}>) {
  return children
}
