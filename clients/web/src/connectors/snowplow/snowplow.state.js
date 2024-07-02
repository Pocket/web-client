import { take, takeEvery, takeLatest, call, put, select } from 'redux-saga/effects'
import { analyticsActions } from 'connectors/snowplow/actions'
import * as Sentry from '@sentry/nextjs'

import { createContentOpenEvent } from 'connectors/snowplow/events'
import { createEngagementEvent } from 'connectors/snowplow/events'
import { createImpressionEvent } from 'connectors/snowplow/events'
import { createObjectUpdateEvent } from 'connectors/snowplow/events'
import { createVariantEnrollEvent } from 'connectors/snowplow/events'

import { createContentEntity } from 'connectors/snowplow/entities'
import { createNewsletterSubscriberEntity } from 'connectors/snowplow/entities'
import { createUiEntity } from 'connectors/snowplow/entities'
import { createRecommendationEntity } from 'connectors/snowplow/entities'
import { createCorpusRecommendationEntity } from 'connectors/snowplow/entities'
import { createReportEntity } from 'connectors/snowplow/entities'
import { createShareableListItemEntity } from 'connectors/snowplow/entities'
import { createShareableListEntity } from 'connectors/snowplow/entities'
import { createSlateEntity } from 'connectors/snowplow/entities'
import { createSlateLineupEntity } from 'connectors/snowplow/entities'
import { createFeatureFlagEntity } from 'connectors/snowplow/entities'

import { SNOWPLOW_INITIALIZED } from 'actions'
import { SNOWPLOW_TRACK_PAGE_VIEW } from 'actions'
import { SNOWPLOW_TRACK_ITEM_IMPRESSION } from 'actions'
import { SNOWPLOW_SEND_EVENT } from 'actions'
import { VARIANTS_SAVE } from 'actions'
import { FEATURES_HYDRATE } from 'actions'

import { BATCH_SIZE } from 'common/constants'
import { trackSelfDescribingEvent } from '@snowplow/browser-tracker'

/** ACTIONS
 --------------------------------------------------------------- */
export const finalizeSnowplow = () => ({ type: SNOWPLOW_INITIALIZED })
export const trackPageView = () => ({ type: SNOWPLOW_TRACK_PAGE_VIEW })
export const sendSnowplowEvent = (identifier, data) => ({ type: SNOWPLOW_SEND_EVENT, identifier, data}) //prettier-ignore

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
      const { impressionId, id, url, corpusRecommendationId } = action
      const identifier = impressionId || id || corpusRecommendationId || url
      const set = new Set([...state.impressions, identifier])
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
  for (const flag in variants) {
    const variantEnrollEvent = createVariantEnrollEvent()
    const featureFlagEntity = createFeatureFlagEntity(flag, variants[flag])

    yield call(sendCustomSnowplowEvent, variantEnrollEvent, [featureFlagEntity])
  }
}

function* fireFeatureEnroll({ hydrate }) {
  yield call(waitForInitialization)
  for (const flag in hydrate) {
    const { test: testName, variant, assigned } = hydrate[flag]
    const shouldBeTracked = variant !== 'disabled' && !!variant && assigned
    if (shouldBeTracked) {
      const variantEnrollEvent = createVariantEnrollEvent()
      const featureFlagEntity = createFeatureFlagEntity(testName, variant)

      yield call(sendCustomSnowplowEvent, variantEnrollEvent, [featureFlagEntity])
    }
  }
}

const eventBuilders = {
  contentOpen: createContentOpenEvent,
  engagement: createEngagementEvent,
  impression: createImpressionEvent,
  objectUpdate: createObjectUpdateEvent
}

const entityBuilders = {
  ui: createUiEntity,
  content: createContentEntity,
  newsletterSubscriber: createNewsletterSubscriberEntity,
  recommendation: createRecommendationEntity,
  corpusRecommendation: createCorpusRecommendationEntity,
  report: createReportEntity,
  shareableListItem: createShareableListItemEntity,
  shareableList: createShareableListEntity,
  slate: createSlateEntity,
  slateLineup: createSlateLineupEntity
}

const expectationTypes = {
  id: 'string',
  url: 'string',
  position: 'number',
  label: 'string',
  destination: 'string',
  value: 'string',
  reason: 'string',
  otherText: 'string',
  recommendationId: 'string',
  slateLineupId: 'string',
  slateLineupRequestId: 'string',
  slateLineupExperiment: 'string',
  slateId: 'string',
  slateRequestId: 'string',
  slateExperiment: 'string',
  displayName: 'string',
  description: 'string',
  corpusRecommendationId: 'string',
  shareableListItemExternalId: 'string',
  shareableListExternalId: 'string',
  listItemNoteVisibility: 'string',
  note: 'string',
  slug: 'string',
  title: 'string',
  status: 'string',
  moderationStatus: 'string',
  moderatedBy: 'string',
  moderationReason: 'string',
  createdAt: 'number',
  updatedAt: 'number',
  givenUrl: 'string',
  excerpt: 'string',
  imageUrl: 'string',
  authors: 'object',
  publisher: 'string',
  sortOrder: 'number',
  email: 'string',
  locale: 'string'
}

export function validateSnowplowExpectations({ identifier, expects, data }) {
  const isDevBuild = process.env.SHOW_DEV === 'included'

  // Make sure we are not missing any entities
  try {
    if (!data || !expects) return true

    const missingValues =
      expects?.filter((expectation) => {
        return (
          !Object.prototype.hasOwnProperty.call(data, expectation) ||
          typeof data[expectation] === 'undefined' // We shouldn't have undefined fields if data is passed
        )
      }) || []

    const badValues = expects?.filter(
      (expectation) => typeof data[expectation] !== expectationTypes[expectation]
    )

    if (missingValues?.length > 0) throw new SnowplowValueMissingError(`Missing expected values for : ${missingValues}`) //prettier-ignore
    if (badValues?.length > 0) throw new SnowplowValueTypeError(`Value types are not valid for : ${badValues}`) //prettier-ignore

    return true
  } catch (err) {
    if (isDevBuild) return console.warn(identifier, data, err.message)
    Sentry.withScope((scope) => {
      scope.setContext('data', { identifier, ...data })
      Sentry.captureMessage(err)
    })
    return false
  }
}

export function buildSnowplowCustomEvent({ identifier, data }) {
  const { eventType, entityTypes, eventData, batchEntityTypes, expects } = analyticsActions[identifier] //prettier-ignore
  const isBatch = batchEntityTypes

  // Run a test against expectations
  if (isBatch) {
    data.forEach((batchData) =>
      validateSnowplowExpectations({ identifier, expects, data: batchData })
    )
  } else {
    validateSnowplowExpectations({ identifier, expects, data })
  }

  // Build event
  const eventFunction = eventBuilders[eventType]
  const event = eventFunction({ ...eventData, ...data })

  // Build entities
  const singleEntities = entityTypes
    ? entityTypes.map((entity) => {
        const entityFunction = entityBuilders[entity]
        return entityFunction({ ...eventData, ...data, identifier })
      })
    : []

  // Build bulk entities if they exist, limit to BATCH_SIZE
  const batchEntities = batchEntityTypes
    ? batchEntityTypes
        .map((entity) => {
          const entityFunction = entityBuilders[entity]
          if (data.length > BATCH_SIZE) data.length = BATCH_SIZE
          return data.map((item) => entityFunction({ ...eventData, ...item, identifier }))
        })
        .flat()
    : []

  const entities = [...singleEntities, ...batchEntities]

  return { event, entities, expects }
}

export function* fireSnowplowEvent({ identifier, data }) {
  yield call(waitForInitialization)

  // Check events are valid
  const { eventType, eventData } = analyticsActions[identifier] || {}
  if (!eventType) return console.warn(`${identifier}: No action for this event!`)

  // Build custom events
  const { event, entities } = yield buildSnowplowCustomEvent({ identifier, data })

  // Tracking impressions using id or url
  if (eventType === 'impression') {
    yield put({ type: SNOWPLOW_TRACK_ITEM_IMPRESSION, ...eventData, ...data })
  }

  yield call(sendCustomSnowplowEvent, event, entities)
}

/** UTILITIES :: THIRD PARTY SEND
 ---------------------------------------------------------------
 * functions here assume snowplow has already been loaded in, e.g. for automatic tracking
 */

/**
 * Send a custom event to Snowplow
 *
 * Likely formatted from one of the following utilities, so far:
 *   - src/common/snowplow/events/[ event ].js
 *   - src/common/snowplow/entities/[ entity ].js
 *
 * @param {Object} snowplowEvent - self-describing JSON detailing the user event
 * @param {Object[]} [snowplowEntities=[]] - self-describing JSON detailing the context in which the event happened
 */
const sendCustomSnowplowEvent = (event, context = []) => {
  try {
    trackSelfDescribingEvent({ event, context })
  } catch {
    console.warn('CustomEvent: snowplow library is not available')
  }
}

const snowplowTrackPageView = () => {
  try {
    trackPageView()
  } catch {
    console.warn('PageView: snowplow library is not available')
  }
}

class SnowplowValueMissingError extends Error {
  constructor(message) {
    super(message)
    this.name = 'SnowplowValueMissingError'
  }
}

class SnowplowValueTypeError extends Error {
  constructor(message) {
    super(message)
    this.name = 'SnowplowValueTypeError'
  }
}
