import '@pocket/web-ui/lib/pocket-web-ui.css'
import { ViewportProvider } from '@pocket/web-ui'
import { appWithTranslation } from 'next-i18next'

import { useEffect } from 'react'
import { wrapper } from 'store'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import * as Sentry from '@sentry/node'
import { parseCookies } from 'nookies'

import { setUser } from 'connectors/user/user.state'
import { getSessGuid, sessGuidHydrate } from 'connectors/user/user.state'

import { fetchUnleashData } from 'connectors/feature-flags/feature-flags.state'
import { featuresHydrate } from 'connectors/feature-flags/feature-flags.state'

import { hydrateUserTags } from 'containers/my-list/tags-page/tags-page.state'

import { appSetPreferences } from 'connectors/app/app.state'

import { legacyAnalyticsTrack } from 'common/api/legacy-analytics'

import { PostTrustInit } from 'connectors/one-trust/one-trust'

/** Setup Files
 --------------------------------------------------------------- */
import { sentrySettings } from 'common/setup/sentry'
import { loadPolyfills } from 'common/setup/polyfills'
import { initializeSnowplow } from 'common/setup/snowplow'
import { loadOptinMonster } from 'common/utilities/third-party/opt-in-monster'
import { signalTestsReady } from '../../cypress/support/utils'

import { trackPageView } from 'connectors/snowplow/snowplow.state'
import { finalizeSnowplow } from 'connectors/snowplow/snowplow.state'

import { GOOGLE_ANALYTICS_ID } from 'common/constants'
import ReactGA from 'react-ga'

import { Shortcuts } from 'connectors/shortcuts/shortcuts'
import { DevTools } from 'connectors/dev-tools/dev-tools'

/** Set up Sentry so we may catch errors
 --------------------------------------------------------------- */
Sentry.init(sentrySettings)

/** App
 --------------------------------------------------------------- */
function PocketWebClient({ Component, pageProps, err }) {
  // Initialize app once per page load
  const dispatch = useDispatch()
  const router = useRouter()

  const { user_status, user_id, sess_guid, birth } = useSelector((state) => state.user) //prettier-ignore
  const path = router.pathname

  const showDevTools = process.env.SHOW_DEV === 'included'

  const { authRequired } = pageProps

  useEffect(() => {
    // Fired on componentDidMount in web-app-draft
    legacyAnalyticsTrack({ action: 'opened_app' })

    // Log out version for quick scan.  Can also help support get a read on
    // what version a user is on when reporting an error
    const RELEASE_VERSION = process.env.RELEASE_VERSION || 'v0.0.0'
    console.log(`Pocket Web Client: ${RELEASE_VERSION}`)

    // Load any relevant polyfills
    loadPolyfills()
  }, [])

  // Check user status with cookies
  useEffect(() => {
    if (user_status !== 'pending') return

    const cookies = parseCookies()
    const { sess_guid } = cookies

    // Set up defaults/user pref in state
    dispatch(appSetPreferences())

    /**
     * First time user
     * We don't have a sess_guid for this users so we are gonna
     * assume they are a logged out user and treat them as such
     * --------------------------------------------------------------
     */
    const initializeUser = async () => {
      const sess_guid = await getSessGuid()
      if (!sess_guid) return
      dispatch(sessGuidHydrate(sess_guid))
      dispatch(setUser(false))
    }

    /**
     * User awaiting validation
     * This will only happen when we are using an cookies auth flow
     * --------------------------------------------------------------
     */
    const validateUser = () => {
      dispatch(sessGuidHydrate(sess_guid))
      dispatch(setUser())
    }

    if (!sess_guid) initializeUser()
    if (sess_guid) validateUser()
  }, [user_status, dispatch])

  // 3rd party initializations
  useEffect(() => {
    if (user_status === 'pending' || user_status === 'invalid' || !sess_guid) return

    // Set up Snowplow
    const finalizeInit = () => dispatch(finalizeSnowplow())
    initializeSnowplow(user_id, sess_guid, finalizeInit)

    // Set up Google Analytics
    ReactGA.initialize(GOOGLE_ANALYTICS_ID)

    // Load OptinMonster
    loadOptinMonster()
  }, [user_id, user_status, sess_guid, dispatch])

  // Hydrate user features
  useEffect(() => {
    if (user_status === 'pending' || user_status === 'invalid') return null

    const hydrateFeatures = async () => {
      const features = await fetchUnleashData(user_id, sess_guid, birth)
      if (features) dispatch(featuresHydrate(features))
    }

    hydrateFeatures()

    // Hydrate locally stored values
    dispatch(hydrateUserTags())

    // signal to Cypress that React client side has loaded
    // Make sure this is the last thing we fire
    signalTestsReady()
  }, [user_status, sess_guid, user_id, birth, dispatch])

  // Track Page Views
  useEffect(() => {
    if (user_status === 'pending' || user_status === 'invalid') return null

    dispatch(trackPageView())
    ReactGA.pageview(path)
  }, [user_status, sess_guid, user_id, path, dispatch])

  useEffect(() => {
    if (authRequired && user_status === 'invalid') {
      window.location = 'https://getpocket.com/login?src=web-client'
    }
  }, [authRequired, user_status])

  // Provider is created automatically by the wrapper by next-redux-wrapper
  const shouldRender = authRequired ? user_status !== 'pending' && user_status !== 'invalid' : true

  return (
    <ViewportProvider>
      <PostTrustInit path={path} />
      {showDevTools ? <DevTools /> : null}
      <Shortcuts />
      {shouldRender ? <Component {...pageProps} err={err} /> : null}
    </ViewportProvider>
  )
}

/**
 * Export the app.  This wraps the app with a few things:
 * 1. Redux: for managing state
 * 2. ReduxSaga: for managing async state requirements
 */
export default wrapper.withRedux(appWithTranslation(PocketWebClient))
