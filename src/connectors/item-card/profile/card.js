import { Card } from 'components/item-card/card'
import { useSelector, useDispatch } from 'react-redux'
import { ActionsFeed } from './card-actions'
import { PostHeader } from 'components/post-header/post-header'
import { sendSnowplowEvent } from 'connectors/snowplow/snowplow.state'

export const RecommendedFeedCard = ({ id, position }) => {
  const dispatch = useDispatch()

  // Get data from state
  const impressionFired = useSelector((state) => state.analytics.impressions.includes(id))
  const item = useSelector((state) => state.profileItemsByIds.itemsById[id])

  if (!item) return null

  const { readUrl, externalUrl, analyticsData: passedAnalytics, openExternal } = item
  const openUrl = readUrl || externalUrl
  const itemImage = item?.noImage ? '' : item?.thumbnail
  const {title, publisher, excerpt, timeToRead, isSyndicated, isCollection, post} = item //prettier-ignore
  const analyticsData = {
    id,
    position,
    ...passedAnalytics
  }

  /**
   * ITEM TRACKING
   * ----------------------------------------------------------------
   */
  const onOpen = () => dispatch(sendSnowplowEvent('profile.feed.open', analyticsData))
  const onImpression = () => dispatch(sendSnowplowEvent('profile.feed.impression', analyticsData))
  const onItemInView = (inView) => (!impressionFired && inView ? onImpression() : null)

  return item ? (
    <div className="recommendedWrapper">
      <PostHeader {...post} />
      <Card
        itemId={id}
        title={title}
        publisher={publisher}
        excerpt={excerpt}
        timeToRead={timeToRead}
        isSyndicated={isSyndicated}
        isCollection={isCollection}
        itemImage={itemImage}
        externalUrl={externalUrl}
        openExternal={openExternal}
        cardShape="wide"
        position={position}
        showExcerpt={true}
        onItemInView={onItemInView}
        onOpen={onOpen}
        onOpenOriginalUrl={onOpen}
        hiddenActions={false}
        openUrl={openUrl}
        ActionMenu={ActionsFeed}
      />
    </div>
  ) : null
}
