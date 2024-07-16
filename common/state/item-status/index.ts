// Libraries
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

// Imported Types
import { SavedItem } from '@common/types/pocket'

// Types
export type ItemStatusState = {
  itemsById: ItemsById
  savedItemIds: string[]
  updatingItemIds: string[]
}

export type ItemsById = {
  [key: string]: SavedItem
}

export type ItemStatus = {
  addSave: (id: string) => void // Action to add save status
  removeSave: (id: string) => void // Action to remove save status
  isSaved: (id: string) => boolean // Helper to determine save status
} & ItemStatusState

// const API_URL = 'some url yet to be defined' // Will be pulled in from env at some point

/**
 * useItemStatus
 * ---
 * The state for item status
 * @function addSave — Action to add save status
 * @function removeSave — Action to remove save status
 */
export const useItemStatus = create<ItemStatus>()(
  devtools((set, get) => ({
    /** State Values */
    itemsById: {},
    savedItemIds: [],
    updatingItemIds: [],

    /** State Action — addSave */
    addSave: async (id: string): Promise<void> => {
      try {
        // Adding Ids to SavedItemIds array optimistically
        set((state) => {
          return {
            savedItemIds: [...state.savedItemIds, id],
            updatingItemIds: [...state.updatingItemIds, id]
          }
        })

        // Send a signal to the server
        // const response = await fetch(`${API_URL}/item-status`, {
        //   method: 'PUT',
        //   body: JSON.stringify({ id })
        // })
        const response = {}

        // If the response is not okay, throw an error which to be handled in the catch statement
        if ('error' in response) {
          const errorString = response.error as string
          throw new ItemStatusStateError(errorString)
        }

        // Otherwise, assuming things came back proper, we are no longer updating
        set((state) => {
          const updatingItemIds = state.updatingItemIds.filter((currentId) => currentId !== id)
          return { updatingItemIds }
        })
      } catch (error) {
        set((state) => {
          const savedItemIds = state.savedItemIds.filter((currentId) => currentId !== id)
          const updatingItemIds = state.updatingItemIds.filter((currentId) => currentId !== id)
          return { savedItemIds, updatingItemIds }
        })
      }
    },

    /** State Action — removeStatus */
    removeSave: async (id: string): Promise<void> => {
      try {
        // Removing id from savedItemIds array optimistically
        set((state) => {
          const savedItemIds = state.savedItemIds.filter((currentId) => currentId !== id)
          const updatingItemIds = [...state.updatingItemIds, id]
          return { savedItemIds, updatingItemIds }
        })

        // Send a signal to the server
        // const response = await fetch(`${API_URL}/item-status`, {
        //   method: 'PUT',
        //   body: JSON.stringify({ id })
        // })
        const response = {}

        // If the response is not okay, throw an error which to be handled in the catch statement
        if ('error' in response) {
          const errorString = response.error as string
          throw new ItemStatusStateError(errorString)
        }

        // Otherwise, assuming things came back proper, we are no longer updating
        set((state) => {
          const updatingItemIds = state.updatingItemIds.filter((currentId) => currentId !== id)
          return { updatingItemIds }
        })
      } catch (error) {
        set((state) => {
          return {
            savedItemIds: [...state.savedItemIds, id],
            updatingItemIds: [...state.updatingItemIds, id]
          }
        })
      }
    },

    isSaved: (id: string): boolean => get().savedItemIds.includes(id)
  }))
)

/**
 * ItemStatusStateError
 * ---
 * Custom error for better visual grepping in observability
 */
class ItemStatusStateError extends Error {
  name = 'ItemStatusStateError'
  constructor(message: string) {
    super(message)
    // 👇️ because we are extending a built-in class
    Object.setPrototypeOf(this, ItemStatusStateError.prototype)
  }
}
