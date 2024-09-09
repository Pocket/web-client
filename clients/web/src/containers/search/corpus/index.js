import { ListOfCorpusItems } from './list-of-items'
import { SearchPageHeader } from '../header'
import { useSelector, useDispatch } from 'react-redux'
import { requestCorpusSearch } from './search.corpus.state'
import { useEffect } from 'react'

export const SearchCorpus = ({ query, locale }) => {
  const dispatch = useDispatch()
  const total = useSelector((state) => state.pageSearchCorpusInfo.totalCount)
  const loading = useSelector((state) => state.pageSearchCorpusInfo.loading)

  useEffect(() => {
    dispatch(requestCorpusSearch(query, locale.toUpperCase()))
  }, [query, locale, dispatch])

  return (
    <>
      <SearchPageHeader query={query} total={total} loading={loading} searchType="all" />
      <ListOfCorpusItems query={query} locale={locale} />
    </>
  )
}
