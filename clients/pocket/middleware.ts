// import { I18N_ROUTER_CONFIG } from '@common/localization'
// import { i18nRouter } from 'next-i18n-router'
import { NextResponse } from 'next/server'
// import type { NextRequest } from 'next/server'

export function middleware() {
  return NextResponse.next()
  // return i18nRouter(request, I18N_ROUTER_CONFIG)
}

// only applies this middleware to files in the app directory
export const config = {
  matcher: '/((?!api|waypoint|static|.*\\..*|_next).*)'
}
