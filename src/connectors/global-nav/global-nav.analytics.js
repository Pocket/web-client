import { trackImpression } from 'connectors/snowplow/snowplow.state'
import { trackItemAction } from 'connectors/snowplow/snowplow.state'
import { trackItemSave } from 'connectors/snowplow/snowplow.state'
import { trackEngagement } from 'connectors/snowplow/snowplow.state'

import { ENGAGEMENT_TYPE_GENERAL } from 'connectors/snowplow/events'
import { IMPRESSION_COMPONENT_UI } from 'connectors/snowplow/events'
import { IMPRESSION_REQUIREMENT_VIEWABLE } from 'connectors/snowplow/events'
import { UI_COMPONENT_BUTTON } from 'connectors/snowplow/entities'
import { UI_COMPONENT_MENU } from 'connectors/snowplow/entities'

/** ACTIONS
 * position is zero since these actions don't come direct from a list
 --------------------------------------------------------------- */
export const sendSaveEvent = (url) => trackItemAction(0, { save_url: url }, 'global-nav.save')

export const sendSearchEvent = (searchTerm) =>
  trackEngagement(
    ENGAGEMENT_TYPE_GENERAL,
    UI_COMPONENT_BUTTON,
    0,
    'global-nav.search.submit',
    searchTerm
  )

export const sendBulkDeleteEvent = (items) => trackItemAction(0, items, 'global-nav.bulk.delete')

export const sendBulkFavoriteEvent = (items, status) => {
  const identifier = status ? 'global-nav.bulk.favorite' : 'global-nav.bulk.un-favorite'
  return trackItemAction(0, items, identifier)
}

export const sendBulkArchiveEvent = (items, status) => {
  const identifier = status ? 'global-nav.bulk.archive' : 'global-nav.bulk.un-archive'
  const trackAction = status ? trackItemSave : trackItemAction
  return trackAction(0, items, identifier)
}

export const sendBulkTagEvent = (items) => trackItemAction(0, items, 'global-nav.bulk.tag')

export const sendImpression = (identifier) =>
  trackImpression(
    IMPRESSION_COMPONENT_UI,
    IMPRESSION_REQUIREMENT_VIEWABLE,
    UI_COMPONENT_BUTTON,
    0,
    identifier
  )

export const sendEngagement = (identifier) =>
  trackEngagement(ENGAGEMENT_TYPE_GENERAL, UI_COMPONENT_BUTTON, 0, identifier)

export const sendMenuEngagement = (label) =>
  trackEngagement(ENGAGEMENT_TYPE_GENERAL, UI_COMPONENT_MENU, 0, 'global-nav', label)
