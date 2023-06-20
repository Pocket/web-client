import '../../public/static/pocket-web-ui.css'
import { GOOGLE_ANALYTICS_ID, LOGIN_URL } from 'common/constants'

import createCache from '@emotion/cache'
import { CacheProvider } from '@emotion/react'

import { ViewportProvider } from 'components/viewport-provider/viewport-provider'
import { appWithTranslation } from 'next-i18next'

import { useEffect } from 'react'
import { wrapper } from 'store'
import { Provider, useDispatch, useSelector } from 'react-redux'
import { parseCookies } from 'nookies'

import { setUser } from 'containers/account/account.state'
import { getSessGuid, sessGuidHydrate } from 'containers/account/account.state'

import { fetchUnleashData } from 'connectors/feature-flags/feature-flags.state'
import { featuresHydrate } from 'connectors/feature-flags/feature-flags.state'

import { checkListsPilotStatus } from 'containers/lists/lists.state'

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
const cache = createCache({ key: 'next' })

function PocketWebClient({ Component, pageProps, err }) {
  // Initialize app once per page load
  const dispatch = useDispatch()

  const { user_status, user_id, sess_guid, birth } = useSelector((state) => state.user) //prettier-ignore
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

  // Google Analytics
  useEffect(() => {
    window.gtag =
      window.gtag ||
      function () {
        window.dataLayer.push(arguments)
      }
    window.gtag('js', new Date())
    window.gtag('config', GOOGLE_ANALYTICS_ID)
  }, [])

  // Check user status with cookies
  useEffect(() => {
    if (user_status !== 'pending') return () => {}

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
      if (!sess_guid) {
        // The reason we wouldn't get a sessGuid is because of a cors error (AKA on a non-pocket)
        // so we want to invalidate the user at this point ex: https://getpocket.com/v3/guid
        dispatch(setUser(true))
        return
      }
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
    if (user_status === 'pending' || flagsReady) return () => {}
    if (user_status === 'invalid') {
      dispatch(featuresHydrate({}))
      return () => {}
    }

    // Set up defaults/user pref in state
    dispatch(appSetPreferences())
    dispatch(hydrateSettings())

    // Sets up feature flags for this user
    const hydrateFeatures = async () => {
      const locale = navigator.languages
        ? navigator.languages[0]
        : navigator.language || navigator.userLanguage

      const response = await fetchUnleashData(user_id, sess_guid, birth, locale)
      const features = response ? response : {}
      if (features) dispatch(featuresHydrate(features))
    }

    const requestListsPilotStatus = async () => {
      dispatch(checkListsPilotStatus())
    }

    hydrateFeatures()
    requestListsPilotStatus()
  }, [user_status, sess_guid, user_id, birth, dispatch, flagsReady])

  useEffect(() => {
    if (authRequired && user_status === 'invalid') {
      window.location = `${LOGIN_URL}?src=web-client`
    }
  }, [authRequired, user_status])

  const shouldRender = authRequired ? user_status !== 'pending' && user_status !== 'invalid' : true

  return (
    <ViewportProvider>
      <ThirdPartyInit />
      <DevTools />
      <Shortcuts />
      <CacheProvider value={cache}>
        {shouldRender ? <Component {...pageProps} err={err} /> : null}
      </CacheProvider>
    </ViewportProvider>
  )
}

function AppWithStore({ Component, ...rest }) {
  const { store, props } = wrapper.useWrappedStore(rest)
  return (
    <Provider store={store}>
      <PocketWebClient Component={Component} {...props} />
    </Provider>
  )
}

/**
 * Export the app.  This wraps the app with a few things:
 * 1. Redux: for managing state
 * 2. ReduxSaga: for managing async state requirements
 */
export default appWithTranslation(AppWithStore)
