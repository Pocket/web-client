/* GraphQL */
//
const getUnleashAssignments = `
  query GetUnleashAssignments($sessionId: String!, $userId: String, $appName: String) {
    getUnleashAssignments(context: {
      sessionId: $sessionId
      userId: $userId,
      appName: $appName
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
