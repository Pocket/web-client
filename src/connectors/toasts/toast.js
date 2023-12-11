import React, { useEffect, useCallback, useState } from 'react'
import { useTranslation } from 'next-i18next'
import { useDispatch } from 'react-redux'
import { clearToast } from './toast.state'
import { Toast as ToastComponent } from 'components/toast/toast'
import { mutationUnDelete } from 'connectors/items/mutation-delete.state'

import { MUTATION_DELETE_SUCCESS } from 'actions'

import { ITEMS_UPSERT_SUCCESS } from 'actions'

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

import { ITEMS_ADD_SUCCESS } from 'actions'

import { COPY_ITEM_URL } from 'actions'

import { ITEMS_TAG_SUCCESS } from 'actions'
import { ITEMS_TAG_FAILURE } from 'actions'

import { COLLECTIONS_SAVE_SUCCESS } from 'actions'
import { COLLECTION_PAGE_SAVE_SUCCESS } from 'actions'
import { DISCOVER_ITEMS_SAVE_SUCCESS } from 'actions'
import { ARTICLE_SAVE_SUCCESS } from 'actions'

import { HIGHLIGHT_SAVE_SUCCESS } from 'actions'
import { HIGHLIGHT_DELETE_SUCCESS } from 'actions'

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

import { HOME_REC_REQUEST_DEMOTE } from 'actions'
import { HOME_REC_REQUEST_PROMOTE } from 'actions'

export function Toast({
  stamp,
  type,
  ids,
  actionType,
  deletedItemPosition,
  itemCount: count = 1,
  previousStatus
}) {
  const dispatch = useDispatch()
  const { t } = useTranslation()

  const messages = {
    // Adding Items
    [ITEMS_UPSERT_SUCCESS]: t('toast:added', '{{count}} item added', { count }),
    [ITEMS_ADD_SUCCESS]: t('toast:added', '{{count}} item added', { count }),
    [COLLECTIONS_SAVE_SUCCESS]: t('toast:added', '{{count}} item added', { count }),
    [COLLECTION_PAGE_SAVE_SUCCESS]: t('toast:added', '{{count}} item added', { count }),
    [DISCOVER_ITEMS_SAVE_SUCCESS]: t('toast:added', '{{count}} item added', { count }),
    [ARTICLE_SAVE_SUCCESS]: t('toast:added', '{{count}} item added', { count }),
    [MUTATION_UNARCHIVE]: t('toast:added', '{{count}} item added', { count }),
    [MUTATION_BULK_UNARCHIVE]: t('toast:unarchived', '{{count}} item added', { count }),
    [MUTATION_UPSERT]: t('toast:added', '{{count}} item added', { count }),

    // Tagging Items
    [ITEMS_TAG_SUCCESS]: t('toast:tagged', '{{count}} item added', { count }),
    [MUTATION_TAGGING]: t('toast:tagged', '{{count}} item added', { count }),

    // Deleting
    [MUTATION_DELETE_SUCCESS]: t('toast:deleted', '{{count}} item deleted', { count }),

    // Sharing
    [COPY_ITEM_URL]: t('toast:url-copied', 'URL copied'),

    // Archive
    [MUTATION_ARCHIVE]: t('toast:archived', '{{count}} item archived', { count }),
    [MUTATION_BULK_ARCHIVE]: t('toast:archived', '{{count}} item archived', { count }),

    [MUTATION_FAVORITE]: t('toast:added-to-favorites', '{{count}} item added to favorites', { count }), //prettier-ignore
    [MUTATION_UNFAVORITE]: t('toast:removed-from-favorites', '{{count}} item removed from favorites', { count }), //prettier-ignore
    [MUTATION_BULK_FAVORITE]: t('toast:added-to-favorites', '{{count}} item added to favorites', { count }), //prettier-ignore
    [MUTATION_BULK_UNFAVORITE]: t('toast:removed-from-favorites', '{{count}} item removed from favorites', { count }), //prettier-ignore

    [HIGHLIGHT_SAVE_SUCCESS]: t('toast:highlighted', '{{count}} item highlighted', { count }), //prettier-ignore
    [HIGHLIGHT_DELETE_SUCCESS]: t('toast:highlight-deleted', '{{count}} highlight removed', { count }), //prettier-ignore

    [ITEMS_TAG_FAILURE]: t('toast:error-tagging', 'Error tagging item'),

    // Lists
    [LIST_CREATE_SUCCESS]: t('toast:list-created', 'List created'),
    [LIST_CREATE_FAILURE]: t('toast:error-creating-list', 'Error creating list'),
    [LIST_UPDATE_SUCCESS]: t('toast:list-updated', 'List updated'),
    [LIST_UPDATE_FAILURE]: t('toast:error-updating-list', 'Error updating list'),
    [LIST_DELETE_SUCCESS]: t('toast:list-deleted', 'List deleted'),
    [LIST_DELETE_FAILURE]: t('toast:error-deleting-list', 'Error deleting list'),
    [LIST_ITEMS_REORDER_SUCCESS]: t('toast:list-updated', 'List updated'),
    [LIST_ITEMS_REORDER_FAILURE]: t('toast:error-updating-list', 'Error updating list'),
    // List items
    [LIST_ADD_ITEM_SUCCESS]: t('toast:item-added-to-list', 'Item added to list'),
    [LIST_ADD_ITEM_FAILURE]: t('toast:error-adding-item', 'Error adding item'),
    [LIST_ITEM_ADD_NOTE_SUCCESS]: t('toast:note-added', 'Note added'),
    [LIST_ITEM_ADD_NOTE_FAILURE]: t('toast:error-adding-note', 'Error adding note'),
    [LIST_ITEM_EDIT_NOTE_SUCCESS]: t('toast:note-updated', 'Note updated'),
    [LIST_ITEM_EDIT_NOTE_FAILURE]: t('toast:error-updating-note', 'Error updating note'),
    [LIST_ITEM_NOTE_DELETE_SUCCESS]: t('toast:note-deleted', 'Note deleted'),
    [LIST_ITEM_NOTE_DELETE_FAILURE]: t('toast:error-deleting-note', 'Error deleting note'),
    [LIST_DELETE_ITEM_SUCCESS]: t('toast:item-removed-from-list', 'Item removed from list'),
    [LIST_DELETE_ITEM_FAILURE]: t('toast:error-removing-item', 'Error removing item'),

    // Signaled Cards
    [HOME_REC_REQUEST_DEMOTE]: t('toast:home-rec-demote', 'We’ll recommend less stories like this'),
    [HOME_REC_REQUEST_PROMOTE]: t(
      'toast:home-rec-promote',
      'We’ll recommend more stories like this'
    )
  }

  const errors = [
    ITEMS_TAG_FAILURE,
    LIST_CREATE_FAILURE,
    LIST_ADD_ITEM_FAILURE,
    LIST_DELETE_ITEM_FAILURE,
    LIST_UPDATE_FAILURE,
    LIST_DELETE_FAILURE,
    LIST_ITEM_ADD_NOTE_FAILURE,
    LIST_ITEM_EDIT_NOTE_FAILURE,
    LIST_ITEM_NOTE_DELETE_FAILURE,
    LIST_ITEMS_REORDER_FAILURE
  ]

  const [show, setShow] = useState(false)
  const mount = () => setShow(true)
  const unmount = () => setShow(false)

  const remove = useCallback(() => dispatch(clearToast(stamp)), [stamp, dispatch])

  const typeForMessage = actionType || type
  const showUndo = type === MUTATION_DELETE_SUCCESS && deletedItemPosition !== undefined
  const isError = errors.includes(type)
  const message = messages[typeForMessage]
  const undoString = t('toast:undo', 'Undo')

  useEffect(() => {
    if (!show) return () => {}
    const removeTime = showUndo ? 5000 : 3500
    const removeTimer = setTimeout(unmount, removeTime)
    return () => clearTimeout(removeTimer)
  }, [show, showUndo, remove])

  useEffect(() => {
    mount()
  }, [])

  const handleUndo = () => {
    dispatch(mutationUnDelete(ids, deletedItemPosition, previousStatus))
    remove()
  }

  return (
    <ToastComponent
      isError={isError}
      message={message}
      undoString={undoString}
      type={type}
      show={show}
      remove={remove}
      showUndo={showUndo}
      handleUndo={handleUndo}
    />
  )
}
