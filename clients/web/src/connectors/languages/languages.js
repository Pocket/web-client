import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'

const LANGUAGE_BY_LOCALE = {
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

export function Languages() {
  const translation = useTranslation()
  const router = useRouter()

  const { i18n } = translation
  const { options, language } = i18n
  const languages = options?.locales
  const locales = Object.keys(LANGUAGE_BY_LOCALE)

  const handleChange = async (event) => {
    const locale = event.currentTarget.value
    const currentPath = router?.asPath
    try {
      router.push(currentPath, currentPath, { locale })
    } catch (err) {
      console.warn(err)
    }
  }

  return languages?.length ? (
    <select onChange={handleChange} value={language}>
      {locales.map((languageOption) => (
        <option key={languageOption} value={languageOption}>
          {LANGUAGE_BY_LOCALE[languageOption]}
        </option>
      ))}
    </select>
  ) : null
}
