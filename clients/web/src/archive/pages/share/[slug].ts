import Share from 'containers/share'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { LOCALE_COMMON } from 'common/constants'
import { getSharedItem, hydrateSharedItem } from 'containers/share/sharedItem.state'
import { wrapper } from 'store'

// Types
import type { LocalizedProps } from '@common/types'
import type { GetServerSideProps } from 'next'

export const getServerSideProps: GetServerSideProps<LocalizedProps> = wrapper.getServerSideProps(
  (store) =>
    async ({ locale = 'en', query }) => {
      const { dispatch } = store
      const { slug } = query

      const defaultProps = { ...(await serverSideTranslations(locale, [...LOCALE_COMMON])), locale }

      if (slug === 'null') return { props: defaultProps }

      const data = await getSharedItem(slug)

      dispatch(hydrateSharedItem(data))

      // Revalidate means this can be regenerated once every X seconds
      return { props: defaultProps }
    }
)

export default Share
