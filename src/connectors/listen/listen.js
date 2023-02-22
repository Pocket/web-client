import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getAudioFile } from 'connectors/listen/listen.state'
import { Audio } from 'components/audio/audio'
import { sendSnowplowEvent } from 'connectors/snowplow/snowplow.state'

export const Listen = ({ itemId, path }) => {
  const dispatch = useDispatch()

  const isAuthenticated = useSelector((state) => state.user?.auth)
  const file = useSelector((state) => state.listen[itemId])

  useEffect(() => {
    if (isAuthenticated && itemId) dispatch(getAudioFile(itemId))
  }, [dispatch, isAuthenticated, itemId ])

  if (!file) return null

  const { status, url } = file
  const available = status === 'available'

  const analyticsData = { url: path }

  // Snowplow Events
  const playEvent = () => dispatch(sendSnowplowEvent('listen.play', analyticsData))
  const pauseEvent = () => dispatch(sendSnowplowEvent('listen.pause', analyticsData))
  const rateChangeEvent = (rate) => dispatch(sendSnowplowEvent('listen.pause', { ...analyticsData, value: rate }))
  const endEvent = () => dispatch(sendSnowplowEvent('listen.end', analyticsData))

  return (url && available) ? (
    <Audio
      url={url}
      playEvent={playEvent}
      pauseEvent={pauseEvent}
      rateChangeEvent={rateChangeEvent}
      endEvent={endEvent}
    />
  ) : null
}
