import { MYLIST_DATA_SUCCESS } from 'actions'
import { MYLIST_UPDATE_SUCCESS } from 'actions'
import { HOME_DATA_LATEST_SUCCESS } from 'actions'
import { ARTICLE_ITEM_SUCCESS } from 'actions'

/* CONSOLIDATE
–––––––––––––––––––––––––––––––––––––––––––––––––– */
import { itemTagSagas } from './items.tag'
import { itemBulkSagas } from './items.bulk'
import { itemAddSagas } from './items.add'
import { itemDeleteSagas } from './items.delete'
import { itemFavoriteSagas } from './items.favorite'
import { itemArchiveSagas } from './items.archive'
import { itemShareSagas } from './items.share'

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
    case HOME_DATA_LATEST_SUCCESS: {
      const { itemsById } = action
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
  ...itemShareSagas,
  ...itemBulkSagas
]

/** SAGA :: RESPONDERS
 --------------------------------------------------------------- */
