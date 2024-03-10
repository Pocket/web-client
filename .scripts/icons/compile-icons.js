#!/usr/bin/env node
/* eslint-disable */

/**
 * Usage: npm run build:compile-icons
 * (or, import/require this file as a function)
 *
 * Optimizes and compiles SVG icons from `public/assets/icons` into React components.
 * Produces individual SVG icon components that are wrapped in an `Icon` HOC that
 * provides styling. All Icon components are exported through a single file.
 **/

const fs = require('fs-extra')
const { execSync } = require('child_process')
const glob = require('fast-glob')
const path = require('path')
const { optimize, loadConfig } = require('svgo')
const cliProgress = require('cli-progress')

const ICON_DIRECTORY = 'ui/icons'
const SVG_INPUT_DIR = 'ui/icons/svgs'
const JS_OUTPUT_DIR = 'src/components/icons'

const copyOptions = {
  filter: (path) => /^[^.]+$/g.test(path)
}

function compileIcons() {
  // clear out any generated svg components
  fs.emptyDirSync(`${JS_OUTPUT_DIR}`)

  // copy and process each svg source file
  fs.copy(SVG_INPUT_DIR, JS_OUTPUT_DIR, copyOptions, (error) => {
    if (error) {
      return console.error(error)
    }

    processSvgs(buildStory)
  })
}

function buildImport(component) {
  return `import { ${component.componentName}Icon } from './${component.componentName}Icon.js'`
}

function buildStory(imports) {
  const importStatements = imports.map(buildImport).join('\n')
  const componentsArray = imports
    .map((component) => `${component.componentName}Icon`)
    .sort()
    .join(',')

  fs.readFile(`${ICON_DIRECTORY}/_story-template.js`, 'utf8', function (err, data) {
    if (err) return console.log(err)

    const importResults = data.replace(/\/\*ICONS_IMPORTS\*\//g, importStatements)
    const result = importResults.replace(/\/\*ICONS_ARRAY\*\//g, componentsArray)

    fs.writeFile(`${JS_OUTPUT_DIR}/_icons.story.js`, result, 'utf8', function (err) {
      if (err) return console.log(err)
    })
  })
}

/*
 * PROCESS SVGS
 **************************************************************************** */

/**
 * Process the svgs into inline svg components
 */
const processSvgs = async function (onSuccess) {
  console.log('\nOptimizing & compiling svg icons to components...\n')

  const imports = []
  const originalsSvgs = glob.sync(SVG_INPUT_DIR + '/**/*.svg')
  const config = await loadConfig()
  const progressBar = new cliProgress.Bar({
    barCompleteChar: '•',
    barIncompleteChar: '_',
    format: 'Building Icons: {percentage}%' + ' — ' + '{bar}',
    fps: 30,
    stream: process.stdout,
    barsize: 30
  })
  progressBar.start(originalsSvgs.length, 0)

  originalsSvgs.forEach((file, index) => {
    fs.readFile(file, 'utf8', (error, data) => {
      if (error) throw error

      const baseFileName = path.basename(file, '.svg')
      const componentName = camalize(baseFileName)
      const jsOutputFilename = `${JS_OUTPUT_DIR}/${componentName}Icon.js`
      const importPath = `./${componentName}Icon`

      imports.push({
        name: baseFileName,
        componentName,
        path: importPath
      })

      const result = optimize(data, config)

      let svg = result.data

      svg = replaceColors(svg)

      // create icon component file
      writeComponentFile(jsOutputFilename, svg, componentName)

      // if we've reached the last file - each file is processed by svgo
      // asynchronously, so we check if this is the last to complete, then wrap up
      if (imports.length === originalsSvgs.length) onSuccess(imports)
    })
    progressBar.increment()
  })

  fs.copy(`${ICON_DIRECTORY}/_iconStyle.js`, `${JS_OUTPUT_DIR}/_iconStyle.js`, (err) => {
    if (err) return console.error(err)
    progressBar.stop()
  })
}

/*
 * WRITE FILES
 **************************************************************************** */

/**
 * Writes out a given svg to a component file.
 *
 * @param {String} filename File path and name to write out to.
 * @param {String} svg      The svg to write out as a js file.
 */
function writeComponentFile(filename, svg, componentName) {
  // Write out the js file
  fs.writeFileSync(filename, convertSvgToComponentString(svg, componentName))
}

var camalize = function camalize(str) {
  const camel = str.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase())
  return camel.charAt(0).toUpperCase() + camel.slice(1)
}

/*
 * SVG HELPERS
 **************************************************************************** */

/**
 * Replace all preset fill colors with "currentColor", which will allow CSS "color" overrides
 *
 * @param  {String} svg The svg to replace the colors with "currentColor".
 * @return {String} The result.
 */
function replaceColors(svg) {
  // Replace all preset fill colors with "currentColor", which will allow CSS "color" overrides
  svg = svg.replace(/fill="#[0-9a-f]{3,6}"/gi, 'fill="currentColor"')
  svg = svg.replace(/stroke="#[0-9a-f]{3,6}"/gi, 'stroke="currentColor"')

  const hasFillColor = /\<svg(.*)fill=(.+?)\>/g.test(svg)
  if (!hasFillColor) {
    svg = svg.replace('<svg ', '<svg fill="currentColor" ')
  }

  return svg
}

/**
 * Converts an svg to an inline svg, stateless react component.
 *
 * @param  {String} svg The svg to write out as a component.
 * @return {String} The resulting component.
 */
function convertSvgToComponentString(svg, componentName) {
  svg = svg.replace(/xlink:href/g, 'xlinkHref')
  svg = svg.replace(/xmlns:xlink/g, 'xmlnsXlink')

  // camel case the attributes for react
  svg = svg.replace(/-([a-z]*=\"([^"]*)\")/gi, (s, attr) => {
    return attr.charAt(0).toUpperCase() + attr.slice(1)
  })

  svg = svg.replace(/ariaHidden=/gi, 'aria-hidden=')

  //prettier-ignore
  var componentString = `import { iconStyle } from 'components/icons/_iconStyle'
import { cx } from '@emotion/css'

export const ${componentName}Icon = ({ className, ...rest }) => (
  <span className={cx(iconStyle, 'icon', className && className)} {...rest}>
    ${svg}
  </span>
)
  
`

  return componentString
}

compileIcons()
