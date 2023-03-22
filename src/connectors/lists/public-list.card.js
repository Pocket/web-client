import { cx } from 'linaria'
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

  const { title, excerpt, publisher, url, analyticsData: passedAnalytics } = item
  const itemImage = item?.noImage ? '' : item?.imageUrl

  const analyticsData = {
    ...passedAnalytics,
    sortOrder: position
  }

  const onImageFail = () => dispatch(setNoImage(externalId))

  const onImpression = () =>
    dispatch(sendSnowplowEvent('public-list.item.impression', analyticsData))
  const onItemInView = (inView) =>
    !impressionFired && inView && analyticsInitialized ? onImpression() : null

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
