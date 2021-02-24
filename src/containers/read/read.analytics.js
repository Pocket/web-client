import { trackContentEngagement } from 'connectors/snowplow/snowplow.state'
import { trackContentOpen } from 'connectors/snowplow/snowplow.state'
import { trackImpression } from 'connectors/snowplow/snowplow.state'
import { ENGAGEMENT_TYPE_GENERAL } from 'connectors/snowplow/events'
import { ENGAGEMENT_TYPE_SAVE } from 'connectors/snowplow/events'
import { IMPRESSION_COMPONENT_UI } from 'connectors/snowplow/events'
import { IMPRESSION_REQUIREMENT_VIEWABLE } from 'connectors/snowplow/events'
import { CONTENT_OPEN_TRIGGER_CLICK } from 'connectors/snowplow/events'
import { UI_COMPONENT_BUTTON } from 'connectors/snowplow/entities'
import { getLinkOpenTarget } from 'connectors/snowplow/events'

/** ACTIONS
 --------------------------------------------------------------- */
export const sendDeleteEvent = (item) => (trackContentEngagement(
  ENGAGEMENT_TYPE_GENERAL,
  UI_COMPONENT_BUTTON,
  0, // position in list (zero since it's in reader)
  item,
  'reader.delete'
))

// status (bool) true is un-archive, false is archive
export const sendArchiveEvent = (item, status) => {
  const identifier = status ? 'reader.un-archive' : 'reader.archive'
  const engagement = status ? ENGAGEMENT_TYPE_SAVE : ENGAGEMENT_TYPE_GENERAL
  return trackContentEngagement(
    engagement,
    UI_COMPONENT_BUTTON,
    0, // position in list (zero since it's in reader)
    item,
    identifier
  )
}

export const sendTagEvent = (item) => (trackContentEngagement(
  ENGAGEMENT_TYPE_GENERAL,
  UI_COMPONENT_BUTTON,
  0, // position in list (zero since it's in reader)
  item,
  'reader.tag'
))

// status (bool) true is un-favorite, false is favorite
export const sendFavoriteEvent = (item, status) => {
  const identifier = status ? 'reader.un-favorite' : 'reader.favorite'
  return trackContentEngagement(
    ENGAGEMENT_TYPE_GENERAL,
    UI_COMPONENT_BUTTON,
    0, // position in list (zero since it's in reader)
    item,
    identifier
  )
}

// status (bool) true is remove-annotation, false is add-annotation
export const sendAnnotationEvent = (item, status) => {
  const identifier = status ? 'reader.remove-annotation' : 'reader.add-annotation'
  return trackContentEngagement(
    ENGAGEMENT_TYPE_GENERAL,
    UI_COMPONENT_BUTTON,
    0, // position in list (zero since it's in reader)
    item,
    identifier
  )
}

export const sendShareEvent = (item) => (trackContentEngagement(
  ENGAGEMENT_TYPE_GENERAL,
  UI_COMPONENT_BUTTON,
  0, // position in list (zero since it's in reader)
  item,
  'reader.share'
))

export const sendImpression = (identifier) => (trackImpression(
  IMPRESSION_COMPONENT_UI,
  IMPRESSION_REQUIREMENT_VIEWABLE,
  UI_COMPONENT_BUTTON,
  0,
  identifier
))

export const sendExternalLinkClick = (item, href) => {
  const destination = getLinkOpenTarget(href)
  return trackContentOpen(
    destination,
    CONTENT_OPEN_TRIGGER_CLICK,
    0, // position in list (zero since it's in reader)
    item,
    'reader.external-link'
  )
}
