export interface Item {
  authors?: ItemAuthor[]
  video?: ItemMedia
  htmlEmbed?: string
  excerpt: string
  id: string
  image?: ItemMedia
  publisher: string
  timeToRead?: number | null
  title: string
  topic?: string
  url: string
}

export interface ItemAuthor {
  name?: string | null
}

export interface ItemMedia {
  url?: string | null
  width?: string
  height?: string
  type?: string
}
