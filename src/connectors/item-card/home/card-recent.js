import { Card } from 'components/item-card/card'
import { useSelector, useDispatch } from 'react-redux'
import { sendSnowplowEvent } from 'connectors/snowplow/snowplow.state'

export const RecentCard = ({
  id,
  position,
  className,
  cardShape = 'block',
  showMedia = true,
  showExcerpt = false
}) => {
  const dispatch = useDispatch()

  // Get data from state
  const item = useSelector((state) => state.myListItemsById[id])
  const impressionFired = useSelector((state) => state.analytics.impressions.includes(id))

  if (!item) return null

  const { itemId, openExternal, readUrl, externalUrl } = item
  const openUrl = readUrl && !openExternal ? readUrl : externalUrl
  const analyticsData = {
    id,
    position,
    destination: !openExternal ? 'internal' : 'external',
    ...item?.analyticsData
  }

  /**
   * ITEM TRACKING
   * ----------------------------------------------------------------
   */
  const onOpenOriginalUrl = () => {
    const data = { ...analyticsData, destination: 'external' }
    dispatch(sendSnowplowEvent('home.recent.view-original', data))
  }
  const onOpen = () => dispatch(sendSnowplowEvent('home.recent.open', analyticsData))
  const onImpression = () => dispatch(sendSnowplowEvent('home.recent.impression', analyticsData))
  const onItemInView = (inView) => (!impressionFired && inView ? onImpression() : null)

  const itemImage = item?.noImage ? '' : item?.thumbnail
  const {tags, title, publisher, excerpt, timeToRead, isSyndicated, isCollection, fromPartner } = item //prettier-ignore

  return item ? (
    <Card
      itemId={itemId}
      externalUrl={externalUrl}
      tags={tags}
      title={title}
      itemImage={itemImage}
      publisher={publisher}
      excerpt={excerpt}
      timeToRead={timeToRead}
      isSyndicated={isSyndicated}
      isCollection={isCollection}
      fromPartner={fromPartner}
      position={position}
      className={className}
      cardShape={cardShape}
      showExcerpt={showExcerpt}
      showMedia={showMedia}
      openUrl={openUrl}
      // Tracking
      onItemInView={onItemInView}
      onOpen={onOpen}
      onOpenOriginalUrl={onOpenOriginalUrl}
    />
  ) : null
}
