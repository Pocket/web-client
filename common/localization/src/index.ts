'use client'

import i18next from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import resourcesToBackend from 'i18next-resources-to-backend'
import { initReactI18next } from 'react-i18next'

import { getOptions } from './utilities'

i18next
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(
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
