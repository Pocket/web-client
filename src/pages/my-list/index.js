import MyList from 'containers/my-list/my-list'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { LOCALE_COMMON } from 'common/constants'

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [...LOCALE_COMMON])),
      subset: 'unread',
      authRequired: true
    }
  }
}

export default MyList
