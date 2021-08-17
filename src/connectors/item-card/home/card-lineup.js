import { Card } from 'components/item-card/card'
import { useSelector, useDispatch } from 'react-redux'
import { ActionsLineup } from './card-lineup-actions'
import { sendSnowplowEvent } from 'connectors/snowplow/snowplow.state'

export const CardLineup = ({ id, position, className, cardShape, showExcerpt = false }) => {
  const dispatch = useDispatch()

  // Get data from state
  const impressionFired = useSelector((state) => state.analytics.impressions.includes(id))
  const item = useSelector((state) => state.homeItemsById[id])
  const { save_status, item_id, resolved_url, open_url, openExternal } = item
  const analyticsData = {
    id: item_id,
    url: resolved_url,
    position,
    destination: save_status === 'saved' && !openExternal ? 'internal' : 'external'
  }

  /**
   * ITEM TRACKING
   * ----------------------------------------------------------------
   */
  const onOpen = () => dispatch(sendSnowplowEvent('home.lineup.open', analyticsData))
  const onImpression = () => dispatch(sendSnowplowEvent('home.lineup.impression', analyticsData))
  const onItemInView = (inView) => (!impressionFired && inView ? onImpression() : null)

  return (
    <Card
      item={item}
      id={id}
      position={position}
      className={className}
      cardShape={cardShape}
      showExcerpt={showExcerpt}
      openUrl={open_url}
      hiddenActions={false}
      onItemInView={onItemInView}
      onOpen={onOpen}
      ActionMenu={ActionsLineup}
    />
  )
}
