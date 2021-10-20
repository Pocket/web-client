import { Home } from 'containers/home/home'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { LOCALE_COMMON } from 'common/constants'

export async function getStaticProps({ locale }) {
  return {
    props: {
      authRequired: true,
      locale,
      ...(await serverSideTranslations(locale, [...LOCALE_COMMON]))
    }
  }
}

export default Home
