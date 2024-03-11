import path from 'path'
import fs from 'fs-extra'
import { svgoConfig, svgoColorConfig } from './svgo'
import { optimize as svgoOptimize } from 'svgo'

const SVG_DIR = './svgs'
const OUTPUT_DIR = './dist'

type ImportData = {
  name: string
  componentName: string
  path: string
}

async function compileIcons() {
  const imports: ImportData[] = []

  // clear out any generated svg components
  await fs.emptyDir(OUTPUT_DIR)

  // get all svgs
  const files = await fs.readdir(SVG_DIR)

  // for each sfg process it and write a react component
  for (const file of files) {
    const svgStrRaw = await fs.readFile(`${SVG_DIR}/${file}`, 'utf8')

    const baseFileName = path.basename(file, '.svg')
    const componentName = camelcase(baseFileName)
    const jsOutputFilename = `${OUTPUT_DIR}/${componentName}.tsx`
    const importPath = `${OUTPUT_DIR}/${componentName}`
    imports.push({
      name: baseFileName,
      componentName,
      path: importPath
    })

    const config = /-color/.test(baseFileName) ? svgoColorConfig : svgoConfig
    const svgStr = svgoOptimize(svgStrRaw, config).data
    const icon = convertSvgToComponentString(svgStr, componentName)

    fs.writeFile(jsOutputFilename, icon)
  }

  writeIndex(imports)
}

function camelcase(str: string) {
  const camel = str.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase())
  return camel.charAt(0).toUpperCase() + camel.slice(1)
}

function writeIndex(imports: ImportData[]) {
  const importStatements = imports.map(buildImport).join('\n')
  fs.writeFile(
    `${OUTPUT_DIR}/index.ts`,
    `export type IconType = React.ReactElement

  ${importStatements}`
  )
}

function buildImport(component: ImportData) {
  return `export { ${component.componentName}Icon } from './${component.componentName}'`
}

/**
 * convertSvgToComponentString
 * ---
 * Converts an svg to an inline svg, stateless react component.
 * @param  {String} svg The svg to write out as a component.
 * @return {String} The resulting component.
 */
function convertSvgToComponentString(svg: string, componentName: string) {
  // camel case the attributes for react
  svg = svg.replace(/-([a-z]*=\"([^"]*)\")/gi, (s, attr) => {
    return attr.charAt(0).toUpperCase() + attr.slice(1)
  })

  svg = svg.replace(/ariaHidden=/gi, 'aria-hidden=')

  //prettier-ignore
  const componentString = `import type { SVGProps } from "react"

export const ${componentName}Icon = ({className, ...rest}: SVGProps<SVGSVGElement>) => {
  const iconClass = ['icon', className && className].join(' ')
  return (
  ${svg}
)}
  
`

  return componentString
}

compileIcons()
