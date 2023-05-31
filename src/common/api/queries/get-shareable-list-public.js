import { gql } from 'common/utilities/gql/gql'
import { requestGQL } from 'common/utilities/request/request'
import { processIndividualList } from 'common/api/derivers/shared-lists'
import { FRAGMENT_SAVED_ITEM } from 'common/api/fragments/fragment.savedItem'
import { FRAGMENT_ITEM } from 'common/api/fragments/fragment.item'

const getShareableListPublicQuery = gql`
  query ShareableListPublic($slug: String!, $externalId: ID!) {
    shareableListPublic(slug: $slug, externalId: $externalId) {
      updatedAt
      title
      status
      slug
      moderationStatus
      listItemNoteVisibility
      externalId
      description
      createdAt
      listItems {
        item {
          savedItem {
            ...SavedItemDetails
            item {
              ...ItemDetails
            }
          }
        }
        createdAt
        excerpt
        externalId
        imageUrl
        itemId
        publisher
        sortOrder
        title
        updatedAt
        url
        note
      }
      user {
        username
        avatarUrl
      }
    }
  }
  ${FRAGMENT_SAVED_ITEM}
  ${FRAGMENT_ITEM}
`
export function getShareableListPublic({ listId, slug }) {
  return requestGQL({
    query: getShareableListPublicQuery,
    operationName: 'getShareableListPublic',
    variables: { slug, externalId: listId }
  })
    .then(handleResponse)
    .catch((error) => console.error(error))
}

function handleResponse(response) {
  if (response?.errors) return response

  const responseData = response?.data?.shareableListPublic
  const processedData = processIndividualList(responseData, 'pocket_public_list')

  return processedData
}
