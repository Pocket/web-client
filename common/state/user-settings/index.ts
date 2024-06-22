// Libraries
import { CACHE_KEY_COLOR_MODE } from '@common/constants'
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
        createThemeCookie(colorMode)
      } catch (error) {
        console.warn(error)
        set({ colorMode: 'system' })
      }
    }
  }))
)

/**
 * createThemeCookie
 * ---
 * This is just a temporary cookie store. In the real world this will be:
 *
 * a) A server action ... if testing and version all align correctly
 * during a waxing gibbous blood moon
 *
 * OR
 *
 * b) An api call so the cookie can be set on the server properly
 */
export function createThemeCookie(colorMode: string) {
  if (document) {
    document.cookie = `${CACHE_KEY_COLOR_MODE}=${colorMode}; SameSite=Lax; Secure`
  }
  // const selectedTheme = formData.get('theme') as string
  // cookies().set({
  //   name: CACHE_KEY_COLOR_MODE,
  //   value: selectedTheme,
  //   maxAge: 34560000,
  //   path: '/'
  // })
}
