export const globalNavActions = {
  'global-nav.save': {
    eventType: 'engagement',
    entityTypes: ['content', 'ui'],
    eventData: {
      engagementType: 'save',
      uiType: 'button'
    },
    expects: ['url'],
    description: 'A user clicks `Add` after entering a URL in the global nav'
  },
  'global-nav.search-discovery.submit': {
    eventType: 'engagement',
    entityTypes: ['ui'],
    eventData: {
      uiType: 'button'
    },
    expects: ['value'],
    description:
      'A user clicks `Search` while in the discovery search bar after entering a search term in the global nav'
  },
  'global-nav.search.submit': {
    eventType: 'engagement',
    entityTypes: ['ui'],
    eventData: {
      uiType: 'button'
    },
    expects: ['value'],
    description: 'A user clicks `Search` after entering a search term in the global nav [LEGACY]'
  },
  'global-nav.search.save.submit': {
    eventType: 'engagement',
    entityTypes: ['ui'],
    eventData: {
      uiType: 'button'
    },
    expects: ['value'],
    description: 'A user clicks `Search` after entering a search term in the global nav from saves'
  },
  'global-nav.search.global.submit': {
    eventType: 'engagement',
    entityTypes: ['ui'],
    eventData: {
      uiType: 'button'
    },
    expects: ['value'],
    description:
      'A user clicks `Search` after entering a search term in the global nav from NOT saves'
  },
  'global-nav.upgrade-link': {
    eventType: 'impression',
    entityTypes: ['ui'],
    eventData: {
      component: 'ui',
      uiType: 'button'
    },
    description: 'A user sees the Premium upsell button in the global nav'
  },
  'global-nav': {
    eventType: 'engagement',
    entityTypes: ['ui'],
    eventData: {
      uiType: 'button'
    },
    expects: ['label'],
    description:
      'This is for any link within the global nav (including mobile nav). The name of the button is passed through as `label`'
  },
  'global-nav.search': {
    eventType: 'engagement',
    entityTypes: ['ui'],
    eventData: {
      uiType: 'button'
    },
    description: 'A user clicks the magnifying glass icon in the global nav'
  },
  'global-nav.add-item': {
    eventType: 'engagement',
    entityTypes: ['ui'],
    eventData: {
      uiType: 'button'
    },
    description: 'A user clicks the plus icon in the global nav'
  },
  'global-nav.bulk-edit': {
    eventType: 'engagement',
    entityTypes: ['ui'],
    eventData: {
      uiType: 'button'
    },
    description: 'A user clicks the pencil/bulk-edit icon in the global nav'
  },
  'global-nav.bulk.delete': {
    eventType: 'engagement',
    entityTypes: ['ui'],
    batchEntityTypes: ['content'],
    eventData: {
      uiType: 'button'
    },
    expects: ['url', 'position'],
    description:
      'A user clicks the delete icon after selecting items in bulk edit - this does not include the delete confirmation'
  },
  'global-nav.bulk.tag': {
    eventType: 'engagement',
    entityTypes: ['ui'],
    batchEntityTypes: ['content'],
    eventData: {
      uiType: 'button'
    },
    expects: ['url', 'position'],
    description:
      'A user clicks the tag icon after selecting items in bulk edit - this does not include any engagement in the tag modal'
  },
  'global-nav.bulk.archive': {
    eventType: 'engagement',
    entityTypes: ['ui'],
    batchEntityTypes: ['content'],
    eventData: {
      uiType: 'button'
    },
    expects: ['url', 'position'],
    description:
      'A user clicks the archive icon after selecting items in bulk edit - this does not include the archive confirmation'
  },
  'global-nav.bulk.un-archive': {
    eventType: 'engagement',
    entityTypes: ['ui'],
    batchEntityTypes: ['content'],
    eventData: {
      engagementType: 'save',
      uiType: 'button'
    },
    expects: ['url', 'position'],
    description:
      'A user clicks the un-archive/add icon after selecting items in bulk edit - this does not include the confirmation'
  },
  'global-nav.bulk.favorite': {
    eventType: 'engagement',
    entityTypes: ['ui'],
    batchEntityTypes: ['content'],
    eventData: {
      uiType: 'button'
    },
    expects: ['url', 'position'],
    description:
      'A user clicks the favorite icon after selecting items in bulk edit - this does not include the confirmation'
  },
  'global-nav.bulk.un-favorite': {
    eventType: 'engagement',
    entityTypes: ['ui'],
    batchEntityTypes: ['content'],
    eventData: {
      uiType: 'button'
    },
    expects: ['url', 'position'],
    description:
      'A user clicks the un-favorite icon after selecting items in bulk edit - this does not include the confirmation'
  },
  'global-nav.bulk.add-to-list': {
    eventType: 'engagement',
    entityTypes: ['ui'],
    batchEntityTypes: ['content'],
    eventData: {
      uiType: 'button'
    },
    expects: ['url', 'position'],
    description:
      'A user clicks the Add to List button after selecting items in bulk edit - this does not include any engagement in the add to list modal'
  }
}
