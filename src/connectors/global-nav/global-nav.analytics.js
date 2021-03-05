import { trackImpression } from 'connectors/snowplow/snowplow.state'
import { trackContentEngagement } from 'connectors/snowplow/snowplow.state'
import { trackEngagement } from 'connectors/snowplow/snowplow.state'
import { ENGAGEMENT_TYPE_GENERAL } from 'connectors/snowplow/events'
import { ENGAGEMENT_TYPE_SAVE } from 'connectors/snowplow/events'
import { IMPRESSION_COMPONENT_UI } from 'connectors/snowplow/events'
import { IMPRESSION_REQUIREMENT_VIEWABLE } from 'connectors/snowplow/events'
import { UI_COMPONENT_BUTTON } from 'connectors/snowplow/entities'

/** ACTIONS
 --------------------------------------------------------------- */
export const sendSaveEvent = (url) => (trackContentEngagement(
  ENGAGEMENT_TYPE_SAVE,
  UI_COMPONENT_BUTTON,
  0, // position in list (zero since it's not in list)
  { save_url: url }, // mock item for content entity
  'global-nav.save'
))

export const sendSearchEvent = (searchTerm) => (trackEngagement(
  ENGAGEMENT_TYPE_GENERAL,
  UI_COMPONENT_BUTTON,
  0, // position in list (zero since it's not in list)
  'global-nav.search.submit',
  searchTerm
))

export const sendBulkDeleteEvent = (items) => (trackContentEngagement(
  ENGAGEMENT_TYPE_GENERAL,
  UI_COMPONENT_BUTTON,
  0, // position in list (zero since it's in reader)
  items,
  'global-nav.bulk.delete'
))

export const sendBulkFavoriteEvent = (items, status) => {
  const identifier = status ? 'global-nav.bulk.favorite' : 'global-nav.bulk.un-favorite'
  return trackContentEngagement(
    ENGAGEMENT_TYPE_GENERAL,
    UI_COMPONENT_BUTTON,
    0, // position in list (zero since it's a nav bar button)
    items,
    identifier
  )
}

export const sendBulkArchiveEvent = (items, status) => {
  const identifier = status ? 'global-nav.bulk.archive' : 'global-nav.bulk.un-archive'
  const engagement = status ? ENGAGEMENT_TYPE_SAVE : ENGAGEMENT_TYPE_GENERAL
  return trackContentEngagement(
    engagement,
    UI_COMPONENT_BUTTON,
    0, // position in list (zero since it's a nav bar button)
    items,
    identifier
  )
}

export const sendBulkTagEvent = (items) => (trackContentEngagement(
  ENGAGEMENT_TYPE_GENERAL,
  UI_COMPONENT_BUTTON,
  0, // position in list (zero since it's in reader)
  items,
  'global-nav.bulk.tag'
))

export const sendImpression = (identifier) => (trackImpression(
  IMPRESSION_COMPONENT_UI,
  IMPRESSION_REQUIREMENT_VIEWABLE,
  UI_COMPONENT_BUTTON,
  0,
  identifier
))

export const sendEngagement = (identifier) => (trackEngagement(
  ENGAGEMENT_TYPE_GENERAL,
  UI_COMPONENT_BUTTON,
  0, // position in list (zero since it's not in list)
  identifier
))
