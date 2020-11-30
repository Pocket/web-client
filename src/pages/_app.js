import '@pocket/web-ui/lib/pocket-web-ui.css'
import { ViewportProvider } from '@pocket/web-ui'

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

/** Setup Files
 --------------------------------------------------------------- */
import { sentrySettings } from 'common/setup/sentry'
import { loadPolyfills } from 'common/setup/polyfills'
// import { appWithTranslation } from 'common/setup/i18n'
import { initializeSnowplow } from 'common/setup/snowplow'

import { trackPageView } from 'connectors/snowplow/snowplow.state'
import { GOOGLE_ANALYTICS_ID } from 'common/constants'
import ReactGA from 'react-ga'

/** Set up Sentry so we may catch errors
 --------------------------------------------------------------- */
Sentry.init(sentrySettings)

/** App
 --------------------------------------------------------------- */
function PocketWebClient({ Component, pageProps, err }) {
  // Initialize app once per page load
  const dispatch = useDispatch()
  const router = useRouter()

  const { user_status, user_id, sess_guid } = useSelector((state) => state.user)
  const path = router.pathname

  useEffect(() => {
    // Load any relevant polyfills
    loadPolyfills()
  }, [])

  // Check user auth status
  useEffect(() => {
    if (user_status !== 'pending') return

    // Check cookies (these are first party cookies)
    const cookies = parseCookies()
    const {
      pkt_request_code,
      pkt_access_token,
      sess_guid,
      list_mode = 'grid'
    } = cookies
    dispatch(listModeSet(list_mode))
    /**
     * First time user
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

        // hydrate features
        const features = await fetchUnleashData(user, sess_guid)
        if (features) dispatch(featuresHydrate(features))
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
        sess_guid: cookies.sess_guid,
        user_id: cookies.user_id,
        username: cookies.username,
        email: cookies.email,
        birth: cookies.birth,
        first_name: cookies.first_name,
        last_name: cookies.last_name,
        premium_status: cookies.premium_status,
        profile: {
          avatar_url: cookies.avatar_url
        }
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
  }, [user_status, dispatch])

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

    // Hydrate locally stored values
    dispatch(hydrateUserTags())

    // signal to Cypress that React client side has loaded
    // Make sure this is the last thing we fire
    // signalTestsReady()
  }, [user_status, sess_guid, user_id, path, dispatch])

  // Provider is created automatically by the wrapper by next-redux-wrapper
  return (
    <ViewportProvider>
      <Component {...pageProps} err={err} />
    </ViewportProvider>
  )
}

/**
 * Export the app.  This wraps the app with a few things:
 * 1. Redux: for managing state
 * 2. ReduxSaga: for managing async state requirements
 */
export default wrapper.withRedux(PocketWebClient)
