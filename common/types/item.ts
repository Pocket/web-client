export type Item = {
  id: string
  publisher: string
  topic: string
  url: string
  excerpt: string
  authors?: ItemAuthor[]
  title: string
  image: ItemImage
}

export type ItemAuthor = {
  name?: string
}

export type ItemImage = {
  url: string
  width?: number
  height?: number
}
