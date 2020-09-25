import React from 'react'
import { ParsedHeadline } from './parsed-headline'

import { article } from 'common/_mocks/'
const { title, description } = article.photosAndCaptions

export default {
  title: 'Components/Article/ParsedHeadline',
  component: ParsedHeadline
}

export const normal = () => {
  return <ParsedHeadline title={title} description={description} />
}
