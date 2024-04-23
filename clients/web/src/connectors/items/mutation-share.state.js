import { put, takeLatest } from 'redux-saga/effects'
import { shareCreateLink } from 'common/api/mutations/get-share-link'
import { SHARE_REQUEST } from 'actions'
import { SHARE_REQUEST_SUCCESS } from 'actions'
import { SHARE_REQUEST_FAILURE } from 'actions'
import { SHARE_CANCEL } from 'actions'
import { SHARE_MASTODON } from 'actions'

/** ACTIONS
 --------------------------------------------------------------- */
export const shareAction = ({ item, quote, note, position }) => ({ type: SHARE_REQUEST, item, quote, note, position }) //prettier-ignore
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
    case SHARE_REQUEST_SUCCESS: {
      const { item, shareUrl, quote, position } = action
      return { ...state, item, shareUrl, quote, position }
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

/** SAGAS :: WATCHERS
 --------------------------------------------------------------- */
export const mutationShareSagas = [takeLatest(SHARE_REQUEST, getShareableLink)]

/** SAGA :: RESPONDERS
 --------------------------------------------------------------- */
function* getShareableLink({ item, quote, note }) {
  try {
    const target = item.resolvedUrl
    const context = buildContext(quote, note)
    const response = yield shareCreateLink(target, context)

    // If things don't go right
    if (response.error) throw new Error(response.error)
    const { shareUrl } = response

    yield put({ type: SHARE_REQUEST_SUCCESS, item, shareUrl })
  } catch {
    yield put({ type: SHARE_REQUEST_FAILURE })
  }
}

function buildContext(quote, note) {
  if (!quote && !note) return undefined
  return {
    ...(note && { note }),
    ...(quote && {
      highlights: {
        quotes: [quote]
      }
    })
  }
}
