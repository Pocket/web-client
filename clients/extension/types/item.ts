import type { Maybe, PendingItem, NoteEdge } from '@common/types/pocket'

export interface SuggestedTag {
  name: string
}

export interface ExtItem {
  preview: ExtPreview
  savedItem: {
    suggestedTags: SuggestedTag[]
    notes: NoteEdge[]
  }
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

export type ExtItemResponse = Maybe<PendingItem | ExtItem>
