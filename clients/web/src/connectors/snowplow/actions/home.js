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
    expects: ['url', 'position'],
    description: 'Fired when a card in the `Recent Saves` section scrolls into view'
  },
  'home.recent.open': {
    eventType: 'contentOpen',
    entityTypes: ['content', 'ui'],
    eventData: {
      destination: 'internal',
      uiType: 'card'
    },
    expects: ['url', 'position'],
    description: 'Fired when a user clicks a card in the `Recent Saves` section'
  },
  'home.recent.view-original': {
    eventType: 'contentOpen',
    entityTypes: ['content', 'ui'],
    eventData: {
      uiType: 'card'
    },
    expects: ['url', 'position', 'destination'],
    description: 'Fired when a user clicks the publisher in a card in the `Recent Saves` section'
  },
  'home.recent.view-saves': {
    eventType: 'engagement',
    entityTypes: ['ui'],
    eventData: {
      uiType: 'link'
    },
    description: 'Fired when a user clicks the `Go to Saves` link in the recent saves section'
  },
  'home.hits.carousel-forward': {
    eventType: 'engagement',
    entityTypes: ['ui'],
    eventData: {
      uiType: 'button'
    },
    description: 'Fired when a user clicks the pocket hits carousel forward button'
  },
  'home.hits.carousel-back': {
    eventType: 'engagement',
    entityTypes: ['ui'],
    eventData: {
      uiType: 'button'
    },
    description: 'Fired when a user clicks the pocket hits carousel back button'
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
    expects: ['corpusRecommendationId', 'url'],
    description: 'Fired when a card on Home scrolls into view'
  },
  'home.corpus.view-original': {
    eventType: 'contentOpen',
    entityTypes: ['content', 'ui', 'corpusRecommendation'],
    eventData: {
      uiType: 'card'
    },
    expects: ['corpusRecommendationId', 'url'],
    description: 'Fired when a user clicks the publisher in a card on Home'
  },
  'home.corpus.open': {
    eventType: 'contentOpen',
    entityTypes: ['content', 'ui', 'corpusRecommendation'],
    eventData: {
      component: 'ui',
      uiType: 'card'
    },
    expects: ['corpusRecommendationId', 'url'],
    description: 'Fired when a user clicks a card on Home'
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
  'home.slate.thumbsup': {
    eventType: 'engagement',
    entityTypes: ['content', 'ui', 'corpusRecommendation'],
    eventData: {
      uiType: 'button'
    },
    expects: ['corpusRecommendationId', 'url'],
    description: 'Fired when a user clicks the thumbsup button on an article'
  },
  'home.slate.thumbsdown': {
    eventType: 'engagement',
    entityTypes: ['content', 'ui', 'corpusRecommendation'],
    eventData: {
      uiType: 'button'
    },
    expects: ['corpusRecommendationId', 'url'],
    description: 'Fired when a user clicks the thumbsdown button on an article'
  },
  'home.share-interstitial.save': {
    eventType: 'engagement',
    entityTypes: ['content', 'ui'],
    eventData: {
      engagementType: 'save',
      uiType: 'button'
    },
    expects: ['url'],
    description: 'Click “Save” on the shared card in the share interstitial'
  },
  'home.share-interstitial.unsave': {
    eventType: 'engagement',
    entityTypes: ['content', 'ui'],
    eventData: {
      engagementType: 'general',
      uiType: 'button'
    },
    expects: ['url'],
    description: 'Click “UnSave” on the shared card in the share interstitial'
  },
  'home.share-interstitial.impression': {
    eventType: 'impression',
    entityTypes: ['content', 'ui'],
    eventData: {
      component: 'ui',
      uiType: 'card'
    },
    expects: ['url'],
    description: 'Fired when the shared card in the share interstitial is seen'
  },
  'home.share-interstitial.view-original': {
    eventType: 'contentOpen',
    entityTypes: ['content', 'ui'],
    eventData: {
      uiType: 'card'
    },
    expects: ['url'],
    description:
      'Fired when a user clicks the publisher in the shared card in the share interstitial'
  },
  'home.share-interstitial.open': {
    eventType: 'contentOpen',
    entityTypes: ['content', 'ui'],
    eventData: {
      component: 'ui',
      uiType: 'card'
    },
    expects: ['url'],
    description: 'Fired when a user clicks on the shared card in the share interstitial'
  }
}
