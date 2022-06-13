export const getStartedActions = {
  'get-started.topic.toggle': {
    eventType: 'engagement',
    entityTypes: ['ui'],
    eventData: {
      uiType: 'button'
    },
    expects: ['label', 'value'],
    description: 'value is either `select` or `deselect` depending on toggle outcome'
  },
  'get-started.topic.skip': {
    eventType: 'engagement',
    entityTypes: ['ui'],
    eventData: {
      uiType: 'button'
    },
    description: 'Clicking “Skip” on the `select-topics` page'
  },
  'get-started.topic.continue': {
    eventType: 'engagement',
    entityTypes: ['ui'],
    eventData: {
      uiType: 'button'
    },
    description: 'Clicking “Continue” on the `select-topics` page'
  },
  'get-started.article.skip': {
    eventType: 'engagement',
    entityTypes: ['ui'],
    eventData: {
      uiType: 'button'
    },
    description: 'Clicking “Skip” on the `select-article` page'
  },
  'get-started.article.impression': {
    eventType: 'impression',
    entityTypes: ['content', 'ui'],
    eventData: {
      component: 'card',
      uiType: 'card'
    },
    expects: ['url', 'position']
  },
  'get-started.article.save': {
    eventType: 'engagement',
    entityTypes: ['content', 'ui'],
    eventData: {
      engagementType: 'save',
      uiType: 'button'
    },
    expects: ['url', 'position'],
    description: 'Click “Save to My List” on a Card'
  },
  'get-started.article.modal.close': {
    eventType: 'engagement',
    entityTypes: ['ui'],
    eventData: {
      uiType: 'dialog'
    },
    description: 'Cancel the Save modal using the X close button or the escape key'
  },
  'get-started.article.modal.skip': {
    eventType: 'engagement',
    entityTypes: ['ui'],
    eventData: {
      uiType: 'button'
    },
    description: 'Click the “Discover more on Home” button'
  },
  'get-started.article.modal.continue': {
    eventType: 'engagement',
    entityTypes: ['ui'],
    eventData: {
      uiType: 'button'
    },
    description: 'Click the “Read Article” button'
  }
}
