# Utility Function

## API

### urlWithPocketRedirect()

All external links are passed through our redirect endpoint. This is
for tracking and security reasons. The url is uri encoded and appended
to `https://getpocket.com/redirect` as a `url` parameter

```js
import { urlWithPocketRedirect } from '@pocket/web-utilities/pocket-redirect-url'

const url = urlWithPocketRedirect(articleUrl)
```
