export const shareableListActions = {
  'shareable-list.create.header': {
    eventType: 'engagement',
    entityTypes: ['ui'],
    eventData: {
      uiType: 'button'
    },
    description:
      'Fired when a creator clicks the "Create List" button in the header on the All Lists page and the Saves page(s)'
  },
  'shareable-list.create.sidebar': {
    eventType: 'engagement',
    entityTypes: ['ui'],
    eventData: {
      uiType: 'button'
    },
    expects: [],
    description: 'Fired when a creator clicks the "Create List" button in the sidebar'
  },
  'shareable-list.share': {
    eventType: 'engagement',
    entityTypes: ['ui', 'shareableList'],
    eventData: {
      uiType: 'button'
    },
    expects: [
      'shareableListExternalId',
      'slug',
      'title',
      'status',
      'moderationStatus',
      'createdAt'
    ],
    description: 'Fired when a creator clicks the Share button on a list'
  }
}
