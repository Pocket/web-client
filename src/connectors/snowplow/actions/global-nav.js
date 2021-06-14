export const globalNavActions = {
  'global-nav.save': {
    eventType: 'engagement',
    entityTypes: ['content', 'ui'],
    eventData: {
      engagementType: 'save',
      uiType: 'button'
    },
    expects: ['url']
  },
  'global-nav.search.submit': {
    eventType: 'engagement',
    entityTypes: ['ui'],
    eventData: {
      uiType: 'button'
    },
    expects: ['value']
  },
  'global-nav.upgrade-link': {
    eventType: 'impression',
    entityTypes: ['ui'],
    eventData: {
      component: 'ui',
      uiType: 'button'
    }
  },
  'global-nav': {
    eventType: 'engagement',
    entityTypes: ['ui'],
    eventData: {
      uiType: 'button'
    },
    expects: ['label'],
    description: 'This is for any link within the global nav (including mobile nav). The name of the button is passed through as `label`'
  },
  'global-nav.search': {
    eventType: 'engagement',
    entityTypes: ['ui'],
    eventData: {
      uiType: 'button'
    }
  },
  'global-nav.add-item': {
    eventType: 'engagement',
    entityTypes: ['ui'],
    eventData: {
      uiType: 'button'
    }
  },
  'global-nav.bulk-edit': {
    eventType: 'engagement',
    entityTypes: ['ui'],
    eventData: {
      uiType: 'button'
    }
  },
  'global-nav.bulk.delete': {
    eventType: 'engagement',
    entityTypes: ['ui'],
    batchEntityTypes: ['content'],
    eventData: {
      uiType: 'button'
    },
    expects: ['id', 'url', 'position']
  },
  'global-nav.bulk.tag': {
    eventType: 'engagement',
    entityTypes: ['ui'],
    batchEntityTypes: ['content'],
    eventData: {
      uiType: 'button'
    },
    expects: ['id', 'url', 'position']
  },
  'global-nav.bulk.archive': {
    eventType: 'engagement',
    entityTypes: ['ui'],
    batchEntityTypes: ['content'],
    eventData: {
      uiType: 'button'
    },
    expects: ['id', 'url', 'position']
  },
  'global-nav.bulk.un-archive': {
    eventType: 'engagement',
    entityTypes: ['ui'],
    batchEntityTypes: ['content'],
    eventData: {
      engagementType: 'save',
      uiType: 'button'
    },
    expects: ['id', 'url', 'position']
  },
  'global-nav.bulk.favorite': {
    eventType: 'engagement',
    entityTypes: ['ui'],
    batchEntityTypes: ['content'],
    eventData: {
      uiType: 'button'
    },
    expects: ['id', 'url', 'position']
  },
  'global-nav.bulk.un-favorite': {
    eventType: 'engagement',
    entityTypes: ['ui'],
    batchEntityTypes: ['content'],
    eventData: {
      uiType: 'button'
    },
    expects: ['id', 'url', 'position']
  }
}
