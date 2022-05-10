import { Card } from 'components/item-card/card'
import { useSelector, useDispatch } from 'react-redux'
import { ActionsLineup } from './card-lineup-actions'
import { sendSnowplowEvent } from 'connectors/snowplow/snowplow.state'

export const CardLineup = ({ id, position, className, cardShape, showExcerpt = false }) => {
  const dispatch = useDispatch()

  // Get data from state
  const impressionFired = useSelector((state) => state.analytics.impressions.includes(id))
  const item = useSelector((state) => state.homeItemsById[id])

  if (!item) return null
  const { saveStatus, itemId, readUrl, externalUrl, openExternal, analyticsData } = item

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
    dispatch(sendSnowplowEvent('home.lineup.view-original', openData))
  }
  const onOpen = () => dispatch(sendSnowplowEvent('home.lineup.open', data))
  const onImpression = () => dispatch(sendSnowplowEvent('home.lineup.impression', data))
  const onItemInView = (inView) => (!impressionFired && inView ? onImpression() : null)

  /** ITEM DETAILS
  --------------------------------------------------------------- */
  const itemImage = item?.noImage ? '' : item?.thumbnail
  const {tags, title, publisher, excerpt, timeToRead, isSyndicated, fromPartner, syndicatedUrl } = item //prettier-ignore
  const openUrl = syndicatedUrl || readUrl || externalUrl

  return (
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
      ActionMenu={ActionsLineup}
    />
  )
}
