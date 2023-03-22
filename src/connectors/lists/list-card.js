import { cx } from 'linaria'
import { useSelector, useDispatch } from 'react-redux'
import { mutateListDelete } from 'connectors/lists/mutation-delete.state'
import { Item } from 'components/item/item'
import { stackedGrid, stackedGridNoAside } from 'components/item/items-layout'
import { DeleteIcon } from 'components/icons/DeleteIcon'
import { setNoImage } from 'connectors/lists/lists-display.state'

export const ListCard = ({ id }) => {
  const dispatch = useDispatch()

  const list = useSelector((state) => state.listsDisplay[id])

  if (!list) return null

  const { listItemIds, externalId, slug, title, description, status } = list
  const url = `/sharedlists/${externalId}/${slug}`
  const storyCount = listItemIds?.length || 0
  const itemImage = list?.noImage ? '' : list?.itemImage

  const onImageFail = () => dispatch(setNoImage(id))

  return (
    <div className={cx(stackedGrid, stackedGridNoAside)} key={list.externalId}>
      <Item
        itemId={id}
        title={title}
        excerpt={description}
        openUrl={`/lists/${externalId}`}
        onItemInView={() => {}} // impression event here
        isInternalItem={true}
        listStatus={status}
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
