export const savesActions = {
  'saves.card.view-original': {
    eventType: 'contentOpen',
    entityTypes: ['content', 'ui'],
    eventData: {
      uiType: 'card'
    },
    expects: ['url', 'position', 'destination'],
    description: 'Fired when a user clicks the publisher in a card on Saves'
  },
  'saves.card.permanent-library': {
    eventType: 'contentOpen',
    entityTypes: ['content', 'ui'],
    eventData: {
      destination: 'internal',
      uiType: 'card'
    },
    expects: ['url', 'position'],
    description: 'Fired when a user clicks the Permanent Library icon in a card on Saves'
  },
  'saves.card.open': {
    eventType: 'contentOpen',
    entityTypes: ['content', 'ui'],
    eventData: {
      uiType: 'card'
    },
    expects: ['url', 'position', 'destination'],
    description: 'Fired when a user clicks the card on Saves'
  },
  'saves.card.impression': {
    eventType: 'impression',
    entityTypes: ['content', 'ui'],
    eventData: {
      component: 'ui',
      uiType: 'card'
    },
    expects: ['url', 'position'],
    description:
      'Fired when a card scrolls into view on Saves; passing in label to capture the card type being displayed (list, detail, or grid). Not required'
  },
  'saves.share': {
    eventType: 'engagement',
    entityTypes: ['content', 'ui'],
    eventData: {
      uiType: 'button'
    },
    expects: ['url', 'position'],
    description: 'Fired when a user clicks the Share icon in a card on Saves'
  },
  'saves.delete': {
    eventType: 'engagement',
    entityTypes: ['content', 'ui'],
    eventData: {
      uiType: 'button'
    },
    expects: ['url', 'position'],
    description: 'Fired when a user clicks the Delete icon in a card on Saves'
  },
  'saves.archive': {
    eventType: 'engagement',
    entityTypes: ['content', 'ui'],
    eventData: {
      uiType: 'button'
    },
    expects: ['url', 'position'],
    description: 'Fired when a user clicks the Archive icon in a card on Saves'
  },
  'saves.unarchive': {
    eventType: 'engagement',
    entityTypes: ['content', 'ui'],
    eventData: {
      engagementType: 'save',
      uiType: 'button'
    },
    expects: ['url', 'position'],
    description: 'Fired when a user clicks the Un-Archive/Add icon in a card on Saves'
  },
  'saves.favorite': {
    eventType: 'engagement',
    entityTypes: ['content', 'ui'],
    eventData: {
      uiType: 'button'
    },
    expects: ['url', 'position'],
    description: 'Fired when a user clicks the Favorite icon in a card on Saves'
  },
  'saves.un-favorite': {
    eventType: 'engagement',
    entityTypes: ['content', 'ui'],
    eventData: {
      uiType: 'button'
    },
    expects: ['url', 'position'],
    description: 'Fired when a user clicks the Un-Favorite icon in a card on Saves'
  },
  'saves.tag': {
    eventType: 'engagement',
    entityTypes: ['content', 'ui'],
    eventData: {
      uiType: 'button'
    },
    expects: ['url', 'position'],
    description: 'Fired when a user clicks the Tag icon in a card on Saves'
  },
  'saves.add-to-list': {
    eventType: 'engagement',
    entityTypes: ['ui', 'content'],
    eventData: {
      uiType: 'button'
    },
    expects: ['url', 'position'],
    description: 'Fired when a creator opens the Add to List modal'
  },
  'saves.refresh': {
    eventType: 'engagement',
    entityTypes: ['ui', 'content'],
    eventData: {
      uiType: 'button'
    },
    expects: ['url', 'position'],
    description: 'Fired when a user clicks the Refresh icon in a card on Saves'
  },
  'saves.display.view': {
    eventType: 'engagement',
    entityTypes: ['ui'],
    eventData: {
      uiType: 'button'
    },
    expects: ['value'],
    description:
      'Fired when a user changes the view type from the Account dropdown; value is the new setting'
  },
  'saves.sort': {
    eventType: 'engagement',
    entityTypes: ['ui'],
    eventData: {
      uiType: 'menu'
    },
    expects: ['value'],
    description: 'Fired when a user changes the sort type on Saves'
  },
  'saves.theme': {
    eventType: 'engagement',
    entityTypes: ['ui'],
    eventData: {
      uiType: 'button'
    },
    expects: ['value'],
    description:
      'Fired when a user clicks changes the theme from the Account dropdown; value is the new setting'
  }
}
