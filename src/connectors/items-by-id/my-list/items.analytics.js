import { takeEvery, put } from 'redux-saga/effects'
import { trackContentImpression } from 'connectors/snowplow/snowplow.state'
import { trackContentOpen } from 'connectors/snowplow/snowplow.state'
import { trackContentEngagement } from 'connectors/snowplow/snowplow.state'
import { CONTENT_OPEN_TRIGGER_CLICK } from 'connectors/snowplow/events'
import { IMPRESSION_COMPONENT_CARD } from 'connectors/snowplow/events'
import { IMPRESSION_REQUIREMENT_VIEWABLE } from 'connectors/snowplow/events'
import { ENGAGEMENT_TYPE_GENERAL } from 'connectors/snowplow/events'
import { ENGAGEMENT_TYPE_SAVE } from 'connectors/snowplow/events'
import { UI_COMPONENT_BUTTON } from 'connectors/snowplow/entities'
import { getLinkOpenTarget } from 'connectors/snowplow/events'
import { legacyAnalyticsTrack } from 'common/api/legacy-analytics'
import { BASE_URL } from 'common/constants'
import { ANALYTICS_VIEW } from 'common/constants'
import { ANALYTICS_LIST_MODE } from 'common/constants'
import { ANALYTICS_INDEX } from 'common/constants'
import { SET_MY_LIST_IMPRESSION } from 'actions'
import { SNOWPLOW_TRACK_PAGE_VIEW } from 'actions'
import { ITEMS_ARCHIVE_REQUEST } from 'actions'
import { ITEMS_UNARCHIVE_REQUEST } from 'actions'

/** ACTIONS
 --------------------------------------------------------------- */
export const setImpression = (position, item) => ({
  type: SET_MY_LIST_IMPRESSION,
  position,
  item
})
export const sendEngagementEvent = (identifier, position, item, save) => {
  const engagement = save ? ENGAGEMENT_TYPE_SAVE : ENGAGEMENT_TYPE_GENERAL
  return trackContentEngagement(
    engagement,
    UI_COMPONENT_BUTTON,
    position,
    item,
    identifier
  )
}

/** REDUCERS
 --------------------------------------------------------------- */
const initialState = {
  impressions: {}
}

export const itemAnalyticsReducers = (state = initialState, action) => {
  switch (action.type) {
    case SET_MY_LIST_IMPRESSION: {
      const { item } = action
      const impressions = { ...state.impressions, [item.item_id]: true }
      return { ...state, impressions }
    }

    case SNOWPLOW_TRACK_PAGE_VIEW: {
      return { ...state, impressions: {} }
    }

    default:
      return state
  }
}

/** SAGAS :: WATCHERS
 --------------------------------------------------------------- */
export const itemAnalyticsSagas = [
  takeEvery(SET_MY_LIST_IMPRESSION, fireItemImpression)
]

/** SAGA :: RESPONDERS
 --------------------------------------------------------------- */

/**
 * fireItemImpression - function to conditionally execute when an item is
 * in view on the page
 * @param {int} position position of card on page
 * @param {object} item rendered by card
 */
function* fireItemImpression({ position, item }) {
  yield put(
    trackContentImpression(
      IMPRESSION_COMPONENT_CARD,
      IMPRESSION_REQUIREMENT_VIEWABLE,
      position,
      item,
      'my-list.card'
    )
  )
}


function _itemContentType({ has_video, has_image, is_article }) {
  if (has_video === '2') return 'opened_video'
  if (has_image === '2') return 'opened_image'
  if (is_article === '1') return 'opened_article'
  return 'opened_web'
}

export function trackItemOpen(position, item, listType) {
  const { item_id } = item
  legacyAnalyticsTrack({
    action: _itemContentType(item),
    item_id,
    [ANALYTICS_VIEW]: 'list',
    [ANALYTICS_LIST_MODE]: listType,
    [ANALYTICS_INDEX]: position
  })
}

export function fireItemOpen(position, item, dispatch) {
  const { openExternal, save_url, id } = item
  const itemUrl = openExternal ? save_url : `${BASE_URL}/read/${id}`
  const linkTarget = getLinkOpenTarget(itemUrl)
  // trigger Snowplow content open
  dispatch(
    trackContentOpen(
      linkTarget,
      CONTENT_OPEN_TRIGGER_CLICK,
      position,
      item,
      'my-list.card'
    )
  )
}
