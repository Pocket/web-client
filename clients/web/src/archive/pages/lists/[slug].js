import { ListIndividual } from 'containers/lists/list-individual/list-individual'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { LOCALE_COMMON } from 'common/constants'

export async function getServerSideProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [...LOCALE_COMMON])),
      authRequired: true,
      locale
    }
  }
}

export default ListIndividual
