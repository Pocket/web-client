import { useEffect, useState } from 'react'
import { EXT_ACTIONS } from '../actions'
import { ActionContainer } from '../components/action-container'

import type { ExtPreviewItem } from '@common/types'

export function App() {
  const actionUnSave = () => {}
  const [isOpen, setIsOpen] = useState(false)
  const [saveStatus, setSaveStatus] = useState('unsaved')
  const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined)

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
    if (isOpen) void chrome.runtime.sendMessage({ action: EXT_ACTIONS.EXTENSION_ACTIVATED })
  }, [isOpen])

  /* Handle incoming messages
  –––––––––––––––––––––––––––––––––––––––––––––––––– */
  function handleMessages(message: { action: EXT_ACTIONS; item?: ExtPreviewItem; error?: string }) {
    const { action = 'Unknown Action' } = message || {}

    switch (action) {
      case EXT_ACTIONS.SAVE_TO_POCKET_REQUEST: {
        setIsOpen(true)
        return setSaveStatus('saving')
      }

      case EXT_ACTIONS.SAVE_TO_POCKET_SUCCESS: {
        return setSaveStatus('saved')
      }

      case EXT_ACTIONS.SAVE_TO_POCKET_FAILURE: {
        const { error } = message ?? 'Unknown error'
        setErrorMessage(error)
        return setSaveStatus('save_failed')
      }

      case EXT_ACTIONS.REMOVE_ITEM_REQUEST: {
        return setSaveStatus('removing')
      }

      case EXT_ACTIONS.REMOVE_ITEM_SUCCESS: {
        return setSaveStatus('removed')
      }

      case EXT_ACTIONS.REMOVE_ITEM_FAILURE: {
        return setSaveStatus('remove_failed')
      }

      case EXT_ACTIONS.TAG_SYNC_REQUEST: {
        return setSaveStatus('tags_saving')
      }

      case EXT_ACTIONS.TAG_SYNC_SUCCESS: {
        return setSaveStatus('tags_saved')
      }

      case EXT_ACTIONS.TAG_SYNC_FAILURE: {
        return setSaveStatus('tags_failed')
      }

      case EXT_ACTIONS.UPDATE_TAG_ERROR: {
        const { error } = message ?? 'Unknown error'
        setErrorMessage(error)
        return true
      }

      default: {
        return
      }
    }
  }

  return (
    <ActionContainer
      actionUnSave={actionUnSave}
      errorMessage={errorMessage}
      saveStatus={saveStatus}
      isOpen={isOpen}
    />
  )
}
