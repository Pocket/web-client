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
  const validSearchTypes = ['all', 'saves']
  // https://opensearch.org/docs/latest/query-dsl/full-text/simple-query-string/
  const { q, st } = query
  const defaultProps = { ...(await serverSideTranslations(locale, [...LOCALE_COMMON])), locale }

  // We need something here to redirect to home or something of that nature
  if (!q)
    return {
      redirect: {
        destination: '/home',
        permanent: false
      }
    }

  // Light validation
  const searchType = typeof st === 'string' && validSearchTypes.includes(st) ? st : false

  return { props: { ...defaultProps, query: q, searchType } }
}

export default Search
