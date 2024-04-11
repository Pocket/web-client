// Libraries
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

import { arrayToObject } from '@common/utilities/object-array'

// Types
import type { Item } from '@common/types'

export type ItemDisplayState = {
  itemsById: ItemsById
}

export type ItemsById = {
  [key: string]: Item
}

export type ItemDisplay = {
  addDisplayItems: (items: Item[]) => string
  removeDisplayItems: (ids: string[]) => string
  clearDisplayItem: () => void
} & ItemDisplayState

/**
 * useItemDisplay
 * ---
 * The state for item display
 * @function addDisplayItems — Action to add display items
 * @function removeDisplayItems — Action to remove display items
 * @function clearDisplayItem — Action to remove display items
 */
export const useItemDisplay = create<ItemDisplay>()(
  devtools((set) => ({
    /** State Values */
    itemsById: {},

    /** State Actions */
    addDisplayItems: (items: Item[]): string => {
      try {
        const itemsById = arrayToObject(items, 'id')
        // Adding DisplayItems to state view
        set((state) => ({ ...state, itemsById: { ...state.itemsById, ...itemsById } }))
        return 'ok'
      } catch (error) {
        return 'error'
      }
    },
    removeDisplayItems: (ids: string[]): string => {
      try {
        console.log(ids)
        set({ itemsById: {} })
        return 'ok'
      } catch (error) {
        return 'error'
      }
    },
    clearDisplayItem: (): void => {
      set({ itemsById: {} })
    }
  }))
)

/**
 * ItemDisplayStateError
 * ---
 * Custom error for better visual grepping in observability
 */
// class ItemDisplayStateError extends Error {
//   name = 'ItemDisplayStateError'
//   constructor(message: string) {
//     super(message)
//     // because we are extending a built-in class
//     Object.setPrototypeOf(this, ItemDisplayStateError.prototype)
//   }
// }
