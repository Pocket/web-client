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

  const { saveStatus, readUrl, externalUrl, openExternal } = item
  const openUrl = readUrl && !openExternal ? readUrl : externalUrl
  const analyticsData = {
    id,
    url: openUrl,
    position,
    destination: saveStatus === 'saved' && !openExternal ? 'internal' : 'external'
  }

  /**
   * ITEM TRACKING
   * ----------------------------------------------------------------
   */
  const onOpen = () => dispatch(sendSnowplowEvent('reader.rec.open', analyticsData))
  const onImpression = () => dispatch(sendSnowplowEvent('reader.rec.impression', analyticsData))
  const onItemInView = (inView) => (!impressionFired && inView ? onImpression() : null)

  /** ITEM DETAILS
  --------------------------------------------------------------- */
  const itemImage = item?.noImage ? '' : item?.thumbnail
  const {tags, title, publisher, excerpt, timeToRead, isSyndicated, isInternalItem, fromPartner } = item //prettier-ignore

  return item ? (
    <Card
      itemId={id}
      externalUrl={externalUrl}
      tags={tags}
      title={title}
      itemImage={itemImage}
      publisher={publisher}
      excerpt={excerpt}
      timeToRead={timeToRead}
      isSyndicated={isSyndicated}
      isInternalItem={isInternalItem}
      fromPartner={fromPartner}
      cardShape="block"
      position={position}
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
