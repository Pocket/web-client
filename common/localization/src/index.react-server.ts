export * from './constants'

import { createInstance } from 'i18next'
import resourcesToBackend from 'i18next-resources-to-backend'
import { initReactI18next } from 'react-i18next/initReactI18next'

import { getOptions } from './utilities'

/**
 *
 */
export async function useTranslation(locale: string, namespaces: string[]) {
  const i18nInstance = createInstance()

  i18nInstance.use(initReactI18next)

  i18nInstance.use(
    resourcesToBackend((language, namespace, callback) => {
      import(`../messages/${language}/${namespace}.json`)
        .then(({ default: resources }) => {
          callback(null, resources)
        })
        .catch((error) => {
          callback(error, null)
        })
    })
  )

  await i18nInstance.init({ ...getOptions(locale, namespaces) })

  return {
    i18n: i18nInstance,
    resources: i18nInstance.services.resourceStore.data,
    t: i18nInstance.t
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
