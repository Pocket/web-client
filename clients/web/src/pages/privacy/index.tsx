import { LegalComponent as Component } from 'containers/legal'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { LOCALE_COMMON } from 'common/constants'
import { readFileSync } from 'node:fs'
import { marked } from 'marked'
import customHeadingId from 'marked-custom-heading-id'

import type { MarkedExtension } from 'marked'
import type { LocalizedProps } from '@common/types'
import type { GetStaticPropsContext, GetStaticProps } from 'next'

// Override function
const renderer = {
  text(text: string) {
    const hasDateTime = text.includes('{: datetime=')
    return hasDateTime ? '' : false
  }
}

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

async function getMDContent(locale: string): Promise<string> {
  let mdContent: string

  try {
    mdContent = readFileSync(`node_modules/legal-docs/${locale}/pocket_privacy_policy.md`, 'utf8')
  } catch {
    mdContent = readFileSync(`node_modules/legal-docs/en/pocket_privacy_policy.md`, 'utf8')
  }

  const mdContentModified = mdContent.replace(/\{:\s?\#(.+\S)\s?\}/gi, '{#$1}')
  const content = await marked
    .use(customHeadingId() as unknown as MarkedExtension)
    .use({ renderer })
    .parse(mdContentModified)

  return content
}

export const getStaticProps: GetStaticProps<LocalizedProps> = async function getStaticProps(
  ctx: GetStaticPropsContext
) {
  const locale = ctx.locale ?? 'en'
  const localeToUse: string = localeMap[locale] ?? locale
  const content: string = await getMDContent(localeToUse)

  return {
    props: {
      ...(await serverSideTranslations(locale, [...LOCALE_COMMON])),
      content
    }
  }
}

const PrivacyPolicy = ({ content }): JSX.Element => {
  return (
    <Component>
      <div dangerouslySetInnerHTML={{ __html: content }}></div>
    </Component>
  )
}

export default PrivacyPolicy
