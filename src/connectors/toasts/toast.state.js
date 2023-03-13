import { TOAST_CLEAR } from 'actions'
import { TOAST_CLEAR_ALL } from 'actions'

import { MUTATION_SUCCESS } from 'actions'
import { MUTATION_DELETE_SUCCESS } from 'actions'

import { ITEMS_UPSERT_SUCCESS } from 'actions'

import { ITEMS_ADD_SUCCESS } from 'actions'

import { COLLECTIONS_SAVE_SUCCESS } from 'actions'
import { COLLECTION_PAGE_SAVE_SUCCESS } from 'actions'
import { DISCOVER_ITEMS_SAVE_SUCCESS } from 'actions'
import { ARTICLE_SAVE_SUCCESS } from 'actions'

import { SHARE_RECOMMEND_SUCCESS } from 'actions'
import { SHARE_RECOMMEND_FAILURE } from 'actions'

import { COPY_ITEM_URL } from 'actions'

import { ITEMS_TAG_SUCCESS } from 'actions'
import { ITEMS_TAG_FAILURE } from 'actions'

import { ADD_SHARE_SUCCESS } from 'actions'
import { ADD_SHARE_FAILURE } from 'actions'

import { LIST_CREATE_SUCCESS } from 'actions'
import { LIST_CREATE_FAILURE } from 'actions'
import { LIST_ADD_ITEM_SUCCESS } from 'actions'
import { LIST_ADD_ITEM_FAILURE } from 'actions'
import { LIST_DELETE_ITEM_SUCCESS } from 'actions'
import { LIST_DELETE_ITEM_FAILURE } from 'actions'
import { LIST_UPDATE_SUCCESS } from 'actions'
import { LIST_UPDATE_FAILURE } from 'actions'
import { LIST_DELETE_SUCCESS } from 'actions'
import { LIST_DELETE_FAILURE } from 'actions'


/** ACTIONS
 --------------------------------------------------------------- */
export const clearToast = (stamp) => ({ type: TOAST_CLEAR, stamp })
export const clearAllToasts = () => ({ type: TOAST_CLEAR_ALL })

/** REDUCERS
 --------------------------------------------------------------- */
const initialState = []

export const actionToastsReducers = (state = initialState, action) => {
  switch (action.type) {
    case TOAST_CLEAR: {
      const { stamp } = action
      return state.filter((item) => item.stamp !== stamp)
    }

    case TOAST_CLEAR_ALL: {
      return []
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

    case ITEMS_ADD_SUCCESS:
    case SHARE_RECOMMEND_SUCCESS:
    case SHARE_RECOMMEND_FAILURE:
    case ITEMS_TAG_SUCCESS:
    case ITEMS_TAG_FAILURE:
    case ADD_SHARE_SUCCESS:
    case ADD_SHARE_FAILURE:
    case COLLECTIONS_SAVE_SUCCESS:
    case COLLECTION_PAGE_SAVE_SUCCESS:
    case DISCOVER_ITEMS_SAVE_SUCCESS:
    case ARTICLE_SAVE_SUCCESS:
    case MUTATION_SUCCESS:
    case ITEMS_UPSERT_SUCCESS:
    case LIST_CREATE_SUCCESS:
    case LIST_CREATE_FAILURE:
    case LIST_ADD_ITEM_SUCCESS:
    case LIST_ADD_ITEM_FAILURE:
    case LIST_DELETE_ITEM_SUCCESS:
    case LIST_DELETE_ITEM_FAILURE:
    case LIST_UPDATE_SUCCESS:
    case LIST_UPDATE_FAILURE:
    case LIST_DELETE_SUCCESS:
    case LIST_DELETE_FAILURE:
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
