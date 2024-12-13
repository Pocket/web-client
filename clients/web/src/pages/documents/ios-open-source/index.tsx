import { LegalComponent as Component } from 'containers/legal'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { LOCALE_COMMON } from 'common/constants'
import { readFileSync } from 'node:fs'
import { marked } from 'marked'

// Types
import type { LocalizedProps } from '@common/types'
import type { GetStaticPropsContext, GetStaticProps } from 'next'
import { join } from 'node:path'
import { type JSX } from 'react'

async function getMDContent(): Promise<string> {
  const mdContent = readFileSync(join(process.cwd(), 'public/static/docs/ios-oss.md'), 'utf8')
  const mdContentModified = mdContent.replace(/\{:\s?\#(.+\S)\s?\}/gi, '{#$1}')
  const content = marked.parse(
    mdContentModified.replace(/^[\u200B\u200C\u200D\u200E\u200F\uFEFF]/, '')
  )

  return content
}

export const getStaticProps: GetStaticProps<LocalizedProps> = async function getStaticProps(
  ctx: GetStaticPropsContext
) {
  const locale = ctx.locale ?? 'en'
  const content: string = await getMDContent()

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
