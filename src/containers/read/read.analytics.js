import { trackItemAction } from 'connectors/snowplow/snowplow.state'
import { trackItemSave } from 'connectors/snowplow/snowplow.state'
import { trackItemOpen } from 'connectors/snowplow/snowplow.state'
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
export const sendDeleteEvent = (item) => trackItemAction(0, item, 'reader.delete')

// status (bool) true is un-archive, false is archive
export const sendArchiveEvent = (item, status) => {
  const identifier = status ? 'reader.un-archive' : 'reader.archive'
  const trackAction = status ? trackItemSave : trackItemAction
  return trackAction(0, item, identifier)
}

export const sendTagEvent = (item) => trackItemAction(0, item, 'reader.tag')

// status (bool) true is un-favorite, false is favorite
export const sendFavoriteEvent = (item, status) => {
  const identifier = status ? 'reader.un-favorite' : 'reader.favorite'
  return trackItemAction(0, item, identifier)
}

// status (bool) true is remove-annotation, false is add-annotation
export const sendAnnotationEvent = (item, status) => {
  const identifier = status ? 'reader.remove-annotation' : 'reader.add-annotation'
  return trackItemAction(0, item, identifier)
}

export const sendShareEvent = (item) => trackItemAction(0, item, 'reader.share')

export const sendImpression = (identifier) =>
  trackImpression(
    IMPRESSION_COMPONENT_UI,
    IMPRESSION_REQUIREMENT_VIEWABLE,
    UI_COMPONENT_BUTTON,
    0,
    identifier
  )

export const sendExternalLinkClick = (item, href) => {
  return trackItemOpen(0, item, 'reader.external-link')
}

export const sendViewOriginalEvent = (item) => {
  return trackItemOpen(0, item, 'reader.view-original')
}
