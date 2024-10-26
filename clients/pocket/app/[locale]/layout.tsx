import '@ui/styles/pocket/global.css' // This is our base styles

// Constants
import { COLOR_MODE_PREFIX, CACHE_KEY_COLOR_MODE } from '@common/constants'

// Third-Party
import { cookies } from 'next/headers'
// UI
import { NavFooter } from '@ui/components/nav-footer'

import { NavTop } from '@ui/components/nav-top'

// State
import { HydrateUserSettings } from '@common/state/user-settings/hydrate'
// Types
import type { UserSettingsState } from '@common/state/user-settings'
import type { Metadata } from 'next'

// Metadata Defaults
export const metadata: Metadata = {
  title: 'Pocket Future',
  description: 'Building the future of the web'
}

export default async function RootLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode
  params: Promise<{ locale: string }>
}>) {
  // The locale passed in for localization
  const { locale } = await params

  // Gather some stored user settings
  const storedColorMode = await getColorMode()

  // Set up state for hydration
  const userSettingsState: UserSettingsState = { colorMode: storedColorMode }

  return (
    <html lang={locale}>
      <body className={`${COLOR_MODE_PREFIX}-${storedColorMode}`}>
        <NavTop />
        <main>{children}</main>
        <NavFooter locale={locale} />
      </body>
      <HydrateUserSettings state={userSettingsState} />
    </html>
  )
}

async function getColorMode() {
  try {
    const cookieStore = await cookies()
    const storedColorPreference = cookieStore.get(CACHE_KEY_COLOR_MODE)
    const colorMode = storedColorPreference?.value ?? 'system'

    // If the color mode is malformed for some reason
    const validColorMode = ['light', 'dark', 'sepia', 'system'].includes(colorMode)

    return validColorMode ? colorMode : 'system'
  } catch {
    return 'system'
  }
}
