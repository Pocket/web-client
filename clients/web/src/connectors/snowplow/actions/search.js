export const searchActions = {
  'search.corpus.save': {
    eventType: 'engagement',
    entityTypes: ['content', 'ui'],
    eventData: {
      engagementType: 'save',
      uiType: 'button'
    },
    expects: ['url', 'position'],
    description: 'Click “Save” on a card in baseline home'
  },
  'search.corpus.unsave': {
    eventType: 'engagement',
    entityTypes: ['content', 'ui'],
    eventData: {
      engagementType: 'general',
      uiType: 'button'
    },
    expects: ['url', 'position'],
    description: 'Click “UnSave” on a card in baseline home'
  },
  'search.corpus.impression': {
    eventType: 'impression',
    entityTypes: ['content', 'ui'],
    eventData: {
      component: 'ui',
      uiType: 'card'
    },
    expects: ['url', 'position'],
    description: 'Fired when a card on Home scrolls into view'
  },
  'search.corpus.view-original': {
    eventType: 'contentOpen',
    entityTypes: ['content', 'ui'],
    eventData: {
      uiType: 'card'
    },
    expects: ['url', 'position'],
    description: 'Fired when a user clicks the publisher in a card on Home'
  },
  'search.corpus.open': {
    eventType: 'contentOpen',
    entityTypes: ['content', 'ui'],
    eventData: {
      component: 'ui',
      uiType: 'card'
    },
    expects: ['url', 'position'],
    description: 'Fired when a user clicks a card on Home'
  }
}
