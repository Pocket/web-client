import { Card } from 'components/item-card/card'
import { useSelector, useDispatch } from 'react-redux'
import { ActionsRec } from './card-actions'
import { sendSnowplowEvent } from 'connectors/snowplow/snowplow.state'

export const RecCard = ({ id, position }) => {
  const dispatch = useDispatch()

  // Get data from state
  const impressionFired = useSelector((state) => state.analytics.impressions.includes(id))
  const item = useSelector((state) => state.itemsDisplay[id])
  if (!item) return null

  /** ITEM DETAILS
  --------------------------------------------------------------- */
  const itemImage = item?.noImage ? '' : item?.thumbnail
  const { title, publisher, excerpt, saveUrl, corpusRecommendationId } = item

  const analyticsData = {
    corpusRecommendationId,
    url: saveUrl,
    position,
    destination: 'external'
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
      itemId={id}
      externalUrl={saveUrl}
      title={title}
      itemImage={itemImage}
      publisher={publisher}
      excerpt={excerpt}
      cardShape="block"
      position={position}
      showExcerpt={true}
      onItemInView={onItemInView}
      onOpen={onOpen}
      onOpenOriginalUrl={onOpen}
      openUrl={saveUrl}
      ActionMenu={ActionsRec}
    />
  ) : null
}
