import { cx, css } from 'linaria'
import { useSelector, useDispatch } from 'react-redux'
import { Item } from 'components/item/item'
import { stackedGrid, stackedGridNoAside } from 'components/item/items-layout'
import { setNoImage } from 'connectors/lists/lists-display.state'
import { sendSnowplowEvent } from 'connectors/snowplow/snowplow.state'
import { ReorderIcon } from 'components/icons/ReorderIcon'

const reorderStyles = css`
  article {
    background: var(--color-activeCanvas);
    pointer-events: none;
    box-shadow: none;
  }

  .footer-actions {
    font-size: 24px;
    padding: 1.5px 0 1px;
  }

  .isDragging & {
    /*
      in case we want to add custom styles to the item being dragged around
      we'll want to target article here
    */
  }
`

export const IndividualListReorderCard = ({ id, position }) => {
  const dispatch = useDispatch()

  const item = useSelector((state) => state.listsDisplay[id])
  const impressionFired = useSelector((state) => state.analytics.impressions.includes(id))

  if (!item) return null
  const { externalId, title, excerpt, publisher, url, analyticsData: passedAnalytics } = item
  const analyticsData = {
    ...passedAnalytics,
    sortOrder: position,
    position,
    destination: 'external'
  }

  const itemImage = item?.noImage ? '' : item?.imageUrl
  const onImageFail = () => dispatch(setNoImage(id))

  const onItemInView = (inView) => {
    if (!impressionFired && inView) {
      dispatch(sendSnowplowEvent('shareable-list.item.impression', analyticsData))
    }
  }

  return (
    <div className={cx(stackedGrid, stackedGridNoAside, reorderStyles)}>
      <Item
        itemId={externalId}
        title={title}
        excerpt={excerpt}
        itemImage={itemImage}
        publisher={publisher}
        openUrl={url}
        externalUrl={url}
        onImageFail={onImageFail}
        // onItemInView={onItemInView}
        Actions={ReorderActions}
        clamp
      />
    </div>
  )
}

export const ReorderActions = () => {
  return (
    <button
      aria-label="Reorder items"
      data-cy="reorder-items"
      className="inline large">
      <ReorderIcon />
    </button>
  )
}
