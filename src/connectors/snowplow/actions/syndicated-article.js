export const syndicatedArticleActions = {
  'syndicated.article.save': {
    eventType: 'engagement',
    entityTypes: ['content', 'ui'],
    eventData: {
      engagementType: 'save',
      uiType: 'button'
    },
    expects: ['url', 'value'],
    description:
      'Fired when a user clicks the `Save` button, value is one of three: save-story-top, save-story-side, or save-story-bottom'
  },
  'syndicated.share.facebook': {
    eventType: 'engagement',
    entityTypes: ['content', 'ui'],
    eventData: {
      uiType: 'button'
    },
    expects: ['url'],
    description: 'Fired when a user clicks the FB button on a syndicated article'
  },
  'syndicated.share.twitter': {
    eventType: 'engagement',
    entityTypes: ['content', 'ui'],
    eventData: {
      uiType: 'button'
    },
    expects: ['url'],
    description: 'Fired when a user clicks the Twitter button on a syndicated article'
  },
  'syndicated.share.linkedin': {
    eventType: 'engagement',
    entityTypes: ['content', 'ui'],
    eventData: {
      uiType: 'button'
    },
    expects: ['url'],
    description: 'Fired when a user clicks the LinkedIn button on a syndicated article'
  },
  'syndicated.share.reddit': {
    eventType: 'engagement',
    entityTypes: ['content', 'ui'],
    eventData: {
      uiType: 'button'
    },
    expects: ['url'],
    description: 'Fired when a user clicks the Reddit button on a syndicated article'
  },
  'syndicated.share.mastodon': {
    eventType: 'engagement',
    entityTypes: ['content', 'ui'],
    eventData: {
      uiType: 'button'
    },
    expects: ['url'],
    description: 'Fired when a user clicks the Mastodon button on a syndicated article'
  },
  'syndicated.share.email': {
    eventType: 'engagement',
    entityTypes: ['content', 'ui'],
    eventData: {
      uiType: 'button'
    },
    expects: ['url'],
    description: 'Fired when a user clicks the email button on a syndicated article'
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
  },
  'syndicated.attribution.click': {
    eventType: 'engagement',
    entityTypes: ['ui'],
    eventData: {
      uiType: 'button'
    },
    expects: ['label'],
    description:
      'Fired when a user clicks the link in the publisher attribution at the bottom of the page'
  },
  'syndicated.attribution.impression': {
    eventType: 'impression',
    entityTypes: ['ui'],
    eventData: {
      uiType: 'button',
      component: 'button'
    },
    expects: ['label'],
    description:
      'Fired when a user sees the link in the publisher attribution at the bottom of the page'
  },
  'syndicated.rec.bottom.impression': {
    eventType: 'impression',
    entityTypes: ['content', 'ui', 'corpusRecommendation'],
    eventData: {
      component: 'ui',
      uiType: 'card'
    },
    expects: ['corpusRecommendationId', 'url', 'position'],
    description: 'Fired when a rec at the bottom of a syndicated article scrolls into view'
  },
  'syndicated.rec.bottom.open': {
    eventType: 'contentOpen',
    entityTypes: ['content', 'ui', 'corpusRecommendation'],
    eventData: {
      component: 'ui',
      uiType: 'card',
      destination: 'internal'
    },
    expects: ['corpusRecommendationId', 'url', 'position'],
    description: 'Fired when a user clicks a rec at the bottom of a syndicated article'
  },
  'syndicated.rec.sidebar.impression': {
    eventType: 'impression',
    entityTypes: ['content', 'ui', 'corpusRecommendation'],
    eventData: {
      component: 'ui',
      uiType: 'link'
    },
    expects: ['corpusRecommendationId', 'url', 'position'],
    description: 'Fired when a rec in the sidebar of a syndicated article scrolls into view'
  },
  'syndicated.rec.sidebar.open': {
    eventType: 'contentOpen',
    entityTypes: ['content', 'ui', 'corpusRecommendation'],
    eventData: {
      component: 'ui',
      uiType: 'link',
      destination: 'external'
    },
    expects: ['corpusRecommendationId', 'url', 'position'],
    description: 'Fired when a user clicks a rec in the sidebar of a syndicated article'
  }
}
