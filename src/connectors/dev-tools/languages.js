import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'

export function Languages() {
  const translation = useTranslation()
  const router = useRouter()

  const { i18n } = translation
  const { options, language } = i18n
  const languages = options?.locales

  const handleChange = async (event) => {
    const locale = event.currentTarget.value
    const currentPath = router?.pathname
    try {
      router.push(currentPath, currentPath, { locale })
    } catch (err) {
      console.warn(err)
    }
  }

  return languages?.length ? (
    <select onChange={handleChange} value={language}>
      {languages.map((languageOption) => (
        <option key={languageOption} value={languageOption}>
          {languageOption}
        </option>
      ))}
    </select>
  ) : null
}
