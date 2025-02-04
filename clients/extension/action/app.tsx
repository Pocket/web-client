import { useEffect, useState } from 'react'
import { EXT_ACTIONS } from '../actions'
import { ActionContainer } from '../components/action-container'
import { sendMessage } from '../utilities/send-message'

import type { ExtItem, ExtMessage } from '../types'
import type { NoteEdge } from '@common/types/pocket'

export function App() {
  const [isOpen, setIsOpen] = useState(false)
  const [saveStatus, setSaveStatus] = useState('saving')
  const [noteStatus, setNoteStatus] = useState<string | undefined>(undefined)
  const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined)
  const [item, setItem] = useState<ExtItem | undefined>(undefined)
  const [notes, setNotes] = useState<NoteEdge[] | []>([])

  /* Setup Listeners and show popup
  –––––––––––––––––––––––––––––––––––––––––––––––––– */
  useEffect(() => {
    setIsOpen(true)
    chrome.runtime.onMessage.addListener(handleMessages)
    return () => {
      setIsOpen(false)
      chrome.runtime.onMessage.removeListener(handleMessages)
    }
  }, [])

  /* Send a message on action activating
  –––––––––––––––––––––––––––––––––––––––––––––––––– */
  useEffect(() => {
    if (isOpen) void sendMessage({ action: EXT_ACTIONS.BROWSER_ACTION })
  }, [isOpen])

  /* Handle incoming messages
  –––––––––––––––––––––––––––––––––––––––––––––––––– */
  function handleMessages(message: ExtMessage) {
    const { action = 'Unknown Action' } = message || {}

    switch (action) {
      case EXT_ACTIONS.ADD_NOTE_SUCCESS:
      case EXT_ACTIONS.SAVE_TO_POCKET_SUCCESS: {
        const item = message?.item as ExtItem
        setItem(item)
        setNotes(item.savedItem.notes.edges)
        setNoteStatus(undefined)
        setSaveStatus('saved')
        return
      }

      case EXT_ACTIONS.SAVE_TO_POCKET_FAILURE: {
        const { error } = message ?? 'Unknown error'
        setErrorMessage(error)
        setSaveStatus('save_failed')
        return
      }

      case EXT_ACTIONS.ADD_NOTE_FAILURE: {
        const { error } = message ?? 'Unknown error'
        setNoteStatus(undefined)
        setErrorMessage(error)
        return
      }

      case EXT_ACTIONS.DELETE_NOTE_SUCCESS: {
        const { noteId } = message
        if (noteId) {
          setNoteStatus(undefined)
          setNotes((notes) => {
            return notes.filter((note) => note?.node?.id !== noteId)
          })
        }
        return
      }

      case EXT_ACTIONS.REMOVE_ITEM_REQUEST: {
        setSaveStatus('removing')
        return
      }

      case EXT_ACTIONS.REMOVE_ITEM_SUCCESS: {
        setSaveStatus('removed')
        return
      }

      case EXT_ACTIONS.REMOVE_ITEM_FAILURE: {
        setSaveStatus('remove_failed')
        return
      }

      case EXT_ACTIONS.TAG_SYNC_REQUEST: {
        setSaveStatus('tags_saving')
        return
      }

      case EXT_ACTIONS.TAG_SYNC_SUCCESS: {
        setSaveStatus('tags_saved')
        return
      }

      case EXT_ACTIONS.TAG_SYNC_FAILURE: {
        setSaveStatus('tags_failed')
        return
      }

      case EXT_ACTIONS.UPDATE_TAG_ERROR: {
        const { error } = message ?? 'Unknown error'
        setErrorMessage(error)
        return
      }

      case EXT_ACTIONS.AUTH_ERROR: {
        setErrorMessage('Authorization Error')
        return
      }

      default: {
        return
      }
    }
  }

  /* Send messages
  –––––––––––––––––––––––––––––––––––––––––––––––––– */
  const actionUnSave = () => {}

  const actionLogOut = () => {
    void sendMessage({ action: EXT_ACTIONS.LOGGED_OUT_OF_POCKET })
  }

  return (
    <ActionContainer
      errorMessage={errorMessage}
      saveStatus={saveStatus}
      noteStatus={noteStatus}
      notes={notes}
      setNoteStatus={setNoteStatus}
      isOpen={isOpen}
      item={item}
      actionUnSave={actionUnSave}
      actionLogOut={actionLogOut}
    />
  )
}
