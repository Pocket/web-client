/**
 * setup/teardown file for mocha unit tests
 */
import Enzyme from 'enzyme'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'

// Keep asset imports from breaking unit tests by mapping
// their import logic to a noop function:
;['gif', 'png', 'jpg', 'svg'].forEach((extension) => {
  require.extensions[`.${extension}`] = () => {}
})

// required by Enzyme for all component unit tests
Enzyme.configure({ adapter: new Adapter() })

const error = console.error
const originalConsoleError = global.console.error

before(() => {
  /**
   * We're making console.error actually throw an error so that we can fail tests
   * when React throws propType warnings.
   */
  global.console.error = (...args) => {
    const propTypeFailures = [/Failed prop type/, /Warning: Received/]

    if (propTypeFailures.some((p) => p.test(args[0]))) {
      throw new Error(args[0])
    }

    originalConsoleError(...args)
  }
})

after(() => {
  // make sure to reset console.error after all tests are run
  console.error = error
})
