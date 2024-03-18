import { requestGQL } from 'common/utilities/request/request'
import { gql } from 'common/utilities/gql/gql'

const setupMomentSlateQuery = gql`
  query SetupMomentSlate {
    setupMomentSlate {
      headline
      subheadline
      recommendations {
        corpusRecommendationId: id
        corpusItem {
          topImageUrl: imageUrl
          publisher
          title
          url
          topic
          authors {
            name
          }
          id
        }
      }
    }
  }
`
export async function getSetupSlate() {
  return requestGQL({
    query: setupMomentSlateQuery,
    operationName: 'SetupMomentSlate'
  })
    .then(handleResponse)
    .catch((error) => console.error(error))
}

function handleResponse(response) {
  const responseData = response?.data?.setupMomentSlate
  return responseData
}
