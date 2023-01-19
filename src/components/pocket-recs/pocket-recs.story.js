import PocketRecs from './pocket-recs'

import { pocketRecommendations as pocketRecs } from 'mocks/_data/article'

export default {
  title: 'Recommendations/Pocket',
  component: PocketRecs
}

export const normal = () => {
  return <PocketRecs recommendations={pocketRecs.relatedEndOfArticle} />
}

// ! Commenting out for now as we no longer get publisher logos with recs as of 1/18/23
// export const noPublisherLogo = () => {
//   const recommendationsWithNoPublisherLogo = pocketRecs.relatedEndOfArticle.map((recommendation) => {
//     const { syndicated_article } = recommendation
//     const syndicatedArticleNoPublisherLogo = {
//       ...syndicated_article,
//       publisher: {
//         ...syndicated_article.publisher,
//         logoWideBwUrl: null
//       }
//     }

//     return {
//       ...recommendation,
//       syndicated_article: syndicatedArticleNoPublisherLogo
//     }
//   })
//   return <PocketRecs recommendations={recommendationsWithNoPublisherLogo} />
// }

export const noRecs = () => {
  return <PocketRecs />
}
