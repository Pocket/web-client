import { takeLatest, takeEvery } from 'redux-saga/effects'

import { SNOWPLOW_TRACK_PAGE_VIEW } from 'actions'
import { SNOWPLOW_TRACK_CONTENT_OPEN } from 'actions'
import { SNOWPLOW_TRACK_IMPRESSION } from 'actions'
import { VARIANTS_SAVE } from 'actions'

import { createContentEntity } from 'connectors/snowplow/entities'
import { createUiEntity } from 'connectors/snowplow/entities'
import { createFeatureFlagEntity } from 'connectors/snowplow/entities'
import { UI_COMPONENT_CARD } from 'connectors/snowplow/entities'

import { createImpressionEvent } from 'connectors/snowplow/events'
import { createContentOpenEvent } from 'connectors/snowplow/events'
import { createVariantEnrollEvent } from 'connectors/snowplow/events'

import { snowplowTrackPageView } from 'common/api/snowplow-analytics'
import { sendCustomSnowplowEvent } from 'common/api/snowplow-analytics'

const initialState = {}

/** ACTIONS
 --------------------------------------------------------------- */
export const trackPageView = () => ({ type: SNOWPLOW_TRACK_PAGE_VIEW })
export const trackContentOpen = (destination, trigger, position, item) => {
  return {
    type: SNOWPLOW_TRACK_CONTENT_OPEN,
    destination,
    trigger,
    position,
    item
  }
}
export const trackImpression = (component, requirement, position, item, identifier) => {
  return {
    type: SNOWPLOW_TRACK_IMPRESSION,
    component,
    requirement,
    position,
    item,
    identifier
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

function* fireContentOpen({ destination, trigger, position, item }) {
  const contentOpenEvent = createContentOpenEvent(destination, trigger)
  const contentEntity = createContentEntity(item?.save_url, item?.resolved_id)
  const uiEntity = createUiEntity({
    type: UI_COMPONENT_CARD,
    hierarchy: 0,
    identifier: 'web-discover-card',
    index: position
  })

  const snowplowEntities = [contentEntity, uiEntity]
  yield sendCustomSnowplowEvent(contentOpenEvent, snowplowEntities)
}

function* fireImpression({ component, requirement, position, item, identifier }) {
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
