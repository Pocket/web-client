import React from 'react'
import { PublisherAttribution } from './publisher-attribution'

import { publisher, article } from 'mock/article'
const { publishedAt } = article.photosAndCaptions

export default {
  title: 'Article/PublisherAttribution',
  component: PublisherAttribution
}

export const normal = () => {
  return (
    <PublisherAttribution
      publisher={publisher.theAtlantic}
      publishedAt={publishedAt}
    />
  )
}

export const noArticleCta = () => {
  return (
    <PublisherAttribution
      publisher={publisher.theVerge}
      publishedAt={publishedAt}
    />
  )
}

export const noPublisher = () => {
  return <PublisherAttribution publisher={null} publishedAt={publishedAt} />
}
