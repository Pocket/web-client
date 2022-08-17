import chalk from 'chalk'
import ora from 'ora'
import enquirer from 'enquirer'
import fs from 'fs-extra'
import simpleGit from 'simple-git'
import path from 'path'
import { stdin as input, stdout as output } from 'node:process'
import { spawn } from 'node:child_process'

const git = simpleGit()
const { pathExists, outputJson, emptyDir } = fs
const { Select, prompt } = enquirer

// Constants
const REPO = 'https://github.com/Pocket/web-qa'
const REPO_TEST = /https:\/\/([\w\d]+@)?github.com\/Pocket\/web-qa(\.git)?/
const DEFAULT_REPO_LOCATION = '../web-qa/'
const CONFIG = './.scripts/qa/config.json'

// Run the whole thing
runEndToEndTest()

let serve
let qaProcesses

// Set-up cleanup for server
process.on('exit', cleanup)

async function runEndToEndTest() {
  try {
    console.clear()
    await setRepoAccess()
  } catch (err) {}
}

async function buildProductionClient(location) {
  const shouldBuild = await checkPriorBuilds()

  if (!shouldBuild) {
    startLocalClient(location)
    return
  }

  const buildIndicator = ora('Building Client').start()

  const build = spawn('npm', ['run', 'build'], {})

  build.stdout.on('data', (data) => {
    buildIndicator.text = `Building Client: ${data.toString()}`
  })

  build.on('close', (code) => {
    if (code !== 0) console.log(`ps process exited with code ${code}`)
    buildIndicator.succeed()
    startLocalClient(location)
  })
  //
}

async function checkPriorBuilds() {
  const previousBuilds = ora('Checking Build').start()

  const hasBuild = await fs.pathExists(path.resolve('.next/BUILD_ID'))
  const buildId = hasBuild ? await fs.readFile(path.resolve('.next/BUILD_ID')) : null

  // No Build ID — We should run a clean build
  if (!hasBuild) {
    previousBuilds.succeed('Checking Build: No build is present')
    return true
  }

  // Get the latest git hash (what we use as build id)
  // Here we are setting our instance of git to the proper location
  await git.cwd('./')

  // Are there uncommitted changes
  const gitStatus = await git.status(['--short'])
  if (!gitStatus.isClean()) {
    previousBuilds.succeed('Checking Build: Code changes since last build')
    return true
  }

  // Get the current hash
  const gitHash = await git.revparse('HEAD')
  if (gitHash !== buildId.toString()) {
    previousBuilds.succeed("Checking Build: Build doesn't match")
    return true
  }

  // If it is the same as the build id we are all good
  previousBuilds.succeed('Checking Build: Build is valid')
  return false
}

async function startLocalClient(location) {
  const clientIndicator = ora('Starting Client').start()
  serve = spawn('npm', ['run', 'start:local'], {})
  serve.stdout.on('data', (data) => {
    const bufferMessage = data.toString()
    clientIndicator.text = `Starting Client: ${bufferMessage}`

    const isComplete = /Ready at/.test(bufferMessage)
    if (isComplete) {
      clientIndicator.succeed(bufferMessage)
      processIntegrations(location)
    }
  })
}

async function setRepoAccess() {
  // Check for a preferences file first
  const configExists = await pathExists(CONFIG)

  // Grab our settings
  const settings = configExists ? await fs.readJson(CONFIG) : {}
  let { location = DEFAULT_REPO_LOCATION } = settings

  // Make sure token is set
  await setToken(settings)

  // Does the repo exists and is valid
  const isValidLocation = await validateRepo(location)

  // If the location is valid set up the repo
  location = isValidLocation ? location : await setupRepo(location, settings)

  // Update our repo
  await updateRepo(location)

  return location
}

/**
 * Let's try and run integrations locally (eventually on CI)
 */
async function processIntegrations(location) {
  try {
    //?? Get current changes to this branch if we can and build a custom integration
    //?? That would be slick
    const qaLocation = path.resolve(location)
    // Select what type of test you are interested in
    const { scripts } = JSON.parse(fs.readFileSync(`${qaLocation}/package.json`, 'utf8'))
    const selectInitOption = new Select({
      name: 'select-script-to-run',
      message: `Which test would you like to run?`,
      choices: Object.keys(scripts)
    })
    const answer = await selectInitOption.run()

    const testProcess = spawn('npm', ['--prefix', qaLocation, 'run', answer], { stdio: 'inherit' })
    const testIndicator = ora().stopAndPersist({ text: 'Running Tests' })

    testProcess.on('close', (code) => {
      if (code !== 0) console.log(`ps process exited with code ${code}`)
      testIndicator.succeed('Testing Client: Complete')
      process.exit()
    })
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
  const validation = ora(chalk.blue(`Validating repo at: ${location}`)).start()

  // First we check if the folder even exists
  const folderExists = await pathExists(location)

  // If the folder does not exist the repo is not valid
  if (!folderExists) {
    validation.fail('Repo location does not exist')
    return false
  }

  // Here we are setting our instance of git to the proper location
  await git.cwd(location)

  // Check if the location provided is actually a repo
  const isRepo = await git.checkIsRepo()

  // If it is a repo, get some more details and confirm it's the localization repo
  const listConfig = await git.listConfig()
  const { 'remote.origin.url': remoteUrl } = listConfig.values['.git/config']
  const correctRepo = isRepo && REPO_TEST.test(remoteUrl)

  if (!correctRepo) {
    validation.fail('Repo is not the correct repo')
    return false
  }

  validation.succeed('Repo is valid')
  return true
}

/**
 * setToken is used to help the user set a GitHub access token locally.  This is
 * required in order to create a PR on GitHub
 */
async function setToken(settings) {
  try {
    const tokenIndicator = ora({ text: 'Validating git token', stream: output }).start()
    // Make sure we have a token stored in our config
    if (settings.token) {
      tokenIndicator.succeed('Git ready')
      return true
    }

    tokenIndicator.stopAndPersist({
      text: `
    You need an auth token to use web-qa.
    Please set one up by following the instructions here:
    https://help.github.com/en/github/authenticating-to-github/creating-a-personal-access-token-for-the-command-line 
    `
    })

    const { token } = await prompt({
      type: 'input',
      name: 'token',
      message: 'Enter your created auth token here: '
    })

    if (!token.length) throw new Error('Token is required.')

    // Write preferences to file
    await outputJson(CONFIG, { ...settings, token })
    tokenIndicator.succeed('Token Saved')

    return token
  } catch (error) {
    console.warn(chalk.red(error))
  }
}

/**
 * setupRepo is called if no repo exists or that repo is invalid.
 * It gives the user the option to clone a fresh copy of the repo, or locate
 * a previously checked out version
 * @param {string} location: Location of cloned repo
 * @param {object} settings: The settings object containing settings content in an object
 */
async function setupRepo(location, settings) {
  try {
    const selectInitOption = new Select({
      name: 'repo-status',
      message: `How should we setup web-qa?`,
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
    console.log(`Setting web-qa repo to ${location}`)

    const isValid = validateRepo(location)
    if (!isValid) throw new Error('Not a valid repo')

    return location
  } catch (error) {
    console.log(chalk.magenta(`Oops — Can't find or access that repo.`))
    console.log(
      `Try cloning the repo manually from ${chalk.blue(
        REPO
      )} into the same parent directory as the current repo.`
    )
    process.exit(0)
  }
}

/**
 * updateRepo just checks out main and pulls the latest changes
 */
async function updateRepo(location) {
  try {
    const repoUpdate = ora(chalk.blue(`Updating web-qa to latest`)).start()

    await setBranch()
    await git.pull

    const install = spawn('npm', ['--prefix', path.resolve(location), 'install'], {})

    install.on('exit', (code) => {
      if (code !== 0) console.log(`ps process exited with code ${code}`)
      repoUpdate.succeed('Web QA Update: Complete')
      buildProductionClient(location)
    })
  } catch (error) {
    console.warn(chalk.red(error))
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

    console.log(`Checking out web-qa to ${location}`)
    await git.clone(REPO, './')

    await outputJson(CONFIG, { ...settings, location: location })
    console.log(chalk.green('Repo checked out!'))

    return location
  } catch (error) {
    console.log(chalk.red('Unable to check out repo!'))
  }
}

function cleanup() {
  if (serve) {
    serve.kill()
    console.log(`${chalk.green('✔')} Stopping Local Server`)
  }

  if (qaProcesses) {
    qaProcesses.kill()
    console.log(`${chalk.green('✔')} Stopping QA Processes`)
  }
  console.log(`${chalk.green('✔')} Test run completed`)
}

/**
 * setBranch checks if our choosen branch name already exists, in which case
 * it switches to that branch, otherwise it creates the new branch
 */
async function setBranch() {
  // Confirm branch doesn't already exist
  const localBranches = await git.branchLocal()

  const branchName = await selectBranch(localBranches)
  const branchExists = localBranches.all.map((branch) => branch.name).includes(branchName)

  if (branchExists) {
    await git.checkout(branchName)
    return branchName
  }

  return false
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
      choices: localBranches.all
    })

    const answer = await selectInitOption.run()
    return answer
  } catch (error) {
    console.warn(chalk.red(error))
  }
}
