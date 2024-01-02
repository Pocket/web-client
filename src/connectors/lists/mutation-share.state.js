import { LIST_SHARE_REQUEST } from 'actions'
import { LIST_SHARE_CANCEL } from 'actions'
import { LIST_SHARE_MASTODON } from 'actions'

/** ACTIONS
 --------------------------------------------------------------- */
export const shareListAction = (id) => ({ type: LIST_SHARE_REQUEST, id }) //prettier-ignore
export const shareListCancel = () => ({ type: LIST_SHARE_CANCEL })
export const shareListMastodon = () => ({ type: LIST_SHARE_MASTODON })

/** REDUCERS
 --------------------------------------------------------------- */
const initialState = {
  id: false,
  mastodonOpen: false
}

export const mutationListShareReducers = (state = initialState, action) => {
  switch (action.type) {
    case LIST_SHARE_REQUEST: {
      const { id } = action
      return { ...state, id }
    }

    case LIST_SHARE_MASTODON: {
      return { ...state, mastodonOpen: true }
    }

    case LIST_SHARE_CANCEL: {
      return initialState
    }

    default:
      return state
  }
}
