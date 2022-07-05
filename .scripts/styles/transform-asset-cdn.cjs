const path = require('path')
const fs = require('fs-extra')
const resolve = require('resolve')
const hasha = require('hasha')

const cdnPath = 'https://assets.getpocket.com/web-ui/assets/'

module.exports = function({ template }) {
  const assetRegEx = /\.(svg|ico|jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|cur|ani|pdf)(\?.*)?$/
  const cdnDeclaration = template(`const IDENTIFIER = "SOURCE";`)

  return {
    name: 'pocket-asset-transmogrifier',
    manipulateOptions(opts) {
      if (opts.filename === undefined) opts.filename = 'unknown'
    },
    pre(state) {
      const { filename, cwd } = state.opts
      const currentFile = filename
      const fileDir = path.dirname(currentFile)
      const assetDirectory = path.resolve(cwd, '.asset-cache')
      this.fileinfo = { currentFile, fileDir, assetDirectory }
      this.lastImport
    },
    visitor: {
      Program(path, state) {
        // Get the last import in the file
        const lastImport = path
          .get('body')
          .filter(p => p.isImportDeclaration())
          .pop()
        if (lastImport) state.lastImport = lastImport
      },
      ImportDeclaration(importPath, state) {
        // prettier-ignore
        const { node: { value: source } } = importPath.get("source");
        const { currentFile, assetDirectory } = this.fileinfo

        // Test that this is a singular asset (image, font, icon, etc.)
        if (assetRegEx.test(source)) {
          let importName
          // Get the specifier `import <specifier> from <source>`
          const importSpecifierPaths = importPath.get('specifiers')
          for (const importSpecifierPath of importSpecifierPaths) {
            const node = importSpecifierPath.node
            const id = node.local
            importName = id.name
          }

          // Get the full path of the file
          const extension = path.extname(source)
          const baseName = path.basename(source, extension)
          const filePath = resolve.sync(source, {
            basedir: path.dirname(currentFile),
          })

          // Hash the file
          const hash = hasha.fromFileSync(filePath, {
            algorithm: 'md5',
            digest: 'hex',
          })
          const hashedName = `${baseName}.${hash}${extension}`
          const destination = `${assetDirectory}/${hashedName}`
          fs.copySync(filePath, destination)

          // Replace the import with a const declaration to the CDN
          const cdnFile = `${cdnPath}${hashedName}`

          const constDeclaration = cdnDeclaration({
            IDENTIFIER: importName,
            SOURCE: cdnFile,
          })

          state.lastImport.insertAfter(constDeclaration)

          // Remove the import statement
          importPath.remove()
        }
      },
    },
  }
}
