import type { NextPage } from 'next'
import LearnMoreComponent from 'containers/learn-more/learn-more'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { LOCALE_COMMON } from 'common/constants'

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [...LOCALE_COMMON])),
      authRequired: true,
      locale
    }
  }
}

const LearnMore: NextPage = () => {
  return <LearnMoreComponent />
}

export default LearnMore
