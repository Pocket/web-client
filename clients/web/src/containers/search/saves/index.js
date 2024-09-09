import { ListOfSavedItems } from './list-of-items.js'
import { SearchPageHeader } from '../header'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { filterSelector } from 'containers/saves/saved-items/saved-items.js'
import { clearSearchItems } from 'containers/saves/saved-items/saved-items.state.js'

// import { requestSavesSearch } from './search.saves.state.js'
// import { searchItemsUnread } from 'containers/saves/saved-items/saved-items.state'
// import { searchItemsArchived } from 'containers/saves/saved-items/saved-items.state'
// import { searchItemsFavorites } from 'containers/saves/saved-items/saved-items.state'

export const SearchSaves = ({ query, locale }) => {
  const dispatch = useDispatch()
  const total = useSelector((state) => state.pageSavedInfo.totalCount)
  const loading = useSelector((state) => state.pageSavedInfo.loading)

  // We want to clear search results when we hit this page
  useEffect(() => {
    dispatch(clearSearchItems())
  }, [dispatch])

  // Get items based on location
  useEffect(() => {
    const itemFilterFunction = filterSelector('search', 'unread')
    dispatch(itemFilterFunction(query, 'DESC'))
  }, [dispatch, query, locale])

  return (
    <>
      <SearchPageHeader query={query} total={total} loading={loading} searchType="saves" />
      <ListOfSavedItems query={query} locale={locale} />
    </>
  )
}
