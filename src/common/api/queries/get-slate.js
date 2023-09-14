import { requestGQL } from 'common/utilities/request/request'
import { gql } from 'common/utilities/gql/gql'
import { FRAGMENT_ITEM } from 'common/api/fragments/fragment.item'

const getSlateQuery = gql`
  query GetSlate($slateId: String!, $recommendationCount: Int) {
    getSlate(slateId: $slateId, recommendationCount: $recommendationCount) {
      displayName
      description
      displayName
      description
      recommendations {
        item {
          ...ItemDetails
        }
        id
        curatedInfo: corpusItem {
          title
          excerpt
          imageSrc
        }
      }
    }
  }
  ${FRAGMENT_ITEM}
`
export async function getSlate(slateId, recommendationCount = 3) {
  return requestGQL({
    query: getSlateQuery,
    operationName: 'GetSlate',
    variables: { slateId, recommendationCount }
  })
    .then(handleResponse)
    .catch((error) => console.error(error))
}

function handleResponse(response) {
  const responseData = response?.data?.getSlate
  return responseData
}
