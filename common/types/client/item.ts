export interface Item {
  authors?: ItemAuthor[]
  excerpt: string
  id: string
  image: ItemImage
  publisher: string
  timeToRead?: number | null
  title: string
  topic?: string
  url: string
}

export interface ItemAuthor {
  name?: string | null
}

export interface ItemImage {
  url?: string | null
  width?: number
  height?: number
}
