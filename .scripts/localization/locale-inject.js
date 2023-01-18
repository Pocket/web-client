import fs from 'fs-extra'
import cliProgress from 'cli-progress'

const { copySync } = fs
const { Bar } = cliProgress

function inferInternationalizedLang() {
  const locales = {
    en: ['en', 'en-KE'],
    'de-DE': ['de', 'de-DE'],
    'es-ES': ['es', 'es-ES'],
    'es-LA': ['es-LA'],
    'es-XL': ['es-XL'],
    'fr-FR': ['fr', 'fr-FR'],
    'fr-CA': ['fr-CA'],
    'it-IT': ['it', 'it-IT'],
    'ja-JP': ['ja', 'ja-JP'],
    'ko-KR': ['ko', 'ko-KR'],
    'nl-NL': ['nl', 'nl-NL'],
    'pl-PL': ['pl', 'pl-PL'],
    'pt-PT': ['pt', 'pt-PT'],
    'pt-BR': ['pt-BR'],
    'ru-RU': ['ru', 'ru-RU'],
    'zh-CN': ['zh', 'zh-CN'],
    'zh-TW': ['zh-TW']
  }
  const progressBar = new Bar({
    barCompleteChar: '•',
    barIncompleteChar: '_',
    format: 'Injecting Locales: {percentage}%' + ' — ' + '{bar}',
    fps: 30,
    stream: process.stdout,
    barsize: 30
  })

  const localeKeys = Object.keys(locales)
  progressBar.start(localeKeys.length, 0)

  localeKeys.forEach((source) => {
    distributeLocalizations(source, locales[source])
    progressBar.increment()
  })

  progressBar.stop()
}

function distributeLocalizations(source, destinations) {
  destinations.forEach((destination) => {
    try {
      copySync(
        `node_modules/@pocket/web-localization/locales/${source}`,
        `public/locales/${destination}`
      )
    } catch (err) {
      console.error(err)
    }
  })
}

inferInternationalizedLang()
