import { cx } from 'linaria'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Item } from 'components/item/item'
import { stackedGrid, stackedGridNoAside } from 'components/item/items-layout'
import { TransitionalActions } from 'components/item/actions/transitional'
import { mutationUpsertTransitionalItem } from 'connectors/items/mutation-upsert.state'
import { mutationDeleteTransitionalItem } from 'connectors/items/mutation-delete.state'

export const PublicListCard = ({
  listId,
  externalId,
  title,
  excerpt,
  imageUrl,
  publisher,
  url
}) => {
  const [thumbnail, setThumbnail] = useState(imageUrl)

  if (!externalId || !listId) return null

  const onImageFail = () => setThumbnail('')

  return (
    <div className={cx(stackedGrid, stackedGridNoAside)}>
      <Item
        listId={listId}
        itemId={externalId}
        title={title}
        excerpt={excerpt}
        itemImage={thumbnail}
        publisher={publisher}
        openUrl={url}
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
  const list = useSelector((state) => state.pagePublicList.listItems)

  const { url } = list.find(item => item.externalId === id)
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
