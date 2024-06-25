const name = 'WebClient'
const domainPrefix = 'web-client'
const isDev = process.env.NODE_ENV === 'development'
const environment = isDev ? 'Dev' : 'Prod'
const domain = isDev ? `${domainPrefix}.getpocket.dev` : `${domainPrefix}.getpocket.com`

export const config = {
  name,
  prefix: `${name}-${environment}`,
  circleCIPrefix: `/${name}/CircleCI/${environment}`,
  shortName: 'WEBCLI',
  environment,
  domain,
  isDev,
  tags: {
    service: name,
    environment
  }
}
