//! Note this is a copy of discover since web-app was not set up for snowplow
import { trackImpression } from 'connectors/snowplow/snowplow.state'
import { trackContentOpen } from 'connectors/snowplow/snowplow.state'
import { CONTENT_OPEN_TRIGGER_CLICK } from 'connectors/snowplow/events'
import { IMPRESSION_COMPONENT_CARD } from 'connectors/snowplow/events'
import { IMPRESSION_REQUIREMENT_VIEWABLE } from 'connectors/snowplow/events'
import { getLinkOpenTarget } from 'connectors/snowplow/events'

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
        'web-mylist-card'
      )
    )
  }
}

export function fireItemOpen(position, item, dispatch) {
  // is link target correct?
  const linkTarget = getLinkOpenTarget(item?.save_url, item?.syndicated)
  // trigger Snowplow content open
  dispatch(
    trackContentOpen(
      linkTarget,
      CONTENT_OPEN_TRIGGER_CLICK,
      position,
      item
    )
  )
}
