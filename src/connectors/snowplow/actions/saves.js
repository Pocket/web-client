export const savesActions = {
  'saves.card.view-original': {
    eventType: 'contentOpen',
    entityTypes: ['content', 'ui'],
    eventData: {
      uiType: 'card'
    },
    expects: ['id', 'url', 'position', 'destination']
  },
  'saves.card.permanent-library': {
    eventType: 'contentOpen',
    entityTypes: ['content', 'ui'],
    eventData: {
      destination: 'internal',
      uiType: 'card'
    },
    expects: ['id', 'url', 'position']
  },
  'saves.card.open': {
    eventType: 'contentOpen',
    entityTypes: ['content', 'ui'],
    eventData: {
      uiType: 'card'
    },
    expects: ['id', 'url', 'position', 'destination']
  },
  'saves.card.impression': {
    eventType: 'impression',
    entityTypes: ['content', 'ui'],
    eventData: {
      component: 'ui',
      uiType: 'card'
    },
    expects: ['id', 'url', 'position'],
    description: 'passing in label to capture the card type being displayed (list, detail, or grid). Not required'
  },
  'saves.share': {
    eventType: 'engagement',
    entityTypes: ['content', 'ui'],
    eventData: {
      uiType: 'button'
    },
    expects: ['id', 'url', 'position']
  },
  'saves.delete': {
    eventType: 'engagement',
    entityTypes: ['content', 'ui'],
    eventData: {
      uiType: 'button'
    },
    expects: ['id', 'url', 'position']
  },
  'saves.archive': {
    eventType: 'engagement',
    entityTypes: ['content', 'ui'],
    eventData: {
      uiType: 'button'
    },
    expects: ['id', 'url', 'position']
  },
  'saves.unarchive': {
    eventType: 'engagement',
    entityTypes: ['content', 'ui'],
    eventData: {
      engagementType: 'save',
      uiType: 'button'
    },
    expects: ['id', 'url', 'position']
  },
  'saves.favorite': {
    eventType: 'engagement',
    entityTypes: ['content', 'ui'],
    eventData: {
      uiType: 'button'
    },
    expects: ['id', 'url', 'position']
  },
  'saves.un-favorite': {
    eventType: 'engagement',
    entityTypes: ['content', 'ui'],
    eventData: {
      uiType: 'button'
    },
    expects: ['id', 'url', 'position']
  },
  'saves.tag': {
    eventType: 'engagement',
    entityTypes: ['content', 'ui'],
    eventData: {
      uiType: 'button'
    },
    expects: ['id', 'url', 'position']
  },
  'saves.display.view': {
    eventType: 'engagement',
    entityTypes: ['ui'],
    eventData: {
      uiType: 'button'
    },
    expects: ['value']
  },
  'saves.sort': {
    eventType: 'engagement',
    entityTypes: ['ui'],
    eventData: {
      uiType: 'menu'
    },
    expects: ['value']
  },
  'saves.theme': {
    eventType: 'engagement',
    entityTypes: ['ui'],
    eventData: {
      uiType: 'button'
    },
    expects: ['value']
  }
}
