import { cx } from 'linaria'
import { useSelector, useDispatch } from 'react-redux'
import { mutateListDelete } from 'connectors/lists/mutation-delete.state'
import { Item } from 'components/item/item'
import { stackedGrid, stackedGridNoAside } from 'components/item/items-layout'
import { DeleteIcon } from 'components/icons/DeleteIcon'
import { setNoImage } from 'connectors/lists/lists-display.state'
import { sendSnowplowEvent } from 'connectors/snowplow/snowplow.state'

export const ListCard = ({ id }) => {
  const dispatch = useDispatch()

  const list = useSelector((state) => state.listsDisplay[id])
  const impressionFired = useSelector((state) => state.analytics.impressions.includes(id))

  if (!list) return null

  const { listItemIds, externalId, slug, title, description, status, analyticsData } = list
  const url = `/sharedlists/${externalId}/${slug}`
  const storyCount = listItemIds?.length || 0
  const itemImage = list?.noImage ? '' : list?.itemImage

  const onImageFail = () => dispatch(setNoImage(id))

  const onItemInView = (inView) => {
    if (!impressionFired && inView) {
      dispatch(sendSnowplowEvent('shareable-list.impression', analyticsData))
    }
  }

  const publicListInfo = {
    externalId,
    slug,
    status
  }

  return (
    <div className={cx(stackedGrid, stackedGridNoAside)} key={list.externalId}>
      <Item
        itemId={id}
        title={title}
        excerpt={description}
        openUrl={`/lists/${externalId}`}
        onItemInView={onItemInView}
        isInternalItem={true}
        listStatus={status}
        publicListInfo={publicListInfo}
        listUrl={url}
        storyCount={storyCount}
        itemImage={itemImage}
        onImageFail={onImageFail}
        Actions={ListActions}
        clamp
      />
    </div>
  )
}

export const ListActions = ({ id }) => {
  const dispatch = useDispatch()

  const handleDeleteList = () => {
    // snowplow event
    dispatch(mutateListDelete(id))
  }

  return (
    <button
      aria-label="Delete List"
      data-cy="delete-list"
      className="tiny outline"
      onClick={handleDeleteList}>
      <DeleteIcon /> Delete
    </button>
  )
}
