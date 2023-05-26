import { gql } from 'common/utilities/gql/gql'
import { requestGQL } from 'common/utilities/request/request'
import { FRAGMENT_SAVED_ITEM } from 'common/api/fragments/fragment.savedItem'
import { FRAGMENT_ITEM } from 'common/api/fragments/fragment.item'
import { arrayToObject } from 'common/utilities/object-array/object-array'

const getSavedItemByIdQuery = gql`
  query GetSavedItemById($itemId: ID!) {
    user {
      savedItemById(id: $itemId) {
        ...SavedItemDetails
        annotations {
          highlights {
            id
            quote
            patch
            version
            _createdAt
            _updatedAt
            note {
              text
              _createdAt
              _updatedAt
            }
          }
        }
        item {
          ...ItemDetails
          ... on Item {
            article
            relatedAfterArticle(count: 3) {
              corpusRecommendationId: id
              corpusItem {
                thumbnail: imageUrl
                publisher
                title
                externalUrl: url
                saveUrl: url
                id
                excerpt
              }
            }
          }
        }
      }
    }
  }
  ${FRAGMENT_SAVED_ITEM}
  ${FRAGMENT_ITEM}
`

export async function getSavedItemByItemId(itemId) {
  return requestGQL({
    query: getSavedItemByIdQuery,
    operationName: 'GetSavedItemById',
    variables: { itemId }
  })
    .then(handleResponse)
    .catch((error) => console.error(error))
}

function handleResponse(response) {
  const responseData = response?.data?.user?.savedItemById

  if (!responseData) throw new Error(response?.errors)

  const { item: responseItem, ...savedData } = responseData
  const { relatedAfterArticle, ...item } = responseItem

  const relatedArticles = relatedAfterArticle.map((relatedItem) => ({
    corpusRecommendationId: relatedItem?.corpusRecommendationId,
    analyticsData: {
      corpusRecommendationId: relatedItem?.corpusRecommendationId,
      url: relatedItem?.corpusItem?.saveUrl
    },
    ...relatedItem?.corpusItem
  }))
  const relatedArticlesById = arrayToObject(relatedArticles, 'id')

  return {
    item,
    relatedArticlesById,
    savedData
  }
}
