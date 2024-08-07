import { Search } from 'containers/search'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { LOCALE_COMMON } from 'common/constants'

// Types
import type { LocalizedProps } from '@common/types'
import type { GetServerSideProps } from 'next'

export const getServerSideProps: GetServerSideProps<LocalizedProps> = async ({
  locale = 'en',
  query
}) => {
  // https://opensearch.org/docs/latest/query-dsl/full-text/simple-query-string/
  const { q } = query
  const defaultProps = { ...(await serverSideTranslations(locale, [...LOCALE_COMMON])), locale }

  // We need something here to redirect to home or something of that nature
  if (!q) return { props: defaultProps }

  return { props: { ...defaultProps, query: q } }
}

export default Search
