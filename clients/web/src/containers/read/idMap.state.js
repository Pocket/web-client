import { READ_ITEM_SUCCESS } from 'actions'
import { ITEMS_SUCCESS } from 'actions'

/** REDUCERS
 --------------------------------------------------------------- */
const initialState = {}

export const idMapReducers = (state = initialState, action) => {
  switch (action.type) {
    case READ_ITEM_SUCCESS: {
      const { idKey, slug } = action
      return { ...state, [slug]: idKey }
    }

    case ITEMS_SUCCESS: {
      const { itemsById = {} } = action
      const stateUpdates = Object.values(itemsById).reduce((previous, current) => {
        const { itemId, uuidSlug } = current
        if (!itemId || !uuidSlug) return previous
        return { ...previous, [uuidSlug]: itemId }
      }, {})
      return { ...state, ...stateUpdates }
    }

    default:
      return state
  }
}
