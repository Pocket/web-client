// Libraries
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

// Types
export type UserSettingsState = {
  colorMode: string
}

export type UserSettings = {
  updateColorMode: (colorMode: string) => void // Action to update theme
} & UserSettingsState

/**
 * useUserSettings
 * ---
 * The state for user settings
 * @function updateTheme — update color theme of the app
 */
export const useUserSettings = create<UserSettings>()(
  devtools((set) => ({
    /** State Values */
    colorMode: 'system',

    /** State Action — updateTheme */
    updateColorMode: async (colorMode: string): Promise<void> => {
      try {
        set({ colorMode })
      } catch (error) {
        console.warn(error)
        set({ colorMode: 'system' })
      }
    }
  }))
)
