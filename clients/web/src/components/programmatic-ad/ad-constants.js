// ADVERTISING
export const POCKET_AD_UNIT_PATH = '/21741047832/Pocket'
export const REFRESH_KEY = 'refresh'
export const REFRESH_VALUE = 'true'
export const AD_TYPE_VERTICAL = 'vertical'
export const AD_TYPE_HORIZONTAL_LG = 'horizontal-large'
export const AD_TYPE_HORIZONTAL_M = 'horizontal-medium'

/**
 * Ad sizes used for programmatic ads.
 * Order matters in the `adSizes` key, the size priorities will cascade down during ad bidding.
 * If no ad size fits here, the default size is set as a parameter `googleTag.defineSlot()` and will be used.
 */
export const AD_SIZES = {
  [AD_TYPE_VERTICAL]: {
    defaultAdSize: [[300, 250]],
    sizeMap: [
      {
        browserSize: [1024, 400],
        adSizes: [
          [300, 250],
          [300, 600],
          [160, 600]
        ]
      },
      {
        browserSize: [768, 400],
        adSizes: []
      },
      {
        browserSize: [470, 400],
        adSizes: []
      },
      {
        browserSize: [0, 0],
        adSizes: []
      }
    ]
  },
  [AD_TYPE_HORIZONTAL_LG]: {
    defaultAdSize: [[300, 250]],
    sizeMap: [
      {
        browserSize: [1024, 400],
        adSizes: [
          [970, 90],
          [970, 250],
          [728, 90]
        ]
      },
      {
        browserSize: [768, 400],
        adSizes: [[728, 90]]
      },
      {
        browserSize: [470, 400],
        adSizes: [
          [320, 50],
          [320, 100],
          [300, 250]
        ]
      },
      {
        browserSize: [360, 400],
        adSizes: [
          [320, 50],
          [320, 100],
          [300, 250]
        ]
      },
      {
        browserSize: [0, 0],
        adSizes: [
          [320, 50],
          [320, 100],
          [300, 250]
        ]
      }
    ]
  },
  [AD_TYPE_HORIZONTAL_M]: {
    defaultAdSize: [[728, 90]],
    sizeMap: [
      {
        browserSize: [1024, 400],
        adSizes: [
          [728, 90],
          [970, 90]
        ]
      },
      { browserSize: [768, 400], adSizes: [[728, 90]] },
      {
        browserSize: [470, 400],
        adSizes: [
          [300, 250],
          [320, 50],
          [320, 100]
        ]
      },
      {
        browserSize: [360, 400],
        adSizes: [
          [300, 250],
          [320, 100],
          [320, 50]
        ]
      },
      {
        browserSize: [0, 0],
        adSizes: [
          [320, 50],
          [320, 100],
          [300, 250]
        ]
      }
    ]
  }
}
