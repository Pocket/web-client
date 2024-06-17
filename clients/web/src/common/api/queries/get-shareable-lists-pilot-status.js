import { gql } from 'common/utilities/gql/gql'
import { requestGQL } from 'common/utilities/request/request'

const getShareableListPilotStatusQuery = gql`
  query GetShareableListPilotStatus {
    shareableListsPilotUser
  }
`

export function getShareableListPilotStatus() {
  return requestGQL({
    query: getShareableListPilotStatusQuery,
    operationName: 'GetShareableListPilotStatus'
  })
    .then(handleResponse)
    .catch((error) => console.error(error))
}

function handleResponse(response) {
  try {
    const { shareableListsPilotUser, errors } = response?.data || {}
    if (errors) throw new GetShareableListPilotStatusError(errors)

    return shareableListsPilotUser
  } catch (error) {
    console.warn(error)
  }
}

/** ERRORS
 --------------------------------------------------------------- */
class GetShareableListPilotStatusError extends Error {
  constructor(message) {
    super(message)
    this.name = 'GetShareableListPilotStatusError'
  }
}
