export const collectionsActions = {
  'collection.impression': {
    eventType: 'impression',
    entityTypes: ['content', 'ui'],
    eventData: {
      component: 'ui',
      uiType: 'card'
    },
    expects: ['url', 'position']
  },
  'collection.open': {
    eventType: 'contentOpen',
    entityTypes: ['content', 'ui'],
    eventData: {
      uiType: 'card'
    },
    expects: ['url', 'position', 'destination']
  },
  'collection.save': {
    eventType: 'engagement',
    entityTypes: ['content', 'ui'],
    eventData: {
      engagementType: 'save',
      uiType: 'button'
    },
    expects: ['url', 'position']
  },
  'collection.story.impression': {
    eventType: 'impression',
    entityTypes: ['content', 'ui'],
    eventData: {
      component: 'ui',
      uiType: 'card'
    },
    expects: ['url', 'position']
  },
  'collection.story.open': {
    eventType: 'contentOpen',
    entityTypes: ['content', 'ui'],
    eventData: {
      uiType: 'card'
    },
    expects: ['url', 'position', 'destination']
  },
  'collection.story.save': {
    eventType: 'engagement',
    entityTypes: ['content', 'ui'],
    eventData: {
      engagementType: 'save',
      uiType: 'button'
    },
    expects: ['url', 'position']
  },
  'collection.page.save': {
    eventType: 'engagement',
    entityTypes: ['content', 'ui'],
    eventData: {
      engagementType: 'save',
      uiType: 'button'
    },
    expects: ['url', 'value'],
    description: 'Fired when a user clicks the `Save` button, value is one of three: save-story-top, save-story-side, or save-story-bottom'
  },
  'collection.share.facebook': {
    eventType: 'engagement',
    entityTypes: ['content', 'ui'],
    eventData: {
      uiType: 'button'
    },
    expects: ['url']
  },
  'collection.share.twitter': {
    eventType: 'engagement',
    entityTypes: ['content', 'ui'],
    eventData: {
      uiType: 'button'
    },
    expects: ['url']
  },
  'collection.share.linkedin': {
    eventType: 'engagement',
    entityTypes: ['content', 'ui'],
    eventData: {
      uiType: 'button'
    },
    expects: ['url']
  },
  'collection.share.reddit': {
    eventType: 'engagement',
    entityTypes: ['content', 'ui'],
    eventData: {
      uiType: 'button'
    },
    expects: ['url']
  },
  'collection.share.email': {
    eventType: 'engagement',
    entityTypes: ['content', 'ui'],
    eventData: {
      uiType: 'button'
    },
    expects: ['url']
  }
}
