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
 */
export function getImageCacheUrl(url, imageSize) {
  if (!url) return
  const { width = '', height = '' } = imageSize || {}
  const resizeParam = imageSize ? `${width}x${height}` : ''
  const encodedURL = encodeURIComponent(url.replace(/'/g, '%27'))
  const urlParam = `${encodedURL}`
  const cacheURL = 'https://pocket-image-cache.com' //direct'
  return `${cacheURL}/${resizeParam}/filters:format(jpg):extract_focal()/${urlParam}`
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
 * determineOpenUrl
 * @param {object} item article item
 * @return {string} url to open based on openExternal, isCollection & default
 */
export function determineOpenUrl(item) {
  const { openExternal, original_url, isCollection, open_url } = item
  if (openExternal) return original_url

  if (isCollection) {
    const path = open_url
    return `/collections/${path.substring(path.lastIndexOf('/') + 1)}`
  }

  return `/read/${item.item_id}`
}
