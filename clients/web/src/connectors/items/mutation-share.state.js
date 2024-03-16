import { SHARE_REQUEST } from 'actions'
import { SHARE_CANCEL } from 'actions'
import { SHARE_MASTODON } from 'actions'

/** ACTIONS
 --------------------------------------------------------------- */
export const shareAction = ({ item, quote, position }) => ({ type: SHARE_REQUEST, item, quote, position }) //prettier-ignore
export const shareCancel = () => ({ type: SHARE_CANCEL })
export const shareMastodon = () => ({ type: SHARE_MASTODON })

/** REDUCERS
 --------------------------------------------------------------- */
const initialState = {
  item: false,
  position: null,
  quote: null,
  mastodonOpen: false
}

export const mutationShareReducers = (state = initialState, action) => {
  switch (action.type) {
    case SHARE_REQUEST: {
      const { item, quote, position } = action
      return { ...state, item, quote, position }
    }

    case SHARE_MASTODON: {
      return { ...state, mastodonOpen: true }
    }

    case SHARE_CANCEL: {
      return initialState
    }

    default:
      return state
  }
}
