import Reader from 'containers/read/read'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { LOCALE_COMMON, LOCALE_READER } from 'common/constants'

export async function getServerSideProps({ locale }) {
  return {
    props: {
      authRequired: true,
      ...(await serverSideTranslations(locale, [
        ...LOCALE_COMMON,
        ...LOCALE_READER
      ]))
    }
  }
}

export default Reader
