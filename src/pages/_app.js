import '@pocket/web-ui/lib/pocket-web-ui.css'
import { ViewportProvider } from '@pocket/web-ui'

import { useEffect } from 'react'
import { END } from 'redux-saga'
import { wrapper } from 'store'
import { useDispatch, useSelector } from 'react-redux'
import * as Sentry from '@sentry/node'

import { fetchUserData, userHydrate } from 'connectors/user/user.state'
import { checkSessGuid, sessGuidHydrate } from 'connectors/user/user.state'
import { fetchUnleashData } from 'connectors/feature-flags/feature-flags.state'
import { featuresHydrate } from 'connectors/feature-flags/feature-flags.state'

/** Setup Files
 --------------------------------------------------------------- */
import { sentrySettings } from 'common/setup/sentry-settings'
import { loadPolyfills } from 'common/setup/polyfills'

/** Set up Sentry so we may catch errors
 --------------------------------------------------------------- */
Sentry.init(sentrySettings)

/** App
 --------------------------------------------------------------- */
function PocketWebClient({ Component, pageProps, err }) {
  // Initialize app once per page load
  const dispatch = useDispatch()
  const { user_id, sess_guid } = useSelector((state) => state.user)

  useEffect(() => {
    // Load any relevant polyfills
    loadPolyfills()

    // Set up Snowplow
    // initializeSnowplow(user_id, sess_guid)

    // Track Page View
    // dispatch(trackPageView())

    // Set up Google Analytics
    // const { path } = pageProps
    // ReactGA.initialize(GOOGLE_ANALYTICS_ID)
    // ReactGA.pageview(path)

    // Load OptinMonster
    // loadOptinMonster()

    // signal to Cypress that React client side has loaded
    // Make sure this is the last thing we fire
    // signalTestsReady()
  }, []) //eslint-disable-line react-hooks/exhaustive-deps

  // Provider is created automatically by the wrapper by next-redux-wrapper
  return (
    <ViewportProvider>
      <Component {...pageProps} err={err} />
    </ViewportProvider>
  )
}

PocketWebClient.getInitialProps = async ({ Component, ctx }) => {
  // Get the host, url and path so they are available to all pages
  const { req, store } = ctx
  const host = req.headers.host
  const url = req.protocol + '://' + host + req.originalUrl
  const path = req.originalUrl // req.originalUrl maintains query params

  // The following functions are deemed critical, render blocking requests
  // ---------------------------------------------------------------
  // !! Hydrate user information
  const user = await fetchUserData(ctx)
  if (user) store.dispatch(userHydrate(user))

  // !! Hydrate sess_guid
  const sessGuid = await checkSessGuid(ctx)
  if (sessGuid) store.dispatch(sessGuidHydrate(sessGuid))

  // !! Hydrate features set with unleash
  const features = await fetchUnleashData(user, sessGuid)
  if (features) store.dispatch(featuresHydrate(features))

  // Wait for getInitialProps to run the component if they exist
  const pageProps = {
    ...(Component.getInitialProps
      ? await Component.getInitialProps(ctx, user, sessGuid)
      : {})
  }

  // Stop the saga if on server
  if (req) {
    store.dispatch(END)
    await store.sagaTask.toPromise()
  }

  // Return our modified pageProps
  return { pageProps: { ...pageProps, url, path } }
}

/**
 * Export the app.  This wraps the app with a few things:
 * 1. Redux: for managing state
 * 2. ReduxSaga: for managing async state requirements
 */
export default wrapper.withRedux(PocketWebClient)
