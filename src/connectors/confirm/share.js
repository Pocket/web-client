import { useDispatch, useSelector } from 'react-redux'
import { ShareModal } from 'components/share-modal/share-modal'
import { shareCancel } from 'connectors/items/mutation-share.state'
import { shareMastodon } from 'connectors/items/mutation-share.state'
import { sendSnowplowEvent } from 'connectors/snowplow/snowplow.state'
import { ShareToMastodon } from 'components/share-modal/share-mastodon'

export const ConfirmShare = () => {
  const dispatch = useDispatch()

  const item = useSelector((state) => state.mutationShare.item)
  const quote = useSelector((state) => state.mutationShare.quote)
  const position = useSelector((state) => state.mutationShare.position) || 0
  const mastodonOpen = useSelector((state) => state.mutationShare.mastodonOpen)
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

  const handleMastodon = () => {
    dispatch(shareMastodon())
  }

  const confirmMastodon = (instance) => {
    dispatch(sendSnowplowEvent('share.mastodon.confirm', { value: instance }))
  }

  return (
    <>
      <ShareModal
        title={title}
        publisher={publisher}
        excerpt={excerpt}
        timeToRead={timeToRead}
        isSyndicated={isSyndicated}
        externalUrl={externalUrl}
        thumbnail={thumbnail}
        quote={quote}
        showModal={!!itemId && !mastodonOpen}
        cancelShare={cancelShare}
        engagementEvent={engagementEvent}
        handleMastodon={handleMastodon}
      />
      <ShareToMastodon
        showModal={mastodonOpen}
        cancelShare={cancelShare}
        shareAction={confirmMastodon}
        url={externalUrl}
      />
    </>
  )
}
