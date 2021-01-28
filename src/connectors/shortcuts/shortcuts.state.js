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
import { SHORTCUT_SORT_BY_NEWEST } from 'actions'
import { SHORTCUT_SORT_BY_OLDEST } from 'actions'
import { SHORTCUT_LIST_VIEW } from 'actions'
import { SHORTCUT_CARD_VIEW } from 'actions'
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
export const openHelpOverlay = () => ({ type: SHORTCUT_OPEN_HELP_OVERLAY })
export const closeHelpOverlay = () => ({ type: SHORTCUT_CLOSE_HELP_OVERLAY })
export const toggleHelpOverlay = () => ({ type: SHORTCUT_TOGGLE_HELP_OVERLAY })

export const goToList = () => ({ type: SHORTCUT_GO_TO_LIST })
export const goToArchive = () => ({ type: SHORTCUT_GO_TO_ARCHIVE })
export const goToFavorites = () => ({ type: SHORTCUT_GO_TO_FAVORITES })
export const goToArticles = () => ({ type: SHORTCUT_GO_TO_ARTICLES })
export const goToHighlights = () => ({ type: SHORTCUT_GO_TO_HIGHLIGHTS })
export const goToVideos = () => ({ type: SHORTCUT_GO_TO_VIDEOS })
export const goToSearch = () => ({ type: SHORTCUT_GO_TO_SEARCH })
export const bulkEdit = () => ({ type: SHORTCUT_BULK_EDIT })
export const saveAUrl = () => ({ type: SHORTCUT_SAVE_A_URL })
export const sortByNewest = () => ({ type: SHORTCUT_SORT_BY_NEWEST })
export const sortByOldest = () => ({ type: SHORTCUT_SORT_BY_OLDEST })
export const listView = () => ({ type: SHORTCUT_LIST_VIEW })
export const cardView = () => ({ type: SHORTCUT_CARD_VIEW })
export const changeToLightTheme = () => ({ type: SHORTCUT_LIGHT_THEME })
export const changeToDarkTheme = () => ({ type: SHORTCUT_DARK_THEME })
export const changeToSepiaTheme = () => ({ type: SHORTCUT_SEPIA_THEME })
export const selectNextItem = () => ({ type: SHORTCUT_SELECT_NEXT_ITEM })
export const selectPreviousItem = () => ({ type: SHORTCUT_SELECT_PREVIOUS_ITEM }) //prettier-ignore
export const archiveSelectedItem = () => ({ type: SHORTCUT_ARCHIVE_SELECTED_ITEM }) //prettier-ignore
export const favoriteSelectedItem = () => ({ type: SHORTCUT_FAVORITE_SELECTED_ITEM }) //prettier-ignore
export const tagSelectedItem = () => ({ type: SHORTCUT_TAG_SELECTED_ITEM })
export const viewOriginalVersion = () => ({ type: SHORTCUT_VIEW_ORIGINAL_VERSION }) //prettier-ignore
export const openSelectedItem = () => ({ type: SHORTCUT_OPEN_SELECTED_ITEM })

export const increaseFontSize = () => ({ type: SHORTCUT_INCREASE_FONT_SIZE })
export const decreaseFontSize = () => ({ type: SHORTCUT_DECREASE_FONT_SIZE })
export const goBack = () => ({ type: SHORTCUT_GO_BACK })
export const editTags = () => ({ type: SHORTCUT_EDIT_TAGS })
export const archiveItem = () => ({ type: SHORTCUT_ARCHIVE_ITEM })
export const favoriteItem = () => ({ type: SHORTCUT_FAVORITE_ITEM })
export const viewOriginal = () => ({ type: SHORTCUT_VIEW_ORIGINAL })

// prettier-ignore
export const listShortcuts = [
  { action: goToList, copy: 'Go to MyList', keyCopy: 'g then l', keys:  'g l' },
  { action: goToArchive, copy: 'Go to Archive', keyCopy: 'g then a', keys:  'g a' },
  { action: goToFavorites, copy: 'Go to Favorites', keyCopy: 'g then f', keys:  'g f' },
  { action: goToArticles, copy: 'Go to Articles', keyCopy: 'g then r', keys: 'g r' },
  { action: goToHighlights, copy: 'Go to Highlights', keyCopy: 'g then h', keys:  'g r' },
  { action: goToVideos, copy: 'Go to Videos', keyCopy: 'g then v', keys:  'g v' },
  { action: goToSearch, copy: 'Go to Search', keyCopy: 'g then s', keys:  'g s' },
  { action: bulkEdit, copy: 'Bulk Edit', keyCopy: 'g then b', keys:  'g b' },
  { action: saveAUrl, copy: 'Save a URL', keyCopy: 'g then u', keys:  'g u' },
  { action: sortByNewest, copy: 'Sort by Newest', keyCopy: 's then n', keys:  's n' },
  { action: sortByOldest, copy: 'Sort by Oldest', keyCopy: 's then o', keys:  's o' },
  { action: listView, copy: 'List View', keyCopy: 'v then l', keys:  'v l' },
  { action: cardView, copy: 'Card View', keyCopy: 'v then c', keys:  'v c' },
  { action: changeToLightTheme, copy: 'Change to Light Theme	', keyCopy: 'v then w', keys:  'v w' },
  { action: changeToDarkTheme, copy: 'Change to Dark Theme	', keyCopy: 'v then d', keys:  'v d' },
  { action: changeToSepiaTheme, copy: 'Change to Sepia Theme', keyCopy: 'v then s', keys:  'v s' },
  { action: selectNextItem, copy: 'Select Next Item', keyCopy: 'j', keys:  'j' },
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
  display_legend: false
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
export const shortcutSagas = []

/** SAGA :: RESPONDERS
 --------------------------------------------------------------- */
