import React from 'react'
import { ParsedContent } from './parsed-content'

import { articleContent } from 'mock/article'

export default {
  title: 'Article/ParsedContent',
  component: ParsedContent
}

export const alignedImages = () => {
  return <ParsedContent content={articleContent.alignedImages} />
}

export const orderedList = () => {
  return <ParsedContent content={articleContent.orderedList} />
}

export const listWithChildElements = () => {
  return <ParsedContent content={articleContent.listWithChildElements} />
}

export const photosAndCaptions = () => {
  return <ParsedContent content={articleContent.photosAndCaptions} />
}

export const quotes = () => {
  return <ParsedContent content={articleContent.quotes} />
}

export const blockquote = () => {
  return <ParsedContent content={articleContent.blockquote} />
}

export const media = () => {
  return <ParsedContent content={articleContent.media} />
}

export const largeImages = () => {
  return <ParsedContent content={articleContent.largeImages} />
}

export const aspectRatios = () => {
  return <ParsedContent content={articleContent.aspectRatios} />
}
