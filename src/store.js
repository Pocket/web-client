import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import { createWrapper } from 'next-redux-wrapper'
import createSagaMiddleware from 'redux-saga'
import { all } from 'redux-saga/effects'

/* IMPORT CONTAINER STATES
 --------------------------------------------------------------- */
import { homeSetupReducers } from 'containers/home/home-setup.state'
import { homeSetupSagas } from 'containers/home/home-setup.state'
import { homeOnboardingReducers } from 'containers/home/home-onboarding.state'
import { homeOnboardingSagas } from 'containers/home/home-onboarding.state'

import { appReducers, appSagas } from 'connectors/app/app.state'
import { oneTrustReducers } from 'connectors/third-party/one-trust.state'
import { brazeReducers } from 'connectors/third-party/braze.state'
import { brazeSagas } from 'connectors/third-party/braze.state'

import { userReducers, userSagas, accountReducers } from 'containers/account/account.state'

import { userTagsSagas } from 'containers/saves/tagged/tagged-page.state'
import { userTagsReducers } from 'containers/saves/tagged/tagged-page.state'

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

import { collectionsPageReducers } from 'containers/collections/collections.state'
import { collectionsBySlugReducers } from 'containers/collections/collections.state'
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

import { homeReducers } from 'containers/home/home.state'
import { homeSagas } from 'containers/home/home.state'

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

import { listenReducers } from 'connectors/listen/listen.state'
import { listenSagas } from 'connectors/listen/listen.state'

import { readerSettingsReducers } from 'containers/read/reader-settings.state'
import { readerSettingsSagas } from 'containers/read/reader-settings.state'

//Items (From the graph)
import { readerReducers } from 'containers/read/reader.state'
import { readerSagas } from 'containers/read/reader.state'

import { itemsReducers } from 'connectors/items/items.state'
import { itemsSavedReducers } from 'connectors/items/items-saved.state'
import { itemsSavedSagas } from 'connectors/items/items-saved.state'
import { itemsTransitionsReducers } from 'connectors/items/items-transition.state'

import { mutationArchiveReducers } from 'connectors/items/mutation-archive.state'
import { mutationArchiveSagas } from 'connectors/items/mutation-archive.state'

import { mutationDeleteReducers } from 'connectors/items/mutation-delete.state'
import { mutationDeleteSagas } from 'connectors/items/mutation-delete.state'

import { mutationFavoriteReducers } from 'connectors/items/mutation-favorite.state'
import { mutationFavoriteSagas } from 'connectors/items/mutation-favorite.state'

import { mutationTaggingReducers } from 'connectors/items/mutation-tagging.state'
import { mutationTaggingSagas } from 'connectors/items/mutation-tagging.state'

import { mutationUpsertSagas } from 'connectors/items/mutation-upsert.state'

import { mutationHighlightReducers } from 'connectors/items/mutation-highlight.state'
import { mutationHighlightSagas } from 'connectors/items/mutation-highlight.state'

import { mutationBulkReducers } from 'connectors/items/mutations-bulk.state'
import { mutationBulkSagas } from 'connectors/items/mutations-bulk.state'

import { mutationShareReducers } from 'connectors/items/mutation-share.state'
import { mutationShareSagas } from 'connectors/items/mutation-share.state'

import { mutationReportReducers } from 'connectors/items/mutation-report.state'
import { mutationReportSagas } from 'connectors/items/mutation-report.state'

import { pageSavedIdsReducers } from 'containers/saves/saved-items/saved-items.state'
import { pageSavedIdsSagas } from 'containers/saves/saved-items/saved-items.state'
import { pageSavedInfoReducers } from 'containers/saves/saved-items/saved-items.state'

/* REDUCERS
 --------------------------------------------------------------- */
const itemReducers = {
  itemsDisplay: itemsReducers, // This is canonical item data used to display an item from anywhere (an item is an item is an item)
  itemsSaved: itemsSavedReducers, // This represents the actions the user has taken on a given item (if any)
  itemsTransitions: itemsTransitionsReducers, // This represents items transitioning from unsaved to saved (saving -> saved -> unsaving)
  listen: listenReducers
}

const itemMutations = {
  mutationBulk: mutationBulkReducers,
  mutationFavorite: mutationFavoriteReducers,
  mutationArchive: mutationArchiveReducers,
  mutationDelete: mutationDeleteReducers,
  mutationTagging: mutationTaggingReducers,
  mutationHighlight: mutationHighlightReducers,
  mutationShare: mutationShareReducers,
  mutationReport: mutationReportReducers
}

const pageReducers = {
  pageHomeIds: [],
  pageHomeInfo: [],
  pageSavedIds: pageSavedIdsReducers,
  pageSavedInfo: pageSavedInfoReducers,
  pageDiscoverIds: [],
  pageDiscoverInfo: [],
  pageDiscoverTopicIds: [],
  pageDiscoverTopicInfo: [],
  pageCollectionIds: [],
  pageCollectionInfo: [],
  pageStoriesIds: [],
  pageStoriesInfo: []
}

const discoverReducers = {
  discoverItemsById: discoverItemsReducers, // Shared discover item store
  discoverHome: discoverHomeReducers,
  discoverTopic: topicReducers,
  syndicatedArticle: syndicatedArticleReducers
}

const collectionReducer = {
  collectionsPage: collectionsPageReducers,
  collectionsBySlug: collectionsBySlugReducers,
  collectionStoriesById: collectionStoriesReducers
}

const libraryReducers = {
  userTags: userTagsReducers,
  userMessages: userMessageReducers,
  userSearch: userSearchReducers,
  userPublicProfile: profileReducers,
  profileItemsByIds: profileItemsReducers
}

const readerViewReducers = {
  readerSettings: readerSettingsReducers,
  reader: readerReducers
}

const marketingReducers = {
  pocketHits: pocketHitsReducers
}

const globalReducers = {
  app: appReducers, // App wide (mostly example at this time)
  homeSetup: homeSetupReducers,
  homeOnboarding: homeOnboardingReducers,
  oneTrust: oneTrustReducers, // One Trust Readiness
  settings: settingsReducers, // User defined settings
  features: featureReducers, // Feature flags (very basic start)
  topicList: topicListReducers, // Valid topics list and active topic
  recit: recitReducers, // Recommended articles, both publisher and pocket
  toasts: actionToastsReducers, // Notifications of action results,
  shortcuts: shortcutReducers, // Keyboard shortcuts,
  analytics: snowplowReducers, //Analytics
  onboarding: onboardingReducers, // Onboarding
  braze: brazeReducers // Braze
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
  ...readerViewReducers,
  ...userAccountReducers,
  home: homeReducers,
  ...itemReducers,
  ...itemMutations,
  ...pageReducers
})

/* SAGAS
 --------------------------------------------------------------- */
function* rootSaga() {
  yield all([
    ...homeSetupSagas,
    ...homeOnboardingSagas,
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
    ...readerSettingsSagas,
    ...readerSagas, //graph
    ...homeSagas,
    ...userMessageSagas,
    ...userSearchSagas,
    ...profileSagas,
    ...profileItemsSagas,
    ...shortcutSagas,
    ...onboardingSagas,
    ...brazeSagas,
    ...pageSavedIdsSagas,
    ...itemsSavedSagas,
    ...mutationArchiveSagas,
    ...mutationDeleteSagas,
    ...mutationFavoriteSagas,
    ...mutationUpsertSagas,
    ...mutationBulkSagas,
    ...mutationTaggingSagas,
    ...mutationHighlightSagas,
    ...mutationShareSagas,
    ...mutationReportSagas,
    ...listenSagas
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
