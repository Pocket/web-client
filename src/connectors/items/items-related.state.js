import { READ_ITEM_SUCCESS } from 'actions'

/** ITEM REDUCERS
 --------------------------------------------------------------- */
//!! Note: This is all a stop gap until we can get proper item associations from the server for corpus items

export const itemsRelatedReducers = (state = {}, action) => {
  switch (action.type) {
    case READ_ITEM_SUCCESS: {
      const { relatedItems } = action
      return { ...state, ...relatedItems }
    }

    default:
      return state
  }
}
