'use server'
import { cookies } from 'next/headers'
import { CACHE_KEY_COLOR_MODE } from '@common/constants'

export async function createThemeCookie(formData: FormData) {
  const selectedTheme = formData.get('theme') as string
  cookies().set({
    name: CACHE_KEY_COLOR_MODE,
    value: selectedTheme,
    maxAge: 34560000,
    path: '/'
  })
}
