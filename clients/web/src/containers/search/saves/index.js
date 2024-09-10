import { ListOfSavedItems } from './list-of-items.js'
import { SearchPageHeader } from '../header'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { filterSelector } from 'containers/saves/saved-items/saved-items.js'
import { clearSearchItems } from 'containers/saves/saved-items/saved-items.state.js'

export const SearchSaves = ({ query, locale, filter }) => {
  const dispatch = useDispatch()
  const total = useSelector((state) => state.pageSavedInfo.totalCount)
  const loading = useSelector((state) => state.pageSavedInfo.loading)

  // We want to clear search results when we hit this page
  useEffect(() => {
    dispatch(clearSearchItems())
  }, [dispatch])

  // Get items based on location
  useEffect(() => {
    const itemFilterFunction = filterSelector('search', filter)
    dispatch(itemFilterFunction(query, 'DESC'))
  }, [dispatch, query, locale, filter])

  return (
    <>
      <SearchPageHeader
        query={query}
        total={total}
        loading={loading}
        searchType="saves"
        filter={filter}
      />
      <ListOfSavedItems query={query} locale={locale} />
    </>
  )
}
