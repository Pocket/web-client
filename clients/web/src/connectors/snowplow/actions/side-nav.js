export const sideNavActions = {
  'side-nav': {
    eventType: 'engagement',
    entityTypes: ['ui'],
    eventData: {
      uiType: 'menu'
    },
    expects: ['label'],
    description:
      'This is for any link within the side nav. The name of the menu item is passed through as `label`'
  }
}
