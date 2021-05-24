import Profile from 'containers/profile/profile'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { LOCALE_COMMON } from 'common/constants'

export async function getServerSideProps({ locale }) {
  return {
    props: {
      authRequired: true,
      ...(await serverSideTranslations(locale, [
        ...LOCALE_COMMON
      ]))
    }
  }
}

export default Profile
