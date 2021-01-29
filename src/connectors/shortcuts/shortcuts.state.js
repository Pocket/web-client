import { takeLatest, call } from 'redux-saga/effects'

import { SHORTCUT_OPEN_HELP_OVERLAY } from 'actions'
import { SHORTCUT_CLOSE_HELP_OVERLAY } from 'actions'
import { SHORTCUT_TOGGLE_HELP_OVERLAY } from 'actions'

import { SHORTCUT_GO_TO_LIST } from 'actions'
import { SHORTCUT_GO_TO_ARCHIVE } from 'actions'
import { SHORTCUT_GO_TO_FAVORITES } from 'actions'
import { SHORTCUT_GO_TO_ARTICLES } from 'actions'
import { SHORTCUT_GO_TO_HIGHLIGHTS } from 'actions'
import { SHORTCUT_GO_TO_VIDEOS } from 'actions'

import { SHORTCUT_GO_TO_SEARCH } from 'actions'
import { SHORTCUT_BULK_EDIT } from 'actions'
import { SHORTCUT_SAVE_A_URL } from 'actions'

import { SHORTCUT_LIGHT_THEME } from 'actions'
import { SHORTCUT_DARK_THEME } from 'actions'
import { SHORTCUT_SEPIA_THEME } from 'actions'

import { SHORTCUT_SELECT_NEXT_ITEM } from 'actions'
import { SHORTCUT_SELECT_PREVIOUS_ITEM } from 'actions'

import { SHORTCUT_ARCHIVE_SELECTED_ITEM } from 'actions'
import { SHORTCUT_FAVORITE_SELECTED_ITEM } from 'actions'
import { SHORTCUT_TAG_SELECTED_ITEM } from 'actions'
import { SHORTCUT_VIEW_ORIGINAL_VERSION } from 'actions'
import { SHORTCUT_OPEN_SELECTED_ITEM } from 'actions'

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

export const openHelpOverlay = () => ({ type: SHORTCUT_OPEN_HELP_OVERLAY })
export const closeHelpOverlay = () => ({ type: SHORTCUT_CLOSE_HELP_OVERLAY })
export const toggleHelpOverlay = () => ({ type: SHORTCUT_TOGGLE_HELP_OVERLAY })

export const goToList = ({router}) => ({ type: SHORTCUT_GO_TO_LIST, router}) //prettier-ignore
export const goToArchive = ({router}) => ({ type: SHORTCUT_GO_TO_ARCHIVE, router}) //prettier-ignore
export const goToFavorites = ({router}) => ({ type: SHORTCUT_GO_TO_FAVORITES, router}) //prettier-ignore
export const goToArticles = ({router}) => ({ type: SHORTCUT_GO_TO_ARTICLES, router}) //prettier-ignore
export const goToHighlights = ({router}) => ({ type: SHORTCUT_GO_TO_HIGHLIGHTS, router}) //prettier-ignore
export const goToVideos = ({router}) => ({ type: SHORTCUT_GO_TO_VIDEOS, router}) //prettier-ignore

export const goToSearch = () => appSetMode('search')
export const bulkEdit = () => appSetMode('bulk')
export const saveAUrl = () => appSetMode('add')

export const changeToLightTheme = () => ({ type: SHORTCUT_LIGHT_THEME })
export const changeToDarkTheme = () => ({ type: SHORTCUT_DARK_THEME })
export const changeToSepiaTheme = () => ({ type: SHORTCUT_SEPIA_THEME })

export const selectNextItem = ({currentItem}) => ({ type: SHORTCUT_SELECT_NEXT_ITEM, currentItem }) //prettier-ignore
export const selectPreviousItem = ({currentItem}) => ({ type: SHORTCUT_SELECT_PREVIOUS_ITEM, currentItem }) //prettier-ignore
export const archiveSelectedItem = ({currentItem}) => ({ type: SHORTCUT_ARCHIVE_SELECTED_ITEM, currentItem }) //prettier-ignore
export const favoriteSelectedItem = ({currentItem}) => ({ type: SHORTCUT_FAVORITE_SELECTED_ITEM, currentItem }) //prettier-ignore
export const tagSelectedItem = ({currentItem}) => ({ type: SHORTCUT_TAG_SELECTED_ITEM, currentItem }) //prettier-ignore
export const viewOriginalVersion = ({currentItem}) => ({ type: SHORTCUT_VIEW_ORIGINAL_VERSION, currentItem }) //prettier-ignore
export const openSelectedItem = ({currentItem}) => ({ type: SHORTCUT_OPEN_SELECTED_ITEM, currentItem }) //prettier-ignore

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
  { action: goToVideos, copy: 'Go to Videos', keyCopy: 'g then v', keys:  'g v' },

  { action: goToSearch, copy: 'Go to Search', keyCopy: 'g then s', keys: 'g s' },
  { action: bulkEdit, copy: 'Bulk Edit', keyCopy: 'g then b', keys:  'g b' },
  { action: saveAUrl, copy: 'Save a URL', keyCopy: 'g then u', keys: 'g u' },

  { action: sortOrderSetNew, copy: 'Sort by Newest', keyCopy: 's then n', keys: 's n' },
  { action: sortOrderSetOld, copy: 'Sort by Oldest', keyCopy: 's then o', keys:  's o' },

  { action: setListModeList, copy: 'List View', keyCopy: 'v then l', keys: 'v l' },
  { action: setListModeGrid, copy: 'Grid View', keyCopy: 'v then g', keys: 'v g' },
  { action: setListModeDetail, copy: 'Detail View', keyCopy: 'v then d', keys: 'v d' },

  { action: changeToLightTheme, copy: 'Change to Light Theme	', keyCopy: 't then l', keys:  't l' },
  { action: changeToDarkTheme, copy: 'Change to Dark Theme	', keyCopy: 't then d', keys:  't d' },
  { action: changeToSepiaTheme, copy: 'Change to Sepia Theme', keyCopy: 't then s', keys:  't s' },

  { action: selectNextItem, copy: 'Select Next Item', keyCopy: 'j', keys: 'j' },
  { action: selectPreviousItem, copy: 'Select Previous Item', keyCopy: 'k', keys:  'k' },
  { action: archiveSelectedItem, copy: 'Archive Selected Item', keyCopy: 'a', keys:  'a' },
  { action: favoriteSelectedItem, copy: 'Favorite Selected Item', keyCopy: 'f', keys:  'f' },
  { action: tagSelectedItem, copy: 'Tag Selected Item', keyCopy: 't', keys:  't' },
  { action: viewOriginalVersion, copy: 'View Original Version of Selected Item', keyCopy: 'o', keys:  'o' },
  { action: openSelectedItem, copy: 'Open Selected Item', keyCopy: 'enter or return', keys:  ['enter', 'return'] },
  { action: toggleHelpOverlay, copy: 'Open Help Overlay', keyCopy: '? or /', keys:  ['?', '/'] }
]

// prettier-ignore
export const readerShortcuts = [
  {action: increaseFontSize, copy: 'Increase Font Size', keyCopy: 'Command/Control with +', keys: ['ctrl++', 'command++'] },
  {action: decreaseFontSize, copy: 'Decrease Font Size', keyCopy: 'Command/Control with -', keys: ['ctrl+-', 'meta+-']},
  {action: goBack, copy: 'Go Back', keyCopy: 'b', keys: ''},
]

const initialState = {
  display_legend: false,
  current_id: false
}

/** REDUCERS
 --------------------------------------------------------------- */
export const shortcutReducers = (state = initialState, action) => {
  switch (action.type) {
    case SHORTCUT_TOGGLE_HELP_OVERLAY: {
      const isDisplayed = state.display_legend
      return { ...state, display_legend: !isDisplayed }
    }

    case SHORTCUT_OPEN_HELP_OVERLAY: {
      return { ...state, display_legend: true }
    }

    case SHORTCUT_CLOSE_HELP_OVERLAY: {
      return { ...state, display_legend: false }
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
  takeLatest(SHORTCUT_GO_TO_VIDEOS, shortcutGoToVideos)
]

/** SAGA :: RESPONDERS

--------------------------------------------------------------- */
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
