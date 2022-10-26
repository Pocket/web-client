import { List } from 'containers/list/list'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { LOCALE_COMMON } from 'common/constants'

export async function getStaticProps({ locale }) {
  return {
    props: {
      authRequired: true,
      subset: 'search',
      ...(await serverSideTranslations(locale, [...LOCALE_COMMON]))
    }
  }
}

export default List
