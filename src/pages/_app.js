import '../../public/static/pocket-web-ui.css'

import { ViewportProvider } from 'components/viewport-provider/viewport-provider'
import { appWithTranslation } from 'next-i18next'

import { useEffect } from 'react'
import { wrapper } from 'store'
import { useDispatch, useSelector } from 'react-redux'
import { parseCookies } from 'nookies'

import { setUser } from 'containers/account/account.state'
import { getSessGuid, sessGuidHydrate } from 'containers/account/account.state'

import { fetchUnleashData } from 'connectors/feature-flags/feature-flags.state'
import { featuresHydrate } from 'connectors/feature-flags/feature-flags.state'

import { appSetPreferences } from 'connectors/app/app.state'
import { hydrateSettings } from 'connectors/settings/settings.state'

import { ThirdPartyInit } from 'connectors/third-party/third-party-init'

/** Setup Files
 --------------------------------------------------------------- */
import { loadPolyfills } from 'common/setup/polyfills'

import { Shortcuts } from 'connectors/shortcuts/shortcuts'
import { DevTools } from 'connectors/dev-tools/dev-tools'

/** App
 --------------------------------------------------------------- */
function PocketWebClient({ Component, pageProps, err }) {
  // Initialize app once per page load
  const dispatch = useDispatch()

  const { user_status, user_id, sess_guid, birth, user_models } = useSelector((state) => state.user) //prettier-ignore
  const { flagsReady } = useSelector((state) => state.features)
  const { authRequired } = pageProps

  useEffect(() => {
    // Log out version for quick scan.  Can also help support get a read on
    // what version a user is on when reporting an error
    const RELEASE_VERSION = process.env.RELEASE_VERSION || 'v0.0.0'
    console.info(`Pocket Web Client: ${RELEASE_VERSION}`)

    // Load any relevant polyfills
    loadPolyfills()
  }, [])

  // Check user status with cookies
  useEffect(() => {
    if (user_status !== 'pending') return

    const cookies = parseCookies()
    const { sess_guid } = cookies

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

  // Hydrate user features/settings
  useEffect(() => {
    if (user_status === 'pending' || flagsReady) return
    if (user_status === 'invalid') {
      dispatch(featuresHydrate({}))
      return
    }

    // Set up defaults/user pref in state
    dispatch(appSetPreferences())
    dispatch(hydrateSettings())

    // Sets up feature flags for this user
    const hydrateFeatures = async () => {
      const locale = navigator.languages
        ? navigator.languages[0]
        : navigator.language || navigator.userLanguage

      const response = await fetchUnleashData(user_id, sess_guid, birth, locale, user_models)
      const features = response ? response : {}
      if (features) dispatch(featuresHydrate(features))
    }

    hydrateFeatures()
  }, [user_status, sess_guid, user_id, birth, dispatch, user_models, flagsReady])

  useEffect(() => {
    if (authRequired && user_status === 'invalid') {
      window.location = 'https://getpocket.com/login?src=web-client'
    }
  }, [authRequired, user_status])

  // Provider is created automatically by the wrapper by next-redux-wrapper
  const shouldRender = authRequired ? user_status !== 'pending' && user_status !== 'invalid' : true

  return (
    <ViewportProvider>
      <ThirdPartyInit />
      <DevTools />
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
