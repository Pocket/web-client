import PocketRecs from './pocket-recs'

import { pocketRecommendations as pocketRecs } from 'mocks/_data/article'

export default {
  title: 'Recommendations/Pocket',
  component: PocketRecs
}

export const normal = () => {
  return <PocketRecs recommendations={pocketRecs.relatedEndOfArticle} />
}

// TODO: Update once the recs api returns a new logo url
export const noPublisherLogo = () => {
  const recommendationsWithNoPublisherLogo = pocketRecs.relatedEndOfArticle.map((recommendation) => {
    const { corpusItem } = recommendation
    const syndicatedArticleNoPublisherLogo = {
      ...corpusItem,
      publisher: 'Unheard of Publisher'
    }

    return {
      ...recommendation,
      corpusItem: syndicatedArticleNoPublisherLogo
    }
  })
  return <PocketRecs recommendations={recommendationsWithNoPublisherLogo} />
}

export const noRecs = () => {
  return <PocketRecs />
}
