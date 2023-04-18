import { gql } from 'graphql-request'
import { requestGQL } from 'common/utilities/request/request'
import { processAllList } from '../derivers/shared-lists'

const createShareableListQuery = gql`
  mutation CreateShareableList($listData: CreateShareableListInput!, $listItemData: CreateShareableListItemWithList) {
    createShareableList(listData: $listData, listItemData: $listItemData) {
      title
      status
      slug
      moderationStatus
      description
      externalId
      createdAt
      updatedAt
      listItems {
        createdAt
        excerpt
        externalId
        imageUrl
        itemId
        sortOrder
        title
        updatedAt
        url
        publisher
      }
    }
  }
`
export function createShareableList({ listData, listItemData }) {
  return requestGQL({
    query: createShareableListQuery,
    operationName: 'createShareableList',
    variables: { listData, listItemData }
  })
    .then(handleResponse)
    .catch((error) => console.error(error))
}

function handleResponse(response) {
  const responseData = response?.data?.createShareableList
  const processedData = processAllList([responseData])

  return processedData
}
