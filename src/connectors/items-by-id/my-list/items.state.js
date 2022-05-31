import { arrayToObject } from 'common/utilities/object-array/object-array'
import { MYLIST_DATA_SUCCESS } from 'actions'
import { MYLIST_UPDATE_SUCCESS } from 'actions'
import { ARTICLE_ITEM_SUCCESS } from 'actions'
import { USER_TAGS_ITEM_SUCCESS } from 'actions'

import { ITEMS_FAVORITE_SUCCESS } from 'actions'
import { ITEMS_UNFAVORITE_SUCCESS } from 'actions'
import { MYLIST_SEARCH_SUCCESS } from 'actions'
import { ITEMS_DELETE_SUCCESS } from 'actions'
import { ITEMS_ARCHIVE_SUCCESS } from 'actions'
import { ITEMS_UNARCHIVE_SUCCESS } from 'actions'
import { ITEMS_TAG_SUCCESS } from 'actions'
import { MYLIST_ITEMS_NO_IMAGE } from 'actions'
import { HOME_RECENT_SAVES_SUCCESS } from 'actions'
import { HOME_SAVE_SUCCESS } from 'actions'
import { SIMILAR_REC_SAVE_SUCCESS } from 'actions'
/* CONSOLIDATE
–––––––––––––––––––––––––––––––––––––––––––––––––– */
import { itemTagSagas } from './items.tag'
import { itemBulkSagas } from './items.bulk'
import { itemAddSagas } from './items.add'
import { itemDeleteSagas } from './items.delete'
import { itemFavoriteSagas } from './items.favorite'
import { itemArchiveSagas } from './items.archive'

/** ACTIONS
 --------------------------------------------------------------- */
export { itemAddAction } from './items.add'
export const setNoImage = (id) => ({ type: MYLIST_ITEMS_NO_IMAGE, id })

/** REDUCERS
 --------------------------------------------------------------- */
const initialState = {}

export const myListItemsReducers = (state = initialState, action) => {
  switch (action.type) {
    // This comes from the raw item /get calls
    case MYLIST_DATA_SUCCESS:
    case ARTICLE_ITEM_SUCCESS:
    case HOME_RECENT_SAVES_SUCCESS:
    case HOME_SAVE_SUCCESS:
    case SIMILAR_REC_SAVE_SUCCESS:
    case USER_TAGS_ITEM_SUCCESS:
    case MYLIST_SEARCH_SUCCESS: {
      const { itemsById } = action
      return { ...state, ...itemsById }
    }

    case ITEMS_FAVORITE_SUCCESS:
    case ITEMS_UNFAVORITE_SUCCESS:
    case ITEMS_ARCHIVE_SUCCESS:
    case ITEMS_UNARCHIVE_SUCCESS:
    case ITEMS_TAG_SUCCESS: {
      const { actions } = action
      const itemsById = reconcileActions(state, actions)
      return { ...state, ...itemsById }
    }

    case ITEMS_DELETE_SUCCESS: {
      const { actions } = action
      const itemsById = reconcileActions(state, actions)
      return itemsById
    }

    case MYLIST_ITEMS_NO_IMAGE: {
      const { id } = action
      const item = state[id]
      const itemDraft = { ...item, noImage: true }
      return { ...state, [id]: itemDraft }
    }

    case MYLIST_UPDATE_SUCCESS: {
      const { itemsById } = action
      return itemsById
    }

    default:
      return state
  }
}

/** SAGAS :: WATCHERS
 --------------------------------------------------------------- */
export const myListItemsSagas = [
  ...itemAddSagas,
  ...itemDeleteSagas,
  ...itemArchiveSagas,
  ...itemFavoriteSagas,
  ...itemTagSagas,
  ...itemBulkSagas
]

/** SAGA :: RESPONDERS
 --------------------------------------------------------------- */

const reconcileActions = function (state, actions) {
  const stateDraft = JSON.parse(JSON.stringify(state))

  actions.forEach(({ action, item_id, tags }) => {
    if (action === 'favorite') stateDraft[item_id].isFavorite = true
    if (action === 'unfavorite') stateDraft[item_id].isFavorite = false
    if (action === 'archive') stateDraft[item_id].isArchived = true
    if (action === 'unarchive') stateDraft[item_id].isArchived = false
    if (action === 'tags_replace') {
      stateDraft[item_id].tags = getTagsArray(tags)
    }
    if (action === 'tags_add') {
      const current = stateDraft[item_id].tags || []
      stateDraft[item_id].tags = [...current, ...getTagsArray(tags)]
    }

    if (action === 'delete') delete stateDraft[item_id]
  })

  return stateDraft
}

const getTagsArray = function (tags) {
  const tagsArray = tags.map((tag) => ({ name: tag }))
  return tagsArray
}
