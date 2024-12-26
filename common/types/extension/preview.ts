import type { Maybe, PendingItem } from '../pocket'

export interface ExtPreviewItem {
  preview: {
    image: { cachedImages: { url: string; id: string }[] }
    title: string
    domain: { name: string }
    url: string
    id: string
    source: string
    authors: { id: string; name: string }[]
  }
}

export type ExtItem = Maybe<PendingItem | ExtPreviewItem>
