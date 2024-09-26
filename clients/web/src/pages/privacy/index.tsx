import { LegalComponent as Component } from 'containers/legal'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { LOCALE_COMMON } from 'common/constants'
import { readFileSync } from 'node:fs'
import { marked } from 'marked'
import { overrideDateTime, customHeadingId } from 'common/utilities/marked-formatters'
import { join } from 'node:path'

// Types
import type { LocalizedProps } from '@common/types'
import type { GetServerSideProps, GetServerSidePropsContext } from 'next'

const EUCodes: string[] = [
  'AT', //Austria (AT)
  'BE', //Belgium (BE)	1234567890
  'BG', //Bulgaria (BG)	123456789, 1234567890
  'HR', //Croatia (HR)	12345678901
  'CY', //Republic of Cyprus (CY)	12345678X
  'CZ', //Czech Republic (CZ)	12345678, 123456789, 1234567890
  'DK', //Denmark, except the Faroe Islands and Greenland (DK)	12345678
  'EE', //Estonia (EE)	123456789
  'FI', //Finland, but excluding the Åland Islands (FI)	12345678
  'FR', //France, including Monaco but excluding Guadeloupe, Martinique, Réunion, St Pierre and Miquelon, and French Guiana (FR)	12345678901, X1234567890, 1X123456789, XX123456789
  'DE', //Germany, except Büsingen and the Isle of Heligoland (DE)	123456789
  'EL', //Greece (EL)	123456789
  'HU', //Hungary (HU)	12345678
  'IE', //Ireland (IE)	1234567X, 1X23456X, 1234567XX
  'IT', //Italy, except the communes of Livigno and Campione d’Italia and the Italian waters of Lake Lugano (IT)	12345678901
  'LV', //Latvia (LV)	12345678901
  'LT', //Lithuania (LT)	123456789, 123456789012
  'LU', //Luxembourg (LU)	12345678
  'MT', //Malta (MT)	12345678
  'NL', //Netherlands (NL)	123456789B01
  'PL', //Poland (PL)	1234567890
  'PT', //Portugal, including the Azores and Madeira (PT)	123456789
  'RO', //Romania (RO)	12, 123, 1234, 12345, 123456, 1234567, 12345678, 123456789, 1234567890
  'SK', //Slovak Republic (SK)	1234567890
  'SI', //Slovenia (SI)	12345678
  'ES', //Spain, including the Balearic Islands but excluding Ceuta, Melilla and the Canary Islands (ES)	X12345678, 12345678X, X1234567X
  'SE' //Sweden (SE)	123456789012
]

const localeMap: Record<string, string> = {
  'de-DE': 'de',
  'en-KE': 'en',
  'es-LA': 'es-ES',
  es: 'es-ES',
  'fr-CA': 'fr',
  'fr-FR': 'fr',
  'it-IT': 'it',
  'ja-JP': 'ja',
  'ko-KR': 'ko',
  'nl-NL': 'nl',
  'pl-PL': 'pl',
  pt: 'pt-BR',
  'pt-PT': 'pt-BR',
  'ru-RU': 'ru',
  zh: 'zh-CN'
}

async function getMDContent(locale: string, isEU: boolean): Promise<string> {
  let mdContent: string
  const docToUse = isEU ? 'pocket_privacy_policy_eu.md' : 'pocket_privacy_policy.md'
  try {
    mdContent = readFileSync(join(process.cwd(), `public/static/docs/legal/${locale}/${docToUse}`), 'utf8') //prettier-ignore
  } catch {
    mdContent = readFileSync(join(process.cwd(), `public/static/docs/legal/en/${docToUse}`), 'utf8')
  }

  const mdContentModified = mdContent.replace(/\{:\s?\#(.+\S)\s?\}/gi, '{#$1}')
  const content = await marked.use(customHeadingId, overrideDateTime).parse(mdContentModified)

  return content
}

export const getServerSideProps: GetServerSideProps<LocalizedProps> =
  async function getServerSideProps(ctx: GetServerSidePropsContext) {
    const country = ctx.req.headers['cloudfront-viewer-country'] ?? 'US'
    const isEU = EUCodes.includes(country as string)
    const locale = ctx.locale ?? 'en'
    const localeToUse: string = localeMap[locale] ?? locale
    const content: string = await getMDContent(localeToUse, isEU)

    return {
      props: {
        ...(await serverSideTranslations(locale, [...LOCALE_COMMON])),
        content,
        country
      }
    }
  }

const PrivacyPolicy = ({ content, country }: { content: string; country: string }): JSX.Element => {
  return (
    <Component country={country}>
      <div dangerouslySetInnerHTML={{ __html: content }}></div>
    </Component>
  )
}

export default PrivacyPolicy
