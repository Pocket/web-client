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
