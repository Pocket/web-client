export function sortByNewest(itemA, itemB) {
  return itemB._createdAt - itemA._createdAt
}

export function sortByOldest(itemA, itemB) {
  return itemA._createdAt - itemB._createdAt
}

export function sortByNewestArchive(itemA, itemB) {
  return itemB.archivedAt - itemA.archivedAt
}

export function sortByOldestArchive(itemA, itemB) {
  return itemA.archivedAt - itemB.archivedAt
}

export function sortByNewestFavorite(itemA, itemB) {
  return itemB.favoritedAt - itemA.favoritedAt
}

export function sortByOldestFavorite(itemA, itemB) {
  return itemA.favoritedAt - itemB.favoritedAt
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
    tag: 'default'
  }

  const sortType = sortTypes[type]

  return direction === 'oldest' ? orderOldest[sortType] : orderNewest[sortType]
}
