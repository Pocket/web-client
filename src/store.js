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

import { discoverItemsReducers } from 'connectors/items-by-id/discover/items.state'
import { discoverItemsSagas } from 'connectors/items-by-id/discover/items.state'

import { discoverHomeReducers } from 'containers/discover/discover.state'
import { discoverHomeSagas } from 'containers/discover/discover.state'

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

import { myListReducers } from 'containers/my-list/my-list.state'
import { myListSagas } from 'containers/my-list/my-list.state'

import { myListItemsReducers } from 'connectors/items-by-id/my-list/items.state'
import { myListItemsSagas } from 'connectors/items-by-id/my-list/items.state'

import { itemBulkReducers } from 'connectors/items-by-id/my-list/items.bulk'
import { itemDeleteReducers } from 'connectors/items-by-id/my-list/items.delete'
import { itemTagReducers } from 'connectors/items-by-id/my-list/items.tag'

import { homeReducers } from 'containers/home/home.state'
import { homeSagas } from 'containers/home/home.state'

import { readReducers } from 'containers/read/read.state'
import { readSagas } from 'containers/read/read.state'

/* REDUCERS
 --------------------------------------------------------------- */
const discoverReducers = {
  discoverItemsById: discoverItemsReducers, // Shared discover item store
  discoverHome: discoverHomeReducers,
  discoverTopic: topicReducers,
  syndicatedArticle: syndicatedArticleReducers
}

const collectionReducers = {
  myListItemsById: myListItemsReducers,
  myList: myListReducers,
  bulkEdit: itemBulkReducers,
  itemsToDelete: itemDeleteReducers,
  itemsToTag: itemTagReducers,
}

const readerReducers = {
  reader: readReducers
}

const marketingReducers = {
  pocketHits: pocketHitsReducers
}

const globalReducers = {
  app: appReducers, // App wide (mostly example at this time)
  user: userReducers, // User profile and auth,
  features: featureReducers, // Feature flags (very basic start)
  topicList: topicListReducers, // Valid topics list and active topic
  recit: recitReducers // Recommended articles, both publisher and pocket
}

const rootReducer = combineReducers({
  ...globalReducers,
  ...marketingReducers,
  ...discoverReducers,
  ...collectionReducers,
  ...readerReducers,
  home: homeReducers
})

/* SAGAS
 --------------------------------------------------------------- */
function* rootSaga() {
  yield all([
    ...appSagas,
    ...userSagas,
    ...featureSagas,
    ...snowplowSagas,
    ...discoverItemsSagas,
    ...discoverHomeSagas,
    ...topicListSagas,
    ...topicSagas,
    ...pocketHitsSagas,
    ...syndicatedArticleSagas,
    ...recitSagas,
    ...myListSagas,
    ...myListItemsSagas,
    ...readSagas,
    ...homeSagas
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
