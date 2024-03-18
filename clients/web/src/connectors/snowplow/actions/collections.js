export const collectionsActions = {
  'collection.impression': {
    eventType: 'impression',
    entityTypes: ['content', 'ui'],
    eventData: {
      component: 'ui',
      uiType: 'card'
    },
    expects: ['url', 'position'],
    description: 'Fired when a card scrolls into view on /collections'
  },
  'collection.open': {
    eventType: 'contentOpen',
    entityTypes: ['content', 'ui'],
    eventData: {
      uiType: 'card'
    },
    expects: ['url', 'position', 'destination'],
    description: 'Fired when a user clicks a card on /collections'
  },
  'collection.save': {
    eventType: 'engagement',
    entityTypes: ['content', 'ui'],
    eventData: {
      engagementType: 'save',
      uiType: 'button'
    },
    expects: ['url', 'position'],
    description: 'Fired when a user Saves a card on /collections'
  },
  'collection.unsave': {
    eventType: 'engagement',
    entityTypes: ['content', 'ui'],
    eventData: {
      uiType: 'button'
    },
    expects: ['url', 'position'],
    description: 'Fired when a user clicks the `Saved` button post-save on a card on /collections'
  },
  'collection.story.impression': {
    eventType: 'impression',
    entityTypes: ['content', 'ui'],
    eventData: {
      component: 'ui',
      uiType: 'card'
    },
    expects: ['url', 'position'],
    description: 'Fired when a card scrolls into view on a collection story page at /collections/*'
  },
  'collection.story.open': {
    eventType: 'contentOpen',
    entityTypes: ['content', 'ui'],
    eventData: {
      uiType: 'card'
    },
    expects: ['url', 'position', 'destination'],
    description: 'Fired when a user clicks a card on a collection story page at /collections/*'
  },
  'collection.story.save': {
    eventType: 'engagement',
    entityTypes: ['content', 'ui'],
    eventData: {
      engagementType: 'save',
      uiType: 'button'
    },
    expects: ['url', 'position'],
    description: 'Fired when a user Saves a card on a collection story page at /collections/*'
  },
  'collection.story.unsave': {
    eventType: 'engagement',
    entityTypes: ['content', 'ui'],
    eventData: {
      uiType: 'button'
    },
    expects: ['url', 'position'],
    description:
      'Fired when a user clicks the `Saved` button post-save on a card on a collection story page at /collections/*'
  },
  'collection.page.save': {
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
  'collection.page.unsave': {
    eventType: 'engagement',
    entityTypes: ['content', 'ui'],
    eventData: {
      uiType: 'button'
    },
    expects: ['url', 'value'],
    description:
      'Fired when a user clicks the `Save` button once Saved, value is one of three: save-story-top, save-story-side, or save-story-bottom'
  },
  'collection.share.facebook': {
    eventType: 'engagement',
    entityTypes: ['content', 'ui'],
    eventData: {
      uiType: 'button'
    },
    expects: ['url'],
    description:
      'Fired when a user clicks the FB button on a collection story page at /collections/*'
  },
  'collection.share.twitter': {
    eventType: 'engagement',
    entityTypes: ['content', 'ui'],
    eventData: {
      uiType: 'button'
    },
    expects: ['url'],
    description:
      'Fired when a user clicks the Twitter button on a collection story page at /collections/*'
  },
  'collection.share.linkedin': {
    eventType: 'engagement',
    entityTypes: ['content', 'ui'],
    eventData: {
      uiType: 'button'
    },
    expects: ['url'],
    description:
      'Fired when a user clicks the LinkedIn button on a collection story page at /collections/*'
  },
  'collection.share.reddit': {
    eventType: 'engagement',
    entityTypes: ['content', 'ui'],
    eventData: {
      uiType: 'button'
    },
    expects: ['url'],
    description:
      'Fired when a user clicks the Reddit button on a collection story page at /collections/*'
  },
  'collection.share.mastodon': {
    eventType: 'engagement',
    entityTypes: ['content', 'ui'],
    eventData: {
      uiType: 'button'
    },
    expects: ['url'],
    description:
      'Fired when a user clicks the Mastodon button on a collection story page at /collections/*'
  },
  'collection.share.email': {
    eventType: 'engagement',
    entityTypes: ['content', 'ui'],
    eventData: {
      uiType: 'button'
    },
    expects: ['url'],
    description:
      'Fired when a user clicks the email button on a collection story page at /collections/*'
  },
  'collection.topic.click': {
    eventType: 'engagement',
    entityTypes: ['ui'],
    eventData: {
      uiType: 'button'
    },
    expects: ['label'],
    description:
      'Fired when a user clicks a topic in the `Discover More Topics` section at the bottom of the page'
  }
}
