import { cx } from 'linaria'
import { useSelector, useDispatch } from 'react-redux'
import { mutateListItemDelete } from './mutation-delete.state'
import { Item } from 'components/item/item'
import { stackedGrid, stackedGridNoAside } from 'components/item/items-layout'
import { setNoImage } from 'connectors/lists/lists-display.state'
import { sendSnowplowEvent } from 'connectors/snowplow/snowplow.state'

export const IndividualListCard = ({ id, listId, position }) => {
  const dispatch = useDispatch()

  const item = useSelector((state) => state.listsDisplay[id])
  const impressionFired = useSelector((state) => state.analytics.impressions.includes(id))

  if (!item) return null
  const { externalId, title, excerpt, publisher, url, analyticsData: passedAnalytics } = item
  const analyticsData = {
    ...passedAnalytics,
    sortOrder: position
  }

  const itemImage = item?.noImage ? '' : item?.imageUrl
  const onImageFail = () => dispatch(setNoImage(id))

  const onItemInView = (inView) => {
    if (!impressionFired && inView) {
      dispatch(sendSnowplowEvent('shareable-list.item.impression', analyticsData))
    }
  }

  return (
    <div className={cx(stackedGrid, stackedGridNoAside)}>
      <Item
        listId={listId}
        itemId={externalId}
        title={title}
        excerpt={excerpt}
        itemImage={itemImage}
        publisher={publisher}
        openUrl={url}
        externalUrl={url}
        onImageFail={onImageFail}
        onItemInView={onItemInView}
        onOpenOriginalUrl={() => {}} // engagement event here
        onOpen={() => {}} // engagement event here
        Actions={ListActions}
        clamp
      />
    </div>
  )
}

export const ListActions = ({ id, listId }) => {
  const dispatch = useDispatch()

  const handleDeleteItem = () => {
    dispatch(mutateListItemDelete({ id, listId }))
  }

  return (
    <button
      aria-label="Remove item from list"
      data-cy="remove-item"
      className="tiny outline"
      onClick={handleDeleteItem}>
      Remove
    </button>
  )
}
