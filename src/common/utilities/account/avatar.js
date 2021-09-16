export const enforceDefaultAvatar = (avatarUrl = '') => {
  const DISALLOWED_PROFILE_IMGS = ['profileBlue.png'] // file names of default urls returned by BE. If a user avatar url contains one of these, we prefer to return an empty string, in order to use the Web UI's Avatar default image instead
  const hasInvalidDefaultImage = DISALLOWED_PROFILE_IMGS.reduce((isAvatarOk, disallowedImg) => {
    if (!avatarUrl) return true // handle null
    if (isAvatarOk === false) return isAvatarOk

    return avatarUrl.includes(disallowedImg)
  }, true)

  return hasInvalidDefaultImage ? '' : avatarUrl
}
