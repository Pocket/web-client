import {
  type CorpusSearchEdge,
  type SavedItemEdge,
  type PendingItem,
  PendingItemStatus
} from '@common/types/pocket'

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
  return (item as PendingItem).status === PendingItemStatus.Unresolved
}
