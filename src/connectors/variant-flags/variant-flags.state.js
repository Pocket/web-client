import { takeEvery, put } from 'redux-saga/effects'
import { localStore } from 'common/utilities/browser-storage/browser-storage'
import { VARIANTS_DEFINE, VARIANTS_SAVE, VARIANTS_UPDATE } from 'actions'

/** ACTIONS
 --------------------------------------------------------------- */
/**
 * Set Variant Flags
 * @param {string} list An object with an flag_id => array format
 * {
 *   flag_id: ['variant1', 'variant2']
 * }
 */
export const setVariantFlags = (list) => ({
  type: VARIANTS_DEFINE,
  list
})

export const updateVariantFlag = (flag, variant) => ({
  type: VARIANTS_UPDATE,
  flag,
  variant
})

/** REDUCERS
 --------------------------------------------------------------- */
const initialState = {
  _allVariants: {}
}

export const variantReducers = (state = initialState, action) => {
  switch (action.type) {
    case VARIANTS_SAVE: {
      const { variants, list } = action
      const _allVariants = { ...state._allVariants, ...list }
      return { ...state, ...variants, _allVariants }
    }

    case VARIANTS_UPDATE: {
      const { flag, variant } = action
      localStore.setItem(flag, variant)
      return { ...state, [flag]: variant }
    }

    default:
      return state
  }
}

/** SAGAS :: WATCHERS
 --------------------------------------------------------------- */
export const variantSagas = [takeEvery(VARIANTS_DEFINE, defineVariants)]

/** SAGA :: RESPONDERS
 --------------------------------------------------------------- */
/**
 * Define Variants
 * @param {string} list An object with an flag_id => array format
 * {
 *   flag_id: ['variant1', 'variant2']
 * }
 */
function* defineVariants({ list }) {
  // Loop through each object key
  const variants = Object.keys(list).reduce((obj, key) => {
    // check stored variant. return if still valid option
    const storedVariant = localStore.getItem(key)

    // list[key] is an array, eg: ['variant1', 'variant2']
    // confirms storedVariant is still a valid option
    if (list[key].includes(storedVariant)) {
      return { ...obj, [key]: storedVariant }
    }

    // assign a user to a new variant
    const variant = list[key][Math.floor(Math.random() * list[key].length)]
    localStore.setItem(key, variant)
    return { ...obj, [key]: variant }
  }, {})

  yield put({ type: VARIANTS_SAVE, variants, list })
}
