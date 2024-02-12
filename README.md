# Web Client

> Reaching for the promise of a healthy internet.

The "web-client" code repository represents the front end code for a unified Pocket user experience that is not siloed into discover vs app. For Pocket to truly "Capture the Magic of the Web" we need to take a holistic approach to what the value of Pocket is.


---

## Installation

#### Authenticating With Github Package Registry

This package is published to Github Package Registry. GHPR uses the same syntax/API as NPM, using a `package.json` file and the same NPM commands. The first time you interact with GHPR, you’ll have to authenticate with it:

Prepare your username and password
- Your username is your Github username
- For your password, if you have not gone through this process before, you must generate a Personal Access Token through Github.
  - Check for existing:
    - Check your `~/.npmrc` file for an existing access token
  - Create New:
      - In github, go to your avatar in top right corner, select Settings
      - Go to Developer Settings, and click Personal Access Token
      - Create new token, checking the "repo", "read:packages" and "write:packages" scopes
- When prompted for password, paste in the copied token

Login
- Open a terminal and enter `npm login --registry=https://npm.pkg.github.com/`
- Enter your username and password

---

## Structures

#### Folders
The site content is represented by five primary folders under the `/src` directory

`/pages`

 This is a NEXTjs convention that provides automatic routing.  Each page of the site will be represented here.  There should be a folder representing the page which contains an `index.js` file as a top level and additional files representing any _page specific_ components or layouts

`/common`

This will contain _site specific_ contstants and utilities.  No visual components should be placed here.

`/components`

This should contain _site specific_, components.

`/connectors`

This should contain _site specific_, shared state

`/containers`

These are where _page level_ containers will live along with co-located state files

#### Conventions

The `/containers` folder contains a `layouts` folder. The components in this folder are meant to be wrappers, that every page should leverage.  They provide a space to provide site wide functionality.  By default they have the following:

- Ability to set title (optional - defaults to `Pocket`)
- Nav
- Header
- Footer

## Localization

### Library
We use i18n (specificaly react-i18n) to handle localization throughout the project.  The library provides two patterns a `useTranslation` hook and a `<Trans>` component. We prefer the `useTranslation` hook in almost all instances.  If the translated block contains markup such as links or images the `<Trans>` component can be used for clarity, but it has limitations you should be aware of.

- `useTranslations`: https://react.i18next.com/latest/usetranslation-hook
- `Trans`: https://react.i18next.com/latest/trans-component

> _IMPORTANT_ — At present, this library is initialized into our nextJS instance via a third-party library called `next-i18next`.  This is the recommended way to do this in nextJS using the `pages` pattern.  It does mean when you are importing `useTranslation` or `Trans` you should do so from `next-i18next` and _NOT_ directly from `react-i18next`.  The reason for this is that nextJS is universal and `next-i18next` does some additional work for us to support server side rendering (ssr).

### Translations
Translations are handled by Smartling via a Github integration.  This should make it a more streamlined to write your code normally and then run some simple scripts to prep them and trigger a job on Smartling. Once that job on Smartling has been authorized and completed, Smartling will submit a new PR back to our repo with all the translated files.

1) As you write code, when you are including a new string, be sure to wrap it appropriately and use a namespace. Namespace is seperated by a `:` This helps us break up translations so we can load only what we need.
```javascript
mycoolnamespace:mystring-key
```
2) We use default fallbacks, so your code will be fine to ship so long as all stakeholders are aware that english will show up across all locales until the translations come back.
```javascript
t(`mycoolnamespace:mystring-key`, 'My default string that will be translated`)
```
3) In order for a string to be eligible for translation, you need to wrap it appropriately and we will end up picking it up with a parsing script.

```js
import { useTranslation } from 'next-i18next'

export const Nav = ()=>{
  const { t } = useTranslation()
  return <div>{t(`nav:lists`, 'Lists')}</div>
}
```

4) Once you are ready to make your PR, running `npm run locale:parse` from the root directory will add new string to the `en.json` which you will be able to see as code changes in git.  Once those changes are merged into main, Smartling will automatically see and create a job for starting translations.

Please use `locale` as the type and whatever we are operating on.
```
locales(nav): adding updates for shared lists
```

5) Once the PR from Smartling comes back it can be merged and other locales will pick up the appropriate language and there will be much rejoicing.



---

## Server
We are using standard nextJS to handle servers side building/rendering/caching.

#### Pages
When serving a page, it should live in the `pages` directory. If you have no special requirements, _**nextJS will automatically serve it**_.

We prefer `getStaticProps` props over `getServerProps` to help with caching and reducing server load. You can read up on the nuances here: https://nextjs.org/docs/basic-features/data-fetching

```javascript
import MyContainer from 'containers/my-container/my-container'

// This makes this a build time static page.
export async function getStaticProps() {
  return { props: { namespacesRequired: ['common'], subset: 'unread' } }
}

export default MyContainer

```
---

## Local Development

#### Local Installation

Clone this repo locally. Then simply:

```bash
cd web-client
npm install
```

#### Setting up local certificate

Chromium browser now require SSL to access cookies that will allow the site to auth and run locally.

There are some challenges to doing this properly but we can streamline it quite a bit with a package called [mkcert](https://github.com/FiloSottile/mkcert). Visit the site and follow instructions to install it on your machine (for both chrome and firefox)

Once installed run the following to install a valid certificate on your machine.:
```bash
mkcert -install
```

Finalize things by running the following command from the root of the web-client folder. This will generate the certificates that the `server.local` is expecting.
```bash
mkcert localhost.web-client.getpocket.com
```

#### Running Locally

To run the `web-client` site locally :

```bash
npm run dev
```
You will need to update your hosts file to point localhost (127.0.0.1) to the hostname `localhost.web-client.getpocket.com`. Some of our third party API keys are only enabled for `getpocket.com`, and so will not work at `localhost`. See: https://linuxize.com/post/how-to-edit-your-hosts-file/

The discover pages will be deployed locally on `localhost.web-client.getpocket.com`.

### Storybook

This app also has an instance of Storybook, for developing components that will be shared inside of this repo.

To run Storybook (launches window at `localhost.web-client.getpocket.com` with a random port):

```bash
npm run storybook
```

### Testing

#### Unit Tests

For unit testing, we use `jest` and `react-test-library` for rendering. The primary goal with our unit tests is to flex an isolated chunk of code (e.g. a function, component, or class), and ensure that it satisfies all requirements - verify expected output, given possible inputs. It also serves as documentation for expected behavior of that unit.

Unit test files are co-located alongside our JS files, named as `*.spec.js`. Any file ending in `.spec.js` in the `src` folder will get picked up by mocha and included in tests.

Unit tests can be run locally and are also run via CI as a requirement for PR merging. To run unit tests:

```bash
npm test
```

##### Test Users

Tests that verify the logged-in user experience will require user auth. Since we don't want to store passwords in Git, the password for test user accounts will need to be set/stored on your own machine. Test users should all use the same password, and be created using the `frontend-test@getpocket.com` alias and "plus sign" gmail syntax, e.g. `frontend-test+fran@getpocket.com`. The password should be set within your `.bash_profile` file like:

```bash
export CYPRESS_POCKET_TEST_USER_SECRET="get the password from a fellow dev"
```

This will make a Cypress environment variable available as `POCKET_TEST_USER_SECRET` that can be used for login credentials. Usernames are stored in the Cypress support folder.

*NOTE: We cannot currently log test users in programmatically, and so test user login is currently incomplete*

---

## Deployment

#### Production Release
Production release will happen automatically when a PR is merged to `main`.  Main is a protected branch and can only be modified with an approved PR.

---
## Contributing

#### Next.js

The `web-client` repo is set up to use [NEXT.js](https://nextjs.org/docs/) for development and deployment.

#### Pocket Web UI

For shared components and consistent styling we leverage `web-ui` of Pocket.  This provides us with global styles, resets, icons, design tokens, typography, colors, and shared components.  To avoid duplication, all components that will be shared across multiple properties will be pulled in from there: [web-ui](https://github.com/Pocket/web-ui)

#### PrettierJS

This project uses PrettierJS to help keep code formatting consistent. It's recommended that you set up your IDE to support Prettier. Read more here: https://prettier.io/docs/en/editors.html

---
