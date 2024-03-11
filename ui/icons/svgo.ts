import { Config } from 'svgo'

export const svgoConfig: Config = {
  plugins: [
    {
      name: 'preset-default',
      params: {
        overrides: {
          removeViewBox: false,
          convertColors: {
            currentColor: true
          }
        }
      }
    },
    'collapseGroups',
    'convertStyleToAttrs',
    'removeHiddenElems',
    'removeStyleElement',
    'removeScriptElement',
    'removeDimensions',
    { name: 'removeAttrs', params: { attrs: 'class' } },
    {
      name: 'addAttributesToSVGElement',
      params: { attribute: 'aria-hidden="true"' }
    },
    {
      name: 'addAttributesToSVGElement',
      params: { attribute: 'className={iconClass}' }
    },
    {
      name: 'addAttributesToSVGElement',
      params: { attribute: '{...rest}' }
    }
  ]
}

export const svgoColorConfig: Config = {
  plugins: [
    {
      name: 'preset-default',
      params: {
        overrides: {
          removeViewBox: false,
          convertColors: false
        }
      }
    },
    'collapseGroups',
    'convertStyleToAttrs',
    'removeHiddenElems',
    'removeStyleElement',
    'removeScriptElement',
    'removeDimensions',
    { name: 'removeAttrs', params: { attrs: 'class' } },
    {
      name: 'addAttributesToSVGElement',
      params: { attribute: 'aria-hidden="true"' }
    },
    {
      name: 'addAttributesToSVGElement',
      params: { attribute: 'className={iconClass}' }
    },
    {
      name: 'addAttributesToSVGElement',
      params: { attribute: '{...rest}' }
    }
  ]
}
