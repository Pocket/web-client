import { BASE_URL } from 'common/constants'

import type { CorpusSearchEdge, SavedItemEdge, PendingItem, Collection } from '@common/types/pocket'

export function deriveCorpusSearch(edge: CorpusSearchEdge) {
  const { node, cursor } = edge
  const { item, searchHighlights } = node
  const { preview } = item ?? {}
  const cached = preview?.image?.cachedImages ?? false
  const thumbnail = cached ? cached[0]?.url : ''

  return {
    item: {
      ...preview,
      publisher: preview?.domain?.name,
      thumbnail
    },
    searchHighlights,
    cursor,
    utmId: 'pocket_search'
  }
}

export function deriveCollectionItem(collection: Collection) {
  const collectionUrl = `/collections/${collection.slug}`
  const storyCount = collection.stories.length || null
  const preview = collection.preview

  const cached = preview.image?.cachedImages ?? false
  const thumbnail = cached ? cached[0]?.url : ''
  const publisher = preview.authors ? preview.authors[0]?.name : 'Pocket Editors'
  const url = `${BASE_URL}${collectionUrl}`
  return {
    ...collection,
    ...preview,
    publisher,
    itemImage: thumbnail,
    thumbnail,
    status: false,
    externalUrl: url,
    collectionUrl,
    readUrl: url,
    saveUrl: url,
    storyCount,
    isArticle: true,
    utmId: 'pocket_collection'
  }
}

export function deriveSavedItem(edge: SavedItemEdge) {
  const { node, cursor } = edge
  const item = node?.item
  if (isPendingItem(item)) return {}

  const preview = item?.preview
  const cached = preview?.image?.cachedImages ?? false
  const thumbnail = cached ? cached[0]?.url : ''

  return {
    item: {
      ...preview,
      publisher: preview?.domain?.name,
      thumbnail
    },
    cursor,
    utmId: 'pocket_saves'
  }
}

// Function to check if the object is a PendingItem
function isPendingItem(item: unknown): item is PendingItem {
  return ((item as PendingItem).status as string) === 'UNRESOLVED'
}
