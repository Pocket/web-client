import { About } from 'containers/about'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { LOCALE_COMMON } from 'common/constants'

import type { LocalizedProps } from '@common/types'
import type { GetStaticPropsContext, GetStaticProps } from 'next'

export const getStaticProps: GetStaticProps<LocalizedProps> = async function getStaticProps(
  ctx: GetStaticPropsContext
) {
  const locale = ctx.locale ?? 'en'
  return {
    props: {
      locale,
      ...(await serverSideTranslations(locale, [...LOCALE_COMMON]))
    }
  }
}

export default About
