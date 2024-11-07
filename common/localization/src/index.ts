'use client'

import i18next from 'i18next'
import resourcesToBackend from 'i18next-resources-to-backend'
import { initReactI18next } from 'react-i18next'

import { getOptions } from './utilities'

//  eslint-disable-next-line @typescript-eslint/no-floating-promises
i18next
  .use(initReactI18next)
  .use(
    resourcesToBackend((language, namespace, callback) => {
      import(`../messages/${language}/${namespace}.json`)
        .then(({ default: resources }) => {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
          callback(null, resources)
        })
        .catch((error) => {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
          callback(error, null)
        })
    })
  )
  .init({
    ...getOptions(),
    lng: undefined, // let detect the language on client side
    detection: {
      order: ['path', 'htmlTag']
    }
  })

export { useTranslation } from 'react-i18next'
export { Trans } from 'react-i18next/TransWithoutContext'
export { dir } from 'i18next'
export * from './constants'
