import { Card } from 'components/item-card/card'
import { useSelector, useDispatch } from 'react-redux'
import { ActionsDiscover } from './card-actions'

import { trackItemImpression } from 'connectors/analytics/item'
import { trackItemOpenOriginal } from 'connectors/analytics/item'
import { trackItemOpen } from 'containers/topic/topic.analytics'

/**
 * Article Card
 * Creates a connected `Card` with the appropriate data and actions
 * @param {object} {id, position} item_id for data and position for analytics
 */
export function ItemCard({ id, position, className, cardShape, showExcerpt = false }) {
  const dispatch = useDispatch()

  /** STATE DATA
   --------------------------------------------------------------- */
  const impressionFired = useSelector((state) => state.analytics?.topic.includes(id))
  const item = useSelector((state) => state.discoverItemsById[id])

  /** ITEM TRACKING
    --------------------------------------------------------------- */
  const page = 'topic'
  const onOpen = () => trackItemOpen(position, item, page)
  const onOpenOriginalUrl = () => trackItemOpenOriginal(position, item, page)
  const onItemInView = (inView) => {
    if (impressionFired || !inView) return
    dispatch(trackItemImpression(position, item, page))
  }

  return (
    <Card
      item={item}
      // Card format options
      className={className}
      cardShape={cardShape}
      showExcerpt={showExcerpt}
      // Action Trigger
      onOpen={onOpen}
      onOpenOriginalUrl={onOpenOriginalUrl}
      onItemInView={onItemInView}
      // Item Action Menu
      ActionMenu={ActionsDiscover}
    />
  )
}
