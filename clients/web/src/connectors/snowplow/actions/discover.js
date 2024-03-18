export const discoverActions = {
  'discover.open': {
    eventType: 'contentOpen',
    entityTypes: ['content', 'recommendation', 'slate', 'slateLineup', 'ui'],
    eventData: {
      uiType: 'card'
    },
    expects: [
      'url',
      'position',
      'destination',
      'recommendationId',
      'slateLineupId',
      'slateLineupRequestId',
      'slateLineupExperiment',
      'slateId',
      'slateRequestId',
      'slateExperiment',
      'displayName',
      'description'
    ],
    description: 'Fired when a user clicks a card on /discover'
  },
  'discover.impression': {
    eventType: 'impression',
    entityTypes: ['content', 'recommendation', 'slate', 'slateLineup', 'ui'],
    eventData: {
      component: 'ui',
      uiType: 'card'
    },
    expects: [
      'url',
      'position',
      'recommendationId',
      'slateLineupId',
      'slateLineupRequestId',
      'slateLineupExperiment',
      'slateId',
      'slateRequestId',
      'slateExperiment',
      'displayName',
      'description'
    ],
    description: 'Fired when a card scrolls into view on /discover'
  },
  'discover.save': {
    eventType: 'engagement',
    entityTypes: ['content', 'recommendation', 'slate', 'slateLineup', 'ui'],
    eventData: {
      engagementType: 'save',
      uiType: 'button'
    },
    expects: [
      'url',
      'position',
      'recommendationId',
      'slateLineupId',
      'slateLineupRequestId',
      'slateLineupExperiment',
      'slateId',
      'slateRequestId',
      'slateExperiment',
      'displayName',
      'description'
    ],
    description: 'Fired when a user saves a card on /discover'
  },
  'discover.unsave': {
    eventType: 'engagement',
    entityTypes: ['content', 'recommendation', 'slate', 'slateLineup', 'ui'],
    eventData: {
      uiType: 'button'
    },
    expects: [
      'url',
      'position',
      'recommendationId',
      'slateLineupId',
      'slateLineupRequestId',
      'slateLineupExperiment',
      'slateId',
      'slateRequestId',
      'slateExperiment',
      'displayName',
      'description'
    ],
    description: 'Fired when a user clicks the `Saved` button post-save on a card on /discover'
  },
  'discover.signup.impression': {
    eventType: 'impression',
    entityTypes: ['ui'],
    eventData: {
      component: 'ui',
      uiType: 'button'
    },
    description: 'Dismissable Signup section in the right side for logged-out users is seen'
  },
  'discover.signup.dismiss': {
    eventType: 'engagement',
    entityTypes: ['ui'],
    eventData: {
      uiType: 'button'
    },
    description: 'Dismissable Signup section in the right side for logged-out users is dismissed'
  },
  'discover.signup.click': {
    eventType: 'engagement',
    entityTypes: ['ui'],
    eventData: {
      uiType: 'button'
    },
    description:
      'Dismissable Signup section in the right side for logged-out users is clicked through'
  },
  'discover.report': {
    eventType: 'engagement',
    entityTypes: ['report', 'content'],
    eventData: {
      engagementType: 'report'
    },
    expects: ['url', 'reason', 'otherText'],
    description: '`otherText` is an optional field'
  },
  'discover.middle.topic.click': {
    eventType: 'engagement',
    entityTypes: ['ui'],
    eventData: {
      uiType: 'button'
    },
    expects: ['label'],
    description:
      'Fired when a user clicks a topic in the `Discover More Topics` section in the middle of the page'
  },
  'discover.bottom.topic.click': {
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
