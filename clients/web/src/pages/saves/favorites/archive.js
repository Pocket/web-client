import { Saves } from 'containers/saves/saves'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { LOCALE_COMMON } from 'common/constants'

export async function getStaticProps({ locale }) {
  return {
    props: {
      authRequired: true,
      ...(await serverSideTranslations(locale, [...LOCALE_COMMON])),
      subset: 'favorites',
      filter: 'archive'
    }
  }
}

export default Saves
