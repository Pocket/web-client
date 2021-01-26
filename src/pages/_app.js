import '@pocket/web-ui/lib/pocket-web-ui.css'
import { ViewportProvider } from '@pocket/web-ui'
import App from 'next/app'

import { useEffect } from 'react'
// import { END } from 'redux-saga'
import { wrapper } from 'store'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import * as Sentry from '@sentry/node'
import { parseCookies, destroyCookie } from 'nookies'

// import { appSetBaseURL } from 'connectors/app/app.state'
import { fetchUserData, userHydrate } from 'connectors/user/user.state'
import { getSessGuid, sessGuidHydrate } from 'connectors/user/user.state'
import { userTokenValidate } from 'connectors/user/user.state'

import { fetchUnleashData } from 'connectors/feature-flags/feature-flags.state'
import { featuresHydrate } from 'connectors/feature-flags/feature-flags.state'

import { hydrateUserTags } from 'containers/my-list/tags-page/tags-page.state'

import { listModeSet } from 'connectors/app/app.state'
import { sortOrderSet } from 'connectors/app/app.state'

/** Setup Files
 --------------------------------------------------------------- */
import { sentrySettings } from 'common/setup/sentry'
import { loadPolyfills } from 'common/setup/polyfills'
import { appWithTranslation } from 'common/setup/i18n'
import { localStore } from 'common/utilities/browser-storage/browser-storage'
import { initializeSnowplow } from 'common/setup/snowplow'

import { trackPageView } from 'connectors/snowplow/snowplow.state'
import { GOOGLE_ANALYTICS_ID } from 'common/constants'
import ReactGA from 'react-ga'

import { DevTools } from 'connectors/dev-tools/dev-tools'
import ComingSoon from 'containers/coming-soon/coming-soon'

/** Set up Sentry so we may catch errors
 --------------------------------------------------------------- */
Sentry.init(sentrySettings)

/** App
 --------------------------------------------------------------- */
function PocketWebClient({ Component, pageProps, err }) {
  const showMyList = localStore.getItem('showPocketApp') === 'true'
  const ToRender = showMyList ? Component : ComingSoon

  // Initialize app once per page load
  const dispatch = useDispatch()
  const router = useRouter()

  const { user_status, user_id, sess_guid, useOAuth } = useSelector(
    (state) => state.user
  )
  const path = router.pathname

  const showDevTools = process.env.SHOW_DEV === 'included'

  useEffect(() => {
    // Load any relevant polyfills
    loadPolyfills()
  }, [])

  // Check user oAuth status
  useEffect(() => {
    if (user_status !== 'pending' || !useOAuth) return

    // Check cookies (these are first party cookies)
    const cookies = parseCookies()
    const {
      pkt_request_code,
      pkt_access_token,
      sess_guid,
      list_mode = 'grid', // TODO: Switch this to local storage
      sort_order = 'newest' // TODO: Switch this to local storage
    } = cookies

    // Set up defaults/user pref in state
    dispatch(listModeSet(list_mode))
    dispatch(sortOrderSet(sort_order))

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
      dispatch(userHydrate(false))
    }

    /**
     * User awaiting validation
     * This will only happen when we are using an oAuth flow. This
     * takes a request code and validates it.  If valid, it grabs
     * user info and hydrates
     * --------------------------------------------------------------
     */
    const validateUser = async () => {
      // We are only gonna try this code once
      destroyCookie(null, 'pkt_request_code')

      // Get an access token set
      const isValid = await userTokenValidate(pkt_request_code)

      if (isValid) {
        // hydrate user
        const user = await fetchUserData()
        dispatch(userHydrate({ ...user, sess_guid }))
      }
    }

    /**
     * User is stored
     * --------------------------------------------------------------
     */
    const hydrateUser = async () => {
      // Check cookies (these are first party cookies)
      const cookies = parseCookies()
      const storedUser = {
        sess_guid: cookies.sess_guid
      }

      dispatch(userHydrate(storedUser, true))

      // Update user data
      const user = await fetchUserData()
      dispatch(userHydrate({ ...user, sess_guid }))
    }

    // Select a scenario
    if (!pkt_request_code && !pkt_access_token && !sess_guid) initializeUser()
    if (pkt_request_code) validateUser(pkt_request_code)
    if (pkt_access_token) hydrateUser()
    if (sess_guid && !pkt_access_token) dispatch(userHydrate(false))
  }, [user_status, useOAuth, dispatch])

  // Check user status with cookies
  useEffect(() => {
    if (user_status !== 'pending' || useOAuth) return

    // !! NOTE: This will never return a server side guid.
    // This really only  returns the sess_guid that we set.
    // This is due to the fact that the server set sess_guid is httpOnly.
    // "A cookie with the HttpOnly attribute is inaccessible to the JavaScript Document.cookie"
    //
    // Solution here is to:
    // a) set up a client side api 🤔
    // b) drop sess_guid as a requirement for snowplow 👏
    // c) make every page server rendered (as opposed to build time generated) 🤮
    // d) a and b, then use the client side api for experiments 🔬

    // Check cookies (these are first party cookies)
    const cookies = parseCookies()
    const {
      sess_guid,
      list_mode = 'grid', // TODO: Switch this to local storage
      sort_order = 'newest' // TODO: Switch this to local storage
    } = cookies

    // Set up defaults/user pref in state
    dispatch(listModeSet(list_mode))
    dispatch(sortOrderSet(sort_order))

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

      const user = await fetchUserData()
      dispatch(userHydrate(user))
    }

    /**
     * User awaiting validation
     * This will only happen when we are using an cookies auth flow
     * --------------------------------------------------------------
     */
    const validateUser = async () => {
      dispatch(sessGuidHydrate(sess_guid))

      const user = await fetchUserData()
      dispatch(userHydrate(user))
    }

    if (!sess_guid) initializeUser()
    if (sess_guid) validateUser()
  }, [user_status, useOAuth, dispatch])

  useEffect(() => {
    if (user_status === 'pending') return null

    // Set up Snowplow
    initializeSnowplow(user_id, sess_guid)

    // Track Page View
    dispatch(trackPageView())

    // Set up Google Analytics
    ReactGA.initialize(GOOGLE_ANALYTICS_ID)
    ReactGA.pageview(path)

    // Load OptinMonster
    // loadOptinMonster()

    // hydrate features
    const hydrateFeatures = async () => {
      const features = await fetchUnleashData(user_id, sess_guid)
      if (features) dispatch(featuresHydrate(features))
    }

    hydrateFeatures()

    // Hydrate locally stored values
    dispatch(hydrateUserTags())

    // signal to Cypress that React client side has loaded
    // Make sure this is the last thing we fire
    // signalTestsReady()
  }, [user_status, sess_guid, user_id, path, dispatch])

  // Provider is created automatically by the wrapper by next-redux-wrapper
  return (
    <ViewportProvider>
      {showDevTools ? <DevTools /> : null}
      <ToRender {...pageProps} err={err} />
    </ViewportProvider>
  )
}

PocketWebClient.getInitialProps = async (appContext) => ({
  ...(await App.getInitialProps(appContext))
})

/**
 * Export the app.  This wraps the app with a few things:
 * 1. Redux: for managing state
 * 2. ReduxSaga: for managing async state requirements
 */
export default wrapper.withRedux(appWithTranslation(PocketWebClient))
