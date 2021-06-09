import { take, takeEvery, takeLatest, call, put, select } from 'redux-saga/effects'

import { snowplowTrackPageView } from 'common/api/snowplow-analytics'
import { snowplowAnonymousTracking } from 'common/api/snowplow-analytics'
import { sendCustomSnowplowEvent } from 'common/api/snowplow-analytics'

import { analyticsActions } from 'connectors/snowplow/actions'

import { createContentOpenEvent } from 'connectors/snowplow/events'
import { createEngagementEvent } from 'connectors/snowplow/events'
import { createImpressionEvent } from 'connectors/snowplow/events'
import { createVariantEnrollEvent } from 'connectors/snowplow/events'

import { createContentEntity } from 'connectors/snowplow/entities'
import { createUiEntity } from 'connectors/snowplow/entities'
import { createRecommendationEntity } from 'connectors/snowplow/entities'
import { createSlateEntity } from 'connectors/snowplow/entities'
import { createSlateLineupEntity } from 'connectors/snowplow/entities'
import { createFeatureFlagEntity } from 'connectors/snowplow/entities'

import { SNOWPLOW_INITIALIZED } from 'actions'
import { SNOWPLOW_UPDATE_ANONYMOUS_TRACKING } from 'actions'
import { SNOWPLOW_TRACK_PAGE_VIEW } from 'actions'
import { SNOWPLOW_TRACK_ITEM_IMPRESSION } from 'actions'
import { SNOWPLOW_SEND_EVENT } from 'actions'
import { VARIANTS_SAVE } from 'actions'
import { FEATURES_HYDRATE } from 'actions'

/** ACTIONS
 --------------------------------------------------------------- */
export const finalizeSnowplow = () => ({ type: SNOWPLOW_INITIALIZED })
export const updateAnonymousTracking = (track) => ({ type: SNOWPLOW_UPDATE_ANONYMOUS_TRACKING, track })
export const trackPageView = () => ({ type: SNOWPLOW_TRACK_PAGE_VIEW })
export const sendSnowplowEvent = (identifier, data) => ({ type: SNOWPLOW_SEND_EVENT, identifier, data })

/** REDUCERS
 --------------------------------------------------------------- */
 const initialState = {
  initialized: false,
  impressions: []
}

export const snowplowReducers = (state = initialState, action) => {
  switch (action.type) {
    case SNOWPLOW_INITIALIZED: {
      return { ...state, initialized: true }
    }

    case SNOWPLOW_TRACK_ITEM_IMPRESSION: {
      const { id, url } = action
      const set = new Set([...state.impressions, id || url])
      return { ...state, impressions: Array.from(set) }
    }

    case SNOWPLOW_TRACK_PAGE_VIEW: {
      return { ...state, impressions: [] }
    }

    default:
      return state
  }
}

/* SAGAS :: SELECTORS
–––––––––––––––––––––––––––––––––––––––––––––––––– */
const snowplowReady = (state) => state.analytics?.initialized

/** SAGAS :: WATCHERS
 --------------------------------------------------------------- */
 export const snowplowSagas = [
  takeLatest(VARIANTS_SAVE, fireVariantEnroll),
  takeLatest(FEATURES_HYDRATE, fireFeatureEnroll),
  takeLatest(SNOWPLOW_UPDATE_ANONYMOUS_TRACKING, anonymousTracking),
  takeLatest(SNOWPLOW_TRACK_PAGE_VIEW, firePageView),
  takeEvery(SNOWPLOW_SEND_EVENT, fireSnowplowEvent)
]

/** SAGA :: RESPONDERS
 --------------------------------------------------------------- */
function* waitForInitialization() {
  while (true) {
    const isReady = yield select(snowplowReady)
    if (!isReady) yield take(SNOWPLOW_INITIALIZED)
    return true
  }
}

function* firePageView() {
  yield call(waitForInitialization)
  yield call(snowplowTrackPageView)
}

function* fireVariantEnroll({ variants }) {
  yield call(waitForInitialization)
  for (let flag in variants) {
    const variantEnrollEvent = createVariantEnrollEvent()
    const featureFlagEntity = createFeatureFlagEntity(flag, variants[flag])

    yield call(sendCustomSnowplowEvent, variantEnrollEvent, [featureFlagEntity])
  }
}

function* fireFeatureEnroll({ hydrate }) {
  yield call(waitForInitialization)
  for (let flag in hydrate) {
    const { test: testName, variant, assigned } = hydrate[flag]
    const hasVariant = variant !== 'disabled' && !!variant
    if (hasVariant) {
      const entityVariant = assigned ? variant : `control.${variant}`
      const variantEnrollEvent = createVariantEnrollEvent()
      const featureFlagEntity = createFeatureFlagEntity(testName, entityVariant)

      yield call(sendCustomSnowplowEvent, variantEnrollEvent, [featureFlagEntity])
    }
  }
}

function* anonymousTracking({ track }) {
  yield call(waitForInitialization)
  yield call(snowplowAnonymousTracking, track)
}

const eventBuilders = {
  contentOpen: createContentOpenEvent,
  engagement: createEngagementEvent,
  impression: createImpressionEvent
}

const entityBuilders = {
  ui: createUiEntity,
  content: createContentEntity,
  recommendation: createRecommendationEntity,
  slate: createSlateEntity,
  slateLineup: createSlateLineupEntity
}

const expectationTypes = {
  id: 'int',
  url: 'string',
  position: 'int',
  label: 'string',
  destination: 'string',
  value: 'string'
}

function* fireSnowplowEvent({ identifier, data }) {
  yield call(waitForInitialization)

  const { eventType, entityTypes, eventData } = analyticsActions[identifier]
  if (!eventType) return console.warn('No action for this event!')

  // tracking impressions using id or url
  if (eventType === 'impression') yield put({ type: SNOWPLOW_TRACK_ITEM_IMPRESSION, ...eventData, ...data })

  // Build event
  const eventFunction = eventBuilders[eventType]
  const event = eventFunction({ ...eventData, ...data })

  // Build entities
  const entities = entityTypes.map(entity => {
    const entityFunction = entityBuilders[entity]
    return entityFunction({ ...eventData, ...data, identifier })
  })

  yield call(sendCustomSnowplowEvent, event, entities)
}
