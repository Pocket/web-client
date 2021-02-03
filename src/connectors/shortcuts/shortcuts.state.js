import { takeLatest, takeEvery, put, call, select } from 'redux-saga/effects'
import { race, take } from 'redux-saga/effects'
import { APP_SET_MODE } from 'actions'
import { ITEMS_BULK_SET_CURRENT } from 'actions'
import { ITEMS_BULK_TOGGLE } from 'actions'

import { ITEMS_DELETE_REQUEST } from 'actions'
import { ITEMS_DELETE_CONFIRM } from 'actions'
import { ITEMS_DELETE_CANCEL } from 'actions'
import { ITEMS_ARCHIVE_REQUEST } from 'actions'
import { ITEMS_UNARCHIVE_REQUEST } from 'actions'
import { ITEMS_FAVORITE_REQUEST } from 'actions'
import { ITEMS_UNFAVORITE_REQUEST } from 'actions'
import { ITEMS_TAG_REQUEST } from 'actions'

import { UPDATE_FONT_SIZE } from 'actions'

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

import { SHORTCUT_EDIT_TAGS } from 'actions'
import { SHORTCUT_ARCHIVE_ITEM } from 'actions'
import { SHORTCUT_FAVORITE_ITEM } from 'actions'
import { SHORTCUT_VIEW_ORIGINAL } from 'actions'

import { FONT_RANGE } from 'common/constants'
// import { LINE_HEIGHT } from 'common/constants' // Need key combos for this that make sense
// import { COLUMN_WIDTH } from 'common/constants' // Need key combos for this that make sense

/** ACTIONS
 --------------------------------------------------------------- */
import { setListModeList } from 'connectors/app/app.state'
import { setListModeGrid } from 'connectors/app/app.state'
import { setListModeDetail } from 'connectors/app/app.state'
import { sortOrderSetOld } from 'connectors/app/app.state'
import { sortOrderSetNew } from 'connectors/app/app.state'
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

export const deleteItem = ({currentItem}) => ({ type: SHORTCUT_DELETE_ITEM, currentItem }) //prettier-ignore
export const archiveItem = ({currentItem}) => ({ type: SHORTCUT_ARCHIVE_ITEM, currentItem }) //prettier-ignore
export const favoriteItem = ({ currentItem }) => ({ type: SHORTCUT_FAVORITE_ITEM, currentItem }) //prettier-ignore
export const editTags = ({ currentItem }) => ({ type: SHORTCUT_EDIT_TAGS, currentItem }) //prettier-ignore

export const viewOriginal = () => ({ type: SHORTCUT_VIEW_ORIGINAL })

export const increaseFontSize = () => ({ type: SHORTCUT_INCREASE_FONT_SIZE })
export const decreaseFontSize = () => ({ type: SHORTCUT_DECREASE_FONT_SIZE })

// prettier-ignore
export const listShortcuts = [
  { action: goToList, copy: 'Go to My List', keyCopy: 'g then l', keys:  'g l' },
  { action: goToArchive, copy: 'Go to Archive', keyCopy: 'g then a', keys:  'g a' },
  { action: goToFavorites, copy: 'Go to Favorites', keyCopy: 'g then f', keys:  'g f' },
  { action: goToArticles, copy: 'Go to Articles', keyCopy: 'g then r', keys: 'g r' },
  { action: goToHighlights, copy: 'Go to Highlights', keyCopy: 'g then h', keys:  'g h' },
  { action: goToVideos, copy: 'Go to Videos', keyCopy: 'g then v', keys: 'g v' },
  { action: gotToTag, copy: 'Go to All Tags Page', keyCopy: 'g then t', keys:  'g t' },

  { action: goToSearch, copy: 'Go to Search', keyCopy: 'g then s', keys: 'g s', prevent: true},
  { action: bulkEdit, copy: 'Bulk Edit', keyCopy: 'g then b', keys:  'g b' },
  { action: saveAUrl, copy: 'Save a URL', keyCopy: 'g then u', keys: 'g u', prevent: true},

  { action: sortOrderSetNew, copy: 'Sort by Newest', keyCopy: 's then n', keys: 's n' },
  { action: sortOrderSetOld, copy: 'Sort by Oldest', keyCopy: 's then o', keys:  's o' },

  { action: setListModeList, copy: 'List View', keyCopy: 'v then l', keys: 'v l' },
  { action: setListModeGrid, copy: 'Grid View', keyCopy: 'v then g', keys: 'v g' },
  { action: setListModeDetail, copy: 'Detail View', keyCopy: 'v then d', keys: 'v d' },

  { action: setColorModeLight, copy: 'Change to Light Theme	', keyCopy: 'c then l', keys:  'c l' },
  { action: setColorModeDark, copy: 'Change to Dark Theme	', keyCopy: 'c then d', keys:  'c d' },
  { action: setColorModeSepia, copy: 'Change to Sepia Theme', keyCopy: 'c then s', keys:  'c s' },

  { action: selectNextItem, copy: 'Select Next Item', keyCopy: 'j', keys: 'j' },
  { action: selectPreviousItem, copy: 'Select Previous Item', keyCopy: 'k', keys: 'k' },
  { action: engageSelectedItem, copy: 'Open/Bulk Add Selected Item', keyCopy: 'enter', keys: ['enter'] },

  { action: viewOriginal, copy: 'View Original Version of Selected Item', keyCopy: 'o', keys: 'o' },

  { action: toggleHelpOverlay, copy: 'View Keyboard Shortcuts', keyCopy: '? or /', keys: ['?', '/'] },
  { action: deleteItem, copy: 'Delete Selected Item', keyCopy: 'd', keys:  'd' },
  { action: archiveItem, copy: 'Archive Selected Item', keyCopy: 'a', keys:  'a' },
  { action: favoriteItem, copy: 'Favorite Selected Item', keyCopy: 'f', keys:  'f' },
  { action: editTags, copy: 'Tag Selected Item', keyCopy: 't', keys:  't', prevent: true }
]

// prettier-ignore
export const readerShortcuts = [
  { action: increaseFontSize, copy: 'Increase Font Size', keyCopy: 'Control with + / =', keys: ['ctrl++', 'ctrl+='] },
  { action: decreaseFontSize, copy: 'Decrease Font Size', keyCopy: 'Control with -', keys: ['ctrl+-'] },
  // We omit this so it doesn't bind since we do that in read container
  {action: null, copy: 'Go Back', keyCopy: 'b', keys: 'b', omit: true},
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
  takeEvery(SHORTCUT_DECREASE_FONT_SIZE, shortcutDecreaseFontSize)
]

/* SAGAS :: SELECTORS
–––––––––––––––––––––––––––––––––––––––––––––––––– */
const getCurrentItemId = (state) => state.shortcuts.currentId
const getCurrentPosition = (state) => state.shortcuts.position
const getCurrentBulkItemId = (state) => state.bulkEdit.currentId
const getSection = (state) => state.app.section
const getItems = (state, section) => state.myList[section]
const getItem = (state, id) => state.myListItemsById[id]
const getFontSize = (state) => state.reader.fontSize

/** SAGA :: RESPONDERS
--------------------------------------------------------------- */
function* appModeSwitch() {
  yield put({ type: SHORTCUT_SET_CURRENT_ITEM, currentId: false })
}

function* shortcutGoToList({ router }) {
  yield call(router.push, '/my-list')
}

function* shortcutGoToArchive({ router }) {
  yield call(router.push, '/my-list/archive')
}

function* shortcutGoToFavorites({ router }) {
  yield call(router.push, '/my-list/favorites')
}

function* shortcutGoToArticles({ router }) {
  yield call(router.push, '/my-list/articles')
}

function* shortcutGoToHighlights({ router }) {
  yield call(router.push, '/my-list/highlights')
}

function* shortcutGoToVideos({ router }) {
  yield call(router.push, '/my-list/videos')
}

function* shortcutGoToTags({ router }) {
  yield call(router.push, '/my-list/tags')
}

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
  const items = yield select(getItems, section)
  const total = items.length
  const currentPosition = items.indexOf(currentId)

  if (next) {
    const nextPosition = currentPosition < 0 ? 0 : currentPosition + 1
    const nextId = items[nextPosition] ? items[nextPosition] : false
    return yield put({
      type: SHORTCUT_SET_CURRENT_ITEM,
      currentId: nextId,
      position: nextPosition
    })
  }

  const prevPosition = currentPosition >= total ? total : currentPosition - 1
  const prevId = items[prevPosition] ? items[prevPosition] : false
  return yield put({
    type: SHORTCUT_SET_CURRENT_ITEM,
    currentId: prevId,
    position: prevPosition
  })
}

function* selectBulkItem(next) {
  const currentId = yield select(getCurrentBulkItemId)
  const section = yield select(getSection)
  const items = yield select(getItems, section)
  const total = items.length
  const currentPosition = items.indexOf(currentId)

  if (next) {
    const nextPosition = currentPosition < 0 ? 0 : currentPosition + 1
    const nextId = items[nextPosition] ? items[nextPosition] : false
    return yield put({ type: ITEMS_BULK_SET_CURRENT, currentId: nextId })
  }

  const prevPosition = currentPosition >= total ? total : currentPosition - 1
  const prevId = items[prevPosition] ? items[prevPosition] : false
  return yield put({ type: ITEMS_BULK_SET_CURRENT, currentId: prevId })
}

function* shortcutEngage({ appMode }) {
  if (appMode === 'bulk') return yield call(bulkEngage)
  // We are using standard element focus for enter actions
}

function* bulkEngage() {
  const bulkId = yield select(getCurrentBulkItemId)
  yield put({ type: ITEMS_BULK_TOGGLE, id: bulkId })
}

function* shortcutViewOriginal() {
  const selectedId = yield select(getCurrentItemId)
  if (!selectedId) return

  const item = yield select(getItem, selectedId)
  if (!item) return

  const { open_url } = item
  if (open_url) yield call(window.open, open_url, '_blank')
}

function* shortcutDeleteItem() {
  const id = yield select(getCurrentItemId)
  const position = yield select(getCurrentPosition)
  if (!id) return

  yield put({ type: ITEMS_DELETE_REQUEST, items: [{ id, position }] })
  const { cancel } = yield race({
    confirm: take(ITEMS_DELETE_CONFIRM),
    cancel: take(ITEMS_DELETE_CANCEL)
  })

  if (!cancel) return yield call(selectItem, true)
}

function* shortcutArchiveItem() {
  const id = yield select(getCurrentItemId)
  const position = yield select(getCurrentPosition)
  if (!id) return

  yield call(selectItem, true)
  yield put({ type: ITEMS_ARCHIVE_REQUEST, items: [{ id, position }] })
}

function* shortcutFavoriteItem() {
  const id = yield select(getCurrentItemId)
  const position = yield select(getCurrentPosition)
  if (!id) return

  yield put({ type: ITEMS_FAVORITE_REQUEST, items: [{ id, position }] })
}

function* shortcutEditTags() {
  const id = yield select(getCurrentItemId)
  const position = yield select(getCurrentPosition)
  if (!id) return

  yield put({ type: ITEMS_TAG_REQUEST, items: [{ id, position }] })
}

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
