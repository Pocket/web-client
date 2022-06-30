import { ParsedHeadline as Component } from './parsed-headline'

import { article } from 'mocks/_data/article'
const { title, description } = article.photosAndCaptions

export default {
  title: 'Article/ParsedHeadline',
  component: Component
}

export const ParsedHeadline = () => {
  return <Component title={title} description={description} />
}
