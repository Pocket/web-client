export const homeActions = {
  'home.topic.toggle': {
    eventType: 'engagement',
    entityTypes: ['ui'],
    eventData: {
      uiType: 'button'
    },
    expects: ['label']
  },
  'home.topic.open': {
    eventType: 'contentOpen',
    entityTypes: ['content', 'ui'],
    eventData: {
      uiType: 'card'
    },
    expects: ['id', 'url', 'position', 'destination']
  },
  'home.topic.impression': {
    eventType: 'impression',
    entityTypes: ['content', 'ui'],
    eventData: {
      component: 'ui',
      uiType: 'card'
    },
    expects: ['id', 'url', 'position']
  },
  'home.topic.save': {
    eventType: 'engagement',
    entityTypes: ['content', 'ui'],
    eventData: {
      engagementType: 'save',
      uiType: 'button'
    },
    expects: ['id', 'url', 'position']
  },
  'home.topic.view-more': {
    eventType: 'engagement',
    entityTypes: ['ui'],
    eventData: {
      uiType: 'link'
    },
    expects: ['label'],
    description: 'Fired when a user clicks the `View More Articles` link within each topic section'
  },
  'home.rec.open': {
    eventType: 'contentOpen',
    entityTypes: ['content', 'ui'],
    eventData: {
      uiType: 'card'
    },
    expects: ['id', 'url', 'position', 'destination']
  },
  'home.rec.impression': {
    eventType: 'impression',
    entityTypes: ['content', 'ui'],
    eventData: {
      component: 'ui',
      uiType: 'card'
    },
    expects: ['id', 'url', 'position']
  },
  'home.rec.save': {
    eventType: 'engagement',
    entityTypes: ['content', 'ui'],
    eventData: {
      engagementType: 'save',
      uiType: 'button'
    },
    expects: ['id', 'url', 'position']
  },
  'home.collection.open': {
    eventType: 'contentOpen',
    entityTypes: ['content', 'ui'],
    eventData: {
      destination: 'internal',
      uiType: 'card'
    },
    expects: ['url', 'position']
  },
  'home.collection.impression': {
    eventType: 'impression',
    entityTypes: ['content', 'ui'],
    eventData: {
      component: 'ui',
      uiType: 'card'
    },
    expects: ['url', 'position']
  },
  'home.collection.view-more': {
    eventType: 'engagement',
    entityTypes: ['ui'],
    eventData: {
      uiType: 'link'
    },
    description: 'Fired when a user clicks the `View More Articles` link within each topic section'
  },
  'home.beta.notice': {
    eventType: 'engagement',
    entityTypes: ['ui'],
    eventData: {
      uiType: 'link'
    },
    expects: ['value']
  }
}
