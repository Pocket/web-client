import { useDispatch, useSelector } from 'react-redux'
import { ShareListModal } from 'components/shareable-lists/share-list-modal'
import { shareListCancel } from 'connectors/lists/mutation-share.state'
import { sendSnowplowEvent } from 'connectors/snowplow/snowplow.state'
import { BASE_URL } from 'common/constants'

export const ConfirmShare = () => {
  const dispatch = useDispatch()

  const id = useSelector((state) => state.mutationListShare.id)
  const list = useSelector((state) => state.listsDisplay[id])

  if (!list) return null

  const { title, description, externalId, slug, listItemIds, itemImage, analyticsData } = list
  const url = `${BASE_URL}/sharedlists/${externalId}/${slug}`
  const storyCount = listItemIds?.length || 0

  const cancelShare = () => dispatch(shareListCancel())

  const engagementEvent = (identifier) => {
    dispatch(sendSnowplowEvent(`shareable-list.${identifier}`, analyticsData))
  }

  return (
    <ShareListModal
      title={title}
      description={description}
      externalUrl={url}
      thumbnail={itemImage}
      storyCount={storyCount}
      showModal={true}
      cancelShare={cancelShare}
      engagementEvent={engagementEvent}
    />
  )
}
