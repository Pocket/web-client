import queryString from 'query-string'

/**
 * When a user leaves getpocket.com to an external article we route them through
 * our redirect service
 * @param  {String} url an article url
 * @return {String}     a uri encoded url pointed at our pocket redirect endpoint
 */
export function urlWithPocketRedirect(url) {
  return `https://getpocket.com/redirect?url=${encodeURIComponent(url)}`
}

/**
 * GET IMAGE CACHE URL
 * @param {string} url Url of image we want to get from the image cache
 * @param {object} imageSize {width:value, height:value} @optional
 * @param {string} passedFormat format you would like the image to be, defaults to jpg @optional
 */
export function getImageCacheUrl(url, imageSize, passedFormat) {
  if (!url) return
  const format = passedFormat || 'jpg'
  const { width = '', height = '' } = imageSize || {}
  const resizeParam = imageSize ? `${width}x${height}` : ''
  const cacheURL = 'https://pocket-image-cache.com' //direct'

  const urlCheck = /^https:\/\/pocket-image-cache\.com\//
  const isEncoded = url.match(urlCheck)

  // If we have an encoded url we make sure it meets parameters, but don't double encode
  if (isEncoded) {
    const { urlToUse, originalDimensions } = extractImageCacheUrl(url)
    const dimensions = imageSize ? resizeParam : originalDimensions || ''
    return `${cacheURL}/${dimensions}/filters:format(${format}):extract_focal()/${urlToUse}`
  }

  // Otherwise encode the image
  const urlToUse = `${encodeURIComponent(url.replace(/'/g, '%27'))}`
  return `${cacheURL}/${resizeParam}/filters:format(${format}):extract_focal()/${urlToUse}`
}

/**
 * This extracts original url if they are pre-encoded as well as dimensions
 * REGEX for extractions: https://regexr.com/6b8j4
 * @param {string} url
 * @returns {object} urlToUse, dimensions
 */
export function extractImageCacheUrl(url) {
  const cachedUrlTest = /(?:^https:\/\/pocket-image-cache\.com\/)(?:((?:[0-9]+)?x(?:[0-9]+)?)?\/filters:format\((?:jpe?g|png|webp)\):extract_focal\(\)\/)(.+)/ //prettier-ignore
  const match = url.match(cachedUrlTest)
  return {
    originalDimensions: match ? match[1] : '',
    urlToUse: match ? match[2] : url
  }
}

/**
 * DOMAIN FOR URL
 * Get the base domain for a given url
 * @param {url} url Url to get domain from
 * @return {string} parsed domain
 */
export function domainForUrl(url) {
  if (!url) return false
  const match = url.match(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:/\n?=]+)/im)

  return match[1]
}

/**
 * getTopLevelPath
 * @param {string} path to grab first chain (base) from
 * @return {string} base path `/some/long/url` returns `some`
 */
export function getTopLevelPath(path) {
  return path?.split('/')[1]
}

/**
 * urlWithPermanentLibrary
 * @param {string} item_id of the article
 * @return {string} url pointed at the permanent library item
 */
export function urlWithPermanentLibrary(item_id) {
  return `https://getpocket.com/library/?pl_i=${item_id}`
}

/**
 * Clear UTM values from a url while preserving other query params
 * @param {string} url
 */
export function replaceUTM(passedUrl, source) {
  if (!passedUrl) return false
  if (/(craigslist\.(org|com))/.test(passedUrl)) return passedUrl

  const { url, query, fragmentIdentifier } = queryString.parseUrl(passedUrl)
  delete query.utm_medium //	Identifies what type of link was used, such as cost per click or email.	utm_medium=cpc
  delete query.utm_campaign //	Identifies a specific product promotion or strategic campaign.	utm_campaign=spring_sale
  delete query.utm_term //	Identifies search terms.	utm_term=running+shoes
  delete query.utm_content //Identifies what specifically was clicked to bring the user to the site, such as a banner ad or a text link. It is often used for A/B testing and content-targeted ads.

  query.utm_source = source ? source : null //	Identifies which site sent the traffic, and is a required parameter.	utm_source=google

  return queryString.stringifyUrl({ url, query, fragmentIdentifier }, { skipNull: true })
}

/**
 * Check whether a string is valid HTTP || HTTPS URL
 * @param {string} url
 */
export function isValidHttpUrl(string) {
  try {
    const url = new URL(string)
    return url.protocol === 'http:' || url.protocol === 'https:'
  } catch (_) {
    return false
  }
}
