import { ContactInfo } from 'containers/contact-info'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { LOCALE_COMMON } from 'common/constants'

export async function getServerSideProps({ locale, query }) {
  return {
    props: {
      query,
      locale,
      ...(await serverSideTranslations(locale, [...LOCALE_COMMON]))
    }
  }
}

export default ContactInfo
