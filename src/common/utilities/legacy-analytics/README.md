# Legacy Analytics Utils

## API

### legacyAnalytics.track()

Tracks a user event to our Backend Analytics API. Accepts two arguments, `consumerKey` and `params`. The function returns a Promise that is resolved or rejected depending on resolution of the request.

We will soon be deprecating our existing analytics API in lieu of a third party platform. This function exists to provide an easy way to make legacy analytics requests, while also encapsulating that logic into a namespace
`legacyAnalytics` that will be easier to find and remove later. Functions should always be called as `legacyAnalytics.methodName` in order to mark them as legacy (i.e., do not import `track` directly from the `legacy-analytics` source, do not alias it as something else). When adding any new analytics events, consult your data representative as to whether we need to send the events to our legacy analytics system or can send them to the new platform.

- `consumerKey [String]`: should be a unique identifier per frontend app that we use to identify where a request to the API has originated from. This is a required arg.
- `params [Object|Array]`: key/value pairs to send as the analytics event payload. Can be a single object, or an array of objects in the case of batching events. Keys should map to requirements (fields) provided by your data representative.

```js
import { legacyAnalytics } from 'common/utilities/legacy-analitcs'
import { CONSUMER_KEY } from 'common/constants'

export const MyFeatureComponent = (props) => {
  handleButtonClick(event) {
    props.dispatch(fooAction())

    legacyAnalytics.track(CONSUMER_KEY, {
      // event params should be defined/provided by the data team, this is just an example
      name: 'submitted form',
      view: 'web',
      category: 'newsletter',
      page: '/explore/pocket-hits-signup',
      extra_content: 'top'
    })
  }

  return (
    <div>
      <button onClick={handleButtonClick}>This is a button</button>
    </div>
  )
}
```
