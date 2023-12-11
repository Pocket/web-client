import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getAudioFile } from 'connectors/listen/listen.state'
import { Audio } from 'components/audio/audio'
import VisibilitySensor from 'components/visibility-sensor/visibility-sensor'
import { sendSnowplowEvent } from 'connectors/snowplow/snowplow.state'

export const Listen = ({ itemId, path }) => {
  const dispatch = useDispatch()

  const isAuthenticated = useSelector((state) => state.user?.auth)
  const file = useSelector((state) => state.listen[itemId])

  useEffect(() => {
    if (isAuthenticated && itemId) dispatch(getAudioFile(itemId))
  }, [dispatch, isAuthenticated, itemId])

  if (!file) return null

  const { status, url } = file
  const available = status === 'available'

  const analyticsData = { url: path }

  // Events
  const handleVisible = () => {
    import('common/utilities/braze/braze-lazy-load').then(({ logCustomEvent }) =>
      logCustomEvent('listen.impression', analyticsData)
    )
    dispatch(sendSnowplowEvent('listen.impression', analyticsData))
  }

  const playEvent = () => {
    import('common/utilities/braze/braze-lazy-load').then(({ logCustomEvent }) =>
      logCustomEvent('listen.play', analyticsData)
    )
    dispatch(sendSnowplowEvent('listen.play', analyticsData))
  }

  const pauseEvent = () => {
    import('common/utilities/braze/braze-lazy-load').then(({ logCustomEvent }) =>
      logCustomEvent('listen.pause', analyticsData)
    )
    dispatch(sendSnowplowEvent('listen.pause', analyticsData))
  }

  const rateChangeEvent = (rate) => {
    import('common/utilities/braze/braze-lazy-load').then(({ logCustomEvent }) =>
      logCustomEvent('listen.rate', { ...analyticsData, value: rate })
    )
    dispatch(sendSnowplowEvent('listen.rate', { ...analyticsData, value: rate }))
  }

  const endEvent = () => {
    import('common/utilities/braze/braze-lazy-load').then(({ logCustomEvent }) =>
      logCustomEvent('listen.end', analyticsData)
    )
    dispatch(sendSnowplowEvent('listen.end', analyticsData))
  }

  return url && available ? (
    <VisibilitySensor onVisible={handleVisible}>
      <Audio
        url={url}
        playEvent={playEvent}
        pauseEvent={pauseEvent}
        rateChangeEvent={rateChangeEvent}
        endEvent={endEvent}
      />
    </VisibilitySensor>
  ) : null
}
