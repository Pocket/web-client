const createScript = (url, scriptContent, scriptAttributes = null, isAsync = true) => {
  const script = document.createElement('script')

  if (url) script.src = url
  if (scriptContent) script.text = scriptContent
  if (scriptAttributes) {
    scriptAttributes.forEach((attribute) => {
      script.setAttribute(attribute.name, attribute.value)
    })
  }

  script.async = isAsync
  document.body.appendChild(script)

  return () => document.body.removeChild(script)
}

/**
 * Append a <script> tag to the <body> which loads a script url as its `src` attribute.
 * @param {String} url  url of the script to load
 * @param {Array[Object]}  [scriptAttributes] Array of Objects to add custom attributes
 *  - @property {Object} {name:value, value:value}
 * @param {Boolean} isAsync Set to true to load the script in a non-blocking way
 */
export const injectLibScript = (url, scriptAttributes = null, isAsync = true) => {
  if (!url) throw new Error('injectLibScript() missing required parameter: url')
  createScript(url, null, scriptAttributes, isAsync)
}

/**
 * Append a <script> tag to the <body> and insert JS code to execute within it
 * @param {String} scriptContent  JS code to execute, as a string
 * @param {Boolean} isAsync Set to true to load the script in a non-blocking way
 */
export const injectInlineScript = (scriptContent = null, isAsync = true) => {
  if (!scriptContent)
    throw new Error('injectInlineScript() missing required parameter: scriptContent')
  createScript(null, scriptContent, null, isAsync)
}
