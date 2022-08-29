import { useDispatch, useSelector } from 'react-redux'
import { ShareModal } from 'components/share-modal/share-modal'
import { shareCancel } from 'connectors/share-modal/share-modal.state'
import { shareRecommend } from 'connectors/share-modal/share-modal.state'
import { sendSnowplowEvent } from 'connectors/snowplow/snowplow.state'

export const ShareModalConnector = () => {
  const dispatch = useDispatch()

  const item = useSelector((state) => state.share.item)
  const quote = useSelector((state) => state.share.quote)
  const position = useSelector((state) => state.share.position) || 0
  const cancelShare = () => dispatch(shareCancel())

  if (!item) return null

  const {
    itemId,
    title,
    publisher,
    excerpt,
    timeToRead,
    isSyndicated,
    externalUrl,
    thumbnail,
    analyticsData
  } = item

  const engagementEvent = (identifier) => {
    dispatch(sendSnowplowEvent(identifier, { ...analyticsData, position }))
  }

  const recommendEvent = (comment) => {
    dispatch(shareRecommend({ itemId, quote, comment }))
    dispatch(sendSnowplowEvent('share.recommend', { ...analyticsData, position }))
  }

  return (
    <ShareModal
      title={title}
      publisher={publisher}
      excerpt={excerpt}
      timeToRead={timeToRead}
      isSyndicated={isSyndicated}
      externalUrl={externalUrl}
      thumbnail={thumbnail}
      quote={quote}
      showModal={itemId !== false}
      cancelShare={cancelShare}
      engagementEvent={engagementEvent}
      recommendEvent={recommendEvent}
    />
  )
}
