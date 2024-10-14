import { i18n } from './setup/test-i18n'
import { I18nextProvider } from 'react-i18next'

import type { PropsWithChildren, ReactElement } from 'react'

export function localeWrapper({ children }: PropsWithChildren<NonNullable<unknown>>): JSX.Element {
  return (
    <I18nextProvider i18n={i18n}>
      {children}
    </I18nextProvider>
  )
}