import { gql } from 'graphql-request'
import { requestGQL } from 'common/utilities/request/request'

const getHomeQuery = gql`
  query Home($imageOptions: [CachedImageInput!]!) {
    homeSlateLineup {
      slates {
        headline
        recommendationReasonType
        subheadline
        moreLink {
          url
          text
        }
        slateId: id
        recommendations {
          corpusItem {
            id
            url
            title
            excerpt
            language
            publisher
            image {
              cachedImages(imageOptions: $imageOptions) {
                url
                id
              }
            }
            authors {
              name
            }
            topic
          }
        }
      }
    }
  }
`

/**
 * getUnifiedHome will transition to getHome once we are clear of legacy home implimentations
 * @param {} param0
 * @returns
 */
export async function getUnifiedHome() {
  return requestGQL({
    query: getHomeQuery,
    operationName: 'GetHome',
    variables: { imageOptions: [{ id: 'card', width: 600 }] }
  })
    .then(handleResponse)
    .catch((error) => console.error(error))
}

function handleResponse(response) {
  console.info(response)
  return response
}
