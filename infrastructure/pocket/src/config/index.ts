const name = 'PocketClient'
const domainPrefix = 'pocket-client'
const isDev = process.env.NODE_ENV === 'development'
const environment = isDev ? 'Dev' : 'Prod'
const domain = isDev ? `${domainPrefix}.getpocket.dev` : `${domainPrefix}.pocket.com`
const assetsPrefix = isDev ? 
    'https://pocket-assets-dev.s3-website-us-east-1.amazonaws.com/pocket' :
 'https://assets.getpocket.com/pocket'

export const config = {
  name,
  prefix: `${name}-${environment}`,
  circleCIPrefix: `/${name}/CircleCI/${environment}`,
  shortName: 'POCCLI',
  environment,
  domain,
  isDev,
  assetsPrefix,
  tags: {
    service: name,
    environment
  }
}
