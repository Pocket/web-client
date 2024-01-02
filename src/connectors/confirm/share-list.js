import { useDispatch, useSelector } from 'react-redux'
import { ShareListModal } from 'components/shareable-lists/share-list-modal'
import { shareListCancel } from 'connectors/lists/mutation-share.state'
import { shareListMastodon } from 'connectors/lists/mutation-share.state'
import { sendSnowplowEvent } from 'connectors/snowplow/snowplow.state'
import { ShareToMastodon } from 'components/share-modal/share-mastodon'
import { BASE_URL } from 'common/constants'

export const ConfirmShare = ({ snowplowId }) => {
  const dispatch = useDispatch()

  const id = useSelector((state) => state.mutationListShare.id)
  const list = useSelector((state) => state.listsDisplay[id])
  const mastodonOpen = useSelector((state) => state.mutationListShare.mastodonOpen)

  if (!list) return null

  const { title, description, externalId, slug, listItemIds, itemImage, analyticsData } = list
  const url = `${BASE_URL}/sharedlists/${externalId}/${slug}`
  const itemCount = listItemIds?.length || 0

  const cancelShare = () => dispatch(shareListCancel())

  const engagementEvent = (identifier) => {
    dispatch(sendSnowplowEvent(`${snowplowId}.${identifier}`, analyticsData))
  }

  const handleMastodon = () => {
    dispatch(shareListMastodon())
  }

  const handleCopyUrl = () => {
    dispatch(sendSnowplowEvent(`${snowplowId}.public-link.copy.share-modal`, analyticsData))
  }

  const handleOpenUrl = () => {
    dispatch(sendSnowplowEvent(`${snowplowId}.public-link.open.share-modal`, analyticsData))
  }

  return (
    <>
      <ShareListModal
        externalId={externalId}
        title={title}
        description={description}
        slug={slug}
        externalUrl={url}
        thumbnail={itemImage}
        itemCount={itemCount}
        showModal={true && !mastodonOpen}
        cancelShare={cancelShare}
        engagementEvent={engagementEvent}
        handleMastodon={handleMastodon}
        handleCopyUrl={handleCopyUrl}
        handleOpenUrl={handleOpenUrl}
      />
      <ShareToMastodon
        showModal={mastodonOpen}
        cancelShare={cancelShare}
        // shareAction={shareAction}
        url={url}
      />
    </>
  )
}
