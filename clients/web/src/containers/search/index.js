import Layout from 'layouts/main'
import { ListOfSearchResults } from './list-of-items'
import { Toasts } from 'connectors/toasts/toast-list'
import { SearchDiscoveryPageHeader } from 'components/headers/search-discovery-header'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { requestSearch } from './search.state'

export const Search = ({ query, locale }) => {
  const dispatch = useDispatch()
  const total = useSelector((state) => state.pageSearchInfo.totalCount)
  const loading = useSelector((state) => state.pageSearchInfo.loading)

  useEffect(() => {
    dispatch(requestSearch(query, locale.toUpperCase()))
  }, [query, locale, dispatch])

  return (
    <Layout>
      <SearchDiscoveryPageHeader query={query} total={total} loading={loading} />
      <ListOfSearchResults />
      <Toasts />
    </Layout>
  )
}
