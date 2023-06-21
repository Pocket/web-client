import { gql } from 'common/utilities/gql/gql'
import { requestGQL } from 'common/utilities/request/request'
import { processPublicList } from 'common/api/derivers/shared-lists'
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
          ...ItemDetails
        }
        imageUrl
        externalId
        note
        sortOrder
        createdAt
        updatedAt
      }
      user {
        username
        avatarUrl
      }
    }
  }
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
  const processedData = processPublicList(responseData, 'pocket_public_list')

  return processedData
}
