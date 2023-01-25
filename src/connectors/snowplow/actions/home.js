export const homeActions = {
  'home.topic.click': {
    eventType: 'engagement',
    entityTypes: ['ui'],
    eventData: {
      uiType: 'button'
    },
    expects: ['label'],
    description:
      'Fired when a user clicks a topic in the `Discover More Topics` section at the bottom of the page'
  },
  'home.recent.impression': {
    eventType: 'impression',
    entityTypes: ['content', 'ui'],
    eventData: {
      component: 'ui',
      uiType: 'card'
    },
    expects: ['id', 'url', 'position']
  },
  'home.recent.open': {
    eventType: 'contentOpen',
    entityTypes: ['content', 'ui'],
    eventData: {
      destination: 'internal',
      uiType: 'card'
    },
    expects: ['url', 'position']
  },
  'home.recent.view-original': {
    eventType: 'contentOpen',
    entityTypes: ['content', 'ui'],
    eventData: {
      uiType: 'card'
    },
    expects: ['id', 'url', 'position', 'destination']
  },
  'home.recent.view-saves': {
    eventType: 'engagement',
    entityTypes: ['ui'],
    eventData: {
      uiType: 'link'
    },
    description: 'Fired when a user clicks the `Go to Saves` link in the recent saves section'
  },
  'home.corpus.save': {
    eventType: 'engagement',
    entityTypes: ['content', 'ui', 'corpusRecommendation'],
    eventData: {
      engagementType: 'save',
      uiType: 'button'
    },
    expects: ['corpusRecommendationId', 'url'],
    description: 'Click “Save” on a card in baseline home'
  },
  'home.corpus.unsave': {
    eventType: 'engagement',
    entityTypes: ['content', 'ui', 'corpusRecommendation'],
    eventData: {
      engagementType: 'general',
      uiType: 'button'
    },
    expects: ['corpusRecommendationId', 'url'],
    description: 'Click “UnSave” on a card in baseline home'
  },
  'home.corpus.impression': {
    eventType: 'impression',
    entityTypes: ['content', 'ui', 'corpusRecommendation'],
    eventData: {
      component: 'ui',
      uiType: 'card'
    },
    expects: ['corpusRecommendationId', 'url']
  },
  'home.corpus.view-original': {
    eventType: 'contentOpen',
    entityTypes: ['content', 'ui', 'corpusRecommendation'],
    eventData: {
      uiType: 'card'
    },
    expects: ['corpusRecommendationId', 'url']
  },
  'home.corpus.open': {
    eventType: 'contentOpen',
    entityTypes: ['content', 'ui', 'corpusRecommendation'],
    eventData: {
      component: 'ui',
      uiType: 'card'
    },
    expects: ['corpusRecommendationId', 'url']
  },
  'home.topic.view-more': {
    eventType: 'engagement',
    entityTypes: ['ui'],
    eventData: {
      uiType: 'link'
    },
    expects: ['label'],
    description: 'Fired when a user clicks the `Exlore more *` link within each topic section'
  },
}
