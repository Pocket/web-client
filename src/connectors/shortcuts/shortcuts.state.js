import { takeLatest, takeEvery, put, call, select } from 'redux-saga/effects'
import { APP_SET_MODE } from 'actions'
import { ITEMS_BULK_SET_CURRENT } from 'actions'
import { ITEMS_BULK_TOGGLE } from 'actions'

import { SHORTCUT_OPEN_HELP_OVERLAY } from 'actions'
import { SHORTCUT_CLOSE_HELP_OVERLAY } from 'actions'
import { SHORTCUT_TOGGLE_HELP_OVERLAY } from 'actions'

import { SHORTCUT_GO_TO_LIST } from 'actions'
import { SHORTCUT_GO_TO_ARCHIVE } from 'actions'
import { SHORTCUT_GO_TO_FAVORITES } from 'actions'
import { SHORTCUT_GO_TO_ARTICLES } from 'actions'
import { SHORTCUT_GO_TO_HIGHLIGHTS } from 'actions'
import { SHORTCUT_GO_TO_VIDEOS } from 'actions'
import { SHORTCUT_GO_TO_TAG } from 'actions'

import { SHORTCUT_SELECT_NEXT_ITEM } from 'actions'
import { SHORTCUT_SELECT_PREVIOUS_ITEM } from 'actions'
import { SHORTCUT_SET_CURRENT_ITEM } from 'actions'

import { SHORTCUT_ARCHIVE_SELECTED_ITEM } from 'actions'
import { SHORTCUT_FAVORITE_SELECTED_ITEM } from 'actions'
import { SHORTCUT_TAG_SELECTED_ITEM } from 'actions'
import { SHORTCUT_DELETE_ITEM } from 'actions'
import { SHORTCUT_VIEW_ORIGINAL_VERSION } from 'actions'
import { SHORTCUT_ENGAGE_SELECTED_ITEM } from 'actions'

import { SHORTCUT_INCREASE_FONT_SIZE } from 'actions'
import { SHORTCUT_DECREASE_FONT_SIZE } from 'actions'

import { SHORTCUT_GO_BACK } from 'actions'

import { SHORTCUT_EDIT_TAGS } from 'actions'
import { SHORTCUT_ARCHIVE_ITEM } from 'actions'
import { SHORTCUT_FAVORITE_ITEM } from 'actions'
import { SHORTCUT_VIEW_ORIGINAL } from 'actions'

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
export const gotToTag = () => ({ type: SHORTCUT_GO_TO_TAG })

export const goToSearch = () => appSetMode('search')
export const bulkEdit = () => appSetMode('bulk')
export const saveAUrl = () => appSetMode('add')

export const selectNextItem = ({appMode}) => ({ type: SHORTCUT_SELECT_NEXT_ITEM, appMode }) //prettier-ignore
export const selectPreviousItem = ({appMode}) => ({ type: SHORTCUT_SELECT_PREVIOUS_ITEM, appMode }) //prettier-ignore
export const engageSelectedItem = ({ router, appMode }) => ({ type: SHORTCUT_ENGAGE_SELECTED_ITEM, router, appMode }) //prettier-ignore

export const archiveSelectedItem = ({currentItem}) => ({ type: SHORTCUT_ARCHIVE_SELECTED_ITEM, currentItem }) //prettier-ignore
export const favoriteSelectedItem = ({currentItem}) => ({ type: SHORTCUT_FAVORITE_SELECTED_ITEM, currentItem }) //prettier-ignore
export const tagSelectedItem = ({currentItem}) => ({ type: SHORTCUT_TAG_SELECTED_ITEM, currentItem }) //prettier-ignore
export const deleteSelectedItem = ({ currentItem }) => ({
  type: SHORTCUT_DELETE_ITEM,
  currentItem
})
export const viewOriginalVersion = ({currentItem}) => ({ type: SHORTCUT_VIEW_ORIGINAL_VERSION, currentItem }) //prettier-ignore
export const increaseFontSize = () => ({ type: SHORTCUT_INCREASE_FONT_SIZE })
export const decreaseFontSize = () => ({ type: SHORTCUT_DECREASE_FONT_SIZE })

export const goBack = () => ({ type: SHORTCUT_GO_BACK })

export const editTags = ({currentItem}) => ({ type: SHORTCUT_EDIT_TAGS, currentItem }) //prettier-ignore
export const archiveItem = ({currentItem}) => ({ type: SHORTCUT_ARCHIVE_ITEM, currentItem }) //prettier-ignore
export const favoriteItem = ({currentItem}) => ({ type: SHORTCUT_FAVORITE_ITEM, currentItem }) //prettier-ignore
export const viewOriginal = ({currentItem}) => ({ type: SHORTCUT_VIEW_ORIGINAL, currentItem }) //prettier-ignore

// prettier-ignore
export const listShortcuts = [
  { action: goToList, copy: 'Go to MyList', keyCopy: 'g then l', keys:  'g l' },
  { action: goToArchive, copy: 'Go to Archive', keyCopy: 'g then a', keys:  'g a' },
  { action: goToFavorites, copy: 'Go to Favorites', keyCopy: 'g then f', keys:  'g f' },
  { action: goToArticles, copy: 'Go to Articles', keyCopy: 'g then r', keys: 'g r' },
  { action: goToHighlights, copy: 'Go to Highlights', keyCopy: 'g then h', keys:  'g h' },
  { action: goToVideos, copy: 'Go to Videos', keyCopy: 'g then v', keys: 'g v' },
  { action: gotToTag, copy: 'Go to a Tag Page', keyCopy: 'g then t', keys:  'g t' },

  { action: goToSearch, copy: 'Go to Search', keyCopy: 'g then s', keys: 'g s' },
  { action: bulkEdit, copy: 'Bulk Edit', keyCopy: 'g then b', keys:  'g b' },
  { action: saveAUrl, copy: 'Save a URL', keyCopy: 'g then u', keys: 'g u' },

  { action: sortOrderSetNew, copy: 'Sort by Newest', keyCopy: 's then n', keys: 's n' },
  { action: sortOrderSetOld, copy: 'Sort by Oldest', keyCopy: 's then o', keys:  's o' },

  { action: setListModeList, copy: 'List View', keyCopy: 'v then l', keys: 'v l' },
  { action: setListModeGrid, copy: 'Grid View', keyCopy: 'v then g', keys: 'v g' },
  { action: setListModeDetail, copy: 'Detail View', keyCopy: 'v then d', keys: 'v d' },

  { action: setColorModeLight, copy: 'Change to Light Theme	', keyCopy: 'c then l', keys:  'c l' },
  { action: setColorModeDark, copy: 'Change to Dark Theme	', keyCopy: 'c then d', keys:  'c d' },
  { action: setColorModeSepia, copy: 'Change to Sepia Theme', keyCopy: 'c then s', keys:  'c s' },

  // Everything above this line works.  Everything below this line is a work in progress
  { action: selectNextItem, copy: 'Select Next Item', keyCopy: 'j', keys: 'j' },
  { action: selectPreviousItem, copy: 'Select Previous Item', keyCopy: 'k', keys: 'k' },
  { action: deleteSelectedItem, copy: 'Delete Selected Item', keyCopy: 'd', keys:  'd' },
  { action: archiveSelectedItem, copy: 'Archive Selected Item', keyCopy: 'a', keys:  'a' },
  { action: favoriteSelectedItem, copy: 'Favorite Selected Item', keyCopy: 'f', keys:  'f' },
  { action: tagSelectedItem, copy: 'Tag Selected Item', keyCopy: 't', keys:  't' },
  { action: viewOriginalVersion, copy: 'View Original Version of Selected Item', keyCopy: 'o', keys:  'o' },
  { action: engageSelectedItem, copy: 'Open/Bulk Add Selected Item', keyCopy: 'enter', keys:  ['enter'] },
  { action: toggleHelpOverlay, copy: 'Open Help Overlay', keyCopy: '? or /', keys:  ['?', '/'] }
]

// prettier-ignore
export const readerShortcuts = [
  {action: increaseFontSize, copy: 'Increase Font Size', keyCopy: 'Command/Control with +', keys: ['ctrl++', 'command++'] },
  {action: decreaseFontSize, copy: 'Decrease Font Size', keyCopy: 'Command/Control with -', keys: ['ctrl+-', 'command+-']},
  {action: goBack, copy: 'Go Back', keyCopy: 'b', keys: 'b'},
]

const initialState = {
  displayLegend: false,
  currentId: false
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
      const { currentId } = action
      return { ...state, currentId }
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
  takeEvery(SHORTCUT_SELECT_NEXT_ITEM, shortcutNextItem),
  takeEvery(SHORTCUT_SELECT_PREVIOUS_ITEM, shortcutPreviousItem),
  takeEvery(SHORTCUT_ENGAGE_SELECTED_ITEM, shortcutEngage),
  takeLatest(APP_SET_MODE, appModeSwitch)
]

/* SAGAS :: SELECTORS
–––––––––––––––––––––––––––––––––––––––––––––––––– */
const getCurrentItemId = (state) => state.shortcuts.currentId
const getCurrentBulkItemId = (state) => state.bulkEdit.currentId
const getSection = (state) => state.app.section
const getItems = (state, section) => state.myList[section]

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
    return yield put({ type: SHORTCUT_SET_CURRENT_ITEM, currentId: nextId })
  }

  const prevPosition = currentPosition >= total ? total : currentPosition - 1
  const prevId = items[prevPosition] ? items[prevPosition] : false
  return yield put({ type: SHORTCUT_SET_CURRENT_ITEM, currentId: prevId })
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

function* shortcutEngage({ appMode, router }) {
  if (appMode === 'bulk') return yield call(bulkEngage)

  // const selectedtId = yield select(getCurrentItemId)
  // yield console.log('mode:', selectedtId)
}

function* bulkEngage() {
  const bulkId = yield select(getCurrentBulkItemId)
  yield put({ type: ITEMS_BULK_TOGGLE, id: bulkId })
}
