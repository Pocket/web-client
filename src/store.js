import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import { createWrapper } from 'next-redux-wrapper'
import createSagaMiddleware from 'redux-saga'
import { all } from 'redux-saga/effects'

/* IMPORT CONTAINER STATES
 --------------------------------------------------------------- */
import { homeSetupReducers } from 'containers/home/setup/setup.state'
import { homeSetupSagas } from 'containers/home/setup/setup.state'

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

import { topicListReducers } from 'connectors/topic-list/topic-list.state'

import { pocketHitsReducers } from 'connectors/pocket-hits/pocket-hits.state'
import { pocketHitsSagas } from 'connectors/pocket-hits/pocket-hits.state'

import { syndicatedArticleReducers } from 'containers/syndicated-article/syndicated-article.state'
import { syndicatedArticleSagas } from 'containers/syndicated-article/syndicated-article.state'

import { userMessageReducers } from 'containers/messages/user-messages.state'
import { userMessageSagas } from 'containers/messages/user-messages.state'

import { actionToastsReducers } from 'connectors/toasts/toast.state'

import { shortcutReducers } from 'connectors/shortcuts/shortcuts.state.js'
import { shortcutSagas } from 'connectors/shortcuts/shortcuts.state.js'

import { listenReducers } from 'connectors/listen/listen.state'
import { listenSagas } from 'connectors/listen/listen.state'

import { readerSettingsReducers } from 'containers/read/reader-settings.state'
import { readerSettingsSagas } from 'containers/read/reader-settings.state'

//Items (From the graph)
import { readerReducers } from 'containers/read/reader.state'
import { readerSagas } from 'containers/read/reader.state'

import { itemsDisplayReducers } from 'connectors/items/items-display.state'
import { itemsSavedReducers } from 'connectors/items/items-saved.state'
import { itemsSavedSagas } from 'connectors/items/items-saved.state'
import { itemsTransitionsReducers } from 'connectors/items/items-transition.state'
import { itemsRelatedReducers } from 'connectors/items/items-related.state'

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

import { mutationReportReducers } from 'connectors/items/mutation-report.state'
import { mutationReportSagas } from 'connectors/items/mutation-report.state'

import { pageSavedIdsReducers } from 'containers/saves/saved-items/saved-items.state'
import { pageSavedIdsSagas } from 'containers/saves/saved-items/saved-items.state'
import { pageSavedInfoReducers } from 'containers/saves/saved-items/saved-items.state'

import { pageHomeReducers } from 'containers/home/home.state'
import { pageHomeSaga } from 'containers/home/home.state'

import { pageDiscoverIdsReducers } from 'containers/discover/discover.state'
import { pageTopicReducers } from 'containers/discover/topic/topic.state'

import { pageCollectionIdsReducers } from 'containers/collections/collections.state'
import { pageCollectionStoriesReducers } from 'containers/collections/stories-page/stories.state'

import { listsDisplayReducers } from 'connectors/lists/lists-display.state'

import { pageListsInfoSagas } from 'containers/lists/lists.state'
import { pageListsInfoReducers } from 'containers/lists/lists.state'

import { mutationListCreateReducers } from 'connectors/lists/mutation-create.state'
import { mutationListCreateSagas } from 'connectors/lists/mutation-create.state'

import { mutationListDeleteReducers } from 'connectors/lists/mutation-delete.state'
import { mutationListDeleteSagas } from 'connectors/lists/mutation-delete.state'

import { mutationListAddReducers } from 'connectors/lists/mutation-add.state'
import { mutationListAddSagas } from 'connectors/lists/mutation-add.state'

import { mutationListUpdateReducers } from 'connectors/lists/mutation-update.state'
import { mutationListUpdateSagas } from 'connectors/lists/mutation-update.state'

import { mutationListShareReducers } from 'connectors/lists/mutation-share.state'

/* REDUCERS
 --------------------------------------------------------------- */
const itemReducers = {
  itemsDisplay: itemsDisplayReducers, // This is canonical item data used to display an item from anywhere (an item is an item is an item)
  itemsSaved: itemsSavedReducers, // This represents the actions the user has taken on a given item (if any)
  itemsTransitions: itemsTransitionsReducers, // This represents items transitioning from unsaved to saved (saving -> saved -> unsaving)
  itemsRelated: itemsRelatedReducers, // This is an explict call for related items ... these will shift over requests
  listsDisplay: listsDisplayReducers,
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

const listMutations = {
  mutationListCreate: mutationListCreateReducers,
  mutationListAdd: mutationListAddReducers,
  mutationListDelete: mutationListDeleteReducers,
  mutationListUpdate: mutationListUpdateReducers,
  mutationListShare: mutationListShareReducers
}

const pageReducers = {
  pageHome: pageHomeReducers,
  pageSavedIds: pageSavedIdsReducers,
  pageSavedInfo: pageSavedInfoReducers,
  pageDiscoverIds: pageDiscoverIdsReducers, // item ids for the discover home surface
  pageTopic: pageTopicReducers, //topic keyed arrays of item ids for topic pages
  pageCollectionIds: pageCollectionIdsReducers,
  pageCollectionInfo: [], // In future this will handle pagination
  pageCollectionStories: pageCollectionStoriesReducers,
  pageStoriesInfo: [],
  pageListsInfo: pageListsInfoReducers
}

const discoverReducers = {
  syndicatedArticle: syndicatedArticleReducers
}

const libraryReducers = {
  userTags: userTagsReducers,
  userMessages: userMessageReducers,
  userSearch: userSearchReducers
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
  oneTrust: oneTrustReducers, // One Trust Readiness
  settings: settingsReducers, // User defined settings
  features: featureReducers, // Feature flags (very basic start)
  topicList: topicListReducers, // Valid topics list and active topic
  toasts: actionToastsReducers, // Notifications of action results,
  shortcuts: shortcutReducers, // Keyboard shortcuts,
  analytics: snowplowReducers, //Analytics
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
  ...libraryReducers,
  ...readerViewReducers,
  ...userAccountReducers,
  ...itemReducers,
  ...itemMutations,
  ...listMutations,
  ...pageReducers
})

/* SAGAS
 --------------------------------------------------------------- */
function* rootSaga() {
  yield all([
    ...homeSetupSagas,
    ...appSagas,
    ...userSagas,
    ...settingsSagas,
    ...userTagsSagas,
    ...featureSagas,
    ...snowplowSagas,
    ...pocketHitsSagas,
    ...syndicatedArticleSagas,
    ...readerSettingsSagas,
    ...readerSagas, //graph
    ...pageHomeSaga,
    ...userMessageSagas,
    ...userSearchSagas,
    ...shortcutSagas,
    ...brazeSagas,
    ...pageSavedIdsSagas,
    ...itemsSavedSagas,
    ...pageListsInfoSagas,
    ...mutationArchiveSagas,
    ...mutationDeleteSagas,
    ...mutationFavoriteSagas,
    ...mutationUpsertSagas,
    ...mutationBulkSagas,
    ...mutationTaggingSagas,
    ...mutationHighlightSagas,
    ...mutationReportSagas,
    ...mutationListCreateSagas,
    ...mutationListDeleteSagas,
    ...mutationListUpdateSagas,
    ...mutationListAddSagas,
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
