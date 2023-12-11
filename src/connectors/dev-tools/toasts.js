import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { css } from '@emotion/css'
import { sectionStyles } from 'components/dev-tools/tool-styles'
import { sendToast } from 'connectors/toasts/toast.state'
import { TextInput } from 'components/form-fields/text-input'

import { TOAST_TEST_MESSAGE } from 'actions'

import { MUTATION_ARCHIVE } from 'actions'
import { MUTATION_UNARCHIVE } from 'actions'
import { MUTATION_FAVORITE } from 'actions'
import { MUTATION_UNFAVORITE } from 'actions'
import { MUTATION_TAGGING } from 'actions'
import { MUTATION_UPSERT } from 'actions'
import { MUTATION_BULK_ARCHIVE } from 'actions'
import { MUTATION_BULK_UNARCHIVE } from 'actions'
import { MUTATION_BULK_FAVORITE } from 'actions'
import { MUTATION_BULK_UNFAVORITE } from 'actions'
import { HIGHLIGHT_SAVE_SUCCESS } from 'actions'
import { HIGHLIGHT_DELETE_SUCCESS } from 'actions'

import { ITEMS_UPSERT_SUCCESS } from 'actions'
import { MUTATION_DELETE_SUCCESS } from 'actions'

import { ITEMS_ADD_SUCCESS } from 'actions'

import { COPY_ITEM_URL } from 'actions'

import { ITEMS_TAG_SUCCESS } from 'actions'
import { ITEMS_TAG_FAILURE } from 'actions'

import { ADD_SHARE_SUCCESS } from 'actions'
import { ADD_SHARE_FAILURE } from 'actions'

import { COLLECTIONS_SAVE_SUCCESS } from 'actions'
import { COLLECTION_PAGE_SAVE_SUCCESS } from 'actions'
import { DISCOVER_ITEMS_SAVE_SUCCESS } from 'actions'
import { ARTICLE_SAVE_SUCCESS } from 'actions'

import { LIST_CREATE_SUCCESS } from 'actions'
import { LIST_CREATE_FAILURE } from 'actions'
import { LIST_ADD_ITEM_SUCCESS } from 'actions'
import { LIST_ADD_ITEM_FAILURE } from 'actions'
import { LIST_DELETE_ITEM_SUCCESS } from 'actions'
import { LIST_DELETE_ITEM_FAILURE } from 'actions'
import { LIST_UPDATE_SUCCESS } from 'actions'
import { LIST_UPDATE_FAILURE } from 'actions'
import { LIST_DELETE_SUCCESS } from 'actions'
import { LIST_DELETE_FAILURE } from 'actions'
import { LIST_ITEM_ADD_NOTE_SUCCESS } from 'actions'
import { LIST_ITEM_ADD_NOTE_FAILURE } from 'actions'
import { LIST_ITEM_EDIT_NOTE_SUCCESS } from 'actions'
import { LIST_ITEM_EDIT_NOTE_FAILURE } from 'actions'
import { LIST_ITEM_NOTE_DELETE_SUCCESS } from 'actions'
import { LIST_ITEM_NOTE_DELETE_FAILURE } from 'actions'
import { LIST_ITEMS_REORDER_SUCCESS } from 'actions'
import { LIST_ITEMS_REORDER_FAILURE } from 'actions'

// These are separated out because these values are normally passed along as
// the actionType on the MUTATION_SUCCESS action. In these instances we will use
// TOAST_TEST_MESSAGE as the action so reducers don't break when responding to
// MUTATION_SUCCESS
export const mutationTypes = [
  MUTATION_ARCHIVE,
  MUTATION_UNARCHIVE,
  MUTATION_FAVORITE,
  MUTATION_UNFAVORITE,
  MUTATION_TAGGING,
  MUTATION_UPSERT,
  MUTATION_BULK_ARCHIVE,
  MUTATION_BULK_UNARCHIVE,
  MUTATION_BULK_FAVORITE,
  MUTATION_BULK_UNFAVORITE,
  HIGHLIGHT_SAVE_SUCCESS,
  HIGHLIGHT_DELETE_SUCCESS
]

export function createToastData(action, count) {
  // if a mutation, we need to include the action as the actionType
  // otherwise a reducer somewhere is going to throw an error
  const type = mutationTypes.includes(action) ? TOAST_TEST_MESSAGE : action

  // ids and deletedItemPosition value are for MUTATION_DELETE_SUCCESS
  // with a count of 5, ids will be [0, 1, 2, 3, 4]
  const data = {
    type,
    actionType: action,
    count: count,
    ids: Array.from({ length: count }, (v, i) => i),
    deletedItemPosition: count
  }

  return data
}

export const actions = [
  ...mutationTypes,
  MUTATION_DELETE_SUCCESS,
  ITEMS_ADD_SUCCESS,
  ITEMS_TAG_SUCCESS,
  ITEMS_TAG_FAILURE,
  ADD_SHARE_SUCCESS,
  ADD_SHARE_FAILURE,
  COLLECTIONS_SAVE_SUCCESS,
  COLLECTION_PAGE_SAVE_SUCCESS,
  DISCOVER_ITEMS_SAVE_SUCCESS,
  ARTICLE_SAVE_SUCCESS,
  ITEMS_UPSERT_SUCCESS,
  LIST_CREATE_SUCCESS,
  LIST_CREATE_FAILURE,
  LIST_ADD_ITEM_SUCCESS,
  LIST_ADD_ITEM_FAILURE,
  LIST_DELETE_ITEM_SUCCESS,
  LIST_DELETE_ITEM_FAILURE,
  LIST_UPDATE_SUCCESS,
  LIST_UPDATE_FAILURE,
  LIST_DELETE_SUCCESS,
  LIST_DELETE_FAILURE,
  LIST_ITEM_ADD_NOTE_SUCCESS,
  LIST_ITEM_ADD_NOTE_FAILURE,
  LIST_ITEM_EDIT_NOTE_SUCCESS,
  LIST_ITEM_EDIT_NOTE_FAILURE,
  LIST_ITEM_NOTE_DELETE_SUCCESS,
  LIST_ITEM_NOTE_DELETE_FAILURE,
  LIST_ITEMS_REORDER_SUCCESS,
  LIST_ITEMS_REORDER_FAILURE,
  COPY_ITEM_URL
]

export const Toasts = () => {
  const dispatch = useDispatch()

  const [value, setValue] = useState(actions[0])
  const [count, setCount] = useState('1')
  const setOptionValue = (e) => setValue(e.target.value)
  const setCountValue = (e) => setCount(e.target.value)

  const handleClick = () => {
    const data = createToastData(value, Number(count))
    dispatch(sendToast(data))
  }

  return (
    <div className={sectionStyles}>
      <h6>Toasts</h6>
      <div className={wrapperStyles}>
        <select onChange={setOptionValue} value={value}>
          {actions.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
        <TextInput
          className="count"
          labelText="Count"
          name="count"
          value={count}
          onChange={setCountValue}
        />
        <button onClick={handleClick}>Pop! 🍞</button>
      </div>
    </div>
  )
}

const wrapperStyles = css`
  & > * {
    display: inline-block;
    margin-left: 8px;
  }

  select {
    max-width: 300px;
    margin-left: 0;
  }

  .count {
    max-width: 60px;
  }
`
