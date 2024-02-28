module.exports = {
  plugins: [
    {
      name: 'preset-default',
      params: {
        overrides: {
          convertColors: true,
          removeViewBox: false,
          removeHiddenElems: true,
          removeTitle: true,
          removeUselessStrokeAndFill: true,
          removeUnusedNS: true,
          collapseGroups: true,
          sortAttrs: true
        }
      }
    },
    'removeStyleElement',
    'removeScriptElement',
    'removeDimensions',
    { name: 'removeAttrs', params: { attrs: 'class' } },
    {
      name: 'addAttributesToSVGElement',
      params: { attribute: 'aria-hidden="true"' }
    }
  ]
}
