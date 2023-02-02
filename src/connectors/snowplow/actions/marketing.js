export const marketingActions = {
  'banner.german.home.click': {
    eventType: 'engagement',
    entityTypes: ['ui'],
    eventData: {
      uiType: 'button'
    },
    description: 'Banner at top of Home for German users'
  },
  'banner.german.home.impression': {
    eventType: 'impression',
    entityTypes: ['ui'],
    eventData: {
      component: 'ui',
      uiType: 'button'
    },
    description: 'Banner at top of Home for German users'
  }
}
