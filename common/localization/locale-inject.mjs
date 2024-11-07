import cliProgress from 'cli-progress'
import fs from 'fs-extra'

const { copySync } = fs
const { Bar } = cliProgress

function inferInternationalizedLang() {
  const locales = {
    en: ['en-KE'],
    'de-DE': ['de'],
    'es-ES': ['es'],
    'fr-FR': ['fr'],
    'it-IT': ['it'],
    'ja-JP': ['ja'],
    'ko-KR': ['ko'],
    'nl-NL': ['nl'],
    'pl-PL': ['pl'],
    'pt-PT': ['pt'],
    'ru-RU': ['ru'],
    'zh-CN': ['zh']
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
      copySync(`public/locales/${source}`, `public/locales/${destination}`)
    } catch (err) {
      console.error(err)
    }
  })
}

inferInternationalizedLang()
