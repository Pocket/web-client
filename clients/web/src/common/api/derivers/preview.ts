import type { CorpusSearchEdge } from '@common/types/pocket'

export function deriveCorpusPreview(edge: CorpusSearchEdge) {
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
