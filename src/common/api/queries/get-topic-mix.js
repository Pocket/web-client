import { requestGQL } from 'common/utilities/request/request'

export async function getTopicMix(topicsSelectors) {
  const recommendationCount = topicsSelectors.length < 3 ? 6 : 2 // get enough to fill in a grid
  const arrayOfQueries = topicsSelectors.map(
    (topic) => `
    ${topic.slug}: getSlate(slateId: "${topic.slateId}", recommendationCount: ${recommendationCount}){
      displayName
      description
      displayName
      description
      recommendations {
        item {
          title
          itemId
          normalUrl
          resolvedId
          resolvedUrl
          domain
          domainMetadata {
            name
          }
          excerpt
          images {
            src
          }
          topImageUrl
          givenUrl
          collection {
            imageUrl
            intro
            title
          }
          syndicatedArticle {
            slug
            publisher {
              name
              url
            }
          }
        }
        id
        curatedInfo {
          title
          excerpt
          imageSrc
        }
      }
    }
  `
  )

  const query = `query GetTopicMix{
    ${arrayOfQueries.join('')}
  }`
  return requestGQL({
    query: query
  })
    .then(handleResponse)
    .catch((error) => console.error(error))
}

function handleResponse(response) {
  const responseData = response?.data
  return responseData
}
