import { globby } from 'globby'
import { ensureDir, copy } from 'fs-extra'
import { join, basename, dirname } from 'node:path'

// Source and destination directories
const sourceDir = 'node_modules/legal-docs/'
const destinationDir = join(process.cwd(), '../../clients/web/public/static/docs/legal/')

async function copyLegalDocs() {
  const paths = await globby([`${sourceDir}/**/pocket_*`])

  try {
    for (const filePath of paths) {
      const destinationFolder = join(destinationDir, basename(dirname(filePath)))
      const fileDestination = basename(filePath)
      const copyPath = `${destinationFolder}/${fileDestination}`
      console.log(copyPath)

      await ensureDir(destinationFolder)
      await copy(filePath, copyPath)
    }
    console.log('Legal Docs Copied')
  } catch (err) {
    console.log('There was an issue copying legal documents over', err)
  }
}

copyLegalDocs()
