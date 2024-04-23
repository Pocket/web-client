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
        const { itemId, readerSlug } = current
        if (!itemId || !readerSlug) return previous
        return { ...previous, [readerSlug]: itemId }
      }, {})
      return { ...state, ...stateUpdates }
    }

    default:
      return state
  }
}
