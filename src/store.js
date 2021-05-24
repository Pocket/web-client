import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import { createWrapper } from 'next-redux-wrapper'
import createSagaMiddleware from 'redux-saga'
import { all } from 'redux-saga/effects'

/* IMPORT CONTAINER STATES
 --------------------------------------------------------------- */
import { appReducers, appSagas } from 'connectors/app/app.state'
import { oneTrustReducers } from 'connectors/one-trust/one-trust.state'
import { userReducers, userSagas } from 'connectors/user/user.state'

import { userTagsSagas } from 'containers/my-list/tags-page/tags-page.state'
import { userTagsReducers } from 'containers/my-list/tags-page/tags-page.state'

import { userSearchReducers } from 'connectors/search/search.state'
import { userSearchSagas } from 'connectors/search/search.state'

import { featureReducers } from 'connectors/feature-flags/feature-flags.state'
import { featureSagas } from 'connectors/feature-flags/feature-flags.state'

import { snowplowReducers } from 'connectors/snowplow/snowplow.state'
import { snowplowSagas } from 'connectors/snowplow/snowplow.state'

import { discoverItemsReducers } from 'connectors/items-by-id/discover/items.state'
import { discoverItemsSagas } from 'connectors/items-by-id/discover/items.state'

import { discoverHomeReducers } from 'containers/discover/discover.state'
import { discoverHomeSagas } from 'containers/discover/discover.state'

import { collectionsReducers } from 'containers/collections/collections.state'
import { collectionsSagas } from 'containers/collections/collections.state'

import { collectionItemsReducers } from 'connectors/items-by-id/collection/items.state'
import { collectionItemsSagas } from 'connectors/items-by-id/collection/items.state'

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
import { itemFavoriteReducers } from 'connectors/items-by-id/my-list/items.favorite'
import { itemArchiveReducers } from 'connectors/items-by-id/my-list/items.archive'
import { itemTagReducers } from 'connectors/items-by-id/my-list/items.tag'
import { itemShareReducers } from 'connectors/items-by-id/my-list/items.share'
import { itemShareSagas } from 'connectors/items-by-id/my-list/items.share'

import { itemReportReducers } from 'connectors/items-by-id/discover/items.report'
import { itemReportSagas } from 'connectors/items-by-id/discover/items.report'

import { homeReducers } from 'containers/home/home.state'
import { homeSagas } from 'containers/home/home.state'

import { readReducers } from 'containers/read/read.state'
import { readSagas } from 'containers/read/read.state'

import { userMessageReducers } from 'containers/messages/user-messages.state'
import { userMessageSagas } from 'containers/messages/user-messages.state'

import { profileReducers } from 'containers/profile/profile.state'
import { profileSagas } from 'containers/profile/profile.state'

import { profileItemsReducers } from 'connectors/items-by-id/profile/items.state'
import { profileItemsSagas } from 'connectors/items-by-id/profile/items.state'

import { actionToastsReducers } from 'connectors/toasts/toast.state'

import { shortcutReducers } from 'connectors/shortcuts/shortcuts.state.js'
import { shortcutSagas } from 'connectors/shortcuts/shortcuts.state.js'

/* REDUCERS
 --------------------------------------------------------------- */
const discoverReducers = {
  discoverItemsById: discoverItemsReducers, // Shared discover item store
  discoverHome: discoverHomeReducers,
  discoverTopic: topicReducers,
  itemToReport: itemReportReducers,
  syndicatedArticle: syndicatedArticleReducers,
  collections: collectionsReducers,
  collectionItemsById: collectionItemsReducers
}

const libraryReducers = {
  myListItemsById: myListItemsReducers,
  myList: myListReducers,
  bulkEdit: itemBulkReducers,
  itemsToFavorite: itemFavoriteReducers,
  itemsToDelete: itemDeleteReducers,
  itemsToArchive: itemArchiveReducers,
  itemsToTag: itemTagReducers,
  itemsToShare: itemShareReducers,
  userTags: userTagsReducers,
  userMessages: userMessageReducers,
  userSearch: userSearchReducers,
  userProfile: profileReducers,
  profileItemsByIds: profileItemsReducers
}

const readerReducers = {
  reader: readReducers
}

const marketingReducers = {
  pocketHits: pocketHitsReducers
}

const globalReducers = {
  app: appReducers, // App wide (mostly example at this time)
  oneTrust: oneTrustReducers, // One Trust Readiness
  user: userReducers, // User profile and auth,
  features: featureReducers, // Feature flags (very basic start)
  topicList: topicListReducers, // Valid topics list and active topic
  recit: recitReducers, // Recommended articles, both publisher and pocket
  toasts: actionToastsReducers, // Notifications of action results,
  shortcuts: shortcutReducers, // Keyboard shortcuts,
  analytics: snowplowReducers //Analytics
}

const rootReducer = combineReducers({
  ...globalReducers,
  ...marketingReducers,
  ...discoverReducers,
  ...libraryReducers,
  ...readerReducers,
  home: homeReducers
})

/* SAGAS
 --------------------------------------------------------------- */
function* rootSaga() {
  yield all([
    ...appSagas,
    ...userSagas,
    ...userTagsSagas,
    ...featureSagas,
    ...snowplowSagas,
    ...discoverItemsSagas,
    ...discoverHomeSagas,
    ...collectionsSagas,
    ...collectionItemsSagas,
    ...topicListSagas,
    ...topicSagas,
    ...pocketHitsSagas,
    ...syndicatedArticleSagas,
    ...recitSagas,
    ...myListSagas,
    ...myListItemsSagas,
    ...itemShareSagas,
    ...itemReportSagas,
    ...readSagas,
    ...homeSagas,
    ...userMessageSagas,
    ...userSearchSagas,
    ...profileSagas,
    ...profileItemsSagas,
    ...shortcutSagas
  ])
}

/* STORE
 --------------------------------------------------------------- */
export const initializeStore = () => {
  const sagaMiddleware = createSagaMiddleware()

  const composeEnhancers =
    process.env.SHOW_DEV === 'included' &&
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
          name: 'Pocket Web Client',
          actionsBlacklist: 'SNOWPLOW_'
        })
      : compose

  const store = createStore(rootReducer, {}, composeEnhancers(applyMiddleware(sagaMiddleware)))

  store.sagaTask = sagaMiddleware.run(rootSaga)

  return store
}

export const wrapper = createWrapper(initializeStore, { debug: false })
