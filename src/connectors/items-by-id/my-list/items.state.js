import { MYLIST_DATA_SUCCESS } from 'actions'
import { MYLIST_UPDATE_SUCCESS } from 'actions'
import { HOME_DATA_LATEST_SUCCESS } from 'actions'
import { ARTICLE_ITEM_SUCCESS } from 'actions'
import { USER_TAGS_ITEM_SUCCESS } from 'actions'

import { ITEMS_FAVORITE_SUCCESS } from 'actions'
import { ITEMS_UNFAVORITE_SUCCESS } from 'actions'
import { ITEMS_ADD_SUCCESS } from 'actions'
import { ITEMS_DELETE_SUCCESS } from 'actions'
import { ITEMS_ARCHIVE_SUCCESS } from 'actions'
import { ITEMS_UNARCHIVE_SUCCESS } from 'actions'

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

/** REDUCERS
 --------------------------------------------------------------- */
const initialState = {}

export const myListItemsReducers = (state = initialState, action) => {
  switch (action.type) {
    // This comes from the raw item /get calls
    case MYLIST_DATA_SUCCESS:
    case ARTICLE_ITEM_SUCCESS:
    case HOME_DATA_LATEST_SUCCESS:
    case USER_TAGS_ITEM_SUCCESS: {
      const { itemsById } = action
      return { ...state, ...itemsById }
    }

    case ITEMS_FAVORITE_SUCCESS:
    case ITEMS_UNFAVORITE_SUCCESS:
    case ITEMS_ARCHIVE_SUCCESS:
    case ITEMS_DELETE_SUCCESS:
    case ITEMS_UNARCHIVE_SUCCESS: {
      const { actions } = action
      const itemsById = reconcileActions(state, actions)
      return { ...state, ...itemsById }
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

  actions.forEach(({ action, item_id }) => {
    if (action === 'favorite') stateDraft[item_id].favorite = '1'
    if (action === 'unfavorite') stateDraft[item_id].favorite = '0'
    if (action === 'archive') stateDraft[item_id].status = '1'
    if (action === 'unarchive') stateDraft[item_id].status = '0'
  })

  return stateDraft
}
