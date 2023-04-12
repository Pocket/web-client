import type { NextApiRequest, NextApiResponse } from 'next'
import { gql } from 'graphql-request'
import * as Sentry from '@sentry/nextjs'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
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

  const RELEASE_VERSION = process.env.RELEASE_VERSION || 'v0.0.0'
  const path = `https://getpocket.com/graphql?consumer_key=94110-6d5ff7a89d72c869766af0e0`
  const options = {
    method: 'POST',
    headers: {
      'apollographql-client-name': 'web-client',
      'apollographql-client-version': RELEASE_VERSION,
      'Content-Type': 'application/json',
      Cookie: req?.headers?.cookie,
      Origin: 'https://getpocket.com'
    },
    maxRedirects: 20,
    body: JSON.stringify({ query: getUserQuery })
  }

  try {
    return fetch(path, options)
      .then((response) => response.json())
      .then((response) => res.status(200).json(response))
  } catch (err) {
    Sentry.withScope((scope) => {
      scope.setTransactionName('USER API ERROR')
      Sentry.captureMessage(err)
    })
  }
}
