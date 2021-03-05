import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'

import ReactGA from 'react-ga'
import { initializeSnowplow } from 'common/utilities/snowplow'
import { loadOptinMonster } from 'common/utilities/external-libraries'
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
  const [functionalInit, functionalInitSet] = useState(false)

  const { user_id, sess_guid } = useSelector((state) => state.user)
  const oneTrustReady = useSelector((state) => state.oneTrust?.trustReady)
  const functionalEnabled = useSelector( (state) => state.oneTrust?.functional.enabled ) //prettier-ignore
  const analyticsEnabled = useSelector( (state) => state.oneTrust?.analytics.enabled ) //prettier-ignore

  useEffect(() => {
    if (!analyticsEnabled || !oneTrustReady || analyticsInit) return

    // Set up Snowplow
    initializeSnowplow(user_id, sess_guid)

    // Track Page View
    dispatch(trackPageView())

    // Set up Google Analytics
    ReactGA.initialize(GOOGLE_ANALYTICS_ID)
    ReactGA.pageview(path)

    // Setting this so we don't get a glut of false positives with shifting
    // cookie preferences
    analyticsInitSet(true)
  }, [
    oneTrustReady,
    analyticsEnabled,
    user_id,
    sess_guid,
    dispatch,
    path,
    analyticsInit
  ])

  useEffect(() => {
    if (!functionalEnabled || !oneTrustReady || functionalInit) return

    // Load OptinMonster
    loadOptinMonster()

    // Setting this so we don't get a glut of false positives with shifting
    // cookie preferences
    functionalInitSet(true)
  }, [functionalEnabled, oneTrustReady, functionalInit])

  return <></>
}
