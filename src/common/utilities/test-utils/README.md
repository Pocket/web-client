# Test Utils

A set of utility functions that assist with unit tests of frontend components.

## API

### testIdAttribute()

Function that creates a `data-test-id` attribute to pass to a component that will be used within React components to flag a particular element for identification in unit tests. Accepts a single param `elementId` that should be a unique string value to identify that element. The html attribute will only be added if the `NODE_ENV` value is `test`, so your frontend app should be set up to set that variable when running unit tests using this util.

```js
import { testIdAttribute } from '@pocket/web-utilities/test-utils'

// component file
const MyComponent = ({ title }) => {
  return (
    <div>
      <span {...testIdAttribute('title')}>${title}</span>
      This is a sample component with a prop-based title above.
    </div>
  )
}
```

### testIdSelector()

Function that creates a DOM selection string that will correspond to the `data-test-id` attribute created with the `testIdAttribute` function. This function is used within the unit tests to find an element flagged for a test within a React component. Accepts a single param `elementId` that should match the id used with `testIdAttribute`.

```js
import { testIdSelector } from '@pocket/web-utilities/test-utils'

// unit test file
describe('MyComponent', () => {
  it('renders the title passed as a prop', () => {
    const result = shallow(<MyComponent title="this is the title" />)
    const title = result.find(testIdSelector('title'))

    assert.equal(title.text(), 'this is the title')
  })
})
```

### mockEvent

`mockEvent` is an object that mimics a DOM event object. This is useful when simulating events in unit tests so that you can provide an event instance that already has commonly used properties and methods like a real event, so that you don't have to mock those in every test. For example, your component code might have a line like `event.preventDefault()`; this mock event object contains a noop function for that method so that your code doesn't throw an error when you simulate a fake event.

```js
import { mockEvent } from '@pocket/web-utilities/test-utils'

// unit test file
describe('MyComponent', () => {
  it('calls the onClick callback when the button is clicked', () => {
    const spy = sinon.spy()
    const result = shallow(<MyComponent onClick={spy} />)
    const button = result.find(testIdSelector('cool-button'))

    button.simulate(mockEvent)

    assert(spy.calledOnce)
  })
})
```

### createMockFetchResponse()

Function that creates a mock `response` object that would be returned from a `fetch` call. Acceps the following arguments in order to specify the contents of the response:

- `data [Object|Array|String]`: JSON-compatible value that will be returned when calling `response.json()` from the `response` returned from `fetch`
- `isFail [Boolean]`: Set this to `true` to indicate that the request should fail, which will set `response.ok` to `false` and `response.statusText` to "fetch error status text". Defaults to `false`.

```js
import { createMockFetchResponse } from '@pocket/web-utilities/test-utils'

const mockResponse = createMockFetchResponse({ someDataKey: 'someValue' })

console.log(mockResponse.json())
// { someDataKey: 'someValue' }

mockResponse.headers['x-error-code'] = '100'
console.log(mockResponse.headers.get('x-error-code'))
// '100'
```
