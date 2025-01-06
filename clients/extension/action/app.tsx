import { useEffect, useState } from 'react'
import { EXT_ACTIONS } from '../actions'
import { ActionContainer } from '../components/action-container'

import type { ExtItem, ExtMessage, ExtPreview } from '../types'
import type { NoteEdge } from '@common/types/pocket'

export function App() {
  const [isOpen, setIsOpen] = useState(false)
  const [saveStatus, setSaveStatus] = useState('unsaved')
  const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined)
  const [preview, setPreview] = useState<ExtPreview | undefined>(undefined)
  const [tags, setTags] = useState<string[]>([])
  const [notes, setNotes] = useState<NoteEdge[] | undefined>()

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
    if (isOpen) void chrome.runtime.sendMessage({ action: EXT_ACTIONS.BROWSER_ACTION })
  }, [isOpen])

  /* Handle incoming messages
  –––––––––––––––––––––––––––––––––––––––––––––––––– */
  function handleMessages(message: ExtMessage) {
    const { action = 'Unknown Action' } = message || {}
    console.log('ACTION:', { message })
    switch (action) {
      case EXT_ACTIONS.SAVE_TO_POCKET_SUCCESS: {
        const item = message?.item as ExtItem
        const preview = item?.preview
        const suggestedTags = item?.savedItem?.suggestedTags.map((tag) => tag.name) ?? []
        const itemNotes = item?.savedItem?.notes

        setPreview(preview)
        setTags(suggestedTags)
        setNotes(itemNotes)
        setSaveStatus('saved')
        return
      }

      case EXT_ACTIONS.SAVE_TO_POCKET_FAILURE: {
        const { error } = message ?? 'Unknown error'
        setErrorMessage(error)
        setSaveStatus('save_failed')
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
    void chrome.runtime.sendMessage({ action: EXT_ACTIONS.LOGGED_OUT_OF_POCKET })
  }

  return (
    <ActionContainer
      errorMessage={errorMessage}
      saveStatus={saveStatus}
      isOpen={isOpen}
      preview={preview}
      tags={tags}
      notes={notes}
      actionUnSave={actionUnSave}
      actionLogOut={actionLogOut}
    />
  )
}
