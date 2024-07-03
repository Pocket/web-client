'use client'

import '@ui/styles/pocket/global.css' // This is our base styles
import { NavFooter } from '@ui/components/nav-footer'
import { NavTop } from '@ui/components/nav-top'

import * as Sentry from '@sentry/nextjs'
import NextError from 'next/error'
import { useEffect } from 'react'

export default function GlobalError({ error }: { error: Error & { digest?: string } }) {
  useEffect(() => {
    Sentry.captureException(error)
  }, [error])

  return (
    <html lang="en">
      <body>
        {/* `NextError` is the default Next.js error page component. Its type
        definition requires a `statusCode` prop. However, since the App Router
        does not expose status codes for errors, we simply pass 0 to render a
        generic error message. */}
        <NavTop />
        <main>
          <NextError statusCode={0} />
        </main>
        <NavFooter />
      </body>
    </html>
  )
}
