import { LIST_SHARE_REQUEST } from 'actions'
import { LIST_SHARE_CANCEL } from 'actions'

/** ACTIONS
 --------------------------------------------------------------- */
export const shareListAction = (id) => ({ type: LIST_SHARE_REQUEST, id }) //prettier-ignore
export const shareListCancel = () => ({ type: LIST_SHARE_CANCEL })

/** REDUCERS
 --------------------------------------------------------------- */
const initialState = {
  id: false
}

export const mutationListShareReducers = (state = initialState, action) => {
  switch (action.type) {
    case LIST_SHARE_REQUEST: {
      const { id } = action
      return { ...state, id }
    }

    case LIST_SHARE_CANCEL: {
      return initialState
    }

    default:
      return state
  }
}
