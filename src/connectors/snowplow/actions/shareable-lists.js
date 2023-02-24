export const shareableListActions = {
  // this is fake, I just wanted to mock one out - will replace with real event soon
  'shareable-list.make-list-public': {
    eventType: 'engagement',
    entityTypes: ['ui', 'shareableList'],
    eventData: {
      uiType: 'button'
    },
    expects: [
      'shareableListExternalId',
      'userId',
      'slug',
      'title',
      'status',
      'moderationStatus',
      'createdAt'
    ],
    description: 'Fired when a user makes a list public'
  }
}
