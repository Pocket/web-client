import { Search } from 'containers/search'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { LOCALE_COMMON } from 'common/constants'
import { getSearchResults, hydrateSearchResults } from 'containers/search/search.state'
import { wrapper } from 'store'

// Types
import type { LocalizedProps } from '@common/types'
import type { GetServerSideProps } from 'next'

export const getServerSideProps: GetServerSideProps<LocalizedProps> = wrapper.getServerSideProps(
  (store) =>
    async ({ locale = 'en', query }) => {
      const { dispatch } = store

      // https://opensearch.org/docs/latest/query-dsl/full-text/simple-query-string/
      const { q } = query
      const defaultProps = { ...(await serverSideTranslations(locale, [...LOCALE_COMMON])), locale }

      // We need something here to redirect to home or something of that nature
      if (!q) return { props: defaultProps }

      const data = await getSearchResults(q, locale.toUpperCase())

      dispatch(hydrateSearchResults(data))

      // Revalidate means this can be regenerated once every X seconds
      return { props: defaultProps }
    }
)

export default Search
