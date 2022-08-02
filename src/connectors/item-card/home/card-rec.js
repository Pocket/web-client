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
  const { saveStatus, itemId, readUrl, externalUrl, openExternal } = item
  const impressionFired = useSelector((state) => state.analytics.impressions.includes(id))
  const openUrl = readUrl && !openExternal ? readUrl : externalUrl
  const analyticsData = {
    id,
    position,
    destination: saveStatus === 'saved' && !openExternal ? 'internal' : 'external',
    ...item?.analyticsData
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
