import { cx, css } from '@emotion/css'
import { useSelector, useDispatch } from 'react-redux'
import { Item } from 'components/item/item'
import { stackedGrid, stackedGridNoAside } from 'components/item/items-layout'
import { setNoImage } from 'connectors/lists/lists-display.state'
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

export const IndividualListReorderCard = ({ id }) => {
  const dispatch = useDispatch()

  const item = useSelector((state) => state.listsDisplay[id])

  if (!item) return null
  const { externalId, title, excerpt, publisher, url } = item

  const itemImage = item?.noImage ? '' : item?.imageUrl
  const onImageFail = () => dispatch(setNoImage(id))

  return (
    <div className={cx(stackedGrid, stackedGridNoAside, reorderStyles)}>
      <Item
        itemId={externalId}
        title={title}
        excerpt={excerpt}
        itemImage={itemImage}
        publisher={publisher}
        openUrl={url}
        onImageFail={onImageFail}
        Actions={ReorderActions}
        clamp
      />
    </div>
  )
}

export const ReorderActions = () => {
  return (
    <button
      tabIndex="-1"
      aria-label="Reorder items"
      data-testid="reorder-items"
      className="inline large">
      <ReorderIcon />
    </button>
  )
}
