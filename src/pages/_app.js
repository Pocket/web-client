import '@pocket/web-ui/lib/pocket-web-ui.css'
import Head from 'next/head'
import { ViewportProvider } from '@pocket/web-ui'
import { appWithTranslation } from 'next-i18next'

import { useEffect } from 'react'
import { wrapper } from 'store'
import { useDispatch, useSelector } from 'react-redux'
import { parseCookies } from 'nookies'

import { setUser } from 'connectors/user/user.state'
import { getSessGuid, sessGuidHydrate } from 'connectors/user/user.state'

import { fetchUnleashData } from 'connectors/feature-flags/feature-flags.state'
import { featuresHydrate } from 'connectors/feature-flags/feature-flags.state'

import { appSetPreferences } from 'connectors/app/app.state'
import { hydrateSettings } from 'connectors/settings/settings.state'

import { legacyAnalyticsTrack } from 'common/api/legacy-analytics'

import { PostTrustInit } from 'connectors/one-trust/one-trust'

/** Setup Files
 --------------------------------------------------------------- */
import { loadPolyfills } from 'common/setup/polyfills'
import { signalTestsReady } from '../../cypress/support/utils'

import { Shortcuts } from 'connectors/shortcuts/shortcuts'
import { DevTools } from 'connectors/dev-tools/dev-tools'

/** App
 --------------------------------------------------------------- */
function PocketWebClient({ Component, pageProps, err }) {
  // Initialize app once per page load
  const dispatch = useDispatch()

  const { user_status, user_id, sess_guid, birth } = useSelector((state) => state.user) //prettier-ignore
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
    dispatch(hydrateSettings())

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

  // Hydrate user features
  useEffect(() => {
    if (user_status === 'pending') return null
    if (user_status === 'invalid') return dispatch(featuresHydrate({}))

    const hydrateFeatures = async () => {
      const features = await fetchUnleashData(user_id, sess_guid, birth)
      if (features) dispatch(featuresHydrate(features))
    }

    hydrateFeatures()

    // signal to Cypress that React client side has loaded
    // Make sure this is the last thing we fire
    signalTestsReady()
  }, [user_status, sess_guid, user_id, birth, dispatch])

  useEffect(() => {
    if (authRequired && user_status === 'invalid') {
      window.location = 'https://getpocket.com/login?src=web-client'
    }
  }, [authRequired, user_status])

  // Provider is created automatically by the wrapper by next-redux-wrapper
  const shouldRender = authRequired ? user_status !== 'pending' && user_status !== 'invalid' : true

  return (
    <>
      {/* prettier-ignore */}
      <Head>
        {/* Progressive Web App based on https://github.com/gokulkrishh/awesome-meta-and-manifest */}
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge, chrome=1" />
        <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no" />
        {/* Android  */}
        <meta name="theme-color" media="(prefers-color-scheme: light)" content="white" />
        <meta name="theme-color" media="(prefers-color-scheme: dark)" content="black" />
        <meta name="mobile-web-app-capable" content="yes" />
        {/* iOS */}
        <meta name="apple-mobile-web-app-title" content="Pocket" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        {/* Windows */}
        <meta name="msapplication-TileColor" content="#ef4056" />
        <meta name="msapplication-TileImage" content="/i/apple-touch-icon/Pocket_AppIcon_@144.png" />
        {/* Pinned Sites */}
        <meta name="application-name" content="Pocket" />
        <meta name="msapplication-tooltip" content="Pocket" />
        <meta name="msapplication-starturl" content="/" />
        {/* UC Mobile Browser */}
        <meta name="full-screen" content="yes" />
        <meta name="browsermode" content="application" />
        <meta name="viewport" content="uc-fitscreen=yes" />
        <meta name="layoutmode" content="fitscreen/standard" />
        {/*
        manifest.json provides metadata used when your web app is added to the
        homescreen on Android. See https://developers.google.com/web/fundamentals/engage-and-retain/web-app-manifest/
        */}
        <link rel="manifest" href="/manifest.json" />
        {/* Icons */}
        <link rel="apple-touch-icon-precomposed" sizes="57x57" href="/i/apple-touch-icon/Pocket_AppIcon_@57.png" />
        <link rel="apple-touch-icon-precomposed" sizes="72x72" href="/i/apple-touch-icon/Pocket_AppIcon_@72.png" />
        <link rel="apple-touch-icon-precomposed" sizes="114x114" href="/i/apple-touch-icon/Pocket_AppIcon_@114.png" />
        <link rel="apple-touch-icon-precomposed" sizes="144x144" href="/i/apple-touch-icon/Pocket_AppIcon_@144.png" />
      </Head>
      <ViewportProvider>
        <PostTrustInit />
        {showDevTools ? <DevTools /> : null}
        <Shortcuts />
        {shouldRender ? <Component {...pageProps} err={err} /> : null}
      </ViewportProvider>
    </>
  )
}

/**
 * Export the app.  This wraps the app with a few things:
 * 1. Redux: for managing state
 * 2. ReduxSaga: for managing async state requirements
 */
export default wrapper.withRedux(appWithTranslation(PocketWebClient))
