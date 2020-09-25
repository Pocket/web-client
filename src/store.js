import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import { createWrapper } from 'next-redux-wrapper'
import createSagaMiddleware from 'redux-saga'
import { all } from 'redux-saga/effects'

/* IMPORT CONTAINER STATES
 --------------------------------------------------------------- */
import { appReducers, appSagas } from 'connectors/app/app.state'
import { userReducers, userSagas } from 'connectors/user/user.state'

import { featureReducers } from 'connectors/feature-flags/feature-flags.state'
import { featureSagas } from 'connectors/feature-flags/feature-flags.state'

// import { snowplowReducers } from 'connectors/snowplow/snowplow.state'
import { snowplowSagas } from 'connectors/snowplow/snowplow.state'

import { itemsReducers } from 'connectors/items/items.state'
import { itemsSagas } from 'connectors/items/items.state'

import { discoverReducers } from 'containers/discover/discover.state'
import { discoverSagas } from 'containers/discover/discover.state'

import { topicListReducers } from 'connectors/topic-list/topic-list.state'
import { topicListSagas } from 'connectors/topic-list/topic-list.state'

import { topicReducers } from 'containers/topic/topic.state'
import { topicSagas } from 'containers/topic/topic.state'

import { pocketHitsReducers } from 'connectors/pocket-hits/pocket-hits.state'
import { pocketHitsSagas } from 'connectors/pocket-hits/pocket-hits.state'

import { syndicatedArticleReducers } from 'containers/syndicated-article/syndicated-article.state'
import { syndicatedArticleSagas } from 'containers/syndicated-article/syndicated-article.state'

import { recitReducers } from 'connectors/recit/recit.state'
import { recitSagas } from 'connectors/recit/recit.state'

import { variantReducers } from 'connectors/variant-flags/variant-flags.state'
import { variantSagas } from 'connectors/variant-flags/variant-flags.state'

/* REDUCERS
 --------------------------------------------------------------- */
const pageReducers = {
  discover: discoverReducers,
  topic: topicReducers,
  pocketHits: pocketHitsReducers,
  syndicatedArticle: syndicatedArticleReducers
}

const connectorReducers = {
  app: appReducers, // App wide (mostly example at this time)
  user: userReducers, // User profile and auth,
  features: featureReducers, // Feature flags (very basic start)
  // snowplow: snowplowReducers, // Snowplow analytics config post-initial-load
  topicList: topicListReducers, // Valid topics list and active topic
  items: itemsReducers, // Shared item store for all items in app
  recit: recitReducers, // Recommended articles, both publisher and pocket
  variants: variantReducers // Variant flags (basic and temporary)
}

const rootReducer = combineReducers({
  ...pageReducers,
  ...connectorReducers
})

/* SAGAS
 --------------------------------------------------------------- */
function* rootSaga() {
  yield all([
    ...appSagas,
    ...userSagas,
    ...featureSagas,
    ...snowplowSagas,
    ...itemsSagas,
    ...discoverSagas,
    ...topicListSagas,
    ...topicSagas,
    ...pocketHitsSagas,
    ...syndicatedArticleSagas,
    ...recitSagas,
    ...variantSagas
  ])
}

/* STORE
 --------------------------------------------------------------- */
export const initializeStore = () => {
  const sagaMiddleware = createSagaMiddleware()

  const composeEnhancers =
    process.env.NODE_ENV !== 'production' &&
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ name: 'Pocket Discover' })
      : compose

  const store = createStore(
    rootReducer,
    {},
    composeEnhancers(applyMiddleware(sagaMiddleware))
  )

  store.sagaTask = sagaMiddleware.run(rootSaga)

  return store
}

export const wrapper = createWrapper(initializeStore, { debug: false })
