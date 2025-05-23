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
  const isPremium = useSelector((state) => state.user.premium_status === '1')

  // We only pull this in as a trigger for re-searching since some ancient organizational
  // need made it so sort order isn't passed in
  const sortOrder = useSelector((state) => state.pageSavedInfo.sortOrder)

  // We want to clear search results when we hit this page
  useEffect(() => {
    dispatch(clearSearchItems())
  }, [dispatch])

  // Get items based on location
  useEffect(() => {
    const itemFilterFunction = filterSelector('search', filter)
    dispatch(itemFilterFunction(query, sortOrder))
  }, [dispatch, query, locale, filter, sortOrder])

  return (
    <>
      <SearchPageHeader
        locale={locale}
        query={query}
        total={total}
        loading={loading}
        isPremium={isPremium}
        searchType="saves"
        filter={filter}
        sortOrder={sortOrder}
      />
      <ListOfSavedItems query={query} locale={locale} />
    </>
  )
}
