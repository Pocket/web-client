/**
 * Ad sizes used for programmatic ads.
 * Order matters in the `adSizes` key, the size priorities will cascade down during ad bidding.
 * If no ad size fits here, the default size is set as a parameter `googleTag.defineSlot()` and will be used.
 */
export const horizontalLargeAd = [
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

export const horizontalSmallAd = [
  {
    browserSize: [1024, 400],
    adSizes: [[728, 90]]
  },
  { browserSize: [768, 400], adSizes: [[728, 90]] },
  {
    browserSize: [460, 400],
    adSizes: [
      [300, 250],
      [320, 50],
      [320, 100]
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
      [320, 100],
      [320, 50],
      [300, 250]
    ]
  }
]

export const horizontalMediumAd = [
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

export const verticalSidebarAd = [
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
