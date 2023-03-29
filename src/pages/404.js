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

export default function Client404() {
  return <ErrorPage statusCode={404} />
}
