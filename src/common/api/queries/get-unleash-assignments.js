import { gql } from 'graphql-request'
const getUnleashAssignments = gql`
  query GetUnleashAssignments(
    $sessionId: String!
    $userId: String
    $accountCreatedAt: String
    $locale: String
    $appName: String
    $recItUserProfile: RecItUserProfile
  ) {
    getUnleashAssignments(
      context: {
        sessionId: $sessionId
        userId: $userId
        appName: $appName
        properties: {
          accountCreatedAt: $accountCreatedAt
          locale: $locale
          recItUserProfile: $recItUserProfile
        }
      }
    ) {
      assignments {
        name
        assigned
        variant
        payload
      }
    }
  }
`

export default getUnleashAssignments
