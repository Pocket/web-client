import { takeEvery, put } from 'redux-saga/effects'
import { trackContentEngagement } from 'connectors/snowplow/snowplow.state'
import { trackEngagement } from 'connectors/snowplow/snowplow.state'
import { ENGAGEMENT_TYPE_GENERAL } from 'connectors/snowplow/events'
import { ENGAGEMENT_TYPE_SAVE } from 'connectors/snowplow/events'

/** ACTIONS
 --------------------------------------------------------------- */
export const sendSaveEvent = (url) => (trackContentEngagement(
  ENGAGEMENT_TYPE_SAVE,
  0, // position in list (zero since it's not in list)
  { save_url: url }, // mock item for content entity
  'global-nav.save'
))

export const sendSearchEvent = () => (trackEngagement(
  ENGAGEMENT_TYPE_GENERAL,
  0, // position in list (zero since it's not in list)
  'global-nav.search'
))

export const sendBulkDeleteEvent = (items) => (trackContentEngagement(
  ENGAGEMENT_TYPE_GENERAL,
  0, // position in list (zero since it's in reader)
  items,
  'global-nav.bulk.delete'
))


export const sendBulkFavoriteEvent = (items, status) => {
  const identifier = status ? 'global-nav.batch.favorite' : 'global-nav.batch.un-favorite'
  return trackContentEngagement(
    ENGAGEMENT_TYPE_GENERAL,
    0, // position in list (zero since it's a nav bar button)
    items,
    identifier
  )
}

export const sendBulkArchiveEvent = (items, status) => {
  const identifier = status ? 'global-nav.batch.archive' : 'global-nav.batch.un-archive'
  const engagement = status ? ENGAGEMENT_TYPE_SAVE : ENGAGEMENT_TYPE_GENERAL
  return trackContentEngagement(
    engagement,
    0, // position in list (zero since it's a nav bar button)
    item,
    identifier
  )
}

export const sendBulkTagEvent = (items) => (trackContentEngagement(
  ENGAGEMENT_TYPE_GENERAL,
  0, // position in list (zero since it's in reader)
  items,
  'global-nav.bulk.tag'
))
