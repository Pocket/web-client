export const shareableListActions = {
  'shareable-list.share': {
    eventType: 'engagement',
    entityTypes: ['ui', 'shareableList'],
    eventData: {
      uiType: 'button'
    },
    expects: ['shareableListExternalId', 'slug', 'title', 'status', 'createdAt'],
    description: 'Fired when a creator clicks the Share button on a list'
  }
}
