import { setupServer } from 'msw/node'

import { defaultHandlers } from './handlers'

// Setup requests interception using the given handlers.
export const server = setupServer(...defaultHandlers)
