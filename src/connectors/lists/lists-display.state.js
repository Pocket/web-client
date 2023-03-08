import { LIST_ITEMS_SUCCESS } from 'actions'

/** ITEM REDUCERS
 --------------------------------------------------------------- */
export const listsDisplayReducers = (state = {}, action) => {
  switch (action.type) {
    case LIST_ITEMS_SUCCESS: {
      const { itemsById = {} } = action

      const passedItemIds = Object.keys(itemsById)
      const preExistingItemIds = passedItemIds.filter((value) => Object.keys(state).includes(value))

      const preExistingItemsById = preExistingItemIds.reduce((previous, current) => {
        return { ...previous, [current]: { ...state[current], ...itemsById[current] } }
      }, {})

      // This basically is an easy way to say use the existing state but
      // add new items by id ... and we may try to overwrite existing items
      return { ...state, ...preExistingItemsById, ...itemsById }
    }

    default:
      return state
  }
}
