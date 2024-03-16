import { PublisherAttribution as Component } from './publisher-attribution'

import { publisher, article } from 'mocks/_data/article'
const { publishedAt } = article.photosAndCaptions

export default {
  title: 'Article/PublisherAttribution',
  component: Component
}

export const normal = () => {
  return <Component publisher={publisher.theAtlantic} publishedAt={publishedAt} />
}

export const noArticleCta = () => {
  return <Component publisher={publisher.theVerge} publishedAt={publishedAt} />
}

export const noPublisher = () => {
  return <Component publisher={null} publishedAt={publishedAt} />
}
