export const modalActions = {
  'suggested-tags.upgrade-link': {
    eventType: 'impression',
    entityTypes: ['ui'],
    eventData: {
      component: 'ui',
      uiType: 'link'
    },
    description: 'Fired when a user sees the Premium upsell link in the Tagging modal'
  },
  'share.facebook': {
    eventType: 'engagement',
    entityTypes: ['content', 'ui'],
    eventData: {
      uiType: 'button'
    },
    expects: ['url', 'position'],
    description: 'Fired when a user clicks the FB button in the Share modal'
  },
  'share.twitter': {
    eventType: 'engagement',
    entityTypes: ['content', 'ui'],
    eventData: {
      uiType: 'button'
    },
    expects: ['url', 'position'],
    description: 'Fired when a user clicks the Twitter button in the Share modal'
  },
  'share.linkedin': {
    eventType: 'engagement',
    entityTypes: ['content', 'ui'],
    eventData: {
      uiType: 'button'
    },
    expects: ['url', 'position'],
    description: 'Fired when a user clicks the LinkedIn button in the Share modal'
  },
  'share.reddit': {
    eventType: 'engagement',
    entityTypes: ['content', 'ui'],
    eventData: {
      uiType: 'button'
    },
    expects: ['url', 'position'],
    description: 'Fired when a user clicks the Reddit button in the Share modal'
  },
  'share.buffer': {
    eventType: 'engagement',
    entityTypes: ['content', 'ui'],
    eventData: {
      uiType: 'button'
    },
    expects: ['url', 'position'],
    description: 'Fired when a user clicks the Buffer button in the Share modal'
  },
  'share.mastodon': {
    eventType: 'engagement',
    entityTypes: ['content', 'ui'],
    eventData: {
      uiType: 'button'
    },
    expects: ['url', 'position'],
    description: 'Fired when a user clicks the Mastodon button in the Share modal'
  },
  'share.copy': {
    eventType: 'engagement',
    entityTypes: ['content', 'ui'],
    eventData: {
      uiType: 'button'
    },
    expects: ['url', 'position'],
    description: 'Fired when a user clicks the Copy Link button in the Share modal'
  },
  'share.mastodon.confirm': {
    eventType: 'engagement',
    entityTypes: ['ui'],
    eventData: {
      uiType: 'menu'
    },
    expects: ['value'],
    description: 'Fired when a user Confirms sharing to Mastodon in the Share to Mastodon modal'
  }
}
