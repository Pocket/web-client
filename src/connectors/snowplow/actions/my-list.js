export const myListActions = {
  'my-list.card.view-original': {
    eventType: 'contentOpen',
    entityTypes: ['content', 'ui'],
    eventData: {
      uiType: 'card'
    },
    expects: ['id', 'url', 'position', 'destination']
  },
  'my-list.card.permanent-library': {
    eventType: 'contentOpen',
    entityTypes: ['content', 'ui'],
    eventData: {
      destination: 'internal',
      uiType: 'card'
    },
    expects: ['id', 'url', 'position']
  },
  'my-list.card.open': {
    eventType: 'contentOpen',
    entityTypes: ['content', 'ui'],
    eventData: {
      uiType: 'card'
    },
    expects: ['id', 'url', 'position', 'destination']
  },
  'my-list.card.impression': {
    eventType: 'impression',
    entityTypes: ['content', 'ui'],
    eventData: {
      component: 'ui',
      uiType: 'card'
    },
    expects: ['id', 'url', 'position', 'label'],
    description: 'label captures the card type being displayed (list, detail, or grid)'
  },
  'my-list.share': {
    eventType: 'engagement',
    entityTypes: ['content', 'ui'],
    eventData: {
      uiType: 'button'
    },
    expects: ['id', 'url', 'position']
  },
  'my-list.delete': {
    eventType: 'engagement',
    entityTypes: ['content', 'ui'],
    eventData: {
      uiType: 'button'
    },
    expects: ['id', 'url', 'position']
  },
  'my-list.archive': {
    eventType: 'engagement',
    entityTypes: ['content', 'ui'],
    eventData: {
      uiType: 'button'
    },
    expects: ['id', 'url', 'position']
  },
  'my-list.unarchive': {
    eventType: 'engagement',
    entityTypes: ['content', 'ui'],
    eventData: {
      engagementType: 'save',
      uiType: 'button'
    },
    expects: ['id', 'url', 'position']
  },
  'my-list.favorite': {
    eventType: 'engagement',
    entityTypes: ['content', 'ui'],
    eventData: {
      uiType: 'button'
    },
    expects: ['id', 'url', 'position']
  },
  'my-list.un-favorite': {
    eventType: 'engagement',
    entityTypes: ['content', 'ui'],
    eventData: {
      uiType: 'button'
    },
    expects: ['id', 'url', 'position']
  },
  'my-list.tag': {
    eventType: 'engagement',
    entityTypes: ['content', 'ui'],
    eventData: {
      uiType: 'button'
    },
    expects: ['id', 'url', 'position']
  },
  'my-list.display.view': {
    eventType: 'engagement',
    entityTypes: ['ui'],
    eventData: {
      uiType: 'button'
    },
    expects: ['value']
  },
  'my-list.sort': {
    eventType: 'engagement',
    entityTypes: ['ui'],
    eventData: {
      uiType: 'menu'
    },
    expects: ['value']
  },
  'my-list.theme': {
    eventType: 'engagement',
    entityTypes: ['ui'],
    eventData: {
      uiType: 'button'
    },
    expects: ['value']
  }
}
