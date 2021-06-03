const fs = require('fs-extra')

function inferInternationalizedLang() {
  const locales = {
    en: ['en'],
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

  Object.keys(locales).map((source) => distributeLocalizations(source, locales[source]))
}

function distributeLocalizations(source, destinations) {
  destinations.map((destination) => {
    try {
      fs.copySync(
        `node_modules/@pocket/web-localization/locales/${source}`,
        `public/locales/${destination}`
      )
      console.log(`${source} copied to ${destination}`)
    } catch (err) {
      console.error(err)
    }
  })
}

inferInternationalizedLang()
