import { trackImpression } from 'connectors/snowplow/snowplow.state'
import { trackContentOpen } from 'connectors/snowplow/snowplow.state'
import { CONTENT_OPEN_TRIGGER_CLICK } from 'connectors/snowplow/events'
import { IMPRESSION_COMPONENT_CARD } from 'connectors/snowplow/events'
import { IMPRESSION_REQUIREMENT_VIEWABLE } from 'connectors/snowplow/events'
import { getLinkOpenTarget } from 'connectors/snowplow/events'
import { legacyAnalyticsTrack } from 'common/api/legacy-analytics'
import { ANALYTICS_VIEW } from 'common/constants'
import { ANALYTICS_LIST_MODE } from 'common/constants'
import { ANALYTICS_INDEX } from 'common/constants'

function itemContentType({ has_video, has_image, is_article }) {
  if (has_video === '2') return 'opened_video'
  if (has_image === '2') return 'opened_image'
  if (is_article === '1') return 'opened_article'
  return 'opened_web'
}

export function trackItemOpen(position, item, listType) {
  const { item_id } = item
  legacyAnalyticsTrack({
    action: itemContentType(item),
    item_id,
    [ANALYTICS_VIEW]: 'list',
    [ANALYTICS_LIST_MODE]: listType,
    [ANALYTICS_INDEX]: position
  })
}


/**
 * fireItemImpression - function to conditionally execute when an item is
 * in view on the page
 * @param {int} position position of card on page
 * @param {object} item rendered by card
 * @param {bool} inView is item in view
 */
export function fireItemImpression(
  position,
  item,
  inView,
  dispatch
) {
  if (inView) {
    // trigger Snowplow impression
    dispatch(
      trackImpression(
        IMPRESSION_COMPONENT_CARD,
        IMPRESSION_REQUIREMENT_VIEWABLE,
        position,
        item,
        'web-my-list-card'
      )
    )
  }
}

export function fireItemOpen(position, item, dispatch) {
  const linkTarget = getLinkOpenTarget(item?.save_url)
  // trigger Snowplow content open
  dispatch(
    trackContentOpen(
      linkTarget,
      CONTENT_OPEN_TRIGGER_CLICK,
      position,
      item,
      'web-my-list-card'
    )
  )
}
