import { ITEMS_SUCCESS } from 'actions'

/** ITEM REDUCERS
 --------------------------------------------------------------- */
export const itemsReducers = (state = {}, action) => {
  switch (action.type) {
    case ITEMS_SUCCESS: {
      return { ...state, ...action.itemsById }
    }
    default:
      return state
  }
}
