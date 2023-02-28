export const readerActions = {
  'reader.external-link': {
    eventType: 'contentOpen',
    entityTypes: ['content', 'ui'],
    eventData: {
      destination: 'external',
      uiType: 'link'
    },
    expects: ['url'],
    description: 'Fires when any link within the content of an article is clicked'
  },
  'reader.view-original': {
    eventType: 'contentOpen',
    entityTypes: ['content', 'ui'],
    eventData: {
      destination: 'external',
      uiType: 'link'
    },
    expects: ['url'],
    description: 'Fires when a user clicks the View Original link at the top of Reader'
  },
  'reader.bottom.premium': {
    eventType: 'impression',
    entityTypes: ['ui'],
    eventData: {
      component: 'ui',
      uiType: 'button'
    },
    description: 'Upgrade section on the bottom of page for non-premium users'
  },
  'reader.rec.open': {
    eventType: 'contentOpen',
    entityTypes: ['content', 'ui', 'corpusRecommendation'],
    eventData: {
      uiType: 'card'
    },
    expects: ['corpusRecommendationId', 'url', 'position', 'destination'],
    description: 'Fired when a user clicks a Rec at the bottom of Reader'
  },
  'reader.rec.impression': {
    eventType: 'impression',
    entityTypes: ['content', 'ui', 'corpusRecommendation'],
    eventData: {
      component: 'ui',
      uiType: 'card'
    },
    expects: ['corpusRecommendationId', 'url', 'position'],
    description: 'Fired when a Rec scrolls into view at the bottom of Reader'
  },
  'reader.rec.save': {
    eventType: 'engagement',
    entityTypes: ['content', 'ui', 'corpusRecommendation'],
    eventData: {
      engagementType: 'save',
      uiType: 'button',
    },
    expects: ['corpusRecommendationId', 'url', 'position'],
    description: 'Fired when a user Saves a Rec at the bottom of Reader'
  },
  'reader.rec.unsave': {
    eventType: 'engagement',
    entityTypes: ['content', 'ui', 'corpusRecommendation'],
    eventData: {
      uiType: 'button'
    },
    expects: ['corpusRecommendationId', 'url', 'position'],
    description: 'Fired when a user clicks the `Saved` button post-save on a Rec at the bottom of Reader'
  },
  'highlights.limit.sidebar': {
    eventType: 'impression',
    entityTypes: ['ui'],
    eventData: {
      component: 'ui',
      uiType: 'button'
    },
    description: 'Fired when a user sees the premium upsell in the sidebar after making 3 highlights on Reader'
  },
  'highlights.limit.modal': {
    eventType: 'impression',
    entityTypes: ['ui'],
    eventData: {
      component: 'ui',
      uiType: 'dialog'
    },
    description:
      'Upgrade modal that appears when a non-premium user attempts to make a 4th highlight'
  },
  'reader.display-settings': {
    eventType: 'impression',
    entityTypes: ['ui'],
    eventData: {
      component: 'ui',
      uiType: 'menu'
    },
    description: 'Upgrade link that appears in display settings dropdown for non-premium users'
  },
  'reader.delete': {
    eventType: 'engagement',
    entityTypes: ['content', 'ui'],
    eventData: {
      uiType: 'button'
    },
    expects: ['url'],
    description: 'Fired when a user deletes an article via the top toolbar on Reader'
  },
  'reader.archive': {
    eventType: 'engagement',
    entityTypes: ['content', 'ui'],
    eventData: {
      uiType: 'button'
    },
    expects: ['url'],
    description: 'Fired when a user archives an article via the top toolbar on Reader'
  },
  'reader.un-archive': {
    eventType: 'engagement',
    entityTypes: ['content', 'ui'],
    eventData: {
      engagementType: 'save',
      uiType: 'button'
    },
    expects: ['url'],
    description: 'Fired when a user un-archives/adds an article via the top toolbar on Reader'
  },
  'reader.tag': {
    eventType: 'engagement',
    entityTypes: ['content', 'ui'],
    eventData: {
      uiType: 'button'
    },
    expects: ['url'],
    description: 'Fired when a user clicks the Tag button in the top toolbar on Reader'
  },
  'reader.favorite': {
    eventType: 'engagement',
    entityTypes: ['content', 'ui'],
    eventData: {
      uiType: 'button'
    },
    expects: ['url'],
    description: 'Fired when a user favorites an article via the top toolbar on Reader'
  },
  'reader.un-favorite': {
    eventType: 'engagement',
    entityTypes: ['content', 'ui'],
    eventData: {
      uiType: 'button'
    },
    expects: ['url'],
    description: 'Fired when a user un-favorites an article via the top toolbar on Reader'
  },
  'reader.add-highlight': {
    eventType: 'engagement',
    entityTypes: ['content', 'ui'],
    eventData: {
      uiType: 'button'
    },
    expects: ['url'],
    description: 'Fired when a clicks the Highlight button after selecting text on Reader'
  },
  'reader.remove-highlight': {
    eventType: 'engagement',
    entityTypes: ['content', 'ui'],
    eventData: {
      uiType: 'button'
    },
    expects: ['url'],
    description: 'Fired when a clicks the Delete button on the popout menu on any Highlight (in text, sidebar, or highlight flyaway)'
  },
  'reader.share': {
    eventType: 'engagement',
    entityTypes: ['content', 'ui'],
    eventData: {
      uiType: 'button'
    },
    expects: ['url'],
    description: 'Fired when a user clicks the Share button: top of Reader, any Highlight (in text, sidebar, or highlight flyaway), or after selecting text'
  },
  'reader.display': {
    eventType: 'engagement',
    entityTypes: ['ui'],
    eventData: {
      uiType: 'button'
    },
    expects: ['value', 'label'],
    description: 'Fired when a user updates any display settings. Label is the type of setting, value is the new setting'
  },
  'reader.goback': {
    eventType: 'engagement',
    entityTypes: ['ui'],
    eventData: {
      uiType: 'button'
    },
    description: 'Fired when a user clicks the Back arrow in the toolbar at the top of Reader'
  }
}
