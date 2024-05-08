export const DEFAULT_COUNTRY = 'US'

export function getRequestCountry(req: Request): string {
  const value = req.headers['cloudfront-viewer-country']

  if (typeof value === 'string' && value !== 'ZZ') {
    return value
  } else {
    return DEFAULT_COUNTRY
  }
}
