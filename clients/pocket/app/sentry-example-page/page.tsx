'use client'

import Head from 'next/head'
import * as Sentry from '@sentry/nextjs'
import { Placard } from '@ui/components/placard'

export default function Page() {
  return (
    <div>
      <Head>
        <title>Sentry Onboarding</title>
        <meta name="description" content="Test Sentry for your Next.js app!" />
      </Head>

      <main
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
        <Placard />
        <p>Get started by sending us a sample error:</p>
        <button
          type="button"
          style={{
            padding: '12px',
            cursor: 'pointer',
            backgroundColor: '#AD6CAA',
            borderRadius: '4px',
            border: 'none',
            color: 'white',
            fontSize: '14px',
            margin: '18px'
          }}
          onClick={async () => {
            await Sentry.startSpan(
              {
                name: 'Example Frontend Span',
                op: 'test'
              },
              async () => {
                const res = await fetch('/api/sentry-example-api')
                if (!res.ok) {
                  throw new CustomExamplePageError('Sentry Example Frontend Error')
                }
              }
            )
          }}>
          Throw error!
        </button>

        <p>
          Next, look for the error on the{' '}
          <a href="https://pocket.sentry.io/issues/?project=4507488500187136">Issues Page</a>.
        </p>
        <p style={{ marginTop: '24px' }}>
          For more information, see{' '}
          <a href="https://docs.sentry.io/platforms/javascript/guides/nextjs/">
            https://docs.sentry.io/platforms/javascript/guides/nextjs/
          </a>
        </p>
      </main>
    </div>
  )
}

/**
 * CustomExampleError
 * ---
 * Custom error for better visual grepping in observability
 */
class CustomExamplePageError extends Error {
  name = 'CustomExamplePageError'
  constructor(message: string) {
    super(message)
    // because we are extending a built-in class
    Object.setPrototypeOf(this, CustomExamplePageError.prototype)
  }
}
