import { Card } from 'components/item-card/card'
import { useSelector, useDispatch } from 'react-redux'
import { ActionsRec } from './card-rec-actions'
import { sendSnowplowEvent } from 'connectors/snowplow/snowplow.state'

export const RecCard = ({ id, position }) => {
  const dispatch = useDispatch()

  // Get data from state
  const impressionFired = useSelector((state) => state.analytics.impressions.includes(id))
  const item = useSelector((state) => state.recit.readerRecs[id])
  const { save_status, item_id, original_url, openExternal } = item
  const openUrl = save_status === 'saved' && !openExternal ? `/read/${item_id}` : original_url
  const analyticsData = {
    id,
    url: openUrl,
    position,
    destination: (save_status === 'saved' && !openExternal) ? 'internal' : 'external'
  }

  /**
   * ITEM TRACKING
   * ----------------------------------------------------------------
   */
  const onOpen = () => dispatch(sendSnowplowEvent('reader.rec.open', analyticsData))
  const onImpression = () => dispatch(sendSnowplowEvent('reader.rec.impression', analyticsData))
  const onItemInView = (inView) => (!impressionFired && inView ? onImpression() : null)

  return item ? (
    <Card
      id={id}
      cardShape="block"
      position={position}
      item={item}
      showExcerpt={true}
      onItemInView={onItemInView}
      onOpen={onOpen}
      onOpenOriginalUrl={onOpen}
      hiddenActions={false}
      openUrl={openUrl}
      ActionMenu={ActionsRec}
    />
  ) : null
}
