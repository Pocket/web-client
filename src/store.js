import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import { createWrapper } from 'next-redux-wrapper'
import createSagaMiddleware from 'redux-saga'
import { all } from 'redux-saga/effects'

/* IMPORT CONTAINER STATES
 --------------------------------------------------------------- */
import { appReducers, appSagas } from 'connectors/app/app.state'
import { oneTrustReducers } from 'connectors/one-trust/one-trust.state'

import { userReducers, userSagas, accountReducers } from 'containers/account/account.state'

import { userTagsSagas } from 'containers/my-list/tags-page/tags-page.state'
import { userTagsReducers } from 'containers/my-list/tags-page/tags-page.state'

import { settingsReducers } from 'connectors/settings/settings.state'
import { settingsSagas } from 'connectors/settings/settings.state'

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

import { collectionStoriesReducers } from 'connectors/items-by-id/collection/stories.state'
import { collectionStoriesSagas } from 'connectors/items-by-id/collection/stories.state'

import { topicListReducers } from 'connectors/topic-list/topic-list.state'

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

import { homeItemsReducers } from 'connectors/items-by-id/home/items.state'
import { homeItemsSagas } from 'connectors/items-by-id/home/items.state'

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

import { onboardingReducers } from 'connectors/onboarding/onboarding.state'
import { onboardingSagas } from 'connectors/onboarding/onboarding.state'

//Items (From the graph)
import { itemsReducers } from 'connectors/items/items.state'
import { itemsSavedReducers } from 'connectors/items/items-saved.state'
import { itemsSavedSagas } from 'connectors/items/items-saved.state'

import { mutationArchiveSagas } from 'connectors/items/mutation-archive.state'
import { mutationDeleteSagas } from 'connectors/items/mutation-delete.state'
import { mutationFavoriteSagas } from 'connectors/items/mutation-favorite.state'
import { mutationUpsertSagas } from 'connectors/items/mutation-upsert.state'

import { mutationBulkReducers } from 'connectors/items/mutations-bulk.state'
import { mutationBulkSagas } from 'connectors/items/mutations-bulk.state'

import { listSavedReducers } from 'containers/list-saved/list-saved.state'
import { listSavedSagas } from 'containers/list-saved/list-saved.state'
import { listSavedPageInfoReducers } from 'containers/list-saved/list-saved.state'

/* REDUCERS
 --------------------------------------------------------------- */
const itemReducers = {
  items: itemsReducers,
  itemsSaved: itemsSavedReducers,
  mutationBulk: mutationBulkReducers,
}

const listReducers = {
  listHome: [],
  listSaved: listSavedReducers,
  listSavedPageInfo: listSavedPageInfoReducers,
  listDiscover: [],
  listCollection: [],
  listCollectionStories: []
}

const itemActionReducers = {
  itemsToFavorite: itemFavoriteReducers,
  itemsToDelete: itemDeleteReducers,
  itemsToArchive: itemArchiveReducers,
  itemsToTag: itemTagReducers,
  itemToReport: itemReportReducers,
  itemsToShare: itemShareReducers
}

const discoverReducers = {
  discoverItemsById: discoverItemsReducers, // Shared discover item store
  discoverHome: discoverHomeReducers,
  discoverTopic: topicReducers,
  syndicatedArticle: syndicatedArticleReducers
}

const collectionReducer = {
  collectionsBySlug: collectionsReducers,
  collectionStoriesById: collectionStoriesReducers
}

const libraryReducers = {
  myListItemsById: myListItemsReducers,
  myList: myListReducers,
  bulkEdit: itemBulkReducers,
  userTags: userTagsReducers,
  userMessages: userMessageReducers,
  userSearch: userSearchReducers,
  userPublicProfile: profileReducers,
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
  settings: settingsReducers, // User defined settings
  features: featureReducers, // Feature flags (very basic start)
  topicList: topicListReducers, // Valid topics list and active topic
  recit: recitReducers, // Recommended articles, both publisher and pocket
  toasts: actionToastsReducers, // Notifications of action results,
  shortcuts: shortcutReducers, // Keyboard shortcuts,
  analytics: snowplowReducers, //Analytics
  onboarding: onboardingReducers // Onboarding
}

const userAccountReducers = {
  user: userReducers, // User profile and auth,
  ...accountReducers
}

export const rootReducer = combineReducers({
  ...globalReducers,
  ...marketingReducers,
  ...discoverReducers,
  ...collectionReducer,
  ...libraryReducers,
  ...readerReducers,
  ...userAccountReducers,
  home: homeReducers,
  homeItemsById: homeItemsReducers,
  ...itemReducers,
  ...listReducers,
  ...itemActionReducers
})

/* SAGAS
 --------------------------------------------------------------- */
function* rootSaga() {
  yield all([
    ...appSagas,
    ...userSagas,
    ...settingsSagas,
    ...userTagsSagas,
    ...featureSagas,
    ...snowplowSagas,
    ...discoverItemsSagas,
    ...discoverHomeSagas,
    ...collectionsSagas,
    ...collectionStoriesSagas,
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
    ...homeItemsSagas,
    ...userMessageSagas,
    ...userSearchSagas,
    ...profileSagas,
    ...profileItemsSagas,
    ...shortcutSagas,
    ...onboardingSagas,
    ...listSavedSagas,
    ...itemsSavedSagas,
    ...mutationArchiveSagas,
    ...mutationDeleteSagas,
    ...mutationFavoriteSagas,
    ...mutationUpsertSagas,
    ...mutationBulkSagas
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
          actionsDenylist: 'SNOWPLOW_'
        })
      : compose

  const store = createStore(rootReducer, {}, composeEnhancers(applyMiddleware(sagaMiddleware)))

  store.sagaTask = sagaMiddleware.run(rootSaga)

  return store
}

export const wrapper = createWrapper(initializeStore, { debug: false })
