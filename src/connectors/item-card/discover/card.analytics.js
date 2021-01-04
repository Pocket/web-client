import { trackImpression } from 'connectors/snowplow/snowplow.state'
import { trackContentOpen } from 'connectors/snowplow/snowplow.state'
import { CONTENT_OPEN_TRIGGER_CLICK } from 'connectors/snowplow/events'
import { IMPRESSION_COMPONENT_CARD } from 'connectors/snowplow/events'
import { IMPRESSION_REQUIREMENT_VIEWABLE } from 'connectors/snowplow/events'
import { getLinkOpenTarget } from 'connectors/snowplow/events'

/**
 * fireItemImpression - function to conditionally execute when an item is
 * in view on the page. Only fires if an impressionAction is passed in.
 * @param {int} position position of card on page
 * @param {int} positionZeroIndex position of card on page, 0-indexed
 * @param {object} item rendered by card
 * @param {bool} inView is item in view
 * @param {function} impressionAction analytics action for impression
 */
export function fireItemImpression(
  position,
  positionZeroIndex,
  item,
  inView,
  impressionAction,
  dispatch
) {
  if (inView && impressionAction) {
    impressionAction(position, item)

    // trigger Snowplow impression
    dispatch(
      trackImpression(
        IMPRESSION_COMPONENT_CARD,
        IMPRESSION_REQUIREMENT_VIEWABLE,
        positionZeroIndex,
        item,
        'web-discover-card'
      )
    )
  }
}

export function fireItemOpen(positionZeroIndex, item, dispatch) {
  const linkTarget = getLinkOpenTarget(item?.save_url, item?.syndicated)
  // trigger Snowplow content open
  dispatch(
    trackContentOpen(
      linkTarget,
      CONTENT_OPEN_TRIGGER_CLICK,
      positionZeroIndex,
      item
    )
  )
}
