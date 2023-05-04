import { requestGQL } from 'common/utilities/request/request'
import { gql } from 'common/utilities/gql/gql'

const slateIds = {
  business: 'af2cc2c0-1286-47a3-b8ce-187b905f94af',
  career: '00f0c593-3c99-4d5a-9297-c66f8b00be01',
  education: '856eb5f8-da7f-43ae-ac5e-25da402af0ae',
  entertainment: 'cceefa28-906e-47c5-b704-8c5b824ecd1b',
  food: '651d27ab-a898-4173-9700-dd1726fbaaa4',
  gaming: '951ae6c3-4438-458b-9936-7f3b8ff0f178',
  health: '47023d21-0aa6-4f98-9077-eac21fad44f1',
  parenting: '1a8de2be-db03-4a2f-901a-7c4c1cbd156a',
  'personal-finance': 'f4b58337-4ab6-4563-9503-c384e773946f',
  politics: 'f8c945b0-52fa-4203-bb31-6747245fe021',
  'self-improvement': '5674f085-07b6-43c3-bcde-2774db3f6384',
  sports: 'e6c00454-4a00-47c1-8f22-906122c261ed',
  technology: 'ed9604ce-b752-48bd-b8c5-3a8cf6b54ced',
  science: 'b548b456-70c4-474d-a723-80d040d00fec',
  travel: '4345efa7-2c89-4884-b836-3260757a3a97'
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
    query: getRecommendationPreferenceTopicsQuery,
    operationName: 'RecommendationPreferenceTopics'
  })
    .then(handleResponse)
    .catch((error) => console.error(error))
}

function handleResponse(response) {
  const topics = response?.data?.recommendationPreferenceTopics
  const topicSelectors = topics.map((topic) => ({ ...topic, slateId: slateIds[topic.slug] }))
  return topicSelectors
}
