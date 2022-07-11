import { requestGQL } from 'common/utilities/request/request'
import { gql } from 'graphql-request'
import { FRAGMENT_ITEM } from 'common/api/fragments/fragment.item'

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
    query: setupMomentSlateQuery
  })
    .then(handleResponse)
    .catch((error) => console.error(error))
}

function handleResponse(response) {
  const responseData = response?.data?.setupMomentSlate
  return responseData
}
