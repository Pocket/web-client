export const accountActions = {
  'account.premium.upsell': {
    eventType: 'impression',
    entityTypes: ['ui'],
    eventData: {
      component: 'ui',
      uiType: 'button'
    },
    description: 'Upgrade button at the top of the account settings page'
  }
}
