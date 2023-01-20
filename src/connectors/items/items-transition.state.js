import { ITEMS_UPSERT_SUCCESS } from 'actions'
import { ITEMS_UNDELETE_SUCCESS } from 'actions'
import { MUTATION_DELETE_SUCCESS } from 'actions'

/** ITEM REDUCERS
 --------------------------------------------------------------- */
//!! Note: This is all a stop gap until we can get proper item associations from the server for corpus items

export const itemsTransitionsReducers = (state = {}, action) => {
  switch (action.type) {
    case ITEMS_UNDELETE_SUCCESS:
    case ITEMS_UPSERT_SUCCESS: {
      const { corpusId, itemId } = action
      return { ...state, [corpusId]: itemId }
    }

    case MUTATION_DELETE_SUCCESS: {
      const { corpusId } = action
      if (!corpusId) return state

      const stateDraft = state
      delete stateDraft[corpusId]

      return stateDraft
    }

    default:
      return state
  }
}
