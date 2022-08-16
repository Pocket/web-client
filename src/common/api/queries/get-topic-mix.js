import { requestGQL } from 'common/utilities/request/request'

export async function getTopicMix(topicsSelectors) {
  const recommendationCount = topicsSelectors.length < 3 ? 6 : 2 // get enough to fill in a grid
  const arrayOfQueries = topicsSelectors.map(
    (topic, index) => `
    topic${index}: getSlate(slateId: "${topic.slateId}", recommendationCount: ${recommendationCount}){
      displayName
      description
      slateId: id
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
    query: query,
    operationName: 'GetTopicMix'
  })
    .then(handleResponse)
    .catch((error) => console.error(error))
}

export const displayNames = {
  '505c0126-d54d-42ef-8fe7-0f6a6f24e3a5': 'Business',
  'b4032752-155b-4f09-ac1e-f5337df19e88': 'Career',
  'b0de37c0-81ef-4063-a432-1bb64270b039': 'Education',
  'e9df8a81-19af-48e2-a90f-05e9a37491ca': 'Entertainment',
  '1a634351-361b-4115-a9d5-b79131b1f95a': 'Food',
  '4cc738f7-25a9-4511-9cc3-68a8f9be91f8': 'Gaming',
  '7cb4f497-fd05-42c5-9f78-3650e9ddba21': 'Health & Fitness',
  '90adee1c-7794-4f41-9645-2ff9cf91113c': 'Parenting',
  '0c09627b-a409-4768-b87d-7e1d29259785': 'Personal Finance',
  '9bece73b-4d54-43a6-bb10-d7b02abcd181': 'Politics',
  'b64c873e-7f05-496e-8be4-bfae929c8a04': 'Science',
  '6d1273a5-055e-4de0-8a5b-5f2b79d37e5c': 'Self Improvement',
  'ea40bef5-4406-488d-ad9d-915dfa1f0794': 'Sports',
  'e0d7063a-9421-4148-b548-446e9fbc8566': 'Technology',
  '9389d944-fdcf-4394-9ca3-4604c0af4fac': 'Travel'
}

function handleResponse(response) {
  const responseData = response?.data
  const enrichedResponse = Object.values(responseData).map((slate) => {
    const { slateId, displayName } = slate
    slate.displayName = displayNames[slateId] || displayName
    return slate
  })

  return enrichedResponse
}
