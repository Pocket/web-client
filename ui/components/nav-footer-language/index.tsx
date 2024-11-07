'use client'

// Components
import { LANGUAGE_BY_LOCALE } from '@common/constants'

// Types
import type { ChangeEvent } from 'react'

/**
 * LanguageSelector
 * ---
 * Custom dropdown that allows user to select a new language to view the site in
 */
export function LanguageSelector() {
  const locales = Object.keys(LANGUAGE_BY_LOCALE)
  const currentLanguage = 'en'

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const locale = event.currentTarget.value
    console.log(locale)
  }

  return (
    <select
      data-testid="nav-footer-language-selector"
      value={currentLanguage}
      onChange={handleChange}>
      {locales.map((languageOption) => (
        <option key={languageOption} value={languageOption}>
          {LANGUAGE_BY_LOCALE[languageOption]}
        </option>
      ))}
    </select>
  )
}
