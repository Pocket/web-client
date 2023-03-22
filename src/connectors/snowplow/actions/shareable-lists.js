export const shareableListActions = {
  'shareable-list.impression': {
    eventType: 'impression',
    entityTypes: ['ui', 'shareableList'],
    eventData: {
      uiType: 'card'
    },
    expects: [
      'shareableListExternalId',
      'slug',
      'title',
      'status',
      'moderationStatus',
      'createdAt'
    ],
    description: 'Fired when a list is shown on the All Lists page'
  },
  'shareable-list.item.impression': {
    eventType: 'impression',
    entityTypes: ['ui', 'shareableListItem'],
    eventData: {
      uiType: 'card'
    },
    expects: [
      'shareableListItemExternalId',
      'shareableListExternalId',
      'givenUrl',
      'title',
      'excerpt',
      'imageUrl',
      'publisher',
      'sortOrder',
      'createdAt'
    ],
    description: 'Fired when a list item is shown on the Individual List page'
  },
  'public-list.item.impression': {
    eventType: 'impression',
    entityTypes: ['ui', 'shareableListItem'],
    eventData: {
      uiType: 'card'
    },
    expects: [
      'shareableListItemExternalId',
      'shareableListExternalId',
      'givenUrl',
      'title',
      'excerpt',
      'imageUrl',
      'publisher',
      'sortOrder',
      'createdAt'
    ],
    description: 'Fired when a list item is shown on the Public List page'
  },
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
