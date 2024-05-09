import type { UserConfig } from 'next-i18next'

export interface LocalizedProps {
  _nextI18Next?: {
    initialI18nStore: unknown
    initialLocale: string
    ns: string[]
    userConfig: UserConfig | null
  }
}
