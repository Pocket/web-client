import { getShareableListPublic } from 'common/api/queries/get-shareable-list-public'
import { LIST_PUBLIC_HYDRATE } from 'actions'
import { HYDRATE } from 'actions'

/** ACTIONS
 --------------------------------------------------------------- */
export const hydrateList = (hydrated) => ({ type: LIST_PUBLIC_HYDRATE, hydrated })

/** REDUCERS
 --------------------------------------------------------------- */
export const pagePublicListReducers = (state = {}, action) => {
  switch (action.type) {
    case LIST_PUBLIC_HYDRATE: {
      const { hydrated } = action
      return { ...state, ...hydrated  }
    }

    case HYDRATE: {
      const { pagePublicList } = action.payload
      return pagePublicList
    }

    default:
      return state
  }
}

/** ASYNC REQUESTS
 --------------------------------------------------------------- */
export function fetchPublicListHydrationData({ slug, listId }) {
  return getShareableListPublic({ slug, listId })
}
