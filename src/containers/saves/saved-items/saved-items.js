import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import { ListOfItems } from './list-of-items'
import { selectShortcutItem } from 'connectors/shortcuts/shortcuts.state'

import { searchItems } from 'containers/saves/saved-items/saved-items.state'
import { searchItemsUnread } from 'containers/saves/saved-items/saved-items.state'
import { searchItemsArchived } from 'containers/saves/saved-items/saved-items.state'
import { searchItemsFavorites } from 'containers/saves/saved-items/saved-items.state'
import { getItemsUnread } from 'containers/saves/saved-items/saved-items.state'
import { getItemsArchived } from 'containers/saves/saved-items/saved-items.state'
import { getItemsFiltered } from 'containers/saves/saved-items/saved-items.state'
import { getItemsFavorites } from 'containers/saves/saved-items/saved-items.state'
import { getItemsFavoritesUnread } from 'containers/saves/saved-items/saved-items.state'
import { getItemsFavoritesArchived } from 'containers/saves/saved-items/saved-items.state'
import { getItemsAnnotated } from 'containers/saves/saved-items/saved-items.state'
import { getItemsAnnotatedUnread } from 'containers/saves/saved-items/saved-items.state'
import { getItemsAnnotatedArchived } from 'containers/saves/saved-items/saved-items.state'
import { getItemsAnnotatedFavorites } from 'containers/saves/saved-items/saved-items.state'
import { getItemsArticles } from 'containers/saves/saved-items/saved-items.state'
import { getItemsArticlesUnread } from 'containers/saves/saved-items/saved-items.state'
import { getItemsArticlesArchived } from 'containers/saves/saved-items/saved-items.state'
import { getItemsArticlesFavorites } from 'containers/saves/saved-items/saved-items.state'
import { getItemsVideos } from 'containers/saves/saved-items/saved-items.state'
import { getItemsVideosArchived } from 'containers/saves/saved-items/saved-items.state'
import { getItemsVideosFavorites } from 'containers/saves/saved-items/saved-items.state'
import { getItemsVideosUnread } from 'containers/saves/saved-items/saved-items.state'
import { getItemsTagsUnread } from 'containers/saves/saved-items/saved-items.state'
import { getItemsTagsArchived } from 'containers/saves/saved-items/saved-items.state'
import { getItemsTagsFavorites } from 'containers/saves/saved-items/saved-items.state'
import { getItemsTags } from 'containers/saves/saved-items/saved-items.state'

export function filterSelector(subset, filter) {
  if (subset === 'unread') return getItemsUnread
  if (subset === 'archive') return getItemsArchived
  if (subset === 'filter') return getItemsFiltered

  if (subset === 'favorites') {
    if (filter === 'unread') return getItemsFavoritesUnread
    if (filter === 'archive') return getItemsFavoritesArchived
    return getItemsFavorites
  }

  if (subset === 'highlights') {
    if (filter === 'unread') return getItemsAnnotatedUnread
    if (filter === 'archive') return getItemsAnnotatedArchived
    if (filter === 'favorites') return getItemsAnnotatedFavorites
    return getItemsAnnotated
  }
  if (subset === 'articles') {
    if (filter === 'unread') return getItemsArticlesUnread
    if (filter === 'archive') return getItemsArticlesArchived
    if (filter === 'favorites') return getItemsArticlesFavorites
    return getItemsArticles
  }
  if (subset === 'videos') {
    if (filter === 'unread') return getItemsVideosUnread
    if (filter === 'archive') return getItemsVideosArchived
    if (filter === 'favorites') return getItemsVideosFavorites
    return getItemsVideos
  }
  if (subset === 'tag') {
    if (filter === 'unread') return getItemsTagsUnread
    if (filter === 'archive') return getItemsTagsArchived
    if (filter === 'favorites') return getItemsTagsFavorites
    return getItemsTags
  }

  if (subset === 'search') {
    if (filter === 'unread') return searchItemsUnread
    if (filter === 'archive') return searchItemsArchived
    if (filter === 'favorites') return searchItemsFavorites
    return searchItems
  }

  return () => {}
}

export const SavedItems = (props) => {
  const dispatch = useDispatch()
  const router = useRouter()
  const sortOrder = useSelector((state) => state.pageSavedInfo.sortOrder)
  const sortBy = useSelector((state) => state.pageSavedInfo.sortBy)

  const { subset: sub = 'active', filter: propFilter } = props
  const { tag, filter: queryFilter, query: searchTerm } = router.query
  const subset = tag ? 'tag' : searchTerm ? 'search' : sub
  const filter = tag ? queryFilter : propFilter

  // Get items based on location
  useEffect(() => {
    const itemFilterFunction = filterSelector(subset, filter)
    dispatch(itemFilterFunction(searchTerm, sortOrder, [tag]))
  }, [dispatch, subset, filter, searchTerm, sortOrder, sortBy, tag])

  // Remove current item when we return to saves
  // This should be leveraged more effectively in future, but for now
  // it is simply a reset
  useEffect(() => {
    dispatch(selectShortcutItem(false))
  }, [dispatch])

  return <ListOfItems subset={sub} />
}
