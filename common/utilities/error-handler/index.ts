import type { ResponseError } from '@common/types'

/**
 * https://kentcdodds.com/blog/get-a-catch-block-error-message-with-typescript
 * ---
 * This helps us have a bit more utility when trying to catch an error with TS
 */
type ErrorWithMessage = {
  message: string
}

function isErrorWithMessage(error: unknown): error is ErrorWithMessage {
  return (
    typeof error === 'object' &&
    error !== null &&
    'message' in error &&
    typeof (error as Record<string, unknown>).message === 'string'
  )
}

function toErrorWithMessage(maybeError: unknown): ErrorWithMessage {
  if (isErrorWithMessage(maybeError)) return maybeError

  try {
    return new Error(JSON.stringify(maybeError))
  } catch {
    // fallback in case there's an error stringifying the maybeError
    // like with circular references for example.
    return new Error(String(maybeError))
  }
}

/**
 * getErrorMessage
 * ---
 * Takes a nebulous error and tries to discern what information is available,
 * then return a string with useful information
 */
export function getErrorMessage(error: unknown) {
  return toErrorWithMessage(error).message
}

export function isError<T extends object>(response: T | ResponseError): response is ResponseError {
  return 'responseError' in response
}
