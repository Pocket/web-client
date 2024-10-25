import type { NextApiResponse } from 'next'
import { gql } from 'common/utilities/gql/gql'

export default function handler(res: NextApiResponse): Promise<void> | undefined {
  const getUserQuery = gql`
    query GetUser {
      user {
        avatarUrl
        description
        name
        firstName
        lastName
        username
        isPremium
        accountCreationDate
      }
    }
  `

  const RELEASE_VERSION = process.env.RELEASE_VERSION ?? 'v0.0.0'
  const path = `https://getpocket.com/graphql?consumer_key=94110-6d5ff7a89d72c869766af0e0`

  const requestHeaders: HeadersInit = new Headers()
  requestHeaders.set('Content-Type', 'application/json')
  requestHeaders.set('apollographql-client-name', 'web-client')
  requestHeaders.set('apollographql-client-version', RELEASE_VERSION)
  requestHeaders.set('Origin', 'https://getpocket.com')

  try {
    return fetch(path, {
      method: 'POST',
      credentials: 'include',
      headers: requestHeaders,
      body: JSON.stringify({ query: getUserQuery })
    })
      .then((response) => response.json())
      .then((response) => {
        res.status(200).json(response)
      })
  } catch {
    console.warn('USER API ERROR')
  }
}
