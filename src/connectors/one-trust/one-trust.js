import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'

import ReactGA from 'react-ga'
import { loadOptinMonster } from 'common/utilities/third-party/opt-in-monster'
import { GOOGLE_ANALYTICS_ID } from 'common/constants'
import { trackPageView } from 'connectors/snowplow/snowplow.state'
import { initializeSnowplow } from 'common/setup/snowplow'
import { finalizeSnowplow } from 'connectors/snowplow/snowplow.state'
import { useRouter } from 'next/router'

/**
 * Initialization file. We are using this because of the way the _app file
 * is wrapped in this version. This problem will not exist when we move
 * fully to web-client
 */
export function PostTrustInit() {
  // Initialize app once per page load
  const dispatch = useDispatch()
  const router = useRouter()

  const path = router.pathname
  const [analyticsInit, analyticsInitSet] = useState(false)
  const { user_status, user_id, sess_guid } = useSelector((state) => state.user)
  const oneTrustReady = useSelector((state) => state.oneTrust?.trustReady)
  const analyticsEnabled = useSelector( (state) => state.oneTrust?.analytics.enabled ) //prettier-ignore
  const analyticsReady = analyticsEnabled && oneTrustReady

  useEffect(() => {
    if (analyticsInit) return
    if (user_status === 'pending' || user_status === 'invalid' || !sess_guid) return

    // Set up Snowplow
    const finalizeInit = () => dispatch(finalizeSnowplow())
    initializeSnowplow(user_id, sess_guid, finalizeInit)

    // Set up Google Analytics
    ReactGA.initialize(GOOGLE_ANALYTICS_ID)

    // Setting this so we don't get a glut of false positives with shifting
    // cookie preferences
    analyticsInitSet(true)
  }, [analyticsReady, analyticsInit, dispatch, user_status, sess_guid, user_id])

  useEffect(() => {
    // Load Opt In Monster for marketing/conversion adventurers
    loadOptinMonster()
  }, [])

  // Track Page Views
  useEffect(() => {
    if (user_status === 'pending' || user_status === 'invalid') return null
    if (!analyticsInit) return null

    dispatch(trackPageView())
    ReactGA.pageview(path)
  }, [user_status, sess_guid, user_id, path, dispatch, analyticsInit])

  return <></>
}
