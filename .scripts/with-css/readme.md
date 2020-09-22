# With CSS

This is just a direct copy of [@next/with-css](https://github.com/zeit/next-plugins/tree/master/packages/next-css) with two small changes.

Changes:

**_IgnoreOrder on the css extraction plugin._**
``` Javascript
      new ExtractCssChunks({
       ...
        ignoreOrder: true
      })
```
 Since Linaria hashes the css selectors (just like css modules) we don't need to worry about ordering. This has been brought up in the nextJS repo so hopefully it will resolve soon and we can remove all of this.

 **_Turned off exportOnlyLocals on server_**
``` Javascript
  const cssLoader = {
    loader: 'css-loader',
    options: {
        ...
        exportOnlyLocals: isServer
    }
  }
```

This setting causes imported images to fail when placed in CSS.

---

### NOTE
When nextJS has more mature css support we should be able to drop this entirely and move forward with the native nextJS css support.