import { gql } from 'common/utilities/gql/gql'
import { requestGQL } from 'common/utilities/request/request'

const setTopicPreferencesQuery = gql`
  mutation UpdateUserRecommendationPreferences($input: UpdateUserRecommendationPreferencesInput!) {
    updateUserRecommendationPreferences(input: $input) {
      preferredTopics {
        id
      }
    }
  }
`

/**
 * 
 * @param {*} preferredTopics 
 [
   {"id":"1bf756c0-632f-49e8-9cce-324f38f4cc71"},
   {"id":"45f8e740-42e0-4f54-8363-21310a084f1f"}
 ]
 * @returns 
 */
export function setTopicPreferences(preferredTopics) {
  return requestGQL({
    query: setTopicPreferencesQuery,
    operationName: 'UpdateUserRecommendationPreferences',
    variables: { input: { preferredTopics } }
  })
    .then((response) => response?.data?.updateUserRecommendationPreferences)
    .catch((error) => console.error(error))
}
