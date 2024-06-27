export type PocketRequest = {
  path: string
  method: 'POST' | 'GET'
  body: string
}

export function pocketRequest({ path, method = 'GET' }: PocketRequest) {
  const API_URL = 'https://getpocket.com/graphql'
}
