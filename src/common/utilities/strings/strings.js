export function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export function actionToCamelCase(action) {
  var lowerCaseAction = action.toLowerCase()
  return lowerCaseAction.split('_').reduce((s, c) => s + (c.charAt(0).toUpperCase() + c.slice(1)))
}
