/**
 * CHECK EXTERNAL
 * @param {object} feedItem An unreliable item returned from a v3 feed endpoint
 * @returns {bool} whether to open an item in a new tab
 */
export function checkExternal(item) {
  if (item?.has_video === '2') return false
  if (item?.has_image === '2') return false
  if (item?.is_article === '1') return false
  return true
}
