import { gql } from 'graphql-request'
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
    .then((response) => response?.data?.shareableListsPilotUser)
    .catch((error) => console.error(error))
}
