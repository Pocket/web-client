/* GraphQL */
//
const getUnleashAssignments = `
  query GetUnleashAssignments($sessionId: String!, $userId: String, $accountCreatedAt: String, $appName: String) {
    getUnleashAssignments(context: {
      sessionId: $sessionId
      userId: $userId,
      appName: $appName,
      properties: {
        accountCreatedAt: $accountCreatedAt
      }
    }){
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
