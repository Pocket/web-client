import { takeEvery, put } from 'redux-saga/effects'
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
import { SET_MY_LIST_IMPRESSION } from 'actions'
import { SNOWPLOW_TRACK_PAGE_VIEW } from 'actions'

/** ACTIONS
 --------------------------------------------------------------- */
export const setImpression = (position, item) => ({
  type: SET_MY_LIST_IMPRESSION,
  position,
  item
})

/** REDUCERS
 --------------------------------------------------------------- */
const initialState = {
  impressions: {}
}

export const cardAnalyticsReducers = (state = initialState, action) => {
  switch (action.type) {
    case SET_MY_LIST_IMPRESSION: {
      const { position } = action
      const impressions = { ...state.impressions, [position]: true }
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
export const cardAnalyticsSagas = [
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
    trackImpression(
      IMPRESSION_COMPONENT_CARD,
      IMPRESSION_REQUIREMENT_VIEWABLE,
      position,
      item,
      'web-my-list-card'
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
