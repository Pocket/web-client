import { PublicList } from 'containers/profile/public-list'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { LOCALE_COMMON } from 'common/constants'

export async function getServerSideProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        ...LOCALE_COMMON
      ]))
    }
  }
}

export default PublicList
