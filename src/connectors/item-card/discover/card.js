import { useEffect } from 'react'
import { Card } from 'components/item-card/card'
import { useSelector, useDispatch } from 'react-redux'
import { useInView } from 'react-intersection-observer'
import { trackItemImpression } from 'connectors/snowplow/snowplow.state'
import { trackItemOpen } from 'connectors/snowplow/snowplow.state'

/**
 * Article Card
 * Creates a connected `Card` with the appropriate data and actions
 * @param {object} {id, position} item_id for data and position for analytics
 */
export function ItemCard({
  id,
  position,
  positionZeroIndex,
  saveAction,
  unSaveAction,
  unAuthSaveAction,
  openAction,
  reportFeedbackAction
}) {
  // Get data from state
  const isAuthenticated = useSelector((state) => state.user.auth)
  const item = useSelector((state) => state.discoverItemsById[id])
  const impressionFired = useSelector((state) => state.analytics.impressions.includes(id))

  const { save_url, save_status } = item
  const dispatch = useDispatch()

  /**
   * ITEM TRACKING
   * ----------------------------------------------------------------
   */
  // Fire item impression
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.5 })
  useEffect(() => {
    if (impressionFired) {
      dispatch(trackItemImpression(positionZeroIndex, item, 'web-discover-card'))
    }
  }, [positionZeroIndex, item, inView, impressionFired, dispatch])

  const onSave = (isAuthenticated) => {
    if (isAuthenticated) {
      if (save_status === 'saved') dispatch(unSaveAction(id))
      if (save_status !== 'saved') dispatch(saveAction(id, save_url, position))
      return
    }

    // Not authenticated so just tracking the click
    unAuthSaveAction(position)
  }

  const onOpen = () => {
    openAction(position, item)
    dispatch(trackItemOpen(positionZeroIndex, item, 'web-discover-card'))
  }

  return (
    <Card
      ref={ref}
      item={item}
      onOpen={onOpen}
      onSave={onSave}
      itemType="message"
      showExcerpt={true}
      onReportFeedback={() => reportFeedbackAction(item)}
      isAuthenticated={isAuthenticated}
    />
  )
}
