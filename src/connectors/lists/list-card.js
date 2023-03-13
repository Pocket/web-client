import { cx } from 'linaria'
import { useSelector, useDispatch } from 'react-redux'
import { mutateListDelete } from 'connectors/lists/mutation-delete.state'
import { Item } from 'components/item/item'
import { stackedGrid, stackedGridNoAside } from 'components/item/items-layout'
import { DeleteIcon } from 'components/icons/DeleteIcon'

export const ListCard = ({ id }) => {
  const list = useSelector((state) => state.pageListsInfo[id])

  if (!list) return null

  const storyCount = list.listItems?.length || 0
  const itemImage = list.listItems?.[0]?.imageUrl
  const url = `/sharedlists/${list.externalId}/${list.slug}`

  return (
    <div className={cx(stackedGrid, stackedGridNoAside)} key={list.externalId}>
      <Item
        itemId={id}
        title={list.title}
        excerpt={list.description}
        openUrl={`/lists/${list.externalId}`}
        onItemInView={() => {}} // impression event here
        isInternalItem={true}
        listStatus={list.status}
        listUrl={url}
        storyCount={storyCount}
        itemImage={itemImage}
        Actions={ListActions}
        clamp
      />
    </div>
  )
}

export const ListActions = ({ id }) => {
  const dispatch = useDispatch()

  const handleDeleteList = () => {
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
