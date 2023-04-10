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
  const { access_token } = req.query

  const path = `https://getpocket.com/graphql?consumer_key=94110-6d5ff7a89d72c869766af0e0&access_token=${access_token}`

  const options = {
    method: 'POST',
    hostname: 'getpocket.com',
    path: path,
    headers: {
      'apollographql-client-name': 'web-client',
      'apollographql-client-version': RELEASE_VERSION,
      'Content-Type': 'application/json'
    },
    maxRedirects: 20,
    body: JSON.stringify({ query: getUserQuery })
  }

  try {
    return fetch(path, options)
      .then((response) => response.json())
      .then((response) => res.status(200).json(response))
  } catch (err) {
    // console.log('CLIENT API ERROR:', err)
    Sentry.withScope((scope) => {
      scope.setTransactionName('USER API ERROR')
      Sentry.captureMessage(err)
    })
  }
}
