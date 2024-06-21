import '@ui/styles/pocket/global.css' // This is our base styles

import type { Metadata } from 'next'
import { NavFooter } from '@ui/components/nav-footer'
import { NavTop } from '@ui/components/nav-top'
import { COLOR_MODE_PREFIX, CACHE_KEY_COLOR_MODE } from '@common/constants'
import { cookies } from 'next/headers'

export const metadata: Metadata = {
  title: 'Pocket Future',
  description: 'Building the future of the web'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const colorMode = getColorMode()
  return (
    <html lang="en" className={`${COLOR_MODE_PREFIX}-${colorMode}`}>
      <body>
        <NavTop />
        <main>{children}</main>
        <NavFooter />
      </body>
    </html>
  )
}

function getColorMode() {
  try {
    const cookieStore = cookies()
    const storedColorPreference = cookieStore.get(CACHE_KEY_COLOR_MODE)
    const colorMode = storedColorPreference?.value ?? 'system'

    // If the color mode is malformed for some reason
    const validColorMode = ['light', 'dark', 'sepia', 'system'].includes(colorMode)

    return validColorMode ? colorMode : 'system'
  } catch (err) {
    return 'system'
  }
}
