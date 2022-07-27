export const syndicatedArticleActions = {
  'syndicated.article.save': {
    eventType: 'engagement',
    entityTypes: ['content', 'ui'],
    eventData: {
      engagementType: 'save',
      uiType: 'button'
    },
    expects: ['id', 'url', 'value'],
    description:
      'Fired when a user clicks the `Save` button, value is one of three: save-story-top, save-story-side, or save-story-bottom'
  },
  'syndicated.share.facebook': {
    eventType: 'engagement',
    entityTypes: ['content', 'ui'],
    eventData: {
      uiType: 'button'
    },
    expects: ['id', 'url']
  },
  'syndicated.share.twitter': {
    eventType: 'engagement',
    entityTypes: ['content', 'ui'],
    eventData: {
      uiType: 'button'
    },
    expects: ['id', 'url']
  },
  'syndicated.share.linkedin': {
    eventType: 'engagement',
    entityTypes: ['content', 'ui'],
    eventData: {
      uiType: 'button'
    },
    expects: ['id', 'url']
  },
  'syndicated.share.reddit': {
    eventType: 'engagement',
    entityTypes: ['content', 'ui'],
    eventData: {
      uiType: 'button'
    },
    expects: ['id', 'url']
  },
  'syndicated.share.email': {
    eventType: 'engagement',
    entityTypes: ['content', 'ui'],
    eventData: {
      uiType: 'button'
    },
    expects: ['id', 'url']
  },
  'syndicated.topic.click': {
    eventType: 'engagement',
    entityTypes: ['ui'],
    eventData: {
      uiType: 'button'
    },
    expects: ['label'],
    description:
      'Fired when a user clicks a topic in the `Discover More Topics` section at the bottom of the page'
  }
}
