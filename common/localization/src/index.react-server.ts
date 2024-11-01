export * from './constants'

import { createInstance } from 'i18next'
import resourcesToBackend from 'i18next-resources-to-backend'
import { initReactI18next } from 'react-i18next/initReactI18next'

import { getOptions } from './utilities'

export { Trans } from 'react-i18next/TransWithoutContext'

/**
 *
 */
// Define a template literal type for string format validation
type NamespacedKey = `${string}:${string}`

// Use it in the JSONResource type
type JSONResource = Record<NamespacedKey, string>

export async function useTranslation(
  namespaces: string[],
  options?: {
    lng: string | undefined
  }
) {
  const locale = options?.lng
  const i18nInstance = createInstance()

  i18nInstance.use(initReactI18next)

  i18nInstance.use(
    resourcesToBackend(
      (
        language: string,
        namespace: string,
        callback: (error: Error | null, resources: JSONResource | null) => void
      ) => {
        import(`../messages/${language}/${namespace}.json`)
          .then(({ default: resources }: { default: JSONResource }) => {
            callback(null, resources)
          })
          .catch((error: Error) => {
            callback(error, null)
          })
      }
    )
  )

  await i18nInstance.init({ ...getOptions(locale, namespaces) })

  return {
    i18n: i18nInstance,
    resources: i18nInstance.services.resourceStore.data,
    t: i18nInstance.t
  }
}
