// Braze methods: https://js.appboycdn.com/web-sdk/latest/doc/modules/braze.html
const noop = function () {}

const initialize = noop
const openSession = noop
const automaticallyShowInAppMessages = noop
const changeUser = noop
const wipeData = noop
const showInAppMessage = noop
const requestPushPermission = noop
const isPushBlocked = noop
const isPushPermissionGranted = noop
const isDisabled = noop
const disableSDK = noop
const enableSDK = noop
const destroy = noop
const setSdkAuthenticationSignature = noop
const subscribeToSdkAuthenticationFailures = noop
const logFeatureFlagImpression = noop
const getFeatureFlag = noop
const getAllFeatureFlags = noop

export {
  initialize,
  openSession,
  automaticallyShowInAppMessages,
  changeUser,
  wipeData,
  showInAppMessage,
  requestPushPermission,
  isPushBlocked,
  isPushPermissionGranted,
  isDisabled,
  disableSDK,
  enableSDK,
  destroy,
  setSdkAuthenticationSignature,
  subscribeToSdkAuthenticationFailures,
  logFeatureFlagImpression,
  getFeatureFlag,
  getAllFeatureFlags
}
