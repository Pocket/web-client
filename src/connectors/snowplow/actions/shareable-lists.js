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
  'shareable-list.create.empty-all-lists': {
    eventType: 'engagement',
    entityTypes: ['ui'],
    eventData: {
      uiType: 'button'
    },
    description: 'Fired when a creator clicks the "Create List" button on the empty All Lists page'
  },
  'shareable-list.sort.oldest': {
    eventType: 'engagement',
    entityTypes: ['ui'],
    eventData: {
      uiType: 'button'
    },
    expects: [],
    description: 'Fired when a creator sorts lists by oldest on the All Lists page'
  },
  'shareable-list.sort.newest': {
    eventType: 'engagement',
    entityTypes: ['ui'],
    eventData: {
      uiType: 'button'
    },
    expects: [],
    description: 'Fired when a creator sorts lists by newest on the All Lists page'
  },
  'shareable-list.delete.intent': {
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
    description: 'Fired when a creator clicks the Remove button on a list'
  },
  'shareable-list.delete.cancel': {
    eventType: 'engagement',
    entityTypes: ['ui'],
    eventData: {
      uiType: 'button'
    },
    description: 'Fired when a creator clicks the Cancel button in the Delete Modal'
  },
  'shareable-list.delete.confirm': {
    eventType: 'engagement',
    entityTypes: ['ui'],
    eventData: {
      uiType: 'button'
    },
    description: 'Fired when a creator clicks the Delete button in the Delete Modal'
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
  'shareable-list.public-link.copy.share-modal': {
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
    description: 'Fired when a user copies the public URL from the share modal'
  },
  'shareable-list.public-link.copy.header': {
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
    description: 'Fired when a user copies the public URL from the Individual List page header'
  },
  'shareable-list.public-link.copy.all-lists': {
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
    description:
      'Fired when a user copies the public URL from one of the List cards on the All Lists page'
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
  'shareable-list.item.add.cancel': {
    eventType: 'engagement',
    entityTypes: ['ui'],
    eventData: {
      uiType: 'button'
    },
    description: 'Fired when a creator cancels out of the Add to List modal'
  },
  'shareable-list.item.add.confirm': {
    eventType: 'engagement',
    entityTypes: ['ui', 'content'],
    eventData: {
      uiType: 'button'
    },
    expects: ['label', 'url'],
    description: 'Fired when a creator adds an item to a list'
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
