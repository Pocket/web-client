import ErrorPage from 'containers/_error/error'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { LOCALE_COMMON } from 'common/constants'

import type { NextPage, GetStaticPropsContext, GetStaticProps } from 'next'
import type { LocalizedProps } from '@common/types'

export const getStaticProps: GetStaticProps<LocalizedProps> = async function getStaticProps(
  ctx: GetStaticPropsContext
) {
  const locale = ctx.locale ?? 'en'
  return {
    props: {
      ...(await serverSideTranslations(locale, [...LOCALE_COMMON]))
    }
  }
}

const Notifications: NextPage = () => {
  return <ErrorPage statusCode="mobileNotification" />
}

export default Notifications
