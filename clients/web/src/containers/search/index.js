import Layout from 'layouts/main'
import { ListOfSearchResults } from './list-of-items'
import { Toasts } from 'connectors/toasts/toast-list'
import { SearchCorpus } from 'connectors/search-corpus'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { requestSearch } from './search.state'

export const Search = ({ query, locale }) => {
  const dispatch = useDispatch()
  const loading = useSelector((state) => state.pageSearchInfo.loading)

  useEffect(() => {
    dispatch(requestSearch(query, locale.toUpperCase()))
  }, [query, locale, dispatch])

  return (
    <Layout>
      <SearchCorpus query={query} />
      <ListOfSearchResults />
      <Toasts />
    </Layout>
  )
}
