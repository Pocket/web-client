import { TOAST_CLEAR } from 'actions'

import { MUTATION_SUCCESS } from 'actions'
import { MUTATION_TAG_SUCCESS } from 'actions'
import { MUTATION_DELETE_SUCCESS } from 'actions'

import { ITEMS_DELETE_SUCCESS } from 'actions'
import { ITEMS_DELETE_FAILURE } from 'actions'

import { ITEMS_ADD_SUCCESS } from 'actions'

import { ITEMS_ARCHIVE_SUCCESS } from 'actions'
import { ITEMS_ARCHIVE_FAILURE } from 'actions'

import { ITEMS_UNARCHIVE_SUCCESS } from 'actions'
import { ITEMS_UNARCHIVE_FAILURE } from 'actions'

import { ITEMS_FAVORITE_SUCCESS } from 'actions'
import { ITEMS_FAVORITE_FAILURE } from 'actions'

import { ITEMS_UNFAVORITE_SUCCESS } from 'actions'
import { ITEMS_UNFAVORITE_FAILURE } from 'actions'

import { COLLECTIONS_SAVE_SUCCESS } from 'actions'
import { COLLECTION_PAGE_SAVE_SUCCESS } from 'actions'
import { DISCOVER_ITEMS_SAVE_SUCCESS } from 'actions'
import { ARTICLE_SAVE_SUCCESS } from 'actions'

import { ITEMS_SHARE_SUCCESS } from 'actions'
import { ITEMS_SHARE_FAILURE } from 'actions'
import { SHARE_RECOMMEND_SUCCESS } from 'actions'
import { SHARE_RECOMMEND_FAILURE } from 'actions'

import { COPY_ITEM_URL } from 'actions'

import { ITEMS_TAG_SUCCESS } from 'actions'
import { ITEMS_TAG_FAILURE } from 'actions'

import { ADD_SHARE_SUCCESS } from 'actions'
import { ADD_SHARE_FAILURE } from 'actions'

import { PROFILE_ITEM_SAVE_SUCCESS } from 'actions'
import { PROFILE_ITEM_SAVE_FAILURE } from 'actions'

import { PROFILE_ITEM_DELETE_SUCCESS } from 'actions'
import { PROFILE_ITEM_DELETE_FAILURE } from 'actions'

/** ACTIONS
 --------------------------------------------------------------- */
export const clearToast = (stamp) => ({ type: TOAST_CLEAR, stamp })

/** REDUCERS
 --------------------------------------------------------------- */
const initialState = []

export const actionToastsReducers = (state = initialState, action) => {
  switch (action.type) {
    case TOAST_CLEAR: {
      const { stamp } = action
      return state.filter((item) => item.stamp !== stamp)
    }

    case MUTATION_DELETE_SUCCESS: {
      const { ids, deletedItemPosition, previousStatus } = action
      const itemCount = ids.length
      const stamp = Date.now()
      return [
        ...state,
        { stamp, type: action.type, ids, itemCount, deletedItemPosition, previousStatus }
      ]
    }

    case ITEMS_DELETE_SUCCESS:
    case ITEMS_DELETE_FAILURE:
    case ITEMS_ADD_SUCCESS:
    case ITEMS_ARCHIVE_SUCCESS:
    case ITEMS_ARCHIVE_FAILURE:
    case ITEMS_UNARCHIVE_SUCCESS:
    case ITEMS_UNARCHIVE_FAILURE:
    case ITEMS_FAVORITE_SUCCESS:
    case ITEMS_FAVORITE_FAILURE:
    case ITEMS_UNFAVORITE_SUCCESS:
    case ITEMS_UNFAVORITE_FAILURE:
    case ITEMS_SHARE_SUCCESS:
    case ITEMS_SHARE_FAILURE:
    case SHARE_RECOMMEND_SUCCESS:
    case SHARE_RECOMMEND_FAILURE:
    case ITEMS_TAG_SUCCESS:
    case ITEMS_TAG_FAILURE:
    case ADD_SHARE_SUCCESS:
    case ADD_SHARE_FAILURE:
    case PROFILE_ITEM_SAVE_SUCCESS:
    case PROFILE_ITEM_SAVE_FAILURE:
    case PROFILE_ITEM_DELETE_SUCCESS:
    case PROFILE_ITEM_DELETE_FAILURE:
    case COLLECTIONS_SAVE_SUCCESS:
    case COLLECTION_PAGE_SAVE_SUCCESS:
    case DISCOVER_ITEMS_SAVE_SUCCESS:
    case ARTICLE_SAVE_SUCCESS:
    case MUTATION_SUCCESS:
    case COPY_ITEM_URL: {
      const { actions, count, actionType = false } = action
      const itemCount = actions ? actions?.length : count
      const stamp = Date.now()
      return [...state, { stamp, type: action.type, actionType, itemCount }]
    }

    default:
      return state
  }
}
