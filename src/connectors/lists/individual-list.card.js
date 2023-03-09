import { cx } from 'linaria'
import { useSelector, useDispatch } from 'react-redux'
import { mutateListItemDelete } from './mutation-delete.state'
import { Item } from 'components/item/item'
import { stackedGrid, stackedGridNoAside } from 'components/item/items-layout'

export const IndividualListCard = ({ id, listId }) => {
  const item = useSelector((state) => state.listsDisplay[id])

  if (!item) return null

  return (
    <div className={cx(stackedGrid, stackedGridNoAside)}>
      <Item
        listId={listId}
        itemId={item.externalId}
        title={item.title}
        excerpt={item.excerpt}
        itemImage={item.imageUrl}
        publisher={item.publisher}
        openUrl={item.url}
        onItemInView={() => { }} // impression event here
        onOpenOriginalUrl={() => { }} // engagement event here
        onOpen={() => { }} // engagement event here
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
