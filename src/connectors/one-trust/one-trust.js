import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'

import { pageview } from 'common/utilities/analytics/ga'
import { loadOptinMonster } from 'common/utilities/third-party/opt-in-monster'
import { ONETRUST_EMPTY_DEFAULT } from 'common/constants'
import { trackPageView } from 'connectors/snowplow/snowplow.state'
import { initializeSnowplow } from 'common/setup/snowplow'
import { finalizeSnowplow } from 'connectors/snowplow/snowplow.state'
import { useRouter } from 'next/router'
import { updateOnetrustData } from './one-trust.state'

/**
 * Initialization file. We are using this because of the way the _app file
 * is wrapped in this version. This problem will not exist when we move
 * fully to web-client
 */
export function PostTrustInit() {
  // Initialize app once per page load
  const dispatch = useDispatch()
  const router = useRouter()

  const path = router.asPath
  const [analyticsInit, analyticsInitSet] = useState(false)
  const { user_status, user_id, sess_guid } = useSelector((state) => state.user)
  const oneTrustReady = useSelector((state) => state.oneTrust?.trustReady)
  const analytics = useSelector((state) => state.oneTrust?.analytics) //prettier-ignore
  const analyticsCookie = analytics?.enabled
  const isProduction = process.env.NODE_ENV === 'production'

  useEffect(() => {
    function checkCookies() {
      if (global.OptanonActiveGroups && global.OptanonActiveGroups !== ONETRUST_EMPTY_DEFAULT) {
        dispatch(updateOnetrustData(global.OptanonActiveGroups))
      } else {
        setTimeout(checkCookies, 50)
      }
    }

    let timer = setTimeout(checkCookies, 50)

    return () => clearTimeout(timer)
  }, [dispatch])

  useEffect(() => {
    if (analyticsInit || !oneTrustReady) return
    if (user_status === 'pending' || !sess_guid) return

    // Set up Snowplow
    const finalizeInit = () => dispatch(finalizeSnowplow())
    initializeSnowplow(user_id, sess_guid, analyticsCookie, finalizeInit)

    // Setting this so we don't get a glut of false positives with shifting
    // cookie preferences
    analyticsInitSet(true)
  }, [oneTrustReady, analyticsCookie, analyticsInit, dispatch, user_status, sess_guid, user_id])

  useEffect(() => {
    // Load Opt In Monster for marketing/conversion adventurers ... but not during dev
    if (!isProduction) return
    loadOptinMonster()
  }, [isProduction])

  // Track Snowplow Page Views
  useEffect(() => {
    if (user_status === 'pending') return null
    if (!analyticsInit) return null

    dispatch(trackPageView())
  }, [user_status, sess_guid, user_id, path, dispatch, analyticsInit])

  // Track GA Page Views
  useEffect(() => {
    router.events.on('routeChangeComplete', pageview)
    return () => {
      router.events.off('routeChangeComplete', pageview)
    }
  }, [router.events, dispatch])

  return <></>
}
