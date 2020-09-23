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
  return `${cacheURL}/${resizeParam}/filters:no_upscale():format(jpg):extract_cover()/${urlParam}`
}

/**
 * DOMAIN FOR URL
 * Get the base domain for a given url
 * @param {url} url Url to get domain from
 * @return {string} parsed domain
 */
export function domainForUrl(url) {
  if (!url) return false
  const match = url.match(
    /^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:/\n?=]+)/im
  )

  return match[1]
}
