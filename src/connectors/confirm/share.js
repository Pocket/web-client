import { useDispatch, useSelector } from 'react-redux'
import { ShareModal } from 'components/share-modal/share-modal'
import { shareCancel } from 'connectors/items/mutation-share.state'
import { sendSnowplowEvent } from 'connectors/snowplow/snowplow.state'

export const ConfirmShare = () => {
  const dispatch = useDispatch()

  const item = useSelector((state) => state.mutationShare.item)
  const quote = useSelector((state) => state.mutationShare.quote)
  const position = useSelector((state) => state.mutationShare.position) || 0
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
      showModal={!!itemId}
      cancelShare={cancelShare}
      engagementEvent={engagementEvent}
    />
  )
}
