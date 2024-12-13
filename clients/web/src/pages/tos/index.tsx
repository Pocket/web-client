import { LegalComponent as Component } from 'containers/legal'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { LOCALE_COMMON } from 'common/constants'
import { readFileSync } from 'node:fs'
import { marked } from 'marked'
import { overrideDateTime, customHeadingId } from 'common/utilities/marked-formatters'
import { join } from 'node:path'

// Types
import { type JSX } from 'react'
import type { LocalizedProps } from '@common/types'
import type { GetStaticPropsContext, GetStaticProps } from 'next'

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
    mdContent = readFileSync(join(process.cwd(), `public/static/docs/legal/${locale}/pocket_tos.md`), 'utf8') //prettier-ignore
  } catch {
    mdContent = readFileSync(join(process.cwd(), `public/static/docs/legal/en/pocket_tos.md`), 'utf8') //prettier-ignore
  }

  const mdContentModified = mdContent.replace(/\{:\s?\#(.+\S)\s?\}/gi, '{#$1}')
  const content = await marked.use(customHeadingId, overrideDateTime).parse(mdContentModified)

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

const TermsOfService = ({ content }: { content: string }): JSX.Element => {
  return (
    <Component>
      <div dangerouslySetInnerHTML={{ __html: content }}></div>
    </Component>
  )
}

export default TermsOfService
