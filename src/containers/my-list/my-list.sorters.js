export function sortByNewest(itemA, itemB) {
  return itemB.time_added - itemA.time_added
}

export function sortByOldest(itemA, itemB) {
  return itemA.time_added - itemB.time_added
}

export function sortByNewestArchive(itemA, itemB) {
  return itemB.time_read - itemA.time_read
}

export function sortByOldestArchive(itemA, itemB) {
  return itemA.time_read - itemB.time_read
}

export function sortByNewestFavorite(itemA, itemB) {
  return itemB.time_favorited - itemA.time_favorited
}

export function sortByOldestFavorite(itemA, itemB) {
  return itemA.time_favorited - itemB.time_favorited
}

export function sortSelector(type, direction) {
  const orderNewest = {
    default: sortByNewest,
    archived: sortByNewestArchive,
    favorites: sortByNewestFavorite
  }

  const orderOldest = {
    default: sortByOldest,
    archived: sortByOldestArchive,
    favorites: sortByOldestFavorite
  }

  const sortTypes = {
    unread: 'default',
    archive: 'archived',
    favorites: 'favorites',
    highlights: 'default',
    articles: 'default',
    videos: 'default',
    tags: 'default'
  }

  const sortType = sortTypes[type]

  return direction === 'oldest' ? orderOldest[sortType] : orderNewest[sortType]
}
