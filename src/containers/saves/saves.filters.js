export function filterByUnread(item) {
  return item.status === 'UNREAD'
}

export function filterByArchived(item) {
  return item.status === 'ARCHIVED'
}

/**
 * Favorites
 * ---------------------------------------------------------
 */
export function filterByFavorites(item) {
  return item.isFavorite
}

export function filterByFavoritesUnread(item) {
  return item.isFavorite && item.status === 'UNREAD'
}

export function filterByFavoritesArchived(item) {
  return item.isFavorite && item.status === 'ARCHIVED'
}

/**
 * Highlights
 * ---------------------------------------------------------
 */
export function filterByHighlights(item) {
  return item.hasAnnotations
}

export function filterByHighlightsUnread(item) {
  return item.status === 'UNREAD' && item.hasAnnotations
}

export function filterByHighlightsArchived(item) {
  return item.status === 'ARCHIVED' && item.hasAnnotations
}

export function filterByHighlightsFavorites(item) {
  return item.isFavorite && item.hasAnnotations
}

/**
 * Articles
 * ---------------------------------------------------------
 */
export function filterByArticles(item) {
  return item.isArticle
}
export function filterByArticlesUnread(item) {
  return item.status === 'UNREAD' && item.isArticle
}

export function filterByArticlesArchived(item) {
  return item.status === 'ARCHIVED' && item.isArticle
}

export function filterByArticlesFavorites(item) {
  return item.isFavorite && item.isArticle
}

/**
 * Favorites
 * ---------------------------------------------------------
 */
export function filterByVideos(item) {
  return item.hasVideo === 'IS_VIDEO'
}
export function filterByVideosUnread(item) {
  return item.status === 'UNREAD' && item.hasVideo === 'IS_VIDEO'
}

export function filterByVideosArchived(item) {
  return item.status === 'ARCHIVED' && item.hasVideo === 'IS_VIDEO'
}

export function filterByVideosFavorites(item) {
  return item.isFavorite && item.hasVideo === 'IS_VIDEO'
}

/**
 * Tags
 * ---------------------------------------------------------
 */
export function filterByTags(item, tag) {
  if (tag === '_untagged_') return !item.tags.length
  const itemTags = item.tags ? item.tags.map((tag) => tag.name) : []
  return itemTags.includes(tag)
}
export function filterByTagsUnread(item, tag) {
  return item.status === 'UNREAD' && filterByTags(item, tag)
}

export function filterByTagsArchived(item, tag) {
  return item.status === 'ARCHIVED' && filterByTags(item, tag)
}

export function filterByTagsFavorites(item, tag) {
  return item.isFavorite && filterByTags(item, tag)
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
