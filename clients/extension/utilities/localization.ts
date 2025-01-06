import de from '../public/_locales/de/messages.json'
import en from '../public/_locales/en/messages.json'
import es from '../public/_locales/es/messages.json'
import es_419 from '../public/_locales/es_419/messages.json'
import fr from '../public/_locales/fr/messages.json'
import it from '../public/_locales/it/messages.json'
import ja from '../public/_locales/ja/messages.json'
import ko from '../public/_locales/ko/messages.json'
import nl from '../public/_locales/nl/messages.json'
import pl from '../public/_locales/pl/messages.json'
import pt_BR from '../public/_locales/pt_BR/messages.json'
import pt_PT from '../public/_locales/pt_PT/messages.json'
import ru from '../public/_locales/ru/messages.json'
import zh_CN from '../public/_locales/zh_CN/messages.json'
import zh_TW from '../public/_locales/zh_TW/messages.json'

function getCurrentLanguageCode() {
  let language: string = navigator.languages ? navigator.languages[0] : navigator.language

  language = typeof language !== 'undefined' ? language.toLowerCase() : 'en'

  if (language.startsWith('en')) return 'en' // English
  if (language.startsWith('de')) return 'de' // German
  if (language.startsWith('fr')) return 'fr' // French
  if (language.startsWith('it')) return 'it' // Italian
  if (language.startsWith('es_419')) return 'es_419' // Spanish (Latin America and Caribbean)
  if (language.startsWith('es')) return 'es' // Spanish
  if (language.startsWith('ja')) return 'ja' // Japanese
  if (language.startsWith('ru')) return 'ru' // Russian
  if (language.startsWith('ko')) return 'ko' // Korean
  if (language.startsWith('nl')) return 'nl' // Dutch
  if (language.startsWith('pl')) return 'pl' // Polish
  if (language.startsWith('pt_BR')) return 'pt_BR' // Portuguese Brazil
  if (language.startsWith('pt_PT')) return 'pt_PT' // Portuguese Portugal
  if (language.startsWith('zh_CN')) return 'zh_CN' // Chinese Simplified
  if (language.startsWith('zh_TW')) return 'zh_TW' // Chinese Traditional
  return 'en' // Default is English
}

function localizedStrings() {
  const localizedCopy = {
    de,
    en,
    es,
    es_419,
    fr,
    it,
    ja,
    ko,
    nl,
    pl,
    pt_BR,
    pt_PT,
    ru,
    zh_CN,
    zh_TW
  }

  const currentLanguage = getCurrentLanguageCode()
  return localizedCopy[currentLanguage] || localizedCopy.en
}

const currentStrings: Record<string, { message: string }> = localizedStrings()

export function localize(key: string): string {
  return currentStrings[key]?.message
}
