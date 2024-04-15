export type Item = {
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

export type ItemAuthor = {
  name?: string | null
}

export type ItemImage = {
  url?: string | null
  width?: number
  height?: number
}
