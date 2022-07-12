const fs = require('fs-extra')
const path = require('path')
const hasha = require('hasha')
const nested = require('postcss-nested')
const postcss = require('postcss')
const cssUrl = require('postcss-url')
const atImport = require('postcss-import')
const cssnano = require('cssnano')

const CDN_PATH = 'https://assets.getpocket.com/web-ui/assets/'
const BASE_PATH = path.resolve(__dirname, '../../')
const VAR_OUTPUT_DIR = path.resolve(BASE_PATH, 'ui/styles')
const CSS_OUTPUT_DIR = path.resolve(BASE_PATH, 'public/static')
const FONT_OUTPUT_DIR = path.resolve(BASE_PATH, 'ui/styles')

/**
 * Color structure is nested, so in order to know what modes are defined
 * this takes the keys from the nested values and returns unique values
 * @param {object} colorModes Color modes used to create semantic color vars
 */
function getModes(colorModes) {
  const colorKeys = Object.keys(colorModes)
  return colorKeys
    .reduce((accumulator, currentValue) => {
      const modes = Object.keys(colorModes[currentValue])
      return [...accumulator, ...modes]
    }, [])
    .filter((value, index, self) => self.indexOf(value) === index)
}

/**
 * Variable Template is used to generate css variables as a string
 * @param {string} colorKey Semantic name for color
 * @param {sting} colorValue Color value
 */
function variableTemplate(colorKey, colorValue, scope) {
  const scopeName = scope ? `${scope}-` : ''
  return `  --${scopeName}${colorKey}: ${colorValue};`
}

/**
 * Build CSS Variables takes the color variable declarations
 * and writes them to a `global-variables.js` file
 *
 * @param {object} colorModes key/value pair of specific modes
 * @example
 * variableName: {
 *  mode: color,
 *  mode2: color
 * }
 * @param {array} supportedModes Array of modes gleaned from `colorModes`
 */
async function buildCSSVariables({
  colorModes,
  supportedModes,
  colorKeys,
  colorPalette,
  colorPaletteKeys,
  sizes,
  typography,
  zIndex,
  borders,
  animations
}) {
  // Create key/value object of semanticName/colors for each mode
  const variableDeclaration = supportedModes.reduce((accumulator, mode) => {
    return {
      ...accumulator,
      [mode]: colorKeys.map((colorKey) => {
        const colorValue = colorModes[colorKey][mode] || 'hotpink'
        return variableTemplate(colorKey, colorValue, 'color')
      })
    }
  }, {})

  // Create variableContent string to write to the css file
  // NOTE: Weird indentation here is by design to keep a clean file.
  let variableContent = ``

  // This builds the variable declarations for modes
  for (let mIndex = 0; mIndex < supportedModes.length; mIndex++) {
    const mode = supportedModes[mIndex]
    variableContent += `.colormode-${mode} {
${variableDeclaration[mode].join(`
`)}
}

`
  }

  variableContent += `:root{
`

  // This builds the variable declarations for color palette
  for (let pIndex = 0; pIndex < colorPaletteKeys.length; pIndex++) {
    const colorKey = colorPaletteKeys[pIndex]
    const colorValue = colorPalette[colorKey]
    variableContent += `${variableTemplate(colorKey, colorValue, 'color')}
`
  }

  // This builds the variable declarations for the font sizes
  const typographyKeys = Object.keys(typography)
  for (let fIndex = 0; fIndex < typographyKeys.length; fIndex++) {
    const typographyKey = typographyKeys[fIndex]
    const typographyValue = typography[typographyKey]
    variableContent += `${variableTemplate(typographyKey, typographyValue, false)}
`
  }

  // This builds the variable declarations for the sizes
  const sizesKeys = Object.keys(sizes)
  for (let sIndex = 0; sIndex < sizesKeys.length; sIndex++) {
    const sizesKey = sizesKeys[sIndex]
    const sizesValue = sizes[sizesKey]
    variableContent += `${variableTemplate(sizesKey, sizesValue, false)}
`
  }

  // This builds the variable declarations for the zIndex
  const zIndexKeys = Object.keys(zIndex)
  for (let index = 0; index < zIndexKeys.length; index++) {
    const zIndexKey = zIndexKeys[index]
    const zIndexValue = zIndex[zIndexKey]
    variableContent += `${variableTemplate(zIndexKey, zIndexValue, false)}
`
  }

  // This builds the variable declarations for border styles
  const bordersKeys = Object.keys(borders)
  for (let index = 0; index < bordersKeys.length; index++) {
    const bordersKey = bordersKeys[index]
    const bordersValue = borders[bordersKey]
    variableContent += `${variableTemplate(bordersKey, bordersValue, false)}
`
  }

  // This builds the variable declarations for animation constants
  const animationKeys = Object.keys(animations)
  for (let index = 0; index < animationKeys.length; index++) {
    const animationKey = animationKeys[index]
    const animationValue = animations[animationKey]
    variableContent += `${variableTemplate(animationKey, animationValue, false)}
`
  }

  variableContent += `
}`

  // Write out the declarations to a file
  fs.writeFileSync(VAR_OUTPUT_DIR + '/global-variables.pcss', variableContent)
}

async function replaceFontImports() {
  const fonts = path.resolve(BASE_PATH, 'ui/fonts/')
  const fontsFile = path.resolve(BASE_PATH, 'ui/fonts/fonts.pcss')
  // css to be processed
  const css = fs.readFileSync(fontsFile, 'utf8')

  // process css
  const output = await postcss([cssUrl])
    .use(
      cssUrl({
        url: (asset) => {
          const source = path.resolve(fonts, asset.pathname)

          // Get the full path of the file
          const extension = path.extname(source)
          const baseName = path.basename(source, extension)

          // Hash the file
          const hash = hasha.fromFileSync(source, {
            algorithm: 'md5',
            digest: 'hex'
          })

          const hashedName = `${baseName}.${hash}${extension}`
          const cdnFile = `${CDN_PATH}${hashedName}`
          return cdnFile
        }
      })
    )
    .process(css, { from: undefined })

  fs.writeFileSync(FONT_OUTPUT_DIR + '/fonts.pcss', output.css)
}

async function replaceReaderFontImports() {
  const fonts = path.resolve(BASE_PATH, 'ui/fonts/')
  const fontsFile = path.resolve(BASE_PATH, 'ui/fonts/fonts-reader.pcss')
  // css to be processed
  const css = fs.readFileSync(fontsFile, 'utf8')

  // process css
  const output = await postcss([cssUrl])
    .use(
      cssUrl({
        url: (asset) => {
          const source = path.resolve(fonts, asset.pathname)

          // Get the full path of the file
          const extension = path.extname(source)
          const baseName = path.basename(source, extension)

          // Hash the file
          const hash = hasha.fromFileSync(source, {
            algorithm: 'md5',
            digest: 'hex'
          })

          const hashedName = `${baseName}.${hash}${extension}`
          const cdnFile = `${CDN_PATH}${hashedName}`
          return cdnFile
        }
      })
    )
    .process(css, { from: undefined })

  fs.writeFileSync(FONT_OUTPUT_DIR + '/fonts-reader.pcss', output.css)
}

async function buildDistribution() {
  const style = path.resolve(BASE_PATH, 'ui/styles/index.pcss')
  // css to be processed
  const css = fs.readFileSync(style, 'utf8')
  // process css
  try {
    const output = await postcss()
      .use(
        atImport({
          plugins: [nested()]
        })
      )
      .use(cssnano())
      .process(css, { from: style })

    fs.writeFileSync(CSS_OUTPUT_DIR + '/pocket-web-ui.css', output.css)
  } catch (err) {
    console.warn(err)
  }
}

/**
 * Compile Variables
 * Builds a css-variables file to import across the front-end properties
 * @param {object} colorModes Color modes used to create semantic color vars
 */
async function compileVariables() {
  const { _colorPalette, _colorModes } = await import(path.resolve(BASE_PATH, 'ui/styles/variables/colors.mjs')) //prettier-ignore
  const { typography } = await import(path.resolve(BASE_PATH, 'ui/styles/variables/typography.mjs')) //prettier-ignore
  const { sizes } = await import(path.resolve(BASE_PATH, 'ui/styles/variables/sizes.mjs'))
  const { zIndex } = await import(path.resolve(BASE_PATH, 'ui/styles/variables/zindex.mjs'))
  const { borders } = await import(path.resolve(BASE_PATH, 'ui/styles/variables/border.mjs'))
  const { animations } = await import(path.resolve(BASE_PATH, 'ui/styles/variables/animations.mjs')) //prettier-ignore

  // Get the supported modes
  const supportedModes = getModes(_colorModes)
  const colorKeys = Object.keys(_colorModes)
  const colorPaletteKeys = Object.keys(_colorPalette)
  await buildCSSVariables({
    colorModes: _colorModes,
    supportedModes,
    colorKeys,
    colorPalette: _colorPalette,
    colorPaletteKeys,
    typography,
    sizes,
    zIndex,
    borders,
    animations
  })

  await replaceFontImports()
  await replaceReaderFontImports()
  buildDistribution()
}

compileVariables()
