module.exports = {
  plugins: [
    {
      name: 'preset-default',
      params: {
        overrides: {
          convertColors: true,
          removeViewBox: false,
          removeHiddenElems: true,
          removeScriptElement: true,
          removeStyleElement: true,
          removeTitle: true,
          removeUselessStrokeAndFill: true,
          removeUnusedNS: true,
          cleanupIDs: true,
          collapseGroups: true,
          sortAttrs: true
        }
      }
    },
    'removeDimensions',
    { name: 'removeAttrs', params: { attrs: 'class' } },
    {
      name: 'addAttributesToSVGElement',
      params: { attribute: 'aria-hidden="true"' }
    }
  ]
}
