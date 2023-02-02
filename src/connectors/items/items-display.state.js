import { ITEMS_SUCCESS } from 'actions'
import { READ_ITEM_SUCCESS } from 'actions'
import { ITEMS_SET_NO_IMAGE } from 'actions'
import { HYDRATE } from 'actions'

/** ACTIONS
 --------------------------------------------------------------- */
export const setNoImage = (id) => ({ type: ITEMS_SET_NO_IMAGE, id })
export const hydrateItems = (itemsById) => ({ type: ITEMS_SUCCESS, itemsById })

/** ITEM REDUCERS
 --------------------------------------------------------------- */
export const itemsDisplayReducers = (state = {}, action) => {
  switch (action.type) {
    case READ_ITEM_SUCCESS:
    case ITEMS_SUCCESS: {
      const { itemsById } = action
      return { ...state, ...itemsById }
    }

    case ITEMS_SET_NO_IMAGE: {
      const { id } = action
      const item = state[id]
      const itemDraft = { ...item, noImage: true }
      return { ...state, [id]: itemDraft }
    }

    // SPECIAL HYDRATE:  This is sent from the next-redux wrapper and
    // it represents the state used to build the page on the server.
    case HYDRATE: {
      const { itemsDisplay } = action.payload
      return itemsDisplay
    }

    default:
      return state
  }
}
