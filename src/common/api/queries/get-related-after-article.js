import { gql } from 'graphql-request'
import { requestGQL } from 'common/utilities/request/request'
import { arrayToObject } from 'common/utilities/object-array/object-array'

const getRelatedAfterArticleQuery = gql`
  query RelatedAfterArticle($itemId: ID!) {
    itemByItemId(id: $itemId) {
      relatedAfterArticle(count: 3) {
        corpusRecommendationId: id
        corpusItem {
            thumbnail: imageUrl
            publisher
            title
            saveUrl: url
            id
            excerpt
        }
      }
    }
  }
`

export async function getRelatedAfterArticle(itemId) {
  return requestGQL({
    query: getRelatedAfterArticleQuery,
    operationName: 'GetRelatedAfterArticle',
    variables: { itemId }
  })
    .then(handleResponse)
    .catch((error) => console.error(error))
}

function handleResponse(response) {
  const responseData = response?.data?.itemByItemId?.relatedAfterArticle

  if (!responseData) throw new Error(response?.errors)

  const relatedArticles = responseData.map((relatedItem) => ({
    corpusRecommendationId: relatedItem?.corpusRecommendationId,
    analyticsData: {
      corpusRecommendationId: relatedItem?.corpusRecommendationId,
      url: relatedItem?.corpusItem?.saveUrl
    },
    ...relatedItem?.corpusItem
  }))
  const relatedArticlesById = arrayToObject(relatedArticles, 'id')

  return {
    relatedArticlesById,
  }
}
