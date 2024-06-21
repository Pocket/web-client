'use server'
import { cookies } from 'next/headers'
import { CACHE_KEY_COLOR_MODE } from '@common/constants'

export async function createThemeCookie(formData: { get: (arg0: string) => any }) {
  const selectedTheme = formData.get('theme')
  cookies().set({
    name: CACHE_KEY_COLOR_MODE,
    value: selectedTheme,
    maxAge: 34560000,
    path: '/'
  })
}
