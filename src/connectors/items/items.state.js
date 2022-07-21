import { ITEMS_SUCCESS } from 'actions'
import { READ_ITEM_SUCCESS } from 'actions'

/** ITEM REDUCERS
 --------------------------------------------------------------- */
export const itemsReducers = (state = {}, action) => {
  switch (action.type) {
    case READ_ITEM_SUCCESS:
    case ITEMS_SUCCESS: {
      return { ...state, ...action.itemsById }
    }
    default:
      return state
  }
}
