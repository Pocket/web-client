const fs = require('fs-extra')
const path = require('path')
const rollupPkg = require('rollup')
const linaria = require('linaria/rollup')
const css = require('rollup-plugin-css-only')
const babel = require('@babel/core')
const { rollup } = rollupPkg

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
  // Wierd indentation here is by design to keep a clean file.
  let variableContent = `/* eslint-disable */
/**
 * WARNING! DO NOT EDIT
 * This is a generated file from scripts/compile-colors.  Make
 * any changes to rules in that file and run \`npm compile:styles\`
 **/

import { css } from 'linaria'

export const GlobalVariables = css\`
  :global() {
`
  // This builds the variable declarations for modes
  for (let mIndex = 0; mIndex < supportedModes.length; mIndex++) {
    const mode = supportedModes[mIndex]
    variableContent += `    .colormode-${mode} {
    ${variableDeclaration[mode].join(`
    `)}
    }

`
  }

  variableContent += `  :root{
`

  // This builds the variable declarations for color palette
  for (let pIndex = 0; pIndex < colorPaletteKeys.length; pIndex++) {
    const colorKey = colorPaletteKeys[pIndex]
    const colorValue = colorPalette[colorKey]
    variableContent += `  ${variableTemplate(colorKey, colorValue, 'color')}
`
  }

  // This builds the variable declarations for the font sizes
  const typographyKeys = Object.keys(typography)
  for (let fIndex = 0; fIndex < typographyKeys.length; fIndex++) {
    const typographyKey = typographyKeys[fIndex]
    const typographyValue = typography[typographyKey]
    variableContent += `  ${variableTemplate(typographyKey, typographyValue, false)}
`
  }

  // This builds the variable declarations for the sizes
  const sizesKeys = Object.keys(sizes)
  for (let sIndex = 0; sIndex < sizesKeys.length; sIndex++) {
    const sizesKey = sizesKeys[sIndex]
    const sizesValue = sizes[sizesKey]
    variableContent += `  ${variableTemplate(sizesKey, sizesValue, false)}
`
  }

  // This builds the variable declarations for the zIndex
  const zIndexKeys = Object.keys(zIndex)
  for (let index = 0; index < zIndexKeys.length; index++) {
    const zIndexKey = zIndexKeys[index]
    const zIndexValue = zIndex[zIndexKey]
    variableContent += `  ${variableTemplate(zIndexKey, zIndexValue, false)}
`
  }

  // This builds the variable declarations for border styles
  const bordersKeys = Object.keys(borders)
  for (let index = 0; index < bordersKeys.length; index++) {
    const bordersKey = bordersKeys[index]
    const bordersValue = borders[bordersKey]
    variableContent += `  ${variableTemplate(bordersKey, bordersValue, false)}
`
  }

  // This builds the variable declarations for animation constants
  const animationKeys = Object.keys(animations)
  for (let index = 0; index < animationKeys.length; index++) {
    const animationKey = animationKeys[index]
    const animationValue = animations[animationKey]
    variableContent += `  ${variableTemplate(animationKey, animationValue, false)}
`
  }

  variableContent += `
    }
  }
\`
`
  // Write out the declarations to a file
  fs.writeFileSync(VAR_OUTPUT_DIR + '/global-variables.js', variableContent)
}

async function replaceFontImports() {
  const fontsFile = path.resolve(BASE_PATH, 'ui/fonts/fonts.js')
  const fontsReaderFile = path.resolve(BASE_PATH, 'ui/fonts/fonts-reader.js')
  const configFile = path.resolve(__dirname, './.babelrc')
  const fontsTransformed = babel.transformFileSync(fontsFile, { configFile }) // => { code, map, ast }
  const { code: fonts } = fontsTransformed

  const readerFontsTransformed = babel.transformFileSync(fontsReaderFile, { configFile }) // => { code, map, ast }
  const { code: fontsReader } = readerFontsTransformed

  return { fonts, fontsReader }
}

async function buildDistribution() {
  const bundle = await rollup({
    cache: false,
    input: path.resolve(BASE_PATH, 'ui/styles/index.js'),
    onwarn: () => {}, // We don't much care for warnings once it is working as expected
    plugins: [linaria(), css()],
    external: ['linaria']
  })

  const { output } = await bundle.generate({
    file: 'pocket-web-ui',
    format: 'es'
  })

  // We want the css source and since we aren't too complicated we can assume it is second and
  // grab the source from that 1 — jsBundle (ignored) 2 — css
  const cssSource = output[1].source

  fs.writeFileSync(CSS_OUTPUT_DIR + '/pocket-web-ui.css', cssSource)
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

  const { fonts, fontsReader } = await replaceFontImports()
  fs.writeFileSync(FONT_OUTPUT_DIR + '/fonts.js', fonts)
  fs.writeFileSync(FONT_OUTPUT_DIR + '/fonts-reader.js', fontsReader)

  buildDistribution()
}

compileVariables()
