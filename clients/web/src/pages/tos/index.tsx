import type { NextPage } from 'next'
import { TermsOfService as Component } from 'containers/terms-of-service'
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

const TermsOfService: NextPage = () => {
  return <Component />
}

export default TermsOfService
