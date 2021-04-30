import { Card } from 'components/item-card/card'
import { useSelector, useDispatch } from 'react-redux'
import { ActionsRec } from './card-rec-actions'

import { trackItemImpression } from 'connectors/snowplow/snowplow.state'
import { trackItemOpen } from 'connectors/snowplow/snowplow.state'

export const RecCard = ({ id, position }) => {
  const dispatch = useDispatch()

  // Get data from state
  const impressionFired = useSelector((state) => state.analytics.impressions.includes(id))
  const item = useSelector((state) => state.recit.readerRecs[id])
  const { save_status, item_id, original_url, openExternal } = item
  const openUrl = save_status === 'saved' && !openExternal ? `/read/${item_id}` : original_url

  /**
   * ITEM TRACKING
   * ----------------------------------------------------------------
   */
  const onOpen = () => dispatch(trackItemOpen(position, item, 'reader.rec.open'))
  const onImpression = () => dispatch(trackItemImpression(position, item, 'reader.rec.impression'))
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
