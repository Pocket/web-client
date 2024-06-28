import { GraphQlData, GraphQlRequest, GraphQlResponse } from '@common/types'

export const gql = String.raw

export async function pocketRequest<T extends GraphQlData>(data: GraphQlRequest): Promise<T> {
  // Grab current release of the client
  const RELEASE_VERSION = process.env.RELEASE_VERSION || 'v0.0.0'

  // API url we will use for all pocket graph requests
  const API_URL = 'https://client-api.getpocket.com/'

  // We add some additional info for the backend team
  const headers = {
    'apollographql-client-name': 'web-client',
    'apollographql-client-version': RELEASE_VERSION,
    'Content-Type': 'application/graphql-response+json'
  }

  // Stringify the query
  const body = JSON.stringify(data)

  const response = await fetch(API_URL, {
    method: 'POST',
    headers,
    body
  })

  // Error in the response itself means server is down or something
  // or the request was somehow malformed
  if (!response.ok) {
    throw new GenericRequestError(`${response.status}: ${response.statusText}`)
  }

  // Cast the response to the correct type
  const graphQlRes: GraphQlResponse<T> = await response.json()

  return graphQlRes.data
}

class GenericRequestError extends Error {
  constructor(message?: string) {
    super(message)
    this.name = 'GenericRequestError'
  }
}
