import PocketHitsSignupPage from 'containers/pocket-hits-signup/pocket-hits-signup'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { LOCALE_COMMON } from 'common/constants'

export async function getStaticProps({ locale }) {
  return {
    props: {
      locale,
      ...(await serverSideTranslations(locale, [...LOCALE_COMMON]))
    }
  }
}

export default PocketHitsSignupPage
