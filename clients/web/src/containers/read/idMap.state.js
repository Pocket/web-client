import { READ_ITEM_SUCCESS } from 'actions'
import { READ_META_SUCCESS } from 'actions'
import { ITEMS_SUCCESS } from 'actions'

import { HYDRATE } from 'actions'

/** ACTIONS
 --------------------------------------------------------------- */
export const hydrateIdMap = (idKey, slug) => ({ type: READ_META_SUCCESS, idKey, slug })

/** REDUCERS
 --------------------------------------------------------------- */
const initialState = {}

export const idMapReducers = (state = initialState, action) => {
  switch (action.type) {
    case READ_META_SUCCESS:
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

    // SPECIAL HYDRATE:  This is sent from the next-redux wrapper and
    // it represents the state used to build the page on the server.
    case HYDRATE: {
      const { idMap } = action.payload
      return idMap
    }

    default:
      return state
  }
}
