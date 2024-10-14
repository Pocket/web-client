import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { LANGUAGE_BY_LOCALE } from '@common/constants'

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
