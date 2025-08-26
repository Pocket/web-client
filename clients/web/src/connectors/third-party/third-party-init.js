import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import Script from 'next/script'

import { pageview } from 'common/utilities/analytics/ga'
import { ONETRUST_EMPTY_DEFAULT } from 'common/constants'
import { trackPageView } from 'connectors/snowplow/snowplow.state'
import { initializeSnowplow } from 'common/setup/snowplow'
import { finalizeSnowplow } from 'connectors/snowplow/snowplow.state'
import { useRouter } from 'next/router'
import { updateOnetrustData } from './one-trust.state'
import { BRAZE_API_KEY_DEV, BRAZE_API_KEY_PROD, BRAZE_SDK_ENDPOINT } from 'common/constants'
import { initializeBraze } from 'connectors/third-party/braze.state'
import { fetchBrazeToken } from 'connectors/third-party/braze.state'

import { featureFlagActive } from 'connectors/feature-flags/feature-flags'
import { usePrevious } from 'common/utilities/hooks/has-changed'

/**
 * Initialization file. We are using this because of the way the _app file
 * is wrapped in this version. This problem will not exist when we move
 * fully to web-client
 */
export function ThirdPartyInit() {
  // Initialize app once per page load
  const dispatch = useDispatch()
  const router = useRouter()

  const path = router.asPath
  const [analyticsInit, analyticsInitSet] = useState(false)

  const { user_status, user_id, sess_guid } = useSelector((state) => state.user)
  const oneTrustReady = useSelector((state) => state.oneTrust?.trustReady)
  const analytics = useSelector((state) => state.oneTrust?.analytics)
  const settingsFetched = useSelector((state) => state.settings?.settingsFetched)
  const brazeInitialized = useSelector((state) => state.braze?.initialized)
  const brazeSubscribed = useSelector((state) => state.braze?.brazeSubscribed)
  const brazeToken = useSelector((state) => state.braze?.token)
  const prevBrazeToken = usePrevious(brazeToken)

  const enableBraze = settingsFetched && brazeSubscribed
  const prevBraze = usePrevious(enableBraze)

  const analyticsCookie = analytics?.enabled
  const isProduction = process.env.NODE_ENV === 'production'

  const featureState = useSelector((state) => state.features)
  const brazeLabUser = featureFlagActive({ flag: 'lab.braze', featureState })

  useEffect(() => {
    // opted out
    if (!enableBraze) return () => {}

    // braze already initialized
    if (brazeInitialized) return () => {}

    // no token but logged in
    if (!brazeToken && user_id) {
      dispatch(fetchBrazeToken(user_id))
      return () => {}
    }

    const version = process.env.RELEASE_VERSION || 'v.0.0.0'
    const showLogs = process.env.BRAZE_LOGS
    const APIKey = isProduction ? BRAZE_API_KEY_PROD : BRAZE_API_KEY_DEV

    // lazy load braze SDK and then initialize it and call necessary functions
    // see https://github.com/braze-inc/braze-web-sdk/issues/117 for more details on why we need to lazy load
    import('common/utilities/braze/braze-lazy-load').then(
      ({
        isDisabled,
        enableSDK,
        initialize,
        automaticallyShowInAppMessages,
        changeUser,
        openSession,
        subscribeToSdkAuthenticationFailures
      }) => {
        if (isDisabled()) enableSDK() // Was previously disabled, need to re-enable
        initialize(APIKey, {
          baseUrl: BRAZE_SDK_ENDPOINT,
          appVersion: version,
          enableLogging: (!isProduction && showLogs) || brazeLabUser, // enable logging in development or flagged users only
          openCardsInNewTab: true,
          enableSdkAuthentication: true,
          doNotLoadFontAwesome: true
        })
        automaticallyShowInAppMessages()
        if (user_id && brazeToken) changeUser(user_id, brazeToken)
        openSession()
        if (user_id) subscribeToSdkAuthenticationFailures(() => dispatch(fetchBrazeToken(user_id)))
      }
    )

    dispatch(initializeBraze())
  }, [user_id, brazeToken, brazeInitialized, enableBraze, isProduction, brazeLabUser, dispatch])

  useEffect(() => {
    // Braze turned off, and was previously on, so disable Braze
    if (!enableBraze && prevBraze) {
      import('common/utilities/braze/braze-lazy-load').then(({ disableSDK }) => disableSDK())
    }
  }, [enableBraze, prevBraze])

  useEffect(() => {
    // braze not initialized
    if (!brazeInitialized) return () => {}

    // tokens don't match! update braze SDK
    if (brazeToken !== prevBrazeToken) {
      import('common/utilities/braze/braze-lazy-load').then(({ setSdkAuthenticationSignature }) =>
        setSdkAuthenticationSignature(brazeToken)
      )
    }
  }, [brazeToken, prevBrazeToken, brazeInitialized])

  useEffect(() => {
    if (brazeLabUser && 'serviceWorker' in navigator) {
      navigator.serviceWorker.register('/service-worker.js').then(
        (registration) =>
          console.info('Service Worker registration successful with scope: ', registration.scope),
        (err) => console.warn('Service Worker registration failed: ', err)
      )
    }
  }, [brazeLabUser])

  // Get OneTrust settings
  useEffect(() => {
    function checkCookies() {
      if (global.OptanonActiveGroups && global.OptanonActiveGroups !== ONETRUST_EMPTY_DEFAULT) {
        dispatch(updateOnetrustData(global.OptanonActiveGroups))
      } else {
        setTimeout(checkCookies, 50)
      }
    }

    const timer = setTimeout(checkCookies, 50)

    return () => clearTimeout(timer)
  }, [dispatch])

  // Initialize Snowplow after OneTrust is ready
  useEffect(() => {
    if (analyticsInit || !oneTrustReady) return () => {}
    if (user_status === 'pending' || !sess_guid) return () => {}

    const finalizeInit = () => dispatch(finalizeSnowplow())
    initializeSnowplow(user_id, sess_guid, analyticsCookie, finalizeInit)

    // Setting this so we don't get a glut of false positives with shifting
    // cookie preferences
    analyticsInitSet(true)
  }, [oneTrustReady, analyticsCookie, analyticsInit, dispatch, user_status, sess_guid, user_id])

  // Track Snowplow Page Views
  useEffect(() => {
    if (user_status === 'pending') return () => {}
    if (!analyticsInit) return () => {}

    dispatch(trackPageView())
  }, [user_status, sess_guid, user_id, path, dispatch, analyticsInit])

  // Track GA Page Views
  useEffect(() => {
    router.events.on('routeChangeComplete', pageview)
    return () => {
      router.events.off('routeChangeComplete', pageview)
    }
  }, [router.events, dispatch])

  return (
    <>
      {/* put Scripts here instead of in Next Head  */}
      {/* Google Tag Manager */}
      <Script id="google-tag-manager">
        {`
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','GTM-P4LPJ42');
      `}
      </Script>
      {/* End Google Tag Manager */}
    </>
  )
}
