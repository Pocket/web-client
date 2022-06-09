import { requestGQL } from 'common/utilities/request/request'
import { gql } from 'graphql-request'

const slateIds = {
  business: '505c0126-d54d-42ef-8fe7-0f6a6f24e3a5',
  career: 'b4032752-155b-4f09-ac1e-f5337df19e88',
  education: 'b0de37c0-81ef-4063-a432-1bb64270b039',
  entertainment: 'e9df8a81-19af-48e2-a90f-05e9a37491ca',
  food: '1a634351-361b-4115-a9d5-b79131b1f95a',
  gaming: '4cc738f7-25a9-4511-9cc3-68a8f9be91f8',
  health: '7cb4f497-fd05-42c5-9f78-3650e9ddba21',
  parenting: '90adee1c-7794-4f41-9645-2ff9cf91113c',
  'personal-finance': '0c09627b-a409-4768-b87d-7e1d29259785',
  politics: '9bece73b-4d54-43a6-bb10-d7b02abcd181',
  'self-improvement': '6d1273a5-055e-4de0-8a5b-5f2b79d37e5c',
  sports: 'ea40bef5-4406-488d-ad9d-915dfa1f0794',
  technology: 'e0d7063a-9421-4148-b548-446e9fbc8566',
  science: 'b64c873e-7f05-496e-8be4-bfae929c8a04',
  travel: '9389d944-fdcf-4394-9ca3-4604c0af4fac'
}

const getRecommendationPreferenceTopicsQuery = gql`
  query RecommendationPreferenceTopics {
    recommendationPreferenceTopics {
      isDisplayed
      name
      slug
      id
    }
  }
`

export async function getTopicSelectors() {
  return requestGQL({
    query: getRecommendationPreferenceTopicsQuery
  })
    .then(handleResponse)
    .catch((error) => console.error(error))
}

function handleResponse(response) {
  const topics = response?.data?.recommendationPreferenceTopics
  const topicSelectors = topics.map((topic) => ({ ...topic, slateId: slateIds[topic.slug] }))
  return topicSelectors
}
