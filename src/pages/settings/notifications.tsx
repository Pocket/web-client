import type { NextPage } from 'next'
import ErrorPage from 'containers/_error/error'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { LOCALE_COMMON } from 'common/constants'

export async function getStaticProps({ locale }) {
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
