import { ContentParsed } from './content-parsed'

import { articleContent } from 'mocks/_data/article'

export default {
  title: 'Article/ContentParsed',
  component: ContentParsed
}

export const alignedImages = () => {
  return <ContentParsed content={articleContent.alignedImages} />
}

export const orderedList = () => {
  return <ContentParsed content={articleContent.orderedList} />
}

export const listWithChildElements = () => {
  return <ContentParsed content={articleContent.listWithChildElements} />
}

export const photosAndCaptions = () => {
  return <ContentParsed content={articleContent.photosAndCaptions} />
}

export const quotes = () => {
  return <ContentParsed content={articleContent.quotes} />
}

export const blockquote = () => {
  return <ContentParsed content={articleContent.blockquote} />
}

export const media = () => {
  return <ContentParsed content={articleContent.media} />
}

export const largeImages = () => {
  return <ContentParsed content={articleContent.largeImages} />
}

export const aspectRatios = () => {
  return <ContentParsed content={articleContent.aspectRatios} />
}
