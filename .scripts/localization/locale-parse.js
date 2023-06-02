import chalk from 'chalk'
import enquirer from 'enquirer'
import fs from 'fs-extra'
import fetch from 'isomorphic-unfetch'
import simpleGit from 'simple-git'
import { transform as i18nTransform } from 'i18next-parser'
import vfs from 'vinyl-fs'
import sort from 'gulp-sort'
import path from 'path'
import parserConfig from '../../i18next-parser.config.js'
import crypto from 'crypto'

const git = simpleGit()
const { pathExists, outputJson, emptyDir } = fs
const { Select, prompt } = enquirer

// Constants
const LOCALIZATION_REPO = 'https://github.com/Pocket/web-localization'
const LOCALIZATION_REPO_TEST = /https\:\/\/([\w\d]+@)?github.com\/Pocket\/web-localization(\.git)?/
const CONFIG = './.scripts/localization/config.json'
const DEFAULT_REPO_LOCAION = '../web-localization/'
const GITHUB_API_URL = 'https://api.github.com'

/**
 * Process localization organizes the logic and takes the user through
 * the steps to parse the files to find new localizations based on updates
 * that include <Trans> or t()
 */
async function processLocalization() {
  try {
    // Check for a preferences file first
    const configExists = await pathExists(CONFIG)

    // Grab our settings
    const settings = configExists ? await fs.readJson(CONFIG) : {}
    let { location = DEFAULT_REPO_LOCAION } = settings

    // Make sure we have a token stored in our config
    const token = settings.token ? settings.token : await setToken(settings)

    // Does the repo exists and is valid
    const isValidLocation = await validateRepo(location)

    // If the location is valid set up the repo
    location = isValidLocation ? location : await setupRepo(location, settings)

    // Update our repo
    await updateRepo()

    // Set up branch we want to commit these to
    const branchName = await setBranch()

    // Extract any new strings and add them to a new branch
    const changedFiles = await parseLocalizationChanges(location, token)

    // Commit changes to the proper branch
    if (changedFiles.length) await commitChanges(changedFiles, branchName, location)

    // Push changes if you want
    await pushChanges(branchName, location)

    // Go ahead and submit PR if one does not already exist
    await submitPR(token, branchName, changedFiles)
  } catch (error) {
    console.warn(chalk.red(error))
  }
}

/**
 * validateRepo makes sure the current location we have set is a valid repo
 * The user has the option to locate the repo if they don't want to clone it
 * into the default location relative to the repo this is being run in
 * @param {string} location: Location of cloned repo
 */
async function validateRepo(location) {
  // Validating our repo
  console.log('')
  console.log(chalk.blue(`Validating localization at: ${location}`))

  // First we check if the folder even exists
  const folderExists = await pathExists(location)

  // If the folder does not exists the repo is not valid
  if (!folderExists) return false

  // Here we are setting our instance of git to the proper location
  await git.cwd(location)

  // Check if the location provided is actually a repo
  const isRepo = await git.checkIsRepo()

  // If it is a repo, get some more details and confirm it's the localization repo
  const listConfig = await git.listConfig()
  const { 'remote.origin.url': remoteUrl } = listConfig.values['.git/config']
  return isRepo && LOCALIZATION_REPO_TEST.test(remoteUrl)
}

/**
 * setupRepo is called if no repo exists or that repo is invalid.
 * It gives the user the option to clone a fresh copy of the repo, or locate
 * a previously checked out version
 * @param {string} location: Location of cloned repo
 */
async function setupRepo(location, settings) {
  try {
    const selectInitOption = new Select({
      name: 'repo-status',
      message: `How should we setup web-localization?`,
      choices: ['Locate my copy', 'Clone the repo', 'Cancel']
    })
    const answer = await selectInitOption.run()

    switch (answer) {
      case 'Locate my copy': {
        return locateRepo(settings)
      }

      case 'Clone the repo': {
        return cloneRepo(location, settings)
      }

      default: {
        console.log('Bye!')
        process.exit(0)
      }
    }
  } catch (error) {
    console.warn(chalk.red(error))
  }
}

/**
 * locateRepo is called when the user wants to locate a previously checked out
 * version of the repo. It does some additional validation and provides some
 * feedback if it can't complete the task
 */
async function locateRepo(settings) {
  try {
    const { location } = await prompt({
      type: 'input',
      name: 'location',
      message: 'Where is your repo relative to this one?'
    })

    if (!location.length) throw new Error('Must be a separate repo.')
    const locationExists = await pathExists(location)

    if (!locationExists) throw new Error('Not a valid location')

    // Write preferences to file
    await outputJson(CONFIG, { ...settings, location: location })
    console.log(`Setting localization repo to ${location}`)

    const isValid = validateRepo(location)
    if (!isValid) throw new Error('Not a valid repo')

    return location
  } catch (error) {
    console.log('')
    console.log(chalk.magenta(`Oops — Can't find or access ${chalk.red(error.path)}`))
    console.log(
      `Try cloning the repo manually from ${chalk.blue(
        localizationRepo
      )} into the same parent directory as the current repo.`
    )
    process.exit(0)
  }
}

/**
 * cloneRepo is called to clone a fresh copy of the repo into the default
 * location relative to the repo this is being run in (../web-localization)
 * @param {string} location: Location of cloned repo
 */
async function cloneRepo(location, settings) {
  try {
    await emptyDir(location)
    await git.cwd(location)

    console.log(`Checking out localization to ${location}`)
    await git.clone(LOCALIZATION_REPO, './')

    await outputJson(CONFIG, { ...settings, location: location })
    console.log(chalk.green('Repo checked out!'))

    return location
  } catch (error) {
    console.log(chalk.red('Unable to check out repo!'))
  }
}

/**
 * updateRepo just checks out main and pulls the latest changes
 */
async function updateRepo() {
  try {
    console.log(chalk.blue('Updating Repo'))
    await git.checkout('main')
    return git.pull()
  } catch (error) {
    console.warn(chalk.red(error))
  }
}

/**
 * setBranch checks if our choosen branch name already exists, in which case
 * it switches to that branch, otherwise it creates the new branch
 */
async function setBranch() {
  // Confirm branch doesn't already exist
  const localBranches = await git.branchLocal()

  const branchName = await selectBranch(localBranches)
  const branchExists = localBranches.all.includes(branchName)

  branchExists
    ? console.log(chalk.green('Switching to branch'))
    : console.log(chalk.green('Creating new branch'))

  branchExists ? await git.checkout(branchName) : await git.checkoutLocalBranch(branchName)
  return branchName
}

/**
 * selectBranch is a helper for setBranch that lets the user decide what branch
 * they want to use for this localization update.  It returns a `branchName`
 * @param {array} localBranches list of all local branches
 */
async function selectBranch(localBranches) {
  try {
    const selectInitOption = new Select({
      name: 'which-branch',
      message: `What branch would you like to use?`,
      choices: ['Create a new branch', ...localBranches.all.filter((branch) => branch !== 'main')]
    })

    const answer = await selectInitOption.run()

    switch (answer) {
      case 'Create a new branch': {
        const { branchName } = await prompt({
          type: 'input',
          name: 'branchName',
          message: 'What would you like to call your branch?'
        })

        if (!branchName.length) throw new Error('You must select a branch name.')
        return branchName
      }

      default: {
        return answer
      }
    }
  } catch (error) {
    console.warn(chalk.red(error))
  }
}

/**
 * commitChanges commits changes with the body containing a list of the files
 * changed
 * @param {array} fileChanges Array of file names that have changed
 * @param {string} branchName Name of the branch we will be operating in
 * @param {string} location This is the passed in location required to resolve locales folder
 */
async function commitChanges(changedFiles, branchName, location) {
  console.log(chalk.green('  [commit] making commit to branch'))
  changedFiles.forEach((filename) => console.log(chalk.green(`  [commit]: ${filename}`)))

  const addLocation = path.resolve(location, 'locales')
  await git.cwd(addLocation)
  await git.add(changedFiles)
  return git.commit(['feat(localization): updating strings', ...changedFiles])
}

/**
 * pushChanges pushes changes to the remote repo — it is optional
 * @param {string} branchName Name of the branch we will be operating in
 * @param {string} location This is the passed in location required to resolve locales folder
 */
async function pushChanges(branchName, location) {
  // Push changes to your branch
  const selectPushOption = new Select({
    name: 'push-status',
    message: `Would you like to push these changes?`,
    choices: ['Yep!', 'Nope']
  })
  const answer = await selectPushOption.run()
  if (answer === 'Yep!') {
    console.log(chalk.blue('  [commit] Pushing changes to branch'))
    const addLocation = path.resolve(location, 'locales')
    await git.cwd(addLocation)
    return await git.push(LOCALIZATION_REPO, branchName)
  }

  return
}

/**
 * submitPR checks that a PR has not already been created for this branch and if
 * it does not exist, creates it and submits it. The body of the PR will be a list
 * of affected files.
 * @param {string} token Github access token that is set for each individual
 * @param {string} branchName Name of the branch we will be operating in
 * @param {array} changedFiles Array of file names that have changed
 */
async function submitPR(token, branchName, changedFiles) {
  try {
    const selectPROption = new Select({
      name: 'pr-status',
      message: `Would you like to make a PR?`,
      choices: ['Yep!', 'Nope']
    })
    const answer = await selectPROption.run()

    // Bail if you want
    if (answer === 'Nope') {
      console.log('Cool. You`re all set.')
      process.exit(0)
    }

    const prEndpoint = `${GITHUB_API_URL}/repos/Pocket/web-localization/pulls`
    const prTitle = `feat(localization): from branch '${branchName}'`
    console.log(chalk.blue(chalk.blue('  [PR] Checking for existing PR')))

    // Check for existing PR
    const existingPRs = await fetch(prEndpoint, {
      headers: { Authorization: `token ${token}` }
    }).then((response) => response.json())

    if (existingPRs?.filter((pr) => pr.title === prTitle).length) {
      return console.log(chalk.magenta('  [PR] Pull request already exists'))
    }

    // No existing PR.  Let's create one
    console.log(chalk.green('  [PR] Creating a new PR'))

    const createdPR = await fetch(prEndpoint, {
      method: 'POST',
      headers: { Authorization: `token ${token}` },
      body: JSON.stringify({
        title: prTitle,
        body: `Changes for the following files:
  ${changedFiles.join(`,
  `)}`,
        head: branchName,
        base: 'main'
      })
    }).then((response) => response.json())

    if (createdPR.errors) {
      console.log(createdPR.errors)
      throw new Error(chalk.red('  [PR] unable to create PR'))
    }

    const { html_url } = createdPR
    console.log(chalk.green(`  [PR] Pull request created at ${html_url}`))
  } catch (error) {
    console.error(chalk.red(error))
  }
}

/**
 * parseLocalizationChanges uses an i18n parser to check through the files
 * and find any changes that need to be updated.  It checks for an existing file
 * based of the namespace convention <Trans i18nkey="namespace:key"> and if one
 * exists, it compares a sha of the existing file, to the sha of the parsed file.
 * If there are changes, it writes that file to disk
 *
 * It returns an array of files that changed
 * @param {string} location: Location of cloned repo
 */
async function parseLocalizationChanges(location) {
  try {
    if (!parserConfig) throw new Error('MODULE_NOT_FOUND')

    return new Promise((resolve) => {
      const config = parserConfig
      config.output = config.output || '$LOCALE/$NAMESPACE.json'
      const resolvedOutput = path.resolve(location, 'locales')

      let count = 0
      let fileChanges = []

      vfs
        .src(config.input)
        .pipe(sort())
        .pipe(
          new i18nTransform(config)
            .on('reading', () => {
              count++
            })
            .on('data', (file) => {
              const fileChanged = handleData(file, location)
              if (fileChanged) fileChanges.push(fileChanged)
            })
            .on('finish', () => handleFinish(count, fileChanges))
            .on('error', (file) => handleError(file))
        )
        .pipe(vfs.dest(resolvedOutput))
        .on('finish', () => resolve(fileChanges))
    })
  } catch (err) {
    if (err.code === 'MODULE_NOT_FOUND') {
      console.log('  [error] ' + 'Config file does not exist: i18next-parser.config.js')
    } else {
      throw err
    }
  }
}

/**
 * handleData is a helper function for the parser when data is received from reading
 * the file. This checks the data against an existing file (if it is there) and only
 * returns the file object if there have been changes
 * @param {obj} file: vinyl object the parser is reading
 * @param {string} location: Location of cloned repo
 */
function handleData(file, location) {
  const fileDestination = path.resolve(location, 'locales', file.relative)
  const existingFile = fs.existsSync(fileDestination)

  if (existingFile) {
    const readFile = fs.readFileSync(fileDestination)
    const hasChanges = sha1(readFile) !== sha1(file.contents)

    if (hasChanges) {
      console.log(chalk.blue(`  [write]: locales/${file.relative}`))
      return file.relative
    }
  }

  //Add new files
  if (!existingFile) return file.relative

  return false
}

/**
 * handleError is a helper function for the parser.  It displays information
 * returned from the parser
 * @param {string} message error message
 * @param {string} region error region
 */
function handleError(message, region) {
  if (typeof region === 'string') message += ': ' + region.trim()
  console.log(chalk.red(`  [error]  ${message}`))
}

/**
 * handleFinish is a helper function for the parser.  It displays total files parsed
 * @param {int} count number of files that have been parsed
 */
function handleFinish(count) {
  console.log(chalk.magenta(`  [read]: ${count} files parsed`))
}

/**
 * sha1 returns a sha1 of the passed file for easy, general comparison
 * @param {*} buffer Vinyl buffer or file to get the sha1 for
 */
function sha1(buffer) {
  return crypto.createHash('sha1').update(buffer).digest('hex')
}

/**
 * setToken is used to help the user set a github access token locally.  This is
 * required in order to create a PR on Github
 */
async function setToken(settings) {
  try {
    console.log('You need an auth token to use the parser.')
    console.log('Please set one up by following the instructions here:')
    console.log(
      'https://help.github.com/en/github/authenticating-to-github/creating-a-personal-access-token-for-the-command-line'
    )
    console.log('Additional setup for GPG')
    const { token } = await prompt({
      type: 'input',
      name: 'token',
      message: 'Enter your created auth token here: '
    })

    if (!token.length) throw new Error('Token is required.')

    // Write preferences to file
    await outputJson(CONFIG, { ...settings, token })
    console.log('Saving token to config')

    return token
  } catch (error) {
    console.warn(chalk.red(error))
  }
}

// Run the whole thing
processLocalization()
