import { useDispatch, useSelector } from 'react-redux'
import { ShareModal } from 'components/share-modal/share-modal'
import { shareCancel, shareUpdateContext } from 'connectors/items/mutation-share.state'
import { shareMastodon } from 'connectors/items/mutation-share.state'
import { sendSnowplowEvent } from 'connectors/snowplow/snowplow.state'
import { ShareToMastodon } from 'components/share-modal/share-mastodon'

export const ConfirmShare = () => {
  const dispatch = useDispatch()

  const item = useSelector((state) => state.mutationShare.item)
  const shareUrl = useSelector((state) => state.mutationShare.shareUrl)
  const quote = useSelector((state) => state.mutationShare.quote)
  const note = useSelector((state) => state.mutationShare.note)
  const slug = useSelector((state) => state.mutationShare.slug)
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

  const updateContext = (note) => {
    dispatch(shareUpdateContext(slug, { quote, note }))
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
        shareUrl={shareUrl}
        thumbnail={thumbnail}
        quote={quote}
        note={note}
        showModal={!!itemId && !mastodonOpen}
        updateContext={updateContext}
        cancelShare={cancelShare}
        engagementEvent={engagementEvent}
        handleMastodon={handleMastodon}
      />
      <ShareToMastodon
        showModal={mastodonOpen}
        cancelShare={cancelShare}
        shareAction={confirmMastodon}
        url={shareUrl}
      />
    </>
  )
}
