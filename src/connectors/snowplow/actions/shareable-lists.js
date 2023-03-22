export const shareableListActions = {
  // shareable list

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
  },
  'shareable-list.share.facebook': {
    eventType: 'engagement',
    entityTypes: ['shareableList', 'ui'],
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
    description: 'Fired when a user clicks the FB button in the Share List modal'
  },
  'shareable-list.share.twitter': {
    eventType: 'engagement',
    entityTypes: ['shareableList', 'ui'],
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
    description: 'Fired when a user clicks the Twitter button in the Share List modal'
  },
  'shareable-list.share.linkedin': {
    eventType: 'engagement',
    entityTypes: ['shareableList', 'ui'],
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
    description: 'Fired when a user clicks the LinkedIn button in the Share List modal'
  },
  'shareable-list.share.reddit': {
    eventType: 'engagement',
    entityTypes: ['shareableList', 'ui'],
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
    description: 'Fired when a user clicks the Reddit button in the Share List modal'
  },
  'shareable-list.share.buffer': {
    eventType: 'engagement',
    entityTypes: ['shareableList', 'ui'],
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
    description: 'Fired when a user clicks the Buffer button in the Share List modal'
  },
  'shareable-list.share.copy': {
    eventType: 'engagement',
    entityTypes: ['shareableList', 'ui'],
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
    description: 'Fired when a user clicks the Copy Link button in the Share List modal'
  },

  // shareable list ITEM
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
  'shareable-list.item.remove': {
    eventType: 'engagement',
    entityTypes: ['ui', 'shareableListItem'],
    eventData: {
      uiType: 'button'
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
    description: 'Fired when a creator removes an item from a list'
  },

  // PUBLIC list item
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
  }
}
