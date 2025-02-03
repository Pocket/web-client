import { EXT_ACTIONS } from '../actions'
import { POCKET_SAVES, POCKET_HOME } from '../constants'
import { getErrorMessage } from '../utilities/error'
import { isSystemPage } from '../utilities/is-system'
import { sendMessage } from '../utilities/send-message'
import { getSetting } from '../utilities/storage'
import { addNote } from './api/add-note'
import { removeNote } from './api/remove-note'
import { upsertItem } from './api/upsert'
import { setAuth, logIn } from './auth'
import { setDefaultIcon, setToolbarIcon } from './icon-updates'

// Types
import type { ExtMessage, ExtSave } from '../types'
import type { ExtNote } from '../types/note'

let saveQueue: ExtSave | null = null

/* Initial Setup
–––––––––––––––––––––––––––––––––––––––––––––––––– */
chrome.runtime.onInstalled.addListener(function () {
  // Use SVG icons over the png for more control
  void setDefaultIcon()
  // handle.setContextMenus()
})

/* Tab Changes
–––––––––––––––––––––––––––––––––––––––––––––––––– */
// chrome.tabs.onUpdated.addListener(tabUpdated)
// function tabUpdated(tabId: number, changeInfo: chrome.tabs.TabChangeInfo) {
//   // if actively loading a new page, unset save state on icon
//   // if (changeInfo.status === 'loading' && changeInfo.url) {
//   //   void setToolbarIcon(tabId, false)
//   // }
// }

/* Message handling
–––––––––––––––––––––––––––––––––––––––––––––––––– */
// eslint-disable-next-line @typescript-eslint/no-misused-promises
chrome.runtime.onMessage.addListener(messageHandler)
async function messageHandler(message: ExtMessage, sender: chrome.runtime.MessageSender) {
  const { action = EXT_ACTIONS.UNKNOWN_ACTION } = message || {}

  // Messages from `popup action` don't have a sender so we need to query the active tab
  const activeTab = await chrome.tabs.query({ active: true, lastFocusedWindow: true })

  // Context messages will have a sender (it may be unnecessary to do this check)
  const senderTab = sender.tab

  // Let's get the correct tab to use before we proceed
  const tab = senderTab ?? activeTab[0]
  const tabId = tab?.id

  console.log({ message })

  switch (action) {
    case EXT_ACTIONS.BROWSER_ACTION: {
      // No tab was sent
      // !! ADD BETTER RESPONSE TO BAD DATA
      if (!tab || !tabId) return true

      // If it's a system page, just send them to Pocket proper
      if (isSystemPage(tab)) return openPocketHome()

      // Let's do a quick check to see if the user has any text selected and pass
      // it back to the popup so we can populate the note
      const selection = await getSelection(tabId)
      if (selection) {
        await chrome.runtime.sendMessage({ action: EXT_ACTIONS.SAVE_TO_POCKET_REQUEST, selection })
      }

      // Let's initiate a save
      await save({
        id: tabId,
        title: tab.title,
        url: tab.url,
        ...(selection && { note: selection })
      })

      return true
    }

    case EXT_ACTIONS.ADD_NOTE_REQUEST: {
      const { noteData } = message
      if (noteData && tab?.url) await saveNote(noteData, tab.url)
      return true
    }

    case EXT_ACTIONS.DELETE_NOTE_REQUEST: {
      const { noteId } = message
      if (noteId) await deleteNote(noteId)
      return true
    }

    case EXT_ACTIONS.AUTH_CODE_RECEIVED: {
      try {
        const { auth } = message
        const { token, userId } = auth!

        // Let's make sure we don't fail silently
        if (!token || !userId) return void sendMessage({ action: EXT_ACTIONS.AUTH_ERROR })

        // All's well, set us up for future requests
        await setAuth(token, userId)

        // Let's also close that login page
        chrome.tabs.query({ url: '*://getpocket.com/extension_login_success*' }, (tabs) => {
          const tabIds = tabs.map((tab) => tab?.id ?? false).filter(Boolean)
          void chrome.tabs.remove(tabIds as number[])
        })

        // Did we try and save before we auth'd?  Let's continue on
        if (saveQueue) {
          const saveData = saveQueue
          saveQueue = null

          await save(saveData)
          return true
        }
      } catch (err) {
        console.warn(err)
      }
      return
    }

    case EXT_ACTIONS.LOGGED_OUT_OF_POCKET: {
      await chrome.storage.local.clear()
      return true
    }
    default: {
      // Important! Return true to indicate you want to send a response asynchronously
      return true
    }
  }
}

/* Saving
–––––––––––––––––––––––––––––––––––––––––––––––––– */
async function save(saveData: ExtSave) {
  const { url, id } = saveData
  try {
    // No url ... not sure how you managed that one ;)
    if (!url || !id) return

    // Are we authed?
    const access_token = await getSetting('access_token')

    // If we aren't authed, we are gonna save our tab and run through auth.
    if (!access_token) {
      saveQueue = saveData
      return logIn()
    }

    // We are auth'd! Let's make a save
    const { item } = await upsertItem(saveData)

    // send a message so the popup can display the preview
    sendMessage({ action: EXT_ACTIONS.SAVE_TO_POCKET_SUCCESS, item })
  } catch (error) {
    // Things have gone awry.  Let's send the error along
    const message = getErrorMessage(error)
    sendMessage({ action: EXT_ACTIONS.SAVE_TO_POCKET_FAILURE, error: message })
    if (id) await setToolbarIcon(id, true)
    return false
  }
}

async function saveNote(noteData: ExtNote, source?: string) {
  try {
    // Let's add our note
    const item = await addNote({ ...noteData, source })

    // send a message so the popup can display the preview
    sendMessage({ action: EXT_ACTIONS.ADD_NOTE_SUCCESS, item })
  } catch (error) {
    // Things have gone awry.  Let's send the error along
    const message = getErrorMessage(error)
    sendMessage({ action: EXT_ACTIONS.ADD_NOTE_FAILURE, error: message })
    return false
  }
}

async function deleteNote(noteId: string) {
  try {
    await removeNote(noteId)
    // send a message so the popup can display the preview
    sendMessage({ action: EXT_ACTIONS.DELETE_NOTE_SUCCESS, noteId })
  } catch (error) {
    // Things have gone awry.  Let's send the error along
    const message = getErrorMessage(error)
    sendMessage({ action: EXT_ACTIONS.DELETE_NOTE_FAILURE, error: message })
    return false
  }
}

export function openPocket() {
  void chrome.tabs.create({ url: POCKET_SAVES })
}

export function openPocketHome() {
  void chrome.tabs.create({ url: POCKET_HOME })
  return true
}

export function openOptionsPage() {
  void chrome.runtime.openOptionsPage()
}

/**
 * getSelection
 * ---
 * This executes a script in the context of the chosen tabId and sends back the
 * selected text, if any exists.
 */
export async function getSelection(tabId: number): Promise<string | undefined> {
  const data = await chrome.scripting.executeScript({
    target: { tabId },
    func: () => document.getSelection()?.toString()
  })
  return data[0]?.result?.length ? data[0]?.result : undefined
}
