import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import { ItemCard } from './card'
import { listFullStyle } from 'components/items-layout/list-full'

import { searchItems } from 'containers/list-saved/list-saved.state'
import { searchItemsUnread } from 'containers/list-saved/list-saved.state'
import { searchItemsArchived } from 'containers/list-saved/list-saved.state'
import { searchItemsFavorites } from 'containers/list-saved/list-saved.state'
import { getItemsUnread } from 'containers/list-saved/list-saved.state'
import { getItemsArchived } from 'containers/list-saved/list-saved.state'
import { getItemsFavorites } from 'containers/list-saved/list-saved.state'
import { getItemsFavoritesUnread } from 'containers/list-saved/list-saved.state'
import { getItemsFavoritesArchived } from 'containers/list-saved/list-saved.state'
import { getItemsAnnotated } from 'containers/list-saved/list-saved.state'
import { getItemsAnnotatedUnread } from 'containers/list-saved/list-saved.state'
import { getItemsAnnotatedArchived } from 'containers/list-saved/list-saved.state'
import { getItemsAnnotatedFavorites } from 'containers/list-saved/list-saved.state'
import { getItemsArticles } from 'containers/list-saved/list-saved.state'
import { getItemsArticlesUnread } from 'containers/list-saved/list-saved.state'
import { getItemsArticlesArchived } from 'containers/list-saved/list-saved.state'
import { getItemsArticlesFavorites } from 'containers/list-saved/list-saved.state'
import { getItemsVideos } from 'containers/list-saved/list-saved.state'
import { getItemsVideosArchived } from 'containers/list-saved/list-saved.state'
import { getItemsVideosFavorites } from 'containers/list-saved/list-saved.state'
import { getItemsVideosUnread } from 'containers/list-saved/list-saved.state'
import { getItemsTagsUnread } from 'containers/list-saved/list-saved.state'
import { getItemsTagsArchived } from 'containers/list-saved/list-saved.state'
import { getItemsTagsFavorites } from 'containers/list-saved/list-saved.state'
import { getItemsTags } from 'containers/list-saved/list-saved.state'

export function filterSelector(subset, filter) {
  if (subset === 'unread') return getItemsUnread
  if (subset === 'archive') return getItemsArchived

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

export const ListSaved = (props) => {
  const dispatch = useDispatch()
  const router = useRouter()
  const sortOrder = useSelector((state) => state.listSavedPageInfo.sortOrder)

  const { subset: sub = 'active', filter: propFilter } = props
  const { tag, filter: queryFilter, query: searchTerm } = router.query
  const subset = tag ? 'tag' : searchTerm ? 'search' : sub
  const filter = tag ? queryFilter : propFilter

  // Get items based on location
  useEffect(() => {
    const itemFilterFunction = filterSelector(subset, filter)
    dispatch(itemFilterFunction(searchTerm, sortOrder))
  }, [dispatch, subset, filter, searchTerm, sortOrder])

  const listSaved = useSelector((state) => state.listSaved)

  return (
    <div className={listFullStyle}>
      {listSaved
        ? listSaved.map((itemId, index) => <ItemCard key={itemId} id={itemId} position={index} />)
        : null}
    </div>
  )
}
