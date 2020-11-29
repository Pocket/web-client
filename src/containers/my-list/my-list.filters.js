export function filterByUnread(item) {
  return item.status === '0'
}

export function filterByArchived(item) {
  return item.status === '1'
}

/**
 * Favorites
 * ---------------------------------------------------------
 */
export function filterByFavorites(item) {
  return item.favorite === '1'
}

export function filterByFavoritesUnread(item) {
  return item.favorite === '1' && item.status === '0'
}

export function filterByFavoritesArchived(item) {
  return item.favorite === '1' && item.status === '1'
}

/**
 * Highlights
 * ---------------------------------------------------------
 */
export function filterByHighlights(item) {
  return item.annotations
}

export function filterByHighlightsUnread(item) {
  return item.status === '0' && item.annotations
}

export function filterByHighlightsArchived(item) {
  return item.status === '1' && item.annotations
}

export function filterByHighlightsFavorites(item) {
  return item.favorite === '1' && item.annotations
}

/**
 * Articles
 * ---------------------------------------------------------
 */
export function filterByArticles(item) {
  return item.is_article === '1'
}
export function filterByArticlesUnread(item) {
  return item.status === '0' && item.is_article === '1'
}

export function filterByArticlesArchived(item) {
  return item.status === '1' && item.is_article === '1'
}

export function filterByArticlesFavorites(item) {
  return item.favorite === '1' && item.is_article === '1'
}

/**
 * Favorites
 * ---------------------------------------------------------
 */
export function filterByVideos(item) {
  return item.has_video === '2'
}
export function filterByVideosUnread(item) {
  return item.status === '0' && item.has_video === '2'
}

export function filterByVideosArchived(item) {
  return item.status === '1' && item.has_video === '2'
}

export function filterByVideosFavorites(item) {
  return item.favorite === '1' && item.has_video === '2'
}

/**
 * Favorites
 * ---------------------------------------------------------
 */
export function filterByTags(item, tag) {
  if (tag === '_untagged_') return !item.tags

  const itemTags = item.tags ? Object.keys(item.tags) : []
  return itemTags.includes(tag)
}
export function filterByTagsUnread(item, tag) {
  return item.status === '0' && filterByTags(item, tag)
}

export function filterByTagsArchived(item, tag) {
  return item.status === '1' && filterByTags(item, tag)
}

export function filterByTagsFavorites(item, tag) {
  return item.favorite === '1' && filterByTags(item, tag)
}

/**
 * Filter Selector
 * ---------------------------------------------------------
 */
export function filterSelector(subset, filter) {
  if (subset === 'unread') return filterByUnread
  if (subset === 'archive') return filterByArchived

  if (subset === 'favorites') {
    if (filter === 'unread') return filterByFavoritesUnread
    if (filter === 'archive') return filterByFavoritesArchived
    return filterByFavorites
  }

  if (subset === 'highlights') {
    if (filter === 'unread') return filterByHighlightsUnread
    if (filter === 'archive') return filterByHighlightsArchived
    if (filter === 'favorites') return filterByHighlightsFavorites
    return filterByHighlights
  }
  if (subset === 'articles') {
    if (filter === 'unread') return filterByArticlesUnread
    if (filter === 'archive') return filterByArticlesArchived
    if (filter === 'favorites') return filterByArticlesFavorites
    return filterByArticles
  }
  if (subset === 'videos') {
    if (filter === 'unread') return filterByVideosUnread
    if (filter === 'archive') return filterByVideosArchived
    if (filter === 'favorites') return filterByVideosFavorites
    return filterByVideos
  }
  if (subset === 'tag') {
    if (filter === 'unread') return filterByTagsUnread
    if (filter === 'archive') return filterByTagsArchived
    if (filter === 'favorites') return filterByTagsFavorites
    return filterByTags
  }
}
