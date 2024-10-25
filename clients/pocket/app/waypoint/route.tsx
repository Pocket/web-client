import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

// Types
import { type NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  // Data available in the expected handler response for a login [access_token, id, type, guid]
  const searchParams = request.nextUrl.searchParams
  const passedAccessToken = searchParams.get('access_token')
  const storedAccessToken = request.cookies.get('accessToken')
  const accessToken = passedAccessToken ?? storedAccessToken?.value ?? false
  const expires = Date.now() + 30 * 24 * 60 * 60 * 1000 // 30 days from now. Will be refreshed

  const storedCookies = await cookies()
  if (accessToken) {
    storedCookies.set({
      expires,
      name: 'accessToken',
      value: accessToken,
      httpOnly: true,
      secure: true,
      path: '/'
    })
  }

  return redirect('/')
}
