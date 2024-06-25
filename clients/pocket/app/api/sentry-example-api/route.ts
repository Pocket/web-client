import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

// A faulty API route to test Sentry's error monitoring
export function GET() {
  throw new CustomExampleError('Sentry Example API Route Error')
  return NextResponse.json({ data: 'Testing Sentry Error...' })
}

/**
 * CustomExampleError
 * ---
 * Custom error for better visual grepping in observability
 */
class CustomExampleError extends Error {
  name = 'CustomExampleError'
  constructor(message: string) {
    super(message)
    // because we are extending a built-in class
    Object.setPrototypeOf(this, CustomExampleError.prototype)
  }
}
