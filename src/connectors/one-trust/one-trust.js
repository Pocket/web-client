import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'

import ReactGA from 'react-ga'
import { loadOptinMonster } from 'common/utilities/third-party/opt-in-monster'
import { GOOGLE_ANALYTICS_ID } from 'common/constants'
import { trackPageView } from 'connectors/snowplow/snowplow.state'

/**
 * Initialization file. We are using this because of the way the _app file
 * is wrapped in this version. This problem will not exist when we move
 * fully to web-client
 */
export function PostTrustInit({ path }) {
  // Initialize app once per page load
  const dispatch = useDispatch()

  const [analyticsInit, analyticsInitSet] = useState(false)

  const oneTrustReady = useSelector((state) => state.oneTrust?.trustReady)
  const analyticsEnabled = useSelector( (state) => state.oneTrust?.analytics.enabled ) //prettier-ignore

  useEffect(() => {
    if (!analyticsEnabled || !oneTrustReady || analyticsInit) return

    // Track Page View
    dispatch(trackPageView())

    // Set up Google Analytics
    ReactGA.initialize(GOOGLE_ANALYTICS_ID)
    ReactGA.pageview(path)

    // Load Opt In Monster for marketing/conversion adventurers
    loadOptinMonster()

    // Setting this so we don't get a glut of false positives with shifting
    // cookie preferences
    analyticsInitSet(true)
  }, [oneTrustReady, analyticsEnabled, dispatch, path, analyticsInit])

  return <></>
}
