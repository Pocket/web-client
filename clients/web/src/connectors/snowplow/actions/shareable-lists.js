export const shareableListActions = {
  // shareable list

  'shareable-list.impression': {
    eventType: 'impression',
    entityTypes: ['ui', 'shareableList'],
    eventData: {
      component: 'card',
      uiType: 'card'
    },
    expects: [
      'shareableListExternalId',
      'listItemNoteVisibility',
      'title',
      'status',
      'moderationStatus',
      'position',
      'createdAt'
    ],
    description: 'Fired when a list is shown on the All Lists page'
  },
  'shareable-list.open': {
    eventType: 'contentOpen',
    entityTypes: ['ui', 'shareableList'],
    eventData: {
      uiType: 'card'
    },
    expects: [
      'shareableListExternalId',
      'listItemNoteVisibility',
      'title',
      'status',
      'moderationStatus',
      'position',
      'createdAt'
    ],
    description: 'Fired when a creator clicks on a List on the All Lists page'
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
  'shareable-list.create.cancel': {
    eventType: 'engagement',
    entityTypes: ['ui'],
    eventData: {
      uiType: 'button'
    },
    description: 'Fired when a creator cancels out of the "Create List" modal'
  },
  'shareable-list.create.submit': {
    eventType: 'engagement',
    entityTypes: ['ui'],
    eventData: {
      uiType: 'button'
    },
    description: 'Fired when a creator clicks the "Create List" button in the "Create List" modal'
  },
  'shareable-list.create.bulk.submit': {
    eventType: 'engagement',
    entityTypes: ['ui'],
    eventData: {
      uiType: 'button'
    },
    description:
      'Fired when a creator clicks the "Create List" button in the "Create List" modal after bulk edit'
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
      'listItemNoteVisibility',
      'title',
      'status',
      'moderationStatus',
      'createdAt'
    ],
    description: 'Fired when a creator clicks the "Delete" button on a list on the All Lists page'
  },
  'shareable-list.delete.cancel': {
    eventType: 'engagement',
    entityTypes: ['ui'],
    eventData: {
      uiType: 'button'
    },
    description: 'Fired when a creator clicks the "Cancel" button in the Delete Modal'
  },
  'shareable-list.delete.confirm': {
    eventType: 'engagement',
    entityTypes: ['ui'],
    eventData: {
      uiType: 'button'
    },
    description: 'Fired when a creator clicks the "Delete" button in the Delete Modal'
  },
  'shareable-list.edit-settings.intent': {
    eventType: 'engagement',
    entityTypes: ['ui', 'shareableList'],
    eventData: {
      uiType: 'button'
    },
    expects: [
      'shareableListExternalId',
      'listItemNoteVisibility',
      'title',
      'status',
      'moderationStatus',
      'createdAt'
    ],
    description: 'Fired when a creator clicks the "Settings" button on a list on the All Lists page'
  },
  'shareable-list.edit-settings.cancel': {
    eventType: 'engagement',
    entityTypes: ['ui', 'shareableList'],
    eventData: {
      uiType: 'button'
    },
    expects: [
      'shareableListExternalId',
      'listItemNoteVisibility',
      'title',
      'status',
      'moderationStatus',
      'createdAt'
    ],
    description: 'Fired when a creator cancels out of the List Settings modal'
  },
  'shareable-list.edit-settings.submit': {
    eventType: 'engagement',
    entityTypes: ['ui', 'shareableList'],
    eventData: {
      uiType: 'button'
    },
    expects: [
      'shareableListExternalId',
      'listItemNoteVisibility',
      'title',
      'status',
      'moderationStatus',
      'createdAt'
    ],
    description: 'Fired when a creator submits changes in the List Settings modal'
  },
  'shareable-list.status.update': {
    eventType: 'engagement',
    entityTypes: ['ui', 'shareableList'],
    eventData: {
      uiType: 'button'
    },
    expects: [
      'shareableListExternalId',
      'listItemNoteVisibility',
      'title',
      'status',
      'moderationStatus',
      'createdAt'
    ],
    description: 'Fired when a creator updates the List status'
  },
  'shareable-list.share': {
    eventType: 'engagement',
    entityTypes: ['ui', 'shareableList'],
    eventData: {
      uiType: 'button'
    },
    expects: [
      'shareableListExternalId',
      'listItemNoteVisibility',
      'title',
      'status',
      'moderationStatus',
      'createdAt'
    ],
    description: 'Fired when a creator clicks the "Share" button on a list'
  },
  'shareable-list.share.facebook': {
    eventType: 'engagement',
    entityTypes: ['shareableList', 'ui'],
    eventData: {
      uiType: 'button'
    },
    expects: [
      'shareableListExternalId',
      'listItemNoteVisibility',
      'title',
      'status',
      'moderationStatus',
      'createdAt'
    ],
    description: 'Fired when a creator clicks the "FB" button in the Share List modal'
  },
  'shareable-list.share.twitter': {
    eventType: 'engagement',
    entityTypes: ['shareableList', 'ui'],
    eventData: {
      uiType: 'button'
    },
    expects: [
      'shareableListExternalId',
      'listItemNoteVisibility',
      'title',
      'status',
      'moderationStatus',
      'createdAt'
    ],
    description: 'Fired when a creator clicks the "Twitter" button in the Share List modal'
  },
  'shareable-list.share.linkedin': {
    eventType: 'engagement',
    entityTypes: ['shareableList', 'ui'],
    eventData: {
      uiType: 'button'
    },
    expects: [
      'shareableListExternalId',
      'listItemNoteVisibility',
      'title',
      'status',
      'moderationStatus',
      'createdAt'
    ],
    description: 'Fired when a creator clicks the "LinkedIn" button in the Share List modal'
  },
  'shareable-list.share.reddit': {
    eventType: 'engagement',
    entityTypes: ['shareableList', 'ui'],
    eventData: {
      uiType: 'button'
    },
    expects: [
      'shareableListExternalId',
      'listItemNoteVisibility',
      'title',
      'status',
      'moderationStatus',
      'createdAt'
    ],
    description: 'Fired when a creator clicks the "Reddit" button in the Share List modal'
  },
  'shareable-list.share.mastodon': {
    eventType: 'engagement',
    entityTypes: ['shareableList', 'ui'],
    eventData: {
      uiType: 'button'
    },
    expects: [
      'shareableListExternalId',
      'listItemNoteVisibility',
      'title',
      'status',
      'moderationStatus',
      'createdAt'
    ],
    description: 'Fired when a creator clicks the "Mastodon" button in the Share List modal'
  },
  'shareable-list.share.buffer': {
    eventType: 'engagement',
    entityTypes: ['shareableList', 'ui'],
    eventData: {
      uiType: 'button'
    },
    expects: [
      'shareableListExternalId',
      'listItemNoteVisibility',
      'title',
      'status',
      'moderationStatus',
      'createdAt'
    ],
    description: 'Fired when a creator clicks the "Buffer" button in the Share List modal'
  },
  'shareable-list.share.copy': {
    eventType: 'engagement',
    entityTypes: ['shareableList', 'ui'],
    eventData: {
      uiType: 'button'
    },
    expects: [
      'shareableListExternalId',
      'listItemNoteVisibility',
      'title',
      'status',
      'moderationStatus',
      'createdAt'
    ],
    description: 'Fired when a creator clicks the "Copy Link" button in the Share List modal'
  },
  'shareable-list.public-link.copy.share-modal': {
    eventType: 'engagement',
    entityTypes: ['shareableList', 'ui'],
    eventData: {
      uiType: 'button'
    },
    expects: [
      'shareableListExternalId',
      'listItemNoteVisibility',
      'title',
      'status',
      'moderationStatus',
      'createdAt'
    ],
    description: 'Fired when a creator copies the public URL from the Share List modal'
  },
  'shareable-list.public-link.copy.header': {
    eventType: 'engagement',
    entityTypes: ['shareableList', 'ui'],
    eventData: {
      uiType: 'button'
    },
    expects: [
      'shareableListExternalId',
      'listItemNoteVisibility',
      'title',
      'status',
      'moderationStatus',
      'createdAt'
    ],
    description: 'Fired when a creator copies the public URL from the Individual List page header'
  },
  'shareable-list.public-link.copy.all-lists': {
    eventType: 'engagement',
    entityTypes: ['shareableList', 'ui'],
    eventData: {
      uiType: 'button'
    },
    expects: [
      'shareableListExternalId',
      'listItemNoteVisibility',
      'title',
      'status',
      'moderationStatus',
      'createdAt'
    ],
    description:
      'Fired when a creator copies the public URL from one of the List cards on the All Lists page'
  },
  'shareable-list.public-link.open.all-lists': {
    eventType: 'contentOpen',
    entityTypes: ['shareableList', 'ui'],
    eventData: {
      uiType: 'link'
    },
    expects: [
      'shareableListExternalId',
      'listItemNoteVisibility',
      'title',
      'status',
      'moderationStatus',
      'createdAt'
    ],
    description: 'Fired when a creator opens the public URL on the All Lists page'
  },
  'shareable-list.public-link.open.share-modal': {
    eventType: 'contentOpen',
    entityTypes: ['shareableList', 'ui'],
    eventData: {
      uiType: 'link'
    },
    expects: [
      'shareableListExternalId',
      'listItemNoteVisibility',
      'title',
      'status',
      'moderationStatus',
      'createdAt'
    ],
    description: 'Fired when a creator opens the public URL on the Share List modal'
  },
  'shareable-list.public-link.open.header': {
    eventType: 'contentOpen',
    entityTypes: ['shareableList', 'ui'],
    eventData: {
      uiType: 'link'
    },
    expects: [
      'shareableListExternalId',
      'listItemNoteVisibility',
      'title',
      'status',
      'moderationStatus',
      'createdAt'
    ],
    description: 'Fired when a creator opens the public URL on the Individual List page header'
  },
  'shareable-list.empty-list.go-to-saves': {
    eventType: 'engagement',
    entityTypes: ['shareableList', 'ui'],
    eventData: {
      uiType: 'button'
    },
    expects: [
      'shareableListExternalId',
      'listItemNoteVisibility',
      'title',
      'status',
      'moderationStatus',
      'createdAt'
    ],
    description:
      'Fired when a creator clicks the "Go to Saves" button on an empty Individual List page'
  },

  // shareable list ITEM
  'shareable-list.item.impression': {
    eventType: 'impression',
    entityTypes: ['ui', 'shareableListItem'],
    eventData: {
      component: 'card',
      uiType: 'card'
    },
    expects: [
      'shareableListItemExternalId',
      'shareableListExternalId',
      'givenUrl',
      'title',
      'publisher',
      'sortOrder',
      'position',
      'createdAt'
    ],
    description: 'Fired when a list item is shown on the Individual List page'
  },
  'shareable-list.item.add.create-list': {
    eventType: 'engagement',
    entityTypes: ['ui'],
    eventData: {
      uiType: 'button'
    },
    description: 'Fired when a creator clicks on the "Create List" link in the Add to List modal'
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
  'shareable-list.item.bulk.add.confirm': {
    eventType: 'engagement',
    entityTypes: ['ui'],
    eventData: {
      uiType: 'button'
    },
    expects: ['label'],
    description: 'Fired when a creator adds items to a list from bulk edit'
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
  'shareable-list.item.open': {
    eventType: 'contentOpen',
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
      'position',
      'createdAt'
    ],
    description: 'Fired when a creator opens a list item from the individual list page'
  },
  'shareable-list.item.open-original': {
    eventType: 'contentOpen',
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
      'position',
      'createdAt'
    ],
    description:
      'Fired when a creator clicks on the Publisher on a list item from the individual list page'
  },
  'shareable-list.item.note.add.intent': {
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
    description:
      'Fired when a creator clicks the Add Note button on a card on the individual list page'
  },
  'shareable-list.item.note.add.cancel': {
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
    description: 'Fired when a creator cancels out of the Add Note modal'
  },
  'shareable-list.item.note.add.submit': {
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
    description: 'Fired when a creator Saves a note in the Add Note modal'
  },
  'shareable-list.item.note.delete.intent': {
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
    description: 'Fired when a creator clicks the "Delete" button on a list on the All Lists page'
  },
  'shareable-list.item.note.delete.cancel': {
    eventType: 'engagement',
    entityTypes: ['ui'],
    eventData: {
      uiType: 'button'
    },
    description: 'Fired when a creator clicks the "X" button in the Delete Note Modal'
  },
  'shareable-list.item.note.delete.confirm': {
    eventType: 'engagement',
    entityTypes: ['ui'],
    eventData: {
      uiType: 'button'
    },
    description: 'Fired when a creator clicks the "Delete" button in the Delete Note Modal'
  },
  'shareable-list.item.note.edit.intent': {
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
    description:
      'Fired when a creator clicks the Edit Note button on a note on the individual list page'
  },
  'shareable-list.item.note.edit.cancel': {
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
    description: 'Fired when a creator cancels out of the Edit Note modal'
  },
  'shareable-list.item.note.edit.confirm': {
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
    description: 'Fired when a creator Saves a note in the Edit Note modal'
  },
  'shareable-list.reorder.intent': {
    eventType: 'engagement',
    entityTypes: ['ui', 'shareableList'],
    eventData: {
      uiType: 'button'
    },
    expects: [
      'shareableListExternalId',
      'listItemNoteVisibility',
      'title',
      'status',
      'moderationStatus',
      'createdAt'
    ],
    description: 'Fired when a creator clicks the Reorder button'
  },
  'shareable-list.reorder.cancel': {
    eventType: 'engagement',
    entityTypes: ['ui', 'shareableList'],
    eventData: {
      uiType: 'button'
    },
    expects: [
      'shareableListExternalId',
      'listItemNoteVisibility',
      'title',
      'status',
      'moderationStatus',
      'createdAt'
    ],
    description: 'Fired when a creator clicks the Cancel button after initiating a reorder'
  },
  'shareable-list.reorder.confirm': {
    eventType: 'engagement',
    entityTypes: ['ui', 'shareableList'],
    eventData: {
      uiType: 'button'
    },
    expects: [
      'shareableListExternalId',
      'listItemNoteVisibility',
      'title',
      'status',
      'moderationStatus',
      'createdAt'
    ],
    description: 'Fired when a creator clicks the Save button after initiating a reorder'
  },

  // PUBLIC list
  'public-list.save': {
    eventType: 'engagement',
    entityTypes: ['ui', 'shareableList'],
    eventData: {
      uiType: 'button'
    },
    expects: [
      'shareableListExternalId',
      'listItemNoteVisibility',
      'title',
      'status',
      'moderationStatus',
      'createdAt'
    ],
    description: 'Fired when a user saves a public list'
  },
  'public-list.unsave': {
    eventType: 'engagement',
    entityTypes: ['ui', 'shareableList'],
    eventData: {
      uiType: 'button'
    },
    expects: [
      'shareableListExternalId',
      'listItemNoteVisibility',
      'title',
      'status',
      'moderationStatus',
      'createdAt'
    ],
    description: 'Fired when a user unsaves a public list on the public list page'
  },
  'public-list.share': {
    eventType: 'engagement',
    entityTypes: ['ui', 'shareableList'],
    eventData: {
      uiType: 'button'
    },
    expects: [
      'shareableListExternalId',
      'listItemNoteVisibility',
      'title',
      'status',
      'moderationStatus',
      'createdAt'
    ],
    description: 'Fired when a creator clicks the "Share" button on a list on the public list page'
  },
  'public-list.share.facebook': {
    eventType: 'engagement',
    entityTypes: ['shareableList', 'ui'],
    eventData: {
      uiType: 'button'
    },
    expects: [
      'shareableListExternalId',
      'listItemNoteVisibility',
      'title',
      'status',
      'moderationStatus',
      'createdAt'
    ],
    description:
      'Fired when a creator clicks the "FB" button in the Share List modal on the public list page'
  },
  'public-list.share.twitter': {
    eventType: 'engagement',
    entityTypes: ['shareableList', 'ui'],
    eventData: {
      uiType: 'button'
    },
    expects: [
      'shareableListExternalId',
      'listItemNoteVisibility',
      'title',
      'status',
      'moderationStatus',
      'createdAt'
    ],
    description:
      'Fired when a creator clicks the "Twitter" button in the Share List modal on the public list page'
  },
  'public-list.share.linkedin': {
    eventType: 'engagement',
    entityTypes: ['shareableList', 'ui'],
    eventData: {
      uiType: 'button'
    },
    expects: [
      'shareableListExternalId',
      'listItemNoteVisibility',
      'title',
      'status',
      'moderationStatus',
      'createdAt'
    ],
    description:
      'Fired when a creator clicks the "LinkedIn" button in the Share List modal on the public list page'
  },
  'public-list.share.reddit': {
    eventType: 'engagement',
    entityTypes: ['shareableList', 'ui'],
    eventData: {
      uiType: 'button'
    },
    expects: [
      'shareableListExternalId',
      'listItemNoteVisibility',
      'title',
      'status',
      'moderationStatus',
      'createdAt'
    ],
    description:
      'Fired when a creator clicks the "Reddit" button in the Share List modal on the public list page'
  },
  'public-list.share.mastodon': {
    eventType: 'engagement',
    entityTypes: ['shareableList', 'ui'],
    eventData: {
      uiType: 'button'
    },
    expects: [
      'shareableListExternalId',
      'listItemNoteVisibility',
      'title',
      'status',
      'moderationStatus',
      'createdAt'
    ],
    description:
      'Fired when a creator clicks the "Mastodon" button in the Share List modal on the public list page'
  },
  'public-list.share.buffer': {
    eventType: 'engagement',
    entityTypes: ['shareableList', 'ui'],
    eventData: {
      uiType: 'button'
    },
    expects: [
      'shareableListExternalId',
      'listItemNoteVisibility',
      'title',
      'status',
      'moderationStatus',
      'createdAt'
    ],
    description:
      'Fired when a creator clicks the "Buffer" button in the Share List modal on the public list page'
  },
  'public-list.share.copy': {
    eventType: 'engagement',
    entityTypes: ['shareableList', 'ui'],
    eventData: {
      uiType: 'button'
    },
    expects: [
      'shareableListExternalId',
      'listItemNoteVisibility',
      'title',
      'status',
      'moderationStatus',
      'createdAt'
    ],
    description:
      'Fired when a creator clicks the "Copy Link" button in the Share List modal on the public list page'
  },
  'public-list.public-link.copy.share-modal': {
    eventType: 'engagement',
    entityTypes: ['shareableList', 'ui'],
    eventData: {
      uiType: 'button'
    },
    expects: [
      'shareableListExternalId',
      'listItemNoteVisibility',
      'title',
      'status',
      'moderationStatus',
      'createdAt'
    ],
    description:
      'Fired when a user copies the public URL from the Share List modal on the public list page'
  },
  'public-list.public-link.open.share-modal': {
    eventType: 'contentOpen',
    entityTypes: ['shareableList', 'ui'],
    eventData: {
      uiType: 'link'
    },
    expects: [
      'shareableListExternalId',
      'listItemNoteVisibility',
      'title',
      'status',
      'moderationStatus',
      'createdAt'
    ],
    description:
      'Fired when a user opens the public URL on the Share List modal  on the public list page'
  },
  'public-list.report': {
    eventType: 'engagement',
    entityTypes: ['ui', 'shareableList'],
    eventData: {
      uiType: 'button'
    },
    expects: [
      'shareableListExternalId',
      'listItemNoteVisibility',
      'title',
      'status',
      'moderationStatus',
      'createdAt'
    ],
    description: 'Fired when a user clicks the "Report" button on a public list page'
  },

  // PUBLIC list item
  'public-list.item.impression': {
    eventType: 'impression',
    entityTypes: ['ui', 'shareableListItem'],
    eventData: {
      component: 'card',
      uiType: 'card'
    },
    expects: [
      'shareableListItemExternalId',
      'shareableListExternalId',
      'givenUrl',
      'title',
      'publisher',
      'sortOrder',
      'position',
      'createdAt'
    ],
    description: 'Fired when a list item is shown on the Public List page'
  },
  'public-list.item.save': {
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
    description: 'Fired when a user saves an item from a public list page'
  },
  'public-list.item.unsave': {
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
    description: 'Fired when a user unsaves an item from a public list page'
  },
  'public-list.item.open': {
    eventType: 'contentOpen',
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
      'position',
      'createdAt'
    ],
    description: 'Fired when a user clicks on a list item on the public list page'
  },
  'public-list.item.open-original': {
    eventType: 'contentOpen',
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
      'position',
      'createdAt'
    ],
    description: 'Fired when a user clicks on the publisher on a list item on the public list page'
  }
}
