# Script Injection Utils

These scripts can be used to load third party scripts or execute code snippets in the global context outside of our normal application flow.

## API

### injectLibScript()

Appends a `<script>` to the `<body>` and assigns a url as its `src attribute, for loading external scripts.

```js
import { injectLibScript } from 'common/utilities/inject-script'

injectLibScript('https://catscripts.com/meow.js', true)
```

### injectInlineScript()

Appends a `<script>` to the `<body>` and inserts JS code (as a string) into it to execute.

```js
import { injectInlinecript } from 'common/utilities/inject-script'

injectInlineScript('alert("meow")', true)
```
