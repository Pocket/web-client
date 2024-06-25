const name = 'PocketClient'
const domainPrefix = 'pocket-client'
const isDev = process.env.NODE_ENV === 'development'
const environment = isDev ? 'Dev' : 'Prod'
const domain = isDev ? `${domainPrefix}.getpocket.dev` : `${domainPrefix}.pocket.com`

export const config = {
  name,
  prefix: `${name}-${environment}`,
  circleCIPrefix: `/${name}/CircleCI/${environment}`,
  shortName: 'POCCLI',
  environment,
  domain,
  isDev,
  tags: {
    service: name,
    environment
  }
}
