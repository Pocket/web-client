import { Card } from 'components/item-card/card'
import { useSelector, useDispatch } from 'react-redux'
import { ActionsFeed } from './card-actions'
import { PostHeader } from 'components/post-header/post-header'

import { trackItemImpression } from 'connectors/snowplow/snowplow.state'
import { trackItemOpen } from 'connectors/snowplow/snowplow.state'

export const RecommendedFeedCard = ({ id, position }) => {
  const dispatch = useDispatch()

  // Get data from state
  const impressionFired = useSelector((state) => state.analytics.impressions.includes(id))
  const item = useSelector((state) => state.profileItemsByIds.itemsById[id])

  const { save_status, item_id, original_url, openExternal, post } = item
  const openUrl = save_status === 'saved' && !openExternal ? `/read/${item_id}` : original_url

  /**
   * ITEM TRACKING
   * ----------------------------------------------------------------
   */
  const onOpen = () => dispatch(trackItemOpen(position, item, 'recommended.feed.open'))
  const onImpression = () => dispatch(trackItemImpression(position, item, 'recommended.feed.impression')) //prettier-ignore
  const onItemInView = (inView) => (!impressionFired && inView ? onImpression() : null)

  return item ? (
    <div className="recommendedWrapper">
      <PostHeader {...post} />
      <Card
        id={id}
        cardShape="wide"
        position={position}
        item={item}
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
