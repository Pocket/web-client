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

const SVG_INPUT_DIR = 'src/components/icons/svgs'
const JS_OUTPUT_DIR = 'src/components/icons/components'

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

    processSvgs(() => {
      // on success
      console.log('\nℹ️  SVG COMPILATION SUCCESSFUL!  ℹ️\n\n')
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
  console.log('\nℹ️  optimizing & compiling svg icons to components...  ℹ️\n')

  const imports = []
  const originalsSvgs = glob.sync(SVG_INPUT_DIR + '/**/*.svg')
  const config = await loadConfig()

  originalsSvgs.forEach((file, index) => {
    fs.readFile(file, 'utf8', (error, data) => {
      console.log(`${imports.length + 1}/${originalsSvgs.length}: ${file}`)

      if (error) {
        throw error
      }

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
      if (imports.length === originalsSvgs.length) {
        // create icons index file for icon exports
        writeIconsExportFile(imports)

        // format newly created files with prettier
        try {
          execSync(
            'prettier --config ./.prettierrc --write $(find ./src/components/icons -type f \\( -iname \\*.js \\))'
          )
        } catch (error) {
          console.error('\n  ERROR: failed to reformat output with prettier  \n', error)
        }

        onSuccess()
      }
    })
  })
}

/*
 * FILE NAME HELPERS
 **************************************************************************** */

/**
 * Given a string, e.g. `arrow-thin`, convert it to PascalCase to be a component
 * name e.g. `ArrowThin`
 *
 * @param  {String} str Base name to convert.
 * @return {String} The component name.
 */
function getComponentName(str) {
  return str
    .replace(/(\w)(\w*)/g, (g0, g1, g2) => {
      return g1.toUpperCase() + g2.toLowerCase()
    })
    .replace(/-/g, '')
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

  // console.log(`  ✓ ${filename}\n`)
}

/**
 * Writes the icons export file, `src/components/icons/icons.js`, based on the given components.
 *
 * @param {Array.Object} components The components to write out.
 * @param {Array.Object.name} The component's key name to map the component to.
 * @param {Array.Object.path} The component's path for importing the component.
 */
function writeIconsExportFile(components) {
  console.log(`Finishing: writing out ${JS_OUTPUT_DIR}/index.js...`)

  // sort compontents by name
  components.sort((a, b) => {
    if (a.name < b.name) return -1
    if (a.name > b.name) return 1
    return 0
  })

  const fileComment =
    '/**\n *\n * This is a generated file from `.scripts/compile-icons`. DO NOT EDIT.\n *\n */\n\n'
  let exportsString = ''

  components.forEach((component) => {
    let componentName = component.componentName
    exportsString += `export { ${componentName}Icon } from '${component.path}'\n`
  })

  const fileContent = fileComment + exportsString + '\n'

  // Write out the icons export file
  fs.writeFileSync(JS_OUTPUT_DIR + '/icons.js', fileContent)
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
    svg = svg.replace('<svg ', '<svg fill="currentColor"')
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
  var componentString =`
    import {iconStyle} from 'components/icons/_iconStyle'
    import { cx } from 'linaria'
    
    export const ${componentName}Icon = ({ className, ...rest }) => (
      <span className={cx(iconStyle, 'icon', className && className)} {...rest}>
      ${svg}
    </span>)`

  return componentString
}

compileIcons()
