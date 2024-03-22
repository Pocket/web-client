import type { NextPage } from 'next'
import { PrivacyPolicyComponent } from 'containers/privacy-policy'
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

const PrivacyPolicy: NextPage = () => {
  return <PrivacyPolicyComponent />
}

export default PrivacyPolicy
