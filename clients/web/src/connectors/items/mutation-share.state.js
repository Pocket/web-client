import { put, takeLatest } from 'redux-saga/effects'
import { shareCreateLink } from 'common/api/mutations/share-create-link'
import { shareAddContext } from 'common/api/mutations/share-add-context'
import { SHARE_REQUEST } from 'actions'
import { SHARE_REQUEST_SUCCESS } from 'actions'
import { SHARE_REQUEST_FAILURE } from 'actions'
import { SHARE_ADD_CONTEXT } from 'actions'
import { SHARE_ADD_CONTEXT_SUCCESS } from 'actions'
import { SHARE_ADD_CONTEXT_FAILURE } from 'actions'
import { SHARE_CANCEL } from 'actions'
import { SHARE_MASTODON } from 'actions'

/** ACTIONS
 --------------------------------------------------------------- */
export const shareAction = ({ item, quote, note, position }) => ({ type: SHARE_REQUEST, item, quote, note, position }) //prettier-ignore
export const shareCancel = () => ({ type: SHARE_CANCEL })
export const shareMastodon = () => ({ type: SHARE_MASTODON })
export const shareUpdateContext = (slug, context) => ({ type: SHARE_ADD_CONTEXT, slug, context })

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
      const { item, shareUrl, quote, position, slug } = action
      return { ...state, item, shareUrl, quote, position, slug }
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
export const mutationShareSagas = [
  takeLatest(SHARE_REQUEST, getShareableLink),
  takeLatest(SHARE_ADD_CONTEXT, updateShareContext)
]

/** SAGA :: RESPONDERS
 --------------------------------------------------------------- */
function* getShareableLink({ item, quote, note }) {
  try {
    //TODO: Ask @collectedmind if this should be externalUrl moving forward
    const target = item.resolvedUrl
    const context = buildContext(quote, note)
    const response = yield shareCreateLink(target, context)

    // If things don't go right
    if (response.error) throw new Error(response.error)
    const { shareUrl, slug } = response

    yield put({ type: SHARE_REQUEST_SUCCESS, item, quote, shareUrl, slug })
  } catch {
    yield put({ type: SHARE_REQUEST_FAILURE })
  }
}

function* updateShareContext({ slug, context: passedContext }) {
  try {
    const { quote, note } = passedContext
    const context = buildContext(quote, note)
    const response = yield shareAddContext(slug, context)

    // If things don't go right
    if (response.error) throw new Error(response.error)
    const { shareUrl } = response

    yield put({ type: SHARE_ADD_CONTEXT_SUCCESS, shareUrl })
  } catch {
    yield put({ type: SHARE_ADD_CONTEXT_FAILURE })
  }
}

function buildContext(quote, note) {
  if (!quote && !note) return undefined
  return {
    ...(note && note.length && { note }),
    ...(quote && {
      highlights: {
        quotes: [quote]
      }
    })
  }
}
