import { ITEMS_SUCCESS } from 'actions'
import { READ_ITEM_SUCCESS } from 'actions'
import { ITEMS_SET_NO_IMAGE } from 'actions'

/** ACTIONS
 --------------------------------------------------------------- */
 export const setNoImage = (id) => ({ type: ITEMS_SET_NO_IMAGE, id })

/** ITEM REDUCERS
 --------------------------------------------------------------- */
export const itemsDisplayReducers = (state = {}, action) => {
  switch (action.type) {
    case READ_ITEM_SUCCESS:
    case ITEMS_SUCCESS: {
      return { ...state, ...action.itemsById }
    }

    case ITEMS_SET_NO_IMAGE: {
      const { id } = action
      const item = state[id]
      const itemDraft = { ...item, noImage: true }
      return { ...state, [id]: itemDraft }
    }

    default:
      return state
  }
}
