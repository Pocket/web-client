import { useState } from 'react'
import { useTranslation } from 'next-i18next'

export function Languages() {
  const stuff = useTranslation()
  const { i18n } = stuff
  const { options, language: currentLanguage } = i18n

  const languages = options?.allLanguages

  // Set state for component
  const [language, setLanguage] = useState(currentLanguage)

  const handleChange = async (event) => {
    const selectedValue = event.currentTarget.value
    try {
      await i18n.changeLanguage(selectedValue)
      setLanguage(selectedValue)
    } catch (err) {
      console.warn(err)
    }
  }

  return languages.length ? (
    <select onChange={handleChange} value={language}>
      {languages.map((languageOption) => (
        <option key={languageOption} value={languageOption}>
          {languageOption}
        </option>
      ))}
    </select>
  ) : null
}
