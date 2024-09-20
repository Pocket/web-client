const name = 'WebClient'
const domainPrefix = 'web-client'
const isDev = process.env.NODE_ENV === 'development'
const environment = isDev ? 'Dev' : 'Prod'
const domain = isDev ? `${domainPrefix}.getpocket.dev` : `${domainPrefix}.getpocket.com`
const assetsPrefix = isDev ? 'https://pocket-assets-dev.s3-website-us-east-1.amazonaws.com/web-client' : 'https://assets.getpocket.com/web-client'

export const config = {
  name,
  prefix: `${name}-${environment}`,
  circleCIPrefix: `/${name}/CircleCI/${environment}`,
  shortName: 'WEBCLI',
  environment,
  domain,
  isDev,
  assetsPrefix,
  tags: {
    service: name,
    environment
  }
}
