/**
 * Taken from this example without much modification at this point.  Just getting
 * it up and running for now.
 * https://github.com/zeit/next.js/blob/canary/examples/with-sentry-simple/pages/_error.js
 */
import Error from 'next/error'
import ErrorPage from 'containers/_error/error'

const ClientError = ({ statusCode, hasGetInitialPropsRun, err }) => {
  if (!hasGetInitialPropsRun && err) {
    // getInitialProps is not called in case of
    // https://github.com/zeit/next.js/issues/8592. As a workaround, we pass
    // err via _app.js so it can be captured
    console.info({ err })
  }

  return <ErrorPage statusCode={statusCode} />
}

ClientError.getInitialProps = async ({ res, err }) => {
  const errorInitialProps = await Error.getInitialProps({ res, err })

  // Workaround for https://github.com/zeit/next.js/issues/8592, mark when
  // getInitialProps has run
  errorInitialProps.hasGetInitialPropsRun = true
  errorInitialProps.namespacesRequired = ['common']

  if (res) {
    // Running on the server, the response object is available.
    //
    // Next.js will pass an err on the server if a page's `getInitialProps`
    // threw or returned a Promise that rejected

    if (res.statusCode === 404) {
      // Opinionated: do not record an exception in Sentry for 404
      return { statusCode: 404, namespacesRequired: ['common'] }
    }

    if (err) {
      return errorInitialProps
    }
  } else {
    // Running on the client (browser).
    //
    // Next.js will provide an err if:
    //
    //  - a page's `getInitialProps` threw or returned a Promise that rejected
    //  - an exception was thrown somewhere in the React lifecycle (render,
    //    componentDidMount, etc) that was caught by Next.js's React Error
    //    Boundary. Read more about what types of exceptions are caught by Error
    //    Boundaries: https://reactjs.org/docs/error-boundaries.html
    if (err) {
      return errorInitialProps
    }
  }

  // If this point is reached, getInitialProps was called without any
  // information about what the error might be. This is unexpected and may
  // indicate a bug introduced in Next.js

  return errorInitialProps
}

export default ClientError
