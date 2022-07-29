import { Card } from 'components/item-card/card'
import { useSelector, useDispatch } from 'react-redux'
import { ActionsTopicRec } from './card-topic-rec-actions'
import { sendSnowplowEvent } from 'connectors/snowplow/snowplow.state'

export const CardTopicRec = ({
  id,
  position,
  className,
  cardShape,
  showExcerpt = false,
  showTopicName = false
}) => {
  const dispatch = useDispatch()

  // Get data from state
  const impressionFired = useSelector((state) => state.analytics.impressions.includes(id))
  const item = useSelector((state) => state.homeItemsById[id])
  if (!item) return null
  const { saveStatus, itemId, readUrl, externalUrl, openExternal, analyticsData } = item
  const { displayName } = analyticsData
  const topicName = showTopicName ? displayName : false

  const data = {
    id,
    position,
    destination: saveStatus === 'saved' && !openExternal ? 'internal' : 'external',
    ...analyticsData
  }

  /**
   * ITEM TRACKING
   * ----------------------------------------------------------------
   */
  const onOpenOriginalUrl = () => {
    const openData = { ...data, destination: 'external' }
    dispatch(sendSnowplowEvent('home.topic-rec.view-original', openData))
  }
  const onOpen = () => dispatch(sendSnowplowEvent('home.topic-rec.open', data))
  const onImpression = () => dispatch(sendSnowplowEvent('home.topic-rec.impression', data))
  const onItemInView = (inView) => (!impressionFired && inView ? onImpression() : null)

  /** ITEM DETAILS
  --------------------------------------------------------------- */
  const itemImage = item?.noImage ? '' : item?.thumbnail
  const {tags, title, publisher, excerpt, timeToRead, isSyndicated, isCollection, fromPartner, syndicatedUrl } = item //prettier-ignore
  const openUrl = syndicatedUrl || readUrl || externalUrl

  return (
    <Card
      topicName={topicName}
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
      openUrl={openUrl}
      titleFlow={true}
      hiddenActions={false}
      onItemInView={onItemInView}
      onOpen={onOpen}
      onOpenOriginalUrl={onOpenOriginalUrl}
      ActionMenu={ActionsTopicRec}
    />
  )
}
