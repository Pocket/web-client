import { getDiscoverLineup } from 'common/api/queries/get-discover'
import { DISCOVER_HYDRATE } from 'actions'
import { HYDRATE } from 'actions'

/** ACTIONS
 --------------------------------------------------------------- */
export const hydrateDiscover = (itemIds) => ({ type: DISCOVER_HYDRATE, itemIds }) //prettier-ignore

/** REDUCERS
 --------------------------------------------------------------- */
const initialState = []

export const pageDiscoverIdsReducers = (state = initialState, action) => {
  switch (action.type) {
    case DISCOVER_HYDRATE: {
      const { itemIds } = action
      return itemIds
    }

    // SPECIAL HYDRATE:  This is sent from the next-redux wrapper and
    // it represents the state used to build the page on the server.
    case HYDRATE: {
      const { pageDiscoverIds } = action.payload
      return pageDiscoverIds
    }

    default:
      return state
  }
}

/** ASYNC Functions
 --------------------------------------------------------------- */

/**
 * fetchDiscoverData
 * Make and async request for a Pocket v3 feed and return best data
 * @return items {array} An array of derived items
 */
export async function fetchDiscoverData({ locale }) {
  try {
    const { itemsById, itemIds } = await getDiscoverLineup({ locale })

    return { itemIds, itemsById }
  } catch (error) {
    //TODO: adjust this once error reporting strategy is defined.
    console.warn('discover.state', error)
  }
}
