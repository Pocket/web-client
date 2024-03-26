import { LegalComponent as Component } from 'containers/legal'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { LOCALE_COMMON } from 'common/constants'
import { readFileSync } from 'node:fs'
import { marked } from 'marked'
import customHeadingId from 'marked-custom-heading-id'

// Override function
const renderer = {
  text(text) {
    const hasDateTime = /\{\: datetime=/.test(text)
    return hasDateTime ? '' : false
  }
}

export async function getStaticProps({ locale }) {
  const localeMap = {
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
  const legalLocale = localeMap[locale] || locale
  let mdContent

  try {
    mdContent = await readFileSync(
      `node_modules/legal-docs/${legalLocale}/pocket_privacy_policy.md`,
      'utf8'
    )
  } catch {
    mdContent = await readFileSync(`node_modules/legal-docs/en/pocket_privacy_policy.md`, 'utf8')
  }

  const mdContentModified = mdContent.replace(/\{:\s?\#(.+\S)\s?\}/gi, '{#$1}')
  const content = await marked.use(customHeadingId()).use({ renderer }).parse(mdContentModified)

  return {
    props: {
      ...(await serverSideTranslations(locale, [...LOCALE_COMMON])),
      authRequired: false,
      locale,
      content
    }
  }
}

const PrivacyPolicy = ({ content }) => {
  return (
    <Component>
      <div dangerouslySetInnerHTML={{ __html: content }}></div>
    </Component>
  )
}

export default PrivacyPolicy
