import { Card } from 'components/item-card/card'
import { useSelector, useDispatch } from 'react-redux'
import { ActionsRec } from './card-rec-actions'
import { sendSnowplowEvent } from 'connectors/snowplow/snowplow.state'
import { css } from 'linaria'

const recStyle = css`
  h2.title {
    font-size: 1.34rem;
  }
`

export const RecCard = ({
  id,
  position,
  cardShape = 'detail',
  showExcerpt = true,
  showMedia = true
}) => {
  const dispatch = useDispatch()

  // Get data from state
  const item = useSelector((state) => state.recit.recentRecs[id])
  const { save_status, item_id, resolved_url, original_url, openExternal } = item
  const impressionFired = useSelector((state) => state.analytics.impressions.includes(id))
  const url = resolved_url || original_url
  const openUrl = save_status === 'saved' && !openExternal ? `/read/${item_id}` : original_url
  const analyticsData = {
    id,
    url,
    position,
    destination: save_status === 'saved' && !openExternal ? 'internal' : 'external'
  }

  /**
   * ITEM TRACKING
   * ----------------------------------------------------------------
   */
   const onOpenOriginalUrl = () => {
    const data = { ...analyticsData, destination: 'external' }
    dispatch(sendSnowplowEvent('home.similar.view-original', data))
  }
  const onOpen = () => dispatch(sendSnowplowEvent('home.similar.open', analyticsData))
  const onImpression = () => dispatch(sendSnowplowEvent('home.similar.impression', analyticsData))
  const onItemInView = (inView) => (!impressionFired && inView ? onImpression() : null)
  
  return item ? (
    <Card
      item={item}
      position={position}
      className={recStyle}
      cardShape={cardShape}
      showExcerpt={showExcerpt}
      showMedia={showMedia}
      openUrl={openUrl}
      openExternal={openExternal}
      // Tracking
      onItemInView={onItemInView}
      onOpen={onOpen}
      onOpenOriginalUrl={onOpenOriginalUrl}
      ActionMenu={ActionsRec}
    />
  ) : null
}
