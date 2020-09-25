import React from 'react'
import PocketRecs from './pocket-recs'

import { pocketRecommendations as pocketRecs, publisher } from 'mock/article'
import PublisherRecs from '../publisher-recs/publisher-recs'

export default {
  title: 'Components/PocketRecs',
  component: PocketRecs
}

export const normal = () => {
  return <PocketRecs recommendations={pocketRecs.recommendations} />
}

export const noPublisherLogo = () => {
  const recommendationsWithNoPublisherLogo = pocketRecs.recommendations.map(
    (recommendation) => {
      const { syndicated_article } = recommendation
      const syndicatedArticleNoPublisherLogo = {
        ...syndicated_article,
        publisher: {
          ...syndicated_article.publisher,
          logoWideBwUrl: null
        }
      }

      return {
        ...recommendation,
        syndicated_article: syndicatedArticleNoPublisherLogo
      }
    }
  )
  return <PocketRecs recommendations={recommendationsWithNoPublisherLogo} />
}

export const noRecs = () => {
  return <PocketRecs />
}
