import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getAudioFile } from 'connectors/listen/listen.state'
import { Audio } from 'components/audio/audio'
import { useInView } from 'react-intersection-observer'
import { sendSnowplowEvent } from 'connectors/snowplow/snowplow.state'

export const Listen = ({ itemId, path }) => {
  const dispatch = useDispatch()

  const isAuthenticated = useSelector((state) => state.user?.auth)
  const file = useSelector((state) => state.listen[itemId])

  useEffect(() => {
    if (isAuthenticated && itemId) dispatch(getAudioFile(itemId))
  }, [dispatch, isAuthenticated, itemId])

  const { status, url } = file || {}
  const available = status === 'available'

  const analyticsData = { url: path }

  const [viewRef] = useInView({
    triggerOnce: true,
    threshold: 0.5,
    onChange: (inView) => {
      if (inView) {
        dispatch(sendSnowplowEvent('listen.impression', analyticsData))
      }
    }
  })

  // Events
  const playEvent = () => {
    dispatch(sendSnowplowEvent('listen.play', analyticsData))
  }

  const pauseEvent = () => {
    dispatch(sendSnowplowEvent('listen.pause', analyticsData))
  }

  const rateChangeEvent = (rate) => {
    dispatch(sendSnowplowEvent('listen.rate', { ...analyticsData, value: rate }))
  }

  const endEvent = () => {
    dispatch(sendSnowplowEvent('listen.end', analyticsData))
  }

  return url && available ? (
    <div ref={viewRef}>
      <Audio
        url={url}
        playEvent={playEvent}
        pauseEvent={pauseEvent}
        rateChangeEvent={rateChangeEvent}
        endEvent={endEvent}
      />
    </div>
  ) : null
}
