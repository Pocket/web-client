import { SHARED_ITEM_SUCCESS } from 'actions'
import { SHARED_ITEM_DISMISS } from 'actions'

/** ACTIONS
 --------------------------------------------------------------- */
export const dismissShare = () => ({ type: SHARED_ITEM_DISMISS })

/** REDUCERS
 --------------------------------------------------------------- */
const initialState = false

export const sharedItemReducers = (state = initialState, action) => {
  switch (action.type) {
    case SHARED_ITEM_SUCCESS: {
      const { shareItem } = action
      return shareItem
    }

    case SHARED_ITEM_DISMISS: {
      return false
    }

    default:
      return state
  }
}
