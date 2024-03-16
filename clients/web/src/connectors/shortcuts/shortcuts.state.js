import { takeLatest, takeEvery, put, call, select } from 'redux-saga/effects'
import { APP_SET_MODE } from 'actions'

import { MUTATION_BULK_DESELECT } from 'actions'
import { MUTATION_BULK_SELECT } from 'actions'
import { MUTATION_BULK_SET_CURRENT } from 'actions'

import { MUTATION_DELETE } from 'actions'
import { MUTATION_BULK_DELETE } from 'actions'

import { MUTATION_ARCHIVE } from 'actions'
import { MUTATION_UNARCHIVE } from 'actions'
import { MUTATION_BULK_ARCHIVE } from 'actions'
import { MUTATION_BULK_UNARCHIVE } from 'actions'

import { MUTATION_FAVORITE } from 'actions'
import { MUTATION_UNFAVORITE } from 'actions'
import { MUTATION_BULK_FAVORITE } from 'actions'
import { MUTATION_BULK_UNFAVORITE } from 'actions'

import { MUTATION_TAGGING } from 'actions'
import { MUTATION_BULK_TAGGING } from 'actions'

import { UPDATE_FONT_SIZE } from 'actions'
import { UPDATE_COLUMN_WIDTH } from 'actions'
import { ITEMS_SAVED_PAGE_SET_SORT_ORDER_REQUEST } from 'actions'

import { SHORTCUT_OPEN_HELP_OVERLAY } from 'actions'
import { SHORTCUT_CLOSE_HELP_OVERLAY } from 'actions'
import { SHORTCUT_TOGGLE_HELP_OVERLAY } from 'actions'

import { SHORTCUT_GO_TO_LIST } from 'actions'
import { SHORTCUT_GO_TO_ARCHIVE } from 'actions'
import { SHORTCUT_GO_TO_FAVORITES } from 'actions'
import { SHORTCUT_GO_TO_ARTICLES } from 'actions'
import { SHORTCUT_GO_TO_HIGHLIGHTS } from 'actions'
import { SHORTCUT_GO_TO_VIDEOS } from 'actions'
import { SHORTCUT_GO_TO_TAGS } from 'actions'

import { SHORTCUT_SELECT_NEXT_ITEM } from 'actions'
import { SHORTCUT_SELECT_PREVIOUS_ITEM } from 'actions'
import { SHORTCUT_SET_CURRENT_ITEM } from 'actions'

import { SHORTCUT_DELETE_ITEM } from 'actions'
import { SHORTCUT_ENGAGE_SELECTED_ITEM } from 'actions'

import { SHORTCUT_INCREASE_FONT_SIZE } from 'actions'
import { SHORTCUT_DECREASE_FONT_SIZE } from 'actions'
import { SHORTCUT_INCREASE_COLUMN_WIDTH } from 'actions'
import { SHORTCUT_DECREASE_COLUMN_WIDTH } from 'actions'

import { SHORTCUT_EDIT_TAGS } from 'actions'
import { SHORTCUT_ARCHIVE_ITEM } from 'actions'
import { SHORTCUT_FAVORITE_ITEM } from 'actions'
import { SHORTCUT_VIEW_ORIGINAL } from 'actions'

import { FONT_RANGE } from 'common/constants'
import { COLUMN_WIDTH_RANGE } from 'common/constants' // Need key combos for this that make sense
// import { LINE_HEIGHT_RANGE } from 'common/constants' // Need key combos for this that make sense

/** ACTIONS
 --------------------------------------------------------------- */
import { setListModeList } from 'connectors/app/app.state'
import { setListModeGrid } from 'connectors/app/app.state'
import { setListModeDetail } from 'connectors/app/app.state'

import { appSetMode } from 'connectors/app/app.state'

import { setColorModeLight } from 'connectors/app/app.state'
import { setColorModeDark } from 'connectors/app/app.state'
import { setColorModeSepia } from 'connectors/app/app.state'

export const openHelpOverlay = () => ({ type: SHORTCUT_OPEN_HELP_OVERLAY })
export const closeHelpOverlay = () => ({ type: SHORTCUT_CLOSE_HELP_OVERLAY })
export const toggleHelpOverlay = () => ({ type: SHORTCUT_TOGGLE_HELP_OVERLAY })

export const goToList = ({router}) => ({ type: SHORTCUT_GO_TO_LIST, router}) //prettier-ignore
export const goToArchive = ({router}) => ({ type: SHORTCUT_GO_TO_ARCHIVE, router}) //prettier-ignore
export const goToFavorites = ({router}) => ({ type: SHORTCUT_GO_TO_FAVORITES, router}) //prettier-ignore
export const goToArticles = ({router}) => ({ type: SHORTCUT_GO_TO_ARTICLES, router}) //prettier-ignore
export const goToHighlights = ({router}) => ({ type: SHORTCUT_GO_TO_HIGHLIGHTS, router}) //prettier-ignore
export const goToVideos = ({router}) => ({ type: SHORTCUT_GO_TO_VIDEOS, router}) //prettier-ignore
export const gotToTag = ({ router }) => ({ type: SHORTCUT_GO_TO_TAGS, router })

export const goToSearch = () => appSetMode('search')
export const bulkEdit = () => appSetMode('bulk')
export const saveAUrl = () => appSetMode('add')

export const selectShortcutItem = (id, position) => ({ type: SHORTCUT_SET_CURRENT_ITEM, currentId: id, position}) //prettier-ignore
export const selectNextItem = ({appMode}) => ({ type: SHORTCUT_SELECT_NEXT_ITEM, appMode }) //prettier-ignore
export const selectPreviousItem = ({appMode}) => ({ type: SHORTCUT_SELECT_PREVIOUS_ITEM, appMode }) //prettier-ignore
export const engageSelectedItem = ({ router, appMode }) => ({ type: SHORTCUT_ENGAGE_SELECTED_ITEM, router, appMode }) //prettier-ignore

export const deleteItem = ({appMode}) => ({ type: SHORTCUT_DELETE_ITEM, appMode }) //prettier-ignore
export const archiveItem = ({appMode}) => ({ type: SHORTCUT_ARCHIVE_ITEM, appMode }) //prettier-ignore
export const favoriteItem = ({ appMode }) => ({ type: SHORTCUT_FAVORITE_ITEM, appMode }) //prettier-ignore
export const editTags = ({ appMode }) => ({ type: SHORTCUT_EDIT_TAGS, appMode }) //prettier-ignore

export const viewOriginal = () => ({ type: SHORTCUT_VIEW_ORIGINAL })

export const increaseFontSize = () => ({ type: SHORTCUT_INCREASE_FONT_SIZE })
export const decreaseFontSize = () => ({ type: SHORTCUT_DECREASE_FONT_SIZE })
export const increaseColumnWidth = () => ({type: SHORTCUT_INCREASE_COLUMN_WIDTH }) //prettier-ignore
export const decreaseColumnWidth = () => ({type: SHORTCUT_DECREASE_COLUMN_WIDTH }) //prettier-ignore

const sortOrderSetNew = () => ({ type: ITEMS_SAVED_PAGE_SET_SORT_ORDER_REQUEST, sortOrder: 'DESC' })
const sortOrderSetOld = () => ({ type: ITEMS_SAVED_PAGE_SET_SORT_ORDER_REQUEST, sortOrder: 'ASC' })

// prettier-ignore
export const listShortcuts = [
  { action: goToList, transKey: 'go-to-saves', copy: 'Go to Saves', keyCopy: 'g then l', keys:  'g l' },
  { action: goToArchive, transKey: 'go-to-archive', copy: 'Go to Archive', keyCopy: 'g then a', keys:  'g a' },
  { action: goToFavorites, transKey: 'go-to-favorites', copy: 'Go to Favorites', keyCopy: 'g then f', keys:  'g f' },
  { action: goToArticles, transKey: 'go-to-articles', copy: 'Go to Articles', keyCopy: 'g then r', keys: 'g r' },
  { action: goToHighlights, transKey: 'go-to-highlights', copy: 'Go to Highlights', keyCopy: 'g then h', keys:  'g h' },
  { action: goToVideos, transKey: 'go-to-videos', copy: 'Go to Videos', keyCopy: 'g then v', keys: 'g v' },
  { action: gotToTag, transKey: 'go-to-all-tags', copy: 'Go to All Tags', keyCopy: 'g then t', keys:  'g t' },

  { action: goToSearch, transKey: 'go-to-search', copy: 'Go to Search', keyCopy: 'g then s', keys: 'g s', prevent: true},
  { action: bulkEdit, transKey: 'bulk-edit', copy: 'Bulk Edit', keyCopy: 'g then b', keys:  'g b' },
  { action: saveAUrl, transKey: 'save-a-url', copy: 'Save a URL', keyCopy: 'g then u', keys: 'g u', prevent: true},

  { action: sortOrderSetNew, transKey: 'sort-by-newest', copy: 'Sort by Newest', keyCopy: 's then n', keys: 's n' },
  { action: sortOrderSetOld, transKey: 'sort-by-oldest', copy: 'Sort by Oldest', keyCopy: 's then o', keys:  's o' },

  { action: setListModeList, transKey: 'list-view', copy: 'List View', keyCopy: 'v then l', keys: 'v l' },
  { action: setListModeGrid, transKey: 'grid-view', copy: 'Grid View', keyCopy: 'v then g', keys: 'v g' },
  { action: setListModeDetail, transKey: 'detail-view', copy: 'Detail View', keyCopy: 'v then d', keys: 'v d' },

  { action: setColorModeLight, transKey: 'change-to-light-theme', copy: 'Change to Light Theme	', keyCopy: 'c then l', keys:  'c l' },
  { action: setColorModeDark, transKey: 'change-to-dark-theme', copy: 'Change to Dark Theme	', keyCopy: 'c then d', keys:  'c d' },
  { action: setColorModeSepia, transKey: 'change-to-sepia-theme', copy: 'Change to Sepia Theme', keyCopy: 'c then s', keys:  'c s' },

  { action: toggleHelpOverlay, transKey: 'open-help-overlay', copy: 'Open Help Overlay', keyCopy: '? or /', keys: ['?', '/'] },

]

// prettier-ignore
export const itemActions = [
  { action: viewOriginal, transKey: 'open-original-in-new-tab', copy: 'Open Original in New Tab', keyCopy: 'o', keys: 'o' },
  { action: archiveItem, transKey: 'archive-selected-item', copy: 'Archive Selected Item', keyCopy: 'a', keys:  'a' },
  { action: favoriteItem, transKey: 'favorite-selected-item', copy: 'Favorite Selected Item', keyCopy: 'f', keys:  'f' },
  { action: editTags, transKey: 'tag-selected-item', copy: 'Tag Selected Item', keyCopy: 't', keys:  't', prevent: true },
  { action: deleteItem, transKey: 'delete-selected-item', copy: 'Delete Selected Item', keyCopy: 'd', keys: 'd' },
  { action: engageSelectedItem, transKey: 'select-item-in-bulk-edit', copy: 'Select Item in Bulk Edit', keyCopy: 'x', keys: ['x'] },
  { action: selectNextItem, transKey: 'select-next-item', copy: 'Select Next Item', keyCopy: 'j', keys: 'j' },
  { action: selectPreviousItem, transKey: 'select-previous-item', copy: 'Select Previous Item', keyCopy: 'k', keys: 'k' },
]

// prettier-ignore
export const readerShortcuts = [
  // We omit this so it doesn't bind since we do that in read container
  { action: null, transKey: 'back-to-saves', copy: 'Back to Saves', keyCopy: 'b', keys: 'b', omit: true },

  { action: increaseFontSize, transKey: 'increase-article-font-size', copy: 'Increase Article Font Size', keyCopy: 'Control =', keys: ['ctrl+='] },
  { action: decreaseFontSize, transKey: 'decrease-article-font-size', copy: 'Decrease Article Font Size', keyCopy: 'Control -', keys: ['ctrl+-'] },
  { action: increaseColumnWidth, transKey: 'increase-column-width', copy: 'Increase Column Width', keyCopy: 'Alt/Option =', keys: ['alt+='], premium: true},
  { action: decreaseColumnWidth, transKey: 'decrease-column-width', copy: 'Decrease Column Width', keyCopy: 'Alt/Option  -', keys: ['alt+-'], premium: true},
]

const initialState = {
  displayLegend: false,
  currentId: false,
  position: false
}

/** REDUCERS
 --------------------------------------------------------------- */
export const shortcutReducers = (state = initialState, action) => {
  switch (action.type) {
    case SHORTCUT_TOGGLE_HELP_OVERLAY: {
      const isDisplayed = state.displayLegend
      return { ...state, displayLegend: !isDisplayed }
    }

    case SHORTCUT_OPEN_HELP_OVERLAY: {
      return { ...state, displayLegend: true }
    }

    case SHORTCUT_CLOSE_HELP_OVERLAY: {
      return { ...state, displayLegend: false }
    }

    case SHORTCUT_SET_CURRENT_ITEM: {
      const { currentId, position } = action
      return { ...state, currentId, position }
    }

    default:
      return state
  }
}

/** SAGAS :: WATCHERS
 --------------------------------------------------------------- */
export const shortcutSagas = [
  takeLatest(SHORTCUT_GO_TO_LIST, shortcutGoToList),
  takeLatest(SHORTCUT_GO_TO_ARCHIVE, shortcutGoToArchive),
  takeLatest(SHORTCUT_GO_TO_FAVORITES, shortcutGoToFavorites),
  takeLatest(SHORTCUT_GO_TO_ARTICLES, shortcutGoToArticles),
  takeLatest(SHORTCUT_GO_TO_HIGHLIGHTS, shortcutGoToHighlights),
  takeLatest(SHORTCUT_GO_TO_VIDEOS, shortcutGoToVideos),
  takeLatest(SHORTCUT_GO_TO_TAGS, shortcutGoToTags),
  takeEvery(SHORTCUT_SELECT_NEXT_ITEM, shortcutNextItem),
  takeEvery(SHORTCUT_SELECT_PREVIOUS_ITEM, shortcutPreviousItem),
  takeEvery(SHORTCUT_ENGAGE_SELECTED_ITEM, shortcutEngage),
  takeLatest(APP_SET_MODE, appModeSwitch),
  takeLatest(SHORTCUT_VIEW_ORIGINAL, shortcutViewOriginal),
  takeLatest(SHORTCUT_DELETE_ITEM, shortcutDeleteItem),
  takeLatest(SHORTCUT_ARCHIVE_ITEM, shortcutArchiveItem),
  takeLatest(SHORTCUT_FAVORITE_ITEM, shortcutFavoriteItem),
  takeLatest(SHORTCUT_EDIT_TAGS, shortcutEditTags),
  takeEvery(SHORTCUT_INCREASE_FONT_SIZE, shortcutIncreaseFontSize),
  takeEvery(SHORTCUT_DECREASE_FONT_SIZE, shortcutDecreaseFontSize),
  takeEvery(SHORTCUT_INCREASE_COLUMN_WIDTH, shortcutIncreaseColumnWidth),
  takeEvery(SHORTCUT_DECREASE_COLUMN_WIDTH, shortcutDecreaseColumnWidth)
]

/* SAGAS :: SELECTORS
–––––––––––––––––––––––––––––––––––––––––––––––––– */
const getCurrentItemId = (state) => state.shortcuts.currentId
const getCurrentBulkItemId = (state) => state.mutationBulk.currentId
const getCurrentBulkItems = (state) => state.mutationBulk.itemIds
const getSection = (state) => state.app.section
const getPageSavedIds = (state) => state.pageSavedIds
const getItem = (state, id) => state.itemsDisplay[id]
const getSavedItem = (state, id) => state.itemsSaved[id]
const getFontSize = (state) => state.readerSettings.fontSize
const getColumnWidth = (state) => state.readerSettings.columnWidth
const getBulkItems = (state) => state?.mutationBulk?.itemIds
const getBatchFavorite = (state) => state?.mutationBulk?.favoriteAction
const getBatchArchive = (state) => state?.mutationBulk?.archiveAction

/** SAGA :: RESPONDERS
--------------------------------------------------------------- */
function* appModeSwitch() {
  yield put({ type: SHORTCUT_SET_CURRENT_ITEM, currentId: false })
}

function* shortcutGoToList({ router }) {
  yield call(router.push, '/saves')
}

function* shortcutGoToArchive({ router }) {
  yield call(router.push, '/saves/archive')
}

function* shortcutGoToFavorites({ router }) {
  yield call(router.push, '/saves/favorites')
}

function* shortcutGoToArticles({ router }) {
  yield call(router.push, '/saves/articles')
}

function* shortcutGoToHighlights({ router }) {
  yield call(router.push, '/saves/highlights')
}

function* shortcutGoToVideos({ router }) {
  yield call(router.push, '/saves/videos')
}

function* shortcutGoToTags({ router }) {
  yield call(router.push, '/saves/tags')
}

/**
 * ITEM SELECTORS
 * ---------------------------------------------------------------------------
 */
function* shortcutNextItem({ appMode }) {
  const selectFunction = appMode === 'bulk' ? selectBulkItem : selectItem
  yield call(selectFunction, true)
}

function* shortcutPreviousItem({ appMode }) {
  const selectFunction = appMode === 'bulk' ? selectBulkItem : selectItem
  yield call(selectFunction, false)
}

function* selectItem(next) {
  const currentId = yield select(getCurrentItemId)
  const section = yield select(getSection)
  const pageSavedIds = yield select(getPageSavedIds, section)
  const total = pageSavedIds?.length
  const currentPosition = pageSavedIds.indexOf(currentId)

  if (next) {
    const nextPosition = currentPosition < 0 ? 0 : currentPosition + 1
    const nextId = pageSavedIds[nextPosition] ? pageSavedIds[nextPosition] : false
    return yield put({
      type: SHORTCUT_SET_CURRENT_ITEM,
      currentId: nextId,
      position: nextPosition
    })
  }

  const prevPosition = currentPosition >= total ? total : currentPosition - 1
  const prevId = pageSavedIds[prevPosition] ? pageSavedIds[prevPosition] : false
  return yield put({
    type: SHORTCUT_SET_CURRENT_ITEM,
    currentId: prevId,
    position: prevPosition
  })
}

function* selectBulkItem(next) {
  const currentId = yield select(getCurrentBulkItemId)
  const section = yield select(getSection)
  const pageSavedIds = yield select(getPageSavedIds, section)
  const total = pageSavedIds?.length
  const currentPosition = pageSavedIds.indexOf(currentId)

  if (next) {
    const nextPosition = currentPosition < 0 ? 0 : currentPosition + 1
    const nextId = pageSavedIds[nextPosition] ? pageSavedIds[nextPosition] : false
    return yield put({ type: MUTATION_BULK_SET_CURRENT, currentId: nextId })
  }

  const prevPosition = currentPosition >= total ? total : currentPosition - 1
  const prevId = pageSavedIds[prevPosition] ? pageSavedIds[prevPosition] : false
  return yield put({ type: MUTATION_BULK_SET_CURRENT, currentId: prevId })
}

function* shortcutEngage({ appMode }) {
  if (appMode === 'bulk') return yield call(bulkEngage)
  // We are using standard element focus for enter actions
}

function* bulkEngage() {
  const bulkId = yield select(getCurrentBulkItemId)
  const bulkIds = yield select(getCurrentBulkItems)
  const type = bulkIds.includes(bulkId) ? MUTATION_BULK_DESELECT : MUTATION_BULK_SELECT
  yield put({ type, id: bulkId })
}

/**
 * ITEM ACTIONS
 * ---------------------------------------------------------------------------
 */

function* shortcutViewOriginal() {
  const selectedId = yield select(getCurrentItemId)
  if (!selectedId) return

  const item = yield select(getItem, selectedId)
  if (!item) return

  const { externalUrl } = item
  if (externalUrl) yield call(window.open, externalUrl, '_blank')
}

function* shortcutDeleteItem({ appMode }) {
  if (appMode === 'bulk') return yield shortcutBatchDelete()

  const id = yield select(getCurrentItemId)
  if (!id) return

  yield put({ type: MUTATION_DELETE, itemId: id })
}

function* shortcutArchiveItem({ appMode }) {
  if (appMode === 'bulk') return yield shortcutBatchArchive()

  const id = yield select(getCurrentItemId)
  if (!id) return

  const item = yield select(getSavedItem, id)
  if (!item) return

  const section = yield select(getSection)

  if (!item.isArchived) {
    if (section === 'unread') yield call(selectItem, true)
    return yield put({ type: MUTATION_ARCHIVE, itemId: id })
  }

  if (section === 'archive') yield call(selectItem, true)
  yield put({ type: MUTATION_UNARCHIVE, itemId: id })
}

function* shortcutFavoriteItem({ appMode }) {
  if (appMode === 'bulk') return yield shortcutBatchFavorite()

  const id = yield select(getCurrentItemId)
  if (!id) return

  const item = yield select(getSavedItem, id)
  if (!item) return

  const section = yield select(getSection)

  if (!item.isFavorite) return yield put({ type: MUTATION_FAVORITE, itemId: id })
  if (section === 'favorites') yield call(selectItem, true)
  return yield put({ type: MUTATION_UNFAVORITE, itemId: id })
}

function* shortcutEditTags({ appMode }) {
  if (appMode === 'bulk') return yield shortcutBatchTag()

  const id = yield select(getCurrentItemId)
  if (!id) return

  const currentItem = yield select(getSavedItem, id)
  const tags = currentItem?.tags

  yield put({ type: MUTATION_TAGGING, itemId: id, tags })
}

function* shortcutBatchFavorite() {
  const bulkItems = yield select(getBulkItems)
  if (!bulkItems.length) return

  const batchFavorite = yield select(getBatchFavorite)
  const type = batchFavorite === 'favorite' ? MUTATION_BULK_FAVORITE : MUTATION_BULK_UNFAVORITE

  yield put({ type, itemIds: bulkItems })
}

function* shortcutBatchArchive() {
  const bulkItems = yield select(getBulkItems)
  if (!bulkItems.length) return

  const batchArchive = yield select(getBatchArchive)
  const type = batchArchive === 'archive' ? MUTATION_BULK_ARCHIVE : MUTATION_BULK_UNARCHIVE

  yield put({ type, itemIds: bulkItems })
}

function* shortcutBatchDelete() {
  const bulkItems = yield select(getBulkItems)
  if (!bulkItems.length) return
  yield put({ type: MUTATION_BULK_DELETE, itemIds: bulkItems })
}

function* shortcutBatchTag() {
  const bulkItems = yield select(getBulkItems)
  if (!bulkItems.length) return
  yield put({ type: MUTATION_BULK_TAGGING, itemIds: bulkItems })
}

/**
 * USER PREFERENCES
 * ---------------------------------------------------------------------------
 */
function* shortcutIncreaseFontSize() {
  const fontSize = yield select(getFontSize)
  const nextSize = parseInt(fontSize) + 1

  if (nextSize > FONT_RANGE.length) return
  yield put({ type: UPDATE_FONT_SIZE, fontSize: nextSize })
}
function* shortcutDecreaseFontSize() {
  const fontSize = yield select(getFontSize)
  const nextSize = parseInt(fontSize) - 1

  if (nextSize < 0) return
  yield put({ type: UPDATE_FONT_SIZE, fontSize: nextSize })
}

function* shortcutIncreaseColumnWidth() {
  const columnWidth = yield select(getColumnWidth)
  const nextSize = parseInt(columnWidth) + 1

  if (nextSize > COLUMN_WIDTH_RANGE.length) return
  yield put({ type: UPDATE_COLUMN_WIDTH, columnWidth: nextSize })
}

function* shortcutDecreaseColumnWidth() {
  const columnWidth = yield select(getColumnWidth)
  const nextSize = parseInt(columnWidth) - 1

  if (nextSize < 0) return
  yield put({ type: UPDATE_COLUMN_WIDTH, columnWidth: nextSize })
}
