import { takeLatest, takeEvery } from 'redux-saga/effects'

import { SNOWPLOW_TRACK_PAGE_VIEW } from 'actions'
import { SNOWPLOW_TRACK_CONTENT_OPEN } from 'actions'
import { SNOWPLOW_TRACK_IMPRESSION } from 'actions'
import { SNOWPLOW_TRACK_CONTENT_IMPRESSION } from 'actions'
import { SNOWPLOW_TRACK_ENGAGEMENT } from 'actions'
import { SNOWPLOW_TRACK_CONTENT_ENGAGEMENT } from 'actions'
import { VARIANTS_SAVE } from 'actions'

import { createContentEntity } from 'connectors/snowplow/entities'
import { createUiEntity } from 'connectors/snowplow/entities'
import { createFeatureFlagEntity } from 'connectors/snowplow/entities'
import { UI_COMPONENT_CARD } from 'connectors/snowplow/entities'

import { createImpressionEvent } from 'connectors/snowplow/events'
import { createContentOpenEvent } from 'connectors/snowplow/events'
import { createVariantEnrollEvent } from 'connectors/snowplow/events'
import { createEngagementEvent } from 'connectors/snowplow/events'

import { snowplowTrackPageView } from 'common/api/snowplow-analytics'
import { sendCustomSnowplowEvent } from 'common/api/snowplow-analytics'

import { BATCH_SIZE } from 'common/constants'

const initialState = {}

/** ACTIONS
 --------------------------------------------------------------- */
export const trackPageView = () => ({ type: SNOWPLOW_TRACK_PAGE_VIEW })
export const trackContentOpen = (destination, trigger, position, item, identifier) => {
  return {
    type: SNOWPLOW_TRACK_CONTENT_OPEN,
    destination,
    trigger,
    position,
    item,
    identifier
  }
}
export const trackContentImpression = (component, requirement, position, item, identifier) => {
  return {
    type: SNOWPLOW_TRACK_CONTENT_IMPRESSION,
    component,
    requirement,
    position,
    item,
    identifier
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
export const trackContentEngagement = (component, ui, position, items, identifier) => {
  return {
    type: SNOWPLOW_TRACK_CONTENT_ENGAGEMENT,
    component,
    ui,
    identifier,
    position,
    items
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

/** REDUCERS
 --------------------------------------------------------------- */
export const snowplowReducers = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state
  }
}

/** SAGAS :: WATCHERS
 --------------------------------------------------------------- */

export const snowplowSagas = [
  takeLatest(SNOWPLOW_TRACK_PAGE_VIEW, firePageView),
  takeEvery(SNOWPLOW_TRACK_CONTENT_OPEN, fireContentOpen),
  takeEvery(SNOWPLOW_TRACK_IMPRESSION, fireImpression),
  takeEvery(SNOWPLOW_TRACK_CONTENT_IMPRESSION, fireContentImpression),
  takeEvery(SNOWPLOW_TRACK_CONTENT_ENGAGEMENT, fireContentEngagmenet),
  takeEvery(SNOWPLOW_TRACK_ENGAGEMENT, fireEngagement),
  takeLatest(VARIANTS_SAVE, fireVariantEnroll)
]

/** SAGA :: RESPONDERS
 --------------------------------------------------------------- */
function* firePageView() {
  yield snowplowTrackPageView()
}

function* fireVariantEnroll({ variants }) {
  for (let flag in variants) {
    const variantEnrollEvent = createVariantEnrollEvent()
    const featureFlagEntity = createFeatureFlagEntity(flag, variants[flag])

    yield sendCustomSnowplowEvent(variantEnrollEvent, [featureFlagEntity])
  }
}

function* fireContentOpen({ destination, trigger, position, item, identifier }) {
  const contentOpenEvent = createContentOpenEvent(destination, trigger)
  const contentEntity = createContentEntity(item?.save_url, item?.resolved_id)
  const uiEntity = createUiEntity({
    type: UI_COMPONENT_CARD,
    hierarchy: 0,
    identifier,
    index: position
  })

  const snowplowEntities = [contentEntity, uiEntity]
  yield sendCustomSnowplowEvent(contentOpenEvent, snowplowEntities)
}

function* fireContentImpression({ component, requirement, position, item, identifier }) {
  const impressionEvent = createImpressionEvent(component, requirement)
  const contentEntity = createContentEntity(item?.save_url, item?.resolved_id)
  const uiEntity = createUiEntity({
    type: UI_COMPONENT_CARD,
    hierarchy: 0,
    identifier,
    index: position
  })

  const snowplowEntities = [contentEntity, uiEntity]
  yield sendCustomSnowplowEvent(impressionEvent, snowplowEntities)
}

function* fireImpression({ component, requirement, ui, position, identifier }) {
  const impressionEvent = createImpressionEvent(component, requirement)
  const uiEntity = createUiEntity({
    type: ui,
    hierarchy: 0,
    identifier,
    index: position
  })

  const snowplowEntities = [uiEntity]
  yield sendCustomSnowplowEvent(impressionEvent, snowplowEntities)
}

function* fireContentEngagmenet({ component, ui, identifier, position, items }) {
  const engagementEvent = createEngagementEvent(component)

  const contentEntities = (items.length) ? items : [items]
  // limit content entities to BATCH_SIZE = 30
  if (contentEntities.length > BATCH_SIZE) contentEntities.length = BATCH_SIZE
  const contentEntity = contentEntities.map(item => createContentEntity(item?.save_url, item?.resolved_id))

  const uiEntity = createUiEntity({
    type: ui,
    hierarchy: 0,
    identifier,
    index: position
  })

  const snowplowEntities = [...contentEntity, uiEntity]
  yield sendCustomSnowplowEvent(engagementEvent, snowplowEntities)
}

function* fireEngagement({ component, ui, identifier, position, value }) {
  const engagementEvent = createEngagementEvent(component, value)
  const uiEntity = createUiEntity({
    type: ui,
    hierarchy: 0,
    identifier,
    index: position
  })

  const snowplowEntities = [uiEntity]
  yield sendCustomSnowplowEvent(engagementEvent, snowplowEntities)
}
