import { server } from './server'

beforeAll(() => {
  // Enable the mocking in tests.
  server.listen()

  // Comment on unhandled events
  server.events.on('request:unhandled', ({ request }) => {
    console.warn('Found an unhandled %s request to %s', request.method, request.url)
  })
})

afterEach(() => {
  // Reset any runtime handlers tests may use.
  server.resetHandlers()
})

afterAll(() => {
  // Clean up once the tests are done.
  server.close()
})
