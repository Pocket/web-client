import Share from 'containers/share'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { LOCALE_COMMON, LOCALE_READER } from 'common/constants'

export async function getServerSideProps({ locale }) {
  return {
    props: {
      authRequired: false,
      ...(await serverSideTranslations(locale, [...LOCALE_COMMON, ...LOCALE_READER]))
    }
  }
}

export default Share
