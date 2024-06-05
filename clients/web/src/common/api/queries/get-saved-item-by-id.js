import { gql } from 'common/utilities/gql/gql'
import { requestGQL } from 'common/utilities/request/request'
import { FRAGMENT_SAVED_ITEM } from 'common/api/fragments/fragment.savedItem'
import { FRAGMENT_ITEM } from 'common/api/fragments/fragment.item'
import { arrayToObject } from 'common/utilities/object-array/object-array'

const getSavedItemByIdQuery = gql`
  query GetSavedItemById($id: ID!) {
    user {
      savedItemById(id: $id) {
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

const getSavedItemBySlugQuery = gql`
  query GetSavedItemBySlug($id: ID!) {
    readerSlug(slug: $id) {
      fallbackPage {
        ... on ReaderInterstitial {
          itemCard {
            ... on PocketMetadata {
              item {
                ...ItemDetails
              }
            }
          }
        }
      }
      savedItem {
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
      slug
    }
  }
  ${FRAGMENT_SAVED_ITEM}
  ${FRAGMENT_ITEM}
`

export async function getSavedItemByItemId(itemId) {
  const query = isNumeric(itemId) ? getSavedItemByIdQuery : getSavedItemBySlugQuery
  return requestGQL({
    query: query,
    operationName: 'GetReaderItem',
    variables: { id: itemId }
  })
    .then(handleResponse)
    .catch((error) => console.error(error))
}

export async function getItemByReaderSlug(slug) {
  return requestGQL({
    query: getSavedItemBySlugQuery,
    operationName: 'GetReaderItemBySlug',
    variables: { id: slug }
  })
    .then(handleSlugResponse)
    .catch((error) => console.error(error))
}

function handleResponse(response) {
  const data = response?.data
  if (!data) throw new Error(response?.errors)

  // Let's decide which version of the data we are returning

  // If user/savedItemById exists ... it is legacy
  if (data?.user?.savedItemById) return handleSavedItemResponse(data.user.savedItemById, true)

  // Since we are on to readerSlug requests, we need to check and see if the item
  // has been saved by the user already
  const { savedItem, fallbackPage } = data?.readerSlug

  // Item already saved, excellent ... maybe
  if (savedItem) {
    // Did the user delete this item?  Because deletion isn't really deletion in
    // Pocket land.  It just marks the status as `DELETED`
    if (savedItem.status === 'DELETED') return handleShareResponse(savedItem?.item, savedItem)
    return handleSavedItemResponse(savedItem)
  }

  // Looks like this item isn't saved.  Let's get share data and process it
  const { itemCard, message } = fallbackPage

  // Magically, the user has found a slug that doesn't work
  if (message) return { error: message }

  // Otherwise, we are just gonna populate the share item which will trigger
  // a redirect to home with a share interstitial
  return handleShareResponse(itemCard.item)
}

/**
 * handleSlugResponse
 * ---
 * This is required for ssr since we want to always assume there is no users (since we don't auth
 * on the server ... yet)
 */
function handleSlugResponse(response) {
  const data = response?.data

  if (!data) throw new Error(response?.errors)

  // We will assume there will not be save data at this point (this will change when we
  // start server side auth)
  const { fallbackPage } = data?.readerSlug

  // Looks like this item isn't saved.  Let's get share data and process it
  const { itemCard, message } = fallbackPage

  // Magically, the user has found a slug that doesn't work
  if (message) return { error: message }

  // We are just gonna populate the share item
  return handleShareResponse(itemCard.item)
}

/**
 * We need to derive data from a legacy id.  This is most likely from a bookmarked
 * link. We will depreciate this eventually
 */
function handleSavedItemResponse(responseData, legacy) {
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
  const addLegacy = legacy ? { legacy: true } : {}
  return {
    item,
    relatedArticlesById,
    savedData,
    ...addLegacy
  }
}

/**
 * We are kinda mocking out a share response here since it is a direct
 * url copy.  No context will be available, but we handle that downstream
 */
function handleShareResponse(item, savedItem = {}) {
  return {
    share: {
      context: {},
      preview: {
        item
      }
    },
    savedItem
  }
}

/**
 * isNumeric
 * ---
 * More robust than just isNaN
 * https://stackoverflow.com/questions/175739/how-can-i-check-if-a-string-is-a-valid-number
 * @returns boolean
 */
function isNumeric(str) {
  if (typeof str != 'string') return false // we only process strings!
  return (
    !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
    !isNaN(parseFloat(str))
  ) // ...and ensure strings of whitespace fail
}
