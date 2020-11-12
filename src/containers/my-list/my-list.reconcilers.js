/** RECONCILERS
 --------------------------------------------------------------- */
// NOTE: This is specifically structured in the least clever way possible
// so as to preserve ease of understanding what operations are taking place.
// The goal here is NOT to reconcile the entire state tree, but simply operate
// quickly on the current list ... It may be just as fast to use a memoized
// selector, but on very very large lists that selector may be less effective
// for simple operations.

// ?? OPTIMIZATION: Operate solely on the current subset once memoized selectors
// ?? are in place.

export function reconcileItemsArchived(items, state) {
  if (!items) return state
  const itemIds = items.map((item) => item.id)

  //prettier-ignore
  return {
    ...state,
    unread: state.unread.filter( item => !itemIds.includes(item)),
    favoritesactive: state.favoritesunread.filter( item => !itemIds.includes(item)),
    highlightsunread: state.highlightsunread.filter( item => !itemIds.includes(item)),
    articlesunread: state.articlesunread.filter( item => !itemIds.includes(item)),
    videosunread: state.videosunread.filter( item => !itemIds.includes(item))
  }
}

export function reconcileItemsUnArchived(items, state) {
  if (!items) return state
  const itemIds = items.map((item) => item.id)

  //prettier-ignore
  return {
    ...state,
    archive: state.archive.filter( item => !itemIds.includes(item)),
    favoritesarchive: state.favoritesarchive.filter( item => !itemIds.includes(item)),
    highlightsarchive: state.highlightsarchive.filter( item => !itemIds.includes(item)),
    articlesarchive: state.articlesarchive.filter( item => !itemIds.includes(item)),
    videosarchive: state.videosarchive.filter( item => !itemIds.includes(item))
  }
}

export function reconcileItemsUnFavorited(items, state) {
  if (!items) return state
  const itemIds = items.map((item) => item.id)

  //prettier-ignore
  return {
    ...state,
    favorites: state.favorites.filter( item => !itemIds.includes(item)),
    favoritesunread: state.favoritesunread.filter( item => !itemIds.includes(item)),
    favoritesarchive: state.favoritesarchive.filter( item => !itemIds.includes(item)),
    highlightsfavorites: state.highlightsfavorites.filter( item => !itemIds.includes(item)),
    articlesfavorites: state.articlesfavorites.filter( item => !itemIds.includes(item)),
    videosfavorites: state.videosfavorites.filter( item => !itemIds.includes(item))
  }
}

export function reconcileItemsDeleted(items, state) {
  if (!items) return state
  const itemIds = items.map((item) => item.id)
  //prettier-ignore
  return {
    ...state,
    unread: state.unread.filter(item => !itemIds.includes(item)),
    archive: state.archive.filter(item => !itemIds.includes(item)),
    favorites: state.favorites.filter(item => !itemIds.includes(item)),
    favoritesunread: state.favoritesunread.filter(item => !itemIds.includes(item)),
    favoritesarchive: state.favoritesarchive.filter(item => !itemIds.includes(item)),
    highlights: state.highlights.filter(item => !itemIds.includes(item)),
    highlightsunread: state.highlightsunread.filter(item => !itemIds.includes(item)),
    highlightsarchive: state.highlightsarchive.filter(item => !itemIds.includes(item)),
    highlightsfavorites: state.highlightsfavorites.filter(item => !itemIds.includes(item)),
    articles: state.articles.filter(item => !itemIds.includes(item)),
    articlesunread: state.articlesunread.filter(item => !itemIds.includes(item)),
    articlesarchive: state.articlesarchive.filter(item => !itemIds.includes(item)),
    articlesfavorites: state.articlesfavorites.filter(item => !itemIds.includes(item)),
    videos: state.videos.filter(item => !itemIds.includes(item)),
    videosunread: state.videosunread.filter(item => !itemIds.includes(item)),
    videosarchive: state.videosarchive.filter(item => !itemIds.includes(item)),
    videosfavorites: state.videosfavorites.filter(item => !itemIds.includes(item)),
  }
}
