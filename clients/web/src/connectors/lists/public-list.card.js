import { cx } from '@emotion/css'
import { useSelector, useDispatch } from 'react-redux'
import { Item } from 'components/item/item'
import { stackedGrid, stackedGridNoAside } from 'components/item/items-layout'
import { TransitionalActions } from 'components/item/actions/transitional'
import { mutationUpsertTransitionalItem } from 'connectors/items/mutation-upsert.state'
import { mutationDeleteTransitionalItem } from 'connectors/items/mutation-delete.state'
import { setNoImage } from 'connectors/lists/lists-display.state'
import { sendSnowplowEvent } from 'connectors/snowplow/snowplow.state'

export const PublicListCard = ({ listId, externalId, position }) => {
  const dispatch = useDispatch()

  const item = useSelector((state) => state.listsDisplay[externalId])
  const impressionFired = useSelector((state) => state.analytics.impressions.includes(externalId))
  const analyticsInitialized = useSelector((state) => state.analytics.initialized)

  if (!item || !listId) return null

  const { title, excerpt, publisher, url, analyticsData: passedAnalytics, note } = item
  const itemImage = item?.noImage ? '' : item?.imageUrl

  const analyticsData = {
    ...passedAnalytics,
    sortOrder: position,
    position,
    destination: 'external',
    note
  }

  const onImageFail = () => dispatch(setNoImage(externalId))

  const onImpression = () =>
    dispatch(sendSnowplowEvent('public-list.item.impression', analyticsData))
  const onItemInView = (inView) =>
    !impressionFired && inView && analyticsInitialized ? onImpression() : null

  const onOpenOriginal = () => {
    dispatch(sendSnowplowEvent('public-list.item.open-original', analyticsData))
  }

  const onOpen = () => {
    dispatch(sendSnowplowEvent('public-list.item.open', analyticsData))
  }

  return (
    <div className={cx(stackedGrid, stackedGridNoAside)}>
      <Item
        type="list-item"
        listId={listId}
        itemId={externalId}
        title={title}
        excerpt={excerpt}
        itemImage={itemImage}
        publisher={publisher}
        note={note}
        openUrl={url}
        externalUrl={url}
        onImageFail={onImageFail}
        onItemInView={onItemInView}
        onOpenOriginalUrl={onOpenOriginal}
        onOpen={onOpen}
        analyticsData={analyticsData}
        Actions={ActionsTransitional}
        position={position}
        clamp
      />
    </div>
  )
}

export function ActionsTransitional({ id, analyticsData }) {
  const dispatch = useDispatch()

  const isAuthenticated = useSelector((state) => state.user.auth)
  const { url } = useSelector((state) => state.listsDisplay[id])
  const saveItemId = useSelector((state) => state.itemsTransitions[id])
  const saveStatus = saveItemId ? 'saved' : 'unsaved'

  if (!url) return null

  // Prep save action
  const onSave = () => {
    if (!isAuthenticated) return
    dispatch(sendSnowplowEvent('public-list.item.save', analyticsData))
    dispatch(mutationUpsertTransitionalItem(url, id))
  }

  const onUnSave = () => {
    if (!isAuthenticated) return
    dispatch(sendSnowplowEvent('public-list.item.unsave', analyticsData))
    dispatch(mutationDeleteTransitionalItem(saveItemId, id))
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
