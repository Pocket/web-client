//!! THIS FILE IS INCLUDED HERE DUE TO TRANSPILING ISSUE AT THE MOMENT
/**
 * GraphQLRequestBody
 * ---
 * Define the structure of a GraphQL request body
 * `variables` are optional and can be any shape you need.
 */
interface GraphQLRequestBody {
  query: string
  variables?: Record<string, unknown>
}

/**
 * GraphQLError
 * ---
 * Define the structure of GraphQL errors to handle them gracefully.
 */
interface GraphQLError {
  message: string
  extensions?: Record<string, unknown>
}

/**
 * GraphQLResponse
 * ---
 * Define the structure of a typical GraphQL response. It includes
 * either data of type T or an array of GraphQLError objects.
 */
interface GraphQLResponse<T> {
  data?: T
  errors?: GraphQLError[]
}

const API_URL = 'https://client-api.getpocket.com/'

// This just gives use better string literal handling with gql`<all the things>`
export const gql = String.raw

/**
 * gqlRequest
 * ---
 * Create a generic request function that can handle any GraphQL query.
 * It accepts a request body, an optional auth token, and extra headers.
 * The function then returns the typed data (T).
 */
export async function gqlRequest<T>(
  client: string,
  data: GraphQLRequestBody,
  token?: string
): Promise<T> {
  // Build headers. If an auth token is provided, set the Authorization header.
  // We also add some additional info for the backend team
  const headers = {
    'apollographql-client-name': client,
    'Content-Type': 'application/graphql-response+json',
    ...(token && { Authorization: `Bearer ${token}` })
  }

  // Send the POST request to GraphQL endpoint
  const response = await fetch(API_URL, {
    method: 'POST',
    headers,
    body: JSON.stringify(data)
  })

  // Error in the response itself means server is down or something
  // or the request was somehow malformed
  if (!response.ok) {
    throw new GenericRequestError(`${response.status}: ${response.statusText}`)
  }

  // Parse the JSON response, which should match the GraphQLResponse<T> shape.
  const json = (await response.json()) as GraphQLResponse<T>

  // If GraphQL returned any errors, throw them.
  if (json.errors && json.errors.length > 0) {
    throw new GraphQLRequestError(`GraphQL error: ${json.errors.map((e) => e.message).join(', ')}`)
  }

  // If GraphQL returns no `data`
  if (!json.data) {
    throw new GraphQLRequestError('No data returned from GraphQL request')
  }

  return json.data
}

/**
 * Convenience function that sets web-client as the client,
 */
export async function pocketRequest<T>(body: GraphQLRequestBody, token?: string): Promise<T> {
  return gqlRequest<T>('web-client', body, token)
}

/**
 * Convenience function that sets web-client as the client,
 */
export async function extensionRequest<T>(body: GraphQLRequestBody, token?: string): Promise<T> {
  return gqlRequest<T>('web-extension', body, token)
}

class GraphQLRequestError extends Error {
  constructor(message?: string) {
    super(message)
    this.name = 'GenericRequestError'
  }
}

class GenericRequestError extends Error {
  constructor(message?: string) {
    super(message)
    this.name = 'GenericRequestError'
  }
}
