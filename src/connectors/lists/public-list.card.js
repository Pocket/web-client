import { cx } from 'linaria'
import { useSelector, useDispatch } from 'react-redux'
import { Item } from 'components/item/item'
import { stackedGrid, stackedGridNoAside } from 'components/item/items-layout'
import { TransitionalActions } from 'components/item/actions/transitional'
import { mutationUpsertTransitionalItem } from 'connectors/items/mutation-upsert.state'
import { mutationDeleteTransitionalItem } from 'connectors/items/mutation-delete.state'
import { setNoImage } from 'connectors/lists/lists-display.state'

export const PublicListCard = ({ listId, externalId }) => {
  const dispatch = useDispatch()

  const item = useSelector((state) => state.listsDisplay[externalId])

  if (!item || !listId) return null

  const { title, excerpt, publisher, url } = item
  const itemImage = item?.noImage ? '' : item?.imageUrl

  const onImageFail = () => dispatch(setNoImage(externalId))

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
        onItemInView={() => { }} // impression event here
        onOpenOriginalUrl={() => { }} // engagement event here
        onOpen={() => { }} // engagement event here
        Actions={ActionsTransitional}
        clamp
      />
    </div>
  )
}

export function ActionsTransitional({ id, position }) {
  const dispatch = useDispatch()

  const isAuthenticated = useSelector((state) => state.user.auth)
  const { url } = useSelector((state) => state.listsDisplay[id])
  const saveItemId = useSelector((state) => state.itemsTransitions[id])
  const saveStatus = saveItemId ? 'saved' : 'unsaved'

  if (!url) return null

  // Prep save action
  const onSave = () => {
    if (!isAuthenticated) return
    // send snowplow action here
    dispatch(mutationUpsertTransitionalItem(url, id))
  }

  const onUnSave = () => {
    if (!isAuthenticated) return
    // send snowplow action here
    dispatch(mutationDeleteTransitionalItem(url, id))
  }

  return (
    <TransitionalActions
      id={id}
      isAuthenticated={isAuthenticated}
      saveStatus={saveStatus}
      onSave={onSave}
      onUnSave={onUnSave}
    />
  )
}
