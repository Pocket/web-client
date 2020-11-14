import { MYLIST_DATA_SUCCESS } from 'actions'
import { MYLIST_UPDATE_SUCCESS } from 'actions'
import { HOME_DATA_LATEST_SUCCESS } from 'actions'
import { ARTICLE_ITEM_SUCCESS } from 'actions'

/* CONSOLIDATE
–––––––––––––––––––––––––––––––––––––––––––––––––– */
// import { itemTagSagas } from './items.tag'
import { itemAddSagas } from './items.add'
import { itemDeleteSagas } from './items.delete'
import { itemFavoriteSagas } from './items.favorite'
import { itemArchiveSagas } from './items.archive'
// import { itemShareSagas } from './items.share'
// import { itemUseSagas } from './items.use'
// import { itemRetrieveSagas } from './items.retrieve'
// import { itemAnnotateSagas } from './items.annotate'

/** ACTIONS
 --------------------------------------------------------------- */
export { itemAddAction } from './items.add'
// import { itemTagActions } from './items.tag'
// import { itemDeleteActions } from './items.delete'
// import { itemFavoriteActions } from './items.favorite'
// export { itemArchiveActions } from './items.archive'
// import { itemShareActions } from './items.share'
// import { itemUseActions } from './items.use'
// import { itemAnnotateActions } from './items.annotate'

/** REDUCERS
 --------------------------------------------------------------- */
const initialState = {}

export const myListItemsReducers = (state = initialState, action) => {
  switch (action.type) {
    // This comes from the raw item /get calls
    case MYLIST_DATA_SUCCESS:
    case ARTICLE_ITEM_SUCCESS:
    case HOME_DATA_LATEST_SUCCESS: {
      const { itemsById } = action
      return { ...state, ...itemsById }
    }

    case MYLIST_UPDATE_SUCCESS: {
      const { itemsById } = action
      return itemsById
    }

    default:
      return state
  }
}

/** SAGAS :: WATCHERS
 --------------------------------------------------------------- */
export const myListItemsSagas = [
  ...itemAddSagas,
  ...itemDeleteSagas,
  ...itemArchiveSagas,
  ...itemFavoriteSagas
]

/** SAGA :: RESPONDERS
 --------------------------------------------------------------- */
