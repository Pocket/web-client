import type { Maybe, PendingItem, Tag, NoteEdge } from '@common/types/pocket'

export interface ExtItem {
  preview: ExtPreview
  savedItem: ExtSavedItem
}

export interface ExtPreview {
  image: { cachedImages: { url: string; id: string }[] }
  title: string
  excerpt: string
  domain: { name: string }
  url: string
  id: string
  source: string
  authors: { id: string; name: string }[]
}

export interface ExtSavedItem {
  suggestedTags: Tag[]
  tags?: Tag[]
  notes: {
    edges: NoteEdge[]
  }
  item?: {
    preview: ExtPreview
  }
}

export type ExtItemResponse = Maybe<PendingItem | ExtItem>
