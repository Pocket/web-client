import { ITEMS_SUCCESS } from 'actions'
import { READ_ITEM_SUCCESS } from 'actions'
import { SHARED_ITEM_SUCCESS } from 'actions'
import { ITEMS_SET_NO_IMAGE } from 'actions'
import { ITEMS_UPDATE } from 'actions'
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
    case SHARED_ITEM_SUCCESS:
    case ITEMS_SUCCESS: {
      const { itemsById = {} } = action

      // Instead of a wholesale shallow merge (which overwrites existing values)
      // We are gonna do a messy deep merge.  This is all neccesary because we
      // don't have great data consistency in our endpoints
      const passedItemIds = Object.keys(itemsById)
      const preExistingItemIds = passedItemIds.filter((value) => Object.keys(state).includes(value))

      // This monstrosity avoids us clobbering the current derived display
      // This can all be nuked once we achieve display item consistency from the graph
      const preExistingItemsById = preExistingItemIds.reduce((previous, current) => {
        return { ...previous, [current]: { ...itemsById[current], ...state[current] } }
      }, {})

      // Wat?  This basically is an easy way to say use the existing state
      // but add new items by id ... but don't try and overwrite existing items
      // since the user has already seen them and we want things consistent.
      return { ...state, ...itemsById, ...preExistingItemsById }
    }

    case ITEMS_UPDATE: {
      const { itemsById = {} } = action

      const passedItemIds = Object.keys(itemsById)
      const preExistingItemIds = passedItemIds.filter((value) => Object.keys(state).includes(value))

      const preExistingItemsById = preExistingItemIds.reduce((previous, current) => {
        return { ...previous, [current]: { ...state[current], ...itemsById[current] } }
      }, {})

      // This basically is an easy way to say use the existing state but
      // add new items by id ... and we may try to overwrite existing items
      return { ...state, ...itemsById, ...preExistingItemsById }
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
