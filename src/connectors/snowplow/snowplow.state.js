import { takeLatest, takeEvery, call, take, select, cancel } from 'redux-saga/effects'
import { BATCH_SIZE } from 'common/constants'
import { urlWithPermanentLibrary } from 'common/utilities'

import { SNOWPLOW_INITIALIZED } from 'actions'
import { SNOWPLOW_UPDATE_ANONYMOUS_TRACKING } from 'actions'

import { SNOWPLOW_TRACK_PAGE_VIEW } from 'actions'
import { SNOWPLOW_TRACK_IMPRESSION } from 'actions'
import { SNOWPLOW_TRACK_ENGAGEMENT } from 'actions'

import { SNOWPLOW_TRACK_REC_OPEN } from 'actions'
import { SNOWPLOW_TRACK_REC_SAVE } from 'actions'
import { SNOWPLOW_TRACK_REC_IMPRESSION } from 'actions'

import { SNOWPLOW_TRACK_ITEM_IMPRESSION } from 'actions'
import { SNOWPLOW_TRACK_ITEM_ACTION } from 'actions'
import { SNOWPLOW_TRACK_ITEM_SAVE } from 'actions'
import { SNOWPLOW_TRACK_ITEM_OPEN } from 'actions'

import { ANALYTICS_VIEW } from 'common/constants'
import { ANALYTICS_LIST_MODE } from 'common/constants'
import { ANALYTICS_INDEX } from 'common/constants'

import { VARIANTS_SAVE } from 'actions'
import { FEATURES_HYDRATE } from 'actions'

import { createContentEntity } from 'connectors/snowplow/entities'
import { createUiEntity } from 'connectors/snowplow/entities'
import { createFeatureFlagEntity } from 'connectors/snowplow/entities'
import { createRecommendationEntity } from 'connectors/snowplow/entities'
import { createSlateEntity } from 'connectors/snowplow/entities'
import { createSlateLineupEntity } from 'connectors/snowplow/entities'
import { UI_COMPONENT_CARD } from 'connectors/snowplow/entities'
import { UI_COMPONENT_BUTTON } from 'connectors/snowplow/entities'

import { IMPRESSION_COMPONENT_CARD } from 'connectors/snowplow/events'
import { IMPRESSION_REQUIREMENT_VIEWABLE } from 'connectors/snowplow/events'
import { CONTENT_OPEN_TRIGGER_CLICK } from 'connectors/snowplow/events'
import { ENGAGEMENT_TYPE_GENERAL } from 'connectors/snowplow/events'
import { ENGAGEMENT_TYPE_SAVE } from 'connectors/snowplow/events'

import { createImpressionEvent } from 'connectors/snowplow/events'
import { createContentOpenEvent } from 'connectors/snowplow/events'
import { createVariantEnrollEvent } from 'connectors/snowplow/events'
import { createEngagementEvent } from 'connectors/snowplow/events'
import { getLinkOpenTarget } from 'connectors/snowplow/events'

import { snowplowTrackPageView } from 'common/api/snowplow-analytics'
import { sendCustomSnowplowEvent } from 'common/api/snowplow-analytics'
import { snowplowAnonymousTracking } from 'common/api/snowplow-analytics'
import { legacyAnalyticsTrack } from 'common/api/legacy-analytics'

/** ACTIONS
 --------------------------------------------------------------- */
export const finalizeSnowplow = () => ({ type: SNOWPLOW_INITIALIZED })

export const updateAnonymousTracking = (track) => ({ type: SNOWPLOW_UPDATE_ANONYMOUS_TRACKING, track })

export const trackPageView = () => ({ type: SNOWPLOW_TRACK_PAGE_VIEW })

export const trackRecOpen = (position, item, identifier, href) => {
  const { save_url, item_id, syndicated } = item
  const linkTarget = href ? href : save_url
  const destination = getLinkOpenTarget(linkTarget, syndicated)
  return {
    type: SNOWPLOW_TRACK_REC_OPEN,
    trigger: CONTENT_OPEN_TRIGGER_CLICK,
    destination,
    position,
    item,
    identifier
  }
}

export const trackRecSave = (position, item, identifier) => {
  return {
    type: SNOWPLOW_TRACK_REC_SAVE,
    component: ENGAGEMENT_TYPE_SAVE,
    ui: UI_COMPONENT_BUTTON,
    identifier,
    position,
    item
  }
}

export const trackRecImpression = (position, item, identifier) => {
  return {
    type: SNOWPLOW_TRACK_REC_IMPRESSION,
    component: IMPRESSION_COMPONENT_CARD,
    requirement: IMPRESSION_REQUIREMENT_VIEWABLE,
    position,
    item,
    identifier
  }
}

export const trackItemOpen = (position, item, identifier, href) => {
  const { save_url, item_id, syndicated } = item
  const permanentLib = /permanent-library/.test(identifier)
  const itemURL = permanentLib ? save_url : urlWithPermanentLibrary(item_id)
  const linkTarget = href ? href : itemURL
  const destination = getLinkOpenTarget(linkTarget, syndicated)
  return {
    type: SNOWPLOW_TRACK_ITEM_OPEN,
    trigger: CONTENT_OPEN_TRIGGER_CLICK,
    destination,
    position,
    item,
    identifier
  }
}

export const trackItemAction = (position, item, identifier) => {
  return {
    type: SNOWPLOW_TRACK_ITEM_ACTION,
    component: ENGAGEMENT_TYPE_GENERAL,
    ui: UI_COMPONENT_BUTTON,
    identifier,
    position,
    items: item
  }
}

export const trackItemSave = (position, item, identifier) => {
  return {
    type: SNOWPLOW_TRACK_ITEM_SAVE,
    component: ENGAGEMENT_TYPE_SAVE,
    ui: UI_COMPONENT_BUTTON,
    identifier,
    position,
    items: item
  }
}

export const trackItemImpression = (position, item, identifier) => {
  return {
    type: SNOWPLOW_TRACK_ITEM_IMPRESSION,
    component: IMPRESSION_COMPONENT_CARD,
    requirement: IMPRESSION_REQUIREMENT_VIEWABLE,
    position,
    item,
    identifier
  }
}

export const trackEngagement = (component, ui, position, identifier, value) => {
  return {
    type: SNOWPLOW_TRACK_ENGAGEMENT,
    component,
    ui,
    identifier,
    position,
    value
  }
}

export const trackImpression = (component, requirement, ui, position, identifier) => {
  return {
    type: SNOWPLOW_TRACK_IMPRESSION,
    component,
    requirement,
    ui,
    position,
    identifier
  }
}

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

    case SNOWPLOW_TRACK_REC_IMPRESSION:
    case SNOWPLOW_TRACK_ITEM_IMPRESSION: {
      const { item_id } = action?.item
      const set = new Set([...state.impressions, item_id])
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
const getListType = (state) => state.app.listMode
const snowplowReady = (state) => state.analytics?.initialized

/** SAGAS :: WATCHERS
 --------------------------------------------------------------- */
export const snowplowSagas = [
  takeLatest(VARIANTS_SAVE, fireVariantEnroll),
  takeLatest(FEATURES_HYDRATE, fireFeatureEnroll),
  takeLatest(SNOWPLOW_UPDATE_ANONYMOUS_TRACKING, anonymousTracking),
  takeLatest(SNOWPLOW_TRACK_PAGE_VIEW, firePageView),
  takeEvery(SNOWPLOW_TRACK_REC_OPEN, fireRecOpen),
  takeEvery(SNOWPLOW_TRACK_REC_SAVE, fireRecEngagement),
  takeEvery(SNOWPLOW_TRACK_REC_IMPRESSION, fireRecImpression),
  takeEvery(SNOWPLOW_TRACK_IMPRESSION, fireImpression),
  takeEvery(SNOWPLOW_TRACK_ENGAGEMENT, fireEngagement),
  takeEvery(SNOWPLOW_TRACK_ITEM_OPEN, fireContentOpen),
  takeEvery(SNOWPLOW_TRACK_ITEM_IMPRESSION, fireItemImpression),
  takeEvery(SNOWPLOW_TRACK_ITEM_ACTION, fireContentEngagement),
  takeEvery(SNOWPLOW_TRACK_ITEM_SAVE, fireContentEngagement)
]

/** SAGA :: RESPONDERS
 --------------------------------------------------------------- */
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

function* fireRecOpen({ destination, trigger, position, item, identifier }) {
  const contentOpenEvent = createContentOpenEvent(destination, trigger)
  const contentEntity = createContentEntity(item.save_url, item.item_id)
  const recEntities = buildRecEntities(item, position)
  const uiEntity = createUiEntity({
    type: UI_COMPONENT_CARD,
    hierarchy: 0,
    identifier,
    index: position
  })

  const snowplowEntities = [contentEntity, uiEntity, ...recEntities]
  yield call(sendCustomSnowplowEvent, contentOpenEvent, snowplowEntities)
}

function* fireRecEngagement({ component, ui, identifier, position, item }) {
  const engagementEvent = createEngagementEvent(component)
  const contentEntity = createContentEntity(item.save_url, item.item_id)
  const recEntities = buildRecEntities(item, position)
  const uiEntity = createUiEntity({
    type: ui,
    hierarchy: 0,
    identifier,
    index: position
  })

  const snowplowEntities = [contentEntity, uiEntity, ...recEntities]
  yield call(sendCustomSnowplowEvent, engagementEvent, snowplowEntities)
}

function* fireRecImpression({ component, requirement, position, item, identifier }) {
  const isReady = yield select(snowplowReady)
  if (!isReady) return

  const impressionEvent = createImpressionEvent(component, requirement)
  const contentEntity = createContentEntity(item.save_url, item.item_id)
  const recEntities = buildRecEntities(item, position)
  const uiEntity = createUiEntity({
    type: UI_COMPONENT_CARD,
    hierarchy: 0,
    identifier,
    index: position
  })

  const snowplowEntities = [contentEntity, uiEntity, ...recEntities]
  yield call(sendCustomSnowplowEvent, impressionEvent, snowplowEntities)
}

function* fireContentOpen({ destination, trigger, position, item, identifier }) {
  const contentOpenEvent = createContentOpenEvent(destination, trigger)
  const contentEntity = createContentEntity(item.save_url || item.url, item.item_id)
  const uiEntity = createUiEntity({
    type: UI_COMPONENT_CARD,
    hierarchy: 0,
    identifier,
    index: position
  })

  const snowplowEntities = [contentEntity, uiEntity]
  yield call(sendCustomSnowplowEvent, contentOpenEvent, snowplowEntities)

  // Track Legacy Opens
  const listType = yield select(getListType)
  yield call(legacyItemOpen, position, item, listType)
}

function* fireItemImpression({ component, requirement, position, item, identifier }) {
  const isReady = yield select(snowplowReady)
  if (!isReady) return

  const impressionEvent = createImpressionEvent(component, requirement)
  const contentEntity = createContentEntity(item.save_url || item.url, item.item_id)
  const uiEntity = createUiEntity({
    type: UI_COMPONENT_CARD,
    hierarchy: 0,
    identifier,
    index: position
  })

  const snowplowEntities = [contentEntity, uiEntity]
  yield call(sendCustomSnowplowEvent, impressionEvent, snowplowEntities)
}

function* fireImpression({ component, requirement, ui, position, identifier }) {
  yield call(waitForInitialization)
  const impressionEvent = createImpressionEvent(component, requirement)
  const uiEntity = createUiEntity({
    type: ui,
    hierarchy: 0,
    identifier,
    index: position
  })

  const snowplowEntities = [uiEntity]
  yield call(sendCustomSnowplowEvent, impressionEvent, snowplowEntities)
}

function* fireContentEngagement({ component, ui, identifier, position, items }) {
  const engagementEvent = createEngagementEvent(component)

  const contentEntities = items.length ? items : [items]
  // limit content entities to BATCH_SIZE = 30
  if (contentEntities.length > BATCH_SIZE) contentEntities.length = BATCH_SIZE

  const contentEntity = contentEntities.map((item) => {
    const { save_url, url, item_id, id } = item
    return createContentEntity(save_url || url, item_id || id) // id is bulk edit value
  })

  const uiEntity = createUiEntity({ type: ui, hierarchy: 0, identifier, index: position })

  const snowplowEntities = [...contentEntity, uiEntity]
  yield call(sendCustomSnowplowEvent, engagementEvent, snowplowEntities)
}

function* fireEngagement({ component, ui, identifier, position, value }) {
  const engagementEvent = createEngagementEvent(component, value)
  const uiEntity = createUiEntity({
    type: ui,
    hierarchy: 0,
    identifier,
    index: position,
    value
  })

  const snowplowEntities = [uiEntity]
  yield call(sendCustomSnowplowEvent, engagementEvent, snowplowEntities)
}

function* waitForInitialization() {
  while (true) {
    const isReady = yield select(snowplowReady)
    if (!isReady) yield take(SNOWPLOW_INITIALIZED)
    return true
  }
}

/** LEGACY ANALYTICS
 * ----------------------------------------------------------------
 */

export function legacyItemOpen(position, item, listType) {
  const { item_id } = item
  legacyAnalyticsTrack({
    action: itemContentType(item),
    item_id,
    [ANALYTICS_VIEW]: 'list',
    [ANALYTICS_LIST_MODE]: listType,
    [ANALYTICS_INDEX]: position + 1
  })
}

function itemContentType({ has_video, has_image, is_article }) {
  if (has_video === '2') return 'opened_video'
  if (has_image === '2') return 'opened_image'
  if (is_article === '1') return 'opened_article'
  return 'opened_web'
}

/** HELPERS
 --------------------------------------------------------------- */
function buildRecEntities(item, position) {
  const recommendationEntity = createRecommendationEntity({
    recommendation_id: item.recommendationId,
    index: position
  })
  const slateLineupEntity = createSlateLineupEntity({
    slate_lineup_id: item.slateLineup.id,
    request_id: item.slateLineup.requestId,
    experiment: item.slateLineup.experimentId
  })
  const slateEntity = createSlateEntity({
    slate_id: item.slate.id,
    request_id: item.slate.requestId,
    experiment: item.slate.experimentId,
    index: position
  })

  return [recommendationEntity, slateLineupEntity, slateEntity]
}
