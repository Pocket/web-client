import { getShareableListPublic } from 'common/api/queries/get-shareable-list-public'
import { LIST_PUBLIC_HYDRATE } from 'actions'
import { HYDRATE } from 'actions'

/** ACTIONS
 --------------------------------------------------------------- */
export const hydrateList = (hydrated) => ({ type: LIST_PUBLIC_HYDRATE, hydrated })

/** REDUCERS
 --------------------------------------------------------------- */
export const publicListReducers = (state = {}, action) => {
  switch (action.type) {
    case LIST_PUBLIC_HYDRATE: {
      const { hydrated } = action
      return { ...state, ...hydrated  }
    }

    case HYDRATE: {
      const { publicList } = action.payload
      return publicList
    }

    default:
      return state
  }
}

/** ASYNC REQUESTS
 --------------------------------------------------------------- */
export function fetchPublicListHydrationData({ slug, externalId }) {
  return getShareableListPublic({ slug, externalId })
}
