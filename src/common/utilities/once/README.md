# Once()

A helper function used to wrap logic that should only be run once.

```js
import { once } from 'common/utilities/once/once'

const myOneTimeSetupCode = once(() => {
  console.log('setting up...')
})

myOneTimeSetupCode() // 'setting up...'
myOneTimeSetupCode() // noop
myOneTimeSetupCode() // noop
etc
```
